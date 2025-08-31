import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ApiCallOptions {
  requireAuth?: boolean;
  showErrorToast?: boolean;
}

export const useApiCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken, refreshToken } = useAuth();

  const apiCall = useCallback(async <T>(
    url: string,
    options: RequestInit & ApiCallOptions = {}
  ): Promise<T> => {
    const { requireAuth = false, showErrorToast = true, ...fetchOptions } = options;
    
    setIsLoading(true);
    setError(null);

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers as Record<string, string>,
      };

      if (requireAuth && accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      let response = await fetch(url, {
        ...fetchOptions,
        headers,
      });

      // If token expired, try to refresh
      if (response.status === 401 && requireAuth) {
        try {
          await refreshToken();
          const newToken = localStorage.getItem('accessToken');
          if (newToken) {
            headers.Authorization = `Bearer ${newToken}`;
            response = await fetch(url, {
              ...fetchOptions,
              headers,
            });
          }
        } catch (refreshError) {
          throw new Error('Session expired. Please login again.');
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, refreshToken]);

  return { apiCall, isLoading, error };
};
