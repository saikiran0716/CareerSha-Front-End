import { FOOTER_PAGES } from '../data/footerData';

/** Footer slugs rendered by dedicated components instead of the generic page. */
export const DEDICATED_FOOTER_SLUGS = new Set([
  'company-about',
  'company-contact',
  'legal-privacy',
  'legal-terms',
  'legal-disclaimer',
]);

/** Maps a FOOTER_PAGES slug to its URL path. */
export const footerSlugToPath = (slug: string): string => {
  const overrides: Record<string, string> = {
    'iits-india': '/iits/india',
    'nits-india': '/nits/india',
    'aiims-colleges': '/aiims/colleges',
    'btech-india': '/eng/india',
    'mbbs-india': '/mbbs/india',
  };
  if (overrides[slug]) return overrides[slug];
  for (const prefix of ['tool', 'legal', 'company', 'site']) {
    if (slug.startsWith(`${prefix}-`)) {
      const base = prefix === 'tool' ? 'tools' : prefix;
      return `/${base}/${slug.slice(prefix.length + 1)}`;
    }
  }
  return `/${slug.replace(/-/g, '/')}`;
};

/** Footer slugs served by the generic category/info page (exam slugs are served by /exams/:examId). */
export const GENERIC_FOOTER_SLUGS = Object.keys(FOOTER_PAGES).filter(
  (slug) => !slug.startsWith('exam-') && !slug.startsWith('exams-') && !DEDICATED_FOOTER_SLUGS.has(slug),
);
