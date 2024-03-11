"use client";

import { useTopRatedMovies } from "@/query/movies";
import { MovieCard } from "@/components/movie-card";

export default function TopRatedMovies() {
  const topRatedMoviesQuery = useTopRatedMovies();

  const topRatedMovies = topRatedMoviesQuery.data?.results;

  if (!topRatedMovies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl">Popular Movies</h2>
      <div className="grid grid-cols-10 gap-2">
        {topRatedMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
