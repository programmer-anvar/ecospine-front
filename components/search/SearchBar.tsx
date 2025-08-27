"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
// import { Button } from '@/components/ui/button';
import { useSearchPosts, useFormatPrice } from "@/hooks/useAPI";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface SearchBarProps {
  onClose?: () => void;
  className?: string;
}

export default function SearchBar({ onClose, className = "" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formatPrice = useFormatPrice();

  const { data: searchResponse, isLoading } = useSearchPosts(searchTerm, {
    limit: 5,
    sort: "-createdAt",
  });

  const searchResults = (searchResponse?.data as unknown as { docs?: Product[] })?.docs || [];

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setIsOpen(value.length > 0);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setSearchTerm("");
    onClose?.();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Mahsulotlarni qidiring..."
          value={searchTerm}
          onChange={e => handleSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-[#1E243D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-[#1E243D] border border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading && searchTerm.length > 2 && (
            <div className="p-4 text-center">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <p className="text-gray-400 mt-2">Qidirilmoqda...</p>
            </div>
          )}

          {!isLoading && searchTerm.length > 2 && searchResults.length === 0 && (
            <div className="p-4 text-center text-gray-400">
              <p>"{searchTerm}" bo'yicha hech narsa topilmadi</p>
              <p className="text-sm mt-1">Boshqa so'z bilan qidiring</p>
            </div>
          )}

          {!isLoading && searchResults.length > 0 && (
            <>
              <div className="p-3 border-b border-gray-600">
                <p className="text-sm text-gray-400">
                  {searchResponse?.data?.totalDocs || 0} ta natija topildi
                </p>
              </div>

              {searchResults.map((product: Product) => (
                <Link
                  key={product._id}
                  href={`/products/product/${product._id}`}
                  onClick={handleResultClick}
                  className="block p-4 hover:bg-gray-700 transition-colors border-b border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <Image
                      src={product.thumbnailUrl || product.imageUrl || '/placeholder-product.jpg'}
                      alt={product.title}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{product.title}</h3>
                      <p className="text-sm text-gray-400 truncate">
                        {product.body.slice(0, 60)}...
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-blue-400 font-semibold">
                          {formatPrice(product.price)}
                        </span>
                        {product.category && (
                          <span className="text-xs text-gray-500">{product.category.name}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              {searchResponse?.data?.totalDocs && searchResponse.data.totalDocs > 5 && (
                <Link
                  href={`/?search=${encodeURIComponent(searchTerm)}`}
                  onClick={handleResultClick}
                  className="block p-4 text-center text-blue-400 hover:text-blue-300 border-t border-gray-600"
                >
                  Barcha {searchResponse.data.totalDocs} ta natijani ko'rish
                </Link>
              )}
            </>
          )}

          {searchTerm.length > 0 && searchTerm.length <= 2 && (
            <div className="p-4 text-center text-gray-400">
              <p>Qidirish uchun kamida 3 ta harf kiriting</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
