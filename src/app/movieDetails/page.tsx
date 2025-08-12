"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieBanner from "@/components/movieBanner";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const token = sessionStorage.getItem("access_token");

  useEffect(() => {
    if (id) {
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
  }, [id]);

  if (!movie) return <p>Loading...</p>;
  return (
    <div>
      <MovieBanner movie={movie} />
    </div>
  );
};

export default MovieDetailsPage;
