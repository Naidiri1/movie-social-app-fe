import Image from "next/image";
import fallback1 from "../../public/fallback1.jpg";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddCircleOutline, IoCloseSharp } from "react-icons/io5";
import RatingSlider from "../components/ratingTool";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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

interface Props {
  movie: Movie;
  comment: any;
  setComment: (comment: any) => void;
  handleAddEditComment: (movie: any) => void;
  handleDeleteComment: (movie: any) => void;
}

const GENRE_MAP: { [key: number]: string } = {
  28: "Action",
  12: "Adventure", 
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const TMDbStyleMovieCard = ({
  movie,
  comment,
  setComment,
  handleAddEditComment,
  handleDeleteComment,
}: Props) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    if (movie.comment) {
      setComment(movie.comment);
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [movie.comment]);

  const averageScoreConsistency = (score: any) => {
    if (score > 0) {
      return score.toFixed(1);
    } else {
      return "NR";
    }
  };

  const getGenreNames = (movie: any) => {
    if (movie.genres && Array.isArray(movie.genres)) {
      if (typeof movie.genres[0] === 'string') {
        return movie.genres.slice(0, 4); 
      }
      return movie.genres.map((genre: any) => genre.name).slice(0, 4);
    } else if (movie.genreIds && Array.isArray(movie.genreIds)) {
      return movie.genreIds
        .map((id: number) => GENRE_MAP[id])
        .filter(Boolean)
        .slice(0, 4);
    } else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
      return movie.genre_ids
        .map((id: number) => GENRE_MAP[id])
        .filter(Boolean)
        .slice(0, 4);
    }
    return [];
  };

  const genres = getGenreNames(movie);
  const path = usePathname() || "";
  const readOnlySharedLink = path.startsWith("/share/");

  return (
    <div className="w-full flex flex-col items-center justify-center   custom:flex-row bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 gap-6 cursor-move sm:items-start">
      <div className="flex flex-col flex-grow text-blue-gray-600  dark:text-white">
        <h2 className="text-xl font-semibold mt-5 mb-2">{movie.title}</h2>

        <div className="flex flex-row justify-center items-center gap-4">
          <div className="relative w-[100px] h-[150px] shrink-0 overflow-hidden rounded-md">
            <Image
              src={
                movie.posterPath ? IMG_BASE_URL + movie.posterPath : fallback1
              }
              alt={movie.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex flex-col  justify-between w-full">
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
              {movie.releasedDate}
            </p>

            {genres.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {genres.map((genre: any, index: any) => (
                    <span
                      key={index}
                      className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-sm min-h-[5rem]  max-h-[5rem] text-blue-gray-600  overflow-y-auto text-gray-600 dark:text-gray-300 mb-3 max-w-3xl">
              {movie.movieDescription}
            </p>

            <Typography
              color="black"
              className="flex items-center gap-1.5 mb-4 font-normal"
            >
              <span className="flex items-center gap-1">
                Public Score:
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="orange"
                  className="-mt-0.5 h-5 w-5 text-orange-800"
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
          </div>
        </div>
      </div>

      <div className="flex flex-col  sm:w-[290px] w-full mt-4 sm:mt-0">
        <div className="mt-[26px]">
          <textarea
            value={comment}
            disabled={isDisabled || readOnlySharedLink}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`${!readOnlySharedLink ? "My Opinion" : `No opinion from: ${movie.username} `}`}
            className={`w-full p-2 rounded-md resize-none text-sm min-h-[7rem] ${
              isDisabled || readOnlySharedLink
                ? "bg-blue-gray-100 text-black"
                : "bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-white text-blue-gray-600  dark:text-white"
            }`}
          />
        </div>

        <div className="flex flex-row gap-4 justify-evenly items-center flex-wrap">
          {!readOnlySharedLink && !isDisabled ? (
            <div className="flex flex-col items-center cursor-pointer">
              <IoAddCircleOutline
                onClick={() => {
                  {
                    comment ? handleAddEditComment(movie) : setIsDisabled;
                  }
                  {
                    comment ? setIsDisabled(true) : setIsDisabled(false);
                  }
                }}
                className="h-5 w-5 text-blue-500 hover:text-blue-900"
              />
              <p className="text-xs text-blue-gray-600 ">Post</p>
            </div>
          ) : !readOnlySharedLink && isDisabled ? (
            <div className="flex flex-col items-center cursor-pointer">
              <FaEdit
                onClick={() => {
                  handleAddEditComment(movie);
                  setIsDisabled(false);
                }}
                className="h-4 w-4 text-blue-500 hover:text-blue-900"
              />
              <p className="text-xs text-blue-gray-600 ">Edit</p>
            </div>
          ) : null}
          {!readOnlySharedLink && (
            <div className="flex flex-col items-center cursor-pointer">
              <RiDeleteBin6Line
                onClick={() => handleDeleteComment(movie)}
                className="h-5 w-5 text-red-500 hover:text-red-300"
              />
              <p className="text-xs text-blue-gray-600 ">Delete</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TMDbStyleMovieCard;