"use client";

import { useTopRatedMovies } from "@/query/movies";
import { MovieCard } from "@/components/movie-card";
import { MovieSearch } from "../movie-search";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
        <MovieSearch>
          <div className="group hidden w-full h-[calc(100%-10px)] rounded-sm bg-primary/10 hover:bg-primary/15 lg:flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center text-sm">
              <MagnifyingGlassIcon className="h-5 w-5 group-hover:h-6 group-hover:w-6" />
            </div>
          </div>
        </MovieSearch>
      </div>
    </div>
  );
}
