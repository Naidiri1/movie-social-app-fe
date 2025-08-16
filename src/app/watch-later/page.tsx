'use client';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CrudCardMovie from "../../components/CrudCardMovie";
import { IoCloseSharp } from "react-icons/io5";
import Fuse from "fuse.js";
import Image from "next/image";
import movieImg from "../../../public/movie.png";
import { Button, Input, Typography } from "@material-tailwind/react";
import {  selectUser } from '../../redux/reducers/userSlice';

export default function WatchLaterMovies() {
  const [allWatchLater, setAllWatchLater] = useState([]);
  const [commentUser, setComment] = useState<{ [movieId: string]: string }>({});
  const [successScoreIds, setSuccessScoreIds] = useState<Set<number>>(
    new Set()
  );
  
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredWatchLater, setFilteredWatchLater] = useState<any>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
    const [mounted, setMounted] = useState(false);

    const getToken = () => {
       if (typeof window !== 'undefined') {
         return sessionStorage.getItem('access_token');
       }
       return null;
     };
     
       const getUserId = () => {
       if (typeof window !== 'undefined') {
        const user = useSelector(selectUser);
         const userId = user.userId;
         return userId;
       }
       return null;
     };
     const userId = getUserId();
   
   
      const token = getToken();
  const handleWatchLaterMovies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
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
      setAllWatchLater(results);
      setFilteredWatchLater(results);
    }
  };

  const filterByGenre = (genreName: string | null) => {
    setSelectedGenre(genreName);
    setCurrentPage(1);

    if (genreName === null) {
      setFilteredWatchLater(allWatchLater);
    } else {
      const filtered = allWatchLater.filter((movie: any) => {
        if (movie.genres && Array.isArray(movie.genres)) {
          return movie.genres.includes(genreName);
        }
        return false;
      });
      setFilteredWatchLater(filtered);
    }
  };

  useEffect(() => {
      if (mounted && token && userId) {
    handleWatchLaterMovies();
      }
    }, [mounted, token, userId]);

  const getAvailableGenres = () => {
    const allGenres = new Set<string>();

    allWatchLater.forEach((movie: any) => {
      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach((genre: string) => allGenres.add(genre));
      }
    });

    return Array.from(allGenres).sort();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddWatchLater = async (movie: any, score?: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setTimeout(() => {
        setAllWatchLater(data);
        setFilteredWatchLater(data);
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
    }
  };

  const handleDeleteScore = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later/${movie.id}?userId=${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userScore: null,
          comment: movie.comment,
          commentEnabled: movie.commentEnabled,
        }),
      }
    );
    if (response.ok) {
      const updateData = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setAllWatchLater(data);
      setFilteredWatchLater(data);
    }
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setAllWatchLater(data);
      setFilteredWatchLater(data);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setAllWatchLater(data);
      setFilteredWatchLater(data);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
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
      setAllWatchLater(scoreUpdated);
      setFilteredWatchLater(scoreUpdated);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery?.trim()) {
      filterByGenre(selectedGenre);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) console.error("Failed to fetch movies");

    const data = await response.json();
    const fuse = new Fuse(data, {
      keys: ["title"],
      threshold: 0.4,
    });
    const result = fuse.search(searchQuery);

    const matchedMovies = result.map((r) => r.item);

    setFilteredWatchLater(matchedMovies);
    setSelectedGenre(null);
  };

  useEffect(() => {
    if (searchQuery === "" || searchQuery === undefined) {
      setFilteredWatchLater(allWatchLater);
      setSelectedGenre(null);
      setCurrentPage(1);
    }
  }, [searchQuery, allWatchLater]);

  const availableGenres = getAvailableGenres();
  const totalPages = Math.ceil(filteredWatchLater.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredWatchLater.slice(startIndex, endIndex);

  return (
    <div>
      {availableGenres.length > 1 && (
        <div className="mb-6 p-4 bg-gray-900 rounded-lg mx-5">
          <Typography variant="h6" className="text-white mb-4">
            Filter by Genre
          </Typography>

          <div className="flex flex-wrap gap-1">
            <Button
              size="sm"
              variant={selectedGenre === null ? "filled" : "outlined"}
              color={selectedGenre === null ? "red" : "white"}
              onClick={() => filterByGenre(null)}
              className="mb-1 text-xs px-2 py-1"
            >
              All ({allWatchLater.length})
            </Button>

            {availableGenres.map((genre) => {
              const count = allWatchLater.filter(
                (movie: any) => movie.genres && movie.genres.includes(genre)
              ).length;

              return (
                <Button
                  key={genre}
                  size="sm"
                  variant={selectedGenre === genre ? "filled" : "outlined"}
                  color={selectedGenre === genre ? "red" : "white"}
                  onClick={() => filterByGenre(genre)}
                  className="mb-1 text-xs px-2 py-1"
                >
                  {genre} ({count})
                </Button>
              );
            })}
          </div>
        </div>
      )}
      <div className="w-full justify-center items-center flex ">
        <div className="relative w-full m-5 text-white md:w-80">
          <Input
            type="search"
            label="Search Watch Later Movies"
            color="blue-gray"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="text-white border border-blue-gray-200"
          />
          <button
            onClick={handleSearch}
            className="absolute top-1 right-1 flex items-center rounded bg-red-800 py-1 pt-2 px-3 text-sm text-white hover:bg-gray-700 transition-all"
            type="button"
            placeholder="Search Movie..."
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              className="w-4 h-4 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            Search
          </button>
        </div>
      </div>
      {filteredWatchLater.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
          {currentMovies.length > 0 &&
            currentMovies.map((movie: any) => (
              <div key={movie.id} className="relative">
                <button
                  onClick={() => handleDeleteMovie(movie)}
                  className="absolute right-20 top-8 z-10 bg-none hover:bg-red/80 p-1 border border-red-500 rounded-full"
                  aria-label="Remove from Watch Later"
                >
                  <IoCloseSharp className="h-3 w-3 text-red-800 hover:text-yellow-500" />
                </button>
                <CrudCardMovie
                  movie={movie}
                  handleAddMovie={(score: any) =>
                    handleAddWatchLater(movie, score)
                  }
                  successScore={successScoreIds.has(movie.id)}
                  handleDeleteScore={() => handleDeleteScore(movie)}
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
            ))}
        </div>
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
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 mb-4">
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="outlined"
              color="white"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1"
            >
              ←
            </Button>

            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? "filled" : "outlined"}
                  color={currentPage === page ? "red" : "white"}
                  onClick={() => handlePageChange(page)}
                  className="min-w-[32px] text-xs px-2 py-1"
                >
                  {page}
                </Button>
              );
            })}

            <Button
              size="sm"
              variant="outlined"
              color="white"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1"
            >
              →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
