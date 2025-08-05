"use client";

import React, { useEffect, useState } from "react";
import SearchResult from "@/components/searchResult";
import CardMovie from "@/components/CardMovie";
import { AddMovieHooks } from "../../components/AddMovieHooks";
import noResult from "../../../public/noResults.png";
import Image from "next/image";

const SearchResults = () => {
  const [rowCardData, setRowCardData] = useState([]);
  const movieString = SearchResult();
  const [displayImgResult, setDisplayImgResult] = useState(false);
  const { handleAddFavorites, handleAddToWatched, handleAddToTop10 } =
    AddMovieHooks();
  console.log(movieString);

  useEffect(() => {
    if (movieString) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/search?query=${movieString}`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.lenght > 0) {
            setRowCardData(data.results);
            setDisplayImgResult(false);
            console.log("fdfddf");
          } else {
            setDisplayImgResult(true);
          }
        });
    }
  }, [movieString]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
        {rowCardData.map((movie: any) => (
          <CardMovie
            key={movie.id}
            movie={movie}
            handleAddFavorites={() => handleAddFavorites(movie)}
            handleAddToWatched={() => handleAddToWatched(movie)}
            handleAddToTop10={() => handleAddToTop10(movie)}
          />
        ))}
      </div>
      {displayImgResult && (
        <div className="flex flex-col items-center justify-center h-[500px] w-full text-white">
          <Image
            src={noResult}
            alt="No movie results"
            width={500}
            height={450}
            priority
          />
          <p className="mt-4 text-lg font-medium">No Movie Results</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
