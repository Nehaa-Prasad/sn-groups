"use client";

import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform,
  useMotionValue,
  useSpring
} from "framer-motion";
import { useEffect, useState, useRef, type ReactNode, type ElementType } from "react";
import Image from "next/image";
import { 
  Menu, X, Sun, Moon, 
  Truck, HardHat, Settings, Factory, 
  Target, Eye, Award, ArrowUpRight,
  Mail, Phone, Users
} from "lucide-react";

/* --- HELPER COMPONENTS --- */

// Magnetic effect for links and buttons
function Magnetic({ children, className = "" }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative z-10 hover:z-20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 3D Tilt effect for cards
function TiltCard({ children, className, onClick }: { children: ReactNode, className?: string, onClick?: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
      onClick={onClick}
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
}

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
  details: string;
  icon: ElementType;
  span?: string;
};

/* DATA */
const SERVICES: Service[] = [
  { 
    id: "rentals", 
    title: "Rentals", 
    description: "Reliable and cost-effective rental solutions tailored for industrial and commercial operations.",
    details: "We provide comprehensive drone and equipment rental solutions tailored to industrial, surveying, and commercial operations. Our fleet includes high-end specialized drones and industrial machinery, supported by technical experts to ensure maximum productivity and safety on-site.",
    icon: Truck,
    span: "md:col-span-2 md:row-span-1"
  },
  { 
    id: "sales", 
    title: "Sales", 
    description: "High-quality products developed for exceptional durability and long-term performance.",
    details: "We offer a curated selection of high-performance drones and industrial products designed for durability and precision. Every product is backed by our quality guarantee and comprehensive after-sales support, ensuring your investment delivers long-term value.",
    icon: HardHat,
    span: "md:col-span-1 md:row-span-1"
  },
  { 
    id: "service", 
    title: "Service & HR", 
    description: "Drone intelligence, technical maintenance, and professional workforce solutions.",
    details: "Our service division provides multi-faceted industrial solutions. Through Skysnap Studio, we deliver professional drone surveying and inspections across India. Additionally, we provide expert Human Resource and manpower management, ensuring companies have the right skilled talent to meet their operational goals.",
    icon: Settings,
    span: "md:col-span-1 md:row-span-2"
  },
  { 
    id: "logistics", 
    title: "Logistics", 
    description: "Seamless movement of goods ensuring coordination and efficiency across the supply chain.",
    details: "Our logistics management services ensure the seamless movement of goods across complex supply chains. We leverage advanced tracking and coordination technologies to minimize delays and optimize the flow of industrial materials and products.",
    icon: Factory,
    span: "md:col-span-2 md:row-span-1"
  }
];

const FOUNDERS = [
  {
    name: "Sharan S",
    role: "Founder",
    description: "Brings technical precision and strategic direction, driving operational excellence and industrial innovation.",
    image: "/logo.png"
  },
  {
    name: "Nehaa S Prasad",
    role: "Co-Founder",
    description: "Focuses on strategy, business execution, and technology, ensuring scalability and forward-looking growth.",
    image: "/logo.png"
  }
];

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const { scrollYProgress } = useScroll();
  const dashOffset = useTransform(scrollYProgress, [0, 1], [276.46, 0]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  useEffect(() => {
    // Force dark mode by default
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      setIsDarkMode(true);
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
        <Magnetic>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <Image src="/logo.png" alt="SN Groups" width={40} height={40} className="object-contain" />
            <span className="font-bold text-xl tracking-tight text-gradient">SN Groups</span>
          </div>
        </Magnetic>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["About", "Services", "Vision", "Founders"].map((item) => (
            <Magnetic key={item}>
              <a href={`#${item === "Vision" || item === "Mission" ? "vision" : item.toLowerCase()}`} className="hover:text-primary transition-colors py-2 px-1">
                {item}
              </a>
            </Magnetic>
          ))}
          <Magnetic>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </Magnetic>
          <Magnetic>
            <a href="mailto:sngroups.in@gmail.com" className="btn-premium">
              Contact Us
            </a>
          </Magnetic>
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
            className="fixed inset-0 z-[60] glass pt-32 px-10 flex flex-col gap-6 md:hidden"
          >
            {["About", "Services", "Vision", "Mission", "Founders"].map((item) => (
              <a 
                key={item} 
                href={`#${item === "Vision" || item === "Mission" ? "vision" : item.toLowerCase()}`} 
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
      <section className="section min-h-screen relative flex items-center justify-center overflow-hidden pt-20 px-6">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image 
              src="/hero.png" 
              alt="Engineering" 
              fill
              className="object-cover opacity-40 dark:opacity-20"
              priority
            />
          </motion.div>
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

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
              >
                Engineering <span className="text-gradient">Precision</span>,
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                Delivering <span className="text-primary">Growth</span> in Bangalore.
              </motion.span>
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto opacity-90">
              SN Groups provides premier drone services, industrial equipment rentals, and expert manpower solutions across India.
            </p>
            <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
              <Magnetic>
                <a href="#services" className="btn-premium px-10 py-4 w-full md:w-auto text-center block rounded-xl font-bold">
                  Our Services
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#about" className="px-10 py-4 rounded-xl border border-card-border hover:border-primary transition-all font-bold glass w-full md:w-auto text-center block">
                  Learn More
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

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
      <Section id="about" title="ABOUT SN GROUPS" subtitle="Leading Industrial Solutions in Bangalore, India">
        <div className="grid md:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6">
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
      <Section id="services" title="Our Industrial & Drone Services" subtitle="Specialized Solutions for Growth in India" className="bg-black/5 dark:bg-white/[0.02]">
        <p className="text-text-muted text-lg max-w-3xl mx-auto mb-8">
          Providing high-performance industrial equipment and aerial intelligence solutions through our specialized divisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto px-4">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <TiltCard key={service.id} onClick={() => setActiveService(service)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative p-8 rounded-[32px] glass overflow-hidden border border-white/5 hover:border-primary/30 transition-all cursor-pointer text-left h-full"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[80px] -mr-6 -mt-6 transition-all group-hover:bg-primary/20 group-hover:scale-110" />
                  
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                    <Icon className="text-primary" size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-base text-text-muted leading-relaxed mb-6 opacity-80">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-xs group-hover:gap-3 transition-all">
                    Details <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        {/* SERVICE MODAL */}
        <AnimatePresence>
          {activeService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
              onClick={() => setActiveService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="glass max-w-2xl w-full p-10 rounded-[40px] relative overflow-hidden border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-colors"
                  onClick={() => setActiveService(null)}
                >
                  <X size={24} />
                </button>
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8">
                  <activeService.icon className="text-primary" size={40} />
                </div>
                <h3 className="text-4xl font-bold mb-6">{activeService.title}</h3>
                <p className="text-xl text-text-muted leading-relaxed mb-10">
                  {activeService.details}
                </p>
                <button onClick={() => setActiveService(null)} className="btn-premium w-full py-5 text-lg">
                  Close Details
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* VISION & MISSION SECTION */}
      <Section id="vision" title="Vision & Mission" subtitle="Our Purpose & Goals">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left pt-12">
          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            className="p-12 rounded-[40px] glass relative overflow-hidden border border-white/5"
          >
             <div className="absolute top-0 right-0 p-10 opacity-5">
               <Eye size={160} />
             </div>
             <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8">
                <Target className="text-primary" size={32} />
             </div>
             <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
             <p className="text-xl text-text-muted leading-relaxed">
               To become a trusted and leading enterprise across logistics, construction, and manufacturing by delivering innovative, reliable, and high-quality solutions that consistently meet and exceed industry expectations.
             </p>
          </motion.div>

          <motion.div 
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            className="p-12 rounded-[40px] glass relative overflow-hidden border border-white/5"
          >
             <div className="absolute top-0 right-0 p-10 opacity-5">
               <Award size={160} />
             </div>
             <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8">
                <Target className="text-primary" size={32} />
             </div>
             <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
             <ul className="space-y-6 text-xl text-text-muted">
                {[
                  "Deliver high-quality services with precision",
                  "Build strong, long-term relationships",
                  "Leverage technology for efficiency",
                  "Ensure timely and dependable execution"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
             </ul>
          </motion.div>
        </div>
      </Section>

      {/* FOUNDERS SECTION */}
      <Section id="founders" title="Founders" subtitle="The Minds Behind the Vision" className="bg-black/5 dark:bg-white/[0.02]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {FOUNDERS.map((founder) => (
            <motion.div
              key={founder.name}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[40px] glass text-left border border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row gap-10 items-center"
            >
              <div className="w-40 h-40 rounded-3xl bg-primary/5 flex-shrink-0 flex items-center justify-center overflow-hidden border border-primary/20 p-6">
                <Image src={founder.image} alt={founder.name} width={160} height={160} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2">{founder.name}</h3>
                <span className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-6 block">
                  {founder.role}
                </span>
                <p className="text-xl text-text-muted leading-relaxed">
                  {founder.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black/10 dark:bg-black/40 border-t border-card-border py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="md:col-span-2 text-left">
            <div className="flex items-center gap-3 mb-8">
              <Image src="/logo.png" alt="SN Groups" width={48} height={48} className="object-contain" />
              <span className="font-bold text-2xl text-gradient">SN Groups</span>
            </div>
            <p className="text-xl text-text-muted max-w-sm mb-10 leading-relaxed">
              Enabling growth across logistics, construction, and manufacturing through precise, reliable, and innovative engineering.
            </p>
            <div className="flex flex-col gap-4 text-lg">
              <a href="mailto:sngroups.in@gmail.com" className="flex items-center gap-4 text-text-muted hover:text-primary transition-colors">
                <Mail size={22} /> sngroups.in@gmail.com
              </a>
              <a href="tel:9538136989" className="flex items-center gap-4 text-text-muted hover:text-primary transition-colors">
                <Phone size={22} /> 9538136989 | 9731720789
              </a>
            </div>
          </div>
          
          <div className="text-left">
            <h4 className="font-bold text-xl mb-8">Quick Links</h4>
            <ul className="space-y-5 text-lg text-text-muted">
              {["About", "Services", "Vision", "Mission", "Founders"].map(link => (
                <li key={link}>
                  <a href={`#${link === "Vision" || link === "Mission" ? "vision" : link.toLowerCase()}`} className="hover:text-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-bold text-xl mb-8">Industrial Solutions</h4>
            <ul className="space-y-5 text-lg text-text-muted">
              <li>Equipment Rentals</li>
              <li>Product Sales</li>
              <li>Technical Service</li>
              <li>Logistics Management</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-6 text-base text-text-muted">
          <p>© 2026 SN Groups. All rights reserved.</p>
          <div className="flex gap-12">
            <a href="/privacy" className="hover:text-primary transition-colors font-medium">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors font-medium">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION LOGO WITH CIRCULAR PROGRESS */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={0.1}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="relative w-20 h-20 flex items-center justify-center cursor-pointer group"
        >
          {/* Progress Circle SVG */}
          <svg className="progress-circle absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="4"
              style={{
                strokeDasharray: 276.46,
                strokeDashoffset: dashOffset,
                strokeLinecap: "round"
              }}
            />
          </svg>
          
          {/* Logo container */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 0px rgba(201, 164, 76, 0)", "0 0 20px rgba(201, 164, 76, 0.4)", "0 0 0px rgba(201, 164, 76, 0)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 rounded-full glass flex items-center justify-center shadow-2xl p-3 border border-white/10 group-hover:border-primary/50 transition-all"
          >
            <Image src="/logo.png" alt="Top" width={44} height={44} className="object-contain" />
          </motion.div>
        </motion.div>
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
      className={`section min-h-screen py-16 px-6 md:px-24 flex flex-col justify-center items-center text-center relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="bg-glow" />
      
      <div className="relative z-10 max-w-7xl w-full">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
        >
          {subtitle}
        </motion.span>
        
        <h2 className="text-4xl md:text-6xl font-bold mb-10 tracking-tight leading-tight">
          {title}
        </h2>

        <div className="w-full">
          {children}
        </div>
      </div>
    </motion.section>
  );
}