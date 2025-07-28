import { useState, useEffect } from 'react';
import { Review } from '../types';
import { apiService } from '../services/api';

export const useReviews = (djId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getDJReviews(id);
      setReviews(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (reviewData: Omit<Review, 'id' | 'date'>) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.createReview(reviewData);
      setReviews(prev => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (djId) {
      fetchReviews(djId);
    }
  }, [djId]);

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
  };
};