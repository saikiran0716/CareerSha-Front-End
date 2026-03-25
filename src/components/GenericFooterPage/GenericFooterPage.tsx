import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageData, PageItem } from '../../data/types.ts';
import { getFooterPageContent, getCollegeReviews, getCollegeSuggestions } from '../../services/geminiService';
import BookLoader from '../BookLoader/BookLoader';
import SEO from '../SEO/SEO';

interface GenericFooterPageProps {
    data: PageData;
    onBack: () => void;
    onAskAI?: (query: string) => void;
    pageId: string; // To track if we need to refetch
}

// Helper Component for Logos
const LogoWithFallback = ({ title, image, link }: { title: string, image?: string, link?: string }) => {
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [useGoogle, setUseGoogle] = useState(false);

    useEffect(() => {
        setError(false);
        setUseGoogle(false);

        // 1. Explicit Image from Data
        if (image && image.length > 10) {
            setImgSrc(image);
            return;
        }

        // 2. Derive from Link
        if (link) {
            try {
                let domain = link.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
                if (domain) {
                    // Try Clearbit first
                    setImgSrc(`https://logo.clearbit.com/${domain}`);
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            }
        } else {
            setError(true);
        }
    }, [image, link]);

    const handleError = () => {
        if (!useGoogle && link) {
            // Fallback 1: Try Google Favicon if Clearbit failed
            setUseGoogle(true);
            try {
                const domain = link.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
                setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);
            } catch {
                setError(true);
            }
        } else {
            // Fallback 2: Show Generic Icon
            setError(true);
            setImgSrc(null);
        }
    };

    if (error || !imgSrc) {
        // Aesthetic Fallback: Initial with Color Gradient
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border border-slate-100 dark:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-1 text-indigo-600 dark:text-indigo-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center px-1 line-clamp-1">
                    {title.substring(0, 3)}
                </span>
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-contain p-2 mix-blend-multiply dark:mix-blend-normal transition-opacity duration-500"
            onError={handleError}
            loading="lazy"
        />
    );
};

const GenericFooterPage: React.FC<GenericFooterPageProps> = ({ data: initialData, onBack, onAskAI, pageId }) => {
    const navigate = useNavigate();

    const toSlug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

    const getExamFromTitle = (title: string): string => {
        const lower = (title || '').toLowerCase();
        if (lower.includes('jee main')) return 'JEE Main';
        if (lower.includes('jee advanced')) return 'JEE Advanced';
        if (lower.includes('neet')) return 'NEET';
        if (lower.includes('cat')) return 'CAT';
        if (lower.includes('gate')) return 'GATE';
        if (lower.includes('ts eamcet') || lower.includes('eamcet')) return 'TS EAMCET';
        if (lower.includes('kcet')) return 'KCET';
        return '';
    };

    const getToolRedirectUrl = (item: PageItem): string => {
        const normalizedPageId = (pageId || '').toLowerCase();
        const exam = getExamFromTitle(item.title);
        const examParam = exam ? `&exam=${toSlug(exam)}` : '';

        if (normalizedPageId.includes('tool-predictor') || normalizedPageId.includes('tools-predictor') || (item.title || '').toLowerCase().includes('predictor')) {
            return `/?tool=predictor${examParam}`;
        }
        if (normalizedPageId.includes('tool-rank') || normalizedPageId.includes('tools-rank') || (item.title || '').toLowerCase().includes('rank estimator')) {
            return `/?tool=rank${examParam}`;
        }
        return '';
    };

    // Build a unique sessionStorage key per page
    const cacheKey = `gfp_cache_${pageId}`;

    // Helper: read cache
    const readCache = (): { data: PageData; visibleCount: number; noMoreData: boolean } | null => {
        try {
            const raw = sessionStorage.getItem(cacheKey);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    };

    // Helper: write cache
    const writeCache = (data: PageData, visibleCount: number, noMoreData: boolean) => {
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({ data, visibleCount, noMoreData }));
        } catch { /* quota exceeded – ignore */ }
    };

    const cached = readCache();
    const [data, setData] = useState<PageData>(cached?.data ?? initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // State for Review Search
    const [reviewSearch, setReviewSearch] = useState('');
    const [searchingReview, setSearchingReview] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const isTyping = useRef(false); // Track if update is from user typing

    // Click Outside Handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced API Call for Autocomplete
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (reviewSearch.length > 2 && !showSuggestions && isTyping.current) {
                // Only search if user typed > 2 chars, dropdown isn't open (or needs update), AND it's a typed update
                try {
                    const results = await getCollegeSuggestions(reviewSearch);
                    setSuggestions(results);
                    setShowSuggestions(true);
                } catch (e) {
                    console.error("Failed to fetch suggestions", e);
                }
            } else if (reviewSearch.length <= 2) {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 500); // 500ms debounce
        return () => clearTimeout(timeoutId);
    }, [reviewSearch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        isTyping.current = true;
        setReviewSearch(e.target.value);
        if (e.target.value.length <= 2) setShowSuggestions(false);
    };

    const selectSuggestion = (college: string) => {
        isTyping.current = false; // Programmatic update
        setReviewSearch(college);
        setShowSuggestions(false);
        handleReviewSearch(college);
    };

    const [loadingStage, setLoadingStage] = useState(0); // 0: Idle, 1: Scanning, 2: Reading, 3: Compiling

    // Loading Messages for Interactive Feel
    const LOADING_STEPS = [
        "Scanning recent student discussions...",
        "analyzing placement reports...",
        "Identifying specific campus spots...",
        "Compiling final verdict..."
    ];

    const handleReviewSearch = async (term: string = reviewSearch) => {
        if (!term.trim()) return;
        setSearchingReview(true);
        setShowSuggestions(false);
        setHasSearched(true);
        setData(prev => ({ ...prev, items: [] })); // Clear previous results immediately

        // Simulate loading steps for user engagement
        setLoadingStage(0);
        const interval = setInterval(() => {
            setLoadingStage(prev => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
        }, 800);

        try {
            const result = await getCollegeReviews(term);
            setData(result);
        } catch (e) {
            console.error("Failed to search reviews", e);
        } finally {
            clearInterval(interval);
            setSearchingReview(false);
            setLoadingStage(0);
        }
    };


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
        const isStaticPage = pageId.startsWith('legal-') || pageId.startsWith('company-') || pageId.startsWith('site-');
        const shouldFetch = !isStaticPage; 

        if (shouldFetch) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const dynamicData = await getFooterPageContent(initialData.title, initialData.type, [], 6);
                    setData(prev => {
                        const isErrorResponse = dynamicData.description?.toLowerCase().includes("unavailable") || dynamicData.description?.toLowerCase().includes("api configuration");
                        const useDynamicItems = dynamicData.items && dynamicData.items.length > 0 && !isErrorResponse;
                        
                        const merged = {
                            ...prev,
                            ...dynamicData,
                            items: useDynamicItems
                                ? (dynamicData.items?.map((item) => {
                                    const match = prev.items?.find(p =>
                                        p.title.toLowerCase() === item.title.toLowerCase() ||
                                        p.title.toLowerCase().includes(item.title.toLowerCase()) ||
                                        item.title.toLowerCase().includes(p.title.toLowerCase())
                                    );
                                    return {
                                        ...item,
                                        image: item.image || match?.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
                                        link: match?.link || item.link
                                    };
                                }) || prev.items)
                                : []
                        };
                        // Save to cache immediately after successful fetch
                        if (!isErrorResponse) {
                            writeCache(merged, PAGE_SIZE, false);
                        }
                        return merged;
                    });
                } catch (e) {
                    console.error("Failed to fetch footer content", e);
                    setError(true);
                    setData(prev => ({ ...prev, items: [] })); // Remove fallback items on error
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageId]);
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const PAGE_SIZE = 6;
    const [visibleCount, setVisibleCount] = useState(readCache()?.visibleCount ?? PAGE_SIZE);
    const [loadingMore, setLoadingMore] = useState(false);
    const [noMoreData, setNoMoreData] = useState(readCache()?.noMoreData ?? false);
    const [loadMoreMsg, setLoadMoreMsg] = useState('');

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
            const currentTitles = data.items.map(i => i.title);
            const newData = await getFooterPageContent(data.title, data.type, currentTitles, PAGE_SIZE);

            if (newData.items && newData.items.length > 0) {
                setData(prev => {
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

    const toggleFaq = (idx: number) => {
        setActiveFaq(activeFaq === idx ? null : idx);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
            <SEO title={data.title} description={data.description} />
            {/* Navigation / Header Area */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm/50 backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 h-14 flex items-center justify-center relative">
                    {/* Back Button - Absolute Left */}
                    <button
                        onClick={onBack}
                        className="absolute left-4 sm:left-6 lg:left-8 flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition-colors text-[10px] font-bold uppercase tracking-widest group bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:border-indigo-200"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        <span className="hidden sm:inline">Back</span>
                    </button>

                    {/* Centered Title */}
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none text-center max-w-[60%] truncate">
                        {data.title}
                    </h1>
                </div>
            </div>

            <main className={`max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 ${data.type === 'review' ? 'pt-2 pb-4' : 'pt-4 pb-8'} relative z-0`}>

                {/* Hero / description + search */}
                <div className={`max-w-4xl mx-auto text-center ${data.type === 'review' ? 'mb-2' : 'mb-4'} animate-fade relative z-[9999]`}>

                    <p className={`text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto ${data.type === 'review' ? 'hidden' : 'block'}`}>
                        {data.description}
                    </p>

                    {/* Review Search Bar */}
                    {data.type === 'review' && (
                        <div ref={searchRef} className="mt-4 max-w-lg mx-auto relative group z-50">
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:bg-indigo-500/30 transition-all duration-300"></div>
                            <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-visible flex items-center p-1 z-[60]">
                                <div className="pl-4 text-slate-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search any college (e.g., SRCC Delhi)..."
                                    className="flex-grow px-4 py-3 bg-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 font-medium z-[60]"
                                    value={reviewSearch}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => e.key === 'Enter' && handleReviewSearch(reviewSearch)}
                                    onFocus={() => reviewSearch.length > 1 && setShowSuggestions(true)}
                                />
                                <button
                                    onClick={() => handleReviewSearch(reviewSearch)}
                                    disabled={searchingReview}
                                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-500/30 whitespace-nowrap z-[60]"
                                >
                                    {searchingReview ? 'Analyzing...' : 'Get Reviews'}
                                </button>

                                {/* Suggestions Dropdown */}
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-[100] animate-slide-up origin-top max-h-60 overflow-y-auto custom-scrollbar">
                                        {suggestions.map((college, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => selectSuggestion(college)}
                                                className="w-full text-left px-5 py-3 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 font-medium text-sm transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0 flex items-center gap-3"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                                                {college}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider — only for non-review pages */}
                {data.type !== 'review' && (
                    <div className="relative flex py-1 items-center mb-3">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        <span className="flex-shrink-0 mx-4 text-slate-400 uppercase text-[10px] font-bold tracking-[0.2em] opacity-70">Top Recommendations</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20 animate-fade">


                        <BookLoader size="lg" text="Gathering Intelligence..." />
                        <p className="text-xs text-slate-400 mt-1">Found 10 Top Colleges so far</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="flex flex-col items-center justify-center py-10 animate-fade text-red-500">
                        <p className="font-bold">Failed to load data. Please try refreshing.</p>
                        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Retry</button>
                    </div>
                )}

                {/* College/Items Grid - THE CORE LIST (Hidden initially for reviews) */}
                {!loading && (data.type === 'review' ? (
                    /* SPECIALIZED REVIEW UI - COMPACT */
                    /* Only show grid if search has been performed */
                    hasSearched ? (
                        searchingReview ? (
                            /* SMART LOADER UI - BOOK VERSION */
                            <div className="flex flex-col items-center justify-center py-20 animate-fade">
                                <BookLoader size="md" />
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 animate-pulse">
                                    {LOADING_STEPS[loadingStage]}
                                </h3>
                                <p className="text-slate-500 text-sm">Consulting the archives for {reviewSearch}...</p>
                            </div>
                        ) : (
                            /* RESULTS GRID - Lower Z-Index to stay behind dropdown */
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 relative z-0 animate-slide-up">
                                {data.items.slice(0, 6).map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-bl-[3rem] transition-colors group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40"></div>

                                        {/* User Info */}
                                        <div className="flex items-center gap-3 mb-3 relative z-10">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                                                {item.subtitle ? item.subtitle.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{item.subtitle || 'Verified Student'}</h4>
                                                <div className="flex text-yellow-400 text-[10px]">
                                                    {[...Array(5)].map((_, i) => (
                                                        <svg key={i} className={`w-3 h-3 ${i < (item.stats?.[0]?.value ? parseInt(item.stats[0].value) : 4) ? 'fill-current' : 'text-slate-300 dark:text-slate-700'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                    ))}
                                                </div>
                                            </div>
                                        </div >

                                        {/* Review Content */}
                                        < div className="relative z-10" >
                                            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 line-clamp-1">{item.title}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-4 line-clamp-4">
                                                "{item.content}"
                                            </p>

                                            {/* Parameter Ratings (if available in stats) */}
                                            {
                                                item.stats && item.stats.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                                        {item.stats.map((stat, i) => (
                                                            <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                                {stat.label}: <span className="text-indigo-600 dark:text-indigo-400">{stat.value}</span>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )
                                            }
                                        </div >
                                    </div >
                                ))}
                            </div >
                        )
                    ) : (
                        /* Empty State Prompt */
                        <div className="flex flex-col items-center justify-center py-20 animate-fade">
                            <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Search to see reviews</h3>
                            <p className="text-sm text-slate-500 text-center max-w-sm">Enter a college name above to uncover real student feedback, placements, and campus truths.</p>
                        </div>
                    )
                ) : (
                    /* STANDARD COLLEGE/EXAM CARD UI */
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                            {data.items.slice(0, visibleCount).map((item, idx) => (
                                item.link === '#chat' ? (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onAskAI && onAskAI(`I am interested in ${item.title}. Can you help me with this?`);
                                        }}
                                        className="group flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-indigo-400 hover:shadow-sm transition-all w-full text-left"
                                    >
                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-indigo-50 dark:bg-slate-800 flex items-center justify-center border border-indigo-100 dark:border-slate-700">
                                            <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600 text-sm leading-tight truncate">{item.title}</p>
                                            <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.subtitle || 'Ask AI'}</p>
                                        </div>
                                        <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-2 py-1 rounded shrink-0">Chat</span>
                                    </button>
                                ) : (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            const lowerTitle = (item.title || '').toLowerCase();
                                            const isExam = lowerTitle.includes('gate') || lowerTitle.includes('cat ') || lowerTitle === 'cat' || lowerTitle.includes('jee') || lowerTitle.includes('neet') || lowerTitle.includes('xat') || lowerTitle.includes('clat') || lowerTitle.includes('mat') || lowerTitle.includes('nift');
                                            
                                            if (isExam) {
                                                let target = 'cat';
                                                if (lowerTitle.includes('gate')) target = 'gate';
                                                else if (lowerTitle.includes('jee')) target = 'jee-main';
                                                else if (lowerTitle.includes('neet')) target = 'neet';
                                                else if (lowerTitle.includes('xat')) target = 'xat';
                                                else if (lowerTitle.includes('clat')) target = 'clat';
                                                else if (lowerTitle.includes('mat')) target = 'mat';
                                                else if (lowerTitle.includes('nift')) target = 'nift';
                                                
                                                navigate(`/exams/${target}`);
                                                return;
                                            }

                                            const toolUrl = getToolRedirectUrl(item);
                                            if (toolUrl) {
                                                navigate(toolUrl);
                                                return;
                                            }
                                            navigate(`/college/${encodeURIComponent(item.title)}`, { state: { college: item } });
                                        }}
                                        className="group flex items-start gap-3 px-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-400 hover:shadow-md transition-all w-full text-left cursor-pointer overflow-hidden"
                                    >
                                        {/* Logo */}
                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-slate-200 overflow-hidden flex items-center justify-center p-1 shadow-sm mt-0.5">
                                            <LogoWithFallback title={item.title} image={item.image} link={item.link} />
                                        </div>

                                        {/* All content stacked vertically */}
                                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                                            <h3 className="font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 text-[14px] leading-tight truncate transition-colors">
                                                {item.title}
                                            </h3>
                                            {item.subtitle && (
                                                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                                                    {item.subtitle}
                                                </p>
                                            )}
                                            {item.tags && item.tags.length > 0 && (
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {item.tags.slice(0, 2).map((tag, tIdx) => (
                                                        <span key={tIdx} className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 leading-tight">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            {item.stats && item.stats.length > 0 && (
                                                <div className="flex gap-1.5 mt-1 flex-wrap">
                                                    {item.stats.slice(0, 2).map((stat, i) => {
                                                        const isGreen = stat.value.includes('LPA') || stat.value.includes(' L') || stat.value.startsWith('₹');
                                                        return (
                                                            <span
                                                                key={i}
                                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-md max-w-full break-words leading-snug ${isGreen ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800' : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
                                                            >
                                                                {isGreen ? <span className="mr-0.5">₹</span> : ''}{stat.value.replace('₹', '')}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                )
                            ))}
                        </div>

                        {/* LOAD MORE */}
                        <div className="flex flex-col items-center gap-2 mb-8">
                            {loadMoreMsg && (
                                <p className="text-xs text-slate-400 font-medium">{loadMoreMsg}</p>
                            )}
                            {!noMoreData && (
                                <button
                                    onClick={handleLoadMore}
                                    disabled={loadingMore}
                                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-all border ${loadingMore ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : 'bg-white border-slate-300 text-slate-600 hover:border-indigo-400 hover:text-indigo-600'}`}
                                >
                                    {loadingMore ? 'Loading...' : 'Load More'}
                                </button>
                            )}
                        </div>
                    </>
                ))}



                {/* FAQ Section */}
                {data.faqs && data.faqs.length > 0 && (
                    <div className="max-w-4xl mx-auto mb-8">
                        <h2 className="text-base font-black text-slate-800 dark:text-white mb-4 uppercase tracking-wide">Frequently Asked Questions</h2>
                        <div className="space-y-2">
                            {data.faqs.map((faq, idx) => (
                                <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                                    <button
                                        onClick={() => toggleFaq(idx)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <span className="font-semibold text-slate-800 dark:text-white text-sm pr-6">{faq.question}</span>
                                        <span className={`transform transition-transform duration-200 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}>
                                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </span>
                                    </button>
                                    {activeFaq === idx && (
                                        <div className="px-5 pb-4 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main >
        </div >
    );
};

export default GenericFooterPage;
