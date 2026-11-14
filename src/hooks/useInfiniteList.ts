import { useCallback, useEffect, useRef, useState } from 'react';

interface Page<T> {
  items: T[];
  count: number;
}

/**
 * Loads page 1 of a list, then appends further pages on `loadMore()`. Starts over when `deps` change
 * (new filters / search). Responses for an older set of filters are ignored.
 *
 *   const list = useInfiniteList((page) => api(page).then((r) => ({ items: r.results, count: r.count, first: r })), [key]);
 */
export const useInfiniteList = <T, F = unknown>(
  loadPage: (page: number) => Promise<Page<T> & { first?: F }>,
  deps: unknown[],
) => {
  const loadRef = useRef(loadPage);
  loadRef.current = loadPage;
  const generation = useRef(0);
  const [items, setItems] = useState<T[]>([]);
  const [first, setFirst] = useState<F | undefined>(undefined);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const current = ++generation.current;
    setLoading(true);
    setError(null);
    loadRef
      .current(1)
      .then((result) => {
        if (current !== generation.current) return;
        setItems(result.items);
        setCount(result.count);
        setFirst(result.first);
        setPage(1);
      })
      .catch((e) => current === generation.current && setError(e))
      .finally(() => current === generation.current && setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const hasMore = !loading && items.length < count;

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    const current = generation.current;
    const next = page + 1;
    setLoadingMore(true);
    loadRef
      .current(next)
      .then((result) => {
        if (current !== generation.current) return;
        setItems((prev) => [...prev, ...result.items]);
        setCount(result.count);
        setPage(next);
      })
      .catch((e) => current === generation.current && setError(e))
      .finally(() => current === generation.current && setLoadingMore(false));
  }, [hasMore, loadingMore, page]);

  return { items, first, count, loading, loadingMore, hasMore, error, loadMore };
};
