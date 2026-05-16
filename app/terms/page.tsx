"use client";

import { motion } from "framer-motion";
import { Scale, FileText, Gavel, Globe, ArrowLeft } from "lucide-react";

export default function TermsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-20 relative overflow-x-hidden">
      {/* Background Glow */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,164,76,0.08),transparent_70%)] pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-black/80 backdrop-blur-xl p-10 md:p-16 rounded-[40px] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <motion.h1 variants={item} className="text-5xl md:text-8xl font-black mb-16 tracking-tighter">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">Terms &</span><br/>
            <span className="text-[#C9A44C] drop-shadow-[0_2px_10px_rgba(201,164,76,0.3)]">Conditions</span>
          </motion.h1>

          <div className="space-y-12 text-xl text-white/90 leading-relaxed font-medium">
            <motion.p variants={item} className="text-2xl text-[#C9A44C] font-bold border-l-4 border-[#C9A44C] pl-6 italic">
              Welcome to SN Groups. By accessing our industrial services, you agree to the following legally binding terms.
            </motion.p>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <FileText className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">1. Service Utilization</h2>
              </div>
              <p className="opacity-100">
                Our industrial solutions, including specialized drone rentals, logistics management, and technical services, are provided subject to specific operational agreements. Users must strictly adhere to safety protocols and local regulatory guidelines.
              </p>
            </motion.section>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Scale className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">2. Intellectual Property</h2>
              </div>
              <p className="opacity-100">
                All content, including the "SN Groups" brand, Skysnap Studio logos, technical documentation, and proprietary methodologies, remains the exclusive property of SN Groups. Unauthorized reproduction or distribution is strictly prohibited.
              </p>
            </motion.section>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Gavel className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">3. Limitation of Liability</h2>
              </div>
              <p className="opacity-100">
                SN Groups provides all services with professional precision. However, we are not liable for indirect losses, data inaccuracies from external factors, or damages resulting from equipment misuse beyond our direct control.
              </p>
            </motion.section>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Globe className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">4. Governing Law</h2>
              </div>
              <p className="opacity-100">
                These terms are governed by the laws of the Republic of India. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka.
              </p>
            </motion.section>

            <motion.div variants={item} className="pt-16 border-t border-white/20 mt-20 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-left">
                <p className="text-sm font-bold text-[#C9A44C] uppercase tracking-widest mb-2">Legal Department</p>
                <p className="text-lg opacity-60 italic">Last Updated: May 16, 2026</p>
              </div>
              <motion.a 
                href="/" 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-5 rounded-2xl bg-[#C9A44C] text-black font-black text-xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(201,164,76,0.4)] flex items-center gap-3"
              >
                <ArrowLeft size={24} /> Back Home
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}