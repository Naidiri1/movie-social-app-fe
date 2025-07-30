import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import Image from "next/image";
import IconCard from "./IconCard";
import fallback1 from "../../public/fallback1.jpg";
import { useRouter } from "next/navigation";
import RatingSlider from '../components/ratingTool';
import { FaEdit } from "react-icons/fa";


interface CardMovieProps {
  movie: Movie;
  handleAddFavorites: (movie: any, score?:number) => void;
 
}
const CrudCardMovie: React.FC<CardMovieProps> = ({
  movie,
  handleAddFavorites,
 
}) => {
  console.log(movie);
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const router = useRouter();
  const [enableScore, setEnableScore] = useState(false);
  const averageScoreConsistency = (score: any) => {
    if (score > 0) {
      return score.toFixed(1);
    } else {
      return "NR";
    }
  };

   const handleSubmitScore = (score: number) => {
    handleAddFavorites(movie, score); 
  };

  const handleMovieDEtails = () => {
    if (movie.movieId === null || movie.movieId === undefined) {
      return;
    }
    router.push(`/movieDetails?id=${movie.movieId}`);
    console.log(movie.id);
  };

  const handleEnableScore =() => {
   setEnableScore(true);
  };

  return (
    <Card className="flex flex-col justify-between h-full bg-black text-white max-w-[22rem] mx-auto shadow-lg">
      <CardHeader className="bg-black" floated={false} color="white">
        <div className="relative w-[300px] h-[450px]">
          <Image
            src={
              movie.posterPath ? IMG_BASE_URL + movie.posterPath : fallback1
            }
            alt={movie.title}
            fill
            className="rounded-t-xl object-cover"
            sizes="300px"
            priority
          />
        </div>
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/90 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 px-2 flex items-center justify-between  min-h-[2rem] max-h-[2rem]">
          <Typography variant="h5" color="white" className="font-medium ">
            {movie.title}
          </Typography>
        </div>
        <Typography
          color="white"
          className="mt-2 mb-1 text-xs min-h-[1rem] max-h-[1rem]"
        >
          {movie.releasedDate}
        </Typography>
         <Typography
            color="white"
            className="flex items-center gap-1.5 font-normal"
          >
             <span className="flex items-center gap-1">
            Public Score: 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="yellow"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            </span>
            {averageScoreConsistency(movie.publicScore)}
          </Typography>
          <Typography
            color="white"
            className="flex items-center  gap-2 font-normal"
            >
             <span className="flex items-center gap-1">
            My Score:{" "}
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="yellow"
              className="-mt-0.5 h-5 w-5 text-yellow-700"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
            {movie.userScore != null ? movie.userScore : <span className="text-yellow-500 text-xl">?</span>}
           
            </span>
            {movie.userScore != null &&  (
            <div className="flex flex-col items-center cursor-pointer" onClick={handleEnableScore}>
                <FaEdit className="h-4 w-4 text-orange-400 hover:text-yellow-500" />
                <p className="mt-1 text-xs">Edit</p>
            </div>
            )}
            </Typography>
        <Typography
          className="text-xs mt-2 overflow-y-auto min-h-[4.5rem] max-h-[4.5rem] pr-1"
          color="white"
        >
          {movie.movieDescription}
        </Typography>
         {!movie.userScore && (
        <RatingSlider
        onSubmit={(score) => handleAddFavorites(score)} 
        />
         )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button size="md" onClick={handleMovieDEtails} fullWidth={true}>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CrudCardMovie;
