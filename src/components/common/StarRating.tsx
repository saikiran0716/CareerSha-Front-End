import React from 'react';
import { Star } from 'lucide-react';

/** Read-only star display, e.g. 4.3 -> 4 full stars. */
export const Stars: React.FC<{ value: number; size?: number }> = ({ value, size = 14 }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        size={size}
        aria-hidden="true"
        className={n <= Math.round(value) ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'}
      />
    ))}
  </span>
);

/** Clickable 1–5 star input with an accessible radio group. */
export const StarInput: React.FC<{ label: string; value: number; onChange: (v: number) => void }> = ({
  label,
  value,
  onChange,
}) => (
  <div role="radiogroup" aria-label={label} className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        role="radio"
        aria-checked={value === n}
        aria-label={`${n} star${n > 1 ? 's' : ''}`}
        onClick={() => onChange(n)}
        className="rounded p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-600"
      >
        <Star size={22} className={n <= value ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'} />
      </button>
    ))}
  </div>
);
