import { useCallback } from 'react';
import { authAPI } from '../utils/api';
import useAuth from './useAuth';

const useLogout = () => {
  const { logout: contextLogout } = useAuth();

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage and context
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      contextLogout();
    }
  }, [contextLogout]);

  return logout;
};

export default useLogout;