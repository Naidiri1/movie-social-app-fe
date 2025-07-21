'use client'

import React, { useEffect, useState } from "react"
import  CardMovie  from '../../components/CardMovie';

const UpcomingMovies = () => {
    const [rowData, setRowData] = useState([]);

    const handleSearchPopularMovies = async () => {
      const response = await fetch(`http://localhost:8080/api/movies/upcoming`);

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        } 
        if(response.ok){
            const data = await response.json();
            const results = data.results;
            console.log(results)
            setRowData(results)
        }
    };

   useEffect(() => {
    handleSearchPopularMovies();
   },[]);

    return(
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
    }

export default UpcomingMovies