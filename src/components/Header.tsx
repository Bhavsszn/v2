import React from 'react';
import { Music, User, Menu, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onMenuClick?: () => void;
  onDJSignup?: () => void;
  onHowItWorks?: () => void;
  onProducts?: () => void;
  onLogin?: () => void;
  onSignup?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onDJSignup, 
  onHowItWorks, 
  onProducts,
  onLogin,
  onSignup
}) => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            <button 
              onClick={onProducts}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Services
            </button>
            <button 
              onClick={onHowItWorks}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              How it Works
            </button>
            <button 
              onClick={onDJSignup}
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              For DJs
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.user_metadata?.name || user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={onLogin}
                  className="text-gray-700 hover:text-gray-900 font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={onSignup}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
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