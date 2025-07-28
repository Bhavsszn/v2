import { useState } from 'react';
import { apiService } from '../services/api';

export const useBookings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBooking = async (bookingData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.createBooking(bookingData);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async (userId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getBookings(userId);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bookings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createBooking,
    getBookings,
  };
};