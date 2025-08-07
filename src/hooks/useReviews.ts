import { useState, useEffect } from 'react';
import { Review } from '../types';
import { mockReviews } from '../data/mockData';

export const useReviews = (djId?: string) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!djId) {
      setReviews([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      setTimeout(() => {
        const djReviews = mockReviews.filter(review => review.djId === djId);
        setReviews(djReviews);
        setLoading(false);
      }, 300);
    } catch (err) {
      setError('Failed to load reviews');
      setLoading(false);
    }
  }, [djId]);

  return {
    reviews,
    loading,
    error
  };
};