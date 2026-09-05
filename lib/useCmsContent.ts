'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_SITE_CONTENT, SiteContentData } from './cmsTypes';

export function useCmsContent() {
  const [content, setContent] = useState<SiteContentData>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        const res = await fetch('/api/admin/content');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            setContent(json.data);
          }
        }
      } catch (err) {
        console.warn('Using default content due to fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  return { content, loading };
}
