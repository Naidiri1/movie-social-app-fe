"use client";

import React, { useRef, useEffect, useState } from "react";
import Sortable from "sortablejs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TMDbStyleMovieCard from "../../components/top10CardMovie";
import { IoCloseSharp } from "react-icons/io5";
import ShareTop10Toggle from "../../components/ShareToggleTop10";
import { usePathname } from "next/navigation";
import movieImg from "../../../public/movie.png";
import Image from "next/image";

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
  const path = usePathname();
  const readOnlySharedLink = path?.startsWith("/share/");
  const token = sessionStorage.getItem("access_token");

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
           {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();

      const rankedData = data.map((movie: any, index: number) => ({
        id: movie.id,
        rank: index + 1,
      }));

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/rank`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rankedData),
      });
      setMovieData(data);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userScore: movie.userScore,
          comment: commentUser[movie.id] ?? "",
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setMovieData(data);
    }
  };

  const updateRanks = async (updatedMovies: any[]) => {
    try {
      const payload = updatedMovies
        .filter((movie) => movie?.id != null)
        .map((movie, index) => ({
          id: movie.id,
          rank: index + 1,
        }));

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/rank`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Error updating ranks", err);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    if (movie.comment === "") return;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userScore: movie.userScore,
          comment: "",
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const scoreUpdated = await updateData.json();
      const commentMap: { [movieId: string]: string } = {};
      scoreUpdated.forEach((movie: any) => {
        commentMap[movie.id] = movie.comment || "";
      });
      setComment(commentMap);
      setMovieData(scoreUpdated);
    }
  };

  useEffect(() => {
     handleTop10();
  }, []);

  const handleTop10 = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
     console.error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      const results = data;
      setMovieData(results);
    }
  };

  useEffect(() => {
    if (readOnlySharedLink) return;
    if (!sortableContainerRef.current) return;

    const sortable = new Sortable(sortableContainerRef.current, {
      animation: 150,
      ghostClass: "opacity-500",
      draggable: ".draggable-item",
      swapClass: "highlight",
      forceFallback: true,

      onEnd: (evt) => {
        const updated = [...movieData];
        const [moved] = updated.splice(evt.oldIndex!, 1);
        updated.splice(evt.newIndex!, 0, moved);
        setMovieData(updated);
        updateRanks(updated);
      },
    });
    return () => sortable.destroy();
  }, [movieData]);

  return (
    <div className="w-full flex flex-col">
      <ShareTop10Toggle />
      <div
        ref={sortableContainerRef}
        className={` ${movieData.length === 0 ? 'flex justify-center items-center' :'grid grid-cols-1 md:grid-cols-2'} `}
      >
        {movieData.length > 0 ? (
          movieData.map((movie: any, index) => (
            <div
              key={movie?.id ?? index}
              className="flex items-start highlight draggable-item m-5 bg-white dark:bg-zinc-900 rounded-lg shadow "
            >
              <div className="w-6 pt-2 pr-1 items-center mt-[5rem] mr-5 ml-5 text-2xl font-bold text-white text-right">
                {index + 1}
              </div>
              {movie ? (
                <div className="relative">
                  <button
                    onClick={() => handleDeleteMovie(movie)}
                    className="absolute top-2 right-2 z-10 bg-red-200 hover:bg-red/80 p-1 border border-red-500 rounded-full"
                    aria-label="Remove from Top 10"
                  >
                    <IoCloseSharp className="h-3 w-3 text-red-800 hover:text-yellow-500" />
                  </button>
                  <TMDbStyleMovieCard
                    key={movie.id}
                    movie={movie}
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] w-full text-white">
            <Image
              src={movieImg}
              alt="No movie results"
              width={300}
              height={350}
              priority
            />
            <p className="mt-4 text-lg font-medium">No Movie Results</p>
          </div>
        )}
      </div>
    </div>
  );
}
