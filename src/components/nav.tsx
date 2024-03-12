"use client";

import { useState } from "react";

import Link from "next/link";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/lang-switcher";
import { MovieSearch } from "@/components/movie-search";

import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function Navigation() {
  const [, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsLoading(false);
    }, Math.floor(Math.random() * 500) + 500);
  };

  return (
    <div className="flex items-center w-full justify-between">
      <Link href="/">
        <h1 className="font-semibold">
          ☄️ <span className="hidden md:inline">SuperNova</span>
        </h1>
      </Link>
      <div className="flex gap-2">
        <MovieSearch>
          <Button className="hidden md:flex" variant="secondary">
            <MagnifyingGlassIcon className="h-4 w-4 mr-2" /> Recherche
          </Button>
          <Button size="icon" className="flex md:hidden" variant="secondary">
            <MagnifyingGlassIcon className="h-4 w-4" />
          </Button>
        </MovieSearch>
        <LanguageSwitcher />
        <ThemeSwitcher />
        <Button onClick={handleLogout} variant="destructive" size="icon">
          {isLoading ? (
            <LoaderCircle className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
