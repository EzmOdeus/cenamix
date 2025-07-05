import { InfiniteMovieSection } from "@/components/infinite-movie-section";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  // You can fetch data here if needed for dynamic SEO
  // For demo, we'll just return static values, but you can make it dynamic
  return {
    title: "Discover Movies",
    description: "Browse and discover new movies with CineMax.",
    openGraph: {
      title: "Discover Movies | CineMax",
      description: "Browse and discover new movies with CineMax.",
      url: "https://CineMax.vercel.app/discover",
      siteName: "CineMax",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Discover Movies | CineMax",
      description: "Browse and discover new movies with CineMax.",
    },
  };
}


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
