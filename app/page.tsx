"use client";

import { motion, useScroll, useTransform} from "framer-motion";
import { useEffect, useState } from "react";

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
  return (
    <main>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 border-b">
        <div className="max-w-6xl mx-auto flex justify-between px-6 py-3">
          <h1 className="text-[#C9A44C] font-bold text-lg">SN Groups</h1>
          <div className="space-x-6 text-sm">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#vision">Vision</a>
            <a href="#mission">Mission</a>
            <a href="#leadership">Founders</a>
          </div>
        </div>
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
          className="w-52 mb-6 z-10"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* TITLE */}
        <motion.h1
          className="text-6xl font-bold text-[#C9A44C] z-10"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          SN Groups
        </motion.h1>

        {/* TAGLINE */}
        <p className="mt-6 text-lg text-gray-600 max-w-xl z-10">
          Engineering growth across logistics, construction, and manufacturing
          through precision, reliability, and innovation.
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
      <Section id="about" title="About SN Groups">
        SN Groups is a rapidly growing enterprise delivering professional solutions across rentals, sales, service, and manufacturing. With operations spanning logistics, construction, and manufacturing, the company focuses on scalability, efficiency, and consistent execution.
      </Section>

      {/* SERVICES */}
      <Section id="services" title="Our Services">

        <div className="relative w-full mx-auto h-[450px] flex items-center justify-center">

          {/* BUTTONS */}
          <motion.div
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex gap-8 absolute"
          >
            {["Rentals", "Sales", "Service", "Logistics"].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                className="ultra-card px-8 py-4"
                onMouseEnter={() => setHovered(item)}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>

          {/* HOVER VIEW */}
          {hovered && (
            <>
              {/* TOP LEFT LABEL */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: -200, y: -120 }}
                transition={{ duration: 0.4 }}
                className="absolute text-[#C9A44C] text-xl font-semibold"
              >
                {hovered}
              </motion.div>

              {/* BIG BOX */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute w-full h-full flex items-center justify-center"
              >
                <div
                className="bg-white absolute left-1/2 top-1/2 
                          -translate-x-1/2 -translate-y-1/2
                          w-[900px] max-w-[1100px] h-[400px] 
                          p-10 rounded-2xl shadow-xl 
                          flex items-center justify-center text-center"
                onMouseLeave={() => setHovered(null)}
                >
                  {/* 🔥 TITLE TOP LEFT */}
                  <h3 className="absolute top-6 left-6 text-2xl text-[#C9A44C] font-semibold">
                    {hovered}
                  </h3>

                  {/* 🔥 CENTER CONTENT */}
                  <div className="w-full h-full flex items-center justify-center text-center">
                    <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                      {getServiceContent(hovered)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}

        </div>

      </Section>

      {/* VISION */}
      <Section id="vision" title="Vision">
        To become a trusted and leading enterprise across logistics, construction, and manufacturing through innovation and reliability.
      </Section>

      {/* MISSION */}
      <Section id="mission" title="Mission">
        <ul className="space-y-3 text-left">
          <li>• Deliver high-quality services</li>
          <li>• Build strong relationships</li>
          <li>• Expand across industries</li>
          <li>• Use technology-driven solutions</li>
        </ul>
      </Section>

      {/* FOUNDERS */}
      <Section 
      id="leadership" 
      className="section min-h-screen flex flex-col items-center px-6 text-center relative"
      >
        <h2 className="text-4xl font-semibold text-[#C9A44C] mt-20">
          Founders
        </h2>
        <div className="flex flex-col justify-between w-full h-[70vh]">
          <div className="relative w-full mx-auto h-[450px] text-center flex items-center justify-center">

            {/* BUTTONS */}
            <motion.div
              animate={{ opacity: founderHovered ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex gap-8 absolute"
            >
              {["Founder", "Co-Founder"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  className="ultra-card px-8 py-4 whitespace-nowrap"
                  onMouseEnter={() => setFounderHovered(item)}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>

            {/* HOVER VIEW */}
            {founderHovered && (
              <>
                {/* TOP LEFT LABEL */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x: -200, y: -120 }}
                  transition={{ duration: 0.4 }}
                  className="absolute text-[#C9A44C] text-xl font-semibold"
                >
                  {founderHovered}
                </motion.div>

                {/* BIG BOX */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute w-full h-full flex items-center justify-center"
                >
                  <div
                    className="bg-white absolute left-1/2 top-1/2 
                              -translate-x-1/2 -translate-y-1/2
                              w-[900px] max-w-[1100px] h-[400px] 
                              p-10 rounded-2xl shadow-xl 
                              flex items-center justify-center text-center"
                    onMouseLeave={() => setFounderHovered(null)}
                  >
                    {/* TITLE TOP LEFT */}
                    <h3 className="absolute top-6 left-6 text-2xl text-[#C9A44C] font-semibold">
                      {founderHovered}
                    </h3>

                    {/* CONTENT */}
                    <div className="w-full h-full flex items-center justify-center text-center">
                      <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
                        {getFounderContent(founderHovered)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}

          </div>
          <footer className="w-full text-center py-6 border-t mt-10 text-sm text-gray-500 bg-white/60 backdrop-blur">
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
      className="section min-h-screen flex flex-col justify-center items-center px-6 text-center relative"
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
      return "We provide reliable and cost-effective rental solutions tailored to industrial and commercial needs.";

    case "Sales":
      return "We offer high-quality products with a focus on durability, performance, and client satisfaction.";

    case "Service":
      return "Our service solutions ensure maintenance, efficiency, and long-term reliability of equipment and systems.";

    case "Logistics":
      return "We support efficient logistics and supply chain operations ensuring timely and smooth delivery.";

    default:
      return "";
  }
}

function getFounderContent(role: string) {
  switch (role) {
    case "Founder":
      return "With a strong background in Aeronautical Engineering, the Founder brings technical precision, analytical thinking, and problem-solving expertise, driving operational excellence and technical direction.";

    case "Co-Founder":
      return "With a strong foundation in technology and business execution, the Co-Founder focuses on strategy, operations, and growth, ensuring scalability and positioning SN Groups as a forward-looking enterprise.";

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
      const scrollTop = main.scrollTop;

      const height = main.scrollHeight - main.clientHeight;

      if (height <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = scrollTop / height;
      setProgress(scrolled);
    };

    main.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  const circumference = 283;
  const offset = circumference - progress * circumference;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cursor-pointer hover:scale-110 transition"
      onClick={() => {
        const main = document.querySelector("main");
        main?.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <div className="relative w-14 h-14">

        <svg
          className="absolute top-0 left-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#eee"
            strokeWidth="5"
            fill="none"
          />

          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#C9A44C"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/logo.png" className="w-8 h-8 object-contain" />
        </div>

      </div>
    </div>
  );
}