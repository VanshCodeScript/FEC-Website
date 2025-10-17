import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Reports } from "@/components/Reports";
import { Events } from "@/components/Events";
import { Partners } from "@/components/Partners";
import { Team } from "@/components/Team";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Reports />
      <Events />
      <Partners />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
