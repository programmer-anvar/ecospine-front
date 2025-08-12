import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
  badges?: string[];
  id?: number;
}

const ProductCard = ({ title, description, price, image, badges = [], id }: ProductCardProps) => {
  return (
    <div className="bg-[#1E243D] rounded-xl transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-gray-800/50 hover:-translate-y-1 ">
      <Link href={`/products/product/${id || 1}`}>
        <div className="relative mb-4 overflow-hidden rounded-lg cursor-pointer">
          <img 
            src={image} 
            alt={title}
            className="w-full h-48 object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rounded-lg"
          />
          {badges.length > 0 && (
            <div className="absolute top-[-5px] left-[-5px] flex gap-1 p-4">
              {badges.map((badge, index) => (
                <span 
                  key={index}
                  className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="px-4 pb-4">
        <h3 className="text-xl font-bold text-white mb-5 h-10">{title}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-3 h-10">{description.slice(0, 70)}...</p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-price-primary">{price}</span>
        </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        <Button 
          variant="outline" 
          className="w-full border-red-400 bg-gary-700 text-price-primary transition-all duration-300 ease-in-out hover:bg-price-primary hover:text-white"
        >
          Buyurtma berish
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;