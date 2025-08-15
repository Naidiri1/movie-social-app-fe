"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CrudCardMovie from "../../components/CrudCardMovie";
import { IoCloseSharp } from "react-icons/io5";
import Fuse from "fuse.js";
import Image from "next/image";
import movieImg from "../../../public/movie.png";
import { Button, Card, Input, Typography } from "@material-tailwind/react";

export default function FavoriteMovies() {
  const [rowData, setRowData] = useState([]);
  const [allFavorites, setAllFavorites] = useState([]);
  const { userId } = useSelector((state: RootState) => state.auth);
  const [commentUser, setComment] = useState<{ [movieId: string]: string }>({});
  const [successScoreIds, setSuccessScoreIds] = useState<Set<number>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredFavorites, setFilteredFavorites] = useState<any>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
   const [token, setToken] = useState<string | null>(null);
  useEffect(() => { setToken(sessionStorage.getItem("access_token")); }, []);
  const handleFavoriteMovies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      setRowData(data);
      setAllFavorites(data);
      setFilteredFavorites(data);
    }
  };

  const filterByGenre = (genreName: string | null) => {
    setSelectedGenre(genreName);
    setCurrentPage(1);

    if (genreName === null) {
      setFilteredFavorites(allFavorites);
    } else {
      const filtered = allFavorites.filter((movie: any) => {
        if (movie.genres && Array.isArray(movie.genres)) {
          return movie.genres.includes(genreName);
        }
        return false;
      });
      setFilteredFavorites(filtered);
    }
  };

  const getAvailableGenres = () => {
    const allGenres = new Set<string>();

    allFavorites.forEach((movie: any) => {
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

  useEffect(() => {
    handleFavoriteMovies();
  }, []);

  const updateFilteredData = (newData: any) => {
    setRowData(newData);
    setAllFavorites(newData);

    if (selectedGenre) {
      const filtered = newData.filter((movie: any) => {
        if (movie.genres && Array.isArray(movie.genres)) {
          return movie.genres.includes(selectedGenre);
        }
        return false;
      });
      setFilteredFavorites(filtered);
    } else {
      setFilteredFavorites(newData);
    }
  };

  const handleAddFavorites = async (movie: any, score?: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setTimeout(() => {
        updateFilteredData(data);

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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      updateFilteredData(data);
    }
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      updateFilteredData(data);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      updateFilteredData(data);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
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
      updateFilteredData(scoreUpdated);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery?.trim()) {
      filterByGenre(selectedGenre);
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
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

    setFilteredFavorites(matchedMovies);
    setCurrentPage(1);
    setSelectedGenre(null);
  };

  useEffect(() => {
    if (searchQuery === "" || searchQuery === undefined) {
      setFilteredFavorites(allFavorites);
      setSelectedGenre(null);
      setCurrentPage(1);
    }
  }, [searchQuery, allFavorites]);

  const availableGenres = getAvailableGenres();
  const totalPages = Math.ceil(filteredFavorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = filteredFavorites.slice(startIndex, endIndex);

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
              All ({allFavorites.length})
            </Button>

            {availableGenres.map((genre) => {
              const count = allFavorites.filter(
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
      <div className="w-full justify-center  items-center flex ">
        <div className="relative w-full m-5 text-white md:w-80">
          <Input
            type="search"
            label="Search Favorite Movies"
            color="blue-gray"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
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
      {filteredFavorites.length > 0 ? (
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
          {currentMovies.map((movie: any) => (
            <div key={movie.id} className="relative">
              <button
                onClick={() => handleDeleteMovie(movie)}
                className="absolute right-20 top-8 z-10 bg-none hover:bg-red/80 p-1 border border-red-500 rounded-full"
                aria-label="Remove from Watched"
              >
                <IoCloseSharp className="h-3 w-3 text-red-800 hover:text-yellow-500" />
              </button>

              <CrudCardMovie
                key={movie.id}
                movie={movie}
                handleAddMovie={(score: any) =>
                  handleAddFavorites(movie, score)
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
