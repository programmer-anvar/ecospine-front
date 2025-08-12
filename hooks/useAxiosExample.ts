// Example usage of the useAxios hook
import React from 'react';
import { useAxios, useGet, usePost, UseAxiosOptions } from './useAxios';

// Define your data types
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

// Example 1: Basic GET request with immediate execution
export function useUsers() {
  return useGet<ApiResponse<User[]>>('/users', {
    immediate: true,
    onSuccess: (data) => {
      console.log('Users loaded:', data);
    },
    onError: (error) => {
      console.error('Failed to load users:', error);
    },
  });
}

// Example 2: POST request with manual execution
export function useCreateUser() {
  const { data, loading, error, execute } = usePost<ApiResponse<User>>('/users');

  const createUser = (userData: CreateUserRequest) => {
    execute({
      data: userData,
      onSuccess: (response) => {
        console.log('User created:', response);
      },
      onError: (error) => {
        console.error('Failed to create user:', error);
      },
    });
  };

  return {
    data,
    loading,
    error,
    createUser,
  };
}

// Example 3: Complex request with custom configuration
export function useUserProfile(userId: number) {
  const { data, loading, error, execute, refetch, cancel } = useAxios<User>({
    url: `/users/${userId}`,
    method: 'GET',
    immediate: true,
    headers: {
      'Cache-Control': 'no-cache',
    },
    config: {
      timeout: 5000,
    },
    onSuccess: (data) => {
      console.log('User profile loaded:', data);
    },
    onError: (error) => {
      console.error('Failed to load user profile:', error);
    },
  });

  return {
    data,
    loading,
    error,
    refetch,
    cancel,
  };
}

// Example 4: Conditional request
export function useConditionalData(enabled: boolean) {
  const { data, loading, error, execute } = useAxios<ApiResponse<any>>({
    url: '/conditional-data',
    immediate: false, // Don't execute immediately
  });

  // Execute when enabled becomes true
  React.useEffect(() => {
    if (enabled) {
      execute();
    }
  }, [enabled, execute]);

  return { data, loading, error };
}

// Example 5: Search with debouncing
export function useSearchUsers() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { data, loading, error, execute } = useAxios<ApiResponse<User[]>>({
    url: '/users/search',
    method: 'GET',
    immediate: false,
  });

  // Debounced search
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        execute({
          params: { q: searchTerm },
        });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, execute]);

  return {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm,
  };
}

// Example 6: File upload
export function useFileUpload() {
  const { data, loading, error, execute } = usePost<ApiResponse<{ url: string }>>('/upload');

  const uploadFile = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    execute({
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: (response) => {
        console.log('File uploaded:', response.data.url);
      },
    });
  };

  return {
    data,
    loading,
    error,
    uploadFile,
  };
}

// Example 7: Pagination
export function usePaginatedUsers(page: number, limit: number) {
  const { data, loading, error, execute, refetch } = useGet<ApiResponse<User[]>>('/users', {
    immediate: false,
  });

  React.useEffect(() => {
    execute({
      params: { page, limit },
    });
  }, [page, limit, execute]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

// Example 8: Real-time data with polling
export function useRealtimeData() {
  const { data, loading, error, execute } = useGet<ApiResponse<any>>('/realtime-data', {
    immediate: true,
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      execute();
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [execute]);

  return { data, loading, error };
} 