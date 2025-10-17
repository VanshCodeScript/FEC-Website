import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("hero");

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
    setActiveItem(id);
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Reports", id: "reports" },
    { label: "Events", id: "events" },
    { label: "Partners", id: "partners" },
    { label: "Team", id: "team" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-yellow-400/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <img 
                src="/fec.jpeg" 
                alt="FEC Logo" 
                className="w-10 h-10 rounded-lg border-2 border-yellow-400/30 transition-all duration-300 group-hover:border-yellow-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-yellow-500/20"
              />
              {/* Gold glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-yellow-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent tracking-tight">
                FEC
              </span>
              <span className="text-xs text-foreground/60 font-medium tracking-wide">
                Finance & Economics Club
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-yellow-400"
                    : "text-foreground/70 hover:text-yellow-300"
                }`}
              >
                {item.label}
                
                {/* Hover underline animation */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 transform origin-left transition-transform duration-300 ${
                  activeItem === item.id ? "scale-x-100" : "scale-x-0"
                }`} />
                
                {/* Hover background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg transition-all duration-300 ${
                  activeItem === item.id ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`} />
                
                {/* Gold glow on active */}
                {activeItem === item.id && (
                  <div className="absolute inset-0 rounded-lg bg-yellow-400/20 blur-md opacity-50 -z-10" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Icons with transition */}
            <div className="relative transition-transform duration-300 group-hover:scale-110">
              {isOpen ? (
                <X className="w-5 h-5 text-yellow-400" />
              ) : (
                <Menu className="w-5 h-5 text-foreground/70 group-hover:text-yellow-400 transition-colors" />
              )}
            </div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-2 border-t border-yellow-400/20 bg-background/95 backdrop-blur-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  activeItem === item.id
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-foreground/70 hover:text-yellow-300 hover:bg-yellow-400/5"
                }`}
              >
                {item.label}
                
                {/* Active indicator */}
                {activeItem === item.id && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-r-full" />
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-yellow-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};