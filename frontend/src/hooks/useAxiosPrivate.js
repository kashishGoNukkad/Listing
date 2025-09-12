import { useEffect } from 'react';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import api from '../utils/api';

const useAxiosPrivate = () => {
  const { user } = useAuth();
  const { refresh } = useRefreshToken();

  useEffect(() => {
    // Request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          
          try {
            const { accessToken } = await refresh();
            prevRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return api(prevRequest);
          } catch (refreshError) {
            // Redirect to login if refresh fails
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return api;
};

export default useAxiosPrivate;