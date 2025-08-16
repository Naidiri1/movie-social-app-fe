'use client';

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
  const [token, setToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
      setMounted(true);
      const storedToken = typeof window !== 'undefined'  && typeof sessionStorage !== 'undefined'
        ? sessionStorage.getItem("access_token") 
        : null;
      setToken(storedToken);
    }, []);

 const movieHooks = mounted ? AddMovieHooks() : {
    handleAddFavorites: () => {},
    handleAddToWatched: () => {},
    handleAddToTop10: () => {},
    handleAddWatchLater: () => {},
  };



  
useEffect(() => {
    setMounted(true);
    const storedToken = typeof window !== 'undefined' 
      ? sessionStorage.getItem("access_token") 
      : null;
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (movieString && mounted) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/search?query=${movieString}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.results.length > 0) {
            setRowCardData(data.results);
            setDisplayImgResult(false);
          } else {
            setDisplayImgResult(true);
          }
        });
    }
  }, [movieString, mounted]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
        {rowCardData.map((movie: any) => (
          <CardMovie
            key={movie.id}
            movie={movie}
           handleAddFavorites={() => movieHooks?.handleAddFavorites(movie)}
              handleAddToWatched={() => movieHooks?.handleAddToWatched(movie)}
              handleAddToTop10={() => movieHooks?.handleAddToTop10(movie)}
              handleAddWatchLater={() => movieHooks?.handleAddWatchLater(movie)}
          />
        ))}
      </div>
      {rowCardData.length < 0 && displayImgResult && (
        <div className="flex flex-col items-center justify-center h-[500px] w-full text-white">
          <Image
            src={noResult}
            alt="No movie results"
            width={500}
            height={450}
            priority
          />
          <p className="mt-4 text-lg font-medium">No Movie Results</p>
          <p className="mt-4 text-lg font-medium">Try again!</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
