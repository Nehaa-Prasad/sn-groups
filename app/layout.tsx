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
  title: "SN Groups | Premier Drone Services & Industrial Solutions India",
  description:
    "SN Groups is India's leading provider of professional drone rentals, industrial sales, logistics management, and expert manpower solutions. Specialized in aerial surveying, photography, and technical services.",
  keywords: [
    "drone rental India",
    "drone rental Bangalore",
    "industrial drone services",
    "aerial photography India",
    "drone sales Bangalore",
    "industrial manpower solutions",
    "logistics management India",
    "manpower for hire Bangalore",
    "technical workforce solutions",
    "drone surveying construction",
    "Skysnap Studio drones",
    "SN Groups Bangalore"
  ],
  authors: [{ name: "SN Groups" }],
  openGraph: {
    title: "SN Groups | Industrial Excellence & Drone Intelligence",
    description: "Providing high-performance drone solutions and industrial services across India.",
    url: "https://sngroups.in",
    siteName: "SN Groups",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "SN Groups Industrial Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SN Groups | Drone & Industrial Solutions",
    description: "Leading industrial solutions provider specializing in drones and manpower.",
    images: ["/hero.png"],
  },
  verification: {
    google: "atfNvy9LMLj6IDHx5i_-t4t7jETHuX8bP-3_SOLJxIQ",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SN Groups",
  "image": "https://sngroups.in/logo.png",
  "description": "Professional drone rentals, industrial sales, logistics, and manpower solutions in India.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bangalore",
    "addressRegion": "Karnataka",
    "addressCountry": "IN"
  },
  "url": "https://sngroups.in",
  "telephone": "+919538136989",
  "priceRange": "$$",
  "openingHours": "Mo-Fr 09:00-18:00"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}