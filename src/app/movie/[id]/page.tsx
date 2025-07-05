/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMovieDetails, getMovieCredits, getMovieVideos, getMovieRecommendations, getImageUrl, getBackdropUrl, formatRuntime, formatCurrency } from '@/lib/tmdb';
import React from 'react';
import { ReviewItem } from '@/components/review-item';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, Calendar, Clock, DollarSign, Play, Users } from 'lucide-react';
import { MovieSection } from '@/components/movie-section';

export default async function MoviePage({ params }:any) {
  try {
    const [movie, credits, videos, recommendations, reviewsRes] =
      await Promise.all([
        getMovieDetails(params.id),
        getMovieCredits(params.id),
        getMovieVideos(params.id),
        getMovieRecommendations(params.id),
        fetch(
          `https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        ).then((res) => res.json()),
      ]);

    const trailer = videos.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    const mainCast = credits.cast.slice(0, 8);
    const reviews = Array.isArray(reviewsRes.results) ? reviewsRes.results : [];

    return (
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <Image
              src={getBackdropUrl(movie.backdrop_path, "original")}
              alt={movie.title}
              fill
              className="w-full h-full object-cover"
              priority
              unoptimized={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
              {/* Poster */}
              <div className="md:col-span-1">
                <Image
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  width={400}
                  height={600}
                  className="w-full max-w-sm mx-auto rounded-lg shadow-2xl"
                  priority={true}
                  unoptimized={false}
                />
              </div>

              {/* Movie Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {movie.title}
                  </h1>

                  {movie.tagline && (
                    <p className="text-xl text-yellow-400 italic mb-4">
                      {movie.tagline}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-5 h-5" />
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span>{movie.vote_average.toFixed(1)}/10</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre.id}
                        variant="secondary"
                        className="bg-yellow-500/20 text-yellow-400"
                      >
                        {genre.name}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl">
                    {movie.overview}
                  </p>

                  <div className="flex gap-4">
                    {trailer && (
                      <Button
                        size="lg"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
                        asChild
                      >
                        <a
                          href={`https://www.youtube.com/watch?v=${trailer.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Play className="w-5 h-5 mr-2 fill-current" />
                          Watch Trailer
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  Budget
                </h3>
                <p className="text-gray-300">
                  {movie.budget > 0 ? formatCurrency(movie.budget) : "N/A"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  Revenue
                </h3>
                <p className="text-gray-300">
                  {movie.revenue > 0 ? formatCurrency(movie.revenue) : "N/A"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white mb-1">
                  Status
                </h3>
                <p className="text-gray-300">{movie.status}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2 fill-current" />
                <h3 className="text-lg font-semibold text-white mb-1">Votes</h3>
                <p className="text-gray-300">
                  {movie.vote_count.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Cast */}
          {mainCast.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {mainCast.map((actor) => (
                  <div key={actor.id} className="text-center">
                    <div className="aspect-square rounded-full overflow-hidden mb-2 bg-gray-800">
                      {actor.profile_path ? (
                        <Image
                          src={getImageUrl(actor.profile_path, "w185")}
                          alt={actor.name}
                          width={120}
                          height={120}
                          className="w-full h-full object-cover"
                          unoptimized={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <h4 className="text-white font-medium text-sm">
                      {actor.name}
                    </h4>
                    <p className="text-gray-400 text-xs">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-12 bg-gray-700" />

          {/* Reviews */}
          {reviews.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">Reviews</h2>
              <div className="space-y-6">
                {reviews.map(
                  (review: {
                    id: string;
                    author: string;
                    content: string;
                    created_at: string;
                    author_details?: {
                      name?: string;
                      username?: string;
                      avatar_path?: string;
                      rating?: number;
                    };
                    updated_at?: string;
                    url?: string;
                  }) => (
                    <ReviewItem key={review.id} review={review} />
                  )
                )}
              </div>
            </div>
          )}

          <Separator className="my-12 bg-gray-700" />

          {/* Recommendations */}
          {recommendations.results.length > 0 && (
            <MovieSection
              title="You might also like"
              movies={recommendations.results}
            />
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading movie:", error);
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h1 className="text-4xl text-red-500">Something went wrong</h1>
      </div>
    );
  }
  
}

// ReviewItem moved to components/review-item.tsx as a Client Component