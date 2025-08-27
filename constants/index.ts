// Site configuration constants
export const SITE_CONFIG = {
  name: "EcoSpine",
  description:
    "O'zbekistonda eng sifatli ortopedik va ekologik matraslar. 15 yildan ortiq tajriba, 50,000+ mamnun mijoz.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://ecospine.uz",
  ogImage: "/hero-mattress.jpg",
  keywords: "ortopedik matras, ekologik matras, EcoSpine, matras O'zbekiston, ortopedik yotoq",
  author: "EcoSpine Team",
  locale: "uz-UZ",
} as const;

// API Configuration
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api",
  version: "v1",
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
} as const;

// Contact information
export const CONTACT_INFO = {
  phone: "+998901234567",
  email: "info@ecospine.uz",
  address: "Chust Shaxri, Namangan Vil, O'zbekiston",
  workingHours: "Dushanba - Shanba: 09:00 - 18:00",
} as const;

// Social media links
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/ecospine_uz",
  telegram: "https://t.me/ecospine_uz",
  facebook: "https://facebook.com/ecospine.uz",
} as const;

// Product constants
export const PRODUCT_FEATURES = {
  warranty: "15-20 yil kafolat",
  delivery: "Bepul yetkazib berish",
  trial: "30 kun sinab ko'rish",
  support: "24/7 texnik yordam",
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  products: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  },
  categories: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  },
} as const;

// Pagination constants
export const PAGINATION = {
  defaultLimit: 12,
  maxLimit: 50,
  defaultPage: 1,
} as const;

// Price formatting
export const CURRENCY = {
  code: "UZS",
  symbol: "so'm",
  locale: "uz-UZ",
} as const;
