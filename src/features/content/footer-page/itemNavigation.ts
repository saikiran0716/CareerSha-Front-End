import { PageItem } from '../../../data/types';

export interface Destination {
  url: string;
  external?: boolean;
  state?: unknown;
}

const EXAM_SLUGS: [keyword: string, slug: string][] = [
  ['gate', 'gate'],
  ['jee', 'jee-main'],
  ['neet', 'neet'],
  ['xat', 'xat'],
  ['clat', 'clat'],
  ['mat', 'mat'],
  ['nift', 'nift'],
];

const isExamTitle = (t: string) =>
  t.includes('gate') ||
  t.includes('cat ') ||
  t === 'cat' ||
  t.includes('jee') ||
  t.includes('neet') ||
  t.includes('xat') ||
  t.includes('clat') ||
  t.includes('mat') ||
  t.includes('nift');

/** Tool cards on tool pages open the matching tool. */
const getToolRedirectUrl = (item: PageItem, pageId: string): string => {
  const normalizedPageId = (pageId || '').toLowerCase();
  const title = (item.title || '').toLowerCase();
  if (
    normalizedPageId.includes('tool-predictor') ||
    normalizedPageId.includes('tools-predictor') ||
    title.includes('predictor')
  ) {
    return '/college-matcher';
  }
  if (
    normalizedPageId.includes('tool-rank') ||
    normalizedPageId.includes('tools-rank') ||
    title.includes('rank estimator')
  ) {
    return '/rank-estimator';
  }
  return '';
};

/**
 * Where a card should go when clicked:
 * explicit link → exam page → tool page → college detail page.
 */
export const getItemDestination = (item: PageItem, pageId: string): Destination => {
  if (item.link && (item.link.startsWith('/') || item.link.startsWith('http'))) {
    return item.link.startsWith('/') ? { url: item.link } : { url: item.link, external: true };
  }

  const lowerTitle = (item.title || '').toLowerCase();
  if (isExamTitle(lowerTitle)) {
    const slug = EXAM_SLUGS.find(([keyword]) => lowerTitle.includes(keyword))?.[1] ?? 'cat';
    return { url: `/exams/${slug}` };
  }

  const toolUrl = getToolRedirectUrl(item, pageId);
  if (toolUrl) return { url: toolUrl };

  return { url: `/college/${encodeURIComponent(item.title)}`, state: { college: item } };
};
