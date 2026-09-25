'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { DEFAULT_SITE_CONTENT, SiteContentData } from './cmsTypes';

const STORAGE_KEY = 'ecomvanta_cms_content_v1';

export function getLocalCmsContent(): SiteContentData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
        homepage: { ...DEFAULT_SITE_CONTENT.homepage, ...(parsed.homepage || {}) },
        services: { ...DEFAULT_SITE_CONTENT.services, ...(parsed.services || {}) },
        caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(parsed.caseStudies || {}) },
        blogs: parsed.blogs || DEFAULT_SITE_CONTENT.blogs,
        careers: parsed.careers || DEFAULT_SITE_CONTENT.careers,
        careerPage: { ...DEFAULT_SITE_CONTENT.careerPage, ...(parsed.careerPage || {}) },
        aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(parsed.aboutUs || {}) },
        contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(parsed.contactFooter || {}) },
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
    const merged: SiteContentData = {
      ...existing,
      ...content,
    };
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
    return initialContent || getLocalCmsContent() || DEFAULT_SITE_CONTENT;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check localStorage if not initialized with fresh server content
    const local = getLocalCmsContent();
    if (local && !initialContent && isMounted) {
      setContent(local);
    }

    const handleUpdate = (e: any) => {
      if (e.detail && isMounted) {
        setContent(e.detail);
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
            setContent(json.data);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
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
        setContent(e.detail);
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
            setContent(json.data);
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
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
