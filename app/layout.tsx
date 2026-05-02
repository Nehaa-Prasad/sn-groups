import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./Navbar"; // 👈 import client navbar
import "./globals.css";

export const metadata: Metadata = {
  title: "SN Groups",
  description: "Drone rental and services",
  verification: {
    google:"atfNvy9LMLj6IDHx5i_-t4t7jETHuX8bP-3_SOLJxIQ",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-screen flex flex-col">

        {/* ✅ CLIENT NAVBAR */}
        <Navbar />

        <main className="flex-grow pt-16">
          {children}
        </main>

        <footer className="text-center text-sm text-gray-600 py-6 border-t pb-20">
          © 2026 SN Groups. All rights reserved.
          <span className="mx-2"> | </span>
          <a href="/terms" className="hover:text-[#C9A44C] transition">Terms</a>
          <span className="mx-2"> | </span>
          <a href="/privacy" className="hover:text-[#C9A44C] transition">Privacy</a>
        </footer>

      </body>
    </html>
  );
}