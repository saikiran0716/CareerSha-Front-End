import React from 'react';

/** Lightweight fallback shown while a lazily-loaded page downloads. */
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center" role="status" aria-label="Loading">
    <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
  </div>
);

export default PageLoader;
