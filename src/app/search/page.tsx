"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Movie, searchMovies } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = async (searchQuery: string, page: number = 1) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await searchMovies(searchQuery, page);
      if (page === 1) {
        setMovies(response.results);
      } else {
        setMovies((prev) => {
          // Deduplicate movies by id
          const all = [...prev, ...response.results];
          const unique = Array.from(new Map(all.map(m => [m.id, m])).values());
          return unique;
        });
      }
      setTotalResults(response.total_results);
      setCurrentPage(page);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const loadMore = () => {
    handleSearch(query, currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-8">
      <div className="container mx-auto px-4">
        {/* Search Header */}
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Search Movies
          </h1>

          <form onSubmit={handleSubmit} className="relative">
            <Input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-20 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </form>
        </div>

        {/* Results */}
        {query && (
          <div className="mb-6">
            <p className="text-gray-400 text-center">
              {totalResults > 0
                ? `Found ${totalResults.toLocaleString()} results for "${query}"`
                : `No results found for "${query}"`}
            </p>
          </div>
        )}

        {/* Movies Grid */}
        {movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {movies.length > 0 && movies.length < totalResults && (
          <div className="text-center">
            <Button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                "Load More"
              )}
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {query && movies.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              No movies found
            </h2>
            <p className="text-gray-400 mb-6">
              Try adjusting your search terms or check the spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
