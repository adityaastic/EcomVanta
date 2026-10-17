import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { getLatestContentFromCloud } from "@/lib/cms";
import { CmsProvider } from "@/lib/useCmsContent";
import { buildNextMetadataForRoute } from "@/lib/seoServer";
import SeoJsonLd from "@/components/SeoJsonLd";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const dynamicMeta = await buildNextMetadataForRoute("/");
  return {
    ...dynamicMeta,
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
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialContent = await getLatestContentFromCloud();
  const ga4Id =
    initialContent.seoConfig?.integrations?.ga4Enabled &&
    initialContent.seoConfig?.integrations?.ga4MeasurementId
      ? initialContent.seoConfig.integrations.ga4MeasurementId.trim()
      : "";

  return (
    <html lang="en" className={sora.variable}>
      <head>
        <link rel="icon" href="/favicon.ico?v=20260908" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=20260908" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=20260908" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20260908" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <SeoJsonLd urlPath="/" />
        {ga4Id && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${ga4Id}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased selection:bg-[#0066FF] selection:text-white">
        <CmsProvider initialContent={initialContent}>
          {children}
        </CmsProvider>
      </body>
    </html>
  );
}
