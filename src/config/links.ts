/**
 * External sites linked from CareerSha.
 *
 * BLOG_URL: the blog is its own Wagtail website (CareerSha-Blog project), served at
 * blogs.careersha.com. Set VITE_BLOG_URL to override it (e.g. http://localhost:8001
 * in .env.development.local); the header "Blogs" link and old /blogs, /blog/... links go there.
 */
export const BLOG_URL = (import.meta.env.VITE_BLOG_URL || 'https://blogs.careersha.com').trim();
