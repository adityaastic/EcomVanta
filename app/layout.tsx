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
  const integrations =
    initialContent.seoConfig?.integrations || initialContent.seoSystem?.integrations;

  const ga4Id = integrations?.ga4MeasurementId?.trim() || "";
  const googleAdsId = integrations?.googleAdsId?.trim() || "";
  const gtmId = integrations?.gtmContainerId?.trim() || "";
  const metaPixelId = integrations?.metaPixelId?.trim() || "3203677769838663";
  const clarityId = integrations?.clarityProjectId?.trim() || "";
  const linkedInId = integrations?.linkedInPartnerId?.trim() || "";
  const customHeadScripts = integrations?.customHeadScripts?.trim() || "";
  const customBodyScripts = integrations?.customBodyScripts?.trim() || "";

  const gtagPrimaryId = ga4Id || googleAdsId;

  return (
    <html lang="en" className={sora.variable}>
      <head>
        <meta name="google-site-verification" content="YVIBgFCwQo5dpS5L_RmCykYbATbhfPMZ9S9t7mS5jPU" />
        <link rel="icon" href="/favicon.ico?v=20260908" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=20260908" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=20260908" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20260908" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <SeoJsonLd urlPath="/" />

        {/* Google Analytics 4 & Google Ads (gtag.js) */}
        {gtagPrimaryId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagPrimaryId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); ${
                  ga4Id ? `gtag('config', '${ga4Id}');` : ""
                } ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}`,
              }}
            />
          </>
        )}

        {/* Google Tag Manager (GTM) */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}

        {/* Meta (Facebook) Pixel */}
        {metaPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${metaPixelId}');fbq('track', 'PageView');`,
            }}
          />
        )}

        {/* Microsoft Clarity */}
        {clarityId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${clarityId}");`,
            }}
          />
        )}

        {/* LinkedIn Insight Tag */}
        {linkedInId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `_linkedin_partner_id = "${linkedInId}"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id); (function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk);`,
            }}
          />
        )}

        {/* Custom Head Pixel / Scripts */}
        {customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: customHeadScripts }} />
        )}
      </head>
      <body className="min-h-screen bg-white font-sans text-[#1A1A1A] antialiased selection:bg-[#0066FF] selection:text-white">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {metaPixelId && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        {customBodyScripts && (
          <div dangerouslySetInnerHTML={{ __html: customBodyScripts }} />
        )}
        <CmsProvider initialContent={initialContent}>
          {children}
        </CmsProvider>
      </body>
    </html>
  );
}
