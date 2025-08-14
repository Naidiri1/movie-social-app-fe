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
    <div className="w-full h-full flex flex-col bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 cursor-move">
      <div className="flex flex-col lg:flex-row gap-4 h-full">
        
        <div className="flex flex-col flex-1 text-blue-gray-600 dark:text-white">
          <h2 className="text-lg lg:text-xl font-semibold mb-3 line-clamp-2 min-h-[3.5rem]">
            {movie.title}
          </h2>

          <div className="flex flex-row gap-4 flex-1">
            <div className="relative w-[100px] h-[150px] flex-shrink-0 overflow-hidden rounded-md">
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

            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                {movie.releasedDate || "Release date unknown"}
              </p>

              <div className="mb-2 min-h-[2rem]">
                {genres.length > 0 ? (
                  <div className="flex flex-wrap gap-1 max-h-[3.5rem] overflow-hidden">
                    {genres.slice(0, 4).map((genre: any, index: any) => (
                      <span
                        key={index}
                        className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full h-fit"
                      >
                        {genre}
                      </span>
                    ))}
                    {genres.length > 4 && (
                      <span className="inline-block bg-gray-600 text-white text-xs px-2 py-1 rounded-full h-fit">
                        +{genres.length - 4}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="h-[1.5rem]"></div>
                )}
              </div>

              <div className="flex-1 min-h-[4rem] max-h-[4rem] mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 overflow-y-auto h-full pr-2 custom-scrollbar">
                  {movie.movieDescription || "No description available"}
                </p>
              </div>

              <div className="mt-auto">
                <Typography
                  color="black"
                  className="flex items-center gap-1.5 font-normal dark:text-white"
                >
                  <span className="flex items-center gap-1 text-sm">
                    Public Score:
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="orange"
                      className="-mt-0.5 h-4 w-4 text-orange-800"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-sm">
                    {averageScoreConsistency(movie.publicScore)}
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-5 w-full lg:w-[260px] flex-shrink-0">
          <div className="flex-1">
            <textarea
              value={comment}
              disabled={isDisabled || readOnlySharedLink}
              onChange={(e) => setComment(e.target.value)}
              placeholder={`${!readOnlySharedLink ? "My Review" : `No Review from: ${movie.username}`}`}
              className={`w-full p-2 rounded-md resize-none text-sm h-[7rem] lg:h-[10rem] ${
                isDisabled || readOnlySharedLink
                  ? "bg-blue-gray-100 text-black dark:bg-zinc-700 dark:text-gray-400"
                  : "bg-zinc-100 dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 text-blue-gray-600 dark:text-white"
              }`}
            />
          </div>

          <div className="flex flex-row gap-4 justify-center items-center mt-3 min-h-[3rem]">
            {!readOnlySharedLink && !isDisabled ? (
              <button
                onClick={() => {
                  if (comment) {
                    handleAddEditComment(movie);
                    setIsDisabled(true);
                  }
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
                disabled={!comment}
              >
                <IoAddCircleOutline
                  className={`h-5 w-5 ${comment ? 'text-blue-500 hover:text-blue-700' : 'text-gray-400'}`}
                />
                <p className="text-xs text-blue-gray-600 dark:text-gray-400 mt-1">Post</p>
              </button>
            ) : !readOnlySharedLink && isDisabled ? (
              <button
                onClick={() => {
                  handleAddEditComment(movie);
                  setIsDisabled(false);
                }}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
              >
                <FaEdit className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                <p className="text-xs text-blue-gray-600 dark:text-gray-400 mt-1">Edit</p>
              </button>
            ) : null}
            
            {!readOnlySharedLink && (
              <button
                onClick={() => handleDeleteComment(movie)}
                className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform"
              >
                <RiDeleteBin6Line className="h-5 w-5 text-red-500 hover:text-red-700" />
                <p className="text-xs text-blue-gray-600 dark:text-gray-400 mt-1">Delete</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TMDbStyleMovieCard;