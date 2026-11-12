import React from 'react';

/** CareerSha logo mark (same artwork as public/favicon.svg). Size it with className, e.g. "w-8 h-8". */
const Logo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" className={className} aria-hidden="true">
    <rect width="120" height="120" rx="26" fill="#13235B" />
    <g transform="translate(6 6) scale(0.9)">
      <path
        d="M88.28 88.28 A40 40 0 1 1 88.28 31.72"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <rect x="45" y="64" width="12" height="16" rx="3" fill="#F27A1A" />
      <rect x="61" y="54" width="12" height="26" rx="3" fill="#F27A1A" />
      <rect x="77" y="42" width="12" height="38" rx="3" fill="#F27A1A" />
    </g>
  </svg>
);

export default Logo;
