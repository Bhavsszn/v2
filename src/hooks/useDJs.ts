import { useState, useEffect } from 'react';
import { DJ, SearchFilters } from '../types';
import { apiService } from '../services/api';

export const useDJs = () => {
  const [djs, setDJs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchDJs = async (filters: SearchFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.searchDJs(filters);
      setDJs(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search DJs');
      setDJs([]);
    } finally {
      setLoading(false);
    }
  };

  const getDJById = async (id: string): Promise<DJ | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getDJById(id);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch DJ');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    djs,
    loading,
    error,
    searchDJs,
    getDJById,
  };
};