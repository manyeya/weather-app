'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(`q=${query.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center backdrop-blur-glassmorphic bg-glass-gradient border border-glass-border rounded-2xl overflow-hidden group transition-all duration-300 hover:bg-glass-background-hover">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="w-full px-6 py-4 text-white bg-transparent placeholder-white/50 border-none focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          className="absolute right-2 px-6 py-2.5 text-white border border-white/20 rounded-xl 
          bg-white/10 backdrop-blur-sm transition-all duration-300 
          hover:bg-white/20 hover:border-white/30 hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          Search
        </button>
      </div>
    </form>
  );
}
