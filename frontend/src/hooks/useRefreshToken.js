import { useState } from 'react';
import { authAPI } from '../utils/api';

const useRefreshToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authAPI.refresh();
      const { accessToken, user } = response.data;
      
      // Update stored tokens and user data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userData', JSON.stringify(user));
      
      return { accessToken, user };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to refresh token';
      setError(errorMessage);
      
      // Clear invalid tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { refresh, loading, error };
};

export default useRefreshToken;