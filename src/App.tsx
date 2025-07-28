import React, { useState } from 'react';
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

type Screen = 'welcome' | 'search' | 'results' | 'profile';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);
  const [selectedDJ, setSelectedDJ] = useState<DJ | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  // Custom hooks for data management
  const { djs, loading: djsLoading, error: djsError, searchDJs } = useDJs();
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(selectedDJ?.id);
  const { loading: bookingLoading, error: bookingError, createBooking } = useBookings();

  const handleSearchByLocation = () => {
    setCurrentScreen('search');
  };

  const handleSearchByName = () => {
    // For now, redirect to location search
    setCurrentScreen('search');
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
        setCurrentScreen('welcome');
        break;
      case 'results':
        setCurrentScreen('search');
        break;
      case 'profile':
        setCurrentScreen('results');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen !== 'welcome' && <Header />}
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onSearchByLocation={handleSearchByLocation}
          onSearchByName={handleSearchByName}
        />
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

      {currentScreen === 'profile' && selectedDJ && (
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