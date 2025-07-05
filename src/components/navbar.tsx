'use client';

import Link from 'next/link';
import { Film, Home, Compass, Star, Clock } from 'lucide-react';
import { SearchBar } from './search-bar';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Compass },
    { href: '/top-rated', label: 'Top Rated', icon: Star },
    { href: '/upcoming', label: 'Upcoming', icon: Clock },
  ];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors">
            <Film className="w-8 h-8 text-yellow-500" />
            <span className="text-xl font-bold">CineMax</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-yellow-400 bg-yellow-500/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center gap-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}