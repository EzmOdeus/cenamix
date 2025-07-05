import { InfiniteMovieSection } from '@/components/infinite-movie-section';
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // You can fetch data here if needed for dynamic SEO
  return {
    title: "Top Rated Movies",
    description: "Explore the top rated movies on CineMax.",
    openGraph: {
      title: "Top Rated Movies | CineMax",
      description: "Explore the top rated movies on CineMax.",
      url: "https://CineMax.vercel.app/top-rated",
      siteName: "CineMax",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Top Rated Movies | CineMax",
      description: "Explore the top rated movies on CineMax.",
    },
  };
}

export default function UpcomingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="space-y-12 pb-12">
        <InfiniteMovieSection
          title="Top-Rate Movies"
          endpoint="/movie/top_rated"
          className="bg-gradient-to-r from-purple-900/20 to-transparent"
        />
      </div>
    </div>
  );
}
