"use client";

import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TMDbStyleMovieCard from "../../components/top10CardMovie";
import { IoCloseSharp } from "react-icons/io5";

export default function Top10Movies() {
  const NUM_SLOTS = 10;
  const { userId } = useSelector((state: RootState) => state.auth);
  const [movieData, setMovieData] = useState<(Movie | null)[]>(
    Array(NUM_SLOTS).fill(null)
  );
  const sortableContainerRef = useRef<HTMLDivElement | null>(null);
  const [successScoreIds, setSuccessScoreIds] = useState<Set<number>>(
    new Set()
  );
  const [commentUser, setComment] = useState<{ [movieId: string]: string }>({});

  const handleAddScore = async (movie: any, score?: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScore: score ?? null,
          comment: movie.comment,
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      setSuccessScoreIds((prev) => new Set(prev).add(movie.id));
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`
      );
      const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setTimeout(() => {
        setMovieData(data);
        const commentMap: { [movieId: string]: string } = {};
        data.forEach((movie: any) => {
          commentMap[movie.id] = movie.comment || "";
        });
        setComment(commentMap);

        setSuccessScoreIds((prev) => {
          const updated = new Set(prev);
          updated.delete(movie.id);
          return updated;
        });
      }, 3000);
      console.log(updateData);
    }
  };

  const handleDeleteScore = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScore: null,
          comment: movie.comment,
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`
      );
      const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMovieData(data);
    }
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`
      );
      const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMovieData(data);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScore: movie.userScore,
          comment: commentUser[movie.id] ?? "",
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`
      );
      const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMovieData(data);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScore: movie.userScore,
          comment: "",
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`
      );
      const scoreUpdated = await updateData.json();
      scoreUpdated.sort(
        (a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
      );
      const commentMap: { [movieId: string]: string } = {};
      scoreUpdated.forEach((movie: any) => {
        commentMap[movie.id] = movie.comment || "";
      });
      setComment(commentMap);
      setMovieData(scoreUpdated);
      console.log(scoreUpdated);
    }
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0)
        );
        setMovieData(sorted);
      });
  }, [userId]);

  useEffect(() => {
    if (!sortableContainerRef.current) return;

    const sortable = new Sortable(sortableContainerRef.current, {
      animation: 150,
      ghostClass: "opacity-500",
      draggable: ".draggable-item",
      swapClass: "highlight",
      onEnd: (evt) => {
        const updated = [...movieData];
        const [moved] = updated.splice(evt.oldIndex!, 1);
        updated.splice(evt.newIndex!, 0, moved);
        setMovieData(updated);
        console.log(updated);
      },
    });

    return () => sortable.destroy();
  }, [movieData]);

  return (
    <div className="w-full flex flex-col">
      <div
        ref={sortableContainerRef}
        className="grid grid-cols-1 md:grid-cols-2 "
      >
        {movieData.map((movie: any, index) => (
          <div
            key={movie?.id ?? index}
            className="flex items-start highlight draggable-item m-5 bg-white dark:bg-zinc-900 rounded-lg shadow "
          >
            <div className="w-6 pt-2 pr-1 items-center mt-[5rem] text-2xl font-bold text-gray-400 text-right">
              {index + 1}
            </div>
            {movie ? (
              <div className="relative">
                {/* Remove Button - top-right */}
                <button
                  onClick={() => handleDeleteMovie(movie)}
                  className="absolute top-2 right-2 z-10 bg-black/20 hover:bg-red/80 p-1 border border-red-500 rounded-full"
                  aria-label="Remove from Top 10"
                >
                  <IoCloseSharp className="h-3 w-3 text-red-800 hover:text-red-200" />
                </button>

                <TMDbStyleMovieCard
                  key={movie.id}
                  movie={movie}
                  handleAddMovie={(score: any) => handleAddScore(movie, score)}
                  successScore={successScoreIds.has(movie.id)}
                  handleDeleteScore={() => handleDeleteScore(movie)}
                  handleDeleteMovie={() => handleDeleteMovie(movie)}
                  initialScore={movie.userScore}
                  comment={commentUser[movie.id] || ""}
                  setComment={(newComment) =>
                    setComment((prev: any) => ({
                      ...prev,
                      [movie.id]: newComment,
                    }))
                  }
                  handleAddEditComment={() => handleAddEditComment(movie)}
                  handleDeleteComment={() => handleDeleteComment(movie)}
                />
              </div>
            ) : (
              <div className="h-24 border border-dashed border-gray-300 dark:border-zinc-700 rounded flex items-center justify-center text-sm text-gray-400">
                Drop movie here
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
