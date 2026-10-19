'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  DEFAULT_SITE_CONTENT,
  SiteContentData,
  INITIAL_BLOGS,
  sanitizeRestrictedMediaUrls,
  LEGACY_BLOG_LOGO_IMAGES,
} from './cmsTypes';

const STORAGE_KEY = 'ecomvanta_cms_content_v1';

function normalizeClientBlogs(rawBlogs?: any[]) {
  const inputList = Array.isArray(rawBlogs) && rawBlogs.length > 0 ? [...rawBlogs] : [...INITIAL_BLOGS];
  if (inputList.length <= 6) {
    const existingKeys = new Set(
      inputList.flatMap((b) => [b.id, b.slug, b.title?.toLowerCase().trim()].filter(Boolean))
    );
    for (const ib of INITIAL_BLOGS) {
      if (!existingKeys.has(ib.id) && !existingKeys.has(ib.slug) && !existingKeys.has(ib.title.toLowerCase().trim())) {
        inputList.push(ib);
      }
    }
  }
  return inputList.map((b) => {
    const defaultMatch = INITIAL_BLOGS.find(
      (ib) => ib.slug === b.slug || ib.id === b.id || ib.title?.toLowerCase() === b.title?.toLowerCase()
    );
    const resolvedImage =
      !b.image || (defaultMatch && LEGACY_BLOG_LOGO_IMAGES.has(b.image))
        ? defaultMatch?.image || b.image
        : b.image;
    return {
      ...(defaultMatch || {}),
      ...b,
      image: resolvedImage,
    };
  });
}

export function getLocalCmsContent(): SiteContentData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = sanitizeRestrictedMediaUrls(JSON.parse(raw));
      return {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
        homepage: { ...DEFAULT_SITE_CONTENT.homepage, ...(parsed.homepage || {}) },
        services: { ...DEFAULT_SITE_CONTENT.services, ...(parsed.services || {}) },
        caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(parsed.caseStudies || {}) },
        blogs: normalizeClientBlogs(parsed.blogs),
        careers: parsed.careers || DEFAULT_SITE_CONTENT.careers,
        careerPage: { ...DEFAULT_SITE_CONTENT.careerPage, ...(parsed.careerPage || {}) },
        aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(parsed.aboutUs || {}) },
        founder: { ...DEFAULT_SITE_CONTENT.founder, ...(parsed.founder || {}) },
        contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(parsed.contactFooter || {}) },
        seoConfig: { ...DEFAULT_SITE_CONTENT.seoConfig, ...(parsed.seoConfig || {}) } as any,
      };
    }
  } catch (e) {
    console.warn('Failed to read local CMS storage:', e);
  }
  return null;
}

export function saveLocalCmsContent(content: Partial<SiteContentData>) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLocalCmsContent() || DEFAULT_SITE_CONTENT;
    const merged: SiteContentData = sanitizeRestrictedMediaUrls({
      ...existing,
      ...content,
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent('ecomvanta_cms_updated', { detail: merged }));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

interface CmsContextType {
  content: SiteContentData;
  loading: boolean;
}

const CmsContext = createContext<CmsContextType | null>(null);

export function CmsProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent?: SiteContentData;
}) {
  const [content, setContent] = useState<SiteContentData>(() => {
    return initialContent ? sanitizeRestrictedMediaUrls(initialContent) : getLocalCmsContent() || DEFAULT_SITE_CONTENT;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const local = getLocalCmsContent();
    if (local && !initialContent && isMounted) {
      setContent(local);
    }

    const handleUpdate = (e: any) => {
      if (e.detail && isMounted) {
        setContent(sanitizeRestrictedMediaUrls(e.detail));
      }
    };
    window.addEventListener('ecomvanta_cms_updated', handleUpdate);

    async function fetchContent() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            const sanitized = sanitizeRestrictedMediaUrls(json.data);
            sanitized.blogs = normalizeClientBlogs(sanitized.blogs);
            setContent(sanitized);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Using existing content due to fetch error:', err);
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
      window.removeEventListener('ecomvanta_cms_updated', handleUpdate);
    };
  }, [initialContent]);

  return (
    <CmsContext.Provider value={{ content, loading }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCmsContent() {
  const context = useContext(CmsContext);
  if (context) {
    return context;
  }

  // Fallback if rendered outside CmsProvider
  const [content, setContent] = useState<SiteContentData>(() => {
    return getLocalCmsContent() || DEFAULT_SITE_CONTENT;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const local = getLocalCmsContent();
    if (local && isMounted) {
      setContent(local);
      setLoading(false);
    }

    const handleUpdate = (e: any) => {
      if (e.detail && isMounted) {
        setContent(sanitizeRestrictedMediaUrls(e.detail));
      }
    };
    window.addEventListener('ecomvanta_cms_updated', handleUpdate);

    async function fetchContent() {
      try {
        const res = await fetch('/api/admin/content', {
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            const sanitized = sanitizeRestrictedMediaUrls(json.data);
            sanitized.blogs = normalizeClientBlogs(sanitized.blogs);
            setContent(sanitized);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
            } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Using fallback content due to fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
      window.removeEventListener('ecomvanta_cms_updated', handleUpdate);
    };
  }, []);

  return { content, loading };
}

