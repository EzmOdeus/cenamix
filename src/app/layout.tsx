import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'CineMax - Modern Movie Discovery',
    template: '%s | CineMax',
  },
  description: 'CineMax is a modern web app to discover, search, and explore the latest, trending, and top-rated movies. Powered by Next.js, TypeScript, and TMDB API.',
  keywords: [
    'movies', 'cinema', 'films', 'entertainment', 'streaming', 'reviews',
    'CineMax', 'movie app', 'nextjs', 'tmdb', 'discover movies', 'movie search', 'trending movies', 'top rated movies', 'upcoming movies'
  ],
  authors: [{ name: 'Seyam', url: 'https://github.com/EzmOdeus/CineMax' }],
  creator: 'CineMax Team',
  openGraph: {
    title: 'CineMax - Modern Movie Discovery',
    description: 'Discover, search, and explore the latest movies with CineMax.',
    url: 'https://CineMax.vercel.app',
    siteName: 'CineMax',
    images: [
      {
        url: '/public/globe.svg',
        width: 1200,
        height: 630,
        alt: 'CineMax - Modern Movie Discovery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineMax - Modern Movie Discovery',
    description: 'Discover, search, and explore the latest movies with CineMax.',
    images: ['/public/globe.svg'],
    creator: '@your_twitter',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}