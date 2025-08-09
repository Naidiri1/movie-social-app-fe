"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import Navbar from "@/components/NavBar";
import Image from "next/image";


export default function Home() {
  const [movieQuery, setMovieQuery] = useState<string>("");
const token = sessionStorage.getItem("access_token");

  const searchMovies = async () => {
    const response = await fetch(
      `http://localhost:8080/api/movies/search?query=${movieQuery}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  const handleSearchPopularMovies = async () => {
    const response = await fetch(`http://localhost:8080/api/movies/popular`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <div className="max-auto w-full">
      <Input
        label="Search"
        value={movieQuery}
        onChange={(e: any) => setMovieQuery(e.target.value)}
      />
      <Button onClick={searchMovies}>Search</Button>
      <Button onClick={handleSearchPopularMovies}>Popular</Button>
    </div>
  );
}
