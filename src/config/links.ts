/**
 * External sites linked from CareerSha.
 *
 * BLOG_URL: the blog runs as its own Wagtail website (separate repo, based on
 * github.com/wagtail/news-template). Set VITE_BLOG_URL in .env to its address;
 * the header "Blogs" link and old /blogs, /blog/... links go there.
 */
export const BLOG_URL = (import.meta.env.VITE_BLOG_URL || 'https://blog.careersha.com').trim();
