import React, { useRef, useEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getLatestNewsItems, NewsItem } from '../../services/homeContentService';

const NEWS_DATA = [
    {
        id: 1,
        title: "JEE Main 2026 Session 1 Results Out; Paper 2 Answer Key Challenge Ends Today",
        date: "February 21, 2026, 09:15 AM IST",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=200",
        link: "https://jeemain.nta.nic.in",
        isLive: true,
        category: "ENTRANCE"
    }
];

const NewsNotifications: React.FC = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const [newsItems, setNewsItems] = useState<NewsItem[]>(NEWS_DATA);
    const [isPaused, setIsPaused] = useState(false);
    const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const loadNews = async () => {
            const data = await getLatestNewsItems();
            if (data.length > 0) {
                setNewsItems(data);
            }
        };
        void loadNews();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.offsetWidth;
            const targetScroll = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

            // Check for loop
            const isAtEnd = scrollContainerRef.current.scrollLeft + scrollContainerRef.current.offsetWidth >= scrollContainerRef.current.scrollWidth - 10;

            if (direction === 'right' && isAtEnd) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            }
        }
    };

    useEffect(() => {
        if (!isPaused) {
            scrollIntervalRef.current = setInterval(() => {
                scroll('right');
            }, 5000);
        }
        return () => {
            if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        };
    }, [isPaused]);

    return (
        <section className="bg-transparent dark:bg-transparent py-2 select-none news-section-mobile">
            <style dangerouslySetInnerHTML={{ __html: `
                @media (max-width: 639px) {
                    .news-section-mobile .news-container-mobile {
                        padding: 0.5rem !important;
                        border-radius: 1rem !important;
                    }
                    .news-section-mobile .news-header-mobile {
                        margin-bottom: 0.5rem !important;
                        display: flex !important;
                        flex-wrap: nowrap !important;
                        align-items: center !important;
                        gap: 0.75rem !important;
                        width: 100% !important;
                    }
                    .news-section-mobile .news-header-mobile > div:first-child {
                        min-w-0 !important;
                        flex-shrink: 1 !important;
                        flex-grow: 1 !important;
                    }
                    .news-section-mobile .news-title-mobile {
                        font-size: 13px !important;
                        font-weight: 600 !important;
                        white-space: nowrap !important;
                        overflow: hidden !important;
                        text-overflow: ellipsis !important;
                    }
                    .news-section-mobile .news-item-mobile {
                        width: 100% !important;
                        margin-right: 0 !important;
                        gap: 0.75rem !important;
                        padding: 0.25rem !important;
                    }
                    .news-section-mobile .news-image-mobile {
                        width: 60px !important;
                        height: 60px !important;
                    }
                    .news-section-mobile .news-item-category {
                        font-size: 8px !important;
                    }
                    .news-section-mobile .news-item-title {
                        font-size: 11px !important;
                        line-height: 1.2 !important;
                        -webkit-line-clamp: 2 !important;
                    }
                    .news-section-mobile .news-item-date {
                        font-size: 8px !important;
                    }
                    .news-section-mobile .news-view-all {
                        font-size: 9px !important;
                        white-space: nowrap !important;
                        flex-shrink: 0 !important;
                    }
                    .news-section-mobile .news-pill-mobile {
                        display: none !important;
                    }
                }
            `}} />
            <div className="max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
                <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-[1.25rem] px-4 py-2 md:px-5 md:py-3 shadow-[0_4px_25px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-slate-800/80 news-container-mobile">
                    <div className="flex justify-between items-center mb-3 px-1 news-header-mobile">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-6 bg-rose-600 rounded-full shadow-[0_0_10px_rgba(225,29,72,0.3)] news-pill-mobile" />
                            <h2 className="text-[17px] md:text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight news-title-mobile">
                                Latest News and Notifications
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate('/blog')}
                            className="text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:text-indigo-700 transition-colors group news-view-all"
                        >
                            View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="relative group/carousel px-1">
                        {/* Premium Navigation Arrows */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all opacity-0 group-hover/carousel:opacity-100 hidden lg:flex items-center justify-center hover:scale-110 active:scale-90 border-r-0"
                        >
                            <ChevronLeft size={22} className="stroke-[2.5]" />
                        </button>

                        <div
                            ref={scrollContainerRef}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            className="flex gap-4 overflow-x-auto pb-0 scrollbar-hide snap-x w-full pointer-events-auto"
                        >
                            {newsItems.map((news, index) => (
                                <div key={news.id} className="flex-shrink-0 flex items-center snap-start w-[90%] sm:w-[48%] lg:w-[32.2%] xl:w-[24.2%] news-item-mobile">
                                    <a
                                        href={news.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-start gap-4 p-2 rounded-2xl w-full group cursor-pointer hover:bg-slate-50/80 dark:hover:bg-white/5 transition-all duration-300"
                                    >
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md ring-1 ring-slate-100 dark:ring-slate-800 news-image-mobile">
                                            <img
                                                src={news.image}
                                                alt={news.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {news.isLive && (
                                                <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-rose-600 text-[8px] font-black text-white uppercase flex items-center gap-1 shadow-lg border border-white/20">
                                                    <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                                                    Live
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1.5 flex-1 min-w-0 py-0.5">
                                            <span className="text-[9px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-wider news-item-category">
                                                {news.category}
                                            </span>
                                            <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 leading-[1.3] line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors news-item-title">
                                                {news.title}
                                            </h4>
                                            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-0.5 news-item-date">
                                                {news.date}
                                            </p>
                                        </div>
                                    </a>
                                    {index !== newsItems.length - 1 && (
                                        <div className="h-12 w-[1px] bg-slate-100 dark:bg-slate-800 ml-4 hidden lg:block flex-shrink-0 opacity-60" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => scroll('right')}
                            className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all opacity-0 group-hover/carousel:opacity-100 flex items-center justify-center hover:scale-110 active:scale-90"
                        >
                            <ChevronRight size={22} className="stroke-[2.5]" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsNotifications;
