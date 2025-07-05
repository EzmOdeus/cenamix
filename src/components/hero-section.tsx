'use client';

import { Movie, getBackdropUrl } from '@/lib/tmdb';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Info, Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  movies: Movie[];
}

export function HeroSection({ movies }: HeroSectionProps) {
  const [currentMovie, setCurrentMovie] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % movies.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [movies.length]);
  
  if (!movies.length) return null;
  
  const movie = movies[currentMovie];
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Images */}
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentMovie ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={getBackdropUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            fill
            className="w-full h-full object-cover"
            priority={index === currentMovie}
            sizes="100vw"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}
      
      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Trending
              </Badge>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-300">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {movie.title}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
              {movie.overview}
            </p>
            
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Watch Trailer
              </Button>
              <Link href={`/movie/${movie.id}`}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Info className="w-5 h-5 mr-2" />
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovie(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentMovie ? 'bg-yellow-500 w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}