# CineMax

CineMax is a web application for discovering and watching movies, built with Next.js, TypeScript, and Tailwind CSS, and powered by the TMDB API.

## Features
- Browse trending, top-rated, upcoming, and latest movies.
- Advanced movie search with autocomplete support.
- Movie details page with:
  - High-quality poster and backdrop
  - YouTube trailer
  - Overview, rating, genres, budget, revenue
  - Cast section
  - User reviews
  - Movie recommendations
- Responsive and modern UI with Tailwind CSS
- Infinite scroll / load more for movie lists

## Requirements
- Node.js 18 or newer
- [TMDB](https://www.themoviedb.org/) account to get your API Key

## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/EzmOdeus/CineMax.git
   cd CineMax
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env.local` file in the project root and add:
     ```env
     NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
     ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Then open [http://localhost:3000](http://localhost:3000)

## Project Structure
```
CineMax/
├── public/                # Images and static assets
├── src/
│   ├── app/               # App pages (Next.js App Router)
│   ├── components/        # Reusable UI components
│   ├── lib/               # TMDB API utilities and helpers
│   └── ...
├── .env.local             # Environment variables (not in git)
├── package.json
├── tailwind.config.js
└── README.md
```

## Key Files
- `src/app/` : App pages (home, search, movie details, ...)
- `src/components/` : Components like HeroSection, MovieCard, SearchBar, Navbar...
- `src/lib/tmdb.ts` : All TMDB data fetching utilities

## Contributing
- Contributions, suggestions, and bug fixes are welcome!
- Open an Issue or Pull Request on [GitHub](https://github.com/EzmOdeus/CineMax)

## License
MIT