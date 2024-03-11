"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  CommandDialog,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Movie } from "@/data/movie/types";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

export function MovieSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=534c59cdf18dcdecc1fbd0057402dede`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch movie data");
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data.results);
        })
        .catch((error) => {
          console.error("Error fetching movie data:", error);
        });
    } else {
      setSearchResults([]);
    }
  };

  const throttledSearch = debounce(handleSearch, 1500);

  useEffect(() => {
    return () => {
      throttledSearch.cancel();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    throttledSearch();
  };

  const redirectToMovie = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant="outline">
        <MagnifyingGlassIcon className="h-4 w-4 mr-2" /> Recherche
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input
          className="h-12"
          type="text"
          placeholder="Recherche par nom..."
          value={searchQuery}
          onChange={(e) => handleInputChange(e)}
        />
        <CommandList>
          <CommandGroup>
            {searchResults.map((movie: Movie) => {
              const movieImg = movie.poster_path
                ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                : "https://via.placeholder.com/154x231.png?text=No+Image";

              return (
                <CommandItem
                  key={movie.id}
                  onSelect={() => redirectToMovie(movie.id)}
                >
                  <Image
                    src={movieImg}
                    alt={movie.title}
                    width={400}
                    height={400}
                    className={"h-auto w-auto object-cover mr-2 aspect-[3/4]"}
                  />
                  {movie.title} ({movie.release_date.split("-")[0]})
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
