"use client";

import ProductCard from "../product-card";
import { useFeaturedPosts } from "@/hooks/useAPI";
import { Product } from "@/types";

const ProductsSection = () => {
  const { data: response, isLoading, error } = useFeaturedPosts();

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Barcha uchun sevimli</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-[#1E243D] rounded-xl animate-pulse">
                <div className="h-48 bg-gray-600 rounded-lg mb-4"></div>
                <div className="px-4 pb-4 space-y-3">
                  <div className="h-6 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  <div className="h-8 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8">Barcha uchun sevimli</h2>
          <div className="text-center py-10">
            <p className="text-red-400 mb-4">Mahsulotlarni yuklashda xatolik yuz berdi</p>
            <p className="text-gray-400 text-sm">Backend server ishlamayotgan bo'lishi mumkin</p>
          </div>
        </div>
      </section>
    );
  }

  const products = (response?.data as unknown as { docs?: Product[] })?.docs || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Barcha uchun sevimli</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {products.slice(0, 4).map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400">Hozircha tavsiya etilgan mahsulotlar yo'q</p>
            <p className="text-gray-500 text-sm mt-2">
              Admin panel orqali mahsulotlarni "featured" qilib belgilang
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
