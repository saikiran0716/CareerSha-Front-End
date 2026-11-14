import React, { useEffect } from 'react';

/** Sends the visitor to another website (e.g. the blog), with a link in case the redirect is blocked. */
const ExternalRedirect: React.FC<{ to: string; label: string }> = ({ to, label }) => {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <div className="page-container py-20 text-center">
      <p className="text-neutral-700">Taking you to the {label}…</p>
      <a href={to} className="mt-2 inline-block text-sm text-primary-700 hover:underline">
        Continue to the {label}
      </a>
    </div>
  );
};

export default ExternalRedirect;
