
import heroMattress from "@/public/heroImg.png"
import { Button } from "../ui/button";
import Image from "next/image";

const BeddingSection = () => {
  return (
    <section className="relative container mx-auto min-h-[70vh] px-6  overflow-hidden   mt-10">
    {/* Background Image */}
    <div className="absolute  h-[70vh]">
      <Image
        src={heroMattress} 
        alt="Hero Mattress" 
        className="w-full h-full object-cover rounded-lg "
      />
      <div className="absolute inset-0  bg-gradient-to-   from-background/80  to-transparent"></div>
    </div>
    
    {/* Price Box - Right Side */}
    {/* <div className="hidden md:block absolute top-[400px] right-16 transform -translate-y-1/2 z-20 px-14">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl w-[450px] border border-white/20">
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          COMFORT+ Matras
        </h3>
        
        <p className="text-sm text-foreground mb-4">
          Yuksak sifatli uyqu uchun mukammal tanlov
        </p>
        
      
      </div>
    </div> */}
    
    {/* Decorative Elements */}
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
  </section>
  );
};

export default BeddingSection;