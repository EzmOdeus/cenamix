'use client';

import { Movie, getImageUrl } from '@/lib/tmdb';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Support both Movie and TV shape
  const title = movie.title || (movie as any).name || 'Untitled';
  const date = movie.release_date || (movie as any).first_air_date || '';

  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden ${className}`}>
        <div className="relative overflow-hidden">
          <div className="aspect-[2/3] relative bg-gray-800">
            {!imageError ? (
              <Image
                src={getImageUrl(movie.poster_path, 'w500')}
                alt={title}
                width={300}
                height={450}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                placeholder="blur"
                blurDataURL="/placeholder-movie.jpg"
                loading="lazy"
                unoptimized={false}
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            )}
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Rating badge */}
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">
                {movie.vote_average?.toFixed ? movie.vote_average.toFixed(1) : 'N/A'}
              </span>
            </div>
            {/* Adult content badge */}
            {movie.adult && (
              <div className="absolute top-2 left-2">
                <Badge variant="destructive" className="text-xs">18+</Badge>
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-white text-lg mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>{date ? new Date(date).getFullYear() : ''}</span>
          </div>
          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {movie.overview}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}