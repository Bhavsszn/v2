import React, { useEffect } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

interface AuthCallbackProps {
  onComplete: () => void;
}

export const AuthCallback: React.FC<AuthCallbackProps> = ({ onComplete }) => {
  useEffect(() => {
    // Handle OAuth callback
    const handleAuthCallback = async () => {
      try {
        // The auth state change will be handled by useAuth hook
        // Just redirect back to the main app
        setTimeout(() => {
          onComplete();
        }, 2000);
      } catch (error) {
        console.error('Auth callback error:', error);
        onComplete();
      }
    };

    handleAuthCallback();
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing Sign In</h2>
        <p className="text-gray-600">Please wait while we finish setting up your account...</p>
      </div>
    </div>
  );
};