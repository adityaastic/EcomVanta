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
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "EcomVanta | Powering Brands. Scaling E-commerce",
    description: "Welcome to your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites.",
    siteName: "EcomVanta",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased selection:bg-[#f71735] selection:text-white">
        {children}
      </body>
    </html>
  );
}
