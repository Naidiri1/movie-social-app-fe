interface Movie {
  movieId: number;
  title: string;
  id: string,
  posterPath?: string;
  releasedDate?: string;
  movieDescription?: string;
  userScore?: number;
  comment?: string;
  commentEnabled?: boolean;
  publicScore: number;
  username: string,
}

interface ItemType {
  id: number;
  name: string;
}
