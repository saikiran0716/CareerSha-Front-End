import { useEffect, useState } from 'react';
import { PageData } from '../../../data/types';
import { getFooterPageContent } from '../../../services/aiService';

const PAGE_SIZE = 6;

/** Loads AI-generated page content (cached per page in sessionStorage) and pages through it. */
export const useFooterPageData = (initialData: PageData, pageId: string) => {
  // Build a unique sessionStorage key per page
  const cacheKey = `gfp_cache_${pageId}`;

  // Helper: read cache
  const readCache = (): { data: PageData; visibleCount: number; noMoreData: boolean } | null => {
    try {
      const raw = sessionStorage.getItem(cacheKey);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  // Helper: write cache
  const writeCache = (data: PageData, visibleCount: number, noMoreData: boolean) => {
    try {
      sessionStorage.setItem(cacheKey, JSON.stringify({ data, visibleCount, noMoreData }));
    } catch {
      /* quota exceeded – ignore */
    }
  };

  const cached = readCache();
  const [data, setData] = useState<PageData>(cached?.data ?? initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(cached?.visibleCount ?? PAGE_SIZE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [noMoreData, setNoMoreData] = useState(cached?.noMoreData ?? false);
  const [loadMoreMsg, setLoadMoreMsg] = useState('');

  useEffect(() => {
    // If we have a valid cache for this pageId, restore it and skip fetch
    const cached = readCache();
    if (cached && cached.data && cached.data.items && cached.data.items.length > 0) {
      setData(cached.data);
      setVisibleCount(cached.visibleCount);
      setNoMoreData(cached.noMoreData);
    } else {
      // Reset to initial data state on id change only if no cache exists
      setData(initialData);
    }

    setLoading(false);
    setError(false);

    // If content is missing or items are placeholders, fetch real data
    const isStaticPage =
      pageId.startsWith('legal-') ||
      pageId.startsWith('company-') ||
      pageId.startsWith('site-') ||
      pageId === 'tools-hub';
    const shouldFetch = !isStaticPage;

    if (shouldFetch) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const dynamicData = await getFooterPageContent(initialData.title, initialData.type, [], 6);
          setData((prev) => {
            const isErrorResponse =
              dynamicData.description?.toLowerCase().includes('unavailable') ||
              dynamicData.description?.toLowerCase().includes('api configuration');
            const useDynamicItems = dynamicData.items && dynamicData.items.length > 0 && !isErrorResponse;

            const merged = {
              ...prev,
              ...dynamicData,
              items: useDynamicItems
                ? dynamicData.items?.map((item) => {
                    const match = prev.items?.find(
                      (p) =>
                        p.title.toLowerCase() === item.title.toLowerCase() ||
                        p.title.toLowerCase().includes(item.title.toLowerCase()) ||
                        item.title.toLowerCase().includes(p.title.toLowerCase()),
                    );
                    return {
                      ...item,
                      image:
                        item.image ||
                        match?.image ||
                        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
                      link: match?.link || item.link,
                    };
                  }) || prev.items
                : [],
            };
            // Save to cache immediately after successful fetch
            if (!isErrorResponse) {
              writeCache(merged, PAGE_SIZE, false);
            }
            return merged;
          });
        } catch (e) {
          console.error('Failed to fetch footer content', e);
          // Keep the built-in sample items; only show the error when there is nothing to show.
          setError(!initialData.items?.length);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId]);

  const handleLoadMore = async () => {
    if (loadingMore || noMoreData) return;
    setLoadingMore(true);
    setLoadMoreMsg('');

    const nextVisible = visibleCount + PAGE_SIZE;

    // If we still have cached items to reveal, just show them
    if (nextVisible <= data.items.length) {
      setVisibleCount(nextVisible);
      writeCache(data, nextVisible, noMoreData);
      setLoadingMore(false);
      return;
    }

    // Otherwise, fetch a new batch of 6 from the API
    try {
      const currentTitles = data.items.map((i) => i.title);
      const newData = await getFooterPageContent(data.title, data.type, currentTitles, PAGE_SIZE);

      if (newData.items && newData.items.length > 0) {
        setData((prev) => {
          const updated = { ...prev, items: [...prev.items, ...newData.items] };
          writeCache(updated, nextVisible, false);
          return updated;
        });
        setVisibleCount(nextVisible);
        setNoMoreData(false);
      } else {
        setLoadMoreMsg('No more results to load.');
        setNoMoreData(true);
        writeCache(data, visibleCount, true);
      }
    } catch (e) {
      console.error('Failed to load more items', e);
      setLoadMoreMsg('Could not load more. Please try again.');
    } finally {
      setLoadingMore(false);
    }
  };

  return { data, setData, loading, error, visibleCount, loadingMore, noMoreData, loadMoreMsg, handleLoadMore };
};

export type FooterPageData = ReturnType<typeof useFooterPageData>;
