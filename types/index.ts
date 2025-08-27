// Product types
export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  badges: string[];
  isHighlighted?: boolean;
  sizes?: ProductSize[];
  features?: string[];
  rating?: number;
  reviews?: number;
}

export interface ProductSize {
  id: string;
  name: string;
  price: string;
}

// Component props types
export interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  badges: string[];
  isHighlighted?: boolean;
  id?: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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
