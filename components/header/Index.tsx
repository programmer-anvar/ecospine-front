'use client'
import { Phone, MapPin, Sun, Moon, Menu, X, Mail, Instagram } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  return (
    <header className=" backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-4 py-3">
      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <span className="text-primary-foreground font-bold text-lg">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              EcoSpine
            </span>
            <span className="text-xs text-muted-foreground -mt-1">Premium Sleep Solutions</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group">
              <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-primary">+998 90 123-45-67</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group">
              <div className="p-1.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-200">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-primary">Chust Shaxri, Nam Vil.</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* <Button
              variant="outline"
              size="icon"
              className="rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
              // onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button> */}
            
            <div className="flex space-x-2">
              {[
                { icon: Phone, label: "Call", href: "tel:+998901234567" },
                { icon: Mail, label: "Email", href: "mailto:info@ecospine.uz" },
                { icon: Instagram, label: "Instagram", href: "#" }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="w-10 h-10 bg-gradient-to-br to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                  title={item.label}
                >
                  <item.icon className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tablet Header */}
      <div className="hidden md:flex lg:hidden items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-base">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              EcoSpine
            </span>
            <span className="text-xs text-muted-foreground -mt-1">Premium Sleep</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 text-primary" />
            <span className="font-medium">+998 90 123-45-67</span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between">
        <div className="flex items-center space-x-3 group cursor-pointer transition-all duration-300 hover:scale-105">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-bold text-sm">E</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              EcoSpine
            </span>
            <span className="text-xs text-muted-foreground -mt-1">Premium</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="mt-4 pb-4 border-t border-border/50 pt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-200">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">+998 90 123-45-67</span>
                <span className="text-xs text-muted-foreground">Call us now</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-200">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Chust Shaxri, Nam Vil.</span>
                <span className="text-xs text-muted-foreground">Visit our store</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-3 pt-2">
            {[
              { icon: Phone, label: "Call", href: "tel:+998901234567" },
              { icon: Mail, label: "Email", href: "mailto:info@ecospine.uz" },
              { icon: Instagram, label: "Instagram", href: "#" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                title={item.label}
              >
                <item.icon className="w-5 h-5 text-primary group-hover:text-primary/80 transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </header>
  )
};

export default Header;