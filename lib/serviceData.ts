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

  'ecommerce-rating-and-review-management-services': {
    slug: 'ecommerce-rating-and-review-management-services',
    badge: 'Brand Reputation & Social Proof Scaling',
    title: 'E-Commerce Rating & Review Management Services',
    subtitle: 'Build 4.8★+ customer trust on Amazon, Flipkart, Meesho, Myntra, Blinkit & Shopify. We accelerate verified buyer reviews, remove policy-violating negative feedback, and skyrocket sales conversion rates.',
    heroImage: '/home-img/Amazon-product-listing-optimization.webp',
    aboutImage: '/flipkart-account/product-dashboard.png',
    aboutTitle: 'Turn Customer Reviews Into Your Biggest Sales Multiplier',
    aboutDesc: 'Over 93% of online shoppers read customer reviews before making a purchase. A single 1-star review can drop listing conversions by up to 35%. EcomVanta provides 100% policy-compliant rating and review management services for Amazon, Flipkart, Meesho, Blinkit, and Quick Commerce brands to safeguard your brand reputation and establish category leadership.',
    servicesGrid: [
      {
        icon: '/brand-img/customer-service.png',
        title: 'Amazon Vine & Review Acceleration',
        desc: 'Compliant review generation via Amazon Vine, automated "Request a Review" integrations, and post-purchase follow-up systems that multiply positive feedback.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Flipkart Ratings & Buyer Feedback',
        desc: 'Accelerating verified buyer reviews and improving Listing Quality Score (LQS) to maintain Gold/Diamond seller tier badges.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Blinkit, Zepto & Quick Commerce Reviews',
        desc: 'Real-time rating monitoring on dark store platforms to maintain 4.5+ star product reputation and rapid impulse reorders.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Negative Review Suppression & Removal',
        desc: 'Proactive escalation and removal of policy-violating reviews, competitor sabotage, fake claims, and delivery/fulfillment complaints (FBA/FBF strike-throughs).',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Voice of Customer (VOC) Analytics',
        desc: 'In-depth sentiment analysis and return reason diagnostics to fix root-cause packaging, size, or quality issues before they harm your rating.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Competitor Review Reverse Engineering',
        desc: 'Auditing top competitor complaints and negative reviews to highlight winning product USPs and comparison tables in your A+ content.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '100% Marketplace TOS Compliant',
        desc: 'Zero black-hat techniques. All review acquisition strategies strictly adhere to Amazon Anti-Manipulation Policy and marketplace guidelines.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Proven Conversion Rate Multiplier',
        desc: 'Increasing your listing rating from 3.8★ to 4.5★+ increases organic conversion rate by up to 120% and lowers your ad ACOS.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: 'Rapid Review Escalation & Support',
        desc: 'Dedicated account managers monitoring your product ratings 24/7 with swift case logging for unfair or malicious negative feedback.',
      },
    ],
    faqs: [
      {
        question: 'How do you generate reviews legally on Amazon and Flipkart?',
        answer: 'We utilize 100% compliant official programs including Amazon Vine, the automated Request a Review API, Flipkart Post-Delivery Feedback workflows, and high-converting product inserts that encourage authentic buyer feedback without incentivization or TOS violations.',
      },
      {
        question: 'Can negative reviews be removed from Amazon or Flipkart?',
        answer: 'Yes, if a negative review violates marketplace community guidelines (e.g., contains vulgarity, mentions competitor names, discusses FBA delivery issues rather than the product, or constitutes abusive competitor sabotage), we raise official policy tickets for complete removal or strike-through.',
      },
      {
        question: 'What marketplaces do you support for review management?',
        answer: 'We provide review and rating management across Amazon, Flipkart, Meesho, Myntra, Blinkit, Zepto, Swiggy Instamart, Nykaa, and D2C brand websites (Shopify/WooCommerce).',
      },
      {
        question: 'How does improved product rating impact Amazon PPC advertising?',
        answer: 'Higher star ratings and positive review counts drastically improve your ad Click-Through Rate (CTR) and Conversion Rate (CVR). This results in lower cost-per-click (CPC), reduced ACOS, and higher ROAS on all your sponsored ad campaigns.',
      },
    ],
  },

  'rating-and-review-management-services': {
    slug: 'rating-and-review-management-services',
    badge: 'Brand Reputation & Social Proof Scaling',
    title: 'Rating & Review Management Services',
    subtitle: 'Build 4.8★+ customer trust on Amazon, Flipkart, Meesho, Myntra, Blinkit & Shopify. We accelerate verified buyer reviews, remove policy-violating negative feedback, and skyrocket sales conversion rates.',
    heroImage: '/home-img/Amazon-product-listing-optimization.webp',
    aboutImage: '/flipkart-account/product-dashboard.png',
    aboutTitle: 'Turn Customer Reviews Into Your Biggest Sales Multiplier',
    aboutDesc: 'Over 93% of online shoppers read customer reviews before making a purchase. A single 1-star review can drop listing conversions by up to 35%. EcomVanta provides 100% policy-compliant rating and review management services for Amazon, Flipkart, Meesho, Blinkit, and Quick Commerce brands to safeguard your brand reputation and establish category leadership.',
    servicesGrid: [
      {
        icon: '/brand-img/customer-service.png',
        title: 'Amazon Vine & Review Acceleration',
        desc: 'Compliant review generation via Amazon Vine, automated "Request a Review" integrations, and post-purchase follow-up systems that multiply positive feedback.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Flipkart Ratings & Buyer Feedback',
        desc: 'Accelerating verified buyer reviews and improving Listing Quality Score (LQS) to maintain Gold/Diamond seller tier badges.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'Blinkit, Zepto & Quick Commerce Reviews',
        desc: 'Real-time rating monitoring on dark store platforms to maintain 4.5+ star product reputation and rapid impulse reorders.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Negative Review Suppression & Removal',
        desc: 'Proactive escalation and removal of policy-violating reviews, competitor sabotage, fake claims, and delivery/fulfillment complaints (FBA/FBF strike-throughs).',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Voice of Customer (VOC) Analytics',
        desc: 'In-depth sentiment analysis and return reason diagnostics to fix root-cause packaging, size, or quality issues before they harm your rating.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Competitor Review Reverse Engineering',
        desc: 'Auditing top competitor complaints and negative reviews to highlight winning product USPs and comparison tables in your A+ content.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '100% Marketplace TOS Compliant',
        desc: 'Zero black-hat techniques. All review acquisition strategies strictly adhere to Amazon Anti-Manipulation Policy and marketplace guidelines.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Proven Conversion Rate Multiplier',
        desc: 'Increasing your listing rating from 3.8★ to 4.5★+ increases organic conversion rate by up to 120% and lowers your ad ACOS.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: 'Rapid Review Escalation & Support',
        desc: 'Dedicated account managers monitoring your product ratings 24/7 with swift case logging for unfair or malicious negative feedback.',
      },
    ],
    faqs: [
      {
        question: 'How do you generate reviews legally on Amazon and Flipkart?',
        answer: 'We utilize 100% compliant official programs including Amazon Vine, the automated Request a Review API, Flipkart Post-Delivery Feedback workflows, and high-converting product inserts that encourage authentic buyer feedback without incentivization or TOS violations.',
      },
      {
        question: 'Can negative reviews be removed from Amazon or Flipkart?',
        answer: 'Yes, if a negative review violates marketplace community guidelines (e.g., contains vulgarity, mentions competitor names, discusses FBA delivery issues rather than the product, or constitutes abusive competitor sabotage), we raise official policy tickets for complete removal or strike-through.',
      },
      {
        question: 'What marketplaces do you support for review management?',
        answer: 'We provide review and rating management across Amazon, Flipkart, Meesho, Myntra, Blinkit, Zepto, Swiggy Instamart, Nykaa, and D2C brand websites (Shopify/WooCommerce).',
      },
      {
        question: 'How does improved product rating impact Amazon PPC advertising?',
        answer: 'Higher star ratings and positive review counts drastically improve your ad Click-Through Rate (CTR) and Conversion Rate (CVR). This results in lower cost-per-click (CPC), reduced ACOS, and higher ROAS on all your sponsored ad campaigns.',
      },
    ],
  },

  'whatsapp-integration-services': {
    slug: 'whatsapp-integration-services',
    badge: 'Meta Official WhatsApp Business API Partner',
    title: 'WhatsApp Integration & Business API Automation',
    subtitle: 'Connect WhatsApp Business API with Shopify, WooCommerce, CRM & ERP. Automate order updates, abandoned cart recovery, AI chatbots, catalog checkout, and 24/7 customer support.',
    heroImage: '/home-img/whatsapp-icon-arvian.webp',
    aboutImage: '/home-img/content-marketing.webp',
    aboutTitle: 'Scale Direct-to-Consumer Conversions With WhatsApp Automation',
    aboutDesc: 'With over 500M+ active WhatsApp users in India and an unprecedented 98% message open rate, WhatsApp is the most powerful revenue channel for modern e-commerce brands. EcomVanta helps brands integrate official Meta WhatsApp Cloud API, configure automated sales flows, recover lost carts, and automate 24/7 customer support.',
    servicesGrid: [
      {
        icon: '/brand-img/policy.png',
        title: 'Official Cloud API & Green Tick Verification',
        desc: 'End-to-end Meta Business Manager verification, official WhatsApp Cloud API provisioning, and Green Tick verified badge application.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'E-commerce & CRM Integration',
        desc: 'Seamless zero-code and custom API integration with Shopify, WooCommerce, Magento, Custom Web, Zoho, LeadSquared, and ERPs.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Automated Abandoned Cart Recovery',
        desc: 'Trigger personalized discount messages with 1-click checkout links within 15 minutes of checkout abandonment to recover 25-40% lost sales.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Instant Order & Logistics Alerts',
        desc: 'Automated transactional notifications for order confirmations, live shipment tracking links, NDR (Non-Delivery Report) address re-confirmation, and COD verification.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'AI Chatbots & Live Agent Routing',
        desc: 'Intelligent conversational AI bots to handle FAQs, return/exchange requests, sizing guides, and smooth handover to human support agents.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'WhatsApp Catalog & Interactive Checkout',
        desc: 'Native in-chat product showcases, quick-reply carousels, payment gateway links (UPI/Razorpay), and frictionless re-ordering.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '98% Open Rate & Instant Engagement',
        desc: 'Reach customers where they spend the most time with 5X higher response rates than traditional email and SMS.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: '35%+ Cart Recovery Multiplier',
        desc: 'Proven automated recovery sequences that turn dropped checkouts into high-margin paid orders on autopilot.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: '100% Meta Compliance & Anti-Spam Protection',
        desc: 'Strict adherence to Meta quality rating guidelines to protect your business phone number from bans and rate limiting.',
      },
    ],
    faqs: [
      {
        question: 'What is the WhatsApp Business API and how does it differ from regular WhatsApp Business app?',
        answer: 'WhatsApp Business API is designed for growing and medium-to-large businesses. It allows unlimited team members to chat from one number, integrates directly with your Shopify/eCommerce store, enables automated notifications (order updates, abandoned carts), broadcasts promotional campaigns to thousands of opt-in users, and provides AI chatbot capabilities.',
      },
      {
        question: 'Can you help get the Official WhatsApp Green Tick badge?',
        answer: 'Yes, we assist eligible brands with Meta Business Manager verification, notable brand press coverage submission, and the official Green Tick verification process.',
      },
      {
        question: 'Can WhatsApp API help reduce COD RTO (Return to Origin) rates?',
        answer: 'Absolutely. We configure automated COD order confirmation messages via WhatsApp where buyers confirm or cancel their order before dispatch. We also automate NDR (Non-Delivery Report) flows to capture alternate delivery addresses and delivery slots.',
      },
      {
        question: 'Which e-commerce platforms can be integrated with WhatsApp?',
        answer: 'We integrate with Shopify, WooCommerce, Wix, Magento, Custom Next.js/React websites, Webflow, and leading Indian logistics aggregators (Shiprocket, NimbusPost, Delhivery, etc.).',
      },
    ],
  },

  'whatsapp-integration': {
    slug: 'whatsapp-integration',
    badge: 'Meta Official WhatsApp Business API Partner',
    title: 'WhatsApp Integration & Business API Automation',
    subtitle: 'Connect WhatsApp Business API with Shopify, WooCommerce, CRM & ERP. Automate order updates, abandoned cart recovery, AI chatbots, catalog checkout, and 24/7 customer support.',
    heroImage: '/home-img/whatsapp-icon-arvian.webp',
    aboutImage: '/home-img/content-marketing.webp',
    aboutTitle: 'Scale Direct-to-Consumer Conversions With WhatsApp Automation',
    aboutDesc: 'With over 500M+ active WhatsApp users in India and an unprecedented 98% message open rate, WhatsApp is the most powerful revenue channel for modern e-commerce brands. EcomVanta helps brands integrate official Meta WhatsApp Cloud API, configure automated sales flows, recover lost carts, and automate 24/7 customer support.',
    servicesGrid: [
      {
        icon: '/brand-img/policy.png',
        title: 'Official Cloud API & Green Tick Verification',
        desc: 'End-to-end Meta Business Manager verification, official WhatsApp Cloud API provisioning, and Green Tick verified badge application.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'E-commerce & CRM Integration',
        desc: 'Seamless zero-code and custom API integration with Shopify, WooCommerce, Magento, Custom Web, Zoho, LeadSquared, and ERPs.',
      },
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Automated Abandoned Cart Recovery',
        desc: 'Trigger personalized discount messages with 1-click checkout links within 15 minutes of checkout abandonment to recover 25-40% lost sales.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Instant Order & Logistics Alerts',
        desc: 'Automated transactional notifications for order confirmations, live shipment tracking links, NDR (Non-Delivery Report) address re-confirmation, and COD verification.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'AI Chatbots & Live Agent Routing',
        desc: 'Intelligent conversational AI bots to handle FAQs, return/exchange requests, sizing guides, and smooth handover to human support agents.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'WhatsApp Catalog & Interactive Checkout',
        desc: 'Native in-chat product showcases, quick-reply carousels, payment gateway links (UPI/Razorpay), and frictionless re-ordering.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '98% Open Rate & Instant Engagement',
        desc: 'Reach customers where they spend the most time with 5X higher response rates than traditional email and SMS.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: '35%+ Cart Recovery Multiplier',
        desc: 'Proven automated recovery sequences that turn dropped checkouts into high-margin paid orders on autopilot.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: '100% Meta Compliance & Anti-Spam Protection',
        desc: 'Strict adherence to Meta quality rating guidelines to protect your business phone number from bans and rate limiting.',
      },
    ],
    faqs: [
      {
        question: 'What is the WhatsApp Business API and how does it differ from regular WhatsApp Business app?',
        answer: 'WhatsApp Business API is designed for growing and medium-to-large businesses. It allows unlimited team members to chat from one number, integrates directly with your Shopify/eCommerce store, enables automated notifications (order updates, abandoned carts), broadcasts promotional campaigns to thousands of opt-in users, and provides AI chatbot capabilities.',
      },
      {
        question: 'Can you help get the Official WhatsApp Green Tick badge?',
        answer: 'Yes, we assist eligible brands with Meta Business Manager verification, notable brand press coverage submission, and the official Green Tick verification process.',
      },
    ],
  },

  'sms-voice-call-whatsapp-marketing-services': {
    slug: 'sms-voice-call-whatsapp-marketing-services',
    badge: 'Omnichannel Direct Outreach & Performance Marketing',
    title: 'SMS, Voice Call & WhatsApp Marketing Services',
    subtitle: 'Scale high-ROI omnichannel customer acquisition and retention. Deploy promotional Bulk SMS, automated OBD voice calls, interactive IVR broadcasts, and hyper-targeted WhatsApp marketing campaigns.',
    heroImage: '/home-img/content-marketing.webp',
    aboutImage: '/home-img/Amazon-account-management.webp',
    aboutTitle: 'Reach Millions of Shoppers Directly on Their Mobile Devices',
    aboutDesc: 'Email alone is no longer enough to scale modern brands. Combining Bulk SMS, Automated Outbound Voice Calls (OBD/IVR), and WhatsApp Marketing creates a powerful 360-degree outreach strategy that maximizes festival sale revenue, re-engages dormant customers, and slashes customer acquisition cost (CAC).',
    servicesGrid: [
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Promotional & Transactional Bulk SMS',
        desc: 'High-throughput DLT-approved SMS gateways with 99.9% delivery rate, dynamic name personalization, URL shorteners, and click tracking.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Voice Broadcasting & OBD Calling',
        desc: 'Automated high-volume recorded voice broadcasts for flash sale announcements, festival discounts, event invitations, and VIP customer alerts.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Interactive IVR & Lead Qualification',
        desc: 'Smart press-1 key input voice campaigns to instantly qualify prospective wholesale buyers, bulk order leads, and direct calls to your sales team.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Targeted WhatsApp Broadcast Blasts',
        desc: 'Rich media WhatsApp campaigns with image banners, videos, CTA buttons, and discount promo codes with instant 98% open rates.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Audience Segmentation & RFM Clustering',
        desc: 'Segment customer lists based on Recency, Frequency, and Monetary value (RFM) to deliver the right message at the right purchase cycle.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'DLT Registration & Regulatory Compliance',
        desc: 'Complete assistance with TRAI DLT portal registration, header/sender ID whitelisting, and template approval with zero compliance bottlenecks.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '10X Higher Response Rate',
        desc: 'Mobile-first messaging yields up to 45% click-through and interaction rates compared to traditional channels.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Instant Multi-Channel Delivery',
        desc: 'Transmit up to 100,000+ messages and voice calls per minute during peak festival flash sales and product launches.',
      },
      {
        icon: '/css/Active issue resolution (2).png',
        title: '100% TRAI DLT & Meta Compliant',
        desc: 'Zero risk of spam blacklisting or telecom penalties with strictly compliant sender IDs and template approvals.',
      },
    ],
    faqs: [
      {
        question: 'What is TRAI DLT registration and is it required for SMS marketing in India?',
        answer: 'Yes, as per TRAI regulations in India, every business sending commercial SMS must register their entity, sender IDs (headers), and SMS content templates on an authorized DLT portal (such as Jio, Airtel, Vodafone, or BSNL). EcomVanta handles the full DLT registration and template approval process for you.',
      },
      {
        question: 'How do automated Voice Call broadcasts (OBD) work for e-commerce?',
        answer: 'Outbound Dialing (OBD) automatically calls customer phone lists simultaneously and plays a pre-recorded audio announcement (e.g., announcing a 50% festival sale or reminding them of an urgent order status). Shoppers can interact by pressing numbers on their phone keypad to receive a WhatsApp link or talk to an agent.',
      },
      {
        question: 'Can we send WhatsApp broadcasts to customers who haven\'t saved our number?',
        answer: 'Yes, via the official WhatsApp Business API, you can send pre-approved template broadcast messages to opted-in customer phone numbers regardless of whether they have saved your contact details in their phone address book.',
      },
      {
        question: 'How do you measure the ROI of multi-channel marketing campaigns?',
        answer: 'We provide comprehensive real-time dashboards tracking delivery rates, open rates, unique click-through rates (CTR), UTM-tagged purchases, total revenue generated, and overall return on ad spend (ROAS).',
      },
    ],
  },

  'marketing-whatsapp-sms-voice': {
    slug: 'marketing-whatsapp-sms-voice',
    badge: 'Omnichannel Direct Outreach & Performance Marketing',
    title: 'SMS, Voice Call & WhatsApp Marketing Services',
    subtitle: 'Scale high-ROI omnichannel customer acquisition and retention. Deploy promotional Bulk SMS, automated OBD voice calls, interactive IVR broadcasts, and hyper-targeted WhatsApp marketing campaigns.',
    heroImage: '/home-img/content-marketing.webp',
    aboutImage: '/home-img/Amazon-account-management.webp',
    aboutTitle: 'Reach Millions of Shoppers Directly on Their Mobile Devices',
    aboutDesc: 'Email alone is no longer enough to scale modern brands. Combining Bulk SMS, Automated Outbound Voice Calls (OBD/IVR), and WhatsApp Marketing creates a powerful 360-degree outreach strategy that maximizes festival sale revenue, re-engages dormant customers, and slashes customer acquisition cost (CAC).',
    servicesGrid: [
      {
        icon: '/brand-img/bullhorn.png',
        title: 'Promotional & Transactional Bulk SMS',
        desc: 'High-throughput DLT-approved SMS gateways with 99.9% delivery rate, dynamic name personalization, URL shorteners, and click tracking.',
      },
      {
        icon: '/brand-img/customer-service.png',
        title: 'Voice Broadcasting & OBD Calling',
        desc: 'Automated high-volume recorded voice broadcasts for flash sale announcements, festival discounts, event invitations, and VIP customer alerts.',
      },
      {
        icon: '/brand-img/policy.png',
        title: 'Interactive IVR & Lead Qualification',
        desc: 'Smart press-1 key input voice campaigns to instantly qualify prospective wholesale buyers, bulk order leads, and direct calls to your sales team.',
      },
      {
        icon: '/brand-img/dashboard.png',
        title: 'Targeted WhatsApp Broadcast Blasts',
        desc: 'Rich media WhatsApp campaigns with image banners, videos, CTA buttons, and discount promo codes with instant 98% open rates.',
      },
      {
        icon: '/brand-img/report.png',
        title: 'Audience Segmentation & RFM Clustering',
        desc: 'Segment customer lists based on Recency, Frequency, and Monetary value (RFM) to deliver the right message at the right purchase cycle.',
      },
      {
        icon: '/brand-img/inventory-management.png',
        title: 'DLT Registration & Regulatory Compliance',
        desc: 'Complete assistance with TRAI DLT portal registration, header/sender ID whitelisting, and template approval with zero compliance bottlenecks.',
      },
    ],
    advantages: [
      {
        icon: '/css/Special expertise (2).png',
        title: '10X Higher Response Rate',
        desc: 'Mobile-first messaging yields up to 45% click-through and interaction rates compared to traditional channels.',
      },
      {
        icon: '/css/Increase in sales performance (2).png',
        title: 'Instant Multi-Channel Delivery',
        desc: 'Transmit up to 100,000+ messages and voice calls per minute during peak festival flash sales and product launches.',
      },
    ],
    faqs: [
      {
        question: 'What is TRAI DLT registration and is it required for SMS marketing in India?',
        answer: 'Yes, as per TRAI regulations in India, every business sending commercial SMS must register their entity, sender IDs (headers), and SMS content templates on an authorized DLT portal. EcomVanta handles the full DLT registration for you.',
      },
    ],
  },
};

