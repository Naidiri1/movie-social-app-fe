interface Movie {
  movieId: number;
  title: string;
  id: string;
  posterPath?: string;
  releasedDate?: string;
  movieDescription?: string;
  userScore?: number;
  comment?: string;
  commentEnabled?: boolean;
  publicScore: number;
  username: string;
}

interface ItemType {
  id: number;
  name: string;
}

interface UserMoviesState {
  favorites: any[];
  watched: any[];
  top10: any[];
  watchLater: any[];
}

interface OpenSectionsState {
  favorites: boolean;
  watched: boolean;
  top10: boolean;
  watchLater: boolean;
}

interface LoadingStatesType {
  favorites: boolean;
  watched: boolean;
  top10: boolean;
  watchLater: boolean;
}

interface LoadedCategoriesType {
  favorites: boolean;
  watched: boolean;
  top10: boolean;
  watchLater: boolean;
}
