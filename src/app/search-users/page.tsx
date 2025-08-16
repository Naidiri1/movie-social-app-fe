"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  Typography,
  Card,
  CardBody,
  Collapse,
} from "@material-tailwind/react";
import {
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { RootState } from "../../redux/store";
import { BookmarkIcon, EyeIcon, Trophy } from "lucide-react";
import { CgSandClock } from "react-icons/cg";
import CrudCardMovie from "../../components/CrudCardMovie";
import Image from "next/image";
import movieImg from "../../../public/movie.png";
import {  selectUser } from '../../redux/reducers/userSlice';
import { useSelector } from "react-redux";

export default function SearchUsers() {
  type CategoryType = "favorites" | "watched" | "top10" | "watchLater";

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [originalSearchResults, setOriginalSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [mounted, setMounted] = useState(false);


   const getUserId = () => {
      if (typeof window !== 'undefined') {
       const user = useSelector(selectUser);
        const userId = user.userId;
        return userId;
      }
      return null;
    };
         const userId = getUserId();

 const getToken = () => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('access_token');
    }
    return null;
  }; 

     const token = getToken();


  const [userMovies, setUserMovies] = useState<UserMoviesState>({
    favorites: [],
    watched: [],
    top10: [],
    watchLater: [],
  });

  const [openSections, setOpenSections] = useState<OpenSectionsState>({
    favorites: false,
    watched: false,
    top10: false,
    watchLater: false,
  });

  const [loadingStates, setLoadingStates] = useState<LoadingStatesType>({
    favorites: false,
    watched: false,
    top10: false,
    watchLater: false,
  });

  const [loadedCategories, setLoadedCategories] =
    useState<LoadedCategoriesType>({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });

  const currentUserId = userId;

  const saveStateToSessionStorage = () => {
    try {
      if (typeof window === "undefined") return;

      sessionStorage.setItem("userSearch_query", searchQuery);
      sessionStorage.setItem(
        "userSearch_results",
        JSON.stringify(searchResults)
      );
      sessionStorage.setItem(
        "userSearch_originalResults",
        JSON.stringify(originalSearchResults)
      );
      sessionStorage.setItem(
        "userSearch_selectedUser",
        JSON.stringify(selectedUser)
      );
      sessionStorage.setItem(
        "userSearch_userMovies",
        JSON.stringify(userMovies)
      );
      sessionStorage.setItem(
        "userSearch_openSections",
        JSON.stringify(openSections)
      );
      sessionStorage.setItem(
        "userSearch_loadedCategories",
        JSON.stringify(loadedCategories)
      );
      sessionStorage.setItem(
        "userSearch_hasSearched",
        JSON.stringify(hasSearched)
      );
    } catch (error) {
      console.error("Error saving state to session storage:", error);
    }
  };

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (mounted && token && userId) {
        const savedResults = sessionStorage.getItem("userSearch_results");
        const savedOriginalResults = sessionStorage.getItem(
          "userSearch_originalResults"
        );

        if (savedResults && savedOriginalResults) {
          const savedQuery = sessionStorage.getItem("userSearch_query");
          if (savedQuery) {
            setSearchQuery(savedQuery);
          }

          const parsedResults = JSON.parse(savedResults);
          setSearchResults(parsedResults);

          const parsedOriginal = JSON.parse(savedOriginalResults);
          setOriginalSearchResults(parsedOriginal);

          const savedSelectedUser = sessionStorage.getItem(
            "userSearch_selectedUser"
          );
          if (savedSelectedUser && savedSelectedUser !== "null") {
            const parsed = JSON.parse(savedSelectedUser);
            setSelectedUser(parsed);
          } else {
            setSearchQuery("");
            setSearchResults([]);
            setOriginalSearchResults([]);
            setHasSearched(false);
            setSelectedUser(null);

            const keys = [
              "userSearch_query",
              "userSearch_results",
              "userSearch_selectedUser",
              "userSearch_userMovies",
              "userSearch_openSections",
              "userSearch_loadedCategories",
              "userSearch_hasSearched",
              "userSearch_originalResults",
            ];
            keys.forEach((key) => sessionStorage.removeItem(key));
          }

          const savedUserMovies = sessionStorage.getItem(
            "userSearch_userMovies"
          );
          if (savedUserMovies) {
            const parsed = JSON.parse(savedUserMovies);
            setUserMovies(parsed);
          }

          const savedOpenSections = sessionStorage.getItem(
            "userSearch_openSections"
          );
          if (savedOpenSections) {
            const parsed = JSON.parse(savedOpenSections);
            setOpenSections(parsed);
          }

          const savedLoadedCategories = sessionStorage.getItem(
            "userSearch_loadedCategories"
          );
          if (savedLoadedCategories) {
            const parsed = JSON.parse(savedLoadedCategories);
            setLoadedCategories(parsed);
          }

          const savedHasSearched = sessionStorage.getItem(
            "userSearch_hasSearched"
          );
          if (savedHasSearched) {
            setHasSearched(JSON.parse(savedHasSearched));
          }
        }
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
      setSearchQuery("");
      setSearchResults([]);
      setOriginalSearchResults([]);
      setHasSearched(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (typeof window === "undefined" && !mounted) return;

      const savedQuery = sessionStorage.getItem("userSearch_query");
      if (savedQuery) {
        setSearchQuery(savedQuery);
      }

      const savedResults = sessionStorage.getItem("userSearch_results");
      if (savedResults) {
        const parsed = JSON.parse(savedResults);
        setSearchResults(parsed);
      }

      const savedOriginalResults = sessionStorage.getItem(
        "userSearch_originalResults"
      );
      if (savedOriginalResults) {
        const parsed = JSON.parse(savedOriginalResults);
        setOriginalSearchResults(parsed);
      }

      const savedSelectedUser = sessionStorage.getItem(
        "userSearch_selectedUser"
      );
      if (savedSelectedUser && savedSelectedUser !== "null") {
        const parsed = JSON.parse(savedSelectedUser);
        setSelectedUser(parsed);
      }

      const savedUserMovies = sessionStorage.getItem("userSearch_userMovies");
      if (savedUserMovies) {
        const parsed = JSON.parse(savedUserMovies);
        setUserMovies(parsed);
      }

      const savedOpenSections = sessionStorage.getItem(
        "userSearch_openSections"
      );
      if (savedOpenSections) {
        const parsed = JSON.parse(savedOpenSections);
        setOpenSections(parsed);
      }

      const savedLoadedCategories = sessionStorage.getItem(
        "userSearch_loadedCategories"
      );
      if (savedLoadedCategories) {
        const parsed = JSON.parse(savedLoadedCategories);
        setLoadedCategories(parsed);
      }

      const savedHasSearched = sessionStorage.getItem("userSearch_hasSearched");
      if (savedHasSearched) {
        setHasSearched(JSON.parse(savedHasSearched));
      }
    } catch (error) {
      console.error("Error loading saved state:", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mounted && token) {
      saveStateToSessionStorage();
    }
  }, [
    searchQuery,
    searchResults,
    originalSearchResults,
    selectedUser,
    userMovies,
    openSections,
    loadedCategories,
    hasSearched,
  ]);

  const searchUsers = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setHasSearched(true);
    try {
      if (typeof window === "undefined") return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/search?query=${encodeURIComponent(searchQuery)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const results = data.content || [];
        setSearchResults(results);
        setOriginalSearchResults(results);
        setSelectedUser(null);

        setUserMovies({
          favorites: [],
          watched: [],
          top10: [],
          watchLater: [],
        });
        setOpenSections({
          favorites: false,
          watched: false,
          top10: false,
          watchLater: false,
        });
        setLoadedCategories({
          favorites: false,
          watched: false,
          top10: false,
          watchLater: false,
        });
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
    if (openSections[category]) {
      setOpenSections((prev) => ({
        ...prev,
        [category]: false,
      }));
      return;
    }

    if (loadedCategories[category]) {
      setOpenSections((prev) => ({
        ...prev,
        [category]: true,
      }));
      return;
    }

    setLoadingStates((prev) => ({
      ...prev,
      [category]: true,
    }));

    try {
      const endpoints: Record<CategoryType, string> = {
        favorites: "favorites",
        watched: "watched",
        top10: "top10",
        watchLater: "watch-later",
      };

      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${userId}/${endpoints[category]}`
      );
      if (currentUserId) {
        url.searchParams.append("viewerId", currentUserId);
      }

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const movies = category === "top10" ? data : data.content || data;

        setUserMovies((prev) => ({
          ...prev,
          [category]: movies,
        }));
        setLoadedCategories((prev) => ({
          ...prev,
          [category]: true,
        }));
        setOpenSections((prev) => ({
          ...prev,
          [category]: true,
        }));
      } else {
        console.error(`Failed to load ${category}`);
      }
    } catch (error) {
      console.error(`Error loading ${category}:`, error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [category]: false,
      }));
    }
  };

  const selectUserF = (user: any) => {
    setSelectedUser(user);
    setUserMovies({
      favorites: [],
      watched: [],
      top10: [],
      watchLater: [],
    });
    setOpenSections({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });
    setLoadedCategories({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });
  };

  const clearSelectedUser = () => {
     if (typeof window !== 'undefined') return
    setSearchResults(originalSearchResults);
    setSelectedUser(null);
    setUserMovies({
      favorites: [],
      watched: [],
      top10: [],
      watchLater: [],
    });
    setOpenSections({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });
    setLoadedCategories({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });
    searchUsers();
    sessionStorage.setItem("userSearch_selectedUser", JSON.stringify(null));
    sessionStorage.setItem(
      "userSearch_originalResults",
      JSON.stringify(originalSearchResults)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchUsers();
    }
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);

    if (newValue === "" && searchQuery !== "") {
      clearAllSearchData();
    }
  };

  const clearAllSearchData = () => {
     if (typeof window !== 'undefined') return
    const keys = [
      "userSearchQuery",
      "userSearch_query",
      "userSearchResults",
      "userSearch_results",
      "userSearch_selectedUser",
      "userSearch_userMovies",
      "userSearch_openSections",
      "userSearch_loadedCategories",
      "userSearch_hasSearched",
      "userSearch_originalResults",
    ];

    keys.forEach((key) => sessionStorage.removeItem(key));

    setSearchQuery("");
    setSearchResults([]);
    setOriginalSearchResults([]);
    setSelectedUser(null);
    setHasSearched(false);
    setUserMovies({
      favorites: [],
      watched: [],
      top10: [],
      watchLater: [],
    });
    setOpenSections({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });
    setLoadedCategories({
      favorites: false,
      watched: false,
      top10: false,
      watchLater: false,
    });
  };

  useEffect(() => {
    return () => {
      if (typeof window === "undefined") return;
      sessionStorage.setItem("previousPath", window.location.pathname);
    };
  }, []);

  const renderMovieSection = (
    category: CategoryType,
    icon: React.ReactNode,
    title: string,
    count: number
  ) => (
    <Card className="bg-gray-800 mb-4" key={category}>
      <CardBody>
        <Button
          variant="text"
          className="w-full flex items-center justify-between p-5 m-0 text-white hover:bg-gray-700"
          onClick={() => loadUserMovies(selectedUser.userId, category)}
          disabled={loadingStates[category]}
        >
          <div className="flex items-center gap-2">
            {icon}
            <span>
              {title} ({count}){loadingStates[category] && " - Loading..."}
            </span>
          </div>
          {openSections[category] ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </Button>

        <Collapse open={openSections[category]}>
          <div className="mt-4">
            {userMovies[category] && userMovies[category].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {userMovies[category] &&
                  userMovies[category].map((movie, index) => (
                    <div key={movie.id} className="relative">
                      {category === "top10" && movie.rank && (
                        <div className="absolute top-2 left-12 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-10">
                          {movie.rank}
                        </div>
                      )}
                      <CrudCardMovie
                        movie={{ ...movie, entryType: category }}
                        handleAddMovie={() => {}}
                        successScore={false}
                        handleDeleteScore={() => {}}
                        initialScore={movie.userScore}
                        comment={movie.comment || ""}
                        setComment={() => {}}
                        handleAddEditComment={() => {}}
                        handleDeleteComment={() => {}}
                        entryId={movie.id}
                        entryType={
                          category as
                            | "favorites"
                            | "watched"
                            | "top10"
                            | "watch-later"
                        }
                        movieOwnerId={movie.userId}
                        commentLikes={movie.commentLikes || 0}
                        commentDislikes={movie.commentDislikes || 0}
                        userLikeStatus={movie.userLikeStatus || null}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center py-8">
                <Image
                  src={movieImg}
                  alt="No movies"
                  width={200}
                  height={200}
                />
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
              onChange={(e) => handleSearchQueryChange(e)}
              onKeyDown={handleKeyPress}
              className="text-white"
            />
            <button
              onClick={searchUsers}
              disabled={loading}
              className="absolute top-1 right-1 flex items-center rounded bg-gray-800 py-1 pt-2 px-3 text-sm text-white hover:bg-gray-700 transition-all"
              type="button"
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
              {loading ? "Searching..." : "Search"}
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
                onClick={() => selectUserF(user)}
              >
                <CardBody>
                  <div className="flex items-center gap-3 mb-3">
                    <UserIcon className="h-8 w-8 text-blue-400" />
                    <div>
                      <Typography variant="h6" className="text-white">
                        {user.username}
                      </Typography>
                      <Typography variant="small" className="text-gray-400">
                        Total items:{" "}
                        {user.totalCount ||
                          user.favoritesCount +
                            user.watchedCount +
                            user.top10Count +
                            user.watchLaterCount ||
                          0}
                      </Typography>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1 text-gray-300">
                      <BookmarkIcon className="h-4 w-4" />
                      <span>{user.favoritesCount || 0} Favorites</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <EyeIcon className="h-4 w-4" />
                      <span>{user.watchedCount || 0} Watched</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <Trophy className="h-4 w-4" />
                      <span>{user.top10Count || 0} Top 10</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-300">
                      <CgSandClock className="h-4 w-4" />
                      <span>{user.watchLaterCount || 0} Watch Later</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      )}

      {!selectedUser &&
        hasSearched &&
        searchResults.length === 0 &&
        !loading && (
          <div className="flex flex-col items-center justify-center h-[500px] w-full text-white">
            <Image
              src={movieImg}
              alt="No user results"
              width={300}
              height={350}
              priority
            />
            <p className="mt-4 text-lg font-medium">No User Results</p>
            <p className="mt-2 text-gray-400">
              Try searching with a different username!
            </p>
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
                      <span>
                        {selectedUser.favoritesCount +
                          selectedUser.watchedCount +
                          selectedUser.top10Count +
                          selectedUser.watchLaterCount}{" "}
                        total movies
                      </span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="space-y-4">
            {renderMovieSection(
              "favorites" as CategoryType,
              <BookmarkIcon className="h-5 w-5" />,
              "Favorites",
              selectedUser.favoritesCount
            )}
            {renderMovieSection(
              "watched" as CategoryType,
              <EyeIcon className="h-5 w-5" />,
              "Watched",
              selectedUser.watchedCount
            )}
            {renderMovieSection(
              "top10" as CategoryType,
              <Trophy className="h-5 w-5" />,
              "Top 10",
              selectedUser.top10Count
            )}
            {renderMovieSection(
              "watchLater" as CategoryType,
              <CgSandClock className="h-5 w-5" />,
              "Watch Later",
              selectedUser.watchLaterCount
            )}
          </div>
        </div>
      )}
    </div>
  );
}
