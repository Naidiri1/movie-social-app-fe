'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieBanner from "@/components/movieBanner";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [token, setToken] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedToken = typeof window !== 'undefined' 
      ? sessionStorage.getItem("access_token") 
      : null;
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (mounted && token && id) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/movieDetails?id=${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
        .then((res) => res.json())
        .then((data: any) => setMovie(data))
        .catch((err) => console.error("Error fetching movie details:", err));
    }
  }, [id, mounted]);

  if (!movie) return <p>Loading...</p>;
  return (
    <div>
      <MovieBanner movie={movie} />
    </div>
  );
};

export default MovieDetailsPage;
