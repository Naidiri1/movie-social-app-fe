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
  Textarea,
} from "@material-tailwind/react";
import Image from "next/image";
import IconCard from "./IconCard";
import fallback1 from "../../public/fallback1.jpg";
import { useRouter } from "next/navigation";
import RatingSlider from "../components/ratingTool";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCloseSharp } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";

interface CardMovieProps {
  movie: Movie;
  handleAddFavorites: (movie: any, score?: number) => void;
  successScore: any;
  handleDeleteScore: (movie: Movie) => void;
  initialScore: number | null;
  handleDeleteMovie: (movie: Movie) => void;
  comment: any;
  setComment: (comment: any) => void;
  handleAddEditComment: (movie: any) => void;
  handleDeleteComment: (movie: any) => void;
}

const CrudCardMovie: React.FC<CardMovieProps> = ({
  movie,
  handleAddFavorites,
  successScore,
  handleDeleteScore,
  initialScore,
  handleDeleteMovie,
  comment,
  setComment,
  handleAddEditComment,
  handleDeleteComment,
}) => {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const router = useRouter();
  const [enableScore, setEnableScore] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const averageScoreConsistency = (score: any) => {
    if (score > 0) {
      return score.toFixed(1);
    } else {
      return "NR";
    }
  };

  useEffect(() => {
    if (movie.comment) {
      setComment(movie.comment);
      setIsDisabled(true);
    } else{ 
     setIsDisabled(false);
    }
  }, [movie.comment]);

  const handleMovieDEtails = () => {
    if (movie.movieId === null || movie.movieId === undefined) {
      return;
    }
    router.push(`/movieDetails?id=${movie.movieId}`);
    console.log(movie.id);
  };

  const handleDisplayRating = () => {
    setEnableScore(!enableScore);
  };

  return (
    <Card className="flex flex-col justify-between h-full bg-black text-white max-w-[23rem] mx-auto shadow-lg">
      <CardHeader className="bg-black" floated={false} color="white">
        <div className="relative w-[500px] h-[450px]">
          <Image
            src={movie.posterPath ? IMG_BASE_URL + movie.posterPath : fallback1}
            alt={movie.title}
            fill
            className="rounded-t-xl object-cover"
            sizes="300px"
            priority
          />
        </div>
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/90 " />

        <div className="absolute top-4 right-2 z-10">
          <button
            onClick={() => handleDeleteMovie(movie)}
            className="bg-black/60 hover:bg-red/80 p-1 border border-red-500 rounded-full text-red"
            aria-label="Remove from Favorites"
          >
            <IoCloseSharp className="h-5 w-5 text-red-800 hover:text-red-200" />
          </button>
        </div>
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
          className="flex items-center gap-1.5 mb-4 font-normal"
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
            {movie.userScore != null ? (
              movie.userScore
            ) : (
              <span className="text-yellow-500 text-xl">?</span>
            )}
          </span>
          <div className="flex ml-[2rem] flex-row">
            {movie.userScore != null && (
              <div className="flex flex-col items-center cursor-pointer">
                <FaEdit
                  onClick={handleDisplayRating}
                  className="h-4 w-4 text-orange-400 hover:text-yellow-500"
                />
                <p className="mt-1 text-xs">Edit</p>
              </div>
            )}
            {movie.userScore != null && (
              <div className="flex ml-3 flex-col items-center cursor-pointer">
                <RiDeleteBin6Line
                  onClick={() => handleDeleteScore(movie)}
                  className="h-4 w-4 text-orange-400 hover:text-red-500"
                />
                <p className="mt-1 text-xs">Delete</p>
              </div>
            )}
          </div>
        </Typography>
        <Typography
          className="text-xs mt-2 overflow-y-auto min-h-[4.5rem] max-h-[4.5rem] pr-1"
          color="white"
        >
          {movie.movieDescription}
        </Typography>
        <div className="mb-3 min-h-[3.2rem] max-h-[3.2rem] ">
          {(movie.userScore === null || enableScore) && (
            <RatingSlider
              onSubmit={(score) => handleAddFavorites(score)}
              successScore={successScore}
              initialScore={initialScore}
            />
          )}
        </div>
        <div className="w-full mt-5 flex flex-row items-start justify-between gap-2">
          <div
            className={`rounded p-3 w-full min-h-[6rem] max-h-[6rem]   ${
              isDisabled ? "bg-black text-white" : "bg-black"
            }`}
          >
            <textarea
              value={comment}
              disabled={isDisabled}
              onChange={(e) => setComment(e.target.value)}
              className={`w-full p-2 rounded resize-none outline-none ${
                isDisabled
                  ? "bg-blue-gray-800 text-white"
                  : "bg-black text-white border boder-white placeholder:text-white"
              }`}
              placeholder="My Opinion..."
            />
          </div>
          <div className="flex flex-col items-center justify-start gap-2 pt-3">
          {!isDisabled ? (
            <div className="flex flex-col items-center cursor-pointer">
              <IoAddCircleOutline
                onClick={() => handleAddEditComment(movie)}
                className="h-5 w-5 text-white hover:text-blue-500"
              />
              <p className="text-[0.65rem] text-white text-center">
                Post
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center cursor-pointer">
              <FaEdit
                onClick={() =>{
                     handleAddEditComment(movie)
                     setIsDisabled(false);
                    }}
                className="h-5 w-5 text-white hover:text-blue-500"
              />
              <p className="text-[0.65rem] text-white text-center">
                Edit
              </p>
            </div>
          )}
            <div className="flex flex-col items-center cursor-pointer">
              <RiDeleteBin6Line
                onClick={() => handleDeleteComment(movie)}
                className="h-5 w-5 text-white hover:text-red-500"
              />
              <p className="text-[0.65rem] text-white text-center">Delete</p>
            </div>
          </div>
        </div>
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
