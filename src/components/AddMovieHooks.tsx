import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useCallback } from "react";

export const AddMovieHooks = () => {
    const { userId } = useSelector((state: RootState) => state.auth);
    console.log(userId)
     const handleAddFavorites = useCallback(async (movie: any) => {
    try {
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
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
  }, []);

  const handleAddToWatched = useCallback(async (movie: any) => {
    try {
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
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
  }, []);

  const handleAddToTop10 = useCallback(async (movie: any) => {
    try {
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
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Failed to add to favorites", error);
    }
  }, []);

   return {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
  };
};