import { SERVICES_DATABASE, ServiceData } from './serviceData';
import { CASE_STUDIES_DATA, CaseStudyData } from './caseStudyData';

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

export interface HomepageContent {
  hero: HeroSectionContent;
  stats: StatCounter[];
  brandLogos: BrandLogo[];
  platforms: PlatformService[];
  listingServices: ListingServiceCard[];
  advantages: {
    title: string;
    subtitle: string;
    items: AdvantageItem[];
  };
  clientVideos: VideoTestimonial[];
  faqs: FaqItem[];
  bottomCta: CtaBannerContent;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  link?: string;
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

export interface SiteContentData {
  branding: SiteBranding;
  homepage: HomepageContent;
  services: Record<string, ServiceData>;
  caseStudies: Record<string, CaseStudyData>;
  blogs: BlogPostItem[];
  careers: JobOpening[];
  aboutUs: AboutUsContent;
  contactFooter: ContactFooterContent;
}

export const INITIAL_BLOGS: BlogPostItem[] = [
  {
    id: '1',
    slug: 'ecommerce-account-management',
    title: 'eCommerce Account Management: What Does an Account Manager Actually Do?',
    category: 'eCommerce',
    image: '/arvian-blogs.jpeg',
    author: 'Arvind Ajmera',
    date: 'August 31, 2026',
    excerpt: 'Discover the exact responsibilities of a professional eCommerce account manager and how they multiply your marketplace sales.',
    content: 'Full end-to-end marketplace management involves product cataloging, listing optimization, price strategy, Buy Box monitoring, ad campaign management, stock planning, and daily customer sentiment tracking.',
    link: '/blogs',
  },
  {
    id: '2',
    slug: 'how-to-sell-on-ajio-seller-registration-guide',
    title: 'How to Sell on AJIO: Complete Seller Registration and Account Setup Guide',
    category: 'Ajio',
    image: '/header-img/Ajio logo.png',
    author: 'Arvind Ajmera',
    date: 'August 22, 2026',
    excerpt: 'Step-by-step tutorial on registering as a brand partner on AJIO, listing catalog products, and scaling fashion sales.',
    content: 'AJIO is one of Reliance Retail’s premier digital platforms with strict catalog standards. Learn how to onboard smoothly with brand authorization, trademark certificates, and high-resolution lookbooks.',
    link: '/blogs',
  },
  {
    id: '3',
    slug: 'how-to-sell-on-myntra-seller-onboarding-guide',
    title: 'How to Sell on Myntra: Seller Onboarding Guide 2026',
    category: 'Myntra',
    image: '/myntra-logo.webp',
    author: 'Arvind Ajmera',
    date: 'August 11, 2026',
    excerpt: 'Complete walkthrough of getting your apparel or lifestyle brand listed on Myntra Seller Portal in 2026.',
    content: 'Myntra provides unprecedented brand prestige in fashion & lifestyle. Here are the core documents, style tag formats, and EORS sale participation guidelines to get approved.',
    link: '/blogs',
  },
  {
    id: '4',
    slug: 'amazon-selling-mistakes-that-reduce-sales-and-profits',
    title: '10 Amazon Selling Mistakes That Reduce Sales and Profits',
    category: 'Amazon',
    image: '/images/images/amazon-logo.webp',
    author: 'Arvind Ajmera',
    date: 'July 23, 2026',
    excerpt: 'Avoid these critical mistakes in keyword targeting, FBA inventory limits, Buy Box pricing, and PPC bidding.',
    content: 'From ignoring negative keywords to poor infographic design and stockouts, learn the top 10 pitfalls costing sellers thousands in lost revenue.',
    link: '/blogs',
  },
  {
    id: '5',
    slug: 'blinkit-seller-onboarding-guide',
    title: 'Blinkit Seller Onboarding Guide: How to Sell on Blinkit Successfully',
    category: 'Blinkit Seller',
    image: '/header-img/Blinkit-logo.svg',
    author: 'Arvind Ajmera',
    date: 'July 10, 2026',
    excerpt: 'Quick Commerce is exploding in India. Learn how to list your products in Blinkit dark stores across major metros.',
    content: 'Discover the requirements for FSSAI licenses, GST state registrations, micro-warehouse inventory dispatch, and sponsored banner advertising on Blinkit.',
    link: '/blogs',
  },
  {
    id: '6',
    slug: 'zepto-seller-registration-guide',
    title: 'How to Sell on Zepto: Complete Zepto Seller Registration Guide',
    category: 'Zepto Seller',
    image: '/header-img/zepto-logo.webp',
    author: 'Arvind Ajmera',
    date: 'June 20, 2026',
    excerpt: 'Detailed process for D2C FMCG and grocery brands to partner with Zepto for 10-minute delivery.',
    content: 'Zepto seller onboarding requires active inventory allocation and regional pricing sync. Explore our step-by-step guidance on maximizing dark store sales.',
    link: '/blogs',
  }
];

export const DEFAULT_SITE_CONTENT: SiteContentData = {
  branding: {
    siteName: 'EcomVanta',
    siteTagline: 'Powering Brands. Scaling E-commerce',
    metaDescription: 'EcomVanta - Your Marketplace Growth Partner from Setup to Sales. Account Management Services for Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix & D2C.',
    headerLogo: '/include/images/dark-logo.png',
    darkLogo: '/include/images/dark-logo.png',
    footerLogo: '/include/images/dark-logo.png',
    favicon: '/favicon.ico',
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
  },
  homepage: {
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
      heroImage: '/image/ecommerce-growth-partners.webp',
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
    brandLogos: [
      { id: '1', name: 'Deshi', logo: '/Deshi.png' },
      { id: '2', name: 'Krishna', logo: '/Krishna logo .png' },
      { id: '3', name: 'Forest Found', logo: '/Forest Found.png' },
      { id: '4', name: 'SS Logo', logo: '/SS logo .png' },
      { id: '5', name: 'RPURE', logo: '/RPURE logo .png' },
      { id: '6', name: 'Nufyt', logo: '/Nufyt.png' },
      { id: '7', name: 'Rasaveda', logo: '/Rasaveda.png' },
      { id: '8', name: 'Bubz', logo: '/Bubz.png' },
      { id: '9', name: 'Ninety Two', logo: '/Ninety Two.png' },
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
      { id: '1', name: 'Amardeep', role: 'Founder, Home & Kitchen Brand', videoUrl: '/image/Amardeep.mp4', quote: 'EcomVanta scaled our Amazon monthly sales from ₹2L to over ₹18L in just 90 days.', rating: 5 },
      { id: '2', name: 'Arjun', role: 'D2C Apparel Brand Owner', videoUrl: '/image/Arjun.mp4', quote: 'Their Flipkart ad management reduced our ACOS from 34% down to 15%.', rating: 5 },
      { id: '3', name: 'Diksha', role: 'Cosmetics Brand Director', videoUrl: '/image/Diksha.mp4', quote: 'The onboarding on Blinkit & Zepto was seamless and super fast!', rating: 5 },
      { id: '4', name: 'Kamna', role: 'Ayurvedic Wellness Brand', videoUrl: '/image/Kamna Video.mp4', quote: 'Best eCommerce agency. Professional, responsive, and always available.', rating: 5 },
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
    bottomCta: {
      tagline: 'Ready to Scale Your E-Commerce Revenue?',
      title: 'Let’s Grow Your E-Commerce Business Together',
      description: 'Reach out to EcomVanta today for an in-depth audit of your listings, competitor gaps, and an actionable ad strategy.',
      buttonText: 'Claim Your Free Consultation',
      buttonLink: '/contact-us',
      backgroundImage: '/contact-bg.webp',
    },
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
  aboutUs: {
    heroTitle: 'WHO WE ARE & WHAT WE DO',
    heroSubtitle: 'Welcome to your one-stop solution for Account Management Services on Amazon, Flipkart, Meesho, Myntra, Blinkit, BigBasket, Moglix, B2B Marketplaces, and Brand Websites.',
    heroImage: '/arvian-team-image.jpeg',
    storyTitle: 'Who We Are & What We Do',
    storyDesc: 'Whether you\'re just starting out or scaling up, we handle everything — from product listings to ad campaigns. EcomVanta provides complete end-to-end marketplace management helping brands sell smarter, grow faster, and stay stress-free in today\'s competitive e-commerce world.',
    missionTitle: 'Our Mission',
    missionDesc: 'To help you sell smarter, grow faster, and stay stress-free in today\'s competitive e-commerce world.',
    visionTitle: 'Our Vision',
    visionDesc: 'To be India\'s premier marketplace growth partner, turning brand potential into sustainable, multi-channel e-commerce market leadership.',
    team: [
      { id: '1', name: 'Shivam Dubey', designation: 'Director & Founder', image: '/image/Aadil.png' },
    ],
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
};
