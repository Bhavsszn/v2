import React from 'react';
import { MapPin } from 'lucide-react';

interface WelcomeScreenProps {
  onSearchByLocation: () => void;
  onSearchByName: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onSearchByLocation,
  onSearchByName
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <MapPin className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to DJFNDR!
          </h1>
          <p className="text-gray-600">
            We'll find you the perfect DJ for your next event
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-gray-700 font-medium mb-4">
            How would you like to search?
          </p>
          
          <button
            onClick={onSearchByLocation}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            By Location
          </button>
          
          <button
            onClick={onSearchByName}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            By Name
          </button>
        </div>
      </div>
    </div>
  );
};