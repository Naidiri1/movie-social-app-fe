import { useState } from "react";
import { EyeIcon, BookmarkIcon, Trophy } from "lucide-react";
import { CgSandClock } from "react-icons/cg";
import {  useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IconActionsProps {
  movie: any;
  handleAddFavorites: () => void;
  handleAddToWatched: () => void;
  handleAddToTop10: () => void;
  handleAddWatchLater: () => void;
}

const IconCard: React.FC<IconActionsProps> = ({
  movie,
  handleAddFavorites,
  handleAddToWatched,
  handleAddToTop10,
  handleAddWatchLater,
}) => {
  const [actionMessage, setActionMessage] = useState("");
  const [activeAction, setActiveAction] = useState("");

  const handleAction = (type: any) => {
    let message = "";

    switch (type) {
      case "favorite":
        message = `Added "${movie.title}" to Favorites`;
        break;
      case "watched":
        message = `Added "${movie.title}" to Watched`;
        break;
      case "top10":
        message = `Added "${movie.title}" to Top 10`;
        break;
      case "watch-later":
        message = `Added "${movie.title}" to Watch Later`;
        break;
    }

    setActiveAction(type);
    setActionMessage(message);

    setTimeout(() => {
      setActiveAction("");
      setActionMessage("");
    }, 2000);

    if (type === "favorite") {
      handleAddFavorites();
    } else if (type === "watched") {
      handleAddToWatched();
    } else if (type === "top10") {
      handleAddToTop10();
    } else if (type === "watch-later") {
      handleAddWatchLater();
    }
  };

  const isActive = (type: any) => activeAction === type;

  return (
    <div className="flex flex-col items-center text-xs text-white">
      <div className="flex flex-row justify-evenly w-full">
        <div className="flex flex-col mt-5 items-center">
          <span
            onClick={() => handleAction("favorite")}
            className={`cursor-pointer p-2 rounded-full transition-colors ${
              isActive("favorite")
                ? "bg-yellow-700"
                : "border border-gray-900/5 bg-gray-900/5 hover:bg-gray-900/10"
            }`}
          >
            <BookmarkIcon className="h-5 w-5 text-white" />
          </span>
          <p className="mt-1">Favorites</p>
        </div>

        <div className="flex flex-col mt-5 items-center">
          <span
            onClick={() => handleAction("watched")}
            className={`cursor-pointer p-2 rounded-full transition-colors ${
              isActive("watched")
                ? "bg-green-500"
                : "border border-gray-900/5 bg-gray-900/5 hover:bg-gray-900/10"
            }`}
          >
            <EyeIcon className="h-5 w-5 text-white" />
          </span>
          <p className="mt-1">Watched</p>
        </div>

        <div className="flex mt-5 flex-col items-center">
          <span
            onClick={() => handleAction("top10")}
            className={`cursor-pointer  p-2 rounded-full p-1 transition-colors ${
              isActive("top10")
                ? "bg-orange-500"
                : "border border-gray-900/5 bg-gray-900/5 hover:bg-gray-900/10"
            }`}
          >
            <Trophy className="h-5 w-5 text-white" />
          </span>
          <p className="mt-1">Top 10</p>
        </div>
        <div className="flex mt-5 flex-col items-center">
          <span
            onClick={() => handleAction("watch-later")}
            className={`cursor-pointer  p-2 rounded-full p-1 transition-colors ${
              isActive("watch-later")
                ? "bg-orange-500"
                : "border border-gray-900/5 bg-gray-900/5 hover:bg-gray-900/10"
            }`}
          >
            <CgSandClock className="h-5 w-5 text-white" />
          </span>
          <p className="mt-1">Watch Later</p>
        </div>
      </div>
      <div
        className={`h-5 mt-2  text-sm animate-pulse text-center 
        ${activeAction === "watched" ? "text-green-400" : activeAction === "favorite" ? "text-yellow-400" : "text-orange-400"}`}
      >
        {actionMessage}
      </div>
    </div>
  );
};

export default IconCard;