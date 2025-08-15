
import { useSearchParams } from "next/navigation";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const queryMovie = searchParams.get("query");

  return queryMovie;
};

export default SearchResults;
