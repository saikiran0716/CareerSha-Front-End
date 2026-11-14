import { useEffect, useRef, useState } from 'react';

interface Page<T> {
  items: T[];
  count: number;
}

/**
 * Loads one page of a list and reloads when `deps` change (page number, filters, search). The
 * previous page stays on screen while the next one loads; responses for an older request are ignored.
 *
 *   const list = usePagedList((p) => api(p).then((r) => ({ items: r.results, count: r.count })), page, [key]);
 */
export const usePagedList = <T, F = unknown>(
  loadPage: (page: number) => Promise<Page<T> & { first?: F }>,
  page: number,
  deps: unknown[],
) => {
  const loadRef = useRef(loadPage);
  loadRef.current = loadPage;
  const generation = useRef(0);
  const [items, setItems] = useState<T[]>([]);
  const [first, setFirst] = useState<F | undefined>(undefined);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const current = ++generation.current;
    setLoading(true);
    setError(null);
    loadRef
      .current(page)
      .then((result) => {
        if (current !== generation.current) return;
        setItems(result.items);
        setCount(result.count);
        setFirst(result.first);
      })
      .catch((e) => current === generation.current && setError(e))
      .finally(() => current === generation.current && setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...deps]);

  return { items, first, count, loading, error };
};
