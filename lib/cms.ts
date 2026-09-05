import fs from 'fs';
import path from 'path';
import { DEFAULT_SITE_CONTENT, SiteContentData } from './cmsTypes';

export * from './cmsTypes';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'site-content.json');

export function getSiteContent(): SiteContentData {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      return {
        ...DEFAULT_SITE_CONTENT,
        ...parsed,
        branding: { ...DEFAULT_SITE_CONTENT.branding, ...(parsed.branding || {}) },
        homepage: { ...DEFAULT_SITE_CONTENT.homepage, ...(parsed.homepage || {}) },
        services: { ...DEFAULT_SITE_CONTENT.services, ...(parsed.services || {}) },
        caseStudies: { ...DEFAULT_SITE_CONTENT.caseStudies, ...(parsed.caseStudies || {}) },
        blogs: parsed.blogs || DEFAULT_SITE_CONTENT.blogs,
        careers: parsed.careers || DEFAULT_SITE_CONTENT.careers,
        aboutUs: { ...DEFAULT_SITE_CONTENT.aboutUs, ...(parsed.aboutUs || {}) },
        contactFooter: { ...DEFAULT_SITE_CONTENT.contactFooter, ...(parsed.contactFooter || {}) },
      };
    }
  } catch (error) {
    console.error('Error reading site content from disk:', error);
  }
  return DEFAULT_SITE_CONTENT;
}

export function saveSiteContent(content: Partial<SiteContentData>): boolean {
  try {
    const current = getSiteContent();
    const updated: SiteContentData = {
      ...current,
      ...content,
    };
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error saving site content to disk:', error);
    return false;
  }
}
