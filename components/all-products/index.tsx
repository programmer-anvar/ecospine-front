"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "../product-card";
import { usePosts, useCategories } from "@/hooks/useAPI";
import { Product } from "@/types";
import { Loading, ProductSkeleton, ErrorMessage } from "@/components/ui/loading";

const AllProductsSeaction = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("-createdAt");
  const [priceRange, setPriceRange] = useState<string>("all");

  // Build filters object with memoization
  const filters = useMemo(() => {
    const baseFilters = {
      page: currentPage,
      limit: 12,
      sort: sortBy,
      status: "active" as const,
    };

    if (selectedCategory !== "all" && selectedCategory) {
      Object.assign(baseFilters, { category: selectedCategory });
    }

    if (priceRange !== "all" && priceRange) {
      switch (priceRange) {
        case "low":
          Object.assign(baseFilters, { maxPrice: 2000000 });
          break;
        case "medium":
          Object.assign(baseFilters, { minPrice: 2000000, maxPrice: 4000000 });
          break;
        case "high":
          Object.assign(baseFilters, { minPrice: 4000000 });
          break;
      }
    }

    return baseFilters;
  }, [currentPage, sortBy, selectedCategory, priceRange]);

  const { data: postsResponse, isLoading: postsLoading, error: postsError } = usePosts(filters);
  const { data: categoriesResponse } = useCategories();

  const products = (postsResponse?.data as unknown as { docs?: Product[] })?.docs || [];
  const totalPages = (postsResponse?.data as unknown as { totalPages?: number })?.totalPages || 1;
  const categories = (categoriesResponse?.data as unknown as { _id: string; name: string }[]) || [];

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.getElementById("all-products")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId === "all" ? "all" : categoryId);
    setCurrentPage(1); // Reset to first page
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  }, []);

  const handlePriceRangeChange = useCallback((range: string) => {
    setPriceRange(range);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory("all");
    setPriceRange("all");
    setCurrentPage(1);
  }, []);

  if (postsLoading && currentPage === 1) {
    return (
      <section id="all-products" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Barcha mahsulotlar</h2>
          <ProductSkeleton count={8} />
        </div>
      </section>
    );
  }

  if (postsError) {
    return (
      <section id="all-products" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Barcha mahsulotlar</h2>
          <ErrorMessage
            title="Mahsulotlarni yuklashda xatolik"
            message="Backend server bilan bog'lanishda muammo yuz berdi"
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  return (
    <section id="all-products" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Barcha mahsulotlar</h2>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center items-center">
          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48 bg-[#1E243D] border-gray-600 text-white">
              <SelectValue placeholder="Kategoriya tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha kategoriyalar</SelectItem>
              {categories.map((category: { _id: string; name: string }) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Filter */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-48 bg-[#1E243D] border-gray-600 text-white">
              <SelectValue placeholder="Saralash" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Yangi avval</SelectItem>
              <SelectItem value="createdAt">Eski avval</SelectItem>
              <SelectItem value="price">Arzon avval</SelectItem>
              <SelectItem value="-price">Qimmat avval</SelectItem>
              <SelectItem value="-views">Ko'p ko'rilgan</SelectItem>
            </SelectContent>
          </Select>

          {/* Price Range Filter */}
          <Select value={priceRange} onValueChange={handlePriceRangeChange}>
            <SelectTrigger className="w-full sm:w-48 bg-[#1E243D] border-gray-600 text-white">
              <SelectValue placeholder="Narx oralig'i" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barcha narxlar</SelectItem>
              <SelectItem value="low">2 mln so'm gacha</SelectItem>
              <SelectItem value="medium">2-4 mln so'm</SelectItem>
              <SelectItem value="high">4 mln so'm dan yuqori</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {products.map((product: Product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || postsLoading}
                  className="bg-[#1E243D] border-gray-600 text-white hover:bg-gray-600"
                >
                  Oldingi
                </Button>

                <div className="flex space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + index;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={postsLoading}
                        className={
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "bg-[#1E243D] border-gray-600 text-white hover:bg-gray-600"
                        }
                        size="sm"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || postsLoading}
                  className="bg-[#1E243D] border-gray-600 text-white hover:bg-gray-600"
                >
                  Keyingi
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 mb-2">Tanlangan filtrlar bo'yicha mahsulot topilmadi</p>
            <p className="text-gray-500 text-sm">Boshqa kategoriya yoki narx oralig'ini tanlang</p>
            <Button onClick={handleClearFilters} className="mt-4" variant="outline">
              Filtrlarni tozalash
            </Button>
          </div>
        )}

        {postsLoading && currentPage > 1 && (
          <Loading className="mt-4" text="Keyingi sahifa yuklanmoqda..." />
        )}
      </div>
    </section>
  );
};

export default AllProductsSeaction;
