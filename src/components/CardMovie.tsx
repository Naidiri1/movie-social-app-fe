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
 import { EyeIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Trophy } from 'lucide-react';
import Image from "next/image";



interface CardMovieProps {
    key: any;
    movieTitle: any;
    movieDescription: any;
    movieScore: any;
    imgPoster: any;
    movieRelease: any;
}
  const CardMovie: React.FC<CardMovieProps> = ({
        key,
        movieTitle,
        movieDescription,
        imgPoster,
        movieRelease,
        movieScore,
    }) => {

 const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <Card key={key} className=" mx-auto mt-5 items-center justify-center bg-black  text-white  max-w-[19rem] shadow-lg">
      <CardHeader className="bg-black"floated={false} color="white">
         <Image
            src={IMG_BASE_URL + imgPoster}
            alt={movieTitle}
            width={300}
            height={450}
            className="rounded-t-xl object-cover"
      />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
       
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="white" className="font-medium">
           {movieTitle}
          </Typography>
          <Typography
            color="white"
            className="flex items-center gap-1.5 font-normal"
          >
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
           {movieScore}
          </Typography>
        </div>
        <Typography className="text-xs" color="white">
        {movieDescription}
        {movieRelease}
        </Typography>
        <div className="mt-8 inline-flex ml-[3rem] flex-wrap items-center ">
         <Tooltip content="Watched">
        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
            <EyeIcon className="h-5 w-5 text-white" />
        </span>
        </Tooltip>
         <Tooltip content="Add to Favorites">
        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
            <BookmarkIcon className="h-5 w-5 text-white" />
        </span>
        </Tooltip>
         <Tooltip content="Add to Top 10">
        <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
            <Trophy className="h-5 w-5 text-white" />
        </span>
        </Tooltip>
          
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true}>
          Details...
        </Button>
      </CardFooter>
    </Card>
  );
}

export default CardMovie;
