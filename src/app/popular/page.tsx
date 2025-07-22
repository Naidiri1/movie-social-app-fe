'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import  CardMovie  from '../../components/CardMovie';

export default function Popular()  {
    
    const [rowData, setRowData] = useState([]);

    const handleSearchPopularMovies = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/popular`);

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    } 

    if(response.ok){
        const data = await response.json();
        const results = data.results;
        console.log(results)
        setRowData(results)
    }
    }  

    useEffect(() => {
    handleSearchPopularMovies();
    },[])
    
    return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
 {rowData.map((movie:any) => (
        <CardMovie
          key={movie.id}
          movieId={movie.id}
          movieTitle={movie.title}
          movieDescription={movie.overview}
          movieScore={movie.vote_average}
          imgPoster={movie.poster_path}
          movieRelease={movie.release_date}
        />
      ))}
</div>
    )
};