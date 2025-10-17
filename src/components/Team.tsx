import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin } from "lucide-react";

const team = [
  { 
    name: "Aditya Khabiya", 
    role: "President", 
    linkedin: "https://www.linkedin.com/in/aditya-khabiya" 
  },
  { 
    name: "Vishwaraj Sharma", 
    role: "Secretary", 
    linkedin: "https://www.linkedin.com/in/vishwaraj-sharma" 
  },
  { 
    name: "Shaurya Jain", 
    role: "VP, Research", 
    linkedin: "https://www.linkedin.com/in/shaurya-jain" 
  },
  { 
    name: "Vansh Jain", 
    role: "VP, Quant", 
    linkedin: "https://www.linkedin.com/in/vansh-jain-9b01a32a6/" 
  },
  { 
    name: "Madhura Lolayekar", 
    role: "VP, Finance", 
    linkedin: "https://www.linkedin.com/in/madhura-lolayekar" 
  },
  { 
    name: "Riya More", 
    role: "VP, Strategy", 
    linkedin: "https://www.linkedin.com/in/riya-more" 
  },
  { 
    name: "Sandeep Menon", 
    role: "VP, Corporate Relations", 
    linkedin: "https://www.linkedin.com/in/sandeep-menon-304825296" 
  },
  { 
    name: "Vikrant Bhosle", 
    role: "Associate VP", 
    linkedin: "https://www.linkedin.com/in/vikrant-bhosle-440b0a223?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
  },
];

export const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 px-4 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient-gold"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group flex flex-col items-center"
            >
              <div className="relative mb-4 w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 group-hover:border-primary transition-all duration-300 gold-glow">
                <div className="w-full h-full bg-gradient-gold flex items-center justify-center text-4xl font-bold text-primary-foreground">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </div>
                
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform"
                  >
                    <Linkedin className="w-6 h-6 text-primary-foreground" />
                  </a>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground text-center group-hover:text-gradient-gold transition-all">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground text-center">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};