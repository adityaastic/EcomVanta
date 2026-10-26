'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MediaUploader from '@/components/admin/MediaUploader';
import SeoEditorPanel from '@/components/admin/SeoEditorPanel';
import RichTextEditor, { InternalLinkPickerItem } from '@/components/admin/RichTextEditor';
import { ServiceData, SERVICES_DATABASE } from '@/lib/serviceData';
import { SeoMetaItem } from '@/lib/seoTypes';
import { getLocalCmsContent, saveLocalCmsContent } from '@/lib/useCmsContent';
import {
  Save,
  Check,
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  HelpCircle,
  Award,
  Sparkles,
  AlertCircle,
  FileText,
  Wand2
} from 'lucide-react';

const INTERNAL_SERVICE_LINKS: InternalLinkPickerItem[] = [
  { title: 'Amazon Seller Account Management Services', path: '/amazon-seller-account-management-services', category: 'Service' },
  { title: 'Flipkart Account Management Services', path: '/flipkart-account-management-services', category: 'Service' },
  { title: 'Meesho Account Management Services', path: '/meesho-account-management-services', category: 'Service' },
  { title: 'Blinkit Seller Account Management Services', path: '/blinkit-seller-account-management-services', category: 'Service' },
  { title: 'Zepto Seller Onboarding & Account Management', path: '/zepto-seller-onboarding-and-account-management-service', category: 'Service' },
  { title: 'Shopify Store Management Services', path: '/shopify-store-management-services', category: 'Service' },
  { title: 'E-Commerce Product Listing & Cataloguing Services', path: '/ecommerce-product-listing-services', category: 'Service' },
  { title: 'Myntra Seller Onboarding & Management', path: '/myntra-seller-onboarding-services', category: 'Service' },
  { title: 'Nykaa Seller Account Management', path: '/nykaa-seller-account-management-services', category: 'Service' },
  { title: 'Contact Us / Free Audit Call', path: '/contact-us', category: 'Page' },
];

const EMPTY_SERVICE: ServiceData = {
  slug: '',
  badge: 'Marketplace Partner',
  title: '',
  subtitle: '',
  heroImage: '/flipkart-account/product-dashboard.png',
  aboutImage: '/abt-img/flipkart-web-about.png',
  aboutTitle: '',
  aboutDesc: '',
  longContentHtml: '',
  servicesGrid: [
    { icon: '/home-img/SEO-Optimized Product Titles.png', title: 'Listing Optimization', desc: 'Optimized product titles and copy.' },
    { icon: '/home-img/Keyword-rich Descriptions & bullet points.png', title: 'Ad Campaign Scaling', desc: 'Targeted ROAS management.' },
  ],
  advantages: [
    { title: 'Dedicated Manager', desc: 'Certified eCommerce specialist assigned to your account.' },
  ],
  faqs: [
    { question: 'What documents are required to start?', answer: 'We require GST certificate, trademark authorization, and catalog access.' },
  ],
};

function parseDocTextIntoService(rawText: string, currentService: ServiceData, currentSeo: Partial<SeoMetaItem>) {
  const lines = rawText
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trim());

  let seoTitle = currentSeo.seoTitle || currentService.seoTitle || '';
  let metaDescription = currentSeo.metaDescription || currentService.metaDescription || '';
  let detectedSlug = currentService.slug;
  let mainTitle = currentService.title;
  const bodyLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line) {
      bodyLines.push('');
      continue;
    }
    const seoTitleMatch = line.match(/^SEO\s*title\s*:\s*(.+)$/i);
    if (seoTitleMatch) {
      seoTitle = seoTitleMatch[1].trim();
      continue;
    }
    const metaDescMatch = line.match(/^Meta\s*description\s*:\s*(.+)$/i);
    if (metaDescMatch) {
      metaDescription = metaDescMatch[1].trim();
      continue;
    }
    const urlMatch = line.match(/^URL\s*:\s*(.+)$/i);
    if (urlMatch) {
      const rawUrl = urlMatch[1].trim().replace(/^https?:\/\/[^/]+/i, '').replace(/^\/+|\/+$/g, '');
      if (rawUrl) detectedSlug = rawUrl;
      continue;
    }
    bodyLines.push(line);
  }

  // Trim leading empty lines
  while (bodyLines.length > 0 && !bodyLines[0]) bodyLines.shift();

  // First non-empty short line is usually the H1 title (sometimes repeated twice in docs)
  if (bodyLines.length > 0 && bodyLines[0].length < 110 && !bodyLines[0].endsWith('.')) {
    mainTitle = bodyLines.shift()!;
    while (bodyLines.length > 0 && (!bodyLines[0] || bodyLines[0].toLowerCase() === mainTitle.toLowerCase())) {
      bodyLines.shift();
    }
  }

  // Extract intro paragraphs before the first section heading
  const introParagraphs: string[] = [];
  const isHeadingLine = (l: string) => {
    if (!l || l.startsWith('|')) return false;
    if (/^(The problem|What we do|What to expect|What we manage directly|What needs you|What this does not mean|Account ownership|Written scope|Fee clarity)\s*:/i.test(l)) return false;
    if (l.endsWith('?') && l.length < 110) return true;
    if (l.length <= 85 && !/[.;]$/.test(l) && !l.includes('|')) return true;
    return false;
  };

  while (bodyLines.length > 0) {
    const l = bodyLines[0];
    if (!l) {
      bodyLines.shift();
      continue;
    }
    if (isHeadingLine(l)) break;
    if (!/^(Request a Free|Talk to Ecomvanta)/i.test(l)) {
      introParagraphs.push(l);
    }
    bodyLines.shift();
  }

  const newSubtitle = introParagraphs[0] || currentService.subtitle;

  // Separate FAQ section if present
  const faqIndex = bodyLines.findIndex((l) => /^Frequently Asked Questions$/i.test(l) || /^FAQs?$/i.test(l));
  let mainContentLines = bodyLines;
  const extractedFaqs: { question: string; answer: string }[] = [];

  if (faqIndex !== -1) {
    mainContentLines = bodyLines.slice(0, faqIndex);
    const afterFaqLines = bodyLines.slice(faqIndex + 1);
    let currentQ = '';
    let currentA: string[] = [];
    const trailingLines: string[] = [];
    let faqEnded = false;

    for (const l of afterFaqLines) {
      if (!l) continue;
      if (!faqEnded && l.endsWith('?') && l.length < 140) {
        if (currentQ && currentA.length > 0) {
          extractedFaqs.push({ question: currentQ, answer: currentA.join(' ') });
        }
        currentQ = l;
        currentA = [];
      } else if (!faqEnded && currentQ) {
        // Check if this is a closing CTA heading after FAQs
        if (isHeadingLine(l) && /^Talk to |^Ready to |^Get Started|^Contact /i.test(l)) {
          if (currentQ && currentA.length > 0) {
            extractedFaqs.push({ question: currentQ, answer: currentA.join(' ') });
            currentQ = '';
            currentA = [];
          }
          faqEnded = true;
          trailingLines.push(l);
        } else {
          currentA.push(l);
        }
      } else if (faqEnded) {
        trailingLines.push(l);
      }
    }
    if (currentQ && currentA.length > 0) {
      extractedFaqs.push({ question: currentQ, answer: currentA.join(' ') });
    }
    if (trailingLines.length > 0) {
      mainContentLines = [...mainContentLines, ...trailingLines];
    }
  }

  // Convert mainContentLines into clean semantic HTML (H2, H3, tables, lists, links)
  const htmlParts: string[] = [];
  let idx = 0;
  let firstH2 = '';
  let firstH2Para = '';

  const autoLinkText = (text: string) => {
    let t = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    // Bold prefixes like "The problem:", "What we do:", "What to expect:"
    t = t.replace(
      /^(The problem|What we do|What to expect|What we manage directly|What needs you[^:]*|What this does not mean|Account ownership|Written scope|Fee clarity|Discussion|Assessment|Scope and responsibilities|Access and onboarding|Delivery|Reporting and review)(\s*[:.])\s*/i,
      '<strong>$1$2</strong> '
    );
    // Auto-link common anchor phrases
    t = t.replace(/Request a Free Account Audit Call/gi, '<a href="#audit">Request a Free Account Audit Call</a>');
    t = t.replace(/Request a Customised Quote/gi, '<a href="#audit">Request a Customised Quote</a>');
    return t;
  };

  while (idx < mainContentLines.length) {
    const line = mainContentLines[idx];
    if (!line) {
      idx++;
      continue;
    }

    // 1. Check for pipe table | ... |
    if (line.startsWith('|')) {
      const tableRows: string[][] = [];
      while (idx < mainContentLines.length && mainContentLines[idx].startsWith('|')) {
        const rawRow = mainContentLines[idx];
        const cells = rawRow
          .replace(/^\||\|$/g, '')
          .split('|')
          .map((c) => c.trim());
        // Skip markdown separator row |---|---|
        if (!cells.every((c) => /^[-:\s]*$/.test(c))) {
          tableRows.push(cells);
        }
        idx++;
      }
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(1);
        htmlParts.push(
          `<table><thead><tr>${header.map((h, ci) => `<th>${h || (ci === 0 ? 'Factor' : '')}</th>`).join('')}</tr></thead><tbody>${body
            .map((r) => `<tr>${r.map((c, ci) => `<td>${ci === 0 ? `<strong>${c}</strong>` : c}</td>`).join('')}</tr>`)
            .join('')}</tbody></table>`
        );
      }
      continue;
    }

    // 2. Check for "The problem: / What we do: / What to expect:" consecutive lines -> <ul>
    if (/^(The problem|What we do|What to expect|What we manage directly|Account ownership)\s*:/i.test(line)) {
      const listItems: string[] = [];
      while (
        idx < mainContentLines.length &&
        /^(The problem|What we do|What to expect|What we manage directly|What needs you|Account ownership|Written scope|Fee clarity|A sample report|No guarantees)/i.test(mainContentLines[idx])
      ) {
        listItems.push(`<li>${autoLinkText(mainContentLines[idx])}</li>`);
        idx++;
      }
      htmlParts.push(`<ul>${listItems.join('')}</ul>`);
      continue;
    }

    // 3. Heading detection
    if (isHeadingLine(line)) {
      const isSubHeading =
        line.length < 55 &&
        !line.endsWith('?') &&
        !/^(What |Who |Why |How |Meesho |Benefits |Ongoing |Product |Talk to )/i.test(line);
      if (!firstH2 && !isSubHeading) {
        firstH2 = line;
      }
      htmlParts.push(isSubHeading ? `<h3>${line}</h3>` : `<h2>${line}</h2>`);
      idx++;
      continue;
    }

    // 4. Paragraph
    if (firstH2 && !firstH2Para) {
      firstH2Para = line;
    }
    htmlParts.push(`<p>${autoLinkText(line)}</p>`);
    idx++;
  }

  return {
    updatedService: {
      ...currentService,
      slug: detectedSlug || currentService.slug,
      title: mainTitle || currentService.title,
      seoTitle: seoTitle || currentService.seoTitle,
      metaDescription: metaDescription || currentService.metaDescription,
      subtitle: newSubtitle,
      aboutTitle: firstH2 || currentService.aboutTitle,
      aboutDesc: firstH2Para || introParagraphs.slice(1).join(' ') || currentService.aboutDesc,
      longContentHtml: htmlParts.join('\n'),
      faqs: extractedFaqs.length > 0 ? extractedFaqs : currentService.faqs,
    },
    updatedSeo: {
      ...currentSeo,
      ...(seoTitle ? { seoTitle: seoTitle } : {}),
      ...(metaDescription ? { metaDescription } : {}),
    },
    stats: {
      sectionsCount: htmlParts.filter((p) => p.startsWith('<h2') || p.startsWith('<h3')).length,
      faqsCount: extractedFaqs.length,
    },
  };
}

export default function ServiceEditPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slugParam = resolvedParams.slug;
  const isNew = slugParam === 'new';
  const router = useRouter();

  const [service, setService] = useState<ServiceData | null>(null);
  const [allServices, setAllServices] = useState<Record<string, ServiceData>>({});
  const [seoSystem, setSeoSystem] = useState<any>(null);
  const [serviceSeo, setServiceSeo] = useState<Partial<SeoMetaItem>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [docImportOpen, setDocImportOpen] = useState(false);
  const [rawDocText, setRawDocText] = useState('');
  const [docImportNotice, setDocImportNotice] = useState<string | null>(null);

  useEffect(() => {
    const local = getLocalCmsContent();
    const dbFallback = !isNew ? SERVICES_DATABASE[slugParam] : undefined;

    if (local?.services) {
      setAllServices(local.services);
      if (local.seoSystem) {
        setSeoSystem(local.seoSystem);
        setServiceSeo(local.seoSystem.pageSeo?.[`/${slugParam}`] || {});
      }
      if (isNew) {
        setService({ ...EMPTY_SERVICE });
        setLoading(false);
      } else if (local.services[slugParam] || dbFallback) {
        const merged = {
          ...(dbFallback || {}),
          ...(local.services[slugParam] || {}),
          longContentHtml: local.services[slugParam]?.longContentHtml || dbFallback?.longContentHtml || '',
        } as ServiceData;
        setService(merged);
        setLoading(false);
      }
    }

    async function loadData() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        const data = await res.json();
        if (data.success && data.data?.services) {
          const servicesMap = data.data.services;
          setAllServices(servicesMap);
          if (data.data.seoSystem) {
            setSeoSystem(data.data.seoSystem);
            setServiceSeo(data.data.seoSystem.pageSeo?.[`/${slugParam}`] || {});
          }
          if (isNew) {
            setService((prev) => prev || { ...EMPTY_SERVICE });
          } else if (servicesMap[slugParam] || dbFallback) {
            const merged = {
              ...(dbFallback || {}),
              ...(servicesMap[slugParam] || {}),
              longContentHtml: servicesMap[slugParam]?.longContentHtml || dbFallback?.longContentHtml || '',
            } as ServiceData;
            setService(merged);
          } else if (!local?.services?.[slugParam]) {
            setError(`Service with slug "${slugParam}" not found.`);
          }
        }
      } catch (err: any) {
        if (!local?.services) {
          setError(err.message || 'Error loading service');
        }
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slugParam, isNew]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!service) return;

    if (!service.slug || !service.title) {
      setError('Please provide a valid slug and title.');
      return;
    }

    setSaving(true);
    setSavedSuccess(false);
    setError(null);

    const formattedSlug = service.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const updatedService = { ...service, slug: formattedSlug };
    const updatedMap = { ...allServices, [formattedSlug]: updatedService };

    if (!isNew && slugParam !== formattedSlug) {
      delete updatedMap[slugParam];
    }

    // Save to local storage
    saveLocalCmsContent({ services: updatedMap });

    try {
      if (seoSystem) {
        const updatedSeoSystem = {
          ...seoSystem,
          pageSeo: {
            ...(seoSystem.pageSeo || {}),
            [`/${formattedSlug}`]: serviceSeo,
          },
        };
        setSeoSystem(updatedSeoSystem);
        await fetch('/api/admin/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'seoSystem',
            data: updatedSeoSystem,
          }),
        });
      }

      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'services',
          data: updatedMap,
        }),
      });

      const data = await res.json();
      if (data.success && data.data?.services) {
        setAllServices(data.data.services);
        if (data.data.services[formattedSlug]) {
          setService(data.data.services[formattedSlug]);
        }
        saveLocalCmsContent({ services: data.data.services });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      if (isNew) {
        router.push(`/admin/services/${formattedSlug}`);
      }
    } catch (err: any) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-4">
        <p className="text-sm text-[#0066FF] font-bold">{error || 'Service not found'}</p>
        <Link href="/admin/services" className="text-xs text-[#0066FF] hover:underline">
          Return to Services List
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-4xl pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/services"
            className="p-2 text-gray-500 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900">
              {isNew ? 'Create New Service' : `Edit: ${service.title}`}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              URL: /{service.slug || 'your-service-slug'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isNew && (
            <Link
              href={`/${service.slug}`}
              target="_blank"
              className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
              <span>Live Page</span>
            </Link>
          )}

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#0066FF]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Service</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SMART GOOGLE DOCS / WORD AUTO-IMPORTER */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50/60 to-cyan-50/50 rounded-2xl border border-blue-200/80 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0066FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>Smart Google Doc / Word Content Importer</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase bg-blue-600 text-white rounded-full">
                  1-Click Auto-Fill
                </span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Paste your entire SEO writer document (SEO title, Meta description, H1/H2/H3 headings, tables, bullets & FAQs) to auto-fill the whole page in 1 click.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setDocImportOpen(!docImportOpen)}
            className="px-4 py-2 bg-white hover:bg-blue-50 text-[#0066FF] border border-blue-200 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{docImportOpen ? 'Hide Doc Importer' : 'Paste Google Doc / Word'}</span>
          </button>
        </div>

        {docImportNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{docImportNotice}</span>
          </div>
        )}

        {docImportOpen && (
          <div className="bg-white rounded-xl border border-blue-200 p-4 space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Paste Full Document Text Below (supports SEO title:, Meta description:, URL:, Tables, Headings & FAQs):
            </label>
            <textarea
              rows={10}
              value={rawDocText}
              onChange={(e) => setRawDocText(e.target.value)}
              placeholder={`SEO title: Meesho Seller Account Management Services in India | Ecomvanta\nMeta description: Meesho seller account management services...\nURL: /meesho-account-management-services\nMeesho Seller Account Management Services in India\nSelling on Meesho looks simple at the start...`}
              className="w-full p-3 text-xs font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0066FF] bg-slate-50/50"
            />
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <p className="text-[11px] text-slate-500">
                Tip: After auto-filling, review the visual Document Editor below and click <strong>Save Service</strong>.
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRawDocText('');
                    setDocImportOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!rawDocText.trim()) return;
                    const parsed = parseDocTextIntoService(rawDocText, service, serviceSeo);
                    setService(parsed.updatedService);
                    setServiceSeo(parsed.updatedSeo);
                    setDocImportNotice(
                      `Auto-filled Title, SEO Meta, ${parsed.stats.sectionsCount} Document Headings/Sections, and ${parsed.stats.faqsCount} FAQs! Click "Save Service" to publish.`
                    );
                    setDocImportOpen(false);
                  }}
                  className="px-4 py-2 bg-[#0066FF] hover:bg-[#0052cc] text-white rounded-xl text-xs font-extrabold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Fill Page from Document</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Basic Service Setup */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          1. General Details & URL Slug
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Service URL Slug
            </label>
            <input
              type="text"
              value={service.slug}
              onChange={(e) => setService({ ...service, slug: e.target.value })}
              placeholder="e.g. amazon-seller-account-management-services"
              required
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Header Badge Text
            </label>
            <input
              type="text"
              value={service.badge}
              onChange={(e) => setService({ ...service, badge: e.target.value })}
              placeholder="e.g. Official Flipkart Partner Network"
              className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Service Main Title (H1)
            </label>
            <input
              type="text"
              value={service.title}
              onChange={(e) => setService({ ...service, title: e.target.value })}
              placeholder="e.g. Flipkart Account Management Services"
              required
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Service Subtitle / Intro Paragraph
            </label>
            <textarea
              rows={3}
              value={service.subtitle}
              onChange={(e) => setService({ ...service, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <MediaUploader
              label="Hero Banner Image / Dashboard Screenshot"
              value={service.heroImage}
              onChange={(url) => setService({ ...service, heroImage: url })}
            />
          </div>
        </div>
      </div>

      {/* 2. About & Section Content */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
          2. About & Overview Section
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              About Section Heading
            </label>
            <input
              type="text"
              value={service.aboutTitle}
              onChange={(e) => setService({ ...service, aboutTitle: e.target.value })}
              placeholder="e.g. Maximize Your Brand Visibility on Marketplace"
              className="w-full px-3.5 py-2.5 text-xs font-bold border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              About Description Copy
            </label>
            <textarea
              rows={4}
              value={service.aboutDesc}
              onChange={(e) => setService({ ...service, aboutDesc: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-gray-300 rounded-xl bg-white"
            />
          </div>

          <MediaUploader
            label="About Section Image"
            value={service.aboutImage || ''}
            onChange={(url) => setService({ ...service, aboutImage: url })}
          />
        </div>
      </div>

      {/* 3. Rich Google Doc / Word-Style Long-Form Service Content */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              3. Detailed Document / Long-Form SEO Content (Google Docs / Word Editor)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Copy-paste directly from Google Docs or Word! Supports H2/H3 headings, comparison tables, bullet lists, and internal links.
            </p>
          </div>
        </div>

        <RichTextEditor
          label="Full Service Guide & Document Body"
          value={service.longContentHtml || ''}
          onChange={(html) => setService({ ...service, longContentHtml: html })}
          placeholder="Paste or write your complete service guide here (headings, comparison tables, bullet points, process steps, pricing details)..."
          minHeight="420px"
          internalLinkItems={INTERNAL_SERVICE_LINKS}
          helperText="Use H2 for main sections, H3 for sub-sections, Table button for comparison tables, and Link button to link to other EcomVanta service pages."
        />
      </div>

      {/* 4. Features & Deliverables Grid */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              4. Service Deliverables & Features Grid
            </h2>
            <p className="text-xs text-gray-500">Feature cards shown in the deliverables section</p>
          </div>
          <button
            type="button"
            onClick={() => {
              const newGrid = [
                ...service.servicesGrid,
                {
                  icon: '/home-img/SEO-Optimized Product Titles.png',
                  title: 'New Feature',
                  desc: 'Feature description.',
                },
              ];
              setService({ ...service, servicesGrid: newGrid });
            }}
              className="px-3 py-1.5 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Feature Card
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.servicesGrid.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-3">
              <button
                type="button"
                onClick={() => {
                  const filtered = service.servicesGrid.filter((_, i) => i !== index);
                  setService({ ...service, servicesGrid: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Card Title
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...service.servicesGrid];
                    updated[index].title = e.target.value;
                    setService({ ...service, servicesGrid: updated });
                  }}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={item.desc}
                  onChange={(e) => {
                    const updated = [...service.servicesGrid];
                    updated[index].desc = e.target.value;
                    setService({ ...service, servicesGrid: updated });
                  }}
                  className="w-full px-3 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <MediaUploader
                label="Feature Icon"
                value={item.icon}
                onChange={(url) => {
                  const updated = [...service.servicesGrid];
                  updated[index].icon = url;
                  setService({ ...service, servicesGrid: updated });
                }}
                previewHeight="h-14"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 5. Service Specific FAQs */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-gray-100 pb-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            5. Service Frequently Asked Questions (FAQs)
          </h2>
          <button
            type="button"
            onClick={() => {
              const newFaqs = [
                ...service.faqs,
                { question: 'New Question?', answer: 'Answer here.' },
              ];
              setService({ ...service, faqs: newFaqs });
            }}
            className="px-3 py-1.5 bg-blue-50 text-[#0066FF] hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add FAQ
          </button>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative space-y-2">
              <button
                type="button"
                onClick={() => {
                  const filtered = service.faqs.filter((_, i) => i !== index);
                  setService({ ...service, faqs: filtered });
                }}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Question #{index + 1}
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...service.faqs];
                    updated[index].question = e.target.value;
                    setService({ ...service, faqs: updated });
                  }}
                  className="w-full px-3 py-1.5 text-xs font-bold border border-gray-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1">
                  Answer
                </label>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...service.faqs];
                    updated[index].answer = e.target.value;
                    setService({ ...service, faqs: updated });
                  }}
                  className="w-full px-3 py-1 text-xs border border-gray-300 rounded-lg bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Dedicated Rank Math / Yoast SEO Panel for Service Page */}
      <SeoEditorPanel
        title={service.title}
        slug={service.slug}
        onSlugChange={(newSlug) => setService({ ...service, slug: newSlug })}
        urlPath={`/${service.slug || 'service-slug'}`}
        contentHtml={`<h2>${service.aboutTitle || service.title}</h2><p>${service.subtitle}</p><p>${service.aboutDesc}</p>${service.longContentHtml || ''}${(service.servicesGrid || []).map((g) => `<h3>${g.title}</h3><p>${g.desc}</p>`).join('')}`}
        excerpt={service.metaDescription || service.subtitle || service.aboutDesc}
        featuredImage={service.heroImage}
        featuredImageAlt={service.title}
        seo={{
          ...(service.seoTitle ? { seoTitle: service.seoTitle } : {}),
          ...(service.metaDescription ? { metaDescription: service.metaDescription } : {}),
          ...serviceSeo,
        }}
        onChange={setServiceSeo}
        contentType="service"
      />

      {/* Clean Bottom Save Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-slate-800">
            Ready to publish service changes?
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Changes will sync to /{service.slug || 'service-slug'} in real-time.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-[#0066FF] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] text-white font-extrabold rounded-xl text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving to Cloud...</span>
            </>
          ) : savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Saved to Supabase!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Service Page</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
