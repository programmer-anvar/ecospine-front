// React Query hooks for EcoSpine API integration
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Product, CategoryPropertyValue } from '@/types';
import { CACHE_CONFIG, CURRENCY } from '@/constants';

interface CreatePostData {
  title: string;
  body: string;
  price: number;
  category: string;
  categoryProperties: Record<string, CategoryPropertyValue>;
  tags: string[] | string;
  featured?: boolean;
}

// Query Keys
export const queryKeys = {
  categories: ['categories'] as const,
  posts: (filters?: UsePostsOptions) => ['posts', filters] as const,
  post: (id: string) => ['post', id] as const,
} as const;

// Categories
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => apiClient.getCategories(),
    staleTime: CACHE_CONFIG.categories.staleTime,
  });
}

export function useInitializeMattressCategories() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiClient.initializeMattressCategories(),
    onSuccess: () => {
      // Invalidate categories cache
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
    },
  });
}

// Posts/Products
interface UsePostsOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  sort?: string;
  categoryProperties?: Record<string, CategoryPropertyValue>;
}

export function usePosts(filters: UsePostsOptions = {}) {
  return useQuery({
    queryKey: queryKeys.posts(filters),
    queryFn: () => apiClient.getPosts(filters),
    staleTime: CACHE_CONFIG.products.staleTime,
    placeholderData: (previousData) => previousData, // Keep previous data while loading
  });
}

export function usePost(id: string, enabled = true) {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => apiClient.getPost(id),
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

export function useFeaturedPosts() {
  return useQuery({
    queryKey: queryKeys.posts({ featured: true, sort: '-createdAt' }),
    queryFn: () => apiClient.getPosts({ 
      featured: true, 
      sort: '-createdAt',
      limit: 8,
      status: 'active'
    }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Search specific hook
export function useSearchPosts(searchTerm: string, filters: UsePostsOptions = {}) {
  return useQuery({
    queryKey: queryKeys.posts({ ...filters, search: searchTerm }),
    queryFn: () => apiClient.getPosts({ 
      ...filters, 
      search: searchTerm,
      status: 'active'
    }),
    enabled: searchTerm.length > 2, // Only search with 3+ characters
    staleTime: 1000 * 60 * 2, // 2 minutes for search results
  });
}

// Category specific posts
export function useCategoryPosts(categoryId: string, options: UsePostsOptions = {}) {
  return useQuery({
    queryKey: queryKeys.posts({ ...options, category: categoryId }),
    queryFn: () => apiClient.getPosts({
      ...options,
      category: categoryId,
      status: 'active'
    }),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Create post mutation (for admin features if needed)
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postData, imageFile }: { 
      postData: CreatePostData; 
      imageFile?: File 
    }) => apiClient.createPost(postData, imageFile),
    onSuccess: () => {
      // Invalidate posts cache
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// Authentication
export function useLogin() {
  return useMutation({
    mutationFn: (credentials: { username: string; password: string }) => 
      apiClient.login(credentials),
  });
}

// Health check
export function useAPIHealth() {
  return useQuery({
    queryKey: ['api-health'],
    queryFn: () => apiClient.health(),
    retry: false,
    refetchInterval: 30000, // Check every 30 seconds
    staleTime: 1000 * 30, // 30 seconds
  });
}

// Utility hook for formatting prices
export function useFormatPrice() {
  return (price: number) => {
    return new Intl.NumberFormat(CURRENCY.locale, {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price) + ` ${CURRENCY.symbol}`;
  };
}

// Hook for transforming API products to display format
export function useProductDisplay() {
  const formatPrice = useFormatPrice();

  return (product: Product) => ({
    id: product._id,
    title: product.title,
    description: product.body,
    price: formatPrice(product.price),
    image: product.thumbnailUrl || product.imageUrl,
    fullImage: product.imageUrl,
    badges: product.tags,
    isHighlighted: product.featured,
    category: product.category,
    properties: product.categoryProperties,
    views: product.views,
    createdAt: product.createdAt,
  });
}
