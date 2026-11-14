import React, { useState } from 'react';
import { mediaUrl } from '../../services/catalogService';

/** Background per department for colleges without a photo. */
const STREAM_STYLE: Record<string, string> = {
  Engineering: 'from-primary-800 to-primary-600',
  Management: 'from-secondary-800 to-secondary-600',
  Medical: 'from-success-800 to-success-600',
  Dental: 'from-success-700 to-success-500',
  Pharmacy: 'from-success-700 to-primary-600',
  Nursing: 'from-success-700 to-success-500',
  Paramedical: 'from-success-700 to-success-500',
  Law: 'from-accent-800 to-accent-600',
  Design: 'from-accent-700 to-secondary-600',
  Architecture: 'from-neutral-800 to-neutral-600',
};
const DEFAULT_STYLE = 'from-primary-900 to-primary-700';

/** "AIIMS Delhi" -> "AIIMS", "IIT Delhi" -> "IIT", else up to three initials: "Sri Balaji College…" -> "SBC". */
const initialsOf = (name: string, shortName?: string) => {
  for (const text of [shortName, name]) {
    const acronym = (text ?? '').split(/[\s,()-]+/).find((w) => /^[A-Z]{2,6}$/.test(w));
    if (acronym) return acronym;
  }
  return (
    name
      .replace(/\(.*?\)/g, '')
      .split(/[\s,.-]+/)
      .filter((w) => /^[A-Z]/.test(w) && !['Of', 'And', 'The', 'For', 'In'].includes(w))
      .slice(0, 3)
      .map((w) => w[0])
      .join('') || name.slice(0, 1).toUpperCase()
  );
};

interface Props {
  college: { name: string; shortName?: string; stream?: string; imageUrl?: string | null; logoUrl?: string | null };
  className?: string;
  /** Show the stream name on the placeholder (cards); off for small thumbnails. */
  label?: boolean;
}

/** Campus photo, or a tidy placeholder (logo or initials on the department colour) when there is none. */
const CollegeImage: React.FC<Props> = ({ college, className = '', label = true }) => {
  const [photoFailed, setPhotoFailed] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const photo = !photoFailed && college.imageUrl ? mediaUrl(college.imageUrl) : '';

  if (photo) {
    return (
      <img
        src={photo}
        alt={`${college.name} campus`}
        loading="lazy"
        onError={() => setPhotoFailed(true)}
        className={`object-cover ${className}`}
      />
    );
  }
  const logo = !logoFailed && college.logoUrl ? mediaUrl(college.logoUrl) : '';
  return (
    <div
      role="img"
      aria-label={college.name}
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br text-white ${
        STREAM_STYLE[college.stream ?? ''] ?? DEFAULT_STYLE
      } ${className}`}
    >
      {logo ? (
        <span className="flex h-16 w-16 items-center justify-center rounded-xl bg-white p-2">
          <img src={logo} alt="" loading="lazy" onError={() => setLogoFailed(true)} className="max-h-full max-w-full" />
        </span>
      ) : (
        <span aria-hidden="true" className="font-brand text-3xl tracking-wide">
          {initialsOf(college.name, college.shortName)}
        </span>
      )}
      {label && college.stream && college.stream !== 'Other' && (
        <span aria-hidden="true" className="text-xs uppercase tracking-wider text-white/80">
          {college.stream}
        </span>
      )}
    </div>
  );
};

export default CollegeImage;
