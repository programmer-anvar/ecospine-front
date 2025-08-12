'use client'
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import gipoallergikMattress from "@/public/carImg.png";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from '../ProductCard';
import axios from 'axios';

const AllProductsSeaction = () => {
  const products = [
    {
      id: 1,
      title: "Premium GipoAllergik Matras",
      description: "Yuqori sifatli, ortopedik, allergiyaga qarshi, zararli moddalardan holi maxsulot.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Ortopedik", "5 yillik kafolat"],
      isHighlighted: true
    },
    {
      id: 2,
      title: "Comfort Plus Matras",
      description: "Yumshoq va qattiq qatlamlar kombinatsiyasi bilan optimal qo'llab-quvvatlash.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Tabiiy materiallar", "Ikki tomonlama"]
    },
    {
      id: 3,
      title: "Anatomik GipoAllergik Matras",
      description: "Tananing har bir qismiga mukammal moslashadi, umurtqa qo'llab-quvvatlash.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Elastik", "Namlikka qarshi"]
    },
    {
      id: 4,
      title: "Elit Pro GipoAllergik Matras",
      description: "Maxsus dizayn bilan havo aylanish tizimi, qulay tun uyqusi uchun.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Oson tozalanadi", "Yengil vazn"]
    },
    {
      id: 5,
      title: "Royal Sleep Matras",
      description: "Eng yuqori sifatli materiallar, premium darajadagi uyqu tajribasi",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Namlikka qarshi", "Yengil vazn"]
    },
    {
      id: 6,
      title: "Classic GipoAllergik Matras",
      description: "Barqaror va ishonchli sifat, barcha yoshdagilar uchun mo'ljallangan.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Eco", "Namlikka qarshi"]
    }
  ];

 

  return (
    <div className="min-h-screen   via-blue-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-6">Mahsulotlar</h1>
          
          {/* Filters */}
          <div className="flex flex-nowrap gap-2 overflow-x-auto overflow-x-auto">
            <Select>
              <SelectTrigger className="w-[200px] bg-red-500">
                <SelectValue placeholder="Narx" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Arzon</SelectItem>
                <SelectItem value="medium">O'rtacha</SelectItem>
                <SelectItem value="high">Qimmat</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[200px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Yetkazib berish" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">Bepul</SelectItem>
                <SelectItem value="paid">Pullik</SelectItem>
                <SelectItem value="express">Tezkor</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[200px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Kenglik va Uzunlik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Yagona</SelectItem>
                <SelectItem value="double">Ikki kishilik</SelectItem>
                <SelectItem value="queen">Qirolicha</SelectItem>
                <SelectItem value="king">Qirol</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[200px]  border-white/20 text-white">
                <SelectValue placeholder="Tana vazni" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Yengil (60kg gacha)</SelectItem>
                <SelectItem value="medium">O'rtacha (60-90kg)</SelectItem>
                <SelectItem value="heavy">Og'ir (90kg+)</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[200px] bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Qulaylik hissi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soft">Yumshoq</SelectItem>
                <SelectItem value="medium">O'rtacha</SelectItem>
                <SelectItem value="hard">Qattiq</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} image={product.image.src} id={product.id} />
          ))}
        </div>

        {/* Bottom CTA */} 
        <div className="text-center mt-[15px]">
          <Button className=" w-full">
            Barcha mahsulotlar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllProductsSeaction;