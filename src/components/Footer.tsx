import { Linkedin, Instagram, Mail } from "lucide-react";
import fecLogo from "@/assets/fec-logo.png";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/20 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="fec.jpeg" alt="FEC Logo" className="w-12 h-12" />
            <div>
              <h3 className="font-bold text-foreground">Finance and Economics Club</h3>
              <p className="text-sm text-muted-foreground">SPIT Mumbai</p>
            </div>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/company/fec-spit/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary flex items-center justify-center transition-all duration-300 hover:gold-glow"
            >
              <Linkedin className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/fec_spit/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary flex items-center justify-center transition-all duration-300 hover:gold-glow"
            >
              <Instagram className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            </a>
            <a
              href="mailto:fec@spit.ac.in"
              className="w-10 h-10 rounded-full bg-card border border-primary/30 hover:border-primary flex items-center justify-center transition-all duration-300 hover:gold-glow"
            >
              <Mail className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/10 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Finance and Economics Club, SPIT | All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};