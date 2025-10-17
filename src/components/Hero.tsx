import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const scrollToReports = () => {
    document.getElementById("reports")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/1920x1080_v3.webm" type="video/webm" />
          {/* Fallback in case video doesn't load */}
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 w-full">
        <div className="max-w-2xl">
          {/* Left Aligned Logo, Name and Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-8"
            >
              <img
                src="fec.jpeg"
                alt="FEC Logo"
                className="w-32 h-32 mb-6 animate-glow-pulse"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-gradient-gold"
            >
              Finance and Economics Club
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl mb-4 text-white/90 font-medium"
            >
              Sardar Patel Institute of Technology, Mumbai
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-lg md:text-xl mb-12 text-white/80 italic"
            >
              Building expertise in financial strategies that drive corporate success
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <Button
                onClick={scrollToReports}
                variant="hero"
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-yellow-400/50"
              >
                Explore Our Work
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 animate-bounce text-yellow-400 drop-shadow-2xl" />
        </motion.div>
      </div>
    </section>
  );
};