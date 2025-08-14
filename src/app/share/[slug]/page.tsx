"use client";

import { useEffect, useState } from "react";
import TMDbStyleMovieCard from "../../../components/top10CardMovie";
import Image from "next/image";
import userError from "../../../../public/userError.png";

export default function SharePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const [data, setData] = useState<any[] | null>(null);
  const [commentMap, setCommentMap] = useState<Record<string, string>>({});
  const [displayError, setDispalyError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/share/${slug}`
        );
        if (!res.ok) {
          setDispalyError(true);
          return;
        }
        const json = await res.json();
        if (mounted) setData(json.items ?? json);
        setDispalyError(false);
      } catch (e: any) {
        setDispalyError(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleAddEditComment = () => {};
  const handleDeleteComment = () => {};

  return (
    <div className="w-full itesm-center justify-center flex flex-col">
      {data && (
        <h2 className="relative mt-5 mb-5 flex flex-col items-center justify-center text-center text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white tracking-wide">
          {data?.[0]?.username && (
            <span className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
              Shared Top 10 from {data[0].username}
            </span>
          )}
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></span>
        </h2>
      )}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center justify-center">
        <a
          href="/login"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
        >
          Login
        </a>
        <a
          href="/signup"
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
        >
          Sign Up
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {data &&
          data.length > 0 &&
          data.map((movie: any, index) => (
            <div
              key={movie?.id ?? index}
              className="flex items-start highlight  m-5 bg-white dark:bg-zinc-900 rounded-lg shadow"
            >
              <div className="w-6 pt-2 pr-1 items-center mt-[5rem] mr-5 ml-5 text-2xl font-bold text-white text-right">
                {index + 1}
              </div>

              {movie && (
                <div className="relative">
                  <TMDbStyleMovieCard
                    key={movie.id}
                    movie={movie}
                    comment={commentMap[movie.id] ?? null}
                    setComment={(newComment: string) =>
                      setCommentMap((prev) => ({
                        ...prev,
                        [movie.id]: newComment,
                      }))
                    }
                    handleAddEditComment={handleAddEditComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      {!data && displayError ? (
        <div className="flex flex-col items-center justify-center ">
          <div className="relative w-[400px] h-[400px]">
            <Image
              src={userError}
              alt={"Error"}
              fill
              className=""
              sizes="300px"
              priority
            />
          </div>
          <p>User Top 10 not Available!</p>
        </div>
      ) : null}
    </div>
  );
}
