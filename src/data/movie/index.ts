import { MovieResponse } from "./types";

export const getPopularMovies = async () => {
  const localLanguage =
    localStorage.getItem("supernova-lang") === "fr" ? "fr-FR" : "en-US";
  console.log("from getPopularMovies", localLanguage);
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=534c59cdf18dcdecc1fbd0057402dede`
  ).then((res) => res.json() as Promise<MovieResponse>);

  return response;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=534c59cdf18dcdecc1fbd0057402dede`
  ).then((res) => res.json() as Promise<MovieResponse>);

  return response;
};
