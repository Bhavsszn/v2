import React from 'react';
import { Music, User, Menu } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">DJFNDR</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Find DJs</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">How it Works</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">For DJs</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900 font-medium">Sign In</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Sign Up
            </button>
            <button 
              className="md:hidden p-2"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};