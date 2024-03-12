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
      <h2 className="text-2xl font-semibold">Les mieux notés</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {topRatedMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        <div className="overflow-hidden rounded-sm">
          <div className="w-full h-[calc(100%-30px)] bg-primary/10"></div>
        </div>
      </div>
    </div>
  );
}
