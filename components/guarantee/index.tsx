// components/MattressFeatureSection.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Home, Gem, Car, Shield } from "lucide-react";

const features = [
  {
    icon: <Home className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "Ekologik toza mahsulot",
    description: "Sifatli xomashyolardan ishlab chiqarilgan",
  },
  {
    icon: <Gem className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "Sifat",
    description: "O'zbekistondagi va dunyoning eng yaxshi komponentlari",
  },
  {
    icon: <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "Har qanday qiyinchilik",
    description: "3 kun ichida har qanday o'lcham va shakl",
  },
  {
    icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "Kafolat",
    description: "Xizmat muddati 15 yildan 20 yilgacha",
  },
];

const Guarantee = () => {
  return (
    <section className="text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Side */}
          <div className="max-w-[500px] lg:w-1/2 space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
              Sizning ajoyib uyquyingiz <br className="hidden sm:block" /> uchun biz doimo
              xizmatdamiz
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-[#1C2235] to-[#101321] border border-[#333a4d] bg-gradient-to-l rounded-lg sm:rounded-xl hover:border-[#4a5568] transition-colors duration-200"
                >
                  <CardContent className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                    {/* Icon with gradient background */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                      {feature.icon}
                    </div>

                    {/* Text Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm text-white sm:text-base font-bold mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Side Image cons alert  */}
          <div className="w-full lg:w-1/2 max-w-[500px] lg:max-w-[600px]  max-h-[530px]">
            <img
              src="/garaentee.png"
              alt="Mattress Stack"
              className="rounded-lg sm:rounded-xl object-cover shadow-2xl h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee