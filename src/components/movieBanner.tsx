import Image from 'next/image';

interface MovieActionsProps {
  movie: any;
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
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const MovieBanner: React.FC<MovieActionsProps> =  ({ movie} ) => {  
    const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const averageScoreConsistency = (score: any) => {
    if(score > 0){
     return score.toFixed(1);
        } else {
            return 'NR'
     }
    };

    function formatRuntime(minutes: number): string {
    if (!minutes || minutes <= 0) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    };

    const getGenreNames = () => {
      if (movie.genres && Array.isArray(movie.genres)) {
        return movie.genres.map((genre: any) => genre.name);
      } else if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
        return movie.genre_ids
          .map((id: number) => GENRE_MAP[id])
          .filter(Boolean);
      } else if (movie.genreIds && Array.isArray(movie.genreIds)) {
        return movie.genreIds
          .map((id: number) => GENRE_MAP[id])
          .filter(Boolean);
      }
      return [];
    };

    const genres = getGenreNames();

  return (
    <div className="relative w-full min-h-screen pb-5 text-white">
      <div className="absolute  inset-0  z-0">
        <Image
          src={backdrop}
          alt="Backdrop"
          fill
          className="object-cover brightness-30"
          priority
        />
      </div>
      <div className="absolute inset-0  bg-black/10"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 px-6 py-10 md:px-20">
        <div className="w-full md:w-1/3 lg:w-1/3 flex-shrink-0">
          <Image
            src={poster}
            alt={movie.title}
            width={400}
            height={450}
            className="rounded-xl shadow-lg"
            
          />
        </div>
        <div className="to-bg-black-10 absolute inset-0 h-full w-full  bg-gradient-to-tl  from-transparent via-transparent to-black/90 " />

        <div className="rounded-lg backdrop-blur-xl bg-black/50 p-4 shadow-[0_0_20px_2px_rgba(255,255,255,0.1)]">
        <div className="flex-1 mt-6  md:mt-0 max-w-4xl w-full p-3 backdrop-blur-xl min-h-[550px] rounded-lg bg-black/2">
        <div className="flex justify-center items-center">         
             <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
        </div>
            <p className="mb-3"><strong>Time:</strong> {formatRuntime(movie.runtime)}</p>
            <p><strong>{movie.tagline}</strong></p>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            
            {/* Genre Tags */}
            {genres.length > 0 && (
              <div className="mb-3">
                <p className="mb-2"><strong>Genres:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre:any, index:any) => (
                    <span
                      key={index}
                      className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <h3 className='flex justify-center mt-2 mb-2'>Overview</h3>
            <p className="text-gray-300 mb-4">{movie.overview}</p>
          <div className="text-md text-gray-400 space-y-1">
           <p className="flex items-center gap-2">
            <strong>Rating:</strong>
            <span className="flex items-center gap-1">
            {averageScoreConsistency(movie.vote_average)}
                <svg 
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="yellow"
                className="h-5 w-5"
                >
                <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                />
                </svg>
            </span>
            </p>
            <p><strong>Language:</strong> {movie.original_language.toUpperCase()}</p>
            <p><strong>Popularity:</strong>  {averageScoreConsistency(movie.popularity)}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MovieBanner;