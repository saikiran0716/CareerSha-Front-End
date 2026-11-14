import { buildApiUrl, SERVER_ROOT } from './apiConfig';

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  image: string;
  link: string;
  isLive: boolean;
  category: string;
}

export interface NewsDetail extends NewsItem {
  /** Article body; paragraphs separated by blank lines. */
  content: string;
}

/** External (http) links open in a new tab; everything else is an in-app route. */
export const isExternalLink = (link: string) => /^https?:\/\//i.test(link);

/** News without an external link opens its own article page. */
const toNewsLink = (id: number, link?: string) => (link && isExternalLink(link) ? link : `/news/${id}`);

const toImageUrl = (path?: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SERVER_ROOT}${normalizedPath}`;
};

type NewsApiItem = {
  id: number;
  title: string;
  created_at: string;
  published_at?: string;
  image: string;
  link: string;
  is_live: boolean;
  category: string;
  content?: string;
};

const formatNewsDate = (item: NewsApiItem) =>
  new Date(item.published_at || item.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' IST';

const toNewsItem = (item: NewsApiItem): NewsItem => ({
  id: item.id,
  title: item.title,
  date: formatNewsDate(item),
  image: toImageUrl(item.image),
  link: toNewsLink(item.id, item.link),
  isLive: item.is_live,
  category: item.category,
});

export const getLatestNewsItems = async (): Promise<NewsItem[]> => {
  try {
    // Give up after a few seconds so the homepage never shows an endless loader.
    const response = await fetch(buildApiUrl('/content/latest-news/'), { signal: AbortSignal.timeout(6000) });
    if (!response.ok) {
      throw new Error(`Failed to fetch latest news: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map(toNewsItem);
  } catch (error) {
    console.error('Failed to load latest news items:', error);
    return [];
  }
};

/** A single news article, or null if it doesn't exist / can't be loaded. */
export const getNewsItem = async (id: number | string): Promise<NewsDetail | null> => {
  try {
    const response = await fetch(buildApiUrl(`/content/latest-news/${id}/`), { signal: AbortSignal.timeout(6000) });
    if (!response.ok) return null;
    const item: NewsApiItem = await response.json();
    return { ...toNewsItem(item), content: item.content || '' };
  } catch (error) {
    console.error('Failed to load news item:', error);
    return null;
  }
};
