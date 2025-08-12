"use client";

import React, { useEffect, useState } from "react";
import CardMovie from "../../components/CardMovie";
import { AddMovieHooks } from "../../components/AddMovieHooks";

const UpcomingMovies = () => {
  const [rowData, setRowData] = useState([]);

  const {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
    handleAddWatchLater,
  } = AddMovieHooks();
  const token = sessionStorage.getItem("access_token");

  const handleSearchPopularMovies = async () => {
    const response = await fetch(`http://localhost:8080/api/movies/upcoming`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("Failed to fetch movies");
    }
    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      console.log(results);
      setRowData(results);
    }
  };

  useEffect(() => {
    handleSearchPopularMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
      {rowData.map((movie: any) => (
        <CardMovie
          key={movie.id}
          movie={movie}
          handleAddFavorites={() => handleAddFavorites(movie)}
          handleAddToWatched={() => handleAddToWatched(movie)}
          handleAddToTop10={() => handleAddToTop10(movie)}
          handleAddWatchLater={() => handleAddWatchLater(movie)}
        />
      ))}
    </div>
  );
};

export default UpcomingMovies;
