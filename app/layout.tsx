import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SN Groups",
  description:
    "SN Groups offers professional drone rentals, drone sales, aerial photography, and drone services in India. Trusted solutions for construction, surveying, and media production.",
  keywords: [
    "drone rental India",
    "drone rental Bangalore",
    "drone services India",
    "drone photography",
    "drone sales India",
    "aerial survey drones",
  ],
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}