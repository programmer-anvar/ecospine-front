// Backend API Response Types
export interface Product {
  _id: string;
  title: string;
  body: string;
  price: number;
  image: string;
  imageUrl: string;
  thumbnail: string;
  thumbnailUrl: string;
  category: Category;
  categoryProperties: Record<string, CategoryPropertyValue>;
  tags: string[];
  status: ProductStatus;
  views: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  slug?: string;
}

export type ProductStatus = "active" | "inactive" | "draft";
export type CategoryPropertyValue = string | number | boolean;

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  properties: CategoryProperty[];
  isActive: boolean;
  sortOrder: number;
}

export interface CategoryProperty {
  name: string;
  type: CategoryPropertyType;
  options?: string[];
  unit?: string;
  required: boolean;
  description?: string;
  defaultValue?: CategoryPropertyValue;
}

export type CategoryPropertyType = "select" | "number" | "text" | "boolean" | "range";

export interface ProductSize {
  id: string;
  name: string;
  price: string;
}

// Component props types - Adapted for backend data
export interface ProductCardProps {
  product: Product;
}

// API response types matching backend
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Auth types
export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  fullName?: string;
  avatar?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = "owner" | "admin" | "moderator" | "guest";

export interface LoginResponse {
  token: string;
  user: User;
}

// Feature types
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Navigation types
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

// Theme types
export type Theme = "light" | "dark" | "system";

// Contact form types
export interface ContactForm {
  name: string;
  phone: string;
  message?: string;
  productId?: number;
}
