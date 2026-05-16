"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, Cookie, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,164,76,0.1),transparent_70%)] pointer-events-none" 
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-black/80 backdrop-blur-xl p-10 md:p-16 rounded-[40px] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <motion.h1 variants={item} className="text-5xl md:text-8xl font-black mb-16 tracking-tighter">
            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">Privacy</span><br/>
            <span className="text-[#C9A44C] drop-shadow-[0_2px_10px_rgba(201,164,76,0.3)]">Policy</span>
          </motion.h1>

          <div className="space-y-12 text-xl text-white/90 leading-relaxed font-medium">
            <motion.p variants={item} className="text-2xl text-[#C9A44C] font-bold border-l-4 border-[#C9A44C] pl-6 italic">
              At SN Groups, your security is our priority. This policy details how we strictly manage and protect your industrial data.
            </motion.p>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Shield className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">1. Data Protection</h2>
              </div>
              <p className="opacity-100">
                We implement industrial-grade security measures to safeguard your information. Our protocols ensure that sensitive data related to your industrial operations is never exposed to unauthorized entities.
              </p>
            </motion.section>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Eye className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">2. Information Use</h2>
              </div>
              <p className="opacity-100">
                We collect minimal data necessary to facilitate drone services, technical consulting, and manpower logistics. Your data is used exclusively to improve service efficiency and maintain operational safety.
              </p>
            </motion.section>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Lock className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">3. Third-Party Access</h2>
              </div>
              <p className="opacity-100">
                SN Groups does not sell, trade, or share your proprietary data with third parties. Any external collaboration is governed by strict non-disclosure agreements to protect your competitive advantage.
              </p>
            </motion.section>

            <motion.section variants={item} className="space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Cookie className="text-[#C9A44C]" size={32} />
                <h2 className="text-4xl font-bold text-white">4. Cookies & Analytics</h2>
              </div>
              <p className="opacity-100">
                We use high-performance cookies to analyze site traffic and optimize your user experience. These cookies do not collect personal information and can be managed via your browser settings.
              </p>
            </motion.section>

            <motion.div variants={item} className="pt-16 border-t border-white/20 mt-20 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-left">
                <p className="text-sm font-bold text-[#C9A44C] uppercase tracking-widest mb-2">Compliance Office</p>
                <p className="text-lg opacity-60 italic">Updated: May 16, 2026</p>
              </div>
              <motion.a 
                href="/" 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="group px-12 py-5 rounded-2xl bg-[#C9A44C] text-black font-black text-xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(201,164,76,0.4)] flex items-center gap-3"
              >
                <ArrowLeft size={24} /> Back to Home
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}