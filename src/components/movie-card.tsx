import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Movie } from "@/data/movie/types";

interface MovieCardProps {
  movie: Movie;
}

//TODO: Ajouter un wrapper autour des images pour afficher un fond gris le temps que l'image charge

export function MovieCard({ movie }: MovieCardProps) {
  const movieImg = movie.poster_path
    ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
    : "https://via.placeholder.com/154x231.png?text=No+Image";

  return (
    <Link href={`/movie/${movie.id}`} className="space-y-3">
      <div className="overflow-hidden rounded-sm">
        <Image
          src={movieImg}
          alt={movie.title}
          width={400}
          height={400}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105 aspect-[3/4]"
          )}
        />
      </div>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">
          {movie.release_date.split("-")[0]}
        </p>
      </div>
    </Link>
  );
}
