import Hero from "@/components/hero/Hero";
import ProductsSection from "@/components/product-section/ProductsSection";
import BeddingSection from "@/components/bedding-section/BeddingSection";
import AllProductsSection from "@/components/all-products";
import Guarantee from "@/components/guarantee";
import Customers from "@/components/customers";
import InterestingQuestions from "@/components/interesting-questions";

export default function Home() {
  return (
    <div className="bg-[#14192C] text-foreground min-h-screen">
      <Hero />
      <ProductsSection />
      <BeddingSection />
      <AllProductsSection />
      <Guarantee />
      <Customers />
      <InterestingQuestions />
    </div>
  );
}
