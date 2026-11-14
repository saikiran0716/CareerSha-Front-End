import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  /** e.g. "colleges" */
  noun?: string;
}

/**
 * Page numbers to show: always the first and last, and a window around the current page, with
 * gaps ("…") between. 1 2 3 4 5 … 13 / 1 … 6 7 8 … 13 / 1 … 9 10 11 12 13
 */
export const pageNumbers = (page: number, totalPages: number): (number | '…')[] => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  let start = Math.max(2, Math.min(page - 1, totalPages - 4));
  let end = Math.min(totalPages - 1, Math.max(page + 1, 5));
  // A gap hiding a single page shows that page instead.
  if (start === 3) start = 2;
  if (end === totalPages - 2) end = totalPages - 1;
  const middle = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return [1, ...(start > 2 ? ['…' as const] : []), ...middle, ...(end < totalPages - 1 ? ['…' as const] : []), totalPages];
};

const button =
  'flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40';

/** Numbered pages under a list: Previous, 1 … 4 5 6 … 13, Next, and "Showing 41–50 of 128". */
const Pagination: React.FC<Props> = ({ page, pageSize, total, onChange, noun = 'colleges' }) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav aria-label="Pagination" className="flex flex-col items-center gap-3 py-6">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
          className={`${button} border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-800`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden pr-1 sm:inline">Prev</span>
        </button>
        {pageNumbers(page, totalPages).map((n, i) =>
          n === '…' ? (
            <span key={`gap-${i}`} className="px-1 text-sm text-neutral-400" aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={`Page ${n}`}
              aria-current={n === page ? 'page' : undefined}
              className={`${button} ${
                n === page
                  ? 'border-primary-800 bg-primary-800 text-white'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-800'
              }`}
            >
              {n}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
          className={`${button} border-neutral-200 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-800`}
        >
          <span className="hidden pl-1 sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs text-neutral-500">
        Showing {from.toLocaleString('en-IN')}–{to.toLocaleString('en-IN')} of {total.toLocaleString('en-IN')} {noun}
      </p>
    </nav>
  );
};

export default Pagination;
