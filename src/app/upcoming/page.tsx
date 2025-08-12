"use client";

import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import CardMovie from "../../components/CardMovie";
import { AddMovieHooks } from "../../components/AddMovieHooks";
import Image from "next/image";
import movieImg from '../../../public/movie.png'

// Common movie genres
const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" }
];

const UpcomingMovies = () => {
  const [rowData, setRowData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
    handleAddWatchLater,
  } = AddMovieHooks();

  const handleSearchUpcomingMovies = async (genreId: number | null = null, page: number = 1) => {
    const token = sessionStorage.getItem("access_token");

    // Build URL with or without genre parameter
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/upcoming`;
    const params = new URLSearchParams();
    
    if (genreId) {
      params.append('with_genres', genreId.toString());
    }
    
    if (page > 1) {
      params.append('page', page.toString());
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("Failed to fetch movies");
      return;
    }

    const data = await response.json();
    const results = data.results;
    setRowData(results);
  };

  const filterByGenre = async (genreId: number | null) => {
    setSelectedGenre(genreId);
    setCurrentPage(1); // Reset to page 1 when changing genre
    setLoading(true);
    await handleSearchUpcomingMovies(genreId, 1);
    setLoading(false);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    setLoading(true);
    await handleSearchUpcomingMovies(selectedGenre, page);
    setLoading(false);
  };

  useEffect(() => {
    handleSearchUpcomingMovies();
  }, []);

  return (
    <div className="w-full max-w-none">
      <div className="mb-6  flex flex-col items-center justify-center m-5 p-5 bg-gray-900 rounded-lg">
        <Typography variant="h6" className="text-white mb-4">
          Filter by Genre
        </Typography>
        
        <div className="flex flex-wrap gap-1 ">
          <Button
            size="sm"
            variant={selectedGenre === null ? "filled" : "outlined"}
            color={selectedGenre === null ? "red" : "white"}
            onClick={() => filterByGenre(null)}
            disabled={loading}
            className="mb-2"
          >
            All
          </Button>

          {GENRES.map((genre) => (
            <Button
              key={genre.id}
              size="sm"
              variant={selectedGenre === genre.id ? "filled" : "outlined"}
              color={selectedGenre === genre.id ? "red" : "white"}
              onClick={() => filterByGenre(genre.id)}
              className="mb-2"
              disabled={loading}
            >
              {genre.name}
            </Button>
          ))}
        </div>
        
        {selectedGenre && (
          <Typography variant="small" className="text-gray-300 mt-2">
            Showing {rowData.length} upcoming movies in {GENRES.find(g => g.id === selectedGenre)?.name} genre - Page {currentPage}
          </Typography>
        )}
        
        {!selectedGenre && currentPage > 1 && (
          <Typography variant="small" className="text-gray-300 mt-2">
            Showing upcoming movies - Page {currentPage}
          </Typography>
        )}
        
        {loading && (
          <Typography variant="small" className="text-gray-300 mt-2">
            Loading movies...
          </Typography>
        )}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
          <div className="col-span-full flex flex-col items-center justify-center h-[400px] w-full text-white">
            <Image
              src={movieImg}
              alt="No movie results"
              width={300}
              height={350}
              priority
            />
            <p className="mt-4 text-lg font-medium">
              {selectedGenre 
                ? `No upcoming movies found in ${GENRES.find(g => g.id === selectedGenre)?.name} genre`
                : "No Upcoming Movie Results"
              }
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 mb-4">
        <div className="flex gap-1 overflow-x-auto pb-2 max-w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
            <Button
              key={page}
              size="sm"
              variant={currentPage === page ? "filled" : "outlined"}
              color={currentPage === page ? "red" : "white"}
              onClick={() => handlePageChange(page)}
              disabled={loading}
              className="min-w-[32px] text-xs px-2 py-1 flex-shrink-0"
            >
              {page}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovies;