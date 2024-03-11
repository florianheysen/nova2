import { useQuery } from "@tanstack/react-query";
import { getPopularMovies, getTopRatedMovies } from "@/data/movie";

export const getPopularMoviesKey = () => ["popularMovies"];
export const getTopRatedMoviesKey = () => ["topRatedMovies"];

export const usePopularMovies = () => {
  const result = useQuery({
    queryKey: getPopularMoviesKey(),
    queryFn: getPopularMovies,
  });

  return result;
};

export const useTopRatedMovies = () => {
  const result = useQuery({
    queryKey: getTopRatedMoviesKey(),
    queryFn: getTopRatedMovies,
  });

  return result;
};
