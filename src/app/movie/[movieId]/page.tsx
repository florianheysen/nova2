import generateMetadata from "@/lib/metadata";

import MovieIframe from "@/components/movie-iframe";
import Navigation from "@/components/nav";

export const metadata = generateMetadata(
  { title: "Film" },
  { withSuffix: true }
);

export default function Page({ params }: { params: { movieId: string } }) {
  return (
    <div className="flex flex-col relative">
      <div className="bg-background/40 flex w-full">
        <div className="container py-4">
          <Navigation />
        </div>
      </div>
      <MovieIframe movieId={params.movieId} />
    </div>
  );
}
