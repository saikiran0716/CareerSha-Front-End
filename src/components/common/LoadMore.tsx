import React, { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  shown: number;
  total: number;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  /** e.g. "colleges" */
  noun?: string;
}

/**
 * Under a list: loads the next page automatically when it scrolls into view (with a spinner),
 * and offers a "Load more" button for keyboards, screen readers and browsers without auto-loading.
 */
const LoadMore: React.FC<Props> = ({ shown, total, hasMore, loading, onLoadMore, noun = 'colleges' }) => {
  const sentinel = useRef<HTMLDivElement>(null);
  const callback = useRef(onLoadMore);
  callback.current = onLoadMore;

  useEffect(() => {
    const node = sentinel.current;
    if (!node || !hasMore || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => entries[0]?.isIntersecting && callback.current(), {
      rootMargin: '400px 0px',
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, shown]);

  if (total === 0) return null;
  return (
    <div ref={sentinel} className="flex flex-col items-center gap-2 py-6" aria-live="polite">
      {loading ? (
        <p className="flex items-center gap-2 text-sm text-neutral-600">
          <Loader2 className="h-5 w-5 animate-spin text-primary-700" aria-hidden="true" /> Loading more {noun}…
        </p>
      ) : hasMore ? (
        <button
          type="button"
          onClick={onLoadMore}
          className="rounded-xl border border-neutral-300 bg-white px-6 py-2.5 text-sm text-neutral-800 hover:border-primary-300 hover:text-primary-800"
        >
          Load more {noun}
        </button>
      ) : null}
      <p className="text-xs text-neutral-500">
        {hasMore
          ? `Showing ${shown.toLocaleString('en-IN')} of ${total.toLocaleString('en-IN')} ${noun}`
          : total > shown || shown <= 10
            ? null
            : `You have seen all ${total.toLocaleString('en-IN')} ${noun}`}
      </p>
    </div>
  );
};

export default LoadMore;
