import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { compareService, MAX_COMPARE } from '../../services/compareService';
import { useCompare } from '../../hooks/useCompare';

/** Adds / removes a college from the comparison list. */
const CompareButton: React.FC<{ slug: string; name: string; className?: string }> = ({
  slug,
  name,
  className = '',
}) => {
  const list = useCompare();
  const selected = list.includes(slug);
  const [full, setFull] = useState(false);

  const toggle = () => {
    const ok = compareService.toggle(slug);
    setFull(!ok);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={selected}
        aria-label={selected ? `Remove ${name} from compare` : `Add ${name} to compare`}
        className={`flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-bold transition-colors ${
          selected
            ? 'border-primary-800 bg-primary-50 text-primary-800'
            : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
        }`}
      >
        {selected ? <Check size={14} /> : <Copy size={14} />}
        {selected ? 'Added to compare' : 'Compare'}
      </button>
      {full && (
        <p role="alert" className="mt-1 text-xs text-danger-600">
          You can compare up to {MAX_COMPARE} colleges. Remove one first.
        </p>
      )}
    </div>
  );
};

export default CompareButton;
