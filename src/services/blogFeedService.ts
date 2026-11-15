import { BLOG_URL } from '../config/links';
import type { NewsItem } from './homeContentService';

/** A post is shown as "live" (red dot) for this long after it goes out. */
const LIVE_FOR_MS = 24 * 60 * 60 * 1000;

type BlogFeedPost = {
  id: number;
  title: string;
  url: string;
  image: string;
  published_at: string;
};

const formatDate = (when: Date) =>
  when.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

/**
 * Newest posts from the CareerSha blog (its /feed.json), shaped like news items so the
 * home page "Live Updates" box can mix them with news. Returns [] if the blog can't be reached.
 */
export const getLatestBlogPosts = async (limit = 6): Promise<NewsItem[]> => {
  try {
    const response = await fetch(`${BLOG_URL.replace(/\/$/, '')}/feed.json?limit=${limit}`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error(`Failed to fetch blog posts: ${response.status}`);
    const data = await response.json();
    const posts: BlogFeedPost[] = Array.isArray(data?.posts) ? data.posts : [];
    const now = Date.now();
    return posts.map((post) => {
      const when = new Date(post.published_at);
      const timestamp = when.getTime();
      return {
        // Offset so blog ids never clash with news ids (both are React keys).
        id: 1_000_000 + post.id,
        title: post.title,
        date: formatDate(when),
        image: post.image,
        link: post.url,
        isLive: now - timestamp >= 0 && now - timestamp < LIVE_FOR_MS,
        category: 'Blog',
        timestamp,
      };
    });
  } catch (error) {
    console.error('Failed to load blog posts:', error);
    return [];
  }
};

/** News and blog posts together, newest first. */
export const mergeByTime = (...lists: NewsItem[][]): NewsItem[] =>
  lists.flat().sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
