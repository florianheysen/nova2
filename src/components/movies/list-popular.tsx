"use client";

import { usePopularMovies } from "@/query/movies";
import { MovieCard } from "@/components/movie-card";

export default function PopularMovies() {
  const popularMoviesQuery = usePopularMovies();

  const popularMovies = popularMoviesQuery.data?.results;

  if (!popularMovies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl">Popular Movies</h2>
      <div className="grid grid-cols-10 gap-2">
        {popularMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
