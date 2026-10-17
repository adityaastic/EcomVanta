import {
  SeoMetaItem,
  SeoSystemConfig,
  DEFAULT_SEO_CONFIG,
  DEFAULT_ANALYZER_WEIGHTS,
  ContentTypeKey,
  SeoAnalyzerWeights,
} from './seoTypes';

export type SeoCheckStatus = 'pass' | 'warning' | 'error';

export type SeoCheckCategory =
  | 'keyword'
  | 'metadata'
  | 'content'
  | 'readability'
  | 'links'
  | 'technical';

export type EditorFieldTarget =
  | 'focusKeyword'
  | 'secondaryKeywords'
  | 'seoTitle'
  | 'metaDescription'
  | 'slug'
  | 'content'
  | 'excerpt'
  | 'imageAlt'
  | 'canonicalUrl'
  | 'robotsIndex'
  | 'schemaType'
  | 'internalLinks';

export interface SeoCheckResult {
  id: string;
  title: string;
  category: SeoCheckCategory;
  status: SeoCheckStatus;
  score: number;
  maxScore: number;
  currentValue?: string;
  whyItMatters: string;
  recommendation: string;
  fieldTarget?: EditorFieldTarget;
}

export interface InlineImageAudit {
  src: string;
  alt: string;
  title?: string;
  hasAlt: boolean;
}

export interface ExtractedLinkItem {
  href: string;
  anchorText: string;
  isInternal: boolean;
  isBroken: boolean;
  isNofollow: boolean;
}

export interface TocHeadingItem {
  id: string;
  level: number;
  text: string;
}

export interface SeoAnalysisReport {
  overallScore: number; // 0 - 100
  grade: 'Excellent' | 'Good' | 'Needs Improvement' | 'Critical Issues';
  passedCount: number;
  warningCount: number;
  errorCount: number;
  wordCount: number;
  charCount: number;
  readingTimeMinutes: number;
  paragraphCount: number;
  sentenceCount: number;
  avgWordsPerSentence: number;
  keywordCount: number;
  keywordDensity: number;
  headings: TocHeadingItem[];
  images: InlineImageAudit[];
  missingAltCount: number;
  internalLinks: ExtractedLinkItem[];
  externalLinks: ExtractedLinkItem[];
  brokenLinks: ExtractedLinkItem[];
  checks: SeoCheckResult[];
  effectiveTitle: string;
  effectiveDescription: string;
  effectiveCanonical: string;
  titlePixelWidth: number;
  descriptionPixelWidth: number;
}

export interface TemplateVariables {
  title?: string;
  siteName?: string;
  sep?: string;
  category?: string;
  excerpt?: string;
  author?: string;
  brandName?: string;
  date?: string;
  focusKeyword?: string;
}

export function resolveTemplateString(template: string, vars: TemplateVariables): string {
  if (!template) return '';
  const sep = vars.sep || '|';
  const siteName = vars.siteName || 'EcomVanta';
  return template
    .replace(/\{\{\s*title\s*\}\}/gi, vars.title || '')
    .replace(/\{\{\s*siteName\s*\}\}/gi, siteName)
    .replace(/\{\{\s*sep\s*\}\}/gi, sep)
    .replace(/\{\{\s*category\s*\}\}/gi, vars.category || '')
    .replace(/\{\{\s*excerpt\s*\}\}/gi, vars.excerpt || '')
    .replace(/\{\{\s*author\s*\}\}/gi, vars.author || '')
    .replace(/\{\{\s*brandName\s*\}\}/gi, vars.brandName || siteName)
    .replace(/\{\{\s*date\s*\}\}/gi, vars.date || '')
    .replace(/\{\{\s*focusKeyword\s*\}\}/gi, vars.focusKeyword || '')
    .replace(/\s+/g, ' ')
    .replace(new RegExp(`\\s*\\${sep}\\s*\\${sep}\\s*`, 'g'), ` ${sep} `)
    .replace(new RegExp(`^\\s*\\${sep}\\s*|\\s*\\${sep}\\s*$`, 'g'), '')
    .trim();
}

export function stripHtmlToText(html: string): string {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

export function calculateWordCountAndReadingTime(htmlOrText: string): {
  wordCount: number;
  charCount: number;
  readingTimeMinutes: number;
} {
  const clean = stripHtmlToText(htmlOrText);
  if (!clean) {
    return { wordCount: 0, charCount: 0, readingTimeMinutes: 1 };
  }
  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = clean.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
  return { wordCount, charCount, readingTimeMinutes };
}

export function extractHeadingsAndToc(html: string): TocHeadingItem[] {
  if (!html) return [];
  const regex = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings: TocHeadingItem[] = [];
  let match: RegExpExecArray | null;
  let idx = 0;

  while ((match = regex.exec(html)) !== null) {
    const level = parseInt(match[1], 10);
    const rawText = stripHtmlToText(match[2]);
    if (rawText) {
      idx += 1;
      const slugId =
        rawText
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || `section-${idx}`;
      headings.push({
        id: slugId,
        level,
        text: rawText,
      });
    }
  }
  return headings;
}

export function injectHeadingIdsIntoHtml(html: string): string {
  if (!html) return '';
  let idx = 0;
  return html.replace(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi, (full, level, attrs, inner) => {
    if (/id\s*=/i.test(attrs)) return full;
    const rawText = stripHtmlToText(inner);
    idx += 1;
    const slugId =
      rawText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || `section-${idx}`;
    return `<h${level}${attrs} id="${slugId}">${inner}</h${level}>`;
  });
}

export function extractInlineImages(html: string): InlineImageAudit[] {
  if (!html) return [];
  const regex = /<img\s+([^>]*?)>/gi;
  const images: InlineImageAudit[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const attrs = match[1];
    const srcMatch = attrs.match(/src\s*=\s*["']([^"']*)["']/i);
    const altMatch = attrs.match(/alt\s*=\s*["']([^"']*)["']/i);
    const titleMatch = attrs.match(/title\s*=\s*["']([^"']*)["']/i);
    const src = srcMatch ? srcMatch[1].trim() : '';
    const alt = altMatch ? altMatch[1].trim() : '';
    const title = titleMatch ? titleMatch[1].trim() : undefined;
    if (src) {
      images.push({
        src,
        alt,
        title,
        hasAlt: Boolean(alt && alt.length > 0),
      });
    }
  }
  return images;
}

export function extractLinksFromHtml(
  html: string,
  siteUrl: string = 'https://www.ecomvanta.in',
  validInternalPaths?: Set<string>
): ExtractedLinkItem[] {
  if (!html) return [];
  const regex = /<a\s+([^>]*?)>([\s\S]*?)<\/a>/gi;
  const links: ExtractedLinkItem[] = [];
  let match: RegExpExecArray | null;

  let siteHost = 'ecomvanta.in';
  try {
    siteHost = new URL(siteUrl).hostname.replace(/^www\./i, '');
  } catch {
    // fallback
  }

  while ((match = regex.exec(html)) !== null) {
    const attrs = match[1];
    const inner = match[2];
    const hrefMatch = attrs.match(/href\s*=\s*["']([^"']*)["']/i);
    const relMatch = attrs.match(/rel\s*=\s*["']([^"']*)["']/i);
    if (!hrefMatch) continue;

    const rawHref = hrefMatch[1].trim();
    if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('javascript:')) {
      continue;
    }

    const anchorText = stripHtmlToText(inner) || rawHref;
    const isNofollow = Boolean(relMatch && /nofollow/i.test(relMatch[1]));

    let isInternal = false;
    let normalizedPath = rawHref;

    if (rawHref.startsWith('/')) {
      isInternal = true;
      normalizedPath = rawHref.split('?')[0].split('#')[0] || '/';
    } else if (rawHref.startsWith('http://') || rawHref.startsWith('https://')) {
      try {
        const parsed = new URL(rawHref);
        const host = parsed.hostname.replace(/^www\./i, '');
        if (host === siteHost || host === 'localhost') {
          isInternal = true;
          normalizedPath = parsed.pathname || '/';
        }
      } catch {
        isInternal = false;
      }
    }

    if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    let isBroken = false;
    if (isInternal && validInternalPaths && validInternalPaths.size > 0) {
      isBroken = !validInternalPaths.has(normalizedPath);
    }

    links.push({
      href: isInternal ? normalizedPath : rawHref,
      anchorText,
      isInternal,
      isBroken,
      isNofollow,
    });
  }

  return links;
}

/**
 * Estimates Google SERP pixel width of a text string using character width heuristics.
 */
export function estimateSerpPixelWidth(text: string, isTitle = true): number {
  if (!text) return 0;
  let width = 0;
  const scale = isTitle ? 1.0 : 0.72;
  for (const ch of text) {
    if ('iIl1|!.,:;'.includes(ch)) width += 4.5 * scale;
    else if ('fjtJ()[]{}/\\-'.includes(ch)) width += 6.5 * scale;
    else if ('mwMW@%&QOGD'.includes(ch)) width += 13 * scale;
    else if (ch >= 'A' && ch <= 'Z') width += 10.5 * scale;
    else if (ch === ' ') width += 5 * scale;
    else width += 8.5 * scale;
  }
  return Math.round(width);
}

export interface AnalyzeSeoInput {
  contentType: ContentTypeKey;
  title: string;
  slug: string;
  urlPath: string;
  excerpt: string;
  htmlContent: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  category?: string;
  author?: string;
  brandName?: string;
  seo?: Partial<SeoMetaItem>;
  seoConfig?: SeoSystemConfig;
  allOtherTitles?: { path: string; title: string }[];
  allOtherDescriptions?: { path: string; description: string }[];
  validInternalPaths?: Set<string>;
}

export function resolveEffectiveSeoMeta(input: {
  contentType: ContentTypeKey;
  title: string;
  excerpt: string;
  urlPath: string;
  category?: string;
  author?: string;
  brandName?: string;
  featuredImage?: string;
  seo?: Partial<SeoMetaItem>;
  seoConfig?: SeoSystemConfig;
}): {
  effectiveTitle: string;
  effectiveDescription: string;
  effectiveCanonical: string;
  effectiveOgTitle: string;
  effectiveOgDescription: string;
  effectiveOgImage: string;
  effectiveRobotsIndex: 'index' | 'noindex';
  effectiveRobotsFollow: 'follow' | 'nofollow';
  effectiveSchemaType: string;
  usedTemplateTitle: boolean;
  usedTemplateDescription: boolean;
} {
  const cfg = input.seoConfig || DEFAULT_SEO_CONFIG;
  const tpl = cfg.templates?.[input.contentType] || DEFAULT_SEO_CONFIG.templates[input.contentType];
  const siteUrl = (cfg.siteUrl || 'https://www.ecomvanta.in').replace(/\/+$/, '');
  const siteName = cfg.schemaOrg?.orgName || 'EcomVanta';
  const sep = cfg.titleSeparator || '|';

  const templateVars: TemplateVariables = {
    title: input.title,
    siteName,
    sep,
    category: input.category || 'eCommerce',
    excerpt: input.excerpt || stripHtmlToText(input.title),
    author: input.author || 'EcomVanta',
    brandName: input.brandName || siteName,
    focusKeyword: input.seo?.focusKeyword || '',
  };

  const customTitle = input.seo?.seoTitle?.trim() || '';
  const customDesc = input.seo?.metaDescription?.trim() || '';

  const fallbackTitle = resolveTemplateString(tpl?.titleTemplate || '{{title}} {{sep}} {{siteName}}', templateVars);
  const fallbackDesc = resolveTemplateString(tpl?.descriptionTemplate || '{{excerpt}}', templateVars);

  const effectiveTitle = customTitle || (tpl?.autoFallbackIfEmpty !== false ? fallbackTitle : input.title);
  const effectiveDescription = customDesc || (tpl?.autoFallbackIfEmpty !== false ? fallbackDesc : input.excerpt);

  const cleanPath = input.urlPath.startsWith('/') ? input.urlPath : `/${input.urlPath}`;
  const defaultCanonical = cleanPath === '/' ? siteUrl : `${siteUrl}${cleanPath}`;
  const effectiveCanonical = input.seo?.canonicalUrl?.trim() || defaultCanonical;

  const effectiveRobotsIndex = cfg.globalNoindex
    ? 'noindex'
    : (input.seo?.robotsIndex || tpl?.defaultRobotsIndex || 'index');
  const effectiveRobotsFollow = input.seo?.robotsFollow || tpl?.defaultRobotsFollow || 'follow';

  const effectiveOgTitle = input.seo?.ogTitle?.trim() || effectiveTitle;
  const effectiveOgDescription = input.seo?.ogDescription?.trim() || effectiveDescription;
  const rawOgImg = input.seo?.ogImage?.trim() || input.featuredImage || cfg.defaultOgImage || '/ecomvanta-logo.png';
  const effectiveOgImage = rawOgImg.startsWith('http') ? rawOgImg : `${siteUrl}${rawOgImg.startsWith('/') ? '' : '/'}${rawOgImg}`;

  const effectiveSchemaType = input.seo?.schemaType || tpl?.defaultSchemaType || 'WebPage';

  return {
    effectiveTitle,
    effectiveDescription,
    effectiveCanonical,
    effectiveOgTitle,
    effectiveOgDescription,
    effectiveOgImage,
    effectiveRobotsIndex,
    effectiveRobotsFollow,
    effectiveSchemaType,
    usedTemplateTitle: !customTitle,
    usedTemplateDescription: !customDesc,
  };
}

export function analyzeContentSeo(input: AnalyzeSeoInput): SeoAnalysisReport {
  const cfg = input.seoConfig || DEFAULT_SEO_CONFIG;
  const weights: SeoAnalyzerWeights = {
    ...DEFAULT_ANALYZER_WEIGHTS,
    ...(cfg.analyzerWeights || {}),
  };

  const resolved = resolveEffectiveSeoMeta({
    contentType: input.contentType,
    title: input.title,
    excerpt: input.excerpt,
    urlPath: input.urlPath,
    category: input.category,
    author: input.author,
    brandName: input.brandName,
    featuredImage: input.featuredImage,
    seo: input.seo,
    seoConfig: cfg,
  });

  const plainBody = stripHtmlToText(input.htmlContent);
  const fullPlainText = `${input.excerpt || ''} ${plainBody}`.trim();
  const { wordCount, charCount, readingTimeMinutes } = calculateWordCountAndReadingTime(fullPlainText);

  // Extract paragraphs
  const paragraphMatches = input.htmlContent.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
  const paragraphs =
    paragraphMatches.length > 0
      ? paragraphMatches.map((p) => stripHtmlToText(p)).filter(Boolean)
      : fullPlainText
          .split(/\n+/)
          .map((p) => p.trim())
          .filter(Boolean);
  const paragraphCount = Math.max(1, paragraphs.length);

  // Extract sentences
  const sentences = fullPlainText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 3);
  const sentenceCount = Math.max(1, sentences.length);
  const avgWordsPerSentence = wordCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

  const headings = extractHeadingsAndToc(input.htmlContent);
  const inlineImages = extractInlineImages(input.htmlContent);
  const allImages: InlineImageAudit[] = [];

  if (input.featuredImage) {
    allImages.push({
      src: input.featuredImage,
      alt: input.featuredImageAlt?.trim() || '',
      hasAlt: Boolean(input.featuredImageAlt && input.featuredImageAlt.trim().length > 0),
    });
  }
  allImages.push(...inlineImages);
  const missingAltCount = allImages.filter((img) => !img.hasAlt).length;

  const allLinks = extractLinksFromHtml(input.htmlContent, cfg.siteUrl, input.validInternalPaths);
  const internalLinks = allLinks.filter((l) => l.isInternal);
  const externalLinks = allLinks.filter((l) => !l.isInternal);
  const brokenLinks = allLinks.filter((l) => l.isBroken);

  const focusKw = (input.seo?.focusKeyword || '').trim().toLowerCase();
  const secondaryKws = (input.seo?.secondaryKeywords || []).map((k) => k.trim().toLowerCase()).filter(Boolean);

  // Count focus keyword occurrences in body
  let keywordCount = 0;
  if (focusKw) {
    const escaped = focusKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const kwRegex = new RegExp(escaped, 'gi');
    const matches = fullPlainText.match(kwRegex);
    keywordCount = matches ? matches.length : 0;
  }
  const kwWordLen = focusKw ? focusKw.split(/\s+/).length : 1;
  const keywordDensity =
    wordCount > 0 && focusKw ? Math.round(((keywordCount * kwWordLen) / wordCount) * 1000) / 10 : 0;

  const checks: SeoCheckResult[] = [];

  // 1. Focus Keyword in SEO Title
  if (!focusKw) {
    checks.push({
      id: 'keyword-in-title',
      title: 'Focus Keyword in SEO Title',
      category: 'keyword',
      status: 'error',
      score: 0,
      maxScore: weights.keywordInTitle,
      whyItMatters: 'Setting a primary Focus Keyword helps align your SEO title, headings, and content with real search intent.',
      recommendation: 'Enter a specific Focus Keyword (e.g., "Flipkart Account Management Services" or "How to Sell on Blinkit") in the SEO Panel.',
      fieldTarget: 'focusKeyword',
    });
  } else {
    const titleLower = resolved.effectiveTitle.toLowerCase();
    const pos = titleLower.indexOf(focusKw);
    if (pos === 0 || (pos > 0 && pos <= 20)) {
      checks.push({
        id: 'keyword-in-title',
        title: 'Focus Keyword in SEO Title (Near Beginning)',
        category: 'keyword',
        status: 'pass',
        score: weights.keywordInTitle,
        maxScore: weights.keywordInTitle,
        currentValue: resolved.effectiveTitle,
        whyItMatters: 'Placing the focus keyword near the start of the SEO title immediately signals relevance to users and search engines.',
        recommendation: 'Great job! Your focus keyword appears prominently near the beginning of the SEO title.',
        fieldTarget: 'seoTitle',
      });
    } else if (pos > 20) {
      checks.push({
        id: 'keyword-in-title',
        title: 'Focus Keyword in SEO Title',
        category: 'keyword',
        status: 'pass',
        score: Math.round(weights.keywordInTitle * 0.85),
        maxScore: weights.keywordInTitle,
        currentValue: resolved.effectiveTitle,
        whyItMatters: 'The focus keyword is in the SEO title, though placing it closer to the beginning can improve click-through rates.',
        recommendation: 'Optional improvement: Move the focus keyword closer to the start of your SEO title if it reads naturally.',
        fieldTarget: 'seoTitle',
      });
    } else {
      checks.push({
        id: 'keyword-in-title',
        title: 'Focus Keyword Missing from SEO Title',
        category: 'keyword',
        status: 'error',
        score: 0,
        maxScore: weights.keywordInTitle,
        currentValue: resolved.effectiveTitle,
        whyItMatters: 'The page title is one of the strongest on-page relevance signals for search queries.',
        recommendation: `Include your focus keyword "${input.seo?.focusKeyword}" naturally in the SEO Title field.`,
        fieldTarget: 'seoTitle',
      });
    }
  }

  // 2. Focus Keyword in Meta Description
  if (focusKw) {
    const descLower = resolved.effectiveDescription.toLowerCase();
    if (descLower.includes(focusKw)) {
      checks.push({
        id: 'keyword-in-description',
        title: 'Focus Keyword in Meta Description',
        category: 'keyword',
        status: 'pass',
        score: weights.keywordInDescription,
        maxScore: weights.keywordInDescription,
        whyItMatters: 'Google bolds matching search terms in the meta description snippet, boosting organic click-through rate (CTR).',
        recommendation: 'Your meta description includes the focus keyword.',
        fieldTarget: 'metaDescription',
      });
    } else {
      checks.push({
        id: 'keyword-in-description',
        title: 'Focus Keyword Missing in Meta Description',
        category: 'keyword',
        status: 'warning',
        score: Math.round(weights.keywordInDescription * 0.25),
        maxScore: weights.keywordInDescription,
        whyItMatters: 'When users search for your keyword, search engines highlight matching phrases in the meta description.',
        recommendation: `Add "${input.seo?.focusKeyword}" naturally within your Meta Description.`,
        fieldTarget: 'metaDescription',
      });
    }
  } else {
    checks.push({
      id: 'keyword-in-description',
      title: 'Focus Keyword in Meta Description',
      category: 'keyword',
      status: 'warning',
      score: 0,
      maxScore: weights.keywordInDescription,
      whyItMatters: 'A focus keyword is required to evaluate meta description keyword alignment.',
      recommendation: 'Set a Focus Keyword first, then include it in your meta description.',
      fieldTarget: 'focusKeyword',
    });
  }

  // 3. Focus Keyword in URL Slug
  if (focusKw) {
    const slugNormalized = (input.slug || input.urlPath).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const kwTokens = focusKw.split(/[^a-z0-9]+/).filter((w) => w.length > 2);
    const matchedTokens = kwTokens.filter((t) => slugNormalized.includes(t));
    const matchRatio = kwTokens.length > 0 ? matchedTokens.length / kwTokens.length : 0;

    if (input.urlPath === '/' || matchRatio >= 0.6) {
      checks.push({
        id: 'keyword-in-slug',
        title: 'Keyword Alignment in URL Slug',
        category: 'keyword',
        status: 'pass',
        score: weights.keywordInSlug,
        maxScore: weights.keywordInSlug,
        currentValue: input.urlPath,
        whyItMatters: 'Clean, descriptive URLs containing core topic words help users and search crawlers understand the page topic.',
        recommendation: 'Your URL slug aligns well with the focus keyword.',
        fieldTarget: 'slug',
      });
    } else {
      checks.push({
        id: 'keyword-in-slug',
        title: 'Focus Keyword Not Reflected in URL Slug',
        category: 'keyword',
        status: 'warning',
        score: Math.round(weights.keywordInSlug * 0.3),
        maxScore: weights.keywordInSlug,
        currentValue: input.urlPath,
        whyItMatters: 'Descriptive URLs improve user trust in search results. Note: If this page is already published with backlinks, only change the slug if you also create a 301 redirect.',
        recommendation: `Consider including key terms from "${input.seo?.focusKeyword}" in the URL slug (and add a 301 redirect if changing an existing live URL).`,
        fieldTarget: 'slug',
      });
    }
  } else {
    checks.push({
      id: 'keyword-in-slug',
      title: 'Keyword Alignment in URL Slug',
      category: 'keyword',
      status: 'warning',
      score: 0,
      maxScore: weights.keywordInSlug,
      whyItMatters: 'Set a focus keyword to check URL slug alignment.',
      recommendation: 'Define a focus keyword in the SEO Panel.',
      fieldTarget: 'focusKeyword',
    });
  }

  // 4. Focus Keyword in First Paragraph / Intro
  if (focusKw) {
    const firstPara = (paragraphs[0] || input.excerpt || '').toLowerCase();
    if (firstPara.includes(focusKw)) {
      checks.push({
        id: 'keyword-in-intro',
        title: 'Focus Keyword in Opening Paragraph / Intro',
        category: 'keyword',
        status: 'pass',
        score: weights.keywordInIntro,
        maxScore: weights.keywordInIntro,
        whyItMatters: 'Mentioning your primary topic early in the introduction confirms to readers and crawlers that the article directly answers their query.',
        recommendation: 'Your focus keyword appears in the opening section.',
        fieldTarget: 'content',
      });
    } else {
      checks.push({
        id: 'keyword-in-intro',
        title: 'Focus Keyword Missing from Introduction',
        category: 'keyword',
        status: 'warning',
        score: Math.round(weights.keywordInIntro * 0.3),
        maxScore: weights.keywordInIntro,
        whyItMatters: 'Introducing your main topic in the first paragraph improves topical clarity and reduces reader bounce rate.',
        recommendation: `Include "${input.seo?.focusKeyword}" naturally in the first paragraph or excerpt of your article.`,
        fieldTarget: 'content',
      });
    }
  }

  // 5. Focus Keyword in Subheadings (H2/H3)
  if (focusKw) {
    const kwTokens = focusKw.split(/\s+/).filter((w) => w.length > 2);
    const inHeading = headings.some((h) => {
      const hLower = h.text.toLowerCase();
      if (hLower.includes(focusKw)) return true;
      const matched = kwTokens.filter((t) => hLower.includes(t));
      return kwTokens.length > 1 && matched.length >= Math.ceil(kwTokens.length * 0.7);
    });

    if (inHeading) {
      checks.push({
        id: 'keyword-in-headings',
        title: 'Focus Keyword Used in Subheadings (H2/H3)',
        category: 'keyword',
        status: 'pass',
        score: weights.keywordInHeadings,
        maxScore: weights.keywordInHeadings,
        whyItMatters: 'Using your target topic in H2 or H3 subheadings structures your article for both skimmers and search engines.',
        recommendation: 'Your focus keyword (or key phrase variations) appears in your subheadings.',
        fieldTarget: 'content',
      });
    } else {
      checks.push({
        id: 'keyword-in-headings',
        title: 'Focus Keyword Missing from Subheadings (H2/H3)',
        category: 'keyword',
        status: 'warning',
        score: Math.round(weights.keywordInHeadings * 0.25),
        maxScore: weights.keywordInHeadings,
        whyItMatters: 'Subheadings break up long content and signal section-level relevance to search engines.',
        recommendation: `Add at least one H2 or H3 subheading that naturally incorporates "${input.seo?.focusKeyword}".`,
        fieldTarget: 'content',
      });
    }
  }

  // 6. Keyword Usage & Secondary Keywords
  if (focusKw) {
    const matchedSecondary = secondaryKws.filter((sk) => fullPlainText.toLowerCase().includes(sk));
    if (keywordCount >= 2 && keywordDensity <= 3.5) {
      checks.push({
        id: 'keyword-density',
        title: 'Natural Keyword Usage & Secondary Keywords',
        category: 'keyword',
        status: 'pass',
        score: weights.keywordDensity,
        maxScore: weights.keywordDensity,
        currentValue: `${keywordCount}x (${keywordDensity}% density) • ${matchedSecondary.length}/${secondaryKws.length} secondary keywords used`,
        whyItMatters: 'Natural repetition of your primary topic alongside semantic secondary keywords builds topical authority without keyword stuffing.',
        recommendation: 'Keyword frequency looks natural and well-balanced.',
        fieldTarget: 'secondaryKeywords',
      });
    } else if (keywordDensity > 3.5) {
      checks.push({
        id: 'keyword-density',
        title: 'High Keyword Repetition Detected',
        category: 'keyword',
        status: 'warning',
        score: Math.round(weights.keywordDensity * 0.4),
        maxScore: weights.keywordDensity,
        currentValue: `${keywordCount}x (${keywordDensity}% density)`,
        whyItMatters: 'Over-repeating the exact same keyword phrase can make copy sound robotic and trigger over-optimization filters.',
        recommendation: 'Replace some exact-match occurrences with natural synonyms or secondary keywords.',
        fieldTarget: 'content',
      });
    } else {
      checks.push({
        id: 'keyword-density',
        title: 'Low Focus Keyword Frequency in Body Copy',
        category: 'keyword',
        status: 'warning',
        score: keywordCount === 1 ? Math.round(weights.keywordDensity * 0.6) : 0,
        maxScore: weights.keywordDensity,
        currentValue: `${keywordCount} occurrence(s) found`,
        whyItMatters: 'Mentioning your primary topic a few times across the body copy reinforces what the page is about.',
        recommendation: `Use "${input.seo?.focusKeyword}" at least 2–3 times naturally in the article body and add 2–3 related secondary keywords.`,
        fieldTarget: 'content',
      });
    }
  }

  // 7. SEO Title Length & Pixel Guidance
  const titleLen = resolved.effectiveTitle.length;
  const titlePx = estimateSerpPixelWidth(resolved.effectiveTitle, true);
  if (titleLen >= 30 && titleLen <= 65 && titlePx <= 600) {
    checks.push({
      id: 'title-length',
      title: 'SEO Title Length & SERP Fit',
      category: 'metadata',
      status: 'pass',
      score: weights.titleLength,
      maxScore: weights.titleLength,
      currentValue: `${titleLen} chars (~${titlePx}px)`,
      whyItMatters: 'Titles under ~580–600px (roughly 30–60 characters) display in full on desktop and mobile Google search results without ellipsis truncation.',
      recommendation: 'SEO title length is well-proportioned for Google search snippets.',
      fieldTarget: 'seoTitle',
    });
  } else if (titleLen > 0 && (titleLen < 30 || titleLen > 65 || titlePx > 600)) {
    checks.push({
      id: 'title-length',
      title: titleLen < 30 ? 'SEO Title Is Quite Short' : 'SEO Title May Truncate in Search Results',
      category: 'metadata',
      status: 'warning',
      score: Math.round(weights.titleLength * 0.6),
      maxScore: weights.titleLength,
      currentValue: `${titleLen} chars (~${titlePx}px)`,
      whyItMatters: 'While Google has no strict character penalty, titles over ~600px may be visually truncated with "..." in search snippets, and very short titles miss keyword opportunities.',
      recommendation:
        titleLen < 30
          ? 'Expand your SEO title with descriptive value propositions or brand context (aim for 40–60 characters).'
          : 'Place the most important keywords within the first 55–60 characters so the core message remains visible even if truncated.',
      fieldTarget: 'seoTitle',
    });
  } else {
    checks.push({
      id: 'title-length',
      title: 'Missing SEO Title',
      category: 'metadata',
      status: 'error',
      score: 0,
      maxScore: weights.titleLength,
      whyItMatters: 'Every indexable page must have a clear, descriptive <title> tag.',
      recommendation: 'Provide an SEO Title in the SEO Panel.',
      fieldTarget: 'seoTitle',
    });
  }

  // 8. Meta Description Length & Pixel Guidance
  const descLen = resolved.effectiveDescription.length;
  const descPx = estimateSerpPixelWidth(resolved.effectiveDescription, false);
  if (descLen >= 110 && descLen <= 165) {
    checks.push({
      id: 'description-length',
      title: 'Meta Description Length & Snippet Fit',
      category: 'metadata',
      status: 'pass',
      score: weights.descriptionLength,
      maxScore: weights.descriptionLength,
      currentValue: `${descLen} chars (~${descPx}px)`,
      whyItMatters: 'A compelling 110–160 character meta description acts as your organic ad copy in Google SERPs.',
      recommendation: 'Meta description length is practical and well-suited for search previews.',
      fieldTarget: 'metaDescription',
    });
  } else if (descLen > 0) {
    checks.push({
      id: 'description-length',
      title: descLen < 110 ? 'Meta Description Is Short' : 'Meta Description May Truncate on SERPs',
      category: 'metadata',
      status: 'warning',
      score: Math.round(weights.descriptionLength * 0.6),
      maxScore: weights.descriptionLength,
      currentValue: `${descLen} chars (~${descPx}px)`,
      whyItMatters: 'Descriptions between 110 and 160 characters provide enough context to entice clicks without being cut off prematurely.',
      recommendation:
        descLen < 110
          ? 'Add more detail about benefits, marketplaces covered, or a clear call-to-action (aim for 120–155 characters).'
          : 'Trim the meta description slightly so key selling points appear within the first 155 characters.',
      fieldTarget: 'metaDescription',
    });
  } else {
    checks.push({
      id: 'description-length',
      title: 'Missing Meta Description',
      category: 'metadata',
      status: 'error',
      score: 0,
      maxScore: weights.descriptionLength,
      whyItMatters: 'Without a meta description, search engines pull arbitrary page text that may not persuade searchers to click.',
      recommendation: 'Write a clear 120–155 character Meta Description summarizing the page value.',
      fieldTarget: 'metaDescription',
    });
  }

  // 9. Duplicate Metadata Check
  const duplicateTitleMatch = (input.allOtherTitles || []).find(
    (item) => item.path !== input.urlPath && item.title.trim().toLowerCase() === resolved.effectiveTitle.trim().toLowerCase()
  );
  const duplicateDescMatch = (input.allOtherDescriptions || []).find(
    (item) =>
      item.path !== input.urlPath &&
      resolved.effectiveDescription.trim().length > 0 &&
      item.description.trim().toLowerCase() === resolved.effectiveDescription.trim().toLowerCase()
  );

  if (duplicateTitleMatch || duplicateDescMatch) {
    checks.push({
      id: 'duplicate-metadata',
      title: 'Duplicate Metadata Detected Across Site',
      category: 'metadata',
      status: 'error',
      score: 0,
      maxScore: 4,
      currentValue: duplicateTitleMatch
        ? `Duplicate title with ${duplicateTitleMatch.path}`
        : `Duplicate description with ${duplicateDescMatch?.path}`,
      whyItMatters: 'Duplicate SEO titles or meta descriptions confuse search engines about which URL should rank for a topic (keyword cannibalization).',
      recommendation: `Customize the ${duplicateTitleMatch ? 'SEO Title' : 'Meta Description'} so it is distinct from ${duplicateTitleMatch?.path || duplicateDescMatch?.path}.`,
      fieldTarget: duplicateTitleMatch ? 'seoTitle' : 'metaDescription',
    });
  } else {
    checks.push({
      id: 'duplicate-metadata',
      title: 'Unique SEO Title & Meta Description',
      category: 'metadata',
      status: 'pass',
      score: 4,
      maxScore: 4,
      whyItMatters: 'Unique metadata prevents keyword cannibalization and clarifies each page’s distinct purpose.',
      recommendation: 'No duplicate SEO titles or descriptions detected against other site pages.',
      fieldTarget: 'seoTitle',
    });
  }

  // 10. Content Length in Relation to Topic
  const targetMinWords = input.contentType === 'blog' ? 300 : 180;
  const targetOptimalWords = input.contentType === 'blog' ? 600 : 300;
  if (wordCount >= targetOptimalWords) {
    checks.push({
      id: 'content-length',
      title: 'Comprehensive Content Depth',
      category: 'content',
      status: 'pass',
      score: weights.contentLength,
      maxScore: weights.contentLength,
      currentValue: `${wordCount} words (~${readingTimeMinutes} min read)`,
      whyItMatters: 'In-depth guides and service pages that thoroughly answer user questions earn stronger engagement and topical authority.',
      recommendation: 'Content length is strong for this topic.',
      fieldTarget: 'content',
    });
  } else if (wordCount >= targetMinWords) {
    checks.push({
      id: 'content-length',
      title: 'Moderate Content Length',
      category: 'content',
      status: 'pass',
      score: Math.round(weights.contentLength * 0.75),
      maxScore: weights.contentLength,
      currentValue: `${wordCount} words (~${readingTimeMinutes} min read)`,
      whyItMatters: `Pages with ${targetOptimalWords}+ words often cover subtopics, FAQs, and step-by-step details more thoroughly.`,
      recommendation: `Solid foundation (${wordCount} words). Consider expanding with practical examples, FAQs, or comparison tables to reach ${targetOptimalWords}+ words.`,
      fieldTarget: 'content',
    });
  } else {
    checks.push({
      id: 'content-length',
      title: 'Thin Content Warning',
      category: 'content',
      status: wordCount < 100 ? 'error' : 'warning',
      score: wordCount < 100 ? 0 : Math.round(weights.contentLength * 0.35),
      maxScore: weights.contentLength,
      currentValue: `${wordCount} words`,
      whyItMatters: 'Very short articles rarely cover a topic deeply enough to satisfy search intent.',
      recommendation: `Expand the article body with actionable sections, H2/H3 subheadings, and examples (aim for at least ${targetMinWords}–${targetOptimalWords} words).`,
      fieldTarget: 'content',
    });
  }

  // 11. Heading Hierarchy (H1-H6)
  const h1CountInBody = headings.filter((h) => h.level === 1).length;
  const h2Count = headings.filter((h) => h.level === 2).length;
  const h3Count = headings.filter((h) => h.level === 3).length;

  if (h1CountInBody > 0) {
    checks.push({
      id: 'heading-hierarchy',
      title: 'Multiple H1 Tags Inside Article Body',
      category: 'content',
      status: 'warning',
      score: Math.round(weights.headingHierarchy * 0.4),
      maxScore: weights.headingHierarchy,
      currentValue: `${h1CountInBody} H1 tag(s) in body, ${h2Count} H2, ${h3Count} H3`,
      whyItMatters: 'The page template already renders the article title as the main <h1>. Using H2 and H3 for section headings keeps the document outline clean.',
      recommendation: 'Change H1 headings inside the article editor to H2 or H3 subheadings.',
      fieldTarget: 'content',
    });
  } else if (h2Count >= 2) {
    checks.push({
      id: 'heading-hierarchy',
      title: 'Well-Structured Heading Hierarchy (H2/H3)',
      category: 'content',
      status: 'pass',
      score: weights.headingHierarchy,
      maxScore: weights.headingHierarchy,
      currentValue: `${h2Count} H2 subheadings, ${h3Count} H3 subheadings`,
      whyItMatters: 'Clear H2 and H3 subheadings make long-form content easy to scan and power automatic Table of Contents generation.',
      recommendation: 'Heading structure is well-organized.',
      fieldTarget: 'content',
    });
  } else {
    checks.push({
      id: 'heading-hierarchy',
      title: 'Add More H2/H3 Subheadings',
      category: 'content',
      status: 'warning',
      score: h2Count === 1 ? Math.round(weights.headingHierarchy * 0.5) : 0,
      maxScore: weights.headingHierarchy,
      currentValue: `${h2Count} H2 subheadings`,
      whyItMatters: 'Breaking content into logical H2 and H3 sections improves readability and helps search engines understand subtopics.',
      recommendation: 'Add at least 2–3 H2 subheadings to structure your content.',
      fieldTarget: 'content',
    });
  }

  // 12. Content Readability & Paragraph Structure
  const longParagraphs = paragraphs.filter((p) => p.split(/\s+/).length > 120).length;
  const hasListsOrTables = /<(ul|ol|table)\b/i.test(input.htmlContent);
  if (longParagraphs === 0 && avgWordsPerSentence <= 24) {
    checks.push({
      id: 'readability',
      title: 'Content Readability & Paragraph Structure',
      category: 'readability',
      status: 'pass',
      score: weights.readability,
      maxScore: weights.readability,
      currentValue: `Avg ${avgWordsPerSentence} words/sentence • ${hasListsOrTables ? 'Includes lists/tables' : 'Clean paragraphs'}`,
      whyItMatters: 'Short paragraphs, clear sentences, and bulleted lists keep readers engaged on both desktop and mobile devices.',
      recommendation: 'Paragraph length and sentence readability look great.',
      fieldTarget: 'content',
    });
  } else {
    checks.push({
      id: 'readability',
      title: 'Readability & Paragraph Formatting Can Be Improved',
      category: 'readability',
      status: 'warning',
      score: Math.round(weights.readability * 0.5),
      maxScore: weights.readability,
      currentValue: `${longParagraphs} long paragraph(s) • Avg ${avgWordsPerSentence} words/sentence`,
      whyItMatters: 'Walls of text over 120 words or overly long sentences (>25 words on average) increase reader fatigue.',
      recommendation: 'Break long paragraphs into shorter 2–4 sentence blocks and use bullet points or tables for key takeaways.',
      fieldTarget: 'content',
    });
  }

  // 13. Image Alt Text
  if (allImages.length === 0) {
    checks.push({
      id: 'image-alt-text',
      title: 'No Featured or Inline Images Found',
      category: 'content',
      status: 'warning',
      score: 0,
      maxScore: weights.imageAltText,
      whyItMatters: 'Visuals with descriptive alt text improve user engagement, accessibility, and Google Images discoverability.',
      recommendation: 'Add a Featured Image and descriptive Alt Text.',
      fieldTarget: 'imageAlt',
    });
  } else if (missingAltCount === 0) {
    checks.push({
      id: 'image-alt-text',
      title: 'All Images Have Descriptive Alt Text',
      category: 'content',
      status: 'pass',
      score: weights.imageAltText,
      maxScore: weights.imageAltText,
      currentValue: `${allImages.length} image(s) with alt attributes`,
      whyItMatters: 'Alt text makes images accessible to screen readers and helps search engines index visual content.',
      recommendation: 'All featured and inline images include alt text.',
      fieldTarget: 'imageAlt',
    });
  } else {
    checks.push({
      id: 'image-alt-text',
      title: `Missing Image Alt Text (${missingAltCount} of ${allImages.length} image(s))`,
      category: 'content',
      status: 'error',
      score: Math.round(weights.imageAltText * ((allImages.length - missingAltCount) / allImages.length)),
      maxScore: weights.imageAltText,
      currentValue: `${missingAltCount} image(s) missing alt text`,
      whyItMatters: 'Images without alt attributes fail accessibility checks and miss image search visibility.',
      recommendation: 'Fill in the Featured Image Alt Text field and ensure all inline <img> tags include descriptive alt="..." text.',
      fieldTarget: 'imageAlt',
    });
  }

  // 14. Internal Links & Broken Internal Links
  if (brokenLinks.length > 0) {
    checks.push({
      id: 'internal-links',
      title: `Broken Internal Links Detected (${brokenLinks.length})`,
      category: 'links',
      status: 'error',
      score: 0,
      maxScore: weights.internalLinks,
      currentValue: brokenLinks.map((b) => b.href).join(', '),
      whyItMatters: 'Broken internal links lead users and crawlers to 404 pages, wasting crawl budget and hurting user experience.',
      recommendation: `Fix or redirect broken internal link(s): ${brokenLinks.map((b) => b.href).join(', ')}`,
      fieldTarget: 'internalLinks',
    });
  } else if (internalLinks.length >= 2) {
    checks.push({
      id: 'internal-links',
      title: 'Strong Internal Linking Structure',
      category: 'links',
      status: 'pass',
      score: weights.internalLinks,
      maxScore: weights.internalLinks,
      currentValue: `${internalLinks.length} internal link(s)`,
      whyItMatters: 'Internal links pass topical authority across your site and guide readers to related services and articles.',
      recommendation: 'Great! This content includes multiple valid internal links.',
      fieldTarget: 'internalLinks',
    });
  } else if (internalLinks.length === 1) {
    checks.push({
      id: 'internal-links',
      title: 'Internal Links Present (Add 1–2 More)',
      category: 'links',
      status: 'pass',
      score: Math.round(weights.internalLinks * 0.75),
      maxScore: weights.internalLinks,
      currentValue: '1 internal link',
      whyItMatters: 'Linking to 2–4 related service pages or blog articles strengthens site architecture.',
      recommendation: 'Use the Internal Link Picker to link to 1–2 additional relevant service pages or articles.',
      fieldTarget: 'internalLinks',
    });
  } else {
    checks.push({
      id: 'internal-links',
      title: 'No Outgoing Internal Links Found',
      category: 'links',
      status: 'warning',
      score: 0,
      maxScore: weights.internalLinks,
      currentValue: '0 internal links',
      whyItMatters: 'Pages without internal links fail to pass authority to your core marketplace service pages and related guides.',
      recommendation: 'Use the Internal Link Suggestions tool to insert 2–3 contextual links to related EcomVanta services or blog posts.',
      fieldTarget: 'internalLinks',
    });
  }

  // 15. External / Outbound Links Check
  if (externalLinks.length > 0) {
    checks.push({
      id: 'external-links',
      title: 'Outbound Reference Links Included',
      category: 'links',
      status: 'pass',
      score: weights.externalLinks,
      maxScore: weights.externalLinks,
      currentValue: `${externalLinks.length} external link(s)`,
      whyItMatters: 'Citing official documentation or authoritative sources where relevant adds credibility.',
      recommendation: 'External links detected and verified.',
      fieldTarget: 'content',
    });
  } else {
    checks.push({
      id: 'external-links',
      title: 'No External Reference Links (Optional)',
      category: 'links',
      status: 'pass',
      score: weights.externalLinks,
      maxScore: weights.externalLinks,
      currentValue: '0 external links (Focused on internal funnel)',
      whyItMatters: 'For commercial service guides, keeping users within your internal conversion funnel is often intentional, though citing official marketplace docs can help when relevant.',
      recommendation: 'Optionally link to authoritative sources if citing external marketplace policies.',
      fieldTarget: 'content',
    });
  }

  // 16. Canonical & Indexability Check
  const isNoindex = resolved.effectiveRobotsIndex === 'noindex';
  const hasValidCanonical = /^https?:\/\/.+/i.test(resolved.effectiveCanonical);
  if (isNoindex) {
    checks.push({
      id: 'canonical-indexability',
      title: 'Page Is Marked Noindex (Excluded from Search)',
      category: 'technical',
      status: 'warning',
      score: 0,
      maxScore: weights.canonicalAndIndexability,
      currentValue: `robots: ${resolved.effectiveRobotsIndex}, ${resolved.effectiveRobotsFollow}`,
      whyItMatters: 'A noindex directive instructs Google and other search engines not to show this page in search results.',
      recommendation: cfg.globalNoindex
        ? 'Global "Discourage Search Engines" is active in Technical SEO settings! Disable it when ready for public indexing.'
        : 'If this page should rank in Google, change Robots Index from "noindex" to "index".',
      fieldTarget: 'robotsIndex',
    });
  } else if (!hasValidCanonical) {
    checks.push({
      id: 'canonical-indexability',
      title: 'Invalid Canonical URL Format',
      category: 'technical',
      status: 'error',
      score: 0,
      maxScore: weights.canonicalAndIndexability,
      currentValue: resolved.effectiveCanonical,
      whyItMatters: 'Canonical URLs must be valid absolute URLs (starting with https://) to consolidate indexing signals.',
      recommendation: 'Set a valid absolute Canonical URL or leave blank to auto-generate from the site URL.',
      fieldTarget: 'canonicalUrl',
    });
  } else {
    checks.push({
      id: 'canonical-indexability',
      title: 'Indexable & Valid Canonical URL Configured',
      category: 'technical',
      status: 'pass',
      score: weights.canonicalAndIndexability,
      maxScore: weights.canonicalAndIndexability,
      currentValue: resolved.effectiveCanonical,
      whyItMatters: 'Proper indexability and canonical tags ensure search engines index the preferred URL version.',
      recommendation: 'Page is indexable with a valid canonical URL.',
      fieldTarget: 'canonicalUrl',
    });
  }

  // 17. Structured Data / Schema Markup Availability
  if (resolved.effectiveSchemaType && resolved.effectiveSchemaType !== 'None') {
    checks.push({
      id: 'schema-availability',
      title: `Structured Data Active (${resolved.effectiveSchemaType} JSON-LD)`,
      category: 'technical',
      status: 'pass',
      score: weights.schemaAvailability,
      maxScore: weights.schemaAvailability,
      currentValue: resolved.effectiveSchemaType,
      whyItMatters: 'Schema.org JSON-LD markup helps search engines understand entities, breadcrumbs, articles, and services.',
      recommendation: `JSON-LD schema (${resolved.effectiveSchemaType}) is configured and ready for server rendering.`,
      fieldTarget: 'schemaType',
    });
  } else {
    checks.push({
      id: 'schema-availability',
      title: 'Structured Data (Schema Markup) Disabled',
      category: 'technical',
      status: 'warning',
      score: 0,
      maxScore: weights.schemaAvailability,
      whyItMatters: 'Structured data helps search engines parse page context and eligibility for rich results.',
      recommendation: 'Select an appropriate Schema Type (e.g., BlogPosting, Article, or Service) in the SEO Panel.',
      fieldTarget: 'schemaType',
    });
  }

  // Calculate normalized 0-100 score
  const totalEarned = checks.reduce((sum, c) => sum + c.score, 0);
  const totalPossible = checks.reduce((sum, c) => sum + c.maxScore, 0);
  const overallScore = totalPossible > 0 ? Math.min(100, Math.round((totalEarned / totalPossible) * 100)) : 0;

  const passedCount = checks.filter((c) => c.status === 'pass').length;
  const warningCount = checks.filter((c) => c.status === 'warning').length;
  const errorCount = checks.filter((c) => c.status === 'error').length;

  let grade: SeoAnalysisReport['grade'] = 'Needs Improvement';
  if (overallScore >= 82 && errorCount === 0) grade = 'Excellent';
  else if (overallScore >= 65) grade = 'Good';
  else if (overallScore < 45 || errorCount >= 3) grade = 'Critical Issues';

  return {
    overallScore,
    grade,
    passedCount,
    warningCount,
    errorCount,
    wordCount,
    charCount,
    readingTimeMinutes,
    paragraphCount,
    sentenceCount,
    avgWordsPerSentence,
    keywordCount,
    keywordDensity,
    headings,
    images: allImages,
    missingAltCount,
    internalLinks,
    externalLinks,
    brokenLinks,
    checks,
    effectiveTitle: resolved.effectiveTitle,
    effectiveDescription: resolved.effectiveDescription,
    effectiveCanonical: resolved.effectiveCanonical,
    titlePixelWidth: titlePx,
    descriptionPixelWidth: descPx,
  };
}

export const resolveSeoTemplate = resolveTemplateString;
export const extractTableOfContents = extractHeadingsAndToc;

export function analyzeOnPageSeo(
  input: Omit<Partial<AnalyzeSeoInput>, 'contentType'> & { contentHtml?: string; contentType?: string }
): SeoAnalysisReport & { score: number } {
  const rawType = input.contentType as string | undefined;
  const mappedType: ContentTypeKey =
    rawType === 'case_study'
      ? 'caseStudy'
      : rawType === 'page'
      ? 'staticPage'
      : ((rawType as ContentTypeKey) || 'blog');

  const report = analyzeContentSeo({
    contentType: mappedType,
    title: input.title || '',
    slug: input.slug || '',
    urlPath: input.urlPath || '/',
    excerpt: input.excerpt || '',
    htmlContent: input.htmlContent ?? input.contentHtml ?? '',
    featuredImage: input.featuredImage,
    featuredImageAlt: input.featuredImageAlt,
    category: input.category,
    author: input.author,
    brandName: input.brandName,
    seo: input.seo,
    seoConfig: input.seoConfig,
  });

  return {
    ...report,
    score: report.overallScore,
  };
}

