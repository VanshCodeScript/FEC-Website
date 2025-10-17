import { motion } from "framer-motion";
import { useState } from "react";

const partners = [
  {
    name: "Kennis",
    tagline: "Growth - Limitless",
    founder: "Saurabh Agarwal",
    position: "Director, Kennis",
    logo: "/partners/kennis-logo.png",
    founderImage: "/partners/saurabh.png"
  },
  {
    name: "JM Financial",
    tagline: "",
    founder: "Anuj Kapoor",
    position: "MD & CEO, JM Financial",
    logo: "/partners/jm-financial-logo.png",
    founderImage: "/partners/anuj.png"
  },
  {
    name: "Infynit UK",
    tagline: "",
    founder: "Dr. Ritesh Jain",
    position: "Founder, Infynit UK",
    logo: "/partners/infynit-logo.png",
    founderImage: "/partners/ritesh.png"
  },
  {
    name: "Optimix Advisors",
    tagline: "",
    founder: "Amkit Bhageria",
    position: "Managing Partner, Optimix Advisors",
    logo: "/partners/optimix-logo.png",
    founderImage: "/partners/ankit.png"
  },
  {
    name: "Strivepoint Capital",
    tagline: "",
    founder: "Sambodhi Sarkar",
    position: "Founder & Investment Manager, Strivepoint Capital",
    logo: "/partners/stirvepoiint-logo.png",
    founderImage: "/partners/sambodhi.png"
  },
  {
    name: "Knuti Investment Services",
    tagline: "",
    founder: "Yashovardhan Shah",
    position: "Director Knuti Investment Services Pvt Ltd. Angel Investor",
    logo: "/partners/knuti-logo.png",
    founderImage: "/partners/yashohardhan.png"
  },
  {
    name: "Cityflo",
    tagline: "",
    founder: "",
    position: "",
    logo: "/partners/cityflo-logo.png",
    founderImage: ""
  }
];

export const Partners = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section id="partners" className="py-24 px-4 bg-black overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-gold"
        >
          OUR PARTNERS & MENTORS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-white/70 mb-12 text-lg"
        >
          Click on cards to learn more about our partners
        </motion.p>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 gap-8 px-4 snap-x snap-mandatory scrollbar-hide">
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="flex-shrink-0 w-80 snap-center"
              >
                {/* Flip Card Container */}
                <div className="relative w-80 h-96 perspective-1000">
                  <motion.div
                    className="relative w-full h-full preserve-3d"
                    animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of Card */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#111] to-[#1a1a1a] backdrop-blur-xl rounded-3xl border-2 border-yellow-400/40 p-6 flex flex-col items-center justify-center cursor-pointer"
                      onClick={() => toggleFlip(index)}
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Logo */}
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-400/40 flex items-center justify-center p-3 mb-6">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      {/* Company Name */}
                      <h3 className="text-2xl font-bold text-white text-center mb-2">
                        {partner.name}
                      </h3>
                      
                      {partner.tagline && (
                        <p className="text-yellow-400 text-lg text-center mb-4 italic">
                          {partner.tagline}
                        </p>
                      )}
                      
                      {/* Click Instruction */}
                      <div className="mt-6 text-center">
                        <p className="text-white/60 text-sm">Click to learn more</p>
                        <div className="w-8 h-8 border-2 border-yellow-400 rounded-full flex items-center justify-center mx-auto mt-2">
                          <span className="text-yellow-400 text-lg">→</span>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div 
                      className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#111] to-[#1a1a1a] backdrop-blur-xl rounded-3xl border-2 border-yellow-400/40 p-6 flex flex-col cursor-pointer"
                      onClick={() => toggleFlip(index)}
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)" 
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border border-yellow-400/40 flex items-center justify-center p-2">
                          <img
                            src={partner.logo}
                            alt={partner.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white flex-1">
                          {partner.name}
                        </h3>
                      </div>

                      {/* Founder Details */}
                      {partner.founder ? (
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            {partner.founderImage && (
                              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400/40 flex-shrink-0">
                                <img
                                  src={partner.founderImage}
                                  alt={partner.founder}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-white font-semibold text-lg">
                                {partner.founder}
                              </p>
                              <p className="text-white/70 text-sm">
                                {partner.position}
                              </p>
                            </div>
                          </div>
                          
                          {/* Additional Info */}
                          <div className="bg-yellow-400/10 rounded-xl p-4 border border-yellow-400/20">
                            <p className="text-white/80 text-sm">
                              Strategic partnership focused on financial excellence and market leadership.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-white/70 text-lg italic mb-4">
                              Strategic Partner
                            </p>
                            <p className="text-white/60 text-sm">
                              Driving innovation in financial services
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Back Instruction */}
                      <div className="text-center mt-4">
                        <p className="text-white/60 text-xs">Click to flip back</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-2 text-yellow-400">
              <span className="text-sm">← Scroll horizontally →</span>
            </div>
          </div>
        </div>

        {/* Additional Partner Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 relative"
        >
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            className="flex gap-8"
          >
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-20 rounded-lg bg-yellow-400/5 border border-yellow-400/20 flex items-center justify-center p-4 group hover:border-yellow-400/50 transition-all duration-300"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};