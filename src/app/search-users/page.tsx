"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Typography, Card, CardBody, Collapse } from "@material-tailwind/react";
import { 
  UserIcon, 
  ChevronDownIcon, 
  ChevronUpIcon, 
  ArrowLeftIcon,
  HandThumbUpIcon,
  HandThumbDownIcon 
} from "@heroicons/react/24/outline";
import { 
  HandThumbUpIcon as ThumbsUpSolid,
  HandThumbDownIcon as ThumbsDownSolid 
} from "@heroicons/react/24/solid";
import { BookmarkIcon, EyeIcon, Trophy } from "lucide-react";
import { CgSandClock } from "react-icons/cg";
import CrudCardMovie from "../../components/CrudCardMovie";
import Image from "next/image";
import movieImg from '../../../public/movie.png';

export default function SearchUsers() {
  type CategoryType = 'favorites' | 'watched' | 'top10' | 'watchLater';
  

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  const [userMovies, setUserMovies] = useState<UserMoviesState>({
    favorites: [],
    watched: [],
    top10: [],
    watchLater: []
  });
  
  const [openSections, setOpenSections] = useState<OpenSectionsState>({
    favorites: false,
    watched: false,
    top10: false,
    watchLater: false
  });
  
  const [loadingStates, setLoadingStates] = useState<LoadingStatesType>({
    favorites: false,
    watched: false,
    top10: false,
    watchLater: false
  });

  const [loadedCategories, setLoadedCategories] = useState<LoadedCategoriesType>({
    favorites: false,
    watched: false,
    top10: false,
    watchLater: false
  });

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const token = sessionStorage.getItem("access_token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/search?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.content || []);
        setSelectedUser(null); 
      } else {
        console.error("Failed to search users");
      }
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserMovies = async (userId: string, category: CategoryType) => {
    // If section is open, close it
    if (openSections[category]) {
      setOpenSections(prev => ({
        ...prev,
        [category]: false
      }));
      return;
    }

    if (loadedCategories[category]) {
      setOpenSections(prev => ({
        ...prev,
        [category]: true
      }));
      return;
    }

    setLoadingStates(prev => ({
      ...prev,
      [category]: true
    }));

    try {
      const token = sessionStorage.getItem("access_token");
      const endpoints: Record<CategoryType, string> = {
        favorites: 'favorites',
        watched: 'watched', 
        top10: 'top10',
        watchLater: 'watch-later'
      };
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}/${endpoints[category]}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const movies = category === 'top10' ? data : (data.content || data);
        
        setUserMovies(prev => ({
          ...prev,
          [category]: movies
        }));
        setLoadedCategories(prev => ({
          ...prev,
          [category]: true
        }));
        setOpenSections(prev => ({
          ...prev,
          [category]: true
        }));
      } else {
        console.error(`Failed to load ${category}`);
      }
    } catch (error) {
      console.error(`Error loading ${category}:`, error);
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        [category]: false
      }));
    }
  };

  const selectUser = (user: any) => {
    setSelectedUser(user);
    setUserMovies({
      favorites: [],
      watched: [],
      top10: [],
      watchLater: []
    });
    setOpenSections({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false
    });
    setLoadedCategories({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false
    });
  };

  const clearSelectedUser = () => {
    setSelectedUser(null);
    setUserMovies({
      favorites: [],
      watched: [],
      top10: [],
      watchLater: []
    });
    setOpenSections({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false
    });
    setLoadedCategories({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  };

  
    useEffect(() => {
      if (searchQuery === "" || searchQuery === undefined) {
        setSearchResults([]);
        setSelectedUser(null);
      }
    }, [searchQuery]);

  const renderMovieSection = (category: CategoryType, icon: React.ReactNode, title: string, count: number) => (
    <Card className="bg-gray-800 mb-4" key={category}>
      <CardBody>
        <Button
          variant="text"
          className="w-full flex items-center justify-between p-0 text-white hover:bg-gray-700"
          onClick={() => loadUserMovies(selectedUser.userId, category)}
          disabled={loadingStates[category]}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span>
              {title} ({count})
              {loadingStates[category] && " - Loading..."}
            </span>
          </div>
          {openSections[category] ? 
            <ChevronUpIcon className="h-5 w-5" /> : 
            <ChevronDownIcon className="h-5 w-5" />
          }
        </Button>
        
        <Collapse open={openSections[category]}>
          <div className="mt-4">
            {userMovies[category].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userMovies[category].map((movie, index) => (
                  <div key={movie.id} className="relative">
                    {category === 'top10' && movie.rank && (
                      <div className="absolute top-2 left-12 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-10">
                        {movie.rank}
                      </div>
                    )}
                    <CrudCardMovie
                      movie={{...movie, entryType: category}} 
                      handleAddMovie={() => {}} 
                      successScore={false}
                      handleDeleteScore={() => {}} 
                      initialScore={movie.userScore}
                      handleDeleteMovie={() => {}} 
                      comment={movie.comment || ""}
                      setComment={() => {}} 
                      handleAddEditComment={() => {}} 
                      handleDeleteComment={() => {}}
                    //   commentLikes={movie.commentLikes || 0}
                    //   commentDislikes={movie.commentDislikes || 0}
                    //   userLikeStatus={movie.userLikeStatus || null}
                    //   onLikeComment={(movieId, isLike) => {
                    //     console.log(`${isLike ? 'Liked' : 'Disliked'} comment on movie ${movieId} in ${category}`);
                    //   }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Image src={movieImg} alt="No movies" width={200} height={200} />
                <Typography className="text-gray-400 mt-2">
                  No {title.toLowerCase()} yet
                </Typography>
              </div>
            )}
          </div>
        </Collapse>
      </CardBody>
    </Card>
  );

  return (
    <div className="w-full max-w-none p-6">
      <div className="mb-8">
        <Typography variant="h4" className="text-white text-center mb-6">
          Search Users
        </Typography>
        
        <div className="flex justify-center">
           <div className="relative w-full text-white md:w-80">
                <Input
                type="search"
                label="Search Users"
                color="blue-gray"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}

                className="text-white"
                />
                <button
                    onClick={searchUsers}
                disabled={loading}
                className="absolute top-1 right-1 flex items-center rounded bg-gray-800 py-1 pt-2 px-3 text-sm text-white hover:bg-gray-700 transition-all"
                type="button"
                placeholder="Search Movie..."
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 mr-1"
                >
                    <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                    />
                </svg>
                Search
                </button>
            </div>
        </div>
      </div>

      {!selectedUser && searchResults.length > 0 && (
        <div className="mb-8">
          <Typography variant="h5" className="text-white mb-4">
            Search Results ({searchResults.length})
          </Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((user) => (
              <Card 
                key={user.userId} 
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => selectUser(user)}
              >
                <CardBody>
                  <div className="flex items-center gap-3 mb-3">
                    <UserIcon className="h-8 w-8 text-blue-400" />
                    <div>
                      <Typography variant="h6" className="text-white">
                        {user.username}
                      </Typography>
                      <Typography variant="small" className="text-gray-400">
                        Total items: {user.totalCount || 0}
                      </Typography>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-300">
                      <BookmarkIcon className="h-4 w-4" />
                      <span>{user.favoritesCount} Favorites</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <EyeIcon className="h-4 w-4" />
                      <span>{user.watchedCount} Watched</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Trophy className="h-4 w-4" />
                      <span>{user.top10Count} Top 10</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <CgSandClock className="h-4 w-4" />
                      <span>{user.watchLaterCount} Watch Later</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="mb-8">
          <div className="mb-6">
            <Button
              variant="text"
              className="text-gray-400 hover:text-white mb-4 flex items-center gap-2"
              onClick={clearSelectedUser}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to search results
            </Button>
            
            <Card className="bg-gray-800 mb-6">
              <CardBody>
                <div className="flex items-center gap-4">
                  <UserIcon className="h-12 w-12 text-blue-400" />
                  <div className="flex-1">
                    <Typography variant="h5" className="text-white mb-1">
                      {selectedUser.username}'s Profile
                    </Typography>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{selectedUser.favoritesCount + selectedUser.watchedCount + selectedUser.top10Count + selectedUser.watchLaterCount} total movies</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-4">
            {renderMovieSection('favorites' as CategoryType, <BookmarkIcon className="h-5 w-5" />, 'Favorites', selectedUser.favoritesCount)}
            {renderMovieSection('watched' as CategoryType, <EyeIcon className="h-5 w-5" />, 'Watched', selectedUser.watchedCount)}
            {renderMovieSection('top10' as CategoryType, <Trophy className="h-5 w-5" />, 'Top 10', selectedUser.top10Count)}
            {renderMovieSection('watchLater' as CategoryType, <CgSandClock className="h-5 w-5" />, 'Watch Later', selectedUser.watchLaterCount)}
          </div>
        </div>
      )}
    </div>
  );
}