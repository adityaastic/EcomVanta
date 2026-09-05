export interface CaseStudyData {
  slug: string;
  brandName: string;
  brandLogo: string;
  category: string;
  title: string;
  subtitle: string;
  snapshot: {
    metric: string;
    label: string;
    sublabel: string;
  }[];
  challengeTitle: string;
  challenges: string[];
  solutionTitle: string;
  solutions: {
    icon: string;
    title: string;
    desc: string;
  }[];
  resultsTitle: string;
  results: {
    stat: string;
    title: string;
    desc: string;
  }[];
  dashboardImage: string;
  listingImage: string;
  testimonial: {
    quote: string;
    author: string;
    designation: string;
  };
}

export const CASE_STUDIES_DATA: Record<string, CaseStudyData> = {
  'kay-kay-industries-amazon-case-study': {
    slug: 'kay-kay-industries-amazon-case-study',
    brandName: 'Kay Kay Industries',
    brandLogo: '/abt-img/Kay kay - logo.png',
    category: 'Industrial Tools & Hardware',
    title: 'How Kay Kay Industries Scaled Amazon Revenue by +340%',
    subtitle: 'Transforming catalog discoverability, optimizing ad spend from 35% down to 14% ACOS, and capturing #1 Bestseller rank.',
    snapshot: [
      { metric: '+340%', label: 'Revenue Growth', sublabel: 'Month-over-month sales surge' },
      { metric: '14%', label: 'ACOS Reduced', sublabel: 'Down from 35% initial burn' },
      { metric: '4,000+', label: 'Monthly Orders', sublabel: 'Consistent high velocity' },
      { metric: '#1', label: 'Bestseller Badges', sublabel: 'Across 4 primary SKUs' },
    ],
    challengeTitle: 'The Business Challenge',
    challenges: [
      'High ad spend with an unsustainable 35%+ ACOS draining profitability.',
      'Unoptimized catalog listings leading to low organic click-through and high customer bounce rates.',
      'Frequent Buy Box suppression due to price mismatches and seller rating issues.',
      'Lack of variation grouping resulting in split customer reviews across duplicate listings.',
    ],
    solutionTitle: 'Our Strategic Solution',
    solutions: [
      {
        icon: '/abt-img/Product Listing Optimization.png',
        title: 'Listing SEO & Infographics',
        desc: 'Keyword-packed titles, benefit-driven bullets, and 3D lifestyle infographic renders.',
      },
      {
        icon: '/abt-img/Catalog Management.png',
        title: 'Parent-Child Variation Grouping',
        desc: 'Consolidated reviews and ratings into unified high-converting variation listings.',
      },
      {
        icon: '/abt-img/Amazon Advertising.png',
        title: 'Full-Funnel Amazon PPC',
        desc: 'Negative keyword sculpting, dayparting, and Top of Search placement bid multipliers.',
      },
      {
        icon: '/abt-img/Performance Monitoring.png',
        title: 'Daily Buy Box Defense',
        desc: 'Real-time price monitoring and Buy Box win rate optimization.',
      },
      {
        icon: '/abt-img/revenue growth.png',
        title: 'Lightning & Festival Deals',
        desc: 'Strategic deal calendar alignment to capture Prime Day and Great Indian Festival traffic.',
      },
      {
        icon: '/abt-img/Strengthen Marketplace Presence.png',
        title: 'Premium Brand Storefront',
        desc: 'Interactive storefront design leading to +45% multi-unit basket orders.',
      },
    ],
    resultsTitle: 'Documented Results & Milestones',
    results: [
      { stat: '+340%', title: 'Overall GMV Growth', desc: 'Sustained 4X sales velocity within 90 days.' },
      { stat: '14%', title: 'Targeted Ad ACOS', desc: 'Lowered advertising cost while doubling ad revenue.' },
      { stat: '4 Badges', title: 'Amazon Choice & Bestseller', desc: 'Ranked in top 3 organic spots for primary keywords.' },
    ],
    dashboardImage: '/abt-img/Seller-Dashboard-Kay-Kay.png',
    listingImage: '/abt-img/kay-listing.png',
    testimonial: {
      quote: 'Arvian Business Solutions completely revolutionized our Amazon seller account. Our sales quadrupled while our ad expenses were cut in half.',
      author: 'Managing Director',
      designation: 'Kay Kay Industries',
    },
  },

  'gataca-performance-supplements-amazon-case-study': {
    slug: 'gataca-performance-supplements-amazon-case-study',
    brandName: 'GATACA Supplements',
    brandLogo: '/abt-img/Gataca-logo.png',
    category: 'Health, Fitness & Supplements',
    title: 'How GATACA Multiplied Monthly Orders by 10X on Amazon',
    subtitle: 'Overcoming fierce fitness competition with Premium A+ Content, Sponsored Brand Video Ads, and FBA stock positioning.',
    snapshot: [
      { metric: '10X', label: 'Order Volume Growth', sublabel: 'Scaled from 200 to 2,000+ orders' },
      { metric: '4.2X', label: 'Average ROAS', sublabel: 'Delivered by video ads' },
      { metric: '4.8★', label: 'Customer Rating', sublabel: 'Maintained across all SKUs' },
      { metric: 'Top 3', label: 'Organic Search Rank', sublabel: 'For high volume fitness keywords' },
    ],
    challengeTitle: 'The Business Challenge',
    challenges: [
      'Intense competition from established legacy supplement brands dominating search results.',
      'Low consumer trust due to lack of certified lab reports and authentic video testimonials.',
      'High return and cancellation rates due to unclear dosage and ingredient transparency.',
      'Sub-optimal Sponsored Products campaigns burning budget on non-converting broad terms.',
    ],
    solutionTitle: 'Our Strategic Solution',
    solutions: [
      {
        icon: '/abt-img/Product Listing Optimization.png',
        title: 'Nutritional A+ Brand Story',
        desc: 'Lab-tested certification badges, ingredient breakdown charts, and usage guide modules.',
      },
      {
        icon: '/abt-img/Catalog Management.png',
        title: 'Flavor & Size Variation Setup',
        desc: 'Allowed buyers to easily switch flavors and combo-packs without leaving the page.',
      },
      {
        icon: '/abt-img/Amazon Advertising.png',
        title: 'Sponsored Brand Video Ads',
        desc: 'High-hook unboxing and workout videos targeting competitor product pages.',
      },
      {
        icon: '/abt-img/Performance Monitoring.png',
        title: 'Amazon Vine & Review Strategy',
        desc: 'Accelerated verified buyer feedback and 5-star customer ratings.',
      },
      {
        icon: '/abt-img/revenue growth.png',
        title: 'Subscribe & Save Enrollment',
        desc: 'Built recurring monthly revenue streams with 20%+ repeat customer orders.',
      },
      {
        icon: '/abt-img/Strengthen Marketplace Presence.png',
        title: 'Storefront Cross-Selling',
        desc: 'Designed dynamic category pages for Whey Protein, Pre-Workouts, and Creatine.',
      },
    ],
    resultsTitle: 'Documented Results & Milestones',
    results: [
      { stat: '10X', title: 'Monthly Unit Sales', desc: 'Scaled into a leading D2C sports nutrition brand.' },
      { stat: '4.2X', title: 'Return on Ad Spend', desc: 'Consistently beating industry benchmark ROAS.' },
      { stat: '20%+', title: 'Repeat Order Velocity', desc: 'Established loyal monthly subscribers on Amazon.' },
    ],
    dashboardImage: '/abt-img/Gataca dashboard.png',
    listingImage: '/abt-img/Gataca-listing.png',
    testimonial: {
      quote: 'The team at Arvian understands e-commerce algorithms better than anyone. They positioned GATACA right alongside the biggest legacy brands in our category.',
      author: 'Founder & CEO',
      designation: 'GATACA Performance Nutrition',
    },
  },

  'sai-gallery-agarbatti-brand-amazon-case-study': {
    slug: 'sai-gallery-agarbatti-brand-amazon-case-study',
    brandName: 'Sai Gallery',
    brandLogo: '/abt-img/Sai-gellery-logo.jpg',
    category: 'Home Fragrance & Puja Essentials',
    title: 'Sai Gallery: 18,000+ Annual Orders on Amazon India',
    subtitle: 'Generating ₹88L+ revenue with multi-pack variations, Amazon Choice badges, and zero stockouts.',
    snapshot: [
      { metric: '₹88L+', label: 'Annual Revenue', sublabel: 'Consistent month-on-month sales' },
      { metric: '18,000+', label: 'Orders Fulfilled', sublabel: 'Across 21,000+ units' },
      { metric: '4.8★', label: 'Average Rating', sublabel: 'Over 5,000 customer reviews' },
      { metric: '12', label: 'Amazon Choice Badges', sublabel: 'Secured for primary fragrance keywords' },
    ],
    challengeTitle: 'The Business Challenge',
    challenges: [
      'Fragrance is a sensory product where online buyers cannot smell before purchasing.',
      'Low average order value (AOV) making single-item unit logistics unprofitable.',
      'Severe price competition from unbranded regional manufacturers.',
      'High shipping weight costs eating into thin product margins.',
    ],
    solutionTitle: 'Our Strategic Solution',
    solutions: [
      {
        icon: '/abt-img/Product Listing Optimization.png',
        title: 'Sensory Copywriting & Infographics',
        desc: 'Detailed fragrance note breakdowns (top, heart, base notes) and burning duration charts.',
      },
      {
        icon: '/abt-img/Catalog Management.png',
        title: 'Combo & Multi-Pack Bundles',
        desc: 'Created 3-pack and 6-pack festive gift boxes, raising average order value by +65%.',
      },
      {
        icon: '/abt-img/Amazon Advertising.png',
        title: 'Festival Season PPC Aggression',
        desc: 'Dominated search share during Diwali, Navratri, and Ganesh Chaturthi seasons.',
      },
      {
        icon: '/abt-img/Performance Monitoring.png',
        title: 'FBA Inventory Regional Stocking',
        desc: 'Distributed inventory across North, West, and South Amazon fulfillment centers.',
      },
      {
        icon: '/abt-img/revenue growth.png',
        title: 'Amazon Choice Optimization',
        desc: 'Focused conversion rate push to capture top search badge status.',
      },
      {
        icon: '/abt-img/Strengthen Marketplace Presence.png',
        title: 'Divine Storefront Experience',
        desc: 'Created a serene devotional brand storefront highlighting natural herbs and zero charcoal.',
      },
    ],
    resultsTitle: 'Documented Results & Milestones',
    results: [
      { stat: '₹88L+', title: 'Annual Sales Volume', desc: 'Established as a top-selling puja fragrance brand.' },
      { stat: '18K+', title: 'Orders Dispatched', desc: 'Zero listing suspensions or fulfillment delays.' },
      { stat: '12 Badges', title: 'Amazon Choice Dominance', desc: 'Dominating organic search results across categories.' },
    ],
    dashboardImage: '/abt-img/Sai Gallery dashboard.png',
    listingImage: '/new-pages/Sai-Gellery_img.png',
    testimonial: {
      quote: 'Arvian took our traditional agarbatti business and built a thriving nationwide online brand. Their bundle strategy changed our unit economics completely.',
      author: 'Director of Marketing',
      designation: 'Sai Gallery',
    },
  },

  'nut-o-nut-dry-fruits-brand-amazon-case-study': {
    slug: 'nut-o-nut-dry-fruits-brand-amazon-case-study',
    brandName: 'Nut o Nut Dry Fruits',
    brandLogo: '/abt-img/Nut o nut.png',
    category: 'Gourmet & Premium Dry Fruits',
    title: 'Nut o Nut: Scaling Gourmet Dry Fruits to ₹43L+ Revenue',
    subtitle: 'How Arvian achieved +185% organic search impressions, 99.8% FBA dispatch, and top category ranking on Amazon.',
    snapshot: [
      { metric: '₹43L+', label: 'Annual GMV', sublabel: '6,000+ orders processed' },
      { metric: '7,000+', label: 'Units Dispatched', sublabel: '99.8% on-time fulfillment' },
      { metric: '+185%', label: 'Search Impressions', sublabel: 'Driven by reverse-ASIN SEO' },
      { metric: '4.7★', label: 'Average Rating', sublabel: 'Over 2,500 verified reviews' },
    ],
    challengeTitle: 'The Business Challenge',
    challenges: [
      'Perishable commodity category with strict expiry and packaging freshness requirements.',
      'Intense competition during festive seasons with heavy price discounting from mass brands.',
      'Low initial customer review velocity hindering organic conversion rates.',
      'Inconsistent FBA stock inbound planning causing frequent out-of-stock periods.',
    ],
    solutionTitle: 'Our Strategic Solution',
    solutions: [
      {
        icon: '/abt-img/Product Listing Optimization.png',
        title: 'Vacuum-Seal Freshness Story',
        desc: 'Highlighting nitrogen-flushed packaging, California almond grades, and premium jumbo sizing.',
      },
      {
        icon: '/abt-img/Catalog Management.png',
        title: 'Gifting & Festive Hamper Variations',
        desc: 'Engineered Diwali and corporate gift box variations that sold out during Q4.',
      },
      {
        icon: '/abt-img/Amazon Advertising.png',
        title: 'Harvested Keyword Bidding',
        desc: 'Targeted high-intent search terms like "organic jumbo cashews" and "roasted pistachios".',
      },
      {
        icon: '/abt-img/Performance Monitoring.png',
        title: 'Automated Inbound Restocking',
        desc: 'Set up algorithmic lead-time buffer alerts preventing stockouts during peak months.',
      },
      {
        icon: '/abt-img/revenue growth.png',
        title: 'Amazon Lightning Deals',
        desc: 'Scheduled time-limited deals during Great Freedom Festival and Prime Day.',
      },
      {
        icon: '/abt-img/Strengthen Marketplace Presence.png',
        title: 'Gourmet Brand Storefront',
        desc: 'Showcasing health benefits, recipe ideas, and healthy snack pairings.',
      },
    ],
    resultsTitle: 'Documented Results & Milestones',
    results: [
      { stat: '₹43L+', title: 'Annual GMV', desc: 'Achieved sustainable 6-figure monthly run-rate.' },
      { stat: '99.8%', title: 'FBA Dispatch Reliability', desc: 'Zero stranded inventory or freshness returns.' },
      { stat: '+185%', title: 'Organic Search Impressions', desc: 'Capturing top search results across all dry fruit SKUs.' },
    ],
    dashboardImage: '/abt-img/Nut o Nut dashboard.png',
    listingImage: '/abt-img/Nut-O-Nut-listing.png',
    testimonial: {
      quote: 'Arvian’s operational precision and festive advertising strategies propelled Nut o Nut to become one of the top dry fruit sellers on Amazon India.',
      author: 'Co-Founder',
      designation: 'Nut o Nut Foods',
    },
  },
};
