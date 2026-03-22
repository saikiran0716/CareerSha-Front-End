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
  const safeTitle = escapeHtml(item.title);

  return `
    <p style="font-size: 1.15rem; font-weight: 500; line-height: 1.85; margin-bottom: 2rem; color: #334155;">
      ${summary}
    </p>
    
    <div style="margin-top: 3rem; margin-bottom: 2rem; padding: 2rem; background-color: #f8fafc; border-left: 4px solid #b91c1c;">
      <h3 style="font-size: 0.9rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #b91c1c; margin-bottom: 1rem;">
        Key Takeaways
      </h3>
      <ul style="margin: 0; padding-left: 1.25rem; color: #475569; line-height: 1.8;">
        <li>Strategic shift in national academic policies for the 2026 session.</li>
        <li>Integration of multi-conceptual problem solving in core examinations.</li>
        <li>Increased focus on digital-first certification and agile learning paths.</li>
      </ul>
    </div>

    <h2 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin-top: 3.5rem; margin-bottom: 1.5rem; color: #0f172a; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">
      Editorial Insight
    </h2>
    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569; font-style: italic; border-left: 3px solid #e2e8f0; padding-left: 1.5rem;">
      "The 2026 landscape represents more than just a change in syllabus; it is a fundamental pivot toward global competitiveness. Institutions are no longer just teaching subjects—they are building resilient professionals ready for an AI-integrated economy."
    </p>

    <h2 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin-top: 3.5rem; margin-bottom: 1.5rem; color: #0f172a; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">
      Detailed Analysis
    </h2>
    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      The evolution of the Indian education system in 2026 is marked by an unprecedented integration of technology and pedagogical innovation. Across major engineering hubs, the traditional lecture-based model is being systematically replaced by high-intensity, project-oriented modules that emphasize real-world application over theoretical memorization. This shift is not merely cosmetic; it represents a deep-seated change in how institutions perceive their role in a rapidly changing global economy. With the rise of specialized AI research labs and sustainability-focused degrees, students are now required to be more versatile, adaptive, and ethically conscious than any generation before them.
    </p>
    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      Furthermore, the 2026 academic cycle has seen a significant surge in interdisciplinary collaboration. We are seeing a new class of "Polymathic Professionals"—individuals who can traverse the boundaries between data science, humanities, and structural engineering with ease. This versatility is becoming the primary metric for recruitment at top-tier global firms. In response, universities are dismantling traditional department silos, offering flexible paths to graduation that allow students to stack micro-credentials and bespoke certifications. The result is a more resilient workforce, capable of navigating the complexities of a digitally-native and sustainability-driven market.
    </p>
    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      Finally, the focus on mental health and student well-being has reached a critical turning point. National testing agencies are now collaborating with experts to implement 24/7 counseling support and mindfulness-based testing protocols. The narrative around competitive exams is shifting from one of survived endurance to one of personal growth and psychological resilience. By institutionalizing these support systems, the education sector is ensuring that the pursuit of academic excellence does not come at the cost of institutional integrity or individual health, setting a global standard for holistic student development in the mid-2020s.
    </p>

    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      Looking deeper into the socio-economic impact of these changes, it becomes clear that the 2026 academic shift is also a response to the evolving global labor market. As automation and high-level algorithmic processes become standard across industries, the demand for "Human-Centric Design" and ethical reasoning has never been higher. Institutions are now tasked with producing graduates who are not just technologically proficient, but who also possess a profound understanding of the social consequences of their work. This is leading to a resurgence in the value of philosophy, ethics, and social sciences, even within traditionally technical engineering hub environments.
    </p>

    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      From an infrastructure perspective, the "Smart Campus" of 2026 is a marvel of connectivity and sustainability. By leveraging real-time data analytics and renewable energy grids, top universities have managed to achieve net-zero carbon footprints while providing students with high-speed, immersive digital learning environments. This physical and digital synergy allows for a more fluid exchange of ideas, where a student in Bangalore can collaborate on a biomechanical project with a researcher in Stockholm in a shared virtual lab space. This level of global integration is the new baseline for academic excellence in the mid-2020s.
    </p>

    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      Finally, we must consider the long-term career trajectories being forged in this new era. The traditional concept of a "job for life" has been replaced by a model of continuous, professional evolution. The most successful professionals of 2026 are those who treat their education as a lifelong endeavor, constantly updating their skills through micro-credentials and specialized certifications. This agility is the ultimate safeguard against the unpredictable shifts of an AI-driven global economy. As we move further into this decade, the ability to learn, unlearn, and relearn will remain the most valuable asset any student can possess.
    </p>

    <h2 style="font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin-top: 3.5rem; margin-bottom: 1.5rem; color: #0f172a; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">
      The Bigger Picture
    </h2>
    <p style="margin-bottom: 1.5rem; line-height: 1.9; color: #475569;">
      As traditional boundaries between technology and humanities blur, students must adopt a polymathic approach. This editorial perspective examines how these shifts will impact admissions, long-term career planning, and institutional integrity across major Indian hubs.
    </p>

    <blockquote style="margin-top: 3rem; padding: 1.5rem; background: #fafafa; border: 1px solid #eee; color: #1e293b; font-weight: 600; text-align: center;">
      ${safeTitle} 
      <br/>
      <span style="font-size: 0.75rem; font-weight: 400; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-top: 0.5rem;">
        CareerSha Special Report • 2026
      </span>
    </blockquote>
  `;
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