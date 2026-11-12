import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  /** Page title; " | CareerSha" is appended unless it already contains the site name. */
  title?: string;
  description?: string;
  keywords?: string;
  /** Absolute canonical URL. Defaults to the current path (no query string). */
  canonical?: string;
  /** e.g. "noindex, nofollow" for pages search engines should skip. */
  robots?: string;
  /** Extra page-specific JSON-LD (e.g. FAQPage, Course). */
  schema?: object;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

const SITE_NAME = 'CareerSha';
const SITE_URL = 'https://www.careersha.com';
const DEFAULT_TITLE = 'CareerSha | Smart Education & Career Tools for Students';
const DEFAULT_DESCRIPTION =
  'CareerSha helps students with Rank Predictors, College Matcher, Exam Updates, and expert Career Guidance for JEE, NEET, MBA, Engineering, and Medical aspirants in India.';
const DEFAULT_KEYWORDS =
  'rank predictor, college predictor, career guidance, jee main 2026, neet 2026, mba admissions, engineering entrance exams, medical counseling, CareerSha';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'support@careersha.com',
  },
  sameAs: ['https://facebook.com/careersha', 'https://twitter.com/careersha', 'https://instagram.com/careersha'],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/search?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

/**
 * Per-page SEO tags. Use once per page component.
 * Replaces the defaults in index.html (they carry data-rh so Helmet takes them over).
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonical,
  robots = 'index, follow',
  schema,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  twitterCard = 'summary_large_image',
}) => {
  const { pathname } = useLocation();

  const fullTitle = title ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`) : DEFAULT_TITLE;
  const path = pathname.replace(/\/+$/, '') || '/';
  const pageUrl = canonical || `${SITE_URL}${path === '/' ? '/' : path}`;
  const isIndexable = !robots.includes('noindex');
  const isHome = path === '/';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS} />
      <meta name="robots" content={robots} />
      {/* A noindex page must not declare a canonical URL */}
      {isIndexable && <link rel="canonical" href={pageUrl} />}

      {/* Open Graph (Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={pageUrl} />

      {/* Twitter / X */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(ORGANIZATION_SCHEMA)}</script>
      {isHome && <script type="application/ld+json">{JSON.stringify(WEBSITE_SCHEMA)}</script>}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default SEO;
