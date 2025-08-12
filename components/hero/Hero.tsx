
  import heroMattress from "@/public/heroImg.png"
import Image from "next/image";

const Hero = () => {

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
    
    {/* Promotion Content */}
    <div className="relative z-10  mx-auto  py-20 px-14">
      <div className="max-w-lg">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-bold  mb-2 leading-tight text-white">
          <span className="text-primary">Sog'lom uyqu</span> - hayot
        </h1>
        
        {/* Subtitle */}
        <p className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-white">
          sifatingizning kafolati
        </p>
        
        {/* Description */}
        <p className="text-lg text-foreground mb-8 leading-relaxed text-white">
          Eng so'nggi innovatsion texnologiyalardan foydalangan holda yaratilgan matraslarimiz tanangizga ideal moslashadi.
        </p>
        
        {/* CTA Button */}
        {/* <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-card mb-8">
          Ko'rish
        </Button> */}
      </div>
    </div>
    
    {/* Price Box - Right Side */}
    <div className="hidden md:block absolute top-[400px] right-16 transform -translate-y-1/2 z-20 px-14">
      <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-xl w-[450px] border border-white/20">
        {/* Product Name */}
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
          COMFORT+ Matras
        </h3>
        
        {/* Slogan */}
        <p className="text-sm text-foreground mb-4">
          Yuksak sifatli uyqu uchun mukammal tanlov
        </p>
        
        {/* Prices */}
        <div className="space-y-2">
          <p className="text-lg text-foreground line-through">
            2,500,000 so'm
          </p>
          <p className="text-3xl font-bold text-yellow-500">
            1,750,000 so'm
          </p>
        </div>
      </div>
    </div>
    
    {/* Decorative Elements */}
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
  </section>
  )
};

export default Hero;