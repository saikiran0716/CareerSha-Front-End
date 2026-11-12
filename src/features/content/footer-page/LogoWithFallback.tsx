import React, { useEffect, useState } from 'react';

/** College logo: explicit image → Clearbit → Google favicon → initials placeholder. */
const LogoWithFallback = ({ title, image, link }: { title: string; image?: string; link?: string }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [useGoogle, setUseGoogle] = useState(false);

  useEffect(() => {
    setError(false);
    setUseGoogle(false);

    // 1. Explicit Image from Data
    if (image && image.length > 10) {
      setImgSrc(image);
      return;
    }

    // 2. Derive from Link
    if (link) {
      try {
        const domain = link
          .toLowerCase()
          .replace(/^(https?:\/\/)?(www\.)?/, '')
          .split('/')[0];
        if (domain) {
          // Try Clearbit first
          setImgSrc(`https://logo.clearbit.com/${domain}`);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      }
    } else {
      setError(true);
    }
  }, [image, link]);

  const handleError = () => {
    if (!useGoogle && link) {
      // Fallback 1: Try Google Favicon if Clearbit failed
      setUseGoogle(true);
      try {
        const domain = link
          .toLowerCase()
          .replace(/^(https?:\/\/)?(www\.)?/, '')
          .split('/')[0];
        setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
      } catch {
        setError(true);
      }
    } else {
      // Fallback 2: Show Generic Icon
      setError(true);
      setImgSrc(null);
    }
  };

  if (error || !imgSrc) {
    // Aesthetic Fallback: Initial with Color Gradient
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-100 dark:border-neutral-700">
        <div className="w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center mb-1 text-secondary-600 dark:text-secondary-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center px-1 line-clamp-1">
          {title.substring(0, 3)}
        </span>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={title}
      className="w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal transition-opacity duration-500"
      onError={handleError}
      loading="lazy"
    />
  );
};

export default LogoWithFallback;
