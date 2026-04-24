"use client";

import { motion, useScroll, useTransform} from "framer-motion";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

/* TYPE FOR PARTICLES */
type Particle = {
  left: number;
  duration: number;
};

export default function Home() {

  /* PARTICLES STATE */
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated = [...Array(15)].map(() => ({
      left: Math.random() * 100,
      duration: 6 + Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  const [hovered, setHovered] = useState<string | null>(null);
  const [founderHovered, setFounderHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="w-full min-h-screen overflow-y-auto">

      {/* NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

        {/* LOGO */}
        <h1 className="text-[#C9A44C] font-bold text-lg">
          SN Groups
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 text-sm">
          <a href="#about" className="nav-link">About</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#vision" className="nav-link">Vision</a>
          <a href="#mission" className="nav-link">Mission</a>
          <a href="#leadership" className="nav-link">Founders</a>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/20"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex justify-center items-start pt-16">
            
            {/* MENU BOX */}
            <div
              className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg py-6 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <a href="#about" onClick={() => setMenuOpen(false)} className="nav-link">About</a>
              <a href="#services" onClick={() => setMenuOpen(false)} className="nav-link">Services</a>
              <a href="#vision" onClick={() => setMenuOpen(false)} className="nav-link">Vision</a>
              <a href="#mission" onClick={() => setMenuOpen(false)} className="nav-link">Mission</a>
              <a href="#leadership" onClick={() => setMenuOpen(false)} className="nav-link">Founders</a>
            </div>

          </div>
        </div>
      )}
    </nav>

      {/* HERO */}
      <section
        className="section min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden"
        onMouseMove={(e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 20;

          const el = document.getElementById("parallax");
          if (el) {
            el.style.transform = `translate(${x}px, ${y}px)`;
          }
        }}
      >
        {/* GLOW */}
        <div id="parallax" className="bg-glow parallax"></div>

        {/* PARTICLES */}
        {particles.map((p: Particle, i: number) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}

        {/* LOGO */}
        <motion.img
          src="/logo.png"
          className="w-32 md:w-44 lg:w-52 mb-6 z-10"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 2.5, opacity: 1 }}
          transition={{ duration: 2 }}
        />

        {/* TITLE */}
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#C9A44C] z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
         
        </motion.h1>

        {/* TAGLINE */}
        <p className="mt-11 text-lg text-gray-600 max-w-xl z-10">
          Enabling growth across logistics, construction, and manufacturing through precise, reliable, and innovative engineering.
        </p>

        {/* CONTACT */}
        <div className="mt-6 z-10">
          <a
            href="mailto:sngroups.in@gmail.com"
            className="text-[#C9A44C] font-semibold text-lg"
          >
            sngroups.in@gmail.com
          </a>
          <p className="text-sm mt-2">9538136989 | 9731720789</p>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="ABOUT US">
        SN Groups is a dynamic and rapidly expanding enterprise offering end-to-end professional solutions across rentals, sales, service, and manufacturing. Driven by a deep commitment to quality, precision, and performance, the company integrates advanced practices with strategic execution to deliver exceptional results. By continuously embracing innovation and maintaining the highest standards of reliability and efficiency, SN Groups positions itself as a trusted partner for businesses seeking long-term value and consistent excellence across diverse industrial sectors
      </Section>

      {/* SERVICES */}
      <Section id="services" title="Our Services">

        <div className="relative w-full min-h-[300px] md:min-h-[450px] flex items-center justify-center">

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-4 px-4 sm:flex-wrap sm:flex-row sm:justify-center"
          >
            {["Rentals", "Sales", "Service", "Logistics", "Human Resources Outsourcing"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                className="ultra-card w-full max-w-xs text-center py-3 rounded-xl"
                onClick={(e) => {
                  e.stopPropagation();
                  setHovered(item);
                }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* POPUP */}
          {hovered && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/10"
              onClick={() => setHovered(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <motion.div
                className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%]
                          p-6 md:p-8 rounded-2xl shadow-xl
                          flex flex-col items-start justify-center text-left relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.50, ease: "easeOut", delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >

                {/* TITLE */}
                <h3 className="absolute top-4 left-4 text-lg md:text-xl text-[#C9A44C] font-semibold">
                  {hovered}
                </h3>

                {/* CONTENT */}
                <p className="text-gray-600 text-sm md:text-base w-full max-w-2xl leading-relaxed mt-8">
                  {getServiceContent(hovered)}
                </p>

              </motion.div>
            </motion.div>
          )}

        </div>

      </Section>

      {/* VISION */}
      <Section id="vision" title="Vision">
        To become a trusted and leading enterprise across logistics, construction, and manufacturing by delivering innovative, reliable, and high-quality solutions that consistently meet and exceed industry expectations. With a strong focus on operational excellence, technological advancement, and customer-centric practices, we aim to create long-term value, foster meaningful partnerships, and drive sustainable growth, positioning SN Groups as a respected and influential name across multiple industrial sectors.
      </Section>

      {/* MISSION */}
      <Section id="mission" title="Mission">
        <ul className="space-y-3 text-left">
          <li>• Deliver high-quality services with a strong focus on precision, consistency, and excellence</li>
          <li>• Build strong and long-term relationships based on trust, transparency, and reliability</li>
          <li>• Expand across industries by identifying new opportunities and driving sustainable growth</li>
          <li>• Leverage technology-driven solutions to improve efficiency, performance, and scalability</li>
          <li>• Ensure timely execution and dependable delivery across all projects and operations</li>
          <li>• Continuously enhance processes to maintain operational excellence and industry standards</li>
          <li>• Foster innovation by adapting to evolving market trends and modern technologies</li>
          <li>• Maintain a customer-centric approach focused on satisfaction, value, and long-term success</li>
          <li>• Promote professionalism, accountability, and a culture of continuous improvement</li>
          <li>• Deliver cost-effective solutions without compromising on quality and reliability</li>
        </ul>
      </Section>

      {/* FOUNDERS */}
      <Section 
      id="leadership" 
      className="section min-h-screen flex flex-col items-center px-4 md:px-6 lg:px-8 text-center relative"
      >
        <h2 className="text-4xl font-semibold text-[#C9A44C] mt-20">
          Founders
        </h2>
        <div className="flex flex-col justify-between w-full h-[70vh]">
          <div className="relative w-full mx-auto min-h-[300px] md:min-h-[450px] text-center flex items-center justify-center">

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: founderHovered ? 0 : 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 px-4"
            >
              {["Founder", "Co-Founder"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  className="ultra-card px-8 py-4 whitespace-nowrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFounderHovered(item);
                  }}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* HOVER VIEW */}
            {founderHovered && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/10"
                onClick={() => setFounderHovered(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <motion.div
                  className="bg-white w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%]
                  max-w-none min-h-[250px] md:min-h-[320px]
                  p-6 md:p-8 rounded-2xl shadow-xl
                  flex flex-col items-start justify-center text-left relative"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.50, ease: "easeOut" , delay: 0.1}}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="absolute top-4 left-4 text-lg md:text-xl text-[#C9A44C] font-semibold">
                    {founderHovered}
                  </h3>

                  <p className="text-gray-600 text-sm md:text-base w-full max-w-2xl leading-relaxed mt-6">
                    {getFounderContent(founderHovered)}
                  </p>
                </motion.div>
              </motion.div>
            )}
          
          </div>
          <footer>
            © 2026 SN Groups. All rights reserved.
          </footer>
        </div>
      </Section>
      
      <ScrollIndicator />
    </main>
  );
}

/* SECTION COMPONENT */
function Section({ id, title, children }: any) {
  return (
    <motion.section
      id={id}
      className="section w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center relative"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9 }}
    >
      <div className="bg-glow"></div>

      <h2 className="text-4xl font-semibold text-[#C9A44C] mb-8 z-10">
        {title}
      </h2>

      <div className="max-w-4xl text-gray-700 z-10">
        {children}
      </div>
    </motion.section>
  );
}

function getServiceContent(service: string) {
  switch (service) {
    case "Rentals":
      return "We provide reliable and cost-effective rental solutions tailored to the specific needs of industrial and commercial operations, delivering high-quality equipment, dependable service, and flexible support that ensures efficiency, minimizes downtime, and enhances overall productivity..";

    case "Sales":
      return "We offer high-quality products developed to deliver exceptional durability and performance, with a strong focus on client satisfaction, ensuring reliable operation, long-term efficiency, and consistent value across a wide range of industrial and commercial applications.";

    case "Service":
      return "Our service solutions are designed to ensure comprehensive maintenance, optimize operational efficiency, and deliver long-term reliability of equipment and systems, helping businesses achieve consistent performance, reduced downtime, and sustained operational excellence.";

    case "Logistics":
      return "We support efficient logistics and supply chain operations by delivering timely, reliable, and seamless movement of goods, ensuring smooth coordination, minimized delays, and enhanced operational efficiency across every stage of the supply chain.";

    case "Human Resources Outsourcing":
      return "We provide comprehensive human resources outsourcing solutions that help businesses manage their workforce efficiently. From recruitment and onboarding to payroll management and compliance, our services streamline operations, reduce administrative burden, and ensure access to skilled talent, enabling organizations to focus on their core growth and strategic objectives.";

      default:
      return "";
  }
}

function getFounderContent(role: string) {
  switch (role) {
    case "Founder":
      return (
        <>
          <strong>Sharan S</strong>, <br />
          Founder of SN Groups, brings a high level of technical precision, analytical thinking, and problem-solving expertise, playing a pivotal role in driving operational excellence, optimizing processes, and providing strategic technical direction that supports the company’s growth and innovation.
        </>
      );

    case "Co-Founder":
      return (
        <>
          <strong>Nehaa S Prasad</strong>, <br />
          Co-Founder of SN Groups, brings a strong foundation in technology and business execution, focusing on strategy, operations, and growth, ensuring scalability and positioning the organization as a forward-looking enterprise.
        </>
      );

    default:
      return "";
  }
}

function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const main = document.querySelector("main");

    if (!main) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      if (height <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = scrollTop / height;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition"
      onClick={() => {
        const main = document.querySelector("main");
        window?.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="relative w-14 h-14">

        <svg
          className="absolute top-0 right-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#eeeeeeff"
            strokeWidth="5"
            fill="none"
          />

          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#C9A44C"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/logo.png" className="w-15 h-15 object-contain" />
        </div>

      </div>
    </div>
  );
}