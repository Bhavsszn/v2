import React from 'react';
import { ArrowLeft, Play, Star } from 'lucide-react';
import { DJ, SearchFilters } from '../types';

interface SearchResultsProps {
  djs: DJ[];
  filters: SearchFilters;
  onBack: () => void;
  onSelectDJ: (dj: DJ) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  djs,
  filters,
  onBack,
  onSelectDJ
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </button>
            
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filters.location}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{formatDate(filters.date)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {djs.map((dj) => (
            <div
              key={dj.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectDJ(dj)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={dj.avatar}
                    alt={dj.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{dj.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{dj.rating}</span>
                        <span className="ml-1 text-sm text-gray-500">({dj.reviewCount} Reviews)</span>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Event Types: {dj.eventTypes.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {dj.availability}
                  </span>
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Play className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};