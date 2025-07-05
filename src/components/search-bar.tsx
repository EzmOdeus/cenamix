"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Movie, searchMovies, getImageUrl } from "@/lib/tmdb";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchMoviesDebounced = async () => {
      if (query.trim().length > 2) {
        setIsLoading(true);
        try {
          const response = await searchMovies(query);
          setResults(response.results.slice(0, 8));
          setShowResults(true);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };

    const timeoutId = setTimeout(searchMoviesDebounced, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 md:pr-20 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:bg-white/20 transition-all duration-300"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            className="bg-yellow-500 hover:bg-yellow-600 text-black h-6 px-3"
          >
            Go
          </Button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-2xl z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Searching...</div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  onClick={() => setShowResults(false)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <img
                    src={getImageUrl(movie.poster_path, "w92")}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">
                      {movie.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-gray-300 text-sm">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.trim().length > 2 ? (
            <div className="p-4 text-center text-gray-400">No movies found</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
