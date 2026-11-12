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
  image: string;
  link: string;
  is_live: boolean;
  category: string;
};

export const getLatestNewsItems = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(buildApiUrl('/content/latest-news/'));
    if (!response.ok) {
      throw new Error(`Failed to fetch latest news: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: NewsApiItem) => {
      // Basic normalization of date if it's a timestamp
      const dateStr =
        new Date(item.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }) + ' IST';

      return {
        id: item.id,
        title: item.title,
        date: dateStr,
        image: toImageUrl(item.image),
        link: item.link,
        isLive: item.is_live,
        category: item.category,
      };
    });
  } catch (error) {
    console.error('Failed to load latest news items:', error);
    return [];
  }
};
