const SITE_URL = 'https://www.careersha.com';
const CMS_BASE = (process.env.VITE_API_BASE_URL || 'https://api.careersha.com').replace(/\/+$/, '');
const BLOG_LIST_ENDPOINT = process.env.VITE_CMS_BLOG_LIST_ENDPOINT || '/content/blog/';

const normalizeApiUrl = (base, endpoint) => {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (base.endsWith('/api')) {
    return `${base}${normalizedEndpoint}`;
  }
  return `${base}/api${normalizedEndpoint}`;
};

const toList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};

const formatDate = (rawDate) => {
  if (!rawDate) return new Date().toISOString().slice(0, 10);
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString().slice(0, 10);
  return parsed.toISOString().slice(0, 10);
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export default async function handler(_req, res) {
  try {
    const apiUrl = normalizeApiUrl(CMS_BASE, BLOG_LIST_ENDPOINT);
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`Blog API failed with status ${response.status}`);
    }

    const payload = await response.json();
    const list = toList(payload);

    const bySlug = new Map();
    for (const item of list) {
      const slug = String(item?.slug || '').trim();
      if (!slug || bySlug.has(slug)) continue;
      bySlug.set(slug, item);
    }

    const urls = Array.from(bySlug.values())
      .sort((a, b) => {
        const aDate = new Date(a?.published_date || a?.publishedDate || a?.date || 0).getTime();
        const bDate = new Date(b?.published_date || b?.publishedDate || b?.date || 0).getTime();
        return bDate - aDate;
      })
      .map((item) => {
        const slug = String(item.slug).trim();
        const lastmod = formatDate(item?.published_date || item?.publishedDate || item?.date);
        return `  <url><loc>${escapeXml(`${SITE_URL}/blog/${slug}`)}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;
      })
      .join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.status(200).send(xml);
  } catch (error) {
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/blog</loc><changefreq>daily</changefreq><priority>0.8</priority></url>\n</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.status(200).send(fallback);
  }
}
