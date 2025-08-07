import { useState } from 'react';
import { DJ, SearchFilters } from '../types';
import { mockDJs } from '../data/mockData';

export const useDJs = () => {
  const [djs, setDJs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDJs = async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Filter mock DJs based on location
      const filteredDJs = mockDJs.filter(dj => 
        dj.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        filters.location.toLowerCase().includes(dj.location.toLowerCase())
      );

      setDJs(filteredDJs);
    } catch (err) {
      setError('Failed to search DJs');
    } finally {
      setLoading(false);
    }
  };

  return {
    djs,
    loading,
    error,
    searchDJs
  };
};