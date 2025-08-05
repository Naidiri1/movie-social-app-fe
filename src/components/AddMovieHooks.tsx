import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback, useState } from "react";

export const AddMovieHooks = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  console.log(userId);

  const verifyMovieAlreadyAdded = async (
    movie: any,
    listType: "favorites" | "top10" | "watched"
  ): Promise<boolean> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${listType}?userId=${userId}`
    );

    if (response.ok) {
      const movieData = await response.json();
      return movieData.some((item: any) => item.movieId === movie.id);
    }

    return false;
  };

  const handleAddFavorites = useCallback(async (movie: any) => {
    try {
      const alreadyExist = await verifyMovieAlreadyAdded(movie, "favorites");
      if (alreadyExist) {
        return;
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              movieId: movie.id,
              title: movie.title,
              posterPath: movie.poster_path,
              comment: "",
              userScore: null,
              commentEnabled: true,
              releasedDate: movie.release_date,
              movieDescription: movie.overview,
              publicScore: parseFloat(movie.vote_average.toFixed(1)),
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      }
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
  }, []);

  const handleAddToWatched = useCallback(async (movie: any) => {
    try {
      const alreadyExists = await verifyMovieAlreadyAdded(movie, "watched");
      if (alreadyExists) {
        return;
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watched?userId=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              movieId: movie.id,
              title: movie.title,
              posterPath: movie.poster_path,
              comment: "",
              userScore: null,
              commentEnabled: true,
              releasedDate: movie.release_date,
              movieDescription: movie.overview,
              publicScore: parseFloat(movie.vote_average.toFixed(1)),
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      }
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
  }, []);

  const handleAddToTop10 = useCallback(
    async (movie: any) => {
      try {
        const top10Response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`
        );
        if (!top10Response.ok) {
          throw new Error("Failed to fetch top10");
        }
        const top10Data = await top10Response.json();
        const alreadyExists = top10Data.some(
          (item: any) => item.movieId === movie.id
        );
        if (alreadyExists) return;
        if (top10Data.length >= 10) {
          const lastRankedMovie = top10Data.reduce((prev: any, curr: any) =>
            curr.rank > prev.rank ? curr : prev
          );
          await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10/${lastRankedMovie.id}?userId=${userId}`,
            {
              method: "DELETE",
            }
          );
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              movieId: movie.id,
              title: movie.title,
              posterPath: movie.poster_path,
              comment: "",
              userScore: null,
              commentEnabled: true,
              releasedDate: movie.release_date,
              movieDescription: movie.overview,
              publicScore: parseFloat(movie.vote_average.toFixed(1)),
              rank: 10,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
        }
      } catch (error) {
        console.error("Failed to add to Top 10:", error);
      }
    },
    [userId]
  );

  return {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
  };
};
