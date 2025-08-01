"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CrudCardMovie from "../../components/CrudCardMovie";

export default function WatchedMovies() {
  const [movieData, setMovieData] = useState<any[]>([]);
  const { userId } = useSelector((state: RootState) => state.auth);
  const [commentUser, setComment] = useState<{ [movieId: string]: string }>(
    {}
  );
  const [successScoreIds, setSuccessScoreIds] = useState<Set<number>>(
    new Set()
  );

  const handleWatchedMovies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      const results = data;
      console.log(results);
      setMovieData(results);
   
    }
  };

  useEffect(() => {
    handleWatchedMovies();
  }, []);

  const handleAddWatched = async (movie: any, score?: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`
      );
       const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMovieData(data);
    }
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`
      );
      const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMovieData(data);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScore: movie.userScore,
          comment:  commentUser[movie.id] ?? "",
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`
      );
     const data = await updateData.json();
      data.sort((a: any, b: any) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
      setMovieData(data);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userScore: movie.userScore,
          comment: '',
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
      {movieData.map((movie: any) => (
        <CrudCardMovie
          key={movie.id}
          movie={movie}
          handleAddMovie={(score: any) => handleAddWatched(movie, score, )}
          successScore={successScoreIds.has(movie.id)}
          handleDeleteScore={() => handleDeleteScore(movie)}
          handleDeleteMovie={() => handleDeleteMovie(movie)}
          initialScore={movie.userScore}
          comment={commentUser[movie.id] || ""}          
         setComment={(newComment) =>
          setComment((prev: any) => ({ ...prev, [movie.id]: newComment }))
          }
          handleAddEditComment={() => handleAddEditComment(movie)}
          handleDeleteComment={() => handleDeleteComment(movie)}
        />
      ))}
    </div>
  );
}
