import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs an async loader and tracks its result. Re-runs when `deps` change; `reload()` re-runs on demand.
 *
 *   const { data, loading } = useAsync(() => catalogService.getCollege(slug), [slug]);
 */
export const useAsync = <T>(loader: () => Promise<T>, deps: unknown[]) => {
  const loaderRef = useRef(loader);
  loaderRef.current = loader;
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loaderRef
      .current()
      .then((value) => {
        if (active) {
          setData(value);
          setError(null);
        }
      })
      .catch((e) => active && setError(e))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  const reload = useCallback(() => setTick((t) => t + 1), []);
  return { data, loading, error, reload };
};
