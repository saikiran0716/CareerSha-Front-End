import React from 'react';
import { Info } from 'lucide-react';
import { SHOW_SAMPLE_DATA_NOTICE } from '../../config/features';

/** Tells visitors that figures on this page are illustrative sample data (see config/features.ts). */
const SampleDataNotice: React.FC<{ className?: string }> = ({ className = '' }) =>
  SHOW_SAMPLE_DATA_NOTICE ? (
    <p
      role="note"
      className={`flex items-start gap-2 rounded-xl border border-warning-200 bg-warning-50 px-4 py-2.5 text-sm text-warning-800 ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <span>
        <strong>Sample data:</strong> fees, cutoffs, placements and reviews shown here are illustrative while we connect
        official data. Always confirm on the college or exam’s official website.
      </span>
    </p>
  ) : null;

export default SampleDataNotice;
