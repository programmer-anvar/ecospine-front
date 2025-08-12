'use client'

import AllProductsSeaction from "@/components/all-products";
import BeddingSection from "@/components/bedding-section/BeddingSection";
import Customers from "@/components/custommers";
import Guarantee from "@/components/guarantee";
import Hero from "@/components/hero/Hero";
import InterestingQuestions from "@/components/interesting-questions";
import ProductsSection from "@/components/product-section/ProductsSection";

const HomePage = () => {
  return <div>
  <Hero/>
   <ProductsSection/>
   <BeddingSection/>
   <AllProductsSeaction/>
   <Guarantee/>
   <Customers/>
   <InterestingQuestions/>
    
  </div>
};

export default HomePage;