import { InfiniteMovieSection } from "@/components/infinite-movie-section";

export default function UpcomingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="space-y-12 pb-12">
        <InfiniteMovieSection
          title="Discover Movies"
          endpoint="/discover/movie"
          className="bg-gradient-to-r from-purple-900/20 to-transparent"
        />
      </div>
    </div>
  );
}
