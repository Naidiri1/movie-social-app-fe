"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import CardMovie from "../../components/CardMovie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CrudCardMovie from "../../components/CrudCardMovie";

export default function FavoriteMovies() {
  const [rowData, setRowData] = useState([]);
  const { userId } = useSelector((state: RootState) => state.auth);
  const [commentUser, setComment] = useState<{ [movieId: string]: string }>(
    {}
  );
  const [successScoreIds, setSuccessScoreIds] = useState<Set<number>>(
    new Set()
  );

  const handleFavoriteMovies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      data.sort((a: any, b: any) => (b.userScore ?? 0) - (a.userScore ?? 0));
      const results = data;
      console.log(results);
      setRowData(results);
   
    }
  };

  useEffect(() => {
    handleFavoriteMovies();
  }, []);

  const handleAddFavorites = async (movie: any, score?: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`
      );
      const scoreUpdated = await updateData.json();
      scoreUpdated.sort(
        (a: any, b: any) => (b.userScore ?? 0) - (a.userScore ?? 0)
      );
      setTimeout(() => {
        setRowData(scoreUpdated);
         const commentMap: { [movieId: string]: string } = {};
        scoreUpdated.forEach((movie: any) => {
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`
      );
      const scoreUpdated = await updateData.json();
      scoreUpdated.sort(
        (a: any, b: any) => (b.userScore ?? 0) - (a.userScore ?? 0)
      );
      setRowData(scoreUpdated);
      console.log(scoreUpdated);
    }
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`
      );
      const scoreUpdated = await updateData.json();
      scoreUpdated.sort(
        (a: any, b: any) => (b.userScore ?? 0) - (a.userScore ?? 0)
      );
      setRowData(scoreUpdated);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`
      );
      const scoreUpdated = await updateData.json();
      scoreUpdated.sort(
        (a: any, b: any) => (b.userScore ?? 0) - (a.userScore ?? 0)
      );
      setRowData(scoreUpdated);
      console.log(scoreUpdated);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`
      );
      const scoreUpdated = await updateData.json();
      scoreUpdated.sort(
        (a: any, b: any) => (b.userScore ?? 0) - (a.userScore ?? 0)
      );
         const commentMap: { [movieId: string]: string } = {};
        scoreUpdated.forEach((movie: any) => {
          commentMap[movie.id] = movie.comment || "";
        });
        setComment(commentMap);
      setRowData(scoreUpdated);
      console.log(scoreUpdated);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
      {rowData.map((movie: any) => (
        <CrudCardMovie
          key={movie.id}
          movie={movie}
          handleAddFavorites={(score) => handleAddFavorites(movie, score, )}
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
          // handleAddToWatched={() =>handleAddToWatched(movie)}
          // handleEditScore={() =>handleEditScore(movie)}
        />
      ))}
    </div>
  );
}
