import { MovieResponse } from './types';

export const getPopularMovies = async () => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=534c59cdf18dcdecc1fbd0057402dede`)
    .then((res) => res.json() as Promise<MovieResponse>);

  return response;
};
