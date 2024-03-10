import { useQuery } from '@tanstack/react-query';
import { getPopularMovies } from '@/data/movie';

export const getPopularMoviesKey = () => ['popularMovies'];

export const usePopularMovies = () => {
    const result = useQuery({
      queryKey: getPopularMoviesKey(),
      queryFn: getPopularMovies
    });
  
    return result;
  };