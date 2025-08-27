"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Phone, Truck, RotateCcw, Shield } from "lucide-react";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = ({ params }: ProductPageProps) => {
  const [selectedSize, setSelectedSize] = useState("1-kishi");
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    name: "Anatomik GipoAllergik Matras",
    rating: 4.9,
    reviews: 156,
    price: "2,900,000 so'm",
    tags: ["Elastik", "Namlikka qarshi"],
    images: [
      "/hero-mattress.jpg",
      "/hero-mattress.jpg",
      "/hero-mattress.jpg",
      "/hero-mattress.jpg",
      "/hero-mattress.jpg",
    ],
    sizes: [
      { id: "1-kishi", name: "1 Kishi 90x120 sm", price: "1,900,000 so'm" },
      { id: "2-kishi", name: "2 Kishi 90x120 sm", price: "2,400,000 so'm" },
      { id: "king", name: "King size 180x200 sm", price: "2,900,000 so'm" },
      { id: "super-king", name: "Super King 180x200 sm", price: "3,200,000 so'm" },
    ],
    features: ["Bepul yetkazib berish", "30 kun qaytarish", "15 yil kafolat"],
  };

  const description = {
    overview:
      "Anatomik GipoAllergik matras - zamonaviy texnologiyalar va tabiatdan ilhomlangan materiallarning mukammal kombinatsiyasi, sog&apos;lik va qulaylik uchun tanlangan.",
    zones: [
      { zone: "Bosh va bo&apos;yin zonasi", description: "yumshoq qo&apos;llab-quvvatlash" },
      { zone: "Yelka zonasi", description: "o&apos;rtacha qattiqlik" },
      { zone: "Bel zonasi", description: "maksimal qo&apos;llab-quvvatlash" },
      { zone: "Dumba zonasi", description: "yumshoq moslashuvchanlik" },
      { zone: "Son zonasi", description: "mustahkam qo&apos;llab-quvvatlash" },
      { zone: "Tizza zonasi", description: "yumshoq moslashuvchanlik" },
      { zone: "Oyoq zonasi", description: "yengil qo&apos;llab-quvvatlash" },
    ],
    hypoallergenic: [
      "Chang kenesi va bakteriyalarni yo&apos;q qiladi",
      "Tabiiy Aloe Vera ekstrakti - terini himoya qiladi",
      "Nafas olish qiyinliklarini kamaytiradi",
      "Sensitive teri uchun xavfsiz",
    ],
  };

  return (
    <div className="min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-blue-400"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="rounded-lg bg-[#1E243D] p-2">
              <div className="flex gap-2">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-white">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white">
                  {product.rating} ({product.reviews} ta sharh)
                </span>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">O&apos;lchamni tanlang:</h3>
                <div className="flex items-center gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-1 rounded-lg bg-[#1E243D] text-left transition-all w-[100px] flex justify-center items-center ${
                        selectedSize === size.id
                          ? "border-blue-500 bg-blue-500/10 text-blue-400"
                          : "border-gray-300 text-white hover:border-blue-300"
                      }`}
                    >
                      <div className="font-medium text-sm w-[90px] text-center">{size.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-white py-2 px-6 rounded-lg bg-[#1E243D]">
                {product.sizes.find(s => s.id === selectedSize)?.price || product.price}
              </div>

              {/* Call to Action */}
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6">
                <Phone className="w-5 h-5 mr-2" />
                Qo&apos;ng&apos;iroq qilish
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-3">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-800/30 rounded-lg">
                  {index === 0 && <Truck className="w-5 h-5 text-blue-400" />}
                  {index === 1 && <RotateCcw className="w-5 h-5 text-blue-400" />}
                  {index === 2 && <Shield className="w-5 h-5 text-blue-400" />}
                  <span className="text-white text-sm">{feature}</span>
                </div>
              ))}
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
                value="reviews"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-300"
              >
                Sharhlar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Mahsulot haqida batafsil</h3>

                <p className="text-gray-300 leading-relaxed">{description.overview}</p>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    7-zonali ortopedik qo'llab-quvvatlash:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {description.zones.map((zone, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 bg-blue-800/20 rounded-lg"
                      >
                        <span className="text-white font-medium">{zone.zone}</span>
                        <span className="text-gray-300">- {zone.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">
                    Gippoallergenik xususiyatlar:
                  </h4>
                  <ul className="space-y-2">
                    {description.hypoallergenic.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Texnik xususiyatlar</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Materiallar</h4>
                    <p className="text-gray-300">Tabiiy lateks, visko elastik, ortopedik prujina</p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Qattiqlik</h4>
                    <p className="text-gray-300">O'rtacha (3-4 daraja)</p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Balandlik</h4>
                    <p className="text-gray-300">18-22 sm</p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Vazn</h4>
                    <p className="text-gray-300">25-35 kg</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Mijozlar sharhlari</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white font-medium">Ahmad</span>
                    </div>
                    <p className="text-gray-300">
                      Ajoyib matras! Uyqu sifatim sezilarli darajada yaxshilandi. Ortopedik
                      qo'llab-quvvatlash juda yaxshi.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-800/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span className="text-white font-medium">Malika</span>
                    </div>
                    <p className="text-gray-300">
                      Allergiyam bor edi, lekin bu matras bilan muammo yo'q. Tabiiy materiallar juda
                      yaxshi.
                    </p>
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
