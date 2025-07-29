import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useCallback } from "react";

export const AddMovieHooks = () => {
    const { userId } = useSelector((state: RootState) => state.auth);

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
          comment: "pretty movie",
          userScore: 10,
          commentEnabled: true,
          releasedDate: movie.release_date,
          movieDescription: movie.overview,
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

    const handleAddToWatched = useCallback((movie: any) => {
    console.log("👁 Marked as watched:", movie.title);
  }, []);

  const handleAddToTop10 = useCallback((movie: any) => {
    console.log("⭐ Added to Top 10:", movie.title);
  }, []);

   return {
    handleAddFavorites,
    handleAddToWatched,
    handleAddToTop10,
  };
}