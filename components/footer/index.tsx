import { Phone, Clock, MapPin } from "lucide-react"
import { CONTACT_INFO, SITE_CONFIG } from "@/constants";

export function Footer() {
  return (
    <footer className="bg-[#0D1122] text-white py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 bg-[#1A1F32] p-6 rounded-xl">
        {/* Left: Company Info */}
        <div className="space-y-3 col-span-1">
          <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <span className="text-primary-foreground font-bold text-lg">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {SITE_CONFIG.name}
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Premium Sleep Solutions</span>
            </div>
          </div>
          <p className="text-sm text-white/80">{SITE_CONFIG.description}</p>
        </div>

        {/* Products */}
        <div className="space-y-2">
          <h4 className="font-semibold">Mahsulotlar</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>Premium matraslar</li>
            <li>Comfort matraslar</li>
            <li>Klassik matraslar</li>
            <li>Bolalar matraslari</li>
          </ul>
        </div>

        {/* Services */}
        <div className="space-y-2">
          <h4 className="font-semibold">Xizmatlar</h4>
          <ul className="text-sm text-white/80 space-y-1">
            <li>Bepul konsultatsiya</li>
            <li>Uyga yetkazib berish</li>
            <li>30 kun sinab ko'rish</li>
            <li>Texnik yordam</li>
          </ul>
        </div>

        {/* Contact & Map */}
        <div className="space-y-4 flex items-center justify-center">
          <div className="space-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span>{CONTACT_INFO.workingHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{CONTACT_INFO.address}</span>
            </div>
          </div>
          {/* <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95924.96577431915!2d71.2281433!3d41.0095994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38bb8e671ba8ad11%3A0x61a984ba37b7d7c5!2sChust%2C%20Namangan%20Region%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1693660845678!5m2!1sen!2s"
  width="200"
  height="150"
//   style="border:0; border-radius: 12px"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
/> */}
        </div>
      </div>
    </footer>
  );
}
