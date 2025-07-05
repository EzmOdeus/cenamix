"use client";

import { useEffect, useRef, useState } from "react";
import { Movie } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";

interface InfiniteMovieSectionProps {
  title: string;
  endpoint: string; // e.g. '/trending/movie/week'
  className?: string;
}

export function InfiniteMovieSection({ title, endpoint, className }: InfiniteMovieSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3${endpoint}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          if (Array.isArray(data.results)) {
            setMovies((prev) => [...prev, ...data.results]);
            setTotalPages(data.total_pages || 1);
          } else {
            setTotalPages(1);
          }
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [page, endpoint]);

  // Infinite scroll observer
  useEffect(() => {
    if (page >= totalPages) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, page, totalPages]);

  return (
    <section className={`py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 flex-wrap">
          {movies.map((movie, idx) => (
            <div key={movie.id + '-' + idx} className="flex-none w-72">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        {loading && (
          <div className="flex justify-center py-4">
            <span className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-400 border-t-transparent"></span>
          </div>
        )}
        {page < totalPages && (
          <div ref={loaderRef} className="h-8" />
        )}
        {/* No manual Load More button, only infinite scroll */}
      </div>
    </section>
  );
}
