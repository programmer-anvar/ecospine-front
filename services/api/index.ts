// EcoSpine API Client - Professional integration with backend
import { 
  ApiResponse, 
  PaginatedResponse, 
  CategoryPropertyValue, 
  ProductStatus, 
  ValidationError 
} from "@/types";
import { API_CONFIG } from "@/constants";

const API_BASE = API_CONFIG.baseUrl;
const API_VERSION = API_CONFIG.version;

interface LoginCredentials {
  username: string;
  password: string;
}

interface CreatePostData {
  title: string;
  body: string;
  price: number;
  category: string;
  categoryProperties: Record<string, CategoryPropertyValue>;
  tags: string[] | string;
  featured?: boolean;
  status?: ProductStatus;
}

interface PostFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
  status?: ProductStatus;
  tags?: string[] | string;
  sort?: string;
  categoryProperties?: Record<string, CategoryPropertyValue>;
}

export class EcoSpineAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: ValidationError[],
    public code?: string
  ) {
    super(message);
    this.name = 'EcoSpineAPIError';
  }

  public isValidationError(): boolean {
    return this.status === 400 && Array.isArray(this.errors);
  }

  public isAuthError(): boolean {
    return this.status === 401 || this.status === 403;
  }

  public isNotFoundError(): boolean {
    return this.status === 404;
  }
}

export class EcoSpineAPI {
  private token: string | null = null;
  private baseURL: string;

  constructor(token?: string) {
    this.token = token || (typeof window !== 'undefined' ? localStorage.getItem('ecospine_token') : null);
    this.baseURL = `${API_BASE}/${API_VERSION}`;
  }

  private async makeRequest<T = Record<string, unknown>>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add authorization header if token exists
    if (this.token && !headers.Authorization) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json() as ApiResponse<T>;

      if (!response.ok) {
        throw new EcoSpineAPIError(
          data.message || 'API request failed',
          response.status,
          data.errors
        );
      }

      if (!data.success) {
        throw new EcoSpineAPIError(
          data.message || 'API operation failed',
          response.status,
          data.errors
        );
      }

      return data;
    } catch (error) {
      if (error instanceof EcoSpineAPIError) {
        throw error;
      }
      
      throw new EcoSpineAPIError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  private updateToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('ecospine_token', token);
    }
  }

  // Authentication Methods
  async login(credentials: LoginCredentials) {
    const response = await this.makeRequest<{
      token: string;
      user: Record<string, unknown>;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data.token) {
      this.updateToken(response.data.token);
    }

    return response;
  }

  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ecospine_token');
    }
  }

  // Category Methods
  async getCategories() {
    return this.makeRequest<Record<string, unknown>[]>('/categories');
  }

  async initializeMattressCategories() {
    return this.makeRequest('/categories/initialize-mattress', {
      method: 'POST',
    });
  }

  async getCategoryBySlug(slug: string) {
    return this.makeRequest(`/categories/slug/${slug}`);
  }

  // Post Methods
  async getPosts(filters: PostFilters = {}) {
    const params = new URLSearchParams();
    
    // Basic filters
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters.sort) params.append('sort', filters.sort);
    if (filters.status) params.append('status', filters.status);
    
    // Tags handling
    if (filters.tags) {
      const tagsString = Array.isArray(filters.tags) ? filters.tags.join(',') : filters.tags;
      params.append('tags', tagsString);
    }
    
    // Category properties filtering
    if (filters.categoryProperties) {
      Object.entries(filters.categoryProperties).forEach(([key, value]) => {
        params.append(`categoryProperty.${key}`, value.toString());
      });
    }

    const endpoint = params.toString() ? `/posts?${params}` : '/posts';
    return this.makeRequest<PaginatedResponse<Record<string, unknown>>>(endpoint);
  }

  async getPost(id: string) {
    return this.makeRequest<Record<string, unknown>>(`/posts/${id}`);
  }

  async createPost(postData: CreatePostData, imageFile?: File) {
    const formData = new FormData();
    
    // Add text fields
    formData.append('title', postData.title);
    formData.append('body', postData.body);
    formData.append('price', postData.price.toString());
    formData.append('category', postData.category);
    formData.append('categoryProperties', JSON.stringify(postData.categoryProperties));
    
    // Handle tags
    const tagsString = Array.isArray(postData.tags) ? postData.tags.join(',') : postData.tags;
    formData.append('tags', tagsString);
    
    if (postData.featured !== undefined) {
      formData.append('featured', postData.featured.toString());
    }
    
    // Add image file
    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.makeRequest('/posts', {
      method: 'POST',
      headers: {}, // Remove Content-Type to let browser set multipart boundary
      body: formData,
    });
  }

  async updatePost(id: string, updates: Partial<CreatePostData>) {
    return this.makeRequest<Record<string, unknown>>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deletePost(id: string) {
    return this.makeRequest(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  async restorePost(id: string) {
    return this.makeRequest(`/posts/${id}/restore`, {
      method: 'POST',
    });
  }

  // Utility method to get full image URL
  getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_BASE}/static/${imagePath}`;
  }

  // Health check
  async health() {
    try {
      const response = await fetch(`${API_BASE}`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new EcoSpineAPI();

// Export for use in components
export default EcoSpineAPI;
