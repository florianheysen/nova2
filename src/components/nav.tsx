"use client";

import Link from "next/link";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { LanguageSwitcher } from "@/components/lang-switcher";
import { MovieSearch } from "@/components/movie-search";

import { useLocalStorage } from "usehooks-ts";

export default function Navigation() {
  const [_, setIsLoggedIn] = useLocalStorage("isLoggedIn", false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="flex items-center w-full justify-between">
      <Link href="/">
        <h1 className="font-semibold">☄️ SuperNova</h1>
      </Link>
      <div className="flex gap-2">
        <button onClick={handleLogout}>Logout</button>
        <MovieSearch />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
