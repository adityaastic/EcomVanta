import { SERVICES_DATABASE, ServiceData } from './serviceData';
import { CASE_STUDIES_DATA, CaseStudyData } from './caseStudyData';
import {
  SeoMetaItem,
  BlogRevision,
  SeoSystemConfig,
  DEFAULT_SEO_CONFIG,
  createEmptySeoMeta,
} from './seoTypes';

export * from './seoTypes';

export interface SiteBranding {
  siteName: string;
  siteTagline: string;
  metaDescription: string;
  headerLogo: string;
  darkLogo: string;
  footerLogo: string;
  favicon: string;
  topbarPhone: string;
  tollFreePhone: string;
  email: string;
  workingHours: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    youtube: string;
  };
  // Catalog / Brochure Settings
  catalogPdfUrl?: string;
  catalogButtonText?: string;
  showCatalogInHeader?: boolean;
  showCatalogInHero?: boolean;
  showCatalogInFooter?: boolean;
  showCatalogInFloating?: boolean;
}

export interface HeroSectionContent {
  badgeText: string;
  titlePart1: string;
  titleHighlight: string;
  titlePart2: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  heroImage: string;
  heroBadgeNumber: string;
  heroBadgeText: string;
  trustRating: string;
  trustRatingCount: string;
}

export interface StatCounter {
  id: string;
  number: string;
  label: string;
  description: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  logo: string;
}

export interface PlatformService {
  id: string;
  name: string;
  logo: string;
  title: string;
  desc: string;
  link: string;
}

export interface ListingServiceCard {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  desc: string;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  role?: string;
  videoUrl: string;
  thumbnail?: string;
  quote?: string;
  rating?: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CtaBannerContent {
  tagline: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
}

export interface SellerSpotlightContent {
  badgeText?: string;
  titlePart1?: string;
  titleHighlight?: string;
  subtitle?: string;
  points?: string[];
  buttonText?: string;
  videoUrl?: string;
  quote?: string;
  author?: string;
  rating?: number;
}

export interface ServiceTickerItemData {
  id?: string;
  title: string;
  href: string;
  category: string;
  badgeBg?: string;
}

export interface EcommercePlatformItemData {
  id?: string;
  name: string;
  logo: string;
  href: string;
}

export interface VideoHeroStatItem {
  value: string;
  label: string;
}

export interface VideoHeroContent {
  enabled?: boolean;
  videoUrl?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  stats?: VideoHeroStatItem[];
}

export interface HomepageContent {
  videoHero?: VideoHeroContent;
  hero: HeroSectionContent;
  stats: StatCounter[];
  brandLogos: BrandLogo[];
  brandLogosHeading?: string;
  servicesTickerHeading?: string;
  servicesTickerSubtitle?: string;
  servicesTickerItems?: ServiceTickerItemData[];
  ecommercePlatformsHeading?: string;
  ecommercePlatformsSubtitle?: string;
  ecommercePlatforms?: EcommercePlatformItemData[];
  heroVideo?: string;
  platforms: PlatformService[];
  listingServices: ListingServiceCard[];
  advantages: {
    title: string;
    subtitle: string;
    items: AdvantageItem[];
  };
  clientVideos: VideoTestimonial[];
  sellerSpotlight?: SellerSpotlightContent;
  faqs: FaqItem[];
  bottomCta: CtaBannerContent;
  seoContentBlocks?: SeoContentBlock[];
  showFounderSection?: boolean;
}

export interface SeoContentBlock {
  id: string;
  heading: string;
  content: string;
}

export interface FounderMilestone {
  id: string;
  number: string;
  label: string;
  desc: string;
}

export interface FounderPrinciple {
  id: string;
  title: string;
  description: string;
}

export interface FounderPageContent {
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  founderName?: string;
  founderRole?: string;
  founderImage?: string;
  founderQuote?: string;
  bioHeading?: string;
  bioParagraphs?: string[];
  milestones?: FounderMilestone[];
  principles?: FounderPrinciple[];
  visionHeading?: string;
  visionText?: string;
  calloutTitle?: string;
  calloutDesc?: string;
}


export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  imageAlt?: string;
  imageTitle?: string;
  imageCaption?: string;
  author: string;
  authorRole?: string;
  authorBio?: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  scheduledAt?: string;
  status?: 'published' | 'draft' | 'scheduled';
  excerpt: string;
  customIntro?: string;
  content: string;
  link?: string;
  tags?: string[];
  featured?: boolean;
  relatedSlugs?: string[];
  showToc?: boolean;
  enableToc?: boolean;
  readingTime?: number;
  readingTimeMinutes?: number;
  wordCount?: number;
  seo?: SeoMetaItem;
  revisions?: BlogRevision[];
  previousSlugs?: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  status: 'Open' | 'Closed';
}

export interface AboutUsContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  storyTitle: string;
  storyDesc: string;
  missionTitle: string;
  missionDesc: string;
  visionTitle: string;
  visionDesc: string;
  founderQuote?: string;
  founderDesc?: string;
  founderName?: string;
  founderTitle?: string;
  founderImage?: string;
  team: {
    id: string;
    name: string;
    designation: string;
    image: string;
  }[];
}

export interface ContactFooterContent {
  officeAddress: string;
  supportEmail: string;
  contactPhone: string;
  salesPhone: string;
  mapEmbedUrl: string;
  footerAboutText: string;
  copyrightText: string;
}

export interface CareerPageContent {
  heroBadge: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  pitchText: string;
  pitchBadges: string[];
  bannerImage: string;
  whyJoinTitle: string;
  whyJoinDescription: string;
  whyJoinPoints: string[];
  whatYouGetTitle: string;
  whatYouGetItems: { id: string; number: string; title: string }[];
  openingsHeadingBadge: string;
  openingsHeadingTitle: string;
}

export interface SiteContentData {
  branding: SiteBranding;
  homepage: HomepageContent;
  services: Record<string, ServiceData>;
  caseStudies: Record<string, CaseStudyData>;
  blogs: BlogPostItem[];
  careers: JobOpening[];
  careerPage: CareerPageContent;
  aboutUs: AboutUsContent;
  founder?: FounderPageContent;
  contactFooter: ContactFooterContent;
  seoConfig?: SeoSystemConfig;
  seoSystem: SeoSystemConfig;
}

export const INITIAL_BLOGS: BlogPostItem[] = [
  {
    id: '1',
    slug: 'ecommerce-account-management',
    title: 'eCommerce Account Management: What Does an Account Manager Actually Do?',
    category: 'eCommerce',
    image: '/blog/images/ecom-into.png',
    imageAlt: 'eCommerce Account Management workflow and seller dashboard',
    imageTitle: 'eCommerce Account Management by EcomVanta',
    imageCaption: 'End-to-end marketplace account management drives sustained GMV growth across Amazon, Flipkart, and Blinkit.',
    author: 'Arvind Ajmera',
    authorRole: 'Senior Marketplace Strategist',
    date: 'August 31, 2026',
    publishedAt: '2026-08-31T10:00:00.000Z',
    updatedAt: '2026-09-15T12:00:00.000Z',
    status: 'published',
    featured: true,
    showToc: true,
    tags: ['eCommerce Account Management', 'Amazon Seller Central', 'Flipkart Growth', 'Buy Box Strategy'],
    relatedSlugs: ['amazon-selling-mistakes-that-reduce-sales-and-profits', 'how-to-sell-on-myntra-seller-onboarding-guide'],
    excerpt: 'Discover the exact responsibilities of a professional eCommerce account manager and how they multiply your marketplace sales across Amazon, Flipkart, and Blinkit.',
    customIntro: 'Scaling a consumer brand across Indian marketplaces requires daily algorithmic monitoring, catalog SEO, and profitable PPC advertising.',
    content: `<h2>What Is eCommerce Account Management?</h2>
<p>Professional <strong>eCommerce Account Management</strong> is the complete operational, strategic, and promotional handling of a brand's seller portals across platforms like <a href="/amazon-seller-account-management-services">Amazon Seller Account Management</a>, <a href="/flipkart-account-management-services">Flipkart Account Management</a>, <a href="/meesho-account-management-services">Meesho</a>, and Quick Commerce dark stores.</p>
<p>Instead of juggling inventory spreadsheets, suppressed listings, and rising ad costs alone, brands partner with dedicated account managers who monitor key performance indicators every single day.</p>
<h2>Core Responsibilities of an Account Manager</h2>
<h3>1. Search-Optimized Cataloging &amp; A+ Content</h3>
<p>Your product listing is your digital storefront. Account managers conduct deep keyword research to craft high-converting product titles, bullet points, backend search terms, and Enhanced Brand Content (A+ modules). Check out our specialized <a href="/ecommerce-product-listing-services">eCommerce Product Listing Services</a> to see how structured taxonomy improves organic rank.</p>
<h3>2. Sponsored Ads &amp; ACOS Optimization</h3>
<p>Running marketplace PPC without negative keyword harvesting quickly drains margins. A dedicated manager structures Sponsored Products, Sponsored Brands, and Flipkart PLA campaigns to lower ACOS and maximize ROAS.</p>
<h3>3. Inventory Forecasting &amp; Buy Box Protection</h3>
<ul>
  <li>Real-time FBA and Smart Fulfilment warehouse stock planning.</li>
  <li>Automated Buy Box win-rate tracking and dynamic pricing alerts.</li>
  <li>Proactive account health defense against policy notices and listing suppressions.</li>
</ul>
<h2>When Should Your Brand Hire an eCommerce Agency?</h2>
<p>If your internal team spends more time resolving Seller Support tickets than developing great products, partnering with <a href="/contact-us">EcomVanta's certified account specialists</a> provides an immediate turnkey growth department.</p>`,
    link: '/blogs/ecommerce-account-management',
    seo: createEmptySeoMeta({
      focusKeyword: 'eCommerce Account Management',
      secondaryKeywords: ['Marketplace Account Manager', 'Amazon Seller Management', 'Flipkart Account Handling'],
      seoTitle: 'eCommerce Account Management: What Does an Account Manager Do? | EcomVanta',
      metaDescription: 'Discover the exact responsibilities of a professional eCommerce account manager and how they multiply your marketplace sales on Amazon, Flipkart & Blinkit.',
      canonicalUrl: 'https://www.ecomvanta.in/blogs/ecommerce-account-management',
      breadcrumbTitle: 'eCommerce Account Management Guide',
      schemaType: 'BlogPosting',
      ogType: 'article',
      isCustomized: true,
    }),
  },
  {
    id: '2',
    slug: 'how-to-sell-on-ajio-seller-registration-guide',
    title: 'How to Sell on AJIO: Complete Seller Registration and Account Setup Guide',
    category: 'Ajio',
    image: '/blog/images/ajio-into.png',
    imageAlt: 'How to Sell on AJIO Seller Registration Guide',
    imageTitle: 'AJIO Seller Onboarding & Registration Guide',
    author: 'Arvind Ajmera',
    authorRole: 'Fashion Marketplace Consultant',
    date: 'August 22, 2026',
    publishedAt: '2026-08-22T10:00:00.000Z',
    updatedAt: '2026-09-10T10:00:00.000Z',
    status: 'published',
    showToc: true,
    tags: ['AJIO Seller Registration', 'Fashion eCommerce', 'Reliance Retail', 'Apparel Onboarding'],
    relatedSlugs: ['how-to-sell-on-myntra-seller-onboarding-guide', 'ecommerce-account-management'],
    excerpt: 'Step-by-step tutorial on registering as a brand partner on AJIO, listing catalog products, and scaling fashion sales.',
    content: `<h2>Why Fashion &amp; Lifestyle Brands Must Sell on AJIO</h2>
<p><strong>AJIO</strong> is Reliance Retail’s premier digital fashion powerhouse, attracting millions of trend-conscious shoppers across Tier 1, Tier 2, and Tier 3 cities in India. Through our <a href="/ajio-seller-onboarding-services">AJIO Seller Onboarding Services</a>, fashion and D2C apparel brands can fast-track their vendor approval.</p>
<h2>Documents Required for AJIO Seller Registration</h2>
<ul>
  <li>Active GSTIN Certificate and PAN Card of the business entity.</li>
  <li>Trademark Registration Certificate or official Brand Authorization Letter.</li>
  <li>Cancelled cheque and bank account verification details.</li>
  <li>High-resolution brand lookbook and SKU catalog sheet with HSN codes.</li>
</ul>
<h2>Step-by-Step AJIO Onboarding Process</h2>
<h3>Step 1: Brand Evaluation &amp; Portal Application</h3>
<p>Submit your brand profile, category mix, and price range for curation approval by the AJIO category merchandising team.</p>
<h3>Step 2: Model Shoot &amp; Cataloging Guidelines</h3>
<p>AJIO enforces strict visual merchandising standards. Ensure your product photography follows AJIO's background, pose, and lighting specifications before uploading master catalog templates.</p>
<p>Need help getting approved? Explore our <a href="/myntra-account-management-services">Myntra &amp; Fashion Portal Management</a> or <a href="/contact-us">book a free fashion onboarding consultation</a> today.</p>`,
    link: '/blogs/how-to-sell-on-ajio-seller-registration-guide',
    seo: createEmptySeoMeta({
      focusKeyword: 'How to Sell on AJIO',
      secondaryKeywords: ['AJIO Seller Registration', 'AJIO Onboarding Guide', 'Sell Fashion on AJIO'],
      seoTitle: 'How to Sell on AJIO: Complete Seller Registration & Setup Guide | EcomVanta',
      metaDescription: 'Step-by-step tutorial on how to sell on AJIO. Learn the required documents, brand approval workflow, catalog standards, and strategies to scale fashion sales.',
      canonicalUrl: 'https://www.ecomvanta.in/blogs/how-to-sell-on-ajio-seller-registration-guide',
      breadcrumbTitle: 'How to Sell on AJIO',
      schemaType: 'BlogPosting',
      ogType: 'article',
      isCustomized: true,
    }),
  },
  {
    id: '3',
    slug: 'how-to-sell-on-myntra-seller-onboarding-guide',
    title: 'How to Sell on Myntra: Seller Onboarding Guide 2026',
    category: 'Myntra',
    image: '/blog/images/Become a Myntra Seller.jpeg',
    imageAlt: 'How to Sell on Myntra Seller Onboarding Guide 2026',
    imageTitle: 'Myntra Seller Onboarding Guide 2026',
    author: 'Arvind Ajmera',
    authorRole: 'Fashion Marketplace Consultant',
    date: 'August 11, 2026',
    publishedAt: '2026-08-11T10:00:00.000Z',
    updatedAt: '2026-09-05T10:00:00.000Z',
    status: 'published',
    showToc: true,
    tags: ['Myntra Seller Onboarding', 'Sell on Myntra', 'Fashion Marketplace', 'EORS Sale'],
    relatedSlugs: ['how-to-sell-on-ajio-seller-registration-guide', 'ecommerce-account-management'],
    excerpt: 'Complete walkthrough of getting your apparel or lifestyle brand listed on Myntra Seller Portal in 2026.',
    content: `<h2>Scaling Your Fashion Brand on Myntra in 2026</h2>
<p><strong>How to Sell on Myntra</strong> is one of the most searched questions among Indian apparel, footwear, beauty, and home decor founders. Myntra offers unmatched brand prestige and massive order volume during flagship events like the End of Reason Sale (EORS).</p>
<h2>Eligibility &amp; Brand Approval Criteria</h2>
<p>Unlike open marketplaces, Myntra curates brands based on product quality, catalog depth (minimum 30–50 live styles recommended), and trademark ownership. Our <a href="/myntra-seller-onboarding-services">Myntra Seller Onboarding Services</a> handle the entire pitch deck and category manager approval for your brand.</p>
<h2>Key Steps to Launch on Myntra Partner Portal</h2>
<h3>1. Brand Pitch Deck &amp; Sample Quality Check</h3>
<p>Prepare a compelling lookbook showcasing fabric quality, MRP positioning, and manufacturing capacity.</p>
<h3>2. Style Tagging &amp; Attribute Mapping</h3>
<p>Accurate attribute mapping (neck type, sleeve length, fabric composition, occasion) is critical for Myntra's internal search engine. Partner with our <a href="/myntra-account-management-services">Myntra Account Management Services</a> team to maximize visibility and PLA ad ROI.</p>`,
    link: '/blogs/how-to-sell-on-myntra-seller-onboarding-guide',
    seo: createEmptySeoMeta({
      focusKeyword: 'How to Sell on Myntra',
      secondaryKeywords: ['Myntra Seller Onboarding', 'Myntra Partner Registration', 'Sell Apparel on Myntra'],
      seoTitle: 'How to Sell on Myntra: Complete Seller Onboarding Guide 2026 | EcomVanta',
      metaDescription: 'Complete walkthrough on how to sell on Myntra in 2026. Learn eligibility criteria, required documents, style cataloging, and EORS growth strategies.',
      canonicalUrl: 'https://www.ecomvanta.in/blogs/how-to-sell-on-myntra-seller-onboarding-guide',
      breadcrumbTitle: 'How to Sell on Myntra',
      schemaType: 'BlogPosting',
      ogType: 'article',
      isCustomized: true,
    }),
  },
  {
    id: '4',
    slug: 'amazon-selling-mistakes-that-reduce-sales-and-profits',
    title: '10 Amazon Selling Mistakes That Reduce Sales and Profits',
    category: 'Amazon',
    image: '/blogs-img/10 Amazon Selling Mistakes That Reduce Sales and Profits.webp',
    imageAlt: '10 Amazon Selling Mistakes That Reduce Sales and Profits',
    imageTitle: 'Top 10 Amazon Selling Mistakes to Avoid',
    author: 'Arvind Ajmera',
    authorRole: 'Amazon Growth Specialist',
    date: 'July 23, 2026',
    publishedAt: '2026-07-23T10:00:00.000Z',
    updatedAt: '2026-09-01T10:00:00.000Z',
    status: 'published',
    showToc: true,
    tags: ['Amazon Selling Mistakes', 'Amazon PPC', 'Amazon FBA', 'Listing Optimization'],
    relatedSlugs: ['ecommerce-account-management', 'blinkit-seller-onboarding-guide'],
    excerpt: 'Avoid these critical mistakes in keyword targeting, FBA inventory limits, Buy Box pricing, and PPC bidding.',
    content: `<h2>Why Most Amazon Sellers Lose Profit Margin</h2>
<p>Identifying common <strong>Amazon Selling Mistakes</strong> early can save your brand lakhs in wasted ad spend and lost organic rankings. Through our <a href="/amazon-seller-account-management-services">Amazon Seller Account Management Services</a>, we audit hundreds of seller accounts every quarter.</p>
<h2>Top Mistakes Costing Sellers Revenue</h2>
<h3>1. Ignoring Backend Search Terms and A+ Cataloging</h3>
<p>Many sellers stuff keywords into titles while leaving backend generic keywords blank or neglecting mobile-friendly infographics. Professional <a href="/amazon-product-listing-catalogue-services">Amazon Product Listing &amp; Catalogue Services</a> ensure every high-intent search query is indexed.</p>
<h3>2. Running Auto PPC Campaigns Without Negative Keywords</h3>
<p>Letting automatic Sponsored Product campaigns run unchecked leads to high ACOS on irrelevant clicks. Weekly search-term harvesting and negative exact matching are mandatory for profitable scaling.</p>
<h3>3. Stocking Out of Hero SKUs on FBA</h3>
<p>Going out of stock resets your BSR velocity. Read our <a href="/kay-kay-industries-amazon-case-study">Kay Kay Industries Amazon Case Study</a> to see how disciplined FBA forecasting and PPC restructuring delivered +340% revenue growth.</p>`,
    link: '/blogs/amazon-selling-mistakes-that-reduce-sales-and-profits',
    seo: createEmptySeoMeta({
      focusKeyword: 'Amazon Selling Mistakes',
      secondaryKeywords: ['Amazon Seller Tips', 'Reduce Amazon ACOS', 'Amazon FBA Optimization'],
      seoTitle: '10 Amazon Selling Mistakes That Reduce Sales and Profits | EcomVanta',
      metaDescription: 'Avoid these 10 costly Amazon selling mistakes in keyword targeting, FBA stock planning, Buy Box pricing, and Sponsored Ads PPC bidding.',
      canonicalUrl: 'https://www.ecomvanta.in/blogs/amazon-selling-mistakes-that-reduce-sales-and-profits',
      breadcrumbTitle: '10 Amazon Selling Mistakes',
      schemaType: 'BlogPosting',
      ogType: 'article',
      isCustomized: true,
    }),
  },
  {
    id: '5',
    slug: 'blinkit-seller-onboarding-guide',
    title: 'Blinkit Seller Onboarding Guide: How to Sell on Blinkit Successfully',
    category: 'Blinkit',
    image: '/blogs-img/Blinkit Seller Onboarding Guide (2026) How to Sell on Blinkit Successfully.webp',
    imageAlt: 'Blinkit Seller Onboarding Guide - Sell on Quick Commerce',
    imageTitle: 'Blinkit Seller Onboarding Guide',
    author: 'Arvind Ajmera',
    authorRole: 'Quick Commerce Lead',
    date: 'July 10, 2026',
    publishedAt: '2026-07-10T10:00:00.000Z',
    updatedAt: '2026-08-25T10:00:00.000Z',
    status: 'published',
    showToc: true,
    tags: ['Blinkit Seller Onboarding', 'Quick Commerce India', 'Dark Store Listing', 'Sell on Blinkit'],
    relatedSlugs: ['zepto-seller-registration-guide', 'ecommerce-account-management'],
    excerpt: 'Quick Commerce is exploding in India. Learn how to list your products in Blinkit dark stores across major metros.',
    content: `<h2>Complete Blinkit Seller Onboarding Guide for D2C Brands</h2>
<p>Quick commerce has transformed how urban India shops for groceries, personal care, electronics, and daily essentials. This <strong>Blinkit Seller Onboarding Guide</strong> explains how to list your brand across Blinkit's feeder warehouses and dark stores using our <a href="/blinkit-seller-account-management-services">Blinkit Seller Account Management Services</a>.</p>
<h2>Mandatory Compliance &amp; Documentation</h2>
<ul>
  <li>Multi-state GST registrations or APOB (Additional Place of Business) for target dark store states.</li>
  <li>Valid FSSAI License for food, beverage, and nutraceutical products.</li>
  <li>GS1 Barcode (EAN/UPC) printed clearly on all retail packaging units.</li>
  <li>Trademark certificate and brand authorization documents.</li>
</ul>
<h2>Scaling Velocity inside Blinkit Dark Stores</h2>
<p>Getting listed is only the first step. Maintaining high fill rates against Purchase Orders (POs) and running targeted search banner ads ensure your SKUs aren't delisted due to low off-take. Also explore our <a href="/zepto-seller-onboarding-and-account-management-service">Zepto Seller Onboarding</a> and <a href="/swiggy-instamart-seller-account-management-and-onboarding">Swiggy Instamart Management</a> solutions.</p>`,
    link: '/blogs/blinkit-seller-onboarding-guide',
    seo: createEmptySeoMeta({
      focusKeyword: 'Blinkit Seller Onboarding Guide',
      secondaryKeywords: ['How to Sell on Blinkit', 'Blinkit Dark Store Registration', 'Quick Commerce Onboarding'],
      seoTitle: 'Blinkit Seller Onboarding Guide: How to Sell on Blinkit (2026) | EcomVanta',
      metaDescription: 'Learn how to sell on Blinkit with our step-by-step Blinkit Seller Onboarding Guide. Discover GST, FSSAI, barcode, and dark store PO management rules.',
      canonicalUrl: 'https://www.ecomvanta.in/blogs/blinkit-seller-onboarding-guide',
      breadcrumbTitle: 'Blinkit Seller Onboarding Guide',
      schemaType: 'BlogPosting',
      ogType: 'article',
      isCustomized: true,
    }),
  },
  {
    id: '6',
    slug: 'zepto-seller-registration-guide',
    title: 'How to Sell on Zepto: Complete Zepto Seller Registration Guide',
    category: 'Zepto',
    image: '/blogs-img/How to Sell on Zepto in 2026- Complete Zepto Seller Registration Guide3.webp',
    imageAlt: 'Zepto Seller Registration Guide for 10-Minute Delivery Brands',
    imageTitle: 'Zepto Seller Registration Guide',
    author: 'Arvind Ajmera',
    authorRole: 'Quick Commerce Lead',
    date: 'June 20, 2026',
    publishedAt: '2026-06-20T10:00:00.000Z',
    updatedAt: '2026-08-18T10:00:00.000Z',
    status: 'published',
    showToc: true,
    tags: ['Zepto Seller Registration', 'Quick Commerce', '10 Minute Delivery', 'D2C FMCG'],
    relatedSlugs: ['blinkit-seller-onboarding-guide', 'ecommerce-account-management'],
    excerpt: 'Detailed process for D2C FMCG and grocery brands to partner with Zepto for 10-minute delivery.',
    content: `<h2>How to Complete Your Zepto Seller Registration</h2>
<p>Partnering with Zepto puts your consumer brand in front of millions of high-frequency urban buyers seeking 10-minute doorstep delivery. Our <a href="/zepto-seller-onboarding-and-account-management-service">Zepto Seller Onboarding &amp; Account Management Service</a> helps FMCG, beauty, wellness, and electronics brands launch smoothly.</p>
<h2>Step-by-Step Zepto Vendor Onboarding Workflow</h2>
<h3>1. Category Pitch &amp; Commercial Margin Alignment</h3>
<p>Zepto's category buyers evaluate brand search demand, shelf life, unit economics, and margin structure before issuing a vendor code.</p>
<h3>2. Mother Hub &amp; Dark Store PO Fulfillment</h3>
<p>Once onboarded, brands dispatch inventory to Zepto's regional Mother Hubs with strict appointment scheduling, ASN generation, and barcode labeling compliance. Combine Zepto with <a href="/blinkit-seller-account-management-services">Blinkit Account Management</a> for nationwide Quick Commerce dominance.</p>`,
    link: '/blogs/zepto-seller-registration-guide',
    seo: createEmptySeoMeta({
      focusKeyword: 'Zepto Seller Registration',
      secondaryKeywords: ['How to Sell on Zepto', 'Zepto Vendor Onboarding', 'Quick Commerce India'],
      seoTitle: 'How to Sell on Zepto: Complete Zepto Seller Registration Guide | EcomVanta',
      metaDescription: 'Detailed guide to Zepto Seller Registration for D2C FMCG, beauty, and grocery brands. Learn vendor onboarding, margin setup, and dark store PO fulfillment.',
      canonicalUrl: 'https://www.ecomvanta.in/blogs/zepto-seller-registration-guide',
      breadcrumbTitle: 'Zepto Seller Registration Guide',
      schemaType: 'BlogPosting',
      ogType: 'article',
      isCustomized: true,
    }),
  },
  {
    id: '7',
    slug: 'top-20-best-selling-products-on-ecommerce-marketplaces-during-rakhi',
    title: 'Top 20 Best-Selling Products on eCommerce Marketplaces During Rakhi in India',
    category: 'Sell Online',
    image: '/blog/images/new-blogimag.jpg',
    imageAlt: 'Top 20 Best-Selling Products on eCommerce Marketplaces During Rakhi in India',
    author: 'Arvind Ajmera',
    date: 'August 04, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Discover the highest-converting festive gift hampers, ethnic wear, dry fruits, and personal care categories during the Rakhi marketplace surge.',
    content: `<h2>Festive Season Demand Across Indian Marketplaces</h2><p>Festive seasons starting with Raksha Bandhan trigger massive volume spikes across <a href="/amazon-seller-account-management-services">Amazon</a>, <a href="/flipkart-account-management-services">Flipkart</a>, <a href="/blinkit-seller-account-management-services">Blinkit</a>, and <a href="/zepto-seller-onboarding-and-account-management-service">Zepto</a>. Preparing your FBA and dark store inventory 45 days in advance ensures maximum Buy Box share.</p>`,
    link: '/blogs/top-20-best-selling-products-on-ecommerce-marketplaces-during-rakhi',
  },
  {
    id: '8',
    slug: 'how-to-sell-online-in-india-step-by-step-guide-for-beginners',
    title: 'How to Sell Online in India: Step-by-Step Guide for Beginners',
    category: 'Sell Online',
    image: '/blogs-img/How to Sell Online in India- Step-by-Step Guide for Beginners1.png',
    imageAlt: 'How to Sell Online in India Step-by-Step Guide for Beginners',
    author: 'Arvind Ajmera',
    date: 'June 18, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Complete beginner roadmap to launching your e-commerce brand in India—from GST registration and trademarking to multi-marketplace onboarding.',
    content: `<h2>Launching Your Online Brand in India</h2><p>Learning <strong>How to Sell Online in India</strong> starts with choosing the right marketplace mix—combining <a href="/amazon-seller-account-management-services">Amazon India</a>, <a href="/flipkart-account-management-services">Flipkart</a>, <a href="/meesho-account-management-services">Meesho</a>, and your own <a href="/shopify-store-management-services">Shopify D2C Store</a>.</p>`,
    link: '/blogs/how-to-sell-online-in-india-step-by-step-guide-for-beginners',
  },
  {
    id: '9',
    slug: 'how-to-solve-flipkart-seller-account-suspension-issues',
    title: 'How to Solve Flipkart Seller Account Suspension Issues',
    category: 'Flipkart',
    image: '/blogs-img/How to Solve Flipkart Seller Account Suspension Issues.webp',
    imageAlt: 'How to Solve Flipkart Seller Account Suspension Issues',
    author: 'Arvind Ajmera',
    date: 'June 17, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Step-by-step Plan of Action (POA) guide to appealing and reinstating suspended or on-hold Flipkart Seller Hub accounts.',
    content: `<h2>Reinstating a Suspended Flipkart Seller Account</h2><p>If your Flipkart seller portal is on hold due to seller cancellations, RTD breaches, or brand infringement notices, our <a href="/flipkart-account-management-services">Flipkart Account Management Services</a> team drafts compliant root-cause Plans of Action (POA) for rapid reactivation.</p>`,
    link: '/blogs/how-to-solve-flipkart-seller-account-suspension-issues',
  },
  {
    id: '10',
    slug: 'how-to-list-products-on-flipkart-seller-central-2026',
    title: 'How to List Products on Flipkart Seller Central 2026',
    category: 'Flipkart',
    image: '/blogs-img/How to List Products on Flipkart Seller Central.webp',
    imageAlt: 'How to List Products on Flipkart Seller Central 2026',
    author: 'Arvind Ajmera',
    date: 'May 28, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Master single and bulk Excel catalog uploads, Listing Quality Score (LQS) rules, and image guidelines on Flipkart Seller Hub.',
    content: `<h2>Optimizing Flipkart Product Listings for Higher Visibility</h2><p>High Listing Quality Scores (LQS) directly boost organic impressions on Flipkart. Explore our <a href="/flipkart-catalogue-product-listing-services">Flipkart Catalogue &amp; Product Listing Services</a> to scale your catalog effortlessly.</p>`,
    link: '/blogs/how-to-list-products-on-flipkart-seller-central-2026',
  },
  {
    id: '11',
    slug: 'how-to-create-a-flipkart-seller-account-in-2026',
    title: 'How to Create a Flipkart Seller Account in 2026 | Step-by-Step Guide',
    category: 'Flipkart',
    image: '/blogs-img/How to Create a Flipkart Seller Account in 2026 Step-by-Step 1.png',
    imageAlt: 'How to Create a Flipkart Seller Account in 2026 Step-by-Step Guide',
    author: 'Arvind Ajmera',
    date: 'May 25, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Everything you need to register on Flipkart Seller Hub: GSTIN, bank verification, pickup pin code setup, and brand approval.',
    content: `<h2>Flipkart Seller Registration Walkthrough</h2><p>Starting on Flipkart takes less than 48 hours when your GSTIN, trademark authorization, and pickup address are properly configured. Partner with our <a href="/flipkart-account-management-services">Flipkart Account Management</a> specialists for turnkey onboarding.</p>`,
    link: '/blogs/how-to-create-a-flipkart-seller-account-in-2026',
  },
  {
    id: '12',
    slug: 'complete-guide-on-how-to-sell-products-online-on-meesho',
    title: 'A Complete Guide on How to Sell Products Online on Meesho',
    category: 'Meesho',
    image: '/images/A Complete Guide on How to Sell Products Online on Meesho in 2026.webp',
    imageAlt: 'A Complete Guide on How to Sell Products Online on Meesho',
    author: 'Arvind Ajmera',
    date: 'April 08, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Leverage Meesho’s 0% commission model to scale high-volume value fashion, home utility, and lifestyle products across Tier 2 & 3 India.',
    content: `<h2>Scaling High-Volume Orders on Meesho</h2><p>Meesho's zero-commission structure allows manufacturers and D2C brands to price competitively. Learn how our <a href="/meesho-account-management-services">Meesho Account Management Services</a> optimize Next-Day Dispatch (NDD) and Meesho Ads.</p>`,
    link: '/blogs/complete-guide-on-how-to-sell-products-online-on-meesho',
  },
  {
    id: '13',
    slug: 'understanding-acos-tacos-and-roas-for-amazon-advertising',
    title: 'Understanding ACoS, TACoS & ROAS for Amazon Advertising',
    category: 'Amazon',
    image: '/images/Understanding ACoS, TACoS & ROAS for Amazon Advertising.webp',
    imageAlt: 'Understanding ACoS, TACoS & ROAS for Amazon Advertising',
    author: 'Arvind Ajmera',
    date: 'Feb 23, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Master the three most important marketplace advertising metrics—ACoS, TACoS, and ROAS—to scale profitable Amazon PPC campaigns.',
    content: `<h2>ACoS vs. TACoS vs. ROAS Explained</h2><p>Tracking Advertising Cost of Sales (ACoS) alongside Total Advertising Cost of Sales (TACoS) ensures your <a href="/amazon-advertising-ppc-management">Amazon PPC campaigns</a> build long-term organic velocity.</p>`,
    link: '/blogs/understanding-acos-tacos-and-roas-for-amazon-advertising',
  },
  {
    id: '14',
    slug: 'essential-shopify-product-listing-optimization-for-maximum-visibility',
    title: 'Essential Shopify Product Listing Optimization for Maximum Visibility',
    category: 'Shopify',
    image: '/images/understanding-acos-tacos-and-roas-for-amazon-advertising.jpg',
    imageAlt: 'Essential Shopify Product Listing Optimization for Maximum Visibility',
    author: 'Arvind Ajmera',
    date: 'Feb 12, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Optimize your Shopify D2C product pages for Google organic search, Core Web Vitals speed, and high checkout conversion rates.',
    content: `<h2>High-Converting Shopify Product Pages</h2><p>Combine structured product schema, fast WebP imagery, and persuasive copywriting with our <a href="/shopify-store-management-services">Shopify Store Management Services</a>.</p>`,
    link: '/blogs/essential-shopify-product-listing-optimization-for-maximum-visibility',
  },
  {
    id: '15',
    slug: 'complete-guide-to-choosing-the-right-etsy-account-management-services',
    title: 'Complete Guide to Choosing the Right Etsy Account Management Services',
    category: 'Etsy',
    image: '/blogs-img/complete-guide-to-choosing-the-right-etsy-account-management-services.webp',
    imageAlt: 'Complete Guide to Choosing the Right Etsy Account Management Services',
    author: 'Arvind Ajmera',
    date: 'January 27, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'How Indian handicrafts, jewelry, and vintage exporters can scale international sales on Etsy with professional account management.',
    content: `<h2>Selling Globally on Etsy from India</h2><p>Optimize your 13 Etsy listing tags, international shipping profiles, and Etsy Offsite Ads with <a href="/contact-us">EcomVanta's global marketplace specialists</a>.</p>`,
    link: '/blogs/complete-guide-to-choosing-the-right-etsy-account-management-services',
  },
  {
    id: '16',
    slug: 'top-10-essentials-for-high-converting-amazon-product-descriptions',
    title: 'Top 10 Essentials for High-Converting Amazon Product Descriptions',
    category: 'Amazon',
    image: '/images/how-to-write-high-converting-amazon-product-descriptions.php.webp',
    imageAlt: 'Top 10 Essentials for High-Converting Amazon Product Descriptions',
    author: 'Arvind Ajmera',
    date: 'January 07, 2026',
    status: 'published',
    showToc: true,
    excerpt: 'Write benefit-driven Amazon bullet points, A+ Brand Story modules, and backend search terms that rank and convert.',
    content: `<h2>Crafting High-Converting Amazon Listings</h2><p>Our <a href="/amazon-product-listing-catalogue-services">Amazon Product Listing &amp; Catalogue Services</a> combine high-volume keyword placement with persuasive buyer psychology.</p>`,
    link: '/blogs/top-10-essentials-for-high-converting-amazon-product-descriptions',
  },
  {
    id: '17',
    slug: 'vendor-central-vs-seller-central-migration-when-to-move',
    title: 'Vendor Central vs. Seller Central Migration: When to Move',
    category: 'Amazon',
    image: '/images/Vendor Central vs. Seller Central Migration When to Move and How an Agency Manages the Transition.webp',
    imageAlt: 'Vendor Central vs. Seller Central Migration: When to Move',
    author: 'Arvind Ajmera',
    date: 'November 24, 2025',
    status: 'published',
    showToc: true,
    excerpt: 'Compare 1P (Vendor Central) vs 3P (Seller Central) control, margins, and hybrid marketplace models on Amazon.',
    content: `<h2>1P Vendor Central vs. 3P Seller Central</h2><p>Transitioning from 1P to 3P gives brands full pricing control and faster catalog launches. Explore our <a href="/amazon-seller-account-management-services">Amazon Account Management Services</a> for a zero-downtime migration.</p>`,
    link: '/blogs/vendor-central-vs-seller-central-migration-when-to-move',
  },
  {
    id: '18',
    slug: 'master-amazon-promotions-coupons-deals-and-vouchers-explained',
    title: 'Master Amazon Promotions: Coupons, Deals & Vouchers Explained',
    category: 'Amazon',
    image: '/images/Master Amazon Promotions Coupons, Deals & Vouchers Explained.webp',
    imageAlt: 'Master Amazon Promotions: Coupons, Deals & Vouchers Explained',
    author: 'Arvind Ajmera',
    date: 'November 24, 2025',
    status: 'published',
    showToc: true,
    excerpt: 'When to use Lightning Deals, Prime Exclusive Discounts, and clippable Green Coupons to boost click-through and conversion rates.',
    content: `<h2>Maximizing Sales Velocity with Amazon Promotions</h2><p>Clippable coupons add an eye-catching badge in search results that lifts CTR by up to 25%. Learn how <a href="/amazon-seller-account-management-services">EcomVanta</a> plans profitable promotional calendars.</p>`,
    link: '/blogs/master-amazon-promotions-coupons-deals-and-vouchers-explained',
  },
  {
    id: '19',
    slug: 'how-to-optimise-amazon-ppc-campaigns-and-reduce-acos',
    title: 'How to Optimise Amazon PPC Campaigns and Reduce ACoS',
    category: 'Amazon',
    image: '/images/How to Optimise Amazon PPC Campaigns.webp',
    imageAlt: 'How to Optimise Amazon PPC Campaigns and Reduce ACoS',
    author: 'Arvind Ajmera',
    date: 'November 13, 2025',
    status: 'published',
    showToc: true,
    excerpt: 'Proven bid optimization, negative keyword harvesting, and placement multiplier tactics to lower your Amazon ACoS.',
    content: `<h2>Proven Amazon PPC Optimization Framework</h2><p>Isolating high-converting search terms into Exact Match campaigns while negating bleeders is the core of our <a href="/amazon-advertising-ppc-management">Amazon PPC Management</a> strategy.</p>`,
    link: '/blogs/how-to-optimise-amazon-ppc-campaigns-and-reduce-acos',
  },
  {
    id: '20',
    slug: 'amazon-advertising-strategy-proven-tactics-to-maximize-roi',
    title: 'Amazon Advertising Strategy: Proven Tactics to Maximize ROI',
    category: 'Amazon',
    image: '/images/Amazon Advertising Strategy Proven Tactics to Maximize.webp',
    imageAlt: 'Amazon Advertising Strategy: Proven Tactics to Maximize ROI',
    author: 'Arvind Ajmera',
    date: 'November 13, 2025',
    status: 'published',
    showToc: true,
    excerpt: 'Full-funnel Sponsored Products, Sponsored Brands Video, and Sponsored Display retargeting strategies for Indian brands.',
    content: `<h2>Full-Funnel Amazon Advertising</h2><p>Combine top-of-search Sponsored Products with defensive ASIN targeting to protect your product pages from competitors. See our <a href="/portfolio">Client Case Studies</a> for verified ROAS proof.</p>`,
    link: '/blogs/amazon-advertising-strategy-proven-tactics-to-maximize-roi',
  },
  {
    id: '21',
    slug: 'top-mistakes-sellers-make-when-managing-their-amazon-account',
    title: 'Top Mistakes Sellers Make When Managing Their Amazon Account',
    category: 'Amazon',
    image: '/blogs-img/Top Mistakes Sellers Make When Managing Their Amazon Account01.webp',
    imageAlt: 'Top Mistakes Sellers Make When Managing Their Amazon Account',
    author: 'Arvind Ajmera',
    date: 'September 10, 2025',
    status: 'published',
    showToc: true,
    excerpt: 'How to avoid account health warnings, late dispatch rate spikes, and Buy Box suppression on Amazon Seller Central.',
    content: `<h2>Protecting Your Amazon Account Health Rating</h2><p>Proactive SLA monitoring and automated inventory alerts prevent costly listing suppressions. Partner with <a href="/amazon-seller-account-management-services">EcomVanta</a> for 360° account protection.</p>`,
    link: '/blogs/top-mistakes-sellers-make-when-managing-their-amazon-account',
  },
  {
    id: '22',
    slug: 'how-to-increase-sales-on-flipkart-tips-for-new-sellers',
    title: 'How to Increase Sales on Flipkart: Tips for New Sellers',
    category: 'Flipkart',
    image: '/blogs-img/How to Increase Sales on Flipkart Tips for New Sellers.png',
    imageAlt: 'How to Increase Sales on Flipkart: Tips for New Sellers',
    author: 'Arvind Ajmera',
    date: 'August 27, 2025',
    status: 'published',
    showToc: true,
    excerpt: 'Actionable Flipkart growth tips: Flipkart Assured badge, Smart Fulfilment, PLA campaigns, and Big Billion Days spikes.',
    content: `<h2>Multiplying Your Flipkart Order Volume</h2><p>Enrolling in Flipkart Fulfilment (FA) and optimizing PLA ad campaigns are the fastest ways to unlock the F-Assured badge. Explore our <a href="/flipkart-account-management-services">Flipkart Account Management Services</a>.</p>`,
    link: '/blogs/how-to-increase-sales-on-flipkart-tips-for-new-sellers',
  },
];

export const DEFAULT_CAREER_PAGE_CONTENT: CareerPageContent = {
  heroBadge: '🚀 We Are Hiring!',
  heroTitle: 'Careers at',
  heroHighlight: 'EcomVanta',
  heroSubtitle: 'Build Your Career in eCommerce, Digital Marketing & Brand Growth. Join an elite team scaling top brands on Amazon, Flipkart, Myntra, Zepto, and Blinkit.',
  pitchText: "Whether you're an experienced marketplace strategist or looking to launch your career in the hyper-growing e-commerce ecosystem, EcomVanta offers dynamic opportunities to learn, execute, and make a measurable impact.",
  pitchBadges: ['📍 New Delhi, India', '📈 High-Growth Agency', '🎓 Continuous Learning & Upskilling'],
  bannerImage: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483048007_Corporate_Team_Portrait_in_Modern_Office.webp',
  whyJoinTitle: 'Why Join EcomVanta?',
  whyJoinDescription: 'At EcomVanta, we believe our talent is our core engine. When you join EcomVanta, you become part of a merit-based culture focused on innovation, autonomy, and continuous growth.',
  whyJoinPoints: [
    'Cross-functional management across 10+ marketplaces',
    'Quarterly performance bonuses and rapid role promotions',
    'Vibrant and collaborative modern workspace',
  ],
  whatYouGetTitle: "What You'll Get",
  whatYouGetItems: [
    { id: '1', number: '01', title: 'Hands-On High GMV Brand Scaling Experience' },
    { id: '2', number: '02', title: 'Sponsored Certifications (Amazon SPN, Flipkart, Meta, Google)' },
    { id: '3', number: '03', title: 'Direct Mentorship from Senior Marketplace Leaders' },
    { id: '4', number: '04', title: 'Competitive Compensation & High-Impact Incentives' },
  ],
  openingsHeadingBadge: 'Job Openings',
  openingsHeadingTitle: 'Current Open Positions',
};

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  branding: {
    siteName: 'EcomVanta',
    siteTagline: 'Powering Brands. Scaling E-commerce',
    metaDescription: 'EcomVanta - Your Marketplace Growth Partner from Setup to Sales. Account Management Services for Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix & D2C.',
    headerLogo: '/ecomvanta-logo.png',
    darkLogo: '/ecomvanta-logo.png',
    footerLogo: '/ecomvanta-logo.png',
    favicon: '/icon.png',
    topbarPhone: '+918787249407',
    tollFreePhone: '+91 878 724 9407',
    email: 'ecomvanta40@gmail.com',
    workingHours: '9:00 AM to 7:00 PM (Mon - Sat)',
    socialLinks: {
      facebook: 'https://facebook.com/ecomvanta',
      instagram: 'https://instagram.com/ecomvanta',
      linkedin: 'https://linkedin.com/company/ecomvanta',
      twitter: 'https://twitter.com/ecomvanta',
      youtube: 'https://youtube.com/@ecomvanta',
    },
    catalogPdfUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/ecomvanta-catalog.pdf',
    catalogButtonText: 'Download Catalog',
    showCatalogInHeader: true,
    showCatalogInHero: true,
    showCatalogInFooter: true,
    showCatalogInFloating: true,
  },
  homepage: {
    videoHero: {
      enabled: true,
      videoUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792413483168_ecomvanta.mp4',
      title: '',
      subtitle: 'From Strategy to Execution',
      buttonText: 'Get Started',
      stats: [
        { value: '50+', label: 'Team Members' },
        { value: '$100M', label: 'Sales Generated' },
        { value: '20+', label: 'Platforms' },
        { value: '100+', label: 'Brands' },
      ],
    },
    hero: {
      badgeText: '🚀 Your Marketplace Growth Partner — From Setup to Sales',
      titlePart1: 'Powering Brands. Scaling',
      titleHighlight: 'Amazon, Flipkart, Meesho & Blinkit',
      titlePart2: 'with End-to-End Account Management',
      subtitle: 'Welcome to your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites. Whether you\'re just starting out or scaling up, we handle everything — from product listings to ad campaigns.',
      primaryCtaText: 'Get Free Audit Call',
      primaryCtaLink: '/contact-us',
      secondaryCtaText: 'View Case Studies',
      secondaryCtaLink: '/portfolio',
      heroImage: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483339632_Blue_E-Commerce_Shopping_Experience__1_.webp',
      heroBadgeNumber: '₹50Cr+',
      heroBadgeText: 'GMV Generated for Clients',
      trustRating: '4.9 / 5.0',
      trustRatingCount: 'Based on 250+ Seller Reviews',
    },
    stats: [
      { id: '1', number: '500+', label: 'Active Brands Managed', description: 'Across all major Indian marketplaces' },
      { id: '2', number: '₹50Cr+', label: 'Client Revenue Generated', description: 'Proven high ROI scaling strategies' },
      { id: '3', number: '4.8X', label: 'Average ROAS Achieved', description: 'On Amazon & Flipkart Sponsored Ads' },
      { id: '4', number: '99.4%', label: 'Listing Accuracy & SLA', description: 'Zero policy strikes or BuyBox loss' },
    ],
    brandLogosHeading: 'We Provide Services For These Leading Brands',
    heroVideo: '',
    brandLogos: [
      { id: '1', name: 'Deshi', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411028874_WhatsApp_Image_2026-09-20_at_22.38.58.webp' },
      { id: '2', name: 'Krishna', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411056777_WhatsApp_Image_2026-09-20_at_22.38.59.webp' },
      { id: '3', name: 'Forest Found', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411068757_WhatsApp_Image_2026-09-20_at_22.38.59__1_.webp' },
      { id: '4', name: 'SS Logo', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411085966_WhatsApp_Image_2026-09-20_at_22.38.59__2_.webp' },
      { id: '5', name: 'RPURE', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411103331_WhatsApp_Image_2026-09-20_at_22.39.00.webp' },
      { id: '6', name: 'Nufyt', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411116049_WhatsApp_Image_2026-09-20_at_22.39.00__1_.webp' },
      { id: '7', name: 'Rasaveda', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411127029_WhatsApp_Image_2026-09-20_at_22.54.41.webp' },
      { id: '8', name: 'Bubz', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411145787_WhatsApp_Image_2026-09-20_at_22.54.41__1_.webp' },
      { id: '9', name: 'Ninety Two', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411154728_WhatsApp_Image_2026-09-20_at_22.54.41__2_.webp' },
      { id: '10', name: 'Snackes', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411164147_WhatsApp_Image_2026-09-20_at_22.54.42.webp' },
      { id: '1792411167580', name: 'New Brand', logo: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792411171816_WhatsApp_Image_2026-09-20_at_22.54.42__1_.webp' },
    ],
    platforms: [
      {
        id: '1',
        name: 'Amazon',
        logo: '/images/images/amazon-logo.webp',
        title: 'Amazon Account Management',
        desc: 'Complete end-to-end management including A+ cataloging, Buy Box optimization, Sponsored Ads, and FBA fulfillment.',
        link: '/amazon-seller-account-management-services',
      },
      {
        id: '2',
        name: 'Flipkart',
        logo: '/flipkart-logo.webp',
        title: 'Flipkart Account Management',
        desc: 'Listing quality score enhancement, Flipkart Ads, Big Billion Days preparation, and PLA / PCA campaign scaling.',
        link: '/flipkart-account-management-services',
      },
      {
        id: '3',
        name: 'Meesho',
        logo: '/Meesho_logo.png',
        title: 'Meesho Account Management',
        desc: 'Bulk product cataloging, zero-commission price optimization, next-day dispatch handling, and organic rank boosting.',
        link: '/meesho-account-management-services',
      },
      {
        id: '4',
        name: 'Shopify / D2C',
        logo: '/shopify-logo.webp',
        title: 'Shopify & D2C Store Management',
        desc: 'High-converting custom store development, app integrations, payment gateways, and Meta/Google conversion ads.',
        link: '/shopify-store-management-services',
      },
      {
        id: '5',
        name: 'Blinkit & Quick Commerce',
        logo: '/header-img/Blinkit-logo.svg',
        title: 'Blinkit, Zepto & BigBasket',
        desc: 'Quick commerce onboarding, dark store inventory distribution, micro-warehouse planning, and brand visibility.',
        link: '/blinkit-seller-account-management-services',
      },
      {
        id: '6',
        name: 'Myntra & Moglix',
        logo: '/myntra-logo.webp',
        title: 'Myntra, Moglix & B2B Portals',
        desc: 'Fashion & apparel catalog curation, style tag setup, B2B wholesale pricing sync, and campaign management.',
        link: '/myntra-account-management-services',
      },
    ],
    listingServices: [
      {
        id: '1',
        icon: '/home-img/SEO-Optimized Product Titles.png',
        title: 'Optimized for Search & Sales',
        desc: 'SEO-rich titles, compelling bullet points, and descriptions that convert browsers into buyers.',
      },
      {
        id: '2',
        icon: '/home-img/Image Enhancement & Infographics.png',
        title: 'Visuals That Grab Attention',
        desc: 'High-quality image uploads and stunning A+ content modules that make your listings stand out.',
      },
      {
        id: '3',
        icon: '/home-img/Keyword-rich Descriptions & bullet points.png',
        title: 'A+ Content That Builds Trust',
        desc: 'Enhanced brand storytelling and rich media that elevate your product pages to market leaders.',
      },
      {
        id: '4',
        icon: '/home-img/Category & Keyword Mapping.png',
        title: 'Category & Attribute Mapping',
        desc: 'Precise taxonomy mapping to boost discoverability and marketplace search visibility.',
      },
      {
        id: '5',
        icon: '/home-img/Variations, Pricing, and Inventory Setup.png',
        title: 'Real-Time Inventory & Order Sync',
        desc: 'We monitor your stock in real time across all platforms — always accurate, always live, zero delays.',
      },
      {
        id: '6',
        icon: '/home-img/Bulk Upload & Catalog Management.png',
        title: 'Low Stock Alerts & Restock Planning',
        desc: 'Proactive notifications before stock runs out, maintaining the right inventory levels for peak performance.',
      },
    ],
    advantages: {
      title: 'Why Choose EcomVanta As Your Growth Partner',
      subtitle: 'Right Ads. Right Audience. Right Results.',
      items: [
        { id: '1', title: 'Sponsored Ads & Budget Optimization', desc: 'Search, Display & Product Ads on Amazon, Flipkart, Meesho & more with precision budget tuning.' },
        { id: '2', title: 'Keyword Research & Precision Targeting', desc: 'Targeting strategies designed to extract the maximum ROI and lowest ACOS on every rupee spent.' },
        { id: '3', title: 'Deals, Coupons & Seasonal Campaigns', desc: 'Festival, Big Billion Days, and seasonal campaign planning to boost discoverability and volume spikes.' },
        { id: '4', title: 'Account Setup & 100% Policy Compliance', desc: 'Brand registry support, account health monitoring, suspension appeal assistance, and proactive policy protection.' },
      ],
    },
    clientVideos: [
      { id: '1', name: 'Amardeep', role: 'Founder, Home & Kitchen Brand', videoUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412051639_ECOMMANTA.mp4', quote: 'EcomVanta scaled our Amazon monthly sales from ₹2L to over ₹18L in just 90 days.', rating: 5 },
      { id: '2', name: 'Arjun', role: 'D2C Apparel Brand Owner', videoUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412150240_online_shop.mp4', quote: 'Their Flipkart ad management reduced our ACOS from 34% down to 15%.', rating: 5 },
      { id: '3', name: 'Diksha', role: 'Cosmetics Brand Director', videoUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792482972281_ecomvanta__2_.mp4', quote: 'The onboarding on Blinkit & Zepto was seamless and super fast!', rating: 5 },
      { id: '4', name: 'Kamna', role: 'Ayurvedic Wellness Brand', videoUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412677396_reel3.mp4', quote: 'Best eCommerce agency. Professional, responsive, and always available.', rating: 5 },
    ],
    faqs: [
      {
        id: '1',
        question: 'How quickly can EcomVanta start managing my seller account?',
        answer: 'Once you provide delegate or child account access, our team conducts a comprehensive account audit within 24-48 hours and rolls out the growth roadmap immediately.',
      },
      {
        id: '2',
        question: 'Which eCommerce platforms does EcomVanta support?',
        answer: 'We provide full-service management for Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Shopify / D2C Brand Websites.',
      },
      {
        id: '3',
        question: 'Will I have a dedicated account manager?',
        answer: 'Yes! Every brand is assigned a dedicated Account Manager along with a team of listing specialists, graphic designers, and PPC ad strategists.',
      },
      {
        id: '4',
        question: 'What is your pricing model for account management?',
        answer: 'We offer flexible plans including fixed monthly retainer or performance-linked growth models tailored to your brand stage and catalog size.',
      },
    ],
    sellerSpotlight: {
      badgeText: 'SELLER SPOTLIGHT',
      titlePart1: 'Hear How Our Partners Achieve',
      titleHighlight: 'Exponential Growth',
      subtitle: 'Discover how e-commerce brands in fashion, electronics, home essentials, and FMCG transformed underperforming marketplace listings into high-revenue category leaders.',
      points: [
        '+340% Average Revenue Surge in First 90 Days',
        '60% Reduction in Wasted Ad Spend & Lower ACOS',
        '100% Policy-Safe Listing & Account Health Protection',
      ],
      buttonText: 'Book a Free Consultation',
      videoUrl: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412051639_ECOMMANTA.mp4',
      quote: '“EcomVanta scaled our Amazon monthly sales from ₹2L to over ₹18L in just 90 days.”',
      author: 'Verified Brand Partner',
      rating: 5,
    },
    bottomCta: {
      tagline: 'Ready to Scale Your E-Commerce Revenue?',
      title: 'Let’s Grow Your E-Commerce Business Together',
      description: 'Reach out to EcomVanta today for an in-depth audit of your listings, competitor gaps, and an actionable ad strategy.',
      buttonText: 'Claim Your Free Consultation',
      buttonLink: '/contact-us',
      backgroundImage: '/contact-bg.webp',
    },
    seoContentBlocks: [
      {
        id: '1',
        heading: 'COMPREHENSIVE E-COMMERCE ACCOUNT MANAGEMENT IN INDIA',
        content: '<p>Selling on Indian marketplaces like <b>Amazon</b>, <b>Flipkart</b>, <b>Meesho</b>, <b>Myntra</b>, and <b>Blinkit</b> requires dedicated operational mastery. <b>EcomVanta</b> acts as an end-to-end marketplace management growth agency for D2C brands, manufacturers, and emerging retailers. We manage everything from <span style="color: #0066FF; font-weight: bold;">seller onboarding</span> and GST/brand registry authorizations to cataloging, Sponsored Ads PPC scaling, Buy Box retention, and inventory forecasting across micro-fulfillment centers. With our data-driven growth strategies, brands avoid common account suspensions, suppressed listings, and wasted advertising spend.</p>',
      },
      {
        id: '2',
        heading: 'HOW ECOMVANTA MULTIPLIES YOUR SALES ACROSS MARKETPLACES',
        content: '<p>Our multi-disciplinary team deploys tested marketplace playbooks. For <b>Amazon and Flipkart</b>, we build search-optimized product titles, persuasive benefit-first bullet points, and <b>high-converting A+ Content / Enhanced Brand Content (EBC)</b> that dramatically lifts conversion rates. Concurrently, our PPC advertising managers structure precise keyword harvesting campaigns, negative keyword filters, and Sponsored Brand video placements that keep <span style="color: #16A34A; font-weight: bold;">ACOS strictly within target profitability margins</span>. On quick commerce platforms like <b>Blinkit and Zepto</b>, we manage dark store allocations and high-visibility category banners.</p>',
      },
      {
        id: '3',
        heading: 'WHY CHOOSE A SPECIALIZED MARKETPLACE GROWTH PARTNER?',
        content: '<p>Hiring and training separate in-house managers for cataloging, graphics, ad campaigns, customer tickets, and marketplace reconciliation is expensive and difficult to scale. <b>EcomVanta provides a turnkey eCommerce department</b> for a fraction of the overhead. Every partner brand gets a dedicated senior account manager, weekly analytical performance reviews, and proactive account health shielding. We treat your brand as our own, aligning our growth incentives directly with your multi-channel sales milestones.</p>',
      },
    ],
    showFounderSection: true,
  },
  services: SERVICES_DATABASE,
  caseStudies: CASE_STUDIES_DATA,
  blogs: INITIAL_BLOGS,
  careers: [
    {
      id: '1',
      title: 'Senior eCommerce Account Manager',
      department: 'Operations',
      location: 'New Delhi / Hybrid',
      type: 'Full-time',
      experience: '2-4 Years',
      description: 'Lead Amazon & Flipkart brand management, PPC ad strategy, and client relations for top D2C brands.',
      requirements: ['Experience managing Amazon Seller Central and Flipkart Vendor/Seller Hub', 'Hands-on PPC ad campaign optimization', 'Strong analytical and communication skills'],
      status: 'Open',
    },
    {
      id: '2',
      title: 'PPC & Performance Marketing Specialist',
      department: 'Marketing',
      location: 'New Delhi / Remote',
      type: 'Full-time',
      experience: '1-3 Years',
      description: 'Manage Amazon Sponsored Ads, Meta Ads, and Google Ads campaigns to drive high ROAS.',
      requirements: ['Proven track record with Amazon Ads (SP, SB, SD)', 'Experience in Meta & Google Ads conversion campaigns', 'Data analysis using Excel / Google Sheets'],
      status: 'Open',
    },
    {
      id: '3',
      title: 'eCommerce Catalog & Graphic Designer',
      department: 'Creative',
      location: 'New Delhi / Hybrid',
      type: 'Full-time',
      experience: '1-3 Years',
      description: 'Design high-converting Amazon A+ Content, Brand Story modules, product infographics, and banners.',
      requirements: ['Proficiency in Photoshop, Illustrator, and Canva', 'Understanding of eCommerce image guidelines and dimensions', 'Portfolio of Amazon A+ or product listing designs'],
      status: 'Open',
    },
  ],
  careerPage: DEFAULT_CAREER_PAGE_CONTENT,
  aboutUs: {
    heroTitle: 'WHO WE ARE & WHAT WE DO',
    heroSubtitle: 'Welcome to your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites.',
    heroImage: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483048007_Corporate_Team_Portrait_in_Modern_Office.webp',
    storyTitle: 'Who We Are & What We Do',
    storyDesc: 'Whether you\'re just starting out or scaling up, we handle everything — from product listings to ad campaigns. EcomVanta provides complete end-to-end marketplace management helping brands sell smarter, grow faster, and stay stress-free in today\'s competitive e-commerce world.',
    missionTitle: 'Our Mission',
    missionDesc: 'To help you sell smarter, grow faster, and stay stress-free in today\'s competitive e-commerce world.',
    visionTitle: 'Our Vision',
    visionDesc: 'To be India\'s premier marketplace growth partner, turning brand potential into sustainable, multi-channel e-commerce market leadership.',
    founderQuote: 'We Treat Your Brand Like Our Own.',
    founderDesc: 'When we founded EcomVanta, our goal was simple: provide complete transparency, elite execution, and true growth partnership to sellers. Today, our 50+ e-commerce specialists manage hundreds of successful brands across India and global marketplaces.',
    founderName: 'Shivam Dubey',
    founderTitle: 'Founder & CEO, EcomVanta',
    founderImage: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
    team: [
      { id: '1', name: 'Shivam Dubey', designation: 'Director & Founder', image: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp' },
    ],
  },
  founder: {
    heroBadge: 'LEADERSHIP & VISION',
    heroTitle: 'Meet Our Founder & CEO',
    heroSubtitle: 'The driving force behind EcomVanta’s journey from a bootstrap agency to managing ₹50Cr+ GMV for India’s fastest-growing marketplace brands.',
    founderName: 'Shivam Dubey',
    founderRole: 'Founder & CEO, EcomVanta',
    founderImage: 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
    founderQuote: 'We Don’t Just Manage Accounts — We Build Enduring E-Commerce Market Leaders.',
    bioHeading: 'The Story Behind EcomVanta',
    bioParagraphs: [
      'Shivam Dubey founded EcomVanta with a straightforward mission: to eliminate the chaos, hidden fees, and empty promises prevalent in the e-commerce agency ecosystem. Having witnessed hundreds of promising sellers struggle with suppressed listings, spiraling ad spend, and bureaucratic marketplace support, Shivam envisioned a truly specialized partner with skin in the game.',
      'Under his leadership, EcomVanta has grown from managing a single seller account to orchestrating multi-channel e-commerce growth for over 500+ brands across Amazon, Flipkart, Meesho, Blinkit, Zepto, Myntra, and custom D2C stores.',
      'Today, Shivam leads a team of 50+ marketplace specialists, ad analysts, and catalog designers in New Delhi, helping manufacturers, heritage businesses, and innovative consumer brands scale profitably across India and overseas.',
    ],
    milestones: [
      { id: '1', number: '₹50Cr+', label: 'GMV Generated', desc: 'For partner brands across Indian marketplaces' },
      { id: '2', number: '500+', label: 'Brands Scaled', desc: 'From startup sellers to multi-crore enterprises' },
      { id: '3', number: '50+', label: 'In-House Specialists', desc: 'Category experts, ad managers & designers' },
      { id: '4', number: '98%', label: 'Client Retention', desc: 'Long-term partnerships built on verified ROI' },
    ],
    principles: [
      { id: '1', title: 'Complete Transparency', description: 'No inflated metrics or vanity reporting. We share real-time analytics, exact ad spend figures, and clear profitability margins.' },
      { id: '2', title: 'Execution Over Excuses', description: 'Marketplace algorithms change daily. We stay ahead with rapid listing experiments, proactive account health checks, and swift problem resolution.' },
      { id: '3', title: 'Your Brand, Our Responsibility', description: 'We treat your capital, inventory, and reputation with the same care and scrutiny as if it were our own business.' },
    ],
    visionHeading: 'Our Vision for Indian E-Commerce',
    visionText: 'To empower every visionary manufacturer and brand in India with world-class marketplace capabilities, ensuring domestic products dominate online market share globally.',
    calloutTitle: 'Want to Scale Your Brand with Shivam Dubey’s Team?',
    calloutDesc: 'Schedule an exclusive 1-on-1 marketplace growth audit and uncover hidden revenue opportunities in your catalog.',
  },
  contactFooter: {
    officeAddress: 'New Delhi, India',
    supportEmail: 'ecomvanta40@gmail.com',
    contactPhone: '+91 878 724 9407',
    salesPhone: '+91 878 724 9407',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin',
    footerAboutText: 'EcomVanta is your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites. Powering Brands. Scaling E-commerce.',
    copyrightText: '© 2026 EcomVanta. All rights reserved. Powering Brands. Scaling E-commerce.',
  },
  seoConfig: DEFAULT_SEO_CONFIG,
  seoSystem: DEFAULT_SEO_CONFIG,
};

export const RESTRICTED_SUPABASE_URL_MAP: Record<string, string> = {
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790317947318_catelog.pdf': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/ecomvanta-catalog.pdf',
  '/uploads/ecomvanta-catalog.pdf': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/ecomvanta-catalog.pdf',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1789563560397_ChatGPT_Image_Sep_16__2026__06_29_10_PM.webp': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483339632_Blue_E-Commerce_Shopping_Experience__1_.webp',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1789707303911_ChatGPT_Image_Sep_18__2026__10_24_51_AM.webp': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483048007_Corporate_Team_Portrait_in_Modern_Office.webp',
  '/uploads/ecomvanta-team.png': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483048007_Corporate_Team_Portrait_in_Modern_Office.webp',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790413735027_ChatGPT_Image_Sep_26__2026__02_38_44_PM.webp': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1789927645231_WhatsApp_Image_2026-09-20_at_22.54.42__2_.webp': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790428729318_pp.webp': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1789707331605_WhatsApp_Image_2026-09-18_at_10.21.32_AM.webp': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
  '/uploads/founder_ecomvanta.jpeg': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792483057022_WhatsApp_Image_2026-10-20_at_10.11.15_AM.webp',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790317012442_12Ecomvanta.mp4': '',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790317671050_1Ecommanta.mp4': '',
  '/uploads/ecomvanta-hero.mp4': '',
  'https://youtu.be/VCPGMjCW0is?si=jRCSoA1B7x_wNaAv': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792413483168_ecomvanta.mp4',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790315813852_2Ecommanta.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412051639_ECOMMANTA.mp4',
  '/image/Amardeep.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412051639_ECOMMANTA.mp4',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790316735605_12Ecomvanta.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412150240_online_shop.mp4',
  '/image/Arjun.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412150240_online_shop.mp4',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790571128769_1790427955026_Ecomvanta-Digital.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792482972281_ecomvanta__2_.mp4',
  '/image/Diksha.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792482972281_ecomvanta__2_.mp4',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1790571138292_1790428640547_Online1Shop.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412677396_reel3.mp4',
  '/image/Kamna Video.mp4': 'https://pub-91fbf9d4fa5f4d0c945a1423b54df277.r2.dev/1792412677396_reel3.mp4',
  'https://pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/1789707560459_ChatGPT_Image_Sep_18__2026__10_28_59_AM.webp': '/service-img/Amazon-left-img.png',
};

export const LEGACY_BLOG_LOGO_IMAGES = new Set([
  '/arvian-blogs.jpeg',
  '/header-img/Ajio logo.png',
  '/myntra-logo.webp',
  '/images/images/amazon-logo.webp',
  '/header-img/Blinkit-logo.svg',
  '/header-img/zepto-logo.webp',
]);

export function sanitizeRestrictedMediaUrls<T>(input: T): T {
  if (!input) return input;
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (trimmed in RESTRICTED_SUPABASE_URL_MAP) {
      return RESTRICTED_SUPABASE_URL_MAP[trimmed] as unknown as T;
    }
    if (trimmed.includes('pcnaagdekwrpgnjfnvcs.supabase.co/storage/v1/object/public/media/')) {
      const baseUrl = trimmed.split('?')[0];
      if (baseUrl in RESTRICTED_SUPABASE_URL_MAP) {
        return RESTRICTED_SUPABASE_URL_MAP[baseUrl] as unknown as T;
      }
    }
    return input;
  }
  if (Array.isArray(input)) {
    return input.map((item) => sanitizeRestrictedMediaUrls(item)) as unknown as T;
  }
  if (typeof input === 'object') {
    const out: Record<string, any> = {};
    for (const [k, v] of Object.entries(input as Record<string, any>)) {
      out[k] = sanitizeRestrictedMediaUrls(v);
    }
    return out as T;
  }
  return input;
}


