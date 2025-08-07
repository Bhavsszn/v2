import { useState } from 'react';

export const useBookings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingDetails: any) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send data to your backend
      console.log('Booking created:', bookingDetails);
      
      // Simulate success
      return { success: true, bookingId: 'booking_' + Date.now() };
    } catch (err) {
      setError('Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createBooking
  };
};