"use client";

import { usePopularMovies } from "@/query/movies";
import { MovieCard } from "@/components/movie-card";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function PopularMovies() {
  const popularMoviesQuery = usePopularMovies();

  const popularMovies = popularMoviesQuery.data?.results;

  if (!popularMovies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold">En ce moment</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-2">
        {popularMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        <div className="group w-full h-[calc(100%-10px)] rounded-sm bg-primary/10 hover:bg-primary/15 flex items-center justify-center cursor-pointer">
          <div className="flex flex-col items-center text-sm">
            <MagnifyingGlassIcon className="h-5 w-5 group-hover:h-6 group-hover:w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
