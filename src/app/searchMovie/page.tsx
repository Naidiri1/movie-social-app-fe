'use client'

import React, { useEffect, useState } from 'react';
import SearchResult from "@/components/searchResult";
import CardMovie from '@/components/CardMovie';

const SearchResults = () => {
    const [rowCardData , setRowCardData] = useState([]);
    const movieString = SearchResult();
   
    console.log(movieString)

    useEffect(() => {
      if (movieString) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/search?query=${movieString}`)
            .then(res => res.json())
            .then(data => setRowCardData(data.results)); 
      }
    }, [movieString]);

    
return(
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
     {rowCardData.map((movie:any) => (
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

export default SearchResults