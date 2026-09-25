import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcomVanta - Powering Brands. Scaling E-commerce | Marketplace Growth Partner",
  description: "EcomVanta is your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites.",
  keywords: ["EcomVanta", "Ecommerce Service Provider in Delhi", "Amazon Account Management", "Flipkart Account Management", "Blinkit Seller Onboarding", "Meesho Account Management"],
  authors: [{ name: "EcomVanta" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=20260908", sizes: "any" },
      { url: "/favicon-32x32.png?v=20260908", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png?v=20260908", type: "image/png", sizes: "16x16" },
      { url: "/icon.png?v=20260908", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico?v=20260908",
    apple: [
      { url: "/apple-touch-icon.png?v=20260908", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "EcomVanta | Powering Brands. Scaling E-commerce",
    description: "Welcome to your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites.",
    siteName: "EcomVanta",
    type: "website",
  },
};

import { getSiteContent } from "@/lib/cms";
import { CmsProvider } from "@/lib/useCmsContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = getSiteContent();

  return (
    <html lang="en" className={sora.variable}>
      <head>
        <link rel="icon" href="/favicon.ico?v=20260908" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=20260908" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=20260908" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20260908" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased selection:bg-[#0066FF] selection:text-white">
        <CmsProvider initialContent={initialContent}>
          {children}
        </CmsProvider>
      </body>
    </html>
  );
}
