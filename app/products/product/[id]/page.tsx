"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Truck, RotateCcw, Shield   } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePost, useFormatPrice } from "@/hooks/useAPI";
import { Product } from "@/types";
import { CONTACT_INFO, PRODUCT_FEATURES } from "@/constants";
import { ErrorMessage } from "@/components/ui/loading";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const formatPrice = useFormatPrice();

  const { data: response, isLoading, error } = usePost(params.id);

  // Memoized product data with proper typing
  const product = useMemo(() => {
    return (response?.data as unknown as Product) || null;
  }, [response?.data]);

  // Memoized images array
  const images = useMemo(() => {
    if (!product) return ["/hero-mattress.jpg"];
    const productImages = [];
    if (product.imageUrl) productImages.push(product.imageUrl);
    if (product.thumbnailUrl && product.thumbnailUrl !== product.imageUrl) {
      productImages.push(product.thumbnailUrl);
    }
    return productImages.length > 0 ? productImages : ["/hero-mattress.jpg"];
  }, [product]);

  // Memoized features from constants
  const features = useMemo(
    () => [
      { icon: Truck, text: PRODUCT_FEATURES.delivery },
      { icon: RotateCcw, text: PRODUCT_FEATURES.trial },
      { icon: Shield, text: PRODUCT_FEATURES.warranty },
    ],
    []
  );

  if (isLoading) {
    return (
      <div className="min-h-screen mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <div className="h-96 bg-gray-600 rounded-lg animate-pulse"></div>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-20 h-20 bg-gray-600 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-600 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-600 rounded w-3/4 animate-pulse"></div>
              <div className="h-10 bg-gray-600 rounded w-1/2 animate-pulse"></div>
              <div className="h-12 bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <ErrorMessage
            title="Mahsulot topilmadi"
            message="Siz qidirayotgan mahsulot mavjud emas yoki o'chirilgan"
            onRetry={() => {
              window.location.href = "/";
            }}
            className="py-20"
          />
        </div>
      </div>
    );
  }

  // Category properties for display with proper typing
  const categoryProperties = product?.categoryProperties || {};

  return (
    <div className="min-h-screen mt-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-blue-400 hover:text-blue-300">
              Bosh sahifa
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/#all-products" className="text-blue-400 hover:text-blue-300">
              Mahsulotlar
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300">{product.title}</span>
          </nav>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <Image
                src={images[selectedImage]}
                alt={product.title}
                width={600}
                height={384}
                className="w-full h-96 object-cover rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
              {product.featured && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white">Tavsiya etiladi</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-blue-400"
                        : "border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div className="rounded-lg bg-[#1E243D] p-6">
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {product.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-white mb-4">{product.title}</h1>

              {/* Category */}
              {product.category && (
                <div className="mb-4">
                  <span className="text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full text-sm">
                    {product.category.name}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-3xl font-bold text-price-primary mb-6">
                {formatPrice(product.price)}
              </div>

              {/* Call to Action */}
              <a href={`tel:${CONTACT_INFO.phone}`}>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 mb-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Qo&apos;ng&apos;iroq qilish
                </Button>
              </a>

              {/* Views */}
              <div className="text-sm text-gray-400 mb-4">👁 {product.views} marta ko'rilgan</div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-blue-800/30 rounded-lg"
                  >
                    <IconComponent className="w-5 h-5 text-blue-400" />
                    <span className="text-white text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="bg-white/5 border-white/10 p-4">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent">
              <TabsTrigger
                value="description"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Tavsif
              </TabsTrigger>
              <TabsTrigger
                value="features"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Xususiyatlari
              </TabsTrigger>
              <TabsTrigger
                value="contact"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Bog'lanish
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Mahsulot haqida batafsil</h3>

                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {product.body || "Mahsulot tavsifi mavjud emas"}
                </div>

                {/* Category Properties */}
                {Object.keys(categoryProperties).length > 0 && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white">Texnik xususiyatlar:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(categoryProperties).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between p-3 bg-blue-800/20 rounded-lg"
                        >
                          <span className="text-white font-medium capitalize">
                            {key.replace("_", " ")}
                          </span>
                          <span className="text-gray-300">
                            {typeof value === "object" ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="features" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Asosiy xususiyatlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Kategoriya</h4>
                    <p className="text-gray-300">{product.category?.name || "Belgilanmagan"}</p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Holat</h4>
                    <p className="text-gray-300">
                      {product.status === "active" ? "Mavjud" : "Mavjud emas"}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Yaratilgan vaqt</h4>
                    <p className="text-gray-300">
                      {new Date(product.createdAt).toLocaleDateString("uz-UZ")}
                    </p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Teglar</h4>
                    <p className="text-gray-300">
                      {product.tags.join(", ") || "Teglar mavjud emas"}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Bog'lanish</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Telefon</h4>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Manzil</h4>
                    <p className="text-gray-300">{CONTACT_INFO.address}</p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Ish vaqti</h4>
                    <p className="text-gray-300">{CONTACT_INFO.workingHours}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;