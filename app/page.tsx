import AllProductsSeaction from "@/components/all-products";
import BeddingSection from "@/components/bedding-section/BeddingSection";
import Customers from "@/components/custommers";
import { Footer } from "@/components/footer";
import Guarantee from "@/components/guarantee";
import Header from "@/components/header/Index";
import Hero from "@/components/hero/Hero";
import InterestingQuestions from "@/components/interesting-questions";
import ProductsSection from "@/components/product-section/ProductsSection";
import HomePage from "@/view/home";
// import HomePage from "@/view/home/Index";


export default function Home() {
  return (
   <div className="bg-[#14192C] text-foreground min-h-screen">
    <HomePage/>
   </div>
  );
}
