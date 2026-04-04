export const CATEGORIES = ["ALL NEWS", "ADMISSIONS", "EXAM UPDATES", "RESULTS", "JOBS PORTAL"];

export interface BreakingNewsItem {
  text: string;
  path: string;
}

export const BREAKING_NEWS: BreakingNewsItem[] = [
  { text: "CareerSha Admissions 2026: Phase 1 Applications Now Open for Top Engineering Colleges", path: "/blog" },
  { text: "Latest Job Portal Update: 50+ New Tech Internships Added for Summer 2026", path: "/blog" },
  { text: "Exam Alert: Final Countdown for National Entrance Exams - Check Mandatory Guidelines", path: "/blog" }
];

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


const RAW_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 1,
    type: "STORY",
    title: "Top High-Paying Skills to Learn in 2026 (Without Degree)",
    tag: "EXAM UPDATES",
    description: "Discover the most in-demand skills for the 2026 job market. This comprehensive guide covers technical and soft skills that leading employers are seeking in the academic and professional landscape.",
    date: "MAR 14, 2026",
    time: "2h ago",
    author: "CareerSha Editorial Desk",
    role: "Education Consultant",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    type: "STORY",
    title: "Top Freelancing Careers for Beginners (No Experience Needed)",
    tag: "JOBS PORTAL",
    description: "Start your professional journey with these accessible freelancing paths. Learn how to leverage basic skills into high-value services for global clients in the 2026 gig economy.",
    date: "MAR 13, 2026",
    time: "1d ago",
    author: "CareerSha",
    role: "Career Coach",
    image: "https://images.unsplash.com/photo-1484417824246-195028aa37b0?q=80&w=1932&auto=format&fit=crop"
  },
  {
    id: 3,
    type: "BRIEF",
    title: "CareerSha Admissions 2026: Phase 1 Applications Now Open",
    tag: "ADMISSIONS",
    description: "Major engineering hubs have opened their initial registration portals. Check the mandatory guidelines and deadline reminders for the upcoming academic cycle.",
    date: "MAR 12, 2026",
    time: "2d ago",
    author: "Team CareerSha",
    role: "Admissions Head",
    image: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=2070&auto=format&fit=crop"
  }
];

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

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatDate = (value: Date) => {
  const month = MONTHS[value.getUTCMonth()];
  const day = String(value.getUTCDate()).padStart(2, "0");
  const year = value.getUTCFullYear();
  return `${month} ${day}, ${year}`;
};

const getPublishedDate = (item: ContentItem) => {
  if (item.date) {
    return item.date;
  }

  if (!item.time) {
    return formatDate(REFERENCE_DATE);
  }

  const match = item.time.match(/^(\d+)([mhd])\s+ago$/i);
  if (!match) {
    return formatDate(REFERENCE_DATE);
  }

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const derivedDate = new Date(REFERENCE_DATE);

  if (unit === "m") {
    derivedDate.setUTCMinutes(derivedDate.getUTCMinutes() - amount);
  } else if (unit === "h") {
    derivedDate.setUTCHours(derivedDate.getUTCHours() - amount);
  } else {
    derivedDate.setUTCDate(derivedDate.getUTCDate() - amount);
  }

  return formatDate(derivedDate);
};

// Helper to strip HTML tags and get clean text
const stripHtml = (html?: string) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, "") // Remove tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
};

const getSummary = (item: ContentItem) => {
  if (item.description) {
    return item.description;
  }

  if (item.type === "PERSPECTIVE") {
    return `${item.author ?? "CareerSha Editorial Desk"} shares a focused perspective on ${item.title.toLowerCase()}`;
  }

  return `${item.title} This comprehensive report explores the latest developments and strategic implications for students and professionals in the 2026 academic landscape. Our editorial team provides deep-dive analysis into market shifts and institutional changes.`;
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

const normalizeItem = (item: ContentItem): BlogArticle => {
  const summary = getSummary(item);
  const publishedDate = getPublishedDate(item);
  const slug = `${slugify(item.title)}-${item.id}`;
  const seoTitle = `${item.title} | CareerSha Blog`.slice(0, 60);
  const seoDescription = summary.slice(0, 155);

  return {
    ...item,
    slug,
    summary,
    publishedDate,
    relativeTime: item.time,
    readTime: getReadTime(summary, item.type),
    seoTitle,
    seoDescription,
    seoKeywords: "", // Local fallback item doesn't have keywords
    bodyHtml: buildBodyHtml(item, summary)
  };
};

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
    ? unescapeHtml(rawBodyHtml) 
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

export const BLOG_ARTICLES = RAW_CONTENT_ITEMS.map(normalizeItem);

export const getBlogPath = (item: Pick<BlogArticle, "slug">) => `/blog/${item.slug}`;

export const getBlogByIdentifier = (identifier?: string) => {
  if (!identifier) {
    return BLOG_ARTICLES[0];
  }

  return BLOG_ARTICLES.find((item) => item.slug === identifier || String(item.id) === identifier) ?? BLOG_ARTICLES[0];
};

export const getRelatedBlogs = (currentId: number, limit = 4) =>
  BLOG_ARTICLES.filter((item) => item.id !== currentId).slice(0, limit);