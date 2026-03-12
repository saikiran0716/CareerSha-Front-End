import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NEWS_DATA = [
    {
        id: 1,
        title: "JEE Main 2026 Session 1 Results Out; Paper 2 Answer Key Challenge Ends Today",
        date: "February 21, 2026, 09:15 AM IST",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=200",
        link: "https://jeemain.nta.nic.in",
        isLive: true,
        category: "ENTRANCE"
    },
    {
        id: 2,
        title: "CBSE Class 10 English Board Exam 2026 Held Successfully; Check Paper Analysis",
        date: "February 21, 2026, 08:30 AM IST",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=200",
        link: "https://cbse.gov.in",
        isLive: false,
        category: "BOARD EXAM"
    },
    {
        id: 3,
        title: "NEET UG 2026 Registration LIVE: Apply by March 8 for May Entrance Examination",
        date: "February 21, 2026, 08:05 AM IST",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200",
        link: "https://neet.nta.nic.in",
        isLive: true,
        category: "ADMISSION"
    },
    {
        id: 4,
        title: "NEET PG 2026 Counseling: Stray Vacancy Seat Allotment Results Expected Today",
        date: "February 21, 2026, 07:45 AM IST",
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=200",
        link: "https://mcc.nic.in",
        isLive: true,
        category: "RESULT"
    },
    {
        id: 5,
        title: "MHT CET 2026 Application Extended: Apply Without Late Fee Till February 24",
        date: "February 21, 2026, 07:20 AM IST",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=200",
        link: "https://cetcell.mahacet.org",
        isLive: false,
        category: "EXAM UPDATE"
    },
    {
        id: 6,
        title: "UPSC Civil Services Prelims 2026 Registration Ends Feb 24; 1056 Seats Open",
        date: "February 21, 2026, 07:00 AM IST",
        image: "https://images.unsplash.com/photo-1574301925340-966952402170?auto=format&fit=crop&q=80&w=200",
        link: "https://upsc.gov.in",
        isLive: false,
        category: "GOVERNMENT"
    },
    {
        id: 7,
        title: "NABARD Development Assistant Exam 2026 Held Today Across Various Centers",
        date: "February 21, 2026, 10:00 AM IST",
        image: "https://images.unsplash.com/photo-1454165833767-027ffb244106?auto=format&fit=crop&q=80&w=200",
        link: "https://nabard.org",
        isLive: true,
        category: "EXAM NEWS"
    },
    {
        id: 8,
        title: "MAH MCA CET 2026 Registration Window Extended; Exam Scheduled for March 30",
        date: "February 21, 2026, 09:45 AM IST",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=200",
        link: "https://cetcell.mahacet.org",
        isLive: false,
        category: "ENTRANCE"
    }
];

// Expanded data for the grid
const EXTENDED_NEWS = [...NEWS_DATA, ...NEWS_DATA];

const NewsView: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full min-h-screen bg-[#f8faff] dark:bg-slate-950 animate-fade">
            {/* Professional Header */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-bold hover:text-slate-900 dark:hover:text-white transition-colors group"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>
                </div>
            </header>

            <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-4 pb-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-950/30 rounded-full text-rose-600 dark:text-rose-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <span className="w-2 h-2 bg-rose-600 rounded-full animate-pulse" />
                            Live Updates
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
                            Latest News & <span className="text-indigo-600">Notifications</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
                            Real-time information about exams, results, and admissions for 2026.
                        </p>
                    </div>

                    <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
                        {['All News'].map((tab, i) => (
                            <button
                                key={tab}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {EXTENDED_NEWS.map((news, idx) => (
                        <a
                            key={`${news.id}-${idx}`}
                            href={news.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-4 p-4 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-none transition-all duration-300 group cursor-pointer"
                        >
                            <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {news.isLive && (
                                    <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-lg bg-rose-600 text-[8px] font-black text-white uppercase flex items-center gap-1 shadow-lg border border-white/20">
                                        <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                                        Live
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1 min-w-0 py-0.5">
                                <span className="text-[9px] font-black text-rose-500 dark:text-rose-400 uppercase tracking-[0.15em]">
                                    {news.category}
                                </span>
                                <h4 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 leading-[1.35] line-clamp-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {news.title}
                                </h4>
                                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-auto uppercase tracking-wider">
                                    {news.date}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default NewsView;
