import { HeroSection } from '@/components/hero-section';
import { MovieSection } from '@/components/movie-section';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '@/lib/tmdb';

export default async function Home() {
  try {
    // Fetch all movie data in parallel
    const [trendingData, popularData, topRatedData, upcomingData] = await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
    ]);

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Hero Section */}
        <HeroSection movies={trendingData.results.slice(0, 5)} />
        
        {/* Movie Sections */}
        <div className="space-y-12 pb-12">
          <MovieSection
            title="Trending Now"
            movies={trendingData.results}
            className="bg-gradient-to-r from-red-900/20 to-transparent"
          />
          
          <MovieSection
            title="Popular Movies"
            movies={popularData.results}
            className="bg-gradient-to-r from-blue-900/20 to-transparent"
          />
          
          <MovieSection
            title="Top Rated"
            movies={topRatedData.results}
            className="bg-gradient-to-r from-yellow-900/20 to-transparent"
          />
          
          <MovieSection
            title="Coming Soon"
            movies={upcomingData.results}
            className="bg-gradient-to-r from-purple-900/20 to-transparent"
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading home page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-400">We&apos;re having trouble loading the movies. Please try again later.</p>
        </div>
      </div>
    );
  }
}