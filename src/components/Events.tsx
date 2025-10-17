import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ArrowDown } from "lucide-react";

const events = [
  {
    title: "Aurora '25 - Case Study Competition",
    date: "February 26th, 2025",
    time: "All Day",
    location: "SPIT Campus",
    description: "Join Aurora '25 for two exciting case studies: AI in Finance by ZeTheta Algorithms (₹70,000+ prize pool) and Build Your Own Fund (₹30,000+ prize pool). Compete for prizes and internship opportunities in this transformative experience.",
    image: "/events/image copy.png"
  },
  {
    title: "Fintech Conclave & Monthly Gatherings",
    date: "Monthly Events",
    time: "Various Times",
    location: "Various Finance Meetups",
    description: "Regular fintech conclaves and FEC gatherings featuring industry experts, networking sessions, and discussions on emerging trends in finance and technology. Stay updated with the latest in digital banking, blockchain, and financial innovation.",
    image: "/events/image.png"
  },
  {
    title: "Financial Analysis",
    date: "Every Month",
    time: "No time is specified for Learning 😌",
    location: "Virtual/Physical",
    description: "Competitive trading simulation and financial analysis to test your market analysis and decision-making skills for FEC-Club Members",
    image: "/events/stock-simulation.png"
  },
];

const TunnelAnimation = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const tunnelScale = useTransform(scrollYProgress, [0, 1], [0.5, 3]);
  const tunnelOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const tunnelRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Tunnel Background */}
      <motion.div 
        className="absolute inset-0 bg-black"
        style={{ opacity: tunnelOpacity }}
      />
      
      {/* Tunnel Rings */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-yellow-400/20 rounded-full"
          style={{
            scale: tunnelScale,
            rotate: tunnelRotation,
            opacity: useTransform(scrollYProgress, [0, 1], [0.1, 0.8 - i * 0.04]),
            borderWidth: `${2 + i * 2}px`,
          }}
        />
      ))}

      {/* Tunnel Particles */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            scale: useTransform(scrollYProgress, [0, 1], [1, 5]),
            opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0]),
          }}
        />
      ))}

      {/* Central Light Beam */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full"
        style={{
          scale: useTransform(scrollYProgress, [0, 1], [1, 100]),
          opacity: useTransform(scrollYProgress, [0, 1], [0.8, 0]),
          boxShadow: "0 0 100px 50px rgba(255, 215, 0, 0.3)",
        }}
      />
    </div>
  );
};

export const Events = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const [activeEvent, setActiveEvent] = useState(0);

  // Update active event based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const eventIndex = Math.floor(latest * events.length);
      setActiveEvent(Math.min(eventIndex, events.length - 1));
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const eventProgress = useTransform(
    scrollYProgress,
    [activeEvent / events.length, (activeEvent + 1) / events.length],
    [0, 1]
  );

  const handleRegisterClick = () => {
    window.open("https://unstop.com/hackathons/fec-spit-hackathon-sardar-patel-institute-of-technology-1574909", "_blank", "noopener,noreferrer");
  };

  return (
    <section id="events" ref={sectionRef} className="relative bg-black min-h-screen">
      {/* Regular Header (Outside Tunnel) */}
      <div className="relative z-20 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient-gold"
        >
          Events & Activities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-center text-white/70 max-w-2xl mx-auto px-4"
        >
          Journey through our financial events in an immersive tunnel experience
        </motion.p>
      </div>

      {/* Tunnel Container - Isolated from other sections */}
      <div ref={containerRef} className="relative min-h-[400vh] z-10">
        <TunnelAnimation scrollYProgress={scrollYProgress} />
        
        {/* Event Checkpoints */}
        {events.map((event, index) => {
          const checkpointProgress = useTransform(
            scrollYProgress,
            [
              (index - 0.5) / events.length,
              index / events.length,
              (index + 0.5) / events.length
            ],
            [0, 1, 0]
          );

          const scale = useTransform(checkpointProgress, [0, 1], [0.8, 1]);
          const opacity = useTransform(checkpointProgress, [0, 1], [0, 1]);
          const y = useTransform(checkpointProgress, [0, 1], [100, 0]);

          return (
            <div
              key={index}
              className="h-screen flex items-center justify-center sticky top-0"
              style={{ zIndex: 10 + index }}
            >
              <motion.div
                style={{ scale, opacity, y }}
                className="max-w-4xl mx-auto px-4 w-full"
              >
                <div className="bg-black/80 backdrop-blur-xl rounded-3xl border border-yellow-400/30 overflow-hidden shadow-2xl shadow-yellow-500/20">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Event Image - FIXED: Now using actual image */}
                    <div className="relative h-80 lg:h-full overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Progress Indicator */}
                      <motion.div
                        style={{ scaleX: index === activeEvent ? eventProgress : 0 }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-500 origin-left"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="p-8 lg:p-12">
                      <motion.div
                        style={{ opacity: checkpointProgress }}
                        className="h-full flex flex-col"
                      >
                        {/* Event Number */}
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/50 to-transparent" />
                        </div>

                        <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                          {event.title}
                        </h3>
                        
                        <div className="space-y-4 mb-8">
                          <div className="flex items-center gap-4 text-white/80">
                            <Calendar className="w-5 h-5 text-yellow-400" />
                            <span className="text-lg">{event.date}</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/80">
                            <Clock className="w-5 h-5 text-yellow-400" />
                            <span className="text-lg">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-4 text-white/80">
                            <MapPin className="w-5 h-5 text-yellow-400" />
                            <span className="text-lg">{event.location}</span>
                          </div>
                        </div>

                        <p className="text-white/70 text-lg leading-relaxed mb-8 flex-1">
                          {event.description}
                        </p>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 border border-yellow-400/20 cursor-not-allowed opacity-70"
                          disabled
                        >
                          Register for Event
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}

        {/* Exit Tunnel Section - FIXED: Higher z-index and proper positioning */}
        <div className="h-screen flex items-center justify-center sticky top-0" style={{ zIndex: 100 }}>
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.9, 1], [0, 1])
            }}
            className="text-center text-white max-w-2xl mx-auto px-4 relative z-50"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient-gold">
              Journey Continues 
            </h2>
            <p className="text-xl text-white/70 mb-8">
              You've explored all our events. Ready to join the financial revolution?
              Register for the FEC hackathon !
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 border border-yellow-400/20 text-lg cursor-pointer relative z-50"
              onClick={handleRegisterClick}
            >
              Register
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Spacer to ensure next section starts properly */}
      <div className="h-20 bg-black" />
    </section>
  );
};