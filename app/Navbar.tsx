"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

          <a href="/" className="text-[#C9A44C] font-bold text-lg">
            SN Groups
          </a>

          <div className="hidden md:flex space-x-6 text-sm">
            <a href="/" className="nav-link">Home</a>
            <a href="/#about" className="nav-link">About</a>
            <a href="/#services" className="nav-link">Services</a>
            <a href="/#vision" className="nav-link">Vision</a>
            <a href="/#mission" className="nav-link">Mission</a>
            <a href="/#leadership" className="nav-link">Founders</a>
          </div>

          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>

        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/20"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex justify-center items-start pt-16 h-full">

            <div
              className="bg-white w-[90%] max-w-sm rounded-xl shadow-lg py-6 flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <a href="/" onClick={() => setMenuOpen(false)} className="nav-link">Home</a>
              <a href="/#about" onClick={() => setMenuOpen(false)} className="nav-link">About</a>
              <a href="/#services" onClick={() => setMenuOpen(false)} className="nav-link">Services</a>
              <a href="/#vision" onClick={() => setMenuOpen(false)} className="nav-link">Vision</a>
              <a href="/#mission" onClick={() => setMenuOpen(false)} className="nav-link">Mission</a>
              <a href="/#leadership" onClick={() => setMenuOpen(false)} className="nav-link">Founders</a>
            </div>

          </div>
        </div>
      )}
    </>
  );
}