import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api } from './useAxios';

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  images: string[];
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
  specifications?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  inStock: boolean;
  specifications?: Record<string, any>;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

// Query keys for React Query
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
  search: (query: string) => [...productKeys.all, 'search', query] as const,
};

// API functions
const productsApi = {
  // Get all products with filters
  getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/products?${params.toString()}`);
    return response.data;
  },

  // Get single product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (product: CreateProductRequest): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  // Update product
  updateProduct: async ({ id, ...product }: UpdateProductRequest): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  // Get product categories
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get(`/products/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};

// Main hook for getting products with caching
export function useProductsCache(
  filters: ProductFilters = {},
  options?: Omit<UseQueryOptions<ProductsResponse, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productsApi.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    ...options,
  });
}

// Hook for getting a single product
export function useProductCache(
  id: string,
  options?: Omit<UseQueryOptions<Product, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    ...options,
  });
}

// Hook for getting product categories
export function useProductCategoriesCache(
  options?: Omit<UseQueryOptions<string[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: () => productsApi.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    ...options,
  });
}

// Hook for searching products
export function useProductSearchCache(
  query: string,
  options?: Omit<UseQueryOptions<Product[], Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.search(query),
    queryFn: () => productsApi.searchProducts(query),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

// Mutation hooks
export function useCreateProductMutation(
  options?: Omit<UseMutationOptions<Product, Error, CreateProductRequest>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.createProduct,
    onSuccess: (newProduct) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      
      // Add the new product to the cache
      queryClient.setQueryData(
        productKeys.detail(newProduct.id),
        newProduct
      );
    },
    ...options,
  });
}

export function useUpdateProductMutation(
  options?: Omit<UseMutationOptions<Product, Error, UpdateProductRequest>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.updateProduct,
    onSuccess: (updatedProduct) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      
      // Update the product in cache
      queryClient.setQueryData(
        productKeys.detail(updatedProduct.id),
        updatedProduct
      );
    },
    ...options,
  });
}

export function useDeleteProductMutation(
  options?: Omit<UseMutationOptions<void, Error, string>, 'mutationFn'>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.deleteProduct,
    onSuccess: (_, deletedId) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      
      // Remove the product from cache
      queryClient.removeQueries({ queryKey: productKeys.detail(deletedId) });
    },
    ...options,
  });
}

// Utility hooks for common use cases
export function useProductsByCategory(category: string) {
  return useProductsCache({ category });
}

export function useProductsInStock() {
  return useProductsCache({ inStock: true });
}

export function useProductsByPriceRange(minPrice: number, maxPrice: number) {
  return useProductsCache({ minPrice, maxPrice });
}

export function useProductsSorted(sortBy: ProductFilters['sortBy'] = 'name', sortOrder: 'asc' | 'desc' = 'asc') {
  return useProductsCache({ sortBy, sortOrder });
}

// Hook for prefetching product data
export function usePrefetchProduct(id: string) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(id),
      queryFn: () => productsApi.getProduct(id),
      staleTime: 10 * 60 * 1000,
    });
  };
}

// Hook for prefetching products list
export function usePrefetchProducts(filters: ProductFilters = {}) {
  const queryClient = useQueryClient();

  return () => {
    queryClient.prefetchQuery({
      queryKey: productKeys.list(filters),
      queryFn: () => productsApi.getProducts(filters),
      staleTime: 5 * 60 * 1000,
    });
  };
}

// Export the API functions for direct use if needed
export { productsApi }; 