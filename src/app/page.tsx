import PopularMovies from "@/components/movies/list-popular";
import TopRatedMovies from "@/components/movies/list-top-rated";
import Navigation from "@/components/nav";
import generateMetadata from "@/lib/metadata";

export const metadata = generateMetadata(
  { title: "Home" },
  { withSuffix: true }
);

export default function Home() {
  return (
    <div className="container flex flex-col space-y-8 mt-4 mb-8">
      <Navigation />
      <PopularMovies />
      <TopRatedMovies />
    </div>
  );
}
