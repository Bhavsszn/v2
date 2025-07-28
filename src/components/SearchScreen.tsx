import React, { useState } from 'react';
import { Search, Calendar, MapPin } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchScreenProps {
  onSearch: (filters: SearchFilters) => void;
  onBack: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSearch, onBack }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location && date) {
      onSearch({ location, date });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 mb-4"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            DJFNDR
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Find A DJ in the Area
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State OR Zip Code"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-red-500 hover:text-red-600"
            >
              Use My Location
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When Is Your Event?
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>SEARCH</span>
          </button>
        </form>
      </div>
    </div>
  );
};