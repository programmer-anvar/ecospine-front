import { useState, useEffect, useCallback, useRef } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Types for the hook
export interface UseAxiosOptions<T> {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: AxiosError) => void;
  config?: AxiosRequestConfig;
}

export interface UseAxiosReturn<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  execute: (config?: Partial<UseAxiosOptions<T>>) => Promise<void>;
  refetch: () => Promise<void>;
  cancel: () => void;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export function useAxios<T = any>(options: UseAxiosOptions<T> = {}): UseAxiosReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(async (config?: Partial<UseAxiosOptions<T>>) => {
    const finalConfig = { ...options, ...config };
    
    if (!finalConfig.url) {
      setError(new Error('URL is required') as AxiosError);
      return;
    }

    // Cancel previous request if exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const axiosConfig: AxiosRequestConfig = {
        method: finalConfig.method || 'GET',
        url: finalConfig.url,
        data: finalConfig.data,
        params: finalConfig.params,
        headers: finalConfig.headers,
        signal: abortControllerRef.current.signal,
        ...finalConfig.config,
      };

      const response: AxiosResponse<T> = await api(axiosConfig);
      setData(response.data);
      
      if (finalConfig.onSuccess) {
        finalConfig.onSuccess(response.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      
      // Don't set error if request was cancelled
      if (axiosError.name !== 'CanceledError') {
        setError(axiosError);
        
        if (finalConfig.onError) {
          finalConfig.onError(axiosError);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [options]);

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
    }
  }, []);

  // Execute on mount if immediate is true
  useEffect(() => {
    if (options.immediate && options.url) {
      execute();
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [options.immediate, options.url, execute]);

  return {
    data,
    loading,
    error,
    execute,
    refetch,
    cancel,
  };
}

// Convenience hooks for common HTTP methods
export function useGet<T = any>(url: string, options?: Omit<UseAxiosOptions<T>, 'url' | 'method'>) {
  return useAxios<T>({ ...options, url, method: 'GET' });
}

export function usePost<T = any>(url: string, options?: Omit<UseAxiosOptions<T>, 'url' | 'method'>) {
  return useAxios<T>({ ...options, url, method: 'POST' });
}

export function usePut<T = any>(url: string, options?: Omit<UseAxiosOptions<T>, 'url' | 'method'>) {
  return useAxios<T>({ ...options, url, method: 'PUT' });
}

export function useDelete<T = any>(url: string, options?: Omit<UseAxiosOptions<T>, 'url' | 'method'>) {
  return useAxios<T>({ ...options, url, method: 'DELETE' });
}

export function usePatch<T = any>(url: string, options?: Omit<UseAxiosOptions<T>, 'url' | 'method'>) {
  return useAxios<T>({ ...options, url, method: 'PATCH' });
}

// Export the api instance for direct use
export { api }; 