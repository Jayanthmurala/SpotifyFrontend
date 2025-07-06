
import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import AlbumCard from '../components/AlbumCard';


const Search = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'albums', label: 'Albums' },
    { id: 'artists', label: 'Artists' },
    { id: 'songs', label: 'Songs' },
  ];

  const searchResults = [
    { id: 1, title: 'Midnight Dreams', artist: 'Luna Eclipse', year: 2024 },
    { id: 2, title: 'Electric Nights', artist: 'Neon Pulse', year: 2024 },
    { id: 3, title: 'Ocean Waves', artist: 'Blue Horizon', year: 2023 },
    { id: 4, title: 'City Lights', artist: 'Urban Beats', year: 2024 },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Search Header */}
      <div className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for albums, artists, or songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 glass rounded-2xl text-white placeholder-gray-400 border border-white/10 focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'glass text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            Search Results for "{searchQuery}"
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* {searchResults.map((album) => (
              // <AlbumCard
              //   key={album.id}
              //   title={album.title}
              //   artist={album.artist}
              //   year={album.year}
              // />
            ))} */}
          </div>
        </section>
      ) : (
        <>
          {/* Browse Categories */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Browse Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Pop', color: 'from-pink-500 to-red-500' },
                { name: 'Rock', color: 'from-orange-500 to-yellow-500' },
                { name: 'Hip Hop', color: 'from-green-500 to-blue-500' },
                { name: 'Electronic', color: 'from-purple-500 to-indigo-500' },
                { name: 'Jazz', color: 'from-yellow-500 to-orange-500' },
                { name: 'Classical', color: 'from-indigo-500 to-purple-500' },
                { name: 'R&B', color: 'from-red-500 to-pink-500' },
                { name: 'Country', color: 'from-green-500 to-yellow-500' },
              ].map((category) => (
                <div
                  key={category.name}
                  className={`h-32 rounded-2xl bg-gradient-to-br ${category.color} p-4 cursor-pointer hover:scale-105 transition-transform duration-300 flex items-end`}
                >
                  <h3 className="text-white font-bold text-xl">{category.name}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Searches */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Recent Searches</h2>
            <div className="space-y-2">
              {['Luna Eclipse', 'Neon Pulse', 'Electric Nights', 'Midnight Dreams'].map((search) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors w-full text-left"
                >
                  <SearchIcon size={16} className="text-gray-400" />
                  <span className="text-gray-300">{search}</span>
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Search;
