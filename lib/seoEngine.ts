import {
  SiteContentData,
  DEFAULT_SITE_CONTENT,
  SeoMetaItem,
  SeoSystemConfig,
  DEFAULT_SEO_CONFIG,
  ContentTypeKey,
  SeoRedirectRule,
  createEmptySeoMeta,
} from './cmsTypes';
import {
  analyzeContentSeo,
  resolveEffectiveSeoMeta,
  extractLinksFromHtml,
  stripHtmlToText,
  SeoAnalysisReport,
} from './seoAnalyzer';

export interface SiteSeoPageEntry {
  id: string;
  urlPath: string;
  slug: string;
  title: string;
  contentType: ContentTypeKey;
  category: string;
  status: 'published' | 'draft' | 'scheduled';
  updatedAt: string;
  publishedAt?: string;
  scheduledAt?: string;
  author?: string;
  excerpt: string;
  htmlContent: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  seo: SeoMetaItem;
  effectiveTitle: string;
  effectiveDescription: string;
  effectiveCanonical: string;
  effectiveRobotsIndex: 'index' | 'noindex';
  effectiveRobotsFollow: 'follow' | 'nofollow';
  effectiveSchemaType: string;
  hasCustomSeoTitle: boolean;
  hasCustomMetaDescription: boolean;
  analysis: SeoAnalysisReport;
  adminEditUrl: string;
  incomingLinks: {
    fromPath: string;
    fromTitle: string;
    anchorText: string;
  }[];
  outgoingLinks: {
    toPath: string;
    anchorText: string;
    isBroken: boolean;
  }[];
}

export interface InternalLinkSuggestion {
  targetPath: string;
  targetTitle: string;
  contentType: ContentTypeKey;
  category: string;
  relevanceScore: number;
  suggestedAnchorTexts: string[];
  matchedTerms: string[];
  alreadyLinked: boolean;
}

export interface AnchorTextWarning {
  anchorText: string;
  count: number;
  targetPaths: string[];
  issue: 'repetitive' | 'generic' | 'over-optimized';
  recommendation: string;
}

export interface RedirectValidationIssue {
  redirectId: string;
  source: string;
  destination: string;
  severity: 'error' | 'warning';
  issueType: 'loop' | 'chain' | 'duplicate_source' | 'invalid_destination';
  message: string;
  suggestedFix?: string;
}

export interface SiteSeoAuditSummary {
  pages: SiteSeoPageEntry[];
  totalPublishedBlogs: number;
  totalDraftBlogs: number;
  totalScheduledBlogs: number;
  totalServices: number;
  totalCaseStudies: number;
  totalStaticPages: number;
  averageSeoScore: number;
  missingSeoTitlePages: SiteSeoPageEntry[];
  missingMetaDescPages: SiteSeoPageEntry[];
  duplicateMetadataPages: {
    type: 'title' | 'description';
    value: string;
    paths: string[];
  }[];
  missingImageAltPages: SiteSeoPageEntry[];
  noindexPages: SiteSeoPageEntry[];
  canonicalIssuePages: SiteSeoPageEntry[];
  orphanPages: SiteSeoPageEntry[];
  brokenInternalLinks: {
    fromPath: string;
    fromTitle: string;
    brokenHref: string;
    anchorText: string;
  }[];
  anchorWarnings: AnchorTextWarning[];
  redirectIssues: RedirectValidationIssue[];
}

export function isScheduledBlogLive(blog: { status?: string; scheduledAt?: string }): boolean {
  if (!blog.status || blog.status === 'published') return true;
  if (blog.status === 'draft') return false;
  if (blog.status === 'scheduled' && blog.scheduledAt) {
    const schedTime = new Date(blog.scheduledAt).getTime();
    if (!isNaN(schedTime) && schedTime <= Date.now()) {
      return true;
    }
  }
  return false;
}

const CORE_STATIC_PAGES: {
  path: string;
  slug: string;
  title: string;
  category: string;
  adminEditUrl: string;
  getExcerptAndHtml: (content: SiteContentData) => {
    excerpt: string;
    html: string;
    image?: string;
    imageAlt?: string;
  };
}[] = [
  {
    path: '/',
    slug: 'home',
    title: 'EcomVanta Homepage',
    category: 'Core Page',
    adminEditUrl: '/admin/homepage',
    getExcerptAndHtml: (c) => {
      const hero = c.homepage?.hero;
      const blocksHtml = (c.homepage?.seoContentBlocks || [])
        .map((b) => `<h2>${b.heading}</h2>${b.content}`)
        .join('\n');
      const platformsLinks = (c.homepage?.platforms || [])
        .map((p) => `<p><a href="${p.link}">${p.title}</a>: ${p.desc}</p>`)
        .join('\n');
      return {
        excerpt: hero?.subtitle || c.branding?.metaDescription || '',
        html: `<p>${hero?.subtitle || ''}</p>\n${platformsLinks}\n${blocksHtml}`,
        image: hero?.heroImage || c.branding?.headerLogo,
        imageAlt: `${c.branding?.siteName || 'EcomVanta'} Marketplace Account Management`,
      };
    },
  },
  {
    path: '/about-us',
    slug: 'about-us',
    title: 'About EcomVanta',
    category: 'Core Page',
    adminEditUrl: '/admin/about-us',
    getExcerptAndHtml: (c) => ({
      excerpt: c.aboutUs?.heroSubtitle || c.aboutUs?.storyDesc || '',
      html: `<h2>${c.aboutUs?.storyTitle || 'Who We Are'}</h2><p>${c.aboutUs?.storyDesc || ''}</p><h2>${c.aboutUs?.missionTitle || 'Our Mission'}</h2><p>${c.aboutUs?.missionDesc || ''}</p><h2>${c.aboutUs?.visionTitle || 'Our Vision'}</h2><p>${c.aboutUs?.visionDesc || ''}</p><p><a href="/contact-us">Partner With EcomVanta</a> or explore our <a href="/portfolio">Brand Growth Portfolio</a>.</p>`,
      image: c.aboutUs?.heroImage,
      imageAlt: 'About EcomVanta Team and Marketplace Growth Mission',
    }),
  },
  {
    path: '/founder',
    slug: 'founder',
    title: 'Meet Our Founder & CEO - Shivam Dubey',
    category: 'Core Page',
    adminEditUrl: '/admin/founder',
    getExcerptAndHtml: (c) => ({
      excerpt: c.founder?.heroSubtitle || '',
      html: `<h2>${c.founder?.bioHeading || 'Leadership Story'}</h2>${(c.founder?.bioParagraphs || []).map((p) => `<p>${p}</p>`).join('')}<h2>${c.founder?.visionHeading || 'Our Vision'}</h2><p>${c.founder?.visionText || ''}</p><p><a href="/about-us">Learn more about EcomVanta</a> and <a href="/contact-us">Book a Strategy Call</a>.</p>`,
      image: c.founder?.founderImage,
      imageAlt: `${c.founder?.founderName || 'Shivam Dubey'} - Founder & CEO of EcomVanta`,
    }),
  },
  {
    path: '/portfolio',
    slug: 'portfolio',
    title: 'Client Portfolio & Case Studies',
    category: 'Core Page',
    adminEditUrl: '/admin/case-studies',
    getExcerptAndHtml: () => ({
      excerpt: 'Verified marketplace growth portfolio, Amazon & Flipkart sales screenshots, and brand storefront designs by EcomVanta.',
      html: `<h2>Marketplace Sales Growth &amp; Brand Storefronts</h2><p>Explore verified client results across <a href="/amazon-seller-account-management-services">Amazon Account Management</a>, <a href="/flipkart-account-management-services">Flipkart</a>, and D2C stores. Read our full case studies including <a href="/kay-kay-industries-amazon-case-study">Kay Kay Industries</a> and <a href="/gataca-performance-supplements-amazon-case-study">Gataca Performance Supplements</a>.</p>`,
      image: '/ecomvanta-logo.png',
      imageAlt: 'EcomVanta Client Portfolio and Sales Results',
    }),
  },
  {
    path: '/blogs',
    slug: 'blogs',
    title: 'EcomVanta Insights & Blogs',
    category: 'Core Page',
    adminEditUrl: '/admin/blogs',
    getExcerptAndHtml: (c) => ({
      excerpt: 'Explore battle-tested marketplace strategies, seller onboarding guides, PPC tutorials, and catalog optimization insights.',
      html: `<h2>Latest Marketplace Guides &amp; Seller Tutorials</h2><p>Stay ahead of marketplace algorithm updates with EcomVanta's insights.</p><ul>${(c.blogs || []).map((b) => `<li><a href="/blogs/${b.slug}">${b.title}</a></li>`).join('')}</ul>`,
      image: '/arvian-blogs.jpeg',
      imageAlt: 'EcomVanta Insights and Marketplace Blogs',
    }),
  },
  {
    path: '/career',
    slug: 'career',
    title: 'Careers at EcomVanta',
    category: 'Core Page',
    adminEditUrl: '/admin/careers',
    getExcerptAndHtml: (c) => ({
      excerpt: c.careerPage?.heroSubtitle || '',
      html: `<h2>${c.careerPage?.whyJoinTitle || 'Why Join EcomVanta?'}</h2><p>${c.careerPage?.whyJoinDescription || ''}</p><p>${c.careerPage?.pitchText || ''}</p><p>Have questions? <a href="/contact-us">Contact our HR team</a> or learn more <a href="/about-us">About Us</a>.</p>`,
      image: c.careerPage?.bannerImage,
      imageAlt: 'Careers at EcomVanta New Delhi',
    }),
  },
  {
    path: '/contact-us',
    slug: 'contact-us',
    title: 'Contact EcomVanta - Free Marketplace Growth Audit',
    category: 'Core Page',
    adminEditUrl: '/admin/contact-footer',
    getExcerptAndHtml: (c) => ({
      excerpt: `Contact EcomVanta at ${c.contactFooter?.supportEmail || 'ecomvanta40@gmail.com'} or ${c.contactFooter?.contactPhone || '+91 878 724 9407'} for a free marketplace account audit.`,
      html: `<h2>Get Your Free Marketplace Growth Consultation</h2><p>Reach out to our New Delhi headquarters for <a href="/amazon-seller-account-management-services">Amazon</a>, <a href="/flipkart-account-management-services">Flipkart</a>, <a href="/blinkit-seller-account-management-services">Blinkit</a>, and <a href="/shopify-store-management-services">Shopify</a> account management.</p>`,
      image: '/contact-bg.webp',
      imageAlt: 'Contact EcomVanta Support Team',
    }),
  },
  {
    path: '/ecommerce-service-provider-in-delhi',
    slug: 'ecommerce-service-provider-in-delhi',
    title: 'Ecommerce Service Provider in Delhi NCR',
    category: 'Regional Landing Page',
    adminEditUrl: '/admin/seo/bulk-editor',
    getExcerptAndHtml: () => ({
      excerpt: 'Leading Ecommerce Service Provider in Delhi NCR offering end-to-end Amazon, Flipkart, Meesho, Myntra, Blinkit, and D2C store management.',
      html: `<h2>Trusted Ecommerce Service Provider in Delhi NCR</h2><p>EcomVanta helps manufacturers, retailers, and D2C brands in Delhi NCR scale across <a href="/amazon-seller-account-management-services">Amazon Seller Central</a>, <a href="/flipkart-account-management-services">Flipkart</a>, <a href="/meesho-account-management-services">Meesho</a>, and <a href="/blinkit-seller-account-management-services">Blinkit</a>.</p><h3>Why Brands in Delhi Choose EcomVanta</h3><p>From catalog shoots and GST/APOB guidance to daily Sponsored Ads management, our New Delhi specialists deliver measurable GMV growth. <a href="/contact-us">Book a free consultation</a> today.</p>`,
      image: '/ecommerce-growth-partners.webp',
      imageAlt: 'Ecommerce Service Provider in Delhi NCR - EcomVanta',
    }),
  },
];

export function buildValidInternalPathsSet(content: SiteContentData = DEFAULT_SITE_CONTENT): Set<string> {
  const valid = new Set<string>();
  CORE_STATIC_PAGES.forEach((p) => valid.add(p.path));
  valid.add('/amazon-seller-account-management-services');

  Object.keys(content.services || {}).forEach((slug) => {
    valid.add(`/${slug}`);
  });
  Object.keys(content.caseStudies || {}).forEach((slug) => {
    valid.add(`/${slug}`);
  });
  (content.blogs || []).forEach((blog) => {
    if (blog.slug) {
      valid.add(`/blogs/${blog.slug}`);
    }
  });
  (content.seoConfig?.redirects || []).forEach((r) => {
    if (r.enabled && r.source) {
      valid.add(r.source.startsWith('/') ? r.source : `/${r.source}`);
    }
  });
  return valid;
}

export function buildSiteSeoInventory(content: SiteContentData = DEFAULT_SITE_CONTENT): SiteSeoAuditSummary {
  const cfg: SeoSystemConfig = content.seoConfig || DEFAULT_SEO_CONFIG;
  const validPaths = buildValidInternalPathsSet(content);

  interface RawPageItem {
    id: string;
    urlPath: string;
    slug: string;
    title: string;
    contentType: ContentTypeKey;
    category: string;
    status: 'published' | 'draft' | 'scheduled';
    updatedAt: string;
    publishedAt?: string;
    scheduledAt?: string;
    author?: string;
    brandName?: string;
    excerpt: string;
    htmlContent: string;
    featuredImage?: string;
    featuredImageAlt?: string;
    seo: SeoMetaItem;
    adminEditUrl: string;
  }

  const rawItems: RawPageItem[] = [];

  // 1. Core Static Pages
  for (const sp of CORE_STATIC_PAGES) {
    const extracted = sp.getExcerptAndHtml(content);
    const savedSeo = cfg.pageSeo?.[sp.path] || createEmptySeoMeta({ breadcrumbTitle: sp.title });
    rawItems.push({
      id: `static:${sp.path}`,
      urlPath: sp.path,
      slug: sp.slug,
      title: sp.title,
      contentType: 'staticPage',
      category: sp.category,
      status: 'published',
      updatedAt: savedSeo.updatedAt || '2026-10-16T00:00:00.000Z',
      excerpt: extracted.excerpt,
      htmlContent: extracted.html,
      featuredImage: extracted.image,
      featuredImageAlt: extracted.imageAlt,
      seo: savedSeo,
      adminEditUrl: sp.adminEditUrl,
    });
  }

  // 2. Dedicated Amazon Service Route + All Dynamic Services
  const allServicesMap: Record<string, any> = {
    'amazon-seller-account-management-services': {
      slug: 'amazon-seller-account-management-services',
      title: 'Amazon Seller Account Management Services',
      subtitle: 'Scale your Amazon business with end-to-end Seller Central handling, A+ cataloging, FBA inventory planning, and Sponsored Ads PPC optimization.',
      heroImage: '/home-img/Amazon-account-management.webp',
      aboutTitle: 'Why Choose Our Amazon Account Management Services?',
      aboutDesc: 'Over 8+ years managing high-GMV Seller and Vendor Central accounts across India with data-driven keyword targeting and proactive account health protection.',
      servicesGrid: [
        { title: 'Account Setup & Onboarding', desc: 'Seamless brand registry, GTIN exemptions, and category approvals.' },
        { title: 'Amazon PPC Advertising', desc: 'Sponsored Products, Brands & Display ads optimization for lower ACOS.' },
        { title: 'Catalog & Listing Optimization', desc: 'Keyword-rich titles, bullet points, infographics, and Premium A+ content.' },
      ],
    },
    ...(content.services || {}),
  };

  for (const [slug, srv] of Object.entries(allServicesMap)) {
    const urlPath = `/${slug}`;
    const savedSeo =
      cfg.pageSeo?.[urlPath] ||
      (srv as any).seo ||
      createEmptySeoMeta({
        focusKeyword: srv.title,
        secondaryKeywords: [`${srv.title} India`, 'EcomVanta Marketplace Management'],
        seoTitle: `${srv.title} | Certified Growth Partner | EcomVanta`,
        metaDescription: srv.subtitle || srv.aboutDesc || '',
        canonicalUrl: `${(cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '')}${urlPath}`,
        breadcrumbTitle: srv.title,
        schemaType: 'Service',
        faqSchemaEnabled: Boolean(srv.faqs && srv.faqs.length > 0),
      });

    const gridHtml = (srv.servicesGrid || [])
      .map((g: any) => `<h3>${g.title}</h3><p>${g.desc}</p>`)
      .join('\n');
    const advHtml = (srv.advantages || [])
      .map((a: any) => `<h3>${a.title}</h3><p>${a.desc}</p>`)
      .join('\n');
    const htmlContent = `<h2>${srv.aboutTitle || srv.title}</h2><p>${srv.aboutDesc || srv.subtitle || ''}</p><h2>What We Deliver</h2>${gridHtml}<h2>The EcomVanta Growth Advantage</h2>${advHtml}<p>Ready to scale? <a href="/contact-us">Book a Free Growth Audit</a> or explore our <a href="/blogs">Marketplace Seller Guides</a>.</p>`;

    rawItems.push({
      id: `service:${slug}`,
      urlPath,
      slug,
      title: srv.title || slug,
      contentType: 'service',
      category: 'Marketplace Service',
      status: 'published',
      updatedAt: savedSeo.updatedAt || '2026-10-16T00:00:00.000Z',
      excerpt: srv.subtitle || srv.aboutDesc || '',
      htmlContent,
      featuredImage: srv.heroImage,
      featuredImageAlt: srv.title,
      seo: savedSeo,
      adminEditUrl: `/admin/services/${slug}`,
    });
  }

  // 3. Case Studies
  for (const [slug, cs] of Object.entries(content.caseStudies || {})) {
    const urlPath = `/${slug}`;
    const savedSeo =
      cfg.pageSeo?.[urlPath] ||
      (cs as any).seo ||
      createEmptySeoMeta({
        focusKeyword: `${cs.brandName} Amazon Case Study`,
        secondaryKeywords: [cs.category, 'Amazon Growth Case Study', 'EcomVanta Results'],
        seoTitle: `${cs.title} | ${cs.brandName} Case Study | EcomVanta`,
        metaDescription: cs.subtitle || '',
        canonicalUrl: `${(cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '')}${urlPath}`,
        breadcrumbTitle: `${cs.brandName} Case Study`,
        schemaType: 'Article',
      });

    const solutionsHtml = (cs.solutions || [])
      .map((s) => `<h3>${s.title}</h3><p>${s.desc}</p>`)
      .join('\n');
    const resultsHtml = (cs.results || [])
      .map((r) => `<h3>${r.stat} - ${r.title}</h3><p>${r.desc}</p>`)
      .join('\n');
    const htmlContent = `<h2>${cs.challengeTitle || 'The Challenge'}</h2><ul>${(cs.challenges || []).map((c) => `<li>${c}</li>`).join('')}</ul><h2>${cs.solutionTitle || 'Our Strategic Solution'}</h2>${solutionsHtml}<h2>${cs.resultsTitle || 'Documented Results'}</h2>${resultsHtml}<p>Want similar results on Amazon? Explore our <a href="/amazon-seller-account-management-services">Amazon Account Management Services</a> or <a href="/contact-us">Request a Free Consultation</a>.</p>`;

    rawItems.push({
      id: `caseStudy:${slug}`,
      urlPath,
      slug,
      title: cs.title,
      contentType: 'caseStudy',
      category: cs.category || 'Case Study',
      status: 'published',
      updatedAt: savedSeo.updatedAt || '2026-10-16T00:00:00.000Z',
      brandName: cs.brandName,
      excerpt: cs.subtitle || '',
      htmlContent,
      featuredImage: cs.dashboardImage || cs.brandLogo,
      featuredImageAlt: `${cs.brandName} - ${cs.title}`,
      seo: savedSeo,
      adminEditUrl: `/admin/case-studies/${slug}`,
    });
  }

  // 4. Blog Articles
  for (const blog of content.blogs || []) {
    const slug = blog.slug || blog.id;
    const urlPath = `/blogs/${slug}`;
    const savedSeo =
      blog.seo ||
      cfg.pageSeo?.[urlPath] ||
      createEmptySeoMeta({
        focusKeyword: blog.category ? `${blog.category} Guide` : blog.title,
        breadcrumbTitle: blog.title,
        schemaType: 'BlogPosting',
        ogType: 'article',
      });

    const effectiveStatus: 'published' | 'draft' | 'scheduled' =
      blog.status === 'scheduled' && isScheduledBlogLive(blog)
        ? 'published'
        : (blog.status || 'published');

    rawItems.push({
      id: `blog:${blog.id}`,
      urlPath,
      slug,
      title: blog.title,
      contentType: 'blog',
      category: blog.category || 'eCommerce',
      status: effectiveStatus,
      updatedAt: blog.updatedAt || blog.publishedAt || blog.date || '2026-10-16T00:00:00.000Z',
      publishedAt: blog.publishedAt || blog.date,
      scheduledAt: blog.scheduledAt,
      author: blog.author,
      excerpt: blog.excerpt || '',
      htmlContent: blog.content || '',
      featuredImage: blog.image,
      featuredImageAlt: blog.imageAlt || '',
      seo: savedSeo,
      adminEditUrl: `/admin/blogs/${slug}`,
    });
  }

  // First pass: resolve effective titles & descriptions for duplicate detection
  const resolvedMetas = rawItems.map((item) => {
    const res = resolveEffectiveSeoMeta({
      contentType: item.contentType,
      title: item.title,
      excerpt: item.excerpt,
      urlPath: item.urlPath,
      category: item.category,
      author: item.author,
      brandName: item.brandName,
      featuredImage: item.featuredImage,
      seo: item.seo,
      seoConfig: cfg,
    });
    return {
      path: item.urlPath,
      title: res.effectiveTitle,
      description: res.effectiveDescription,
      resolved: res,
    };
  });

  const allTitlesList = resolvedMetas.map((m) => ({ path: m.path, title: m.title }));
  const allDescsList = resolvedMetas.map((m) => ({ path: m.path, description: m.description }));

  // Build incoming/outgoing link maps
  const incomingMap = new Map<string, { fromPath: string; fromTitle: string; anchorText: string }[]>();
  const outgoingMap = new Map<string, { toPath: string; anchorText: string; isBroken: boolean }[]>();
  const brokenInternalLinks: SiteSeoAuditSummary['brokenInternalLinks'] = [];
  const anchorCounter = new Map<string, { count: number; targets: Set<string> }>();

  for (const item of rawItems) {
    if (item.status !== 'published') continue;
    const links = extractLinksFromHtml(item.htmlContent, cfg.siteUrl, validPaths);
    const internalOnly = links.filter((l) => l.isInternal);
    outgoingMap.set(
      item.urlPath,
      internalOnly.map((l) => ({
        toPath: l.href,
        anchorText: l.anchorText,
        isBroken: l.isBroken,
      }))
    );

    for (const l of internalOnly) {
      if (l.isBroken) {
        brokenInternalLinks.push({
          fromPath: item.urlPath,
          fromTitle: item.title,
          brokenHref: l.href,
          anchorText: l.anchorText,
        });
      }
      const existingInc = incomingMap.get(l.href) || [];
      existingInc.push({
        fromPath: item.urlPath,
        fromTitle: item.title,
        anchorText: l.anchorText,
      });
      incomingMap.set(l.href, existingInc);

      const normAnchor = l.anchorText.trim().toLowerCase();
      if (normAnchor) {
        const entry = anchorCounter.get(normAnchor) || { count: 0, targets: new Set<string>() };
        entry.count += 1;
        entry.targets.add(l.href);
        anchorCounter.set(normAnchor, entry);
      }
    }
  }

  // Also add site navigation awareness for core pages, while keeping content-level incoming links accurate
  const pages: SiteSeoPageEntry[] = rawItems.map((item, idx) => {
    const res = resolvedMetas[idx].resolved;
    const analysis = analyzeContentSeo({
      contentType: item.contentType,
      title: item.title,
      slug: item.slug,
      urlPath: item.urlPath,
      excerpt: item.excerpt,
      htmlContent: item.htmlContent,
      featuredImage: item.featuredImage,
      featuredImageAlt: item.featuredImageAlt,
      category: item.category,
      author: item.author,
      brandName: item.brandName,
      seo: item.seo,
      seoConfig: cfg,
      allOtherTitles: allTitlesList,
      allOtherDescriptions: allDescsList,
      validInternalPaths: validPaths,
    });

    return {
      id: item.id,
      urlPath: item.urlPath,
      slug: item.slug,
      title: item.title,
      contentType: item.contentType,
      category: item.category,
      status: item.status,
      updatedAt: item.updatedAt,
      publishedAt: item.publishedAt,
      scheduledAt: item.scheduledAt,
      author: item.author,
      excerpt: item.excerpt,
      htmlContent: item.htmlContent,
      featuredImage: item.featuredImage,
      featuredImageAlt: item.featuredImageAlt,
      seo: item.seo,
      effectiveTitle: res.effectiveTitle,
      effectiveDescription: res.effectiveDescription,
      effectiveCanonical: res.effectiveCanonical,
      effectiveRobotsIndex: res.effectiveRobotsIndex,
      effectiveRobotsFollow: res.effectiveRobotsFollow,
      effectiveSchemaType: res.effectiveSchemaType,
      hasCustomSeoTitle: Boolean(item.seo?.seoTitle && item.seo.seoTitle.trim().length > 0),
      hasCustomMetaDescription: Boolean(item.seo?.metaDescription && item.seo.metaDescription.trim().length > 0),
      analysis,
      adminEditUrl: item.adminEditUrl,
      incomingLinks: incomingMap.get(item.urlPath) || [],
      outgoingLinks: outgoingMap.get(item.urlPath) || [],
    };
  });

  // Compute summary metrics
  const publishedBlogs = pages.filter((p) => p.contentType === 'blog' && p.status === 'published');
  const draftBlogs = pages.filter((p) => p.contentType === 'blog' && p.status === 'draft');
  const scheduledBlogs = pages.filter((p) => p.contentType === 'blog' && p.status === 'scheduled');
  const servicesPages = pages.filter((p) => p.contentType === 'service');
  const caseStudiesPages = pages.filter((p) => p.contentType === 'caseStudy');
  const staticPages = pages.filter((p) => p.contentType === 'staticPage');

  const avgScore =
    pages.length > 0
      ? Math.round(pages.reduce((sum, p) => sum + p.analysis.overallScore, 0) / pages.length)
      : 0;

  const missingSeoTitlePages = pages.filter((p) => !p.hasCustomSeoTitle || !p.effectiveTitle);
  const missingMetaDescPages = pages.filter((p) => !p.hasCustomMetaDescription || !p.effectiveDescription);

  // Duplicate metadata groups
  const duplicateMetadataPages: SiteSeoAuditSummary['duplicateMetadataPages'] = [];
  const titleGroups = new Map<string, string[]>();
  const descGroups = new Map<string, string[]>();

  for (const p of pages) {
    const tKey = p.effectiveTitle.trim().toLowerCase();
    if (tKey) {
      titleGroups.set(tKey, [...(titleGroups.get(tKey) || []), p.urlPath]);
    }
    const dKey = p.effectiveDescription.trim().toLowerCase();
    if (dKey) {
      descGroups.set(dKey, [...(descGroups.get(dKey) || []), p.urlPath]);
    }
  }
  for (const [val, paths] of titleGroups.entries()) {
    if (paths.length > 1) {
      duplicateMetadataPages.push({ type: 'title', value: val, paths });
    }
  }
  for (const [val, paths] of descGroups.entries()) {
    if (paths.length > 1) {
      duplicateMetadataPages.push({ type: 'description', value: val, paths });
    }
  }

  const missingImageAltPages = pages.filter((p) => p.analysis.missingAltCount > 0);
  const noindexPages = pages.filter((p) => p.effectiveRobotsIndex === 'noindex');
  const canonicalIssuePages = pages.filter((p) => {
    if (!p.effectiveCanonical || !/^https?:\/\/.+/i.test(p.effectiveCanonical)) return true;
    const expectedSite = (cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '');
    return !p.effectiveCanonical.startsWith(expectedSite);
  });

  // Orphan pages: published, indexable pages (excluding homepage '/') that have 0 incoming contextual links
  const orphanPages = pages.filter(
    (p) =>
      p.status === 'published' &&
      p.effectiveRobotsIndex === 'index' &&
      p.urlPath !== '/' &&
      p.incomingLinks.length === 0
  );

  // Anchor text warnings
  const anchorWarnings: AnchorTextWarning[] = [];
  const genericPhrases = new Set(['click here', 'read more', 'learn more', 'here', 'link', 'website', 'this page']);
  for (const [anchor, info] of anchorCounter.entries()) {
    if (genericPhrases.has(anchor)) {
      anchorWarnings.push({
        anchorText: anchor,
        count: info.count,
        targetPaths: Array.from(info.targets),
        issue: 'generic',
        recommendation: 'Replace generic anchor text like "click here" or "read more" with descriptive topic keywords.',
      });
    } else if (info.count >= 5 && info.targets.size === 1) {
      anchorWarnings.push({
        anchorText: anchor,
        count: info.count,
        targetPaths: Array.from(info.targets),
        issue: 'repetitive',
        recommendation: 'Vary your anchor text phrasing using natural synonyms instead of repeating the exact same anchor phrase every time.',
      });
    } else if (info.targets.size > 1) {
      anchorWarnings.push({
        anchorText: anchor,
        count: info.count,
        targetPaths: Array.from(info.targets),
        issue: 'over-optimized',
        recommendation: `The exact anchor text "${anchor}" points to ${info.targets.size} different URLs (${Array.from(info.targets).join(', ')}). Use distinct anchors for different target pages.`,
      });
    }
  }

  const redirectIssues = validateRedirects(cfg.redirects || [], validPaths);

  return {
    pages,
    totalPublishedBlogs: publishedBlogs.length,
    totalDraftBlogs: draftBlogs.length,
    totalScheduledBlogs: scheduledBlogs.length,
    totalServices: servicesPages.length,
    totalCaseStudies: caseStudiesPages.length,
    totalStaticPages: staticPages.length,
    averageSeoScore: avgScore,
    missingSeoTitlePages,
    missingMetaDescPages,
    duplicateMetadataPages,
    missingImageAltPages,
    noindexPages,
    canonicalIssuePages,
    orphanPages,
    brokenInternalLinks,
    anchorWarnings,
    redirectIssues,
  };
}

export function validateRedirects(
  redirects: SeoRedirectRule[],
  validInternalPaths?: Set<string>
): RedirectValidationIssue[] {
  const issues: RedirectValidationIssue[] = [];
  const activeRedirects = redirects.filter((r) => r.enabled);
  const sourceMap = new Map<string, SeoRedirectRule[]>();

  for (const r of activeRedirects) {
    const src = (r.source || '').trim();
    if (!src) continue;
    sourceMap.set(src, [...(sourceMap.get(src) || []), r]);
  }

  for (const r of activeRedirects) {
    const src = (r.source || '').trim();
    const dest = (r.destination || '').trim();

    // 1. Direct self-loop
    if (src === dest) {
      issues.push({
        redirectId: r.id,
        source: src,
        destination: dest,
        severity: 'error',
        issueType: 'loop',
        message: `Direct redirect loop: ${src} redirects to itself.`,
        suggestedFix: 'Delete this redirect or change the destination URL.',
      });
      continue;
    }

    // 2. Duplicate source rules
    const sameSource = sourceMap.get(src) || [];
    if (sameSource.length > 1 && sameSource[0].id !== r.id) {
      issues.push({
        redirectId: r.id,
        source: src,
        destination: dest,
        severity: 'error',
        issueType: 'duplicate_source',
        message: `Conflicting redirect rule: Multiple active redirects exist for source "${src}".`,
        suggestedFix: 'Remove or disable the duplicate redirect rule.',
      });
    }

    // 3. Chain or cycle detection (A -> B -> C or A -> B -> A)
    const visited = new Set<string>([src]);
    let currentDest = dest;
    const chain: string[] = [src, dest];
    let isCycle = false;

    while (sourceMap.has(currentDest)) {
      if (visited.has(currentDest)) {
        isCycle = true;
        break;
      }
      visited.add(currentDest);
      const nextRule = sourceMap.get(currentDest)?.[0];
      if (!nextRule) break;
      currentDest = nextRule.destination.trim();
      chain.push(currentDest);
      if (chain.length > 8) {
        isCycle = true;
        break;
      }
    }

    if (isCycle) {
      issues.push({
        redirectId: r.id,
        source: src,
        destination: dest,
        severity: 'error',
        issueType: 'loop',
        message: `Infinite redirect cycle detected: ${chain.join(' → ')}`,
        suggestedFix: 'Break the cycle by pointing directly to the final live destination URL.',
      });
    } else if (chain.length > 2) {
      issues.push({
        redirectId: r.id,
        source: src,
        destination: dest,
        severity: 'warning',
        issueType: 'chain',
        message: `Redirect chain detected (${chain.length - 1} hops): ${chain.join(' → ')}`,
        suggestedFix: `Update destination of "${src}" directly to "${currentDest}" to eliminate extra redirect hops.`,
      });
    }

    // 4. Invalid destination check
    if (dest.startsWith('/') && validInternalPaths && validInternalPaths.size > 0) {
      const cleanDest = dest.split('?')[0].split('#')[0];
      if (!validInternalPaths.has(cleanDest) && !sourceMap.has(cleanDest)) {
        issues.push({
          redirectId: r.id,
          source: src,
          destination: dest,
          severity: 'warning',
          issueType: 'invalid_destination',
          message: `Destination "${dest}" does not match any known published page, blog post, or service route.`,
          suggestedFix: 'Verify that the destination path exists or point to a valid published URL.',
        });
      }
    } else if (!dest.startsWith('/') && !/^https?:\/\/.+/i.test(dest)) {
      issues.push({
        redirectId: r.id,
        source: src,
        destination: dest,
        severity: 'error',
        issueType: 'invalid_destination',
        message: `Destination "${dest}" must start with "/" (internal path) or "https://" (external URL).`,
        suggestedFix: `Change destination to "/${dest.replace(/^\/+/, '')}".`,
      });
    }
  }

  return issues;
}

/**
 * Generates contextual internal link suggestions for a given article/page based on actual database content.
 */
export function getContextualLinkSuggestions(params: {
  currentUrlPath: string;
  title: string;
  htmlContent: string;
  focusKeyword?: string;
  secondaryKeywords?: string[];
  category?: string;
  content?: SiteContentData;
  siteContent?: SiteContentData;
}): InternalLinkSuggestion[] {
  const { currentUrlPath, title, htmlContent, focusKeyword, secondaryKeywords, category } = params;
  const content = params.content || params.siteContent || DEFAULT_SITE_CONTENT;
  const plainText = `${title} ${focusKeyword || ''} ${(secondaryKeywords || []).join(' ')} ${category || ''} ${stripHtmlToText(htmlContent)}`.toLowerCase();
  const existingLinks = new Set(
    extractLinksFromHtml(htmlContent, content.seoConfig?.siteUrl)
      .filter((l) => l.isInternal)
      .map((l) => l.href)
  );

  const candidates: {
    targetPath: string;
    targetTitle: string;
    contentType: ContentTypeKey;
    category: string;
    keywords: string[];
    anchors: string[];
  }[] = [];

  // Add published blogs
  for (const b of content.blogs || []) {
    if (!isScheduledBlogLive(b)) continue;
    const path = `/blogs/${b.slug}`;
    if (path === currentUrlPath) continue;
    const kwList = [
      b.seo?.focusKeyword || '',
      ...(b.seo?.secondaryKeywords || []),
      ...(b.tags || []),
      b.category || '',
      ...b.title.split(/[^a-zA-Z0-9]+/).filter((w) => w.length > 4),
    ].filter(Boolean);

    candidates.push({
      targetPath: path,
      targetTitle: b.title,
      contentType: 'blog',
      category: b.category || 'Blog',
      keywords: kwList,
      anchors: [
        b.seo?.focusKeyword || b.title,
        b.seo?.breadcrumbTitle || b.title,
        `${b.category} Guide`,
      ].filter(Boolean),
    });
  }

  // Add services
  const servicesMap: Record<string, any> = {
    'amazon-seller-account-management-services': {
      title: 'Amazon Seller Account Management Services',
      category: 'Amazon',
    },
    ...(content.services || {}),
  };

  for (const [slug, srv] of Object.entries(servicesMap)) {
    const path = `/${slug}`;
    if (path === currentUrlPath) continue;
    const srvTitle = srv.title || slug.replace(/-/g, ' ');
    const tokens = srvTitle.split(/[^a-zA-Z0-9]+/).filter((w: string) => w.length > 3);
    candidates.push({
      targetPath: path,
      targetTitle: srvTitle,
      contentType: 'service',
      category: 'Service Page',
      keywords: [srvTitle, ...tokens],
      anchors: [
        srvTitle,
        srvTitle.replace(/Services$/i, '').trim(),
        `Professional ${srvTitle}`,
      ],
    });
  }

  // Add case studies
  for (const [slug, cs] of Object.entries(content.caseStudies || {})) {
    const path = `/${slug}`;
    if (path === currentUrlPath) continue;
    candidates.push({
      targetPath: path,
      targetTitle: `${cs.brandName}: ${cs.title}`,
      contentType: 'caseStudy',
      category: 'Case Study',
      keywords: [cs.brandName, cs.category, 'case study', 'amazon'],
      anchors: [
        `${cs.brandName} Amazon Case Study`,
        cs.title,
      ],
    });
  }

  // Score each candidate against current text
  const suggestions: InternalLinkSuggestion[] = [];
  for (const cand of candidates) {
    const matchedTerms: string[] = [];
    let score = 0;

    for (const kw of cand.keywords) {
      const cleanKw = kw.trim().toLowerCase();
      if (cleanKw.length < 3) continue;
      if (plainText.includes(cleanKw)) {
        matchedTerms.push(kw);
        score += cleanKw.includes(' ') ? 25 : 10;
      }
    }

    if (category && cand.category.toLowerCase().includes(category.toLowerCase())) {
      score += 15;
    }

    if (score > 0) {
      suggestions.push({
        targetPath: cand.targetPath,
        targetTitle: cand.targetTitle,
        contentType: cand.contentType,
        category: cand.category,
        relevanceScore: Math.min(100, score),
        suggestedAnchorTexts: Array.from(new Set(cand.anchors)).slice(0, 3),
        matchedTerms: Array.from(new Set(matchedTerms)).slice(0, 5),
        alreadyLinked: existingLinks.has(cand.targetPath),
      });
    }
  }

  return suggestions.sort((a, b) => {
    if (a.alreadyLinked !== b.alreadyLinked) return a.alreadyLinked ? 1 : -1;
    return b.relevanceScore - a.relevanceScore;
  });
}

/**
 * Safely generates deduplicated JSON-LD Schema.org objects for a given route.
 * Never fabricates reviews, ratings, prices, or unverified factual claims.
 */
export function generateJsonLdForRoute(
  urlPath: string,
  content: SiteContentData = DEFAULT_SITE_CONTENT
): Record<string, any>[] {
  const cfg = content.seoConfig || DEFAULT_SEO_CONFIG;
  const siteUrl = (cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '');
  const orgCfg = cfg.schemaOrg || DEFAULT_SEO_CONFIG.schemaOrg;
  const schemas: Record<string, any>[] = [];

  const cleanPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  const fullPageUrl = cleanPath === '/' ? siteUrl : `${siteUrl}${cleanPath}`;

  // 1. Organization Schema (on Homepage or globally referenced)
  if (orgCfg.enableOrganizationSchema && cleanPath === '/') {
    const logoUrl = orgCfg.orgLogo.startsWith('http')
      ? orgCfg.orgLogo
      : `${siteUrl}${orgCfg.orgLogo.startsWith('/') ? '' : '/'}${orgCfg.orgLogo}`;

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: orgCfg.orgName || content.branding?.siteName || 'EcomVanta',
      legalName: orgCfg.orgLegalName || orgCfg.orgName || 'EcomVanta',
      url: orgCfg.orgUrl || siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: logoUrl,
      },
      description: orgCfg.orgDescription || content.branding?.metaDescription,
      email: orgCfg.orgEmail || content.branding?.email,
      telephone: orgCfg.orgPhone || content.branding?.topbarPhone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: orgCfg.streetAddress || 'New Delhi',
        addressLocality: orgCfg.addressLocality || 'New Delhi',
        addressRegion: orgCfg.addressRegion || 'Delhi',
        postalCode: orgCfg.postalCode || '110001',
        addressCountry: orgCfg.addressCountry || 'IN',
      },
      sameAs: (orgCfg.sameAs || []).filter(Boolean),
    });
  }

  // 2. WebSite Schema (on Homepage)
  if (orgCfg.enableWebSiteSchema && cleanPath === '/') {
    const websiteSchema: Record<string, any> = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: orgCfg.orgName || content.branding?.siteName || 'EcomVanta',
      description: content.branding?.siteTagline || orgCfg.orgDescription,
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    };
    if (orgCfg.enableSiteSearchSchema) {
      websiteSchema.potentialAction = {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/blogs?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      };
    }
    schemas.push(websiteSchema);
  }

  // Find matching item in site inventory
  const blogMatch = cleanPath.startsWith('/blogs/')
    ? (content.blogs || []).find((b) => `/blogs/${b.slug}` === cleanPath)
    : undefined;
  const rawSlug = cleanPath.slice(1);
  const serviceMatch =
    rawSlug === 'amazon-seller-account-management-services'
      ? {
          slug: 'amazon-seller-account-management-services',
          title: 'Amazon Seller Account Management Services',
          subtitle: 'End-to-end Amazon Seller Central management, A+ cataloging, FBA inventory planning, and PPC optimization.',
          heroImage: '/home-img/Amazon-account-management.webp',
          faqs: [],
        }
      : content.services?.[rawSlug];
  const caseStudyMatch = content.caseStudies?.[rawSlug];
  const pageSeo = blogMatch?.seo || cfg.pageSeo?.[cleanPath];

  // 3. BreadcrumbList Schema (for all non-root pages when enabled)
  if (orgCfg.enableBreadcrumbsSchema && cleanPath !== '/') {
    const items: any[] = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ];

    if (blogMatch) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: `${siteUrl}/blogs`,
      });
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: blogMatch.seo?.breadcrumbTitle || blogMatch.title,
        item: fullPageUrl,
      });
    } else if (caseStudyMatch) {
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: `${siteUrl}/portfolio`,
      });
      items.push({
        '@type': 'ListItem',
        position: 3,
        name: pageSeo?.breadcrumbTitle || caseStudyMatch.brandName || caseStudyMatch.title,
        item: fullPageUrl,
      });
    } else {
      const fallbackTitle =
        pageSeo?.breadcrumbTitle ||
        serviceMatch?.title ||
        cleanPath
          .slice(1)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
      items.push({
        '@type': 'ListItem',
        position: 2,
        name: fallbackTitle,
        item: fullPageUrl,
      });
    }

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    });
  }

  // 4. Content-Specific Schema (BlogPosting / Article / Service / Product / WebPage / FAQPage)
  if (blogMatch) {
    const schemaType = blogMatch.seo?.schemaType || cfg.templates?.blog?.defaultSchemaType || 'BlogPosting';
    if (schemaType !== 'None') {
      const imgUrl = blogMatch.image?.startsWith('http')
        ? blogMatch.image
        : `${siteUrl}${blogMatch.image?.startsWith('/') ? '' : '/'}${blogMatch.image || 'arvian-blogs.jpeg'}`;

      schemas.push({
        '@context': 'https://schema.org',
        '@type': schemaType === 'Article' ? 'Article' : 'BlogPosting',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullPageUrl,
        },
        headline: blogMatch.seo?.articleSchema?.headline || blogMatch.seo?.seoTitle || blogMatch.title,
        description: blogMatch.seo?.metaDescription || blogMatch.excerpt,
        image: [imgUrl],
        author: {
          '@type': 'Person',
          name: blogMatch.seo?.articleSchema?.authorName || blogMatch.author || 'Arvind Ajmera',
        },
        publisher: {
          '@type': 'Organization',
          name: orgCfg.orgName || 'EcomVanta',
          logo: {
            '@type': 'ImageObject',
            url: orgCfg.orgLogo.startsWith('http') ? orgCfg.orgLogo : `${siteUrl}${orgCfg.orgLogo}`,
          },
        },
        datePublished: blogMatch.publishedAt || blogMatch.date,
        dateModified: blogMatch.updatedAt || blogMatch.publishedAt || blogMatch.date,
        articleSection: blogMatch.category || 'eCommerce',
        keywords: [
          blogMatch.seo?.focusKeyword,
          ...(blogMatch.seo?.secondaryKeywords || []),
          ...(blogMatch.tags || []),
        ]
          .filter(Boolean)
          .join(', '),
      });
    }

    if (blogMatch.seo?.faqSchemaEnabled && blogMatch.seo.customFaqs && blogMatch.seo.customFaqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: blogMatch.seo.customFaqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }
  } else if (serviceMatch) {
    const schemaType = pageSeo?.schemaType || cfg.templates?.service?.defaultSchemaType || 'Service';
    if (schemaType === 'Service') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceMatch.title,
        description: pageSeo?.metaDescription || serviceMatch.subtitle,
        url: fullPageUrl,
        provider: {
          '@type': 'Organization',
          name: orgCfg.orgName || 'EcomVanta',
          url: siteUrl,
        },
        areaServed: {
          '@type': 'Country',
          name: 'India',
        },
      });
    } else if (schemaType === 'Product' && pageSeo?.productSchema?.price) {
      // Only output Product + Offer schema when accurate product pricing data is explicitly configured
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: serviceMatch.title,
        description: pageSeo?.metaDescription || serviceMatch.subtitle,
        brand: {
          '@type': 'Brand',
          name: pageSeo.productSchema.brandName || orgCfg.orgName || 'EcomVanta',
        },
        ...(pageSeo.productSchema.sku ? { sku: pageSeo.productSchema.sku } : {}),
        offers: {
          '@type': 'Offer',
          url: pageSeo.productSchema.offerUrl || fullPageUrl,
          priceCurrency: pageSeo.productSchema.priceCurrency || 'INR',
          price: pageSeo.productSchema.price,
          availability: `https://schema.org/${pageSeo.productSchema.availability || 'InStock'}`,
        },
      });
    }

    const faqsToRender =
      pageSeo?.customFaqs && pageSeo.customFaqs.length > 0
        ? pageSeo.customFaqs
        : serviceMatch.faqs || [];

    if ((pageSeo?.faqSchemaEnabled !== false) && faqsToRender.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqsToRender.map((f: any) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }
  } else if (caseStudyMatch) {
    const schemaType = pageSeo?.schemaType || 'Article';
    if (schemaType !== 'None') {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: caseStudyMatch.title,
        description: pageSeo?.metaDescription || caseStudyMatch.subtitle,
        url: fullPageUrl,
        author: {
          '@type': 'Organization',
          name: orgCfg.orgName || 'EcomVanta',
        },
        publisher: {
          '@type': 'Organization',
          name: orgCfg.orgName || 'EcomVanta',
        },
      });
    }
  } else if (cleanPath === '/' && content.homepage?.faqs && content.homepage.faqs.length > 0 && pageSeo?.faqSchemaEnabled !== false) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.homepage.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  // Custom JSON-LD override if valid JSON
  if (pageSeo?.customJsonLd) {
    try {
      const parsed = JSON.parse(pageSeo.customJsonLd);
      if (parsed && typeof parsed === 'object') {
        schemas.push(parsed);
      }
    } catch {
      // Ignore malformed custom JSON-LD on public output
    }
  }

  // Deduplicate by @type so we never emit duplicate schema blocks of the same type
  const seenTypes = new Set<string>();
  const deduplicated: Record<string, any>[] = [];
  for (const s of schemas) {
    const t = String(s['@type'] || 'Unknown');
    if (!seenTypes.has(t)) {
      seenTypes.add(t);
      deduplicated.push(s);
    }
  }

  return deduplicated;
}
