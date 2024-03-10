"use client"

import Image from 'next/image'
import { ThemeSwitcher } from "@/components/theme-switcher";
import { usePopularMovies } from '@/query/movies';


export default function Home() {
  const usersQuery = usePopularMovies();

  const movies = usersQuery.data?.results;

  console.log(movies)

  if(!movies) {
    return <div>Loading...</div>
  }

  return (
      <div>Nova 2 <ThemeSwitcher />
      <div className="grid grid-cols-10 gap-2">
      {movies?.map(movie => {
        const movieImg = movie.poster_path ? `https://image.tmdb.org/t/p/w154${movie.poster_path}` : 'https://via.placeholder.com/154x231.png?text=No+Image';
        return (
            <a target='_blank' href={`https://multiembed.mov/?video_id=${movie.id}&tmdb=1`}>
            <Image
              className='rounded'
              src={movieImg}
              width={154}
              height={154}
              alt={movie.title}
            />
            {movie.title}
            </a>
        );
      })}
    </div>
    </div>
  );
}
