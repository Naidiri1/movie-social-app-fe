"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import CardMovie from "../../components/CardMovie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AddMovieHooks } from "../../components/AddMovieHooks";

export default function Popular() {
  const [rowData, setRowData] = useState([]);
  const { userId } = useSelector((state: RootState) => state.auth);
  const { handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10} = AddMovieHooks();
  const PopularMovies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/popular`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      console.log(results);
      setRowData(results);
    }
  };

  useEffect(() => {
    PopularMovies();
  }, []);

  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
      {rowData.map((movie: any) => (
        <CardMovie
          key={movie.id}
          movie={movie}
          handleAddFavorites={() =>handleAddFavorites(movie)}
          handleAddToWatched={() =>handleAddToWatched(movie)}
          handleAddToTop10={() =>handleAddToTop10(movie)}
        />
      ))}
    </div>
  );
}
