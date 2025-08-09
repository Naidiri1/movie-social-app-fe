"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CrudCardMovie from "../../components/CrudCardMovie";
import { IoCloseSharp } from "react-icons/io5";
import Fuse from "fuse.js";
import { Input } from "@material-tailwind/react";
import Image from "next/image";
import movieImg from '../../../public/movie.png'

export default function WatchedMovies() {
  const [movieData, setMovieData] = useState<any[]>([]);
  const { userId } = useSelector((state: RootState) => state.auth);
  const [commentUser, setComment] = useState<{ [movieId: string]: string }>({});
  const [successScoreIds, setSuccessScoreIds] = useState<Set<number>>(
    new Set()
  );
  const [displayResultsSearch, setDisplayResultsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFavoriteMovie, setSearchFavoriteMovie] = useState<any[]>([]);
  const token = sessionStorage.getItem("access_token");

  const handleWatchedMovies = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      const results = data;
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
        {
        headers: { Authorization: `Bearer ${token}` },
      }
      );
      const data = await updateData.json();
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
    }
  };

  const handleDeleteScore = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
         {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setMovieData(data);
    }
  };

  const handleDeleteMovie = async (movie: Movie) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
          {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setMovieData(data);
    }
  };

  const handleAddEditComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
         {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await updateData.json();
      setMovieData(data);
    }
  };

  const handleDeleteComment = async (movie: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched/${movie.id}?userId=${userId}`,
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
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
      setMovieData(scoreUpdated);
    }
  };

  const handleResults = (results: any) => {
    if (results.length > 0) {
      setMovieData(results);
      setDisplayResultsSearch(true);
    } else {
      setDisplayResultsSearch(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery?.trim()) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
       {
          headers: { Authorization: `Bearer ${token}` },
        }
    );

    if (!response.ok) throw new Error("Failed to fetch movies");

    const data = await response.json();
    setSearchFavoriteMovie(data);

    const fuse = new Fuse(data, {
      keys: ["title"],
      threshold: 0.4,
    });
    const result = fuse.search(searchQuery);

    const matchedMovies = result.map((r) => r.item);

    handleResults(matchedMovies);
  };

  useEffect(() => {
    if (searchQuery === "" || searchQuery === undefined) {
      setDisplayResultsSearch(false);
      handleWatchedMovies();
    }
  }, [searchQuery]);

  return (
    <div>
      <div className="w-full justify-center items-center flex ">
        <div className="relative w-full m-5 text-white md:w-80">
          <Input
            type="search"
            label="Search Watched Movies"
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
      {!displayResultsSearch && movieData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
          {movieData.map((movie: any) => (
            <div key={movie.id} className="relative">
              <button
                onClick={() => handleDeleteMovie(movie)}
                className="absolute right-20 top-8 z-10 bg-none hover:bg-red/80 p-1 border border-red-500 rounded-full"
                aria-label="Remove from Watched"
              >
                <IoCloseSharp className="h-3 w-3 text-red-800 hover:text-yellow-500" />
              </button>
              <CrudCardMovie
                movie={movie}
                handleAddMovie={(score: any) => handleAddWatched(movie, score)}
                successScore={successScoreIds.has(movie.id)}
                handleDeleteScore={() => handleDeleteScore(movie)}
                handleDeleteMovie={() => handleDeleteMovie(movie)}
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
      ) :(
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

      {displayResultsSearch && searchFavoriteMovie.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
          {movieData.map((movie: any) => (
            <div key={movie.id} className="relative">
              <button
                onClick={() => handleDeleteMovie(movie)}
                className="absolute right-20 top-8 z-10 bg-none hover:bg-red/80 p-1 border border-red-500 rounded-full"
                aria-label="Remove from Watched"
              >
                <IoCloseSharp className="h-3 w-3 text-red-800 hover:text-yellow-500" />
              </button>
              <CrudCardMovie
                movie={movie}
                handleAddMovie={(score: any) => handleAddWatched(movie, score)}
                successScore={successScoreIds.has(movie.id)}
                handleDeleteScore={() => handleDeleteScore(movie)}
                handleDeleteMovie={() => handleDeleteMovie(movie)}
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
      )}
    </div>
  );
}
