


const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  imdb_id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  // If endpoint already has a '?', append with '&', else with '?'
  const joiner = endpoint.includes('?') ? '&' : '?';
  const url = `${TMDB_BASE_URL}${endpoint}${joiner}api_key=${TMDB_API_KEY}`;

  const response = await fetch(url, {
    next: { revalidate: 300 } // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}

export async function getDiscoverMovies(): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/discover/movie');
}
export function getImageUrl(path: string, size: string = 'w500'): string {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export function getBackdropUrl(path: string, size: string = 'w1280'): string {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export async function getTrendingMovies(): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/trending/movie/week');
}

export async function getPopularMovies(): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/popular');
}

export async function getTopRatedMovies(): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/top_rated');
}

export async function getUpcomingMovies(): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>('/movie/upcoming');
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  return fetchFromTMDB<MovieDetails>(`/movie/${id}`);
}

export async function getMovieCredits(id: string): Promise<{ cast: Cast[] }> {
  return fetchFromTMDB<{ cast: Cast[] }>(`/movie/${id}/credits`);
}

export async function getMovieVideos(id: string): Promise<{ results: Video[] }> {
  return fetchFromTMDB<{ results: Video[] }>(`/movie/${id}/videos`);
}

export async function getMovieRecommendations(id: string): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/movie/${id}/recommendations`);
}

export async function searchMovies(query: string, page?: number): Promise<TMDBResponse<Movie>> {
  const pageParam = page ? `&page=${page}` : '';
  return fetchFromTMDB<TMDBResponse<Movie>>(`/search/movie?query=${encodeURIComponent(query)}${pageParam}`);
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  return fetchFromTMDB<{ genres: Genre[] }>('/genre/movie/list');
}

export async function getMoviesByGenre(genreId: number): Promise<TMDBResponse<Movie>> {
  return fetchFromTMDB<TMDBResponse<Movie>>(`/discover/movie&with_genres=${genreId}`);
}

export function formatRating(rating: number): string {
  return (rating / 10 * 100).toFixed(0) + '%';
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}