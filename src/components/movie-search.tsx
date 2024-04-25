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
import { Input } from "./ui/input";
import { Movie } from "@/data/movie/types";
import { throttle } from "lodash";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

//TODO: Faire en sorte qu'on puisse cliquer sur pc et sur mobile sur les resultats

export function MovieSearch({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [language] = useLocalStorage("supernova-lang", "en");
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  function getLanguageCode(input: string) {
    const languageMap: { [key: string]: string } = {
      fr: "fr-FR",
      en: "en-US",
    };
    return languageMap[input] || "en-US";
  }

  function getLanguageString(input: string) {
    const languageMap: { [key: string]: string } = {
      fr: "français",
      en: "anglais",
    };
    return languageMap[input] || "anglais";
  }

  const handleSearch = () => {
    if (searchQuery.trim().length > 2) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&language=${getLanguageCode(
          language
        )}&api_key=534c59cdf18dcdecc1fbd0057402dede`
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

  const throttledSearch = throttle(handleSearch, 1500);

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
      <div className="w-full h-full" onClick={() => setOpen(true)}>
        {children}
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Input
          className="h-12"
          type="text"
          placeholder={`Recherche par nom en ${getLanguageString(language)}...`}
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
                  <div className="w-[46px] h-[69px] bg-primary/10 mr-2 ">
                    <Image
                      src={movieImg}
                      alt={movie.title}
                      width={400}
                      height={400}
                      className={"h-auto w-auto object-cover aspect-[3/4]"}
                    />
                  </div>
                  <div className="w-3/4">
                    {movie.title} ({movie.release_date.split("-")[0]})
                  </div>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
