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
  ogImage,
  twitterCard = 'summary_large_image',
}) => {
  const siteName = 'CareerSha';
  const siteUrl = 'https://careersha.com'; // Replace with actual domain if known
  const fullTitle = title || siteName;
  const defaultDescription = 'CareerSha helps students with rank predictors, college prediction, exam updates and career guidance in India.';
  
  // Use window.location.href for canonical if not provided
  const currentCanonical = canonical || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '');

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      {currentCanonical && <link rel="canonical" href={currentCanonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={currentCanonical} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {/* Default Website Schema if on Homepage and no schema provided */}
      {!schema && title?.toLowerCase().includes('home') && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteName,
            "url": siteUrl
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
