"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useLocalStorage } from "usehooks-ts";
import { queryClientConfig } from "@/lib/query-client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QueryClient } from "@tanstack/react-query";

const languages = [
  {
    code: "fr",
    label: "Français",
  },
  {
    code: "en",
    label: "Anglais",
  },
];

export function LanguageSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [queryClient] = React.useState(
    () => new QueryClient(queryClientConfig)
  );
  const [language, setLanguage] = useLocalStorage("supernova-lang", "en");

  React.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["popularMovies"] });
    queryClient.invalidateQueries({ queryKey: ["topRatedMovies"] });
  }, [language]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {languages.find((lang) => lang.code === language)?.label ||
            "Select Language"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {languages.map((lang) => (
          <div
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              setOpen(false);
            }}
            className="flex items-center justify-between p-2 cursor-pointer hover:bg-primary/5"
          >
            <span>{lang.label}</span>
            {language === lang.code && <CheckIcon className="h-4 w-4" />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
