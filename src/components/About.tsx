import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Building2, FileText, ThumbsUp } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Change cursor when hovering over about section
    if (isHovered) {
      document.body.style.cursor = 'none';
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.body.style.cursor = 'default';
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered]);

  const [counters, setCounters] = useState({
    companies: 0,
    reports: 0,
    satisfaction: 0
  });

  useEffect(() => {
    if (isInView) {
      // Animate counters
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      const animateCounter = (start: number, end: number, setter: (value: number) => void) => {
        let current = start;
        const increment = (end - start) / steps;
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            current = end;
            clearInterval(timer);
          }
          setter(Math.floor(current));
        }, stepDuration);
      };

      animateCounter(0, 20, (value) => setCounters(prev => ({ ...prev, companies: value })));
      animateCounter(0, 50, (value) => setCounters(prev => ({ ...prev, reports: value })));
      animateCounter(0, 80, (value) => setCounters(prev => ({ ...prev, satisfaction: value })));
    }
  }, [isInView]);

  const stats = [
    { 
      icon: Building2, 
      value: `${counters.companies}+`, 
      label: "Companies Worked With",
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-yellow-500/20 to-amber-500/20",
      borderColor: "border-yellow-500/40"
    },
    { 
      icon: FileText, 
      value: `${counters.reports}+`, 
      label: "Reports Curated",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/40"
    },
    { 
      icon: ThumbsUp, 
      value: `${counters.satisfaction}%`, 
      label: "Client Acknowledgement Rate",
      color: "from-yellow-400 to-yellow-600",
      bgColor: "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20",
      borderColor: "border-yellow-400/40"
    }
  ];

  return (
    <section 
      id="about" 
      className="py-24 px-4 bg-black relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Custom Coin Cursor */}
      {isHovered && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorPosition.x - 25,
            top: cursorPosition.y - 25,
          }}
          animate={{
            rotate: [0, 5, -5, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <img
            src="/image copy.png" // Make sure your coin image is in public/coin.png
            alt="Coin cursor"
            className="w-12 h-12 drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))'
            }}
          />
          {/* Glow effect */}
          <div className="absolute inset-0 w-12 h-12 bg-yellow-400/30 rounded-full blur-md animate-pulse" />
        </motion.div>
      )}

      {/* Golden Wave Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Golden Waves */}
        <motion.div
          className="absolute top-0 left-0 w-full h-32"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: "linear-gradient(180deg, rgba(255,215,0,0.1) 0%, transparent 100%)"
          }}
        />
        
        <motion.div
          className="absolute bottom-0 left-0 w-full h-32"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          style={{
            background: "linear-gradient(0deg, rgba(255,215,0,0.1) 0%, transparent 100%)"
          }}
        />

        {/* Floating Golden Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 0],
              x: [null, Math.sin(i) * 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold"
          >
            About the Club
          </motion.h2>

          {/* Horizontal Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto max-w-2xl rounded-full"
          />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl leading-relaxed text-white/90 p-6 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              The <span className="text-yellow-400 font-semibold">Finance and Economics Club (FEC)</span> at 
              Sardar Patel Institute of Technology, Mumbai, is a distinguished forum for developing 
              expertise in financial strategies that drive corporate success.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg md:text-xl leading-relaxed text-white/90 p-6 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              We are committed to building a community where members engage in rigorous financial 
              analysis, advanced business analytics, and the production of industry-relevant content, 
              equipping them with the skills necessary to excel in the financial sector.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-lg md:text-xl leading-relaxed text-white/90 p-6 rounded-xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              Our members gain real-world insights through industry projects and connect with fellow 
              finance enthusiasts. Join us to sharpen your financial skills and be part of a community 
              dedicated to financial excellence.
            </motion.p>
          </motion.div>

          {/* Right Side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                className={`group relative p-6 rounded-2xl ${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} hover:border-yellow-400/60 transition-all duration-500 overflow-hidden`}
              >
                {/* Animated Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative z-10 flex items-center space-x-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/20`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <motion.div 
                      className="text-3xl font-bold text-white mb-1"
                      key={stat.value}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  </div>
                </div>

                {/* Progress Bar for Satisfaction Rate */}
                {stat.label.includes("Acknowledgement") && (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${counters.satisfaction}%` } : { width: 0 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full mt-4"
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Horizontal Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 h-1 bg-gradient-to-r from-yellow-400/50 via-yellow-400 to-yellow-400/50 rounded-full max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
};