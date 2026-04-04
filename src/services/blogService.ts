import { buildApiUrl } from './apiConfig';
import {
  BlogArticle,
  BreakingNewsItem,
  CmsBlogItem,
  mapCmsBlogItemToArticle,
  mapCmsBlogItemsToArticles,
  slugify,
} from '@/pages/Blog/blogData';

type CmsListResponse = CmsBlogItem[] | { items?: CmsBlogItem[]; results?: CmsBlogItem[] };

const LIST_ENDPOINT = import.meta.env.VITE_CMS_BLOG_LIST_ENDPOINT || '/content/blog/';
const DETAIL_ENDPOINT = import.meta.env.VITE_CMS_BLOG_DETAIL_ENDPOINT || '/content/blog';

const toList = (payload: CmsListResponse): CmsBlogItem[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

export const fetchBlogArticles = async (): Promise<BlogArticle[]> => {
  try {
    const response = await fetch(buildApiUrl(LIST_ENDPOINT));
    if (!response.ok) {
      throw new Error(`Failed to fetch blog list: ${response.status}`);
    }

    const payload = (await response.json()) as CmsListResponse;
    const items = toList(payload);

    return items.length === 0 ? [] : mapCmsBlogItemsToArticles(items);
  } catch (error) {
    console.error('Failed to load CMS blog list:', error);
    return [];
  }
};

export const fetchBlogArticleByIdentifier = async (identifier?: string): Promise<BlogArticle | null> => {
  if (!identifier) {
    return null;
  }

  try {
    const directResponse = await fetch(buildApiUrl(`${DETAIL_ENDPOINT}/${identifier}/`));
    if (directResponse.ok) {
      const payload = (await directResponse.json()) as CmsBlogItem;
      return mapCmsBlogItemToArticle(payload);
    }

    const list = await fetchBlogArticles();
    return list.find((item) => item.slug === identifier || String(item.id) === identifier) ?? null;
  } catch (error) {
    console.error('Failed to load CMS blog detail:', error);
    return null;
  }
};

export const getRelatedFromArticles = (articles: BlogArticle[], currentId: number, limit = 4) =>
  articles.filter((item) => item.id !== currentId).slice(0, limit);

export const fetchBreakingNews = async (): Promise<BreakingNewsItem[]> => {
  try {
    const response = await fetch(buildApiUrl('/content/latest-news/'));
    if (!response.ok) {
      throw new Error(`Failed to fetch breaking news: ${response.status}`);
    }

    const data = (await response.json()) as CmsBlogItem[];
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((item) => {
      const id = item.id ?? 0;
      const slug = item.slug?.trim() || `${slugify(item.title || '')}-${id}`;
      return {
        text: item.title || 'Breaking Update',
        path: `/blog/${slug}`,
      };
    });
  } catch (error) {
    console.error('Failed to load CMS breaking news:', error);
    return [];
  }
};
