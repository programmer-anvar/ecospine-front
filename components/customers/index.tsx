import gipoallergikMattress from "@/public/hero-mattress.jpg";
import Image from "next/image";

const Customers = () => {
  const galleryImages = [
    gipoallergikMattress,
    gipoallergikMattress,
    gipoallergikMattress,
    gipoallergikMattress,
    gipoallergikMattress,
    gipoallergikMattress,
  ];
  return (
    <section className=" text-white py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-10 ">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Bizning mijozlarimiz</h2>
          <p className="text-sm text-white/70">
            EcoSpine matraslar haqida eng muhim savollar va javoblar
          </p>
        </div>

        {/* Grid Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-xl border border-white/5">
              <Image src={src} alt="" className="w-full h-48 object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Customers;
