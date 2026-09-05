export interface ServiceData {
  slug: string;
  badge: string;
  title: string;
  subtitle: string;
  heroImage: string;
  aboutImage?: string;
  aboutTitle: string;
  aboutDesc: string;
  servicesGrid: {
    icon: string;
    title: string;
    desc: string;
  }[];
  advantages: {
    icon?: string;
    title: string;
    desc: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SERVICES_DATABASE: Record<string, ServiceData> = {
  'flipkart-account-management-services': {
    slug: 'flipkart-account-management-services',
    badge: 'Official Flipkart Partner Network',
    title: 'Flipkart Account Management Services',
    subtitle: 'Scale your revenue on Flipkart with end-to-end account handling, listing score optimization, Flipkart Ads (PCA/PLA), and Big Billion Days strategy.',
    heroImage: '/flipkart-account/product-dashboard.png',
    aboutImage: '/abt-img/flipkart-web-about.png',
    aboutTitle: 'Maximize Your Brand Visibility on Flipkart',
    aboutDesc: 'With over 500M+ registered customers on Flipkart, achieving organic rank requires algorithmic listing precision. Our certified managers handle daily catalog maintenance, inventory sync, and ad spend efficiency.',
    servicesGrid: [
      {
        icon: '/Flipkart Product listing optimisation.png',
        title: 'Listing Optimization & LQS',
        desc: 'Keyword-rich titles, rich infographics, video uploads, and high listing quality scores.',
      },
      {
        icon: '/Flipkart Inventory management.png',
        title: 'Flipkart Fulfilment & Smart FBF',
        desc: 'Inventory allocation, Tier 1/2 warehouse stocking, and stockout prevention.',
      },
      {
        icon: '/Flipkart Advertising campaigns.png',
        title: 'Flipkart PLA & PCA Advertising',
        desc: 'Targeted ad placement, bid management, and ROAS scaling during festival sales.',
      },
      {
        icon: '/Flipkart Performance monitoring.png',
        title: 'Daily Performance Analytics',
        desc: 'Tracking Buy Box share, cancellation rates, return rates, and GMV growth.',
      },
      {
        icon: '/Flipkart Account health.png',
        title: 'Account Health Maintenance',
        desc: 'Proactive protection against seller tier downgrades and policy violations.',
      },
      {
        icon: '/Flipkart Competitor analysis.png',
        title: 'Competitor Benchmarking',
        desc: 'Price monitoring, discount vouchers, and festival flash deal submissions.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Flipkart Certified Account Experts',
        desc: 'Direct experience managing high-GMV Diamond & Gold tier sellers.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Proven Festival Sale Multiplier',
        desc: '5X to 10X revenue spikes during Big Billion Days and Grand Kitchen sales.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: 'Rapid Dispute Resolution',
        desc: 'Fast resolution on SPF returns, weight disputes, and customer returns.',
      },
    ],
    faqs: [
      {
        question: 'How do you improve Flipkart Listing Quality Score (LQS)?',
        answer: 'We optimize character lengths for titles, upload 5+ HD images including infographics, add key attribute specifications, and upload product demonstration videos.',
      },
      {
        question: 'Can you help resolve Flipkart account suspension or warnings?',
        answer: 'Yes, our team drafts comprehensive Plans of Action (POA) addressing RTD breaches, high return rates, and policy compliance.',
      },
    ],
  },

  'meesho-account-management-services': {
    slug: 'meesho-account-management-services',
    badge: 'Zero Commission Marketplace Growth',
    title: 'Meesho Account Management Services',
    subtitle: 'Dominate India’s fastest growing Tier-2 and Tier-3 consumer base with zero-commission cataloging, Next Day Dispatch, and Meesho Ads.',
    heroImage: '/Meesho/meesho-web-about.webp',
    aboutImage: '/Meesho/Meesho Product Listing Services.webp',
    aboutTitle: 'Scale Your Sales on Meesho with EcomVanta',
    aboutDesc: 'Meesho is transforming social and regional commerce in India. We help sellers leverage zero commission, optimized price tiers, and high-velocity daily order dispatching.',
    servicesGrid: [
      {
        icon: '/abt-img/Meesho Account set-up and verification.png',
        title: 'Account Setup & Verification',
        desc: 'Fast onboarding, bank verification, GST configuration, and category whitelisting.',
      },
      {
        icon: '/abt-img/Meesho Chronic listing and catalogue management.png',
        title: 'Bulk Catalog & Listing',
        desc: 'High-volume Excel flat file uploads, variation mapping, and tag optimization.',
      },
      {
        icon: '/abt-img/Meesho Inventory management.png',
        title: 'Inventory & Stock Sync',
        desc: 'Real-time multi-channel inventory management to avoid out-of-stock cancellations.',
      },
      {
        icon: '/abt-img/Meesho Order management.png',
        title: 'Next Day Dispatch (NDD)',
        desc: 'NDD badge enrollment to get prioritized organic display on the Meesho app.',
      },
      {
        icon: '/abt-img/Meesho Advertising and promotion.png',
        title: 'Meesho Ads Optimization',
        desc: 'Smart budget allocation, low CPC bidding, and catalog boost campaigns.',
      },
      {
        icon: '/abt-img/Meesho Performance monitoring.png',
        title: 'Price Competitiveness Analysis',
        desc: 'Competitive price benchmarking to win top visibility in recommended feeds.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Tier 2/3 Regional Expertise',
        desc: 'Proven success in apparel, footwear, home decor, and fashion jewelry.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'High Order Volume Strategy',
        desc: 'Strategies designed to generate 500+ daily orders with healthy profit margins.',
      },
    ],
    faqs: [
      {
        question: 'How do Meesho Ads work?',
        answer: 'Meesho operates on a Cost-Per-Click (CPC) model. We target the most relevant shopper search terms to maximize orders while keeping ad spend low.',
      },
      {
        question: 'What is Next Day Dispatch on Meesho?',
        answer: 'NDD gives your products a special badge and higher organic feed ranking by committing to shipping orders within 24 hours.',
      },
    ],
  },

  'shopify-store-management-services': {
    slug: 'shopify-store-management-services',
    badge: 'D2C Brand Scaling Experts',
    title: 'Shopify Store Management Services',
    subtitle: 'From high-converting custom UI/UX design to Meta/Google conversion ads and retention marketing, we build sustainable D2C businesses.',
    heroImage: '/Shopify/About (7).webp',
    aboutImage: '/Shopify/Shopify Seller Account Management Services.webp',
    aboutTitle: 'Scale Your Independent D2C Brand',
    aboutDesc: 'Own your customer data and build repeat brand loyalty. Our Shopify engineers and performance marketers handle store design, app integrations, and conversion rate optimization.',
    servicesGrid: [
      {
        icon: '/abt-img/Shopify Store set-up and customisation..png',
        title: 'Custom Store Design & Themes',
        desc: 'Fast, mobile-first responsive Shopify theme development optimized for checkout speed.',
      },
      {
        icon: '/abt-img/Shopify Product listing and inventory management.png',
        title: 'Catalog & Collection Setup',
        desc: 'Rich product landing pages, video media, size charts, and bundles.',
      },
      {
        icon: '/abt-img/Shopify Order processing and fulfilment.png',
        title: 'Logistics & 3PL Integration',
        desc: 'Integration with Shiprocket, Delhivery, Bluedart, and automated NDR workflows.',
      },
      {
        icon: '/abt-img/Shopify Customer support management.png',
        title: 'WhatsApp Automation & Retention',
        desc: 'Abandoned cart recovery, order tracking notifications, and WhatsApp CRM integration.',
      },
      {
        icon: '/abt-img/Shopify Performance analytics and reporting.png',
        title: 'Meta & Google Conversion Ads',
        desc: 'Targeted ROAS-focused ad campaigns driving qualified buyer traffic.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Certified Shopify Developers',
        desc: 'Custom Liquid theme modification and app optimization.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'A/B testing checkout funnels to elevate store conversion rates above 3.5%.',
      },
    ],
    faqs: [
      {
        question: 'Do you manage ads for Shopify stores?',
        answer: 'Yes! We run complete full-funnel Meta (Facebook/Instagram) and Google Performance Max campaigns to drive profitable D2C sales.',
      },
    ],
  },

  'blinkit-seller-account-management-services': {
    slug: 'blinkit-seller-account-management-services',
    badge: 'Quick Commerce 10-Minute Growth',
    title: 'Blinkit Account Management & Onboarding',
    subtitle: 'Launch and scale your brand on India’s leading 10-minute delivery platform with dark store inventory planning and brand visibility.',
    heroImage: '/zepto-page-images/Expand your brand with 10-minute commerce1.webp',
    aboutImage: '/zepto-page-images/What Is Zepto Seller Onboarding and Why Does It Matter1.webp',
    aboutTitle: 'Lead the Quick Commerce Revolution',
    aboutDesc: 'Consumers now demand instant 10-minute delivery. We handle complete Blinkit onboarding, city dark store inventory replenishment, and in-app sponsored ads.',
    servicesGrid: [
      {
        icon: '/brand-img/report.png',
        title: 'Blinkit Brand Onboarding',
        desc: 'Brand verification, agreement signing, FSSAI compliance, and catalog activation.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Dark Store Stock Allocation',
        desc: 'Demand forecasting across micro-warehouses in Delhi NCR, Mumbai, Bangalore, Jaipur.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Blinkit Sponsored Ads',
        desc: 'Category banner placements, search bar keyword targeting, and flash promotions.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Stockout Prevention & PO Tracking',
        desc: 'Real-time Purchase Order (PO) tracking and automated reordering schedules.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Dedicated Quick Commerce Team',
        desc: 'Experienced in daily dark store inventory logistics and instant delivery algorithms.',
      },
    ],
    faqs: [
      {
        question: 'What documents are required to sell on Blinkit?',
        answer: 'GST certificate, PAN card, FSSAI license (for food/supplements), trademark/brand authorization, and bank details.',
      },
    ],
  },

  'myntra-account-management-services': {
    slug: 'myntra-account-management-services',
    badge: 'Premium Fashion & Lifestyle',
    title: 'Myntra Account Management Services',
    subtitle: 'Elevate your apparel, footwear, and accessory brand on India’s top fashion marketplace with curated listings and EORS campaign strategy.',
    heroImage: '/myntra/about (8).webp',
    aboutImage: '/myntra/Myntra Seller Account Setup & Onboarding.webp',
    aboutTitle: 'Dominate Fashion & Lifestyle on Myntra',
    aboutDesc: 'Myntra is India’s premier destination for style. We ensure your brand complies with strict catalog guidelines, lifestyle imagery standards, and participates in blockbuster sales events.',
    servicesGrid: [
      {
        icon: '/Platform expertise.png',
        title: 'Seller Onboarding & Curation',
        desc: 'Brand gate approvals, style code allocation, and brand registry approval.',
      },
      {
        icon: '/content-creation.png',
        title: 'Fashion Catalog & Style Tags',
        desc: 'Attributes, fabric specs, color swatches, model size guides, and HD lifestyle shots.',
      },
      {
        icon: '/planning.png',
        title: 'Inventory & Warehouse Sync',
        desc: 'JIT (Just In Time) and PPMP (Partner Portal Marketplace Model) inventory fulfillment.',
      },
      {
        icon: '/financial-analysis.png',
        title: 'Myntra Ads & Visibility',
        desc: 'Targeted fashion banners, brand days, and End of Reason Sale (EORS) promotions.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Fashion Algorithm Mastery',
        desc: 'Curated style indexing ensuring top spots in category trends.',
      },
    ],
    faqs: [
      {
        question: 'Can any brand sell on Myntra?',
        answer: 'Myntra has a curated onboarding process. We help submit brand portfolios and secure fast-track approvals for quality brands.',
      },
    ],
  },

  'seo-company-in-india': {
    slug: 'seo-company-in-india',
    badge: 'Organic Search Engine Dominance',
    title: 'Search Engine Optimization (SEO) Company in India',
    subtitle: 'Drive high-intent organic traffic and achieve #1 Google rankings with data-backed technical SEO, keyword architecture, and quality link building.',
    heroImage: '/new-images/seo-services-featured-image.png 1.png',
    aboutImage: '/new-images/happy-young-man-wearing-jeans-shirt-standing-using-tablet-studio-grey-wall 1.png',
    aboutTitle: 'Dominate Search Engines with ROI-Focused SEO',
    aboutDesc: 'Over 90% of online experiences begin with a search engine. We implement white-hat on-page, off-page, and technical SEO frameworks that turn organic searches into customers.',
    servicesGrid: [
      {
        icon: '/new-images/image 20.png',
        title: 'Technical SEO & Core Web Vitals',
        desc: 'Speed optimization, mobile responsiveness, XML sitemaps, and schema markup.',
      },
      {
        icon: '/new-images/image 21.png',
        title: 'High-Intent Keyword Research',
        desc: 'Identifying transactional keywords with high search volume and commercial intent.',
      },
      {
        icon: '/new-images/image 22.png',
        title: 'E-Commerce SEO & Architecture',
        desc: 'Category page structure, faceted navigation optimization, and product schema.',
      },
      {
        icon: '/new-images/image 23.png',
        title: 'Authority Link Building',
        desc: 'High DA editorial backlinks, guest posting, and brand mentions.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Guaranteed Ranking Growth',
        desc: 'Transparent Google Search Console analytics and keyword tracking.',
      },
    ],
    faqs: [
      {
        question: 'How long does SEO take to show results?',
        answer: 'Most clients see noticeable keyword movements and organic impression gains within 60 to 90 days, with substantial traffic growth by months 4-6.',
      },
    ],
  },

  'meta-ads-management-company-in-india': {
    slug: 'meta-ads-management-company-in-india',
    badge: 'High-ROAS Social Advertising',
    title: 'Meta Ads Management (Facebook & Instagram)',
    subtitle: 'Generate profitable sales and scale customer acquisition with high-converting creative ads, lookalike audiences, and full-funnel pixel tracking.',
    heroImage: '/new-images/meta-banner.png',
    aboutImage: '/new-images/meta-2.png',
    aboutTitle: 'Scale Your Sales with Meta Advertising',
    aboutDesc: 'We craft compelling video ads, carousel formats, and UGC creatives paired with advanced audience segmentation to achieve 3.5X+ ROAS for D2C brands.',
    servicesGrid: [
      {
        icon: '/new-images/image 28.png',
        title: 'Creative Ad Design & Copywriting',
        desc: 'High-hook video creatives, carousels, and benefit-driven ad copy.',
      },
      {
        icon: '/new-images/image 29.png',
        title: 'Full-Funnel Campaign Architecture',
        desc: 'Top of funnel prospecting, middle of funnel engagement, and bottom of funnel retargeting.',
      },
      {
        icon: '/new-images/image 30.png',
        title: 'CAPI & Pixel Integration',
        desc: 'Conversions API setup for accurate tracking and iOS privacy compliance.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Meta Certified Media Buyers',
        desc: 'Managing over ₹1Cr+ in monthly advertising spend across industries.',
      },
    ],
    faqs: [
      {
        question: 'What is a good ROAS for Meta Ads in India?',
        answer: 'Depending on product gross margins, we typically target between 3.0X and 5.0X blended ROAS for healthy profitability.',
      },
    ],
  },

  'google-ads-management-company-in-india': {
    slug: 'google-ads-management-company-in-india',
    badge: 'Certified Google Premier Partner',
    title: 'Google Ads & PPC Management Company',
    subtitle: 'Capture high-intent buyers with Google Search, Performance Max (PMax), Shopping Ads, and YouTube Video campaigns.',
    heroImage: '/new-images/google-banner.png',
    aboutImage: '/new-images/google-2.png',
    aboutTitle: 'Drive Instant Sales with Google PPC',
    aboutDesc: 'Reach customers at the exact moment they are searching for your products. We optimize Google Merchant Center feeds, search keyword bids, and smart shopping campaigns.',
    servicesGrid: [
      {
        icon: '/new-images/image 31.png',
        title: 'Performance Max (PMax) Campaigns',
        desc: 'Unified advertising across Search, Shopping, YouTube, Gmail, and Discover.',
      },
      {
        icon: '/new-images/image 32.png',
        title: 'Google Shopping & Merchant Center',
        desc: 'Feed optimization, negative keyword filtering, and product title enrichment.',
      },
      {
        icon: '/new-images/image 33.png',
        title: 'Search Ads & High Intent Keywords',
        desc: 'Exact & phrase match keyword bidding with high Quality Scores.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Maximized Ad Spend Efficiency',
        desc: 'Negative keyword sculpting to eliminate wasteful click expenditure.',
      },
    ],
    faqs: [
      {
        question: 'What is Google Performance Max (PMax)?',
        answer: 'PMax is an AI-powered campaign type that finds converting customers across all of Google’s channels with optimized automated bidding.',
      },
    ],
  },

  'graphic-design-company-in-india': {
    slug: 'graphic-design-company-in-india',
    badge: 'Creative Visual Excellence',
    title: 'E-Commerce Graphic Design Services',
    subtitle: 'Transform your brand perception with stunning Amazon A+ content, Brand Storefronts, packaging, infographics, and digital ad banners.',
    heroImage: '/new-images/graphic-banner.png',
    aboutImage: '/new-images/graphic-2.png',
    aboutTitle: 'Design That Sells',
    aboutDesc: 'Visuals determine conversion rates. Our creative team produces high-end lifestyle renders, infographic overlays, and interactive brand stores that inspire customer trust.',
    servicesGrid: [
      {
        icon: '/new-images/image 36.png',
        title: 'Amazon A+ Content / EBC',
        desc: 'Enhanced Brand Content modules highlighting product USP and comparisons.',
      },
      {
        icon: '/new-images/image 37.png',
        title: 'Multi-Page Brand Storefronts',
        desc: 'Responsive, immersive Amazon storefronts designed to cross-sell catalogs.',
      },
      {
        icon: '/new-images/image 38.png',
        title: 'Product Infographics & Retouching',
        desc: 'Feature callouts, dimension charts, and realistic 3D shadow enhancements.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: 'Conversion-Focused Visuals',
        desc: 'Designed scientifically to answer customer questions and boost conversions by 25%+.',
      },
    ],
    faqs: [
      {
        question: 'Does A+ content really increase sales?',
        answer: 'According to Amazon data, adding high-quality A+ Content can increase sales conversion rates by 5% to 20%.',
      },
    ],
  },
};
