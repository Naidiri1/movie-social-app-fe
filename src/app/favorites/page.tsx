'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import  CardMovie  from '../../components/CardMovie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CrudCardMovie from '../../components/CrudCardMovie'

export default function FavoriteMovies()  {
    const [rowData, setRowData] = useState([]);
    const { userId } = useSelector((state: RootState) => state.auth);

   
    
    const handleFavoriteMovies = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites?userId=${userId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch movies');
    } 

    if(response.ok){
        const data = await response.json();
        const results = data;
        console.log(results)
        setRowData(results)
    }
    }  

    useEffect(() => {
    handleFavoriteMovies();
    },[])
    
    const handleAddFavorites  =  async (movie: any, score?: number)=> {
    const response = await fetch(
       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favorites/${movie.id}?userId=${userId}`,
    {
      method: 'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
      userScore: score ?? null,
      comment: movie.comment,
      commentEnabled: movie.commentEnabled
      }),
    }
    )
    if(response.ok){
      const data = response.json();
      console.log(data)
    }
    };

    return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-none">
 {rowData.map((movie:any) => (
        <CrudCardMovie
          key={movie.id}
          movie={movie}
          handleAddFavorites={(score) => handleAddFavorites(movie, score)}         
           // handleAddToWatched={() =>handleAddToWatched(movie)}
          // handleEditScore={() =>handleEditScore(movie)}
        />
      ))}
</div>
    )
};