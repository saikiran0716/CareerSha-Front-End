import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  schema?: object;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  robots = 'index, follow',
  schema,
  ogType = 'website',
  ogImage = 'https://careersha.com/og-image.png',
  twitterCard = 'summary_large_image',
}) => {
  const siteName = 'CareerSha';
  const siteUrl = 'https://careersha.com';
  // Standardize title format: "Page | CareerSha" or "CareerSha - Tagline"
  const fullTitle = title 
    ? (title.includes(siteName) ? title : `${title} | ${siteName}`) 
    : `CareerSha | Smart Education & Career Tools for Students`;
    
  const defaultDescription = 'CareerSha helps students with Rank Predictors, College Matcher, Exam Updates, and expert Career Guidance for JEE, NEET, MBA, Engineering, and Medical aspirants in India.';
  const defaultKeywords = 'rank predictor, college predictor, career guidance, jee main 2026, neet 2026, mba admissions, engineering entrance exams, medical counseling, CareerSha';
  
  // Set canonical URL (stripping trailing slash for consistency)
  const currentCanonical = canonical || (typeof window !== 'undefined' ? siteUrl + window.location.pathname.replace(/\/$/, '') : '');

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#4f46e5" />
      {currentCanonical && <link rel="canonical" href={currentCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={currentCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Organization Schema (Consistent identification) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": siteName,
          "url": siteUrl,
          "logo": `${siteUrl}/favicon.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "support@careersha.com"
          },
          "sameAs": [
            "https://facebook.com/careersha",
            "https://twitter.com/careersha",
            "https://instagram.com/careersha"
          ]
        })}
      </script>
      
      {/* Default Website Schema for Home/Root */}
      {(!schema && (title?.toLowerCase().includes('home') || !title)) && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": siteUrl,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${siteUrl}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
