"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import CardMovie from "../../components/CardMovie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AddMovieHooks } from "../../components/AddMovieHooks";
import Image from "next/image";
import movieImg from '../../../public/movie.png'

export default function Popular() {
  const [rowData, setRowData] = useState([]);
  const {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
    handleAddWatchLater,
  } = AddMovieHooks();
  const PopularMovies = async () => {
    const token = sessionStorage.getItem("access_token");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/popular`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

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
    PopularMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
      {rowData.length > 0 ? rowData.map((movie: any) => (
        <CardMovie
          key={movie.id}
          movie={movie}
          handleAddFavorites={() => handleAddFavorites(movie)}
          handleAddToWatched={() => handleAddToWatched(movie)}
          handleAddToTop10={() => handleAddToTop10(movie)}
          handleAddWatchLater={() => handleAddWatchLater(movie)}
        />
      )) : (
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
      )
      }

    </div>
  );
}
