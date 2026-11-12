export const CATEGORIES = ["ALL NEWS", "ADMISSIONS", "EXAM UPDATES", "RESULTS", "JOBS PORTAL"];

export interface ContentItem {
  id: number;
  type: "STORY" | "BRIEF" | "PERSPECTIVE";
  title: string;
  tag: string;
  description?: string;
  date?: string;
  time?: string;
  author?: string;
  image?: string;
  role?: string;
}

export interface BlogArticle extends ContentItem {
  slug: string;
  summary: string;
  publishedDate: string;
  relativeTime?: string;
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl?: string;
  bodyHtml: string;
}

export interface CmsBlogItem {
  id?: number;
  slug?: string;
  title?: string;
  summary?: string;
  excerpt?: string;
  description?: string;
  // Wagtail returns categories as an array of objects OR a plain string
  category?: string | Array<{ id?: number; name?: string; slug?: string }> | null;
  categories?: Array<{ id?: number; name?: string; slug?: string }>;
  tag?: string;
  published_date?: string;
  publishedDate?: string;
  date?: string;
  read_time?: string;
  readTime?: string;
  author?: string;
  role?: string;
  type?: ContentItem["type"];
  image?: string | { url?: string };
  seo_title?: string;
  seoTitle?: string;
  seo_description?: string;
  seoDescription?: string;
  focus_keyword?: string;
  secondary_keywords?: string;
  canonical_url?: string;
  body_html?: string;
  bodyHtml?: string;
}
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const REFERENCE_DATE = new Date("2026-03-14T12:00:00Z");

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const unescapeHtml = (value: string) => {
  if (!value) return "";
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const formatDate = (value: Date) => {
  const month = MONTHS[value.getUTCMonth()];
  const day = String(value.getUTCDate()).padStart(2, "0");
  const year = value.getUTCFullYear();
  return `${month} ${day}, ${year}`;
};

const stripHtml = (html?: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, "") // Remove tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

const getReadTime = (summary: string, type: ContentItem["type"]) => {
  if (type === "BRIEF") {
    return "3 min read";
  }

  if (type === "PERSPECTIVE") {
    return "5 min read";
  }

  const words = summary.trim().split(/\s+/).length;
  return `${Math.max(4, Math.ceil(words / 180))} min read`;
};

const buildBodyHtml = (item: ContentItem, summary: string) => {
  return ``;
};

const removeSectionLines = (html: string) =>
  html
    .replace(/border-(?:bottom|top|left):\s*[^;"']+;?/gi, '')
    .replace(/<hr\b[^>]*>/gi, '')
    .replace(/\s{2,}/g, ' ');

const toDisplayDate = (value?: string) => {
  if (!value) {
    return formatDate(REFERENCE_DATE);
  }

  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return value.toUpperCase();
  }

  return formatDate(new Date(parsed));
};

const toImageUrl = (image?: string | { url?: string }) => {
  if (!image) {
    return undefined;
  }

  if (typeof image === "string") {
    return image;
  }

  return image.url;
};

export const mapCmsBlogItemToArticle = (item: CmsBlogItem, fallbackId = 1): BlogArticle => {
  const id = item.id ?? fallbackId;
  const title = item.title?.trim() || `Untitled Article ${id}`;
  // Extract category — handle Wagtail arrays, singular objects, or plain strings
  let rawCategory = 'ALL NEWS';
  
  if (item.categories && Array.isArray(item.categories) && item.categories.length > 0) {
    rawCategory = item.categories[0].name || item.categories[0].slug || rawCategory;
  } else if (item.category) {
    if (Array.isArray(item.category) && item.category.length > 0) {
      rawCategory = item.category[0].name || item.category[0].slug || rawCategory;
    } else if (typeof item.category === 'string') {
      rawCategory = item.category;
    } else if (typeof item.category === 'object') {
      const catObj = item.category as any;
      rawCategory = catObj.name || catObj.slug || rawCategory;
    }
  } else if (item.tag) {
    rawCategory = item.tag;
  }

  const tag = rawCategory.replace(/-/g, ' ').toUpperCase();
  
  const rawBodyHtml = item.body_html || item.bodyHtml;
  const cleanBodyText = stripHtml(unescapeHtml(rawBodyHtml || ''));
  
  const summaryRaw =
    (cleanBodyText && cleanBodyText.length > 20) ? cleanBodyText :
    item.summary?.trim() ||
    item.excerpt?.trim() ||
    item.description?.trim() ||
    `This CMS article is ready for preview in the CareerSha blog detail layout.`;
  
  const summary = unescapeHtml(summaryRaw);
  const publishedDateSource = item.published_date || item.publishedDate || item.date;
  const publishedDate = toDisplayDate(publishedDateSource);
  const VALID_TYPES: ContentItem['type'][] = ['STORY', 'BRIEF'];
  const normalizedType: ContentItem['type'] = VALID_TYPES.includes(item.type as ContentItem['type'])
    ? (item.type as ContentItem['type'])
    : 'STORY';
  const readTime = item.read_time || item.readTime || getReadTime(summary, normalizedType);
  const slug = item.slug?.trim() || `${slugify(title)}-${id}`;
  const seoTitleInput = item.seo_title?.trim() || item.seoTitle?.trim() || `${title} | CareerSha Blog`;
  const seoTitle = seoTitleInput.slice(0, 60);
  const seoDescription =
    (item.seo_description?.trim() ||
    item.seoDescription?.trim() ||
    summary).slice(0, 155);
  
  const focus = item.focus_keyword?.trim() || "";
  const secondary = item.secondary_keywords?.trim() || "";
  const seoKeywords = [focus, secondary].filter(Boolean).join(", ");
  
  const image = toImageUrl(item.image);
  
  const bodyHtml = rawBodyHtml 
    ? removeSectionLines(unescapeHtml(rawBodyHtml)) 
    : buildBodyHtml(
        {
          id,
          title,
          tag,
          type: normalizedType,
          author: item.author,
          role: item.role,
          image,
          description: summary,
          date: publishedDate
        },
        summary
      );

  return {
    id,
    type: normalizedType,
    title,
    tag,
    description: summary,
    date: publishedDate,
    author: item.author,
    image,
    role: item.role,
    slug,
    summary,
    publishedDate,
    readTime,
    seoTitle,
    seoDescription,
    seoKeywords,
    canonicalUrl: item.canonical_url?.trim() || undefined,
    bodyHtml
  };
};

export const mapCmsBlogItemsToArticles = (items: CmsBlogItem[]) =>
  items.map((item, index) => mapCmsBlogItemToArticle(item, index + 1));


export const getBlogPath = (item: Pick<BlogArticle, "slug">) => `/blog/${item.slug}`;
