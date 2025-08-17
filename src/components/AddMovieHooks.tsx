import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useCallback } from "react";
import { selectUser } from '../redux/reducers/userSlice';

export const AddMovieHooks = () => {
  const user = useSelector(selectUser);
   const userId =user.userId;
  const token = sessionStorage.getItem("access_token");

  const verifyMovieAlreadyAdded = async (
    movie: any,
    listType: "favorites" | "top10" | "watched" | "watch-later"
  ): Promise<boolean> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${listType}?userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
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
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
              genreIds: movie.genre_ids, 
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
        }
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
}, [userId, token]);

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
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
              genreIds: movie.genre_ids, 
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
        }
      }
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
}, [userId, token]);

  const handleAddToTop10 = useCallback(
    async (movie: any) => {
      try {
        const top10Response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!top10Response.ok) {
          console.error("Failed to fetch top10");
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
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/top10?userId=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
              genreIds: movie.genre_ids, 
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

  const handleAddWatchLater = useCallback(async (movie: any) => {
    try {
      const alreadyExist = await verifyMovieAlreadyAdded(movie, "watch-later");
      if (alreadyExist) {
        return;
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/watch-later?userId=${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
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
              genreIds: movie.genre_ids, 
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
        }
      }
    } catch (error) {
      console.error("Failed to add to watch later", error);
    }
}, [userId, token]);

  return {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
    handleAddWatchLater,
  };
};