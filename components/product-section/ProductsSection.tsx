
import gipoallergikMattress from "@/public/carImg.png";
import ProductCard from "../ProductCard";

const ProductsSection = () => {
  const products = [
    {
      title: "GipoAllergik matras",
      description: "Ice Touch, Yatrali uchun maxsus sovutuvchi mato sakini uyqu muhiti yaratib, uvale qadaldi yaratish yordamida yaratdan foyda oladi.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Eco", "Baxorgi"]
    },
    {
      title: "GipoAllergik matras",
      description: "Ice Touch, Yatrali uchun maxsus sovutuvchi mato sakini uyqu muhiti yaratib, uvale qadaldi yaratish yordamida yaratdan foyda oladi.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Eco", "Baxorgi"]
    },
    {
      title: "GipoAllergik matras",
      description: "Ice Touch, Yatrali uchun maxsus sovutuvchi mato sakini uyqu muhiti yaratib, uvale qadaldi yaratish yordamida yaratdan foyda oladi.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Eco", "Baxorgi"]
    },
    {
      title: "GipoAllergik matras",
      description: "Ice Touch, Yatrali uchun maxsus sovutuvchi mato sakini uyqu muhiti yaratib, uvale qadaldi yaratish yordamida yaratdan foyda oladi.",
      price: "2 900 000 so'm",
      image: gipoallergikMattress,
      badges: ["Eco", "Baxorgi"]
    }
  ];

  return (
    <section className="py-16 ">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8">
        Barcha uchun sevimli
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} image={product.image.src} />
        ))}
      </div>
    </div>
  </section>
  );
};

export default ProductsSection;