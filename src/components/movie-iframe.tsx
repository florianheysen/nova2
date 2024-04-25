"use client";

import { LoaderCircle, ServerCrash } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type MovieIframeProps = {
  movieId: string;
};

export default function MovieIframe({ movieId }: MovieIframeProps) {
  const [language, setLanguage] = useLocalStorage("supernova-lang", "en");
  const [isValidLink, setIsValidLink] = useState<boolean>(true);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const url_fr = `https://frembed.pro/api/film.php?id=${movieId}`;
  const url_en = `https://multiembed.mov/?video_id=${movieId}&tmdb=1`;

  const iframeUrl = language === "en" ? url_en : url_fr;

  useEffect(() => {
    async function checkLink() {
      if (language === "en") {
        setIsValidLink(true);
      }
      if (language === "fr") {
        try {
          const response = await fetch(
            `https://api.frembed.pro/movies/check?id=${movieId}`
          );
          const data = await response.json();
          if (data.result.Total === 0) {
            setIsValidLink(false);
          }
        } catch (error) {
          console.error("Error checking link:", error);
          setIsValidLink(false);
        }
      }
    }

    checkLink();
  }, [movieId, language]);

  if (!isValidLink) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center">
          <ServerCrash className="size-8" />
          <p className="text-sm text-center">
            Version française <br /> indisponible
          </p>
          <Button onClick={() => setLanguage("en")} variant="outline">
            Basculer en anglais
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {!iframeLoaded && (
        <div className="flex justify-center items-center h-screen w-screen">
          <LoaderCircle className="w-4 h-4 animate-spin" />
        </div>
      )}
      <iframe
        allowFullScreen
        onLoad={handleIframeLoad}
        className={cn("h-screen w-screen", !iframeLoaded && "hidden")}
        src={iframeUrl}
      />
    </>
  );
}
