"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode, type ElementType } from "react";
import Image from "next/image";
import { 
  Menu, X, Sun, Moon, 
  Truck, HardHat, Settings, Factory, 
  Target, Eye, Award, ArrowUpRight,
  Mail, Phone
} from "lucide-react";

/* TYPES */
type Particle = {
  left: number;
  duration: number;
  size: number;
};

type Service = {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  span?: string;
};

/* DATA */
const SERVICES: Service[] = [
  { 
    id: "rentals", 
    title: "Rentals", 
    description: "Reliable and cost-effective rental solutions tailored for industrial and commercial operations.",
    icon: Truck,
    span: "md:col-span-2 md:row-span-1"
  },
  { 
    id: "sales", 
    title: "Sales", 
    description: "High-quality products developed for exceptional durability and long-term performance.",
    icon: HardHat,
    span: "md:col-span-1 md:row-span-1"
  },
  { 
    id: "service", 
    title: "Service", 
    description: "Comprehensive maintenance and optimization solutions for sustained operational excellence.",
    icon: Settings,
    span: "md:col-span-1 md:row-span-2"
  },
  { 
    id: "logistics", 
    title: "Logistics", 
    description: "Seamless movement of goods ensuring coordination and efficiency across the supply chain.",
    icon: Factory,
    span: "md:col-span-2 md:row-span-1"
  }
];

const FOUNDERS = [
  {
    name: "Sharan S",
    role: "Founder",
    description: "Brings technical precision and strategic direction, driving operational excellence and innovation.",
    image: "/logo.png"
  },
  {
    name: "Nehaa S Prasad",
    role: "Co-Founder",
    description: "Focuses on strategy and business execution, ensuring scalability and forward-looking growth.",
    image: "/logo.png"
  }
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    // Check system preference or saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      requestAnimationFrame(() => setIsDarkMode(true));
      document.documentElement.setAttribute("data-theme", "dark");
    }

    // Generate particles
    const generated = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      duration: 10 + Math.random() * 15,
      size: 2 + Math.random() * 4,
    }));
    requestAnimationFrame(() => setParticles(generated));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <main className="relative bg-background text-foreground transition-colors duration-500 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl glass rounded-2xl z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="SN Groups" width={40} height={40} className="object-contain" />
          <span className="font-bold text-xl tracking-tight text-gradient">SN Groups</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["About", "Services", "Vision", "Mission", "Founders"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-primary transition-colors">
              {item}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a href="mailto:sngroups.in@gmail.com" className="btn-premium">
            Contact Us
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass pt-32 px-10 flex flex-col gap-6 md:hidden"
          >
            {["About", "Services", "Vision", "Mission", "Founders"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl font-semibold"
              >
                {item}
              </a>
            ))}
            <div className="flex items-center justify-between mt-8">
               <button onClick={toggleTheme} className="p-3 rounded-full bg-primary/10">
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
              <a href="mailto:sngroups.in@gmail.com" className="btn-premium">
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="section min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero.png" 
            alt="Engineering" 
            fill
            className="object-cover opacity-40 dark:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        {/* PARTICLES */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
              Engineering <span className="text-gradient">Precision</span>,<br />
              Delivering <span className="text-primary">Growth</span>.
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto">
              Enabling excellence across logistics, construction, and manufacturing through innovative and reliable industrial solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="#services" className="btn-premium text-lg px-10 py-4">
                Our Services
              </a>
              <a href="#about" className="px-10 py-4 rounded-xl border border-card-border hover:border-primary transition-all font-semibold glass">
                Learn More
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
        >
          <div className="w-1 h-12 rounded-full bg-primary/30 flex items-start justify-center p-1">
            <div className="w-full h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" title="ABOUT US" subtitle="The Foundation of Excellence">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <p className="text-xl leading-relaxed text-text-muted">
              SN Groups is a dynamic and rapidly expanding enterprise offering end-to-end professional solutions across rentals, sales, service, and manufacturing.
            </p>
            <p className="text-lg text-text-muted opacity-80">
              Driven by a deep commitment to quality, precision, and performance, we integrate advanced practices with strategic execution to deliver exceptional results for our partners.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl glass">
                <span className="block text-3xl font-bold text-primary mb-1">100%</span>
                <span className="text-sm font-medium opacity-70">Quality Assurance</span>
              </div>
              <div className="p-4 rounded-2xl glass">
                <span className="block text-3xl font-bold text-primary mb-1">24/7</span>
                <span className="text-sm font-medium opacity-70">Support Ready</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
            <Image src="/logistics.png" alt="Logistics" width={600} height={400} className="relative z-10 rounded-3xl shadow-2xl border border-white/10 w-full h-auto" />
          </div>
        </div>
      </Section>

      {/* SERVICES SECTION */}
      <Section id="services" title="Our Services" subtitle="Specialized Industrial Solutions" className="bg-black/5 dark:bg-white/[0.02]">
        <p className="text-text-muted text-lg max-w-3xl mx-auto mb-12">
          Through our specialized drone division, **Skysnap Studio**, we provide professional drone rentals, sales, and surveying services across India, empowering construction, real estate, and media production with expert aerial insights.
        </p>
        <div className="bento-grid">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.02 }}
                className={`bento-item glass ${service.span}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* VISION & MISSION */}
      <section className="section py-24 px-6 md:px-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            className="p-10 rounded-[32px] glass relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Eye size={120} />
             </div>
             <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Target className="text-primary" />
             </div>
             <h2 id="vision" className="text-4xl font-bold mb-6">Our Vision</h2>
             <p className="text-lg text-text-muted leading-relaxed">
               To become a trusted and leading enterprise across logistics, construction, and manufacturing by delivering innovative, reliable, and high-quality solutions that consistently meet and exceed industry expectations.
             </p>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            className="p-10 rounded-[32px] glass relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Award size={120} />
             </div>
             <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <Target className="text-primary" />
             </div>
             <h2 id="mission" className="text-4xl font-bold mb-6">Our Mission</h2>
             <ul className="space-y-4 text-text-muted">
                {[
                  "Deliver high-quality services with precision",
                  "Build strong, long-term relationships",
                  "Leverage technology for efficiency",
                  "Ensure timely and dependable execution"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
             </ul>
          </motion.div>
        </div>
      </section>

      {/* FOUNDERS SECTION */}
      <Section id="founders" title="Founders" subtitle="The Minds Behind the Vision">
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {FOUNDERS.map((founder) => (
            <motion.div
              key={founder.name}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[32px] glass text-left border border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-32 h-32 rounded-2xl bg-primary/5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-primary/20">
                <Image src={founder.image} alt={founder.name} width={128} height={128} className="w-full h-full object-contain p-4" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
                  {founder.role}
                </span>
                <p className="text-text-muted leading-relaxed mb-6">
                  {founder.description}
                </p>
                <div className="flex gap-4">
                   <a href="#" className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:text-primary transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                   </a>
                   <a href="#" className="p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:text-primary transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                   </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black/5 dark:bg-white/[0.02] border-t border-card-border py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Image src="/logo.png" alt="SN Groups" width={32} height={32} className="object-contain" />
              <span className="font-bold text-xl text-gradient">SN Groups</span>
            </div>
            <p className="text-text-muted max-w-sm mb-8">
              Enabling growth across logistics, construction, and manufacturing through precise, reliable, and innovative engineering.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:sngroups.in@gmail.com" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
                <Mail size={18} /> sngroups.in@gmail.com
              </a>
              <a href="tel:9538136989" className="flex items-center gap-3 text-text-muted hover:text-primary transition-colors">
                <Phone size={18} /> 9538136989 | 9731720789
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-text-muted">
              {["About", "Services", "Vision", "Mission", "Founders"].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Industrial Solutions</h4>
            <ul className="space-y-4 text-text-muted">
              <li>Equipment Rentals</li>
              <li>Product Sales</li>
              <li>Technical Service</li>
              <li>Logistics Management</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>© 2026 SN Groups. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* THEME TOGGLE & BACK TO TOP */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 rounded-full glass flex items-center justify-center shadow-xl hover:text-primary transition-all"
        >
          <ArrowUpRight className="-rotate-45" />
        </motion.button>
      </div>
    </main>
  );
}

/* SECTION COMPONENT */
interface SectionProps {
  id: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}
function Section({ id, title, subtitle, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`section min-h-screen py-24 px-6 md:px-24 flex flex-col justify-center items-center text-center relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="bg-glow" />
      
      <div className="relative z-10 max-w-6xl w-full">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
        >
          {subtitle}
        </motion.span>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">
          {title}
        </h2>

        <div className="w-full">
          {children}
        </div>
      </div>
    </motion.section>
  );
}