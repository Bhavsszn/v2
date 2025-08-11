import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { SearchResults } from './components/SearchResults';
import { DJProfile } from './components/DJProfile';
import { BookingModal } from './components/BookingModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useDJs } from './hooks/useDJs';
import { useReviews } from './hooks/useReviews';
import { useBookings } from './hooks/useBookings';
import { DJ, SearchFilters } from './types';
import { DJSignupScreen } from './components/DJSignupScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { SuccessPage } from './components/SuccessPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { AuthCallback } from './components/auth/AuthCallback';
import { useAuth } from './hooks/useAuth';
import { mockDJs } from './data/mockData';

type Screen = 'welcome' | 'search' | 'results' | 'profile' | 'dj-signup' | 'how-it-works' | 'products' | 'success' | 'login' | 'signup' | 'auth-callback' | 'shared-profile';

function App() {
  const { user, loading: authLoading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Custom hooks for data management
  const { djs, loading: djsLoading, error: djsError, searchDJs } = useDJs();
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(selectedDJ?.id);
  const { loading: bookingLoading, error: bookingError, createBooking } = useBookings();

  // Check for auth callback on mount
  useEffect(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    
    // Handle shared DJ profile URLs like /dj/1
    if (path.startsWith('/dj/')) {
      const djId = path.split('/')[2];
      if (djId) {
        // Find the DJ from mock data
        const dj = mockDJs.find(d => d.id === djId);
        if (dj) {
          setSelectedDJ(dj);
          setCurrentScreen('shared-profile');
          return;
        }
      }
    }
    
    if (hash.includes('access_token') || hash.includes('error')) {
      setCurrentScreen('auth-callback');
    }
  }, []);

  const handleSearchByLocation = () => {
    setCurrentScreen('search');
  };

  const handleSearchByName = () => {
    // For now, redirect to location search
    setCurrentScreen('search');
  };

  const handleDJSignup = () => {
    setCurrentScreen('dj-signup');
  };

  const handleHowItWorks = () => {
    setCurrentScreen('how-it-works');
  };

  const handleProducts = () => {
    setCurrentScreen('products');
  };

  const handleLogin = () => {
    setAuthMode('login');
    setCurrentScreen('login');
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setCurrentScreen('signup');
  };

  const handleAuthComplete = () => {
    setCurrentScreen('welcome');
    // Clear URL hash
    window.history.replaceState(null, '', window.location.pathname);
  };

  const handleSearch = async (filters: SearchFilters) => {
    setSearchFilters(filters);
    await searchDJs(filters);
    setCurrentScreen('results');
  };

  const handleSelectDJ = (dj: DJ) => {
    setSelectedDJ(dj);
    setCurrentScreen('profile');
  };

  const handleBook = (dj: DJ) => {
    setSelectedDJ(dj);
    setShowBookingModal(true);
  };

  const handleBookingConfirm = async (bookingDetails: any) => {
    try {
      await createBooking(bookingDetails);
      alert('Booking request sent successfully! The DJ will contact you soon.');
    } catch (error) {
      alert('Failed to send booking request. Please try again.');
    }
    setShowBookingModal(false);
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'search':
      case 'dj-signup':
      case 'how-it-works':
      case 'products':
      case 'success':
      case 'login':
      case 'signup':
        setCurrentScreen('welcome');
        break;
      case 'results':
        setCurrentScreen('search');
        break;
      case 'profile':
        setCurrentScreen('results');
        break;
      case 'shared-profile':
        setCurrentScreen('welcome');
        // Clear the URL
        window.history.pushState({}, '', '/');
        break;
    }
  };

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen !== 'welcome' && (
        <Header 
          onDJSignup={handleDJSignup}
          onHowItWorks={handleHowItWorks}
          onProducts={handleProducts}
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onSearchByLocation={handleSearchByLocation}
          onSearchByName={handleSearchByName}
          onDJSignup={handleDJSignup}
          onHowItWorks={handleHowItWorks}
          onProducts={handleProducts}
        />
      )}

      {currentScreen === 'dj-signup' && (
        <DJSignupScreen onBack={handleBack} />
      )}

      {currentScreen === 'how-it-works' && (
        <HowItWorksScreen onBack={handleBack} />
      )}

      {currentScreen === 'success' && (
        <SuccessPage onBack={handleBack} />
      )}

      {currentScreen === 'login' && (
        <LoginPage 
          onBack={handleBack}
          onSwitchToSignup={() => {
            setAuthMode('signup');
            setCurrentScreen('signup');
          }}
        />
      )}

      {currentScreen === 'signup' && (
        <SignupPage 
          onBack={handleBack}
          onSwitchToLogin={() => {
            setAuthMode('login');
            setCurrentScreen('login');
          }}
        />
      )}

      {currentScreen === 'auth-callback' && (
        <AuthCallback onComplete={handleAuthComplete} />
      )}

      {currentScreen === 'search' && (
        <SearchScreen
          onSearch={handleSearch}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'results' && searchFilters && (
        <>
          {djsLoading && <LoadingSpinner className="py-8" />}
          {djsError && (
            <ErrorMessage 
              message={djsError} 
              onRetry={() => searchDJs(searchFilters)}
              className="mx-4"
            />
          )}
          {!djsLoading && !djsError && (
        <SearchResults
          djs={djs}
          filters={searchFilters}
          onBack={handleBack}
          onSelectDJ={handleSelectDJ}
        />
          )}
        </>
      )}

      {(currentScreen === 'profile' || currentScreen === 'shared-profile') && selectedDJ && (
        <>
          {reviewsLoading && <LoadingSpinner className="py-4" />}
          {reviewsError && (
            <ErrorMessage 
              message={reviewsError}
              className="mx-4 mb-4"
            />
          )}
        <DJProfile
          dj={selectedDJ}
          reviews={reviews}
          isSharedView={currentScreen === 'shared-profile'}
          onBack={handleBack}
          onBook={handleBook}
        />
        </>
      )}

      {showBookingModal && selectedDJ && (
        <BookingModal
          dj={selectedDJ}
          isOpen={showBookingModal}
          loading={bookingLoading}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleBookingConfirm}
        />
      )}
    </div>
  );
}

export default App;