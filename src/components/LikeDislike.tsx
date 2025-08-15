import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useAuth } from "../utils/useAuth";

interface LikeDislikeProps {
  entryId: number;
  entryType: "favorites" | "watched" | "top10" | "watch-later";
  movieOwnerId: string;
  initialLikes?: number;
  comment?: string | null;
  initialDislikes?: number;
  initialUserStatus?: "liked" | "disliked" | null;
}

export default function LikeDislike({
  entryId,
  entryType,
  movieOwnerId,
  initialLikes = 0,
  initialDislikes = 0,
  initialUserStatus = null,
  comment,
}: LikeDislikeProps) {
   const { userId, token, isReady } = useAuth();
 
  const currentUserId = userId;
  const isOwnContent = movieOwnerId === currentUserId;
  const hasComment = comment && comment.trim().length > 0;
    const [mounted, setMounted] = useState(false);

  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [userStatus, setUserStatus] = useState<"liked" | "disliked" | null>(
    initialUserStatus
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const getApiEndpoint = (type: string): string => {
    const endpoints: Record<string, string> = {
      favorites: "favorites",
      watched: "watched",
      top10: "top10",
      watchLater: "watch-later",
      "watch-later": "watch-later",
    };

    return endpoints[type] || type;
  };

  const handleLikeDislike = async (action: "like" | "dislike") => { 
    if(!mounted) return
    if (isUpdating || isOwnContent || !currentUserId) return;
   
    setIsUpdating(true);
    try {

      const apiEndpoint = getApiEndpoint(entryType);

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${apiEndpoint}/${entryId}/${action}?userId=${currentUserId}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);

        if (data.action === "removed") {
          setUserStatus(null);
        } else if (data.action === "added" || data.action === "switched") {
          setUserStatus(action === "like" ? "liked" : "disliked");
        }
      } else {
        const error = await response.json();
        console.error("API Error:", error.error || "Failed to update");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 justify-start">
      {!isOwnContent ? (
        <>
          <button
            onClick={() => handleLikeDislike("like")}
            disabled={isUpdating || !hasComment}
            className={`flex items-center gap-1 ${
              userStatus === "liked" ? "text-green-600" : "text-blue-600"
            } hover:text-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            title={!hasComment ? "No review to like" : "Like this comment"}
          >
            <ThumbsUp
              size={18}
              fill={userStatus === "liked" ? "currentColor" : "none"}
            />
            <span className="text-sm font-medium">{likes}</span>
          </button>

          <button
            onClick={() => handleLikeDislike("dislike")}
            disabled={isUpdating || !hasComment}
            className={`flex items-center gap-1 ${
              userStatus === "disliked" ? "text-red-600" : "text-blue-600"
            } hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            title={
              !hasComment ? "No review to dislike" : "Dislike this comment"
            }
          >
            <ThumbsDown
              size={18}
              fill={userStatus === "disliked" ? "currentColor" : "none"}
            />
            <span className="text-sm font-medium">{dislikes}</span>
          </button>
        </>
      ) : (
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ThumbsUp size={16} /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <ThumbsDown size={16} /> {dislikes}
          </span>
        </div>
      )}
    </div>
  );
}
