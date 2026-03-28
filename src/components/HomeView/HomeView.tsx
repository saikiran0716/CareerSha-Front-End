import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoursoalItem, coursoalData } from '../../assets/coursoal/data';
import { Search, Sparkles, TrendingUp, GraduationCap, Map as MapIcon, Award } from 'lucide-react';
import { PredictorTags } from '../HeroPredictors';
import { getHomepageCarouselItems } from '../../services/homeContentService';
// Extracted NewsNotifications component for better maintainability
import { NewsNotifications } from '../NewsSection';

interface HomeViewProps {
    onStartCounseling: () => void;
    onNavigate: (id: string) => void;
}

const SEARCH_SUGGESTIONS = [
    { id: "rank", title: "Rank Estimator", icon: TrendingUp, desc: "Predict your AIR globally" },
    { id: "predictor", title: "College Predictor", icon: GraduationCap, desc: "Find matching institutions" },
    { id: "library", title: "AI Roadmap", icon: MapIcon, desc: "Step-by-step career path" },
    { id: "results", title: "Exam Results", icon: Award, desc: "Analyze your test marks" }
];

const HomeView: React.FC<HomeViewProps> = ({ onStartCounseling, onNavigate }) => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<CoursoalItem[]>(coursoalData);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadCarousel = async () => {
            const items = await getHomepageCarouselItems();
            if (isMounted && items.length > 0) {
                setSlides(items);
            }
        };

        void loadCarousel();

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (currentSlide >= slides.length) {
            setCurrentSlide(0);
        }
    }, [currentSlide, slides.length]);

    useEffect(() => {
        if (slides.length <= 1) {
            return;
        }

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const executeSearch = (query: string) => {
        query = query.trim().toLowerCase();
        if (!query) return;

        let targetId = "";
        if (["rank", "estimator", "air", "predict rank", "rank predictor"].some(k => query.includes(k))) {
            targetId = "rank";
        } else if (["college", "predict college", "match", "finder"].some(k => query.includes(k))) {
            targetId = "predictor";
        } else if (["roadmap", "journey", "path", "step", "premium"].some(k => query.includes(k))) {
            targetId = "library";
        } else if (["exam", "result", "mark", "test"].some(k => query.includes(k))) {
            targetId = "results";
        }

        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                const headerOffset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
            setSearchQuery("");
            setIsSearchFocused(false);
        } else {
            alert(`No direct section found for "${query}". Try "rank", "college", "roadmap", or "exam".`);
        }
    };

    const handleSearch = () => executeSearch(searchQuery);

    const handleSuggestionClick = (query: string) => {
        executeSearch(query);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <div className="relative animate-fade font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
                            @media (max-width: 425px) {
                                .hero-section-mobile {
                                    padding-top: 9px !important;
                                    gap: 15px !important;
                                }
                                .hero-content-mobile {
                                    gap: 9px !important;
                                    space-y: 0 !important;
                                }
                                .hero-content-mobile > * + * {
                                    margin-top: 0 !important;
                                }
                                .carousel-container-mobile {
                                    height: 240px !important;
                                }
                                .carousel-card-mobile {
                                    border-radius: 1.25rem !important;
                                }
                                .carousel-content-mobile {
                                    padding: 0.75rem !important;
                                }
                                .carousel-spacing-mobile {
                                    margin-top: 0 !important;
                                    gap: 0.25rem !important;
                                }
                                .carousel-title-mobile {
                                    font-size: 0.9rem !important;
                                    line-height: 1.2 !important;
                                    text-wrap: balance !important;
                                }
                                .carousel-desc-mobile {
                                    -webkit-line-clamp: 2 !important;
                                    line-clamp: 2 !important;
                                    max-height: 2.6em !important;
                                    overflow: hidden !important;
                                    font-size: 0.65rem !important;
                                    line-height: 1.3 !important;
                                }
                                .carousel-btn-mobile {
                                    padding: 0.6rem 1rem !important;
                                    font-size: 10px !important;
                                }
                                .hero-title-responsive {
                                    font-size: 1.35rem !important;
                                }
                            }

                            @media (min-width: 341px) and (max-width: 425px) {
                                .hero-title-responsive {
                                    font-size: 1.65rem !important;
                                }
                            }

                            @media (max-width: 639px) {
                                .carousel-container-mobile {
                                    height: 300px !important;
                                }
                            }

                            @media (min-width: 1024px) and (max-width: 1279px) {
                                .hero-grid-1024 { 
                                    align-items: flex-end !important;
                                }
                                .hero-title-1024 { white-space: nowrap !important; }
                                .carousel-container-1024 { 
                                    height: 310px !important; 
                                    margin-bottom: 15px !important;
                                }
                                .carousel-content-1024 {
                                    padding: 1.25rem !important;
                                }
                                .carousel-title-1024 {
                                    font-size: 1.25rem !important;
                                    line-height: 1.75rem !important;
                                }
                                .carousel-spacing-1024 {
                                    margin-top: 0.25rem !important;
                                }
                                .carousel-button-1024 {
                                    padding: 0.625rem 1rem !important;
                                }
                            }
                        `}} />
            {/* Professional Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/40 dark:bg-indigo-900/10 rounded-full blur-[120px] -mr-96 -mt-96" />
                <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-purple-50/30 dark:bg-purple-900/10 rounded-full blur-[120px] -ml-80" />
                <div className="absolute bottom-0 right-[20%] w-[1000px] h-[1000px] bg-slate-50/50 dark:bg-slate-900/10 rounded-full blur-[150px]" />

                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}
                />
            </div>

            {/* Split Hero Section */}
            <section className="relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-center pt-2 px-3 sm:px-6 lg:px-8 mx-auto max-w-none hero-grid-1024 hero-section-mobile">
                {/* Left Side: Content & Search */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 animate-slide hero-content-mobile">
                    <h1 className="text-3xl sm:text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white tracking-tight leading-[1.2] hero-title-responsive">
                        <span className="hero-title-1024 font-semibold">Empowering Students with <br /> Smart Education & Career Tools</span>
                    </h1>

                    <div className="relative group w-full max-w-xl z-50">
                        <input
                            type="text"
                            placeholder="Search Colleges & more"
                            className="w-full bg-[#fcfcfc] dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-4 sm:py-4 pl-6 sm:pl-7 pr-12 sm:pr-14 text-sm sm:text-base font-medium outline-none focus:ring-4 focus:ring-slate-100/50 transition-all shadow-sm text-slate-600 placeholder:text-slate-400/80"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-rose-400/80">
                            <Search size={22} className="stroke-[2]" />
                        </div>

                        {/* Search Dropdown */}
                        {isSearchFocused && (
                            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50 animate-dropdown">
                                <div className="p-2">
                                    <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        Quick Tools
                                    </div>
                                    {SEARCH_SUGGESTIONS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <button
                                                key={item.id}
                                                onMouseDown={(e) => { e.preventDefault(); handleSuggestionClick(item.title); }}
                                                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-left transition-colors"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                                                    <Icon size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-bold text-slate-700 dark:text-slate-200">{item.title}</p>
                                                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{item.desc}</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                    {SEARCH_SUGGESTIONS.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                        <div className="px-4 py-6 text-center text-slate-500 text-sm font-medium">
                                            No matching tools found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Integrated Predictor Tags */}
                    <PredictorTags onNavigate={onNavigate} onStartCounseling={onStartCounseling} />

                    {/* Redundant button removed as per request */}
                </div>

                {/* Right Side: Featured Card Carousel */}
                <div className="relative aspect-video mt-0 lg:mt-6 w-full group animate-fade carousel-container-1024 carousel-container-mobile bg-slate-900/10 rounded-[2.5rem] overflow-hidden">
                    {slides.map((item, index) => (
                        <div
                            key={item.id}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out rounded-[2.5rem] overflow-hidden shadow-2xl carousel-card-mobile ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
                                }`}
                        >
                            <div className="absolute inset-0 bg-black/40 z-10" />
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-contain"
                            />

                            <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 carousel-content-1024 carousel-content-mobile">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        {item.subtitle && (
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-black text-white uppercase tracking-wider italic">{item.subtitle}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        {/* "Open in App" badge removed as per request */}
                                    </div>
                                </div>

                                <div className="space-y-4 carousel-spacing-1024 carousel-spacing-mobile">
                                    {item.title && (
                                        <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight carousel-title-1024 carousel-title-mobile">
                                            {item.title}
                                        </h3>
                                    )}
                                    {item.description && (
                                        <p className="text-xs text-white/80 font-medium max-w-sm line-clamp-2 carousel-desc-mobile">
                                            {item.description}
                                        </p>
                                    )}
                                    {item.buttonText && (
                                        <div className="flex items-center gap-4 pt-2">
                                            <button
                                                onClick={() => onNavigate(item.link)}
                                                className="inline-flex items-center gap-3 px-6 py-3.5 bg-white text-[#1a1a1a] rounded-xl text-[12px] font-black uppercase hover:bg-slate-100 transition-all shadow-xl active:scale-95 group/btn carousel-button-1024 carousel-btn-mobile"
                                            >
                                                {item.buttonText}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Progress Bar */}
                    <div className="absolute bottom-6 right-10 z-30 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News Section - Tightened spacing with clear gap below */}
            <div className="relative z-20 mx-auto mb-0 overflow-hidden">
                <NewsNotifications />
            </div>



            {/* SEO Content Block */}
            <div className="relative z-20 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center lg:text-left border-t border-slate-100 dark:border-slate-800/50">
                <div className="max-w-4xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">India’s Best Education Platform</h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                        Find colleges, exams, and career guidance tools in one place. 
                        Use our rank predictor, college matcher, and roadmap tools to plan your future.
                    </p>
                </div>
            </div>

            <style>
                {`
                @keyframes dropdown { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .animate-dropdown { animation: dropdown 0.2s ease-out forwards; }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade { animation: fadeIn 0.8s ease-out forwards; }
                .animate-slide { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>
        </div>
    );
};

export default HomeView;
