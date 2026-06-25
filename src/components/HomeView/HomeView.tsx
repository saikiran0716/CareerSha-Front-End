import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BadgeCheck,
  Building2,
  Calculator,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  IndianRupee,
  Landmark,
  LayoutGrid,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  MapPin,
  MessageSquare,
  TrendingUp,
  Send,
  HelpCircle,
  Briefcase
} from 'lucide-react';

interface HomeViewProps {
  onStartCounseling: () => void;
  onNavigate: (id: string) => void;
}

type QuickTool = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  bgClass: string;
  iconClass: string;
  highlight?: boolean;
};

type UpdateItem = {
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
};

const trendingTopics = ['JEE Main', 'NEET', 'CUET', 'BTech', 'MBA', 'UPSC'];

const quickTools: QuickTool[] = [
  {
    title: 'College Predictor',
    description: 'Predict your admission based on rank',
    icon: GraduationCap,
    href: '/college-matcher',
    bgClass: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
    iconClass: 'text-blue-600 dark:text-blue-400',
    highlight: true,
  },
  {
    title: 'Compare Colleges',
    description: 'Compare fees, placements, cutoffs & more',
    icon: Building2,
    href: '/college-matcher',
    bgClass: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400',
    iconClass: 'text-purple-600 dark:text-purple-400',
  },
  {
    title: 'Cutoff Analyzer',
    description: 'Check previous year cutoffs',
    icon: BarChart3,
    href: '/results',
    bgClass: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
    iconClass: 'text-amber-600 dark:text-amber-400',
  },
  {
    title: 'Rank Converter',
    description: 'Convert ranks across exams',
    icon: Target,
    href: '/rank-estimator',
    bgClass: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    highlight: true,
  },
  {
    title: 'College Finder',
    description: 'Find colleges by location & filters',
    icon: MapPin,
    href: '/search',
    bgClass: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
    iconClass: 'text-rose-600 dark:text-rose-400',
  },
  {
    title: 'Fee & ROI Calculator',
    description: 'Calculate fees, ROI & future salary',
    icon: Calculator,
    href: '/college-matcher',
    bgClass: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
    iconClass: 'text-orange-600 dark:text-orange-400',
    highlight: true,
  },
];

const liveUpdates: UpdateItem[] = [
  {
    title: 'JEE Main 2024 Results Out',
    description: 'Check your percentile',
    time: '2m ago',
    icon: ShieldCheck,
    tone: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400',
  },
  {
    title: 'NEET UG Counselling Started',
    description: 'Round 1 registration open',
    time: '15m ago',
    icon: BadgeCheck,
    tone: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400',
  },
  {
    title: 'CUET 2024 Admissions',
    description: 'Registrations open now',
    time: '1h ago',
    icon: Landmark,
    tone: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-400',
  },
  {
    title: 'UPSC Exam Notification',
    description: 'Apply before last date',
    time: '3h ago',
    icon: Sparkles,
    tone: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-400',
  },
];

const communityThreads = [
  { author: 'Aman Kumar', title: 'Is CSE in Tier-2 college worth it in 2024?', replies: 23, time: '2h ago', avatar: 'AK', avatarBg: 'bg-indigo-600 text-white' },
  { author: 'Neha Singh', title: 'Best colleges for biotechnology in India?', replies: 18, time: '4h ago', avatar: 'NS', avatarBg: 'bg-pink-600 text-white' },
  { author: 'Rohit Verma', title: 'Which branch has the best future?', replies: 31, time: '6h ago', avatar: 'RV', avatarBg: 'bg-amber-600 text-white' },
];

const jobOpenings = [
  {
    role: 'Junior Software Developer',
    company: 'TCS Digital',
    location: 'Bangalore / Remote',
    type: 'Full-time',
    color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
  },
  {
    role: 'Business Analyst',
    company: 'Deloitte',
    location: 'Mumbai',
    type: 'Entry Level',
    color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800'
  },
  {
    role: 'Clinical Data Trainee',
    company: 'Sun Pharma',
    location: 'Pune',
    type: 'Internship',
    color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
  }
];

const personalizedMatches = [
  { name: 'IIT Bombay', course: 'Computer Science', match: 'Match 80%' },
  { name: 'NIT Trichy', course: 'Mechanical Engineering', match: 'Match 80%' },
  { name: 'DTU Delhi', course: 'Computer Engineering', match: 'Match 76%' },
  { name: 'BITS Pilani', course: 'Electronics', match: 'Match 72%' },
];

const collegeCollections = [
  {
    title: 'Top Engineering Colleges',
    tag: 'Engineering',
    count: '500+ Colleges',
    route: '/engineering',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    color: 'from-blue-600/90 to-blue-900/90',
  },
  {
    title: 'Best Medical Colleges',
    tag: 'Medical',
    count: '200+ Colleges',
    route: '/medical',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    color: 'from-red-600/90 to-red-900/90',
  },
  {
    title: 'Top MBA Colleges',
    tag: 'MBA',
    count: '150+ Colleges',
    route: '/mba',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80',
    color: 'from-emerald-600/90 to-emerald-900/90',
  },
  {
    title: 'Colleges Under ₹5 Lakhs',
    tag: 'Budget',
    count: '300+ Colleges',
    route: '/search',
    image: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=800&q=80',
    color: 'from-amber-600/90 to-amber-900/90',
  },
  {
    title: 'Top Government Colleges',
    tag: 'Govt',
    count: '250+ Colleges',
    route: '/search',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    color: 'from-purple-600/90 to-purple-900/90',
  },
];

const HomeView: React.FC<HomeViewProps> = ({ onStartCounseling, onNavigate }) => {
  const navigate = useNavigate();
  const collectionsRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [communityTab, setCommunityTab] = useState<'trending' | 'recent' | 'unanswered'>('trending');

  const goToSearch = () => {
    const query = searchQuery.trim();
    navigate(query ? `/search?query=${encodeURIComponent(query)}` : '/search');
  };

  const handleTrendingClick = (topic: string) => {
    navigate(`/search?query=${encodeURIComponent(topic)}`);
  };

  const scrollCollections = (direction: 'left' | 'right') => {
    const container = collectionsRef.current;
    if (!container) return;
    const amount = Math.max(container.clientWidth * 0.8, 300);
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const submitAssistantPrompt = () => {
    const prompt = assistantPrompt.trim();
    if (prompt) {
      onNavigate('library');
    } else {
      onStartCounseling();
    }
    setAssistantPrompt('');
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafd] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background soft glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[5%] left-[10%] w-[35%] h-[35%] bg-[#06122c]/10 dark:bg-[#06122c]/20 rounded-full blur-[120px] animate-pulse-soft" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#0a192f]/10 dark:bg-[#0a192f]/20 rounded-full blur-[100px]" />
      </div>

      <main className="mx-auto max-w-[1440px] px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_352px] gap-12 items-start">

          {/* LEFT COLUMN: Hero, Quick Tools, Collections, Stats */}
          <div className="space-y-8 min-w-0">

            {/* HERO SECTION */}
            <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center pt-2 sm:pt-4">
              {/* Hero Left Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.18] tracking-tight text-slate-900 dark:text-white">
                    Your Complete Career <br className="hidden sm:inline" />

                    {/* TODO: remove the roadmap content */}
                    Roadmap for <span className="text-blue-600 dark:text-blue-400">Indian Education</span>
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                    Explore 50K+ colleges, 200+ entrance exams, cutoffs, placements, and get personalized AI-powered guidance to shape your future.
                  </p>
                </div>

                {/* Hero Search Bar */}
                <div className="max-w-xl">
                  <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-full px-4 py-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] border border-slate-100 dark:border-slate-800 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
                    <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          goToSearch();
                        }
                      }}
                      placeholder="Search colleges, exams, courses (e.g. IIT, NEET, MBA)..."
                      className="mx-3 w-full bg-transparent text-sm text-slate-800 dark:text-slate-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium"
                    />
                    <button
                      onClick={goToSearch}
                      className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition duration-200 hover:scale-105 active:scale-95"
                      aria-label="Search"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Trending tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Trending:</span>
                    {trendingTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTrendingClick(topic)}
                        className="rounded-full border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 font-bold text-slate-700 dark:text-slate-300 shadow-sm transition hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hero Right Image Collage */}
              <div className="relative w-full max-w-[360px] mx-auto flex items-center justify-center py-6">
                <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-visible">
                  {/* Base student photo */}
                  <img
                    src="/assets/images/college-study-elite.png"
                    alt="Students studying"
                    className="w-full h-full object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-white/80 dark:border-slate-800"
                  />
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-slate-900/10 via-transparent to-transparent pointer-events-none" />

                  {/* Overlay 1: AI Recommendation */}
                  <div className="absolute -top-4 -left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-100/50 dark:border-slate-800/50 flex items-center gap-3 animate-float transition-all hover:scale-[1.02]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                      <Sparkles className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400 leading-none mb-1">AI Recommendation</p>
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-none">Find best colleges for you</p>
                    </div>
                  </div>

                  {/* Overlay 2: Admission Chance */}
                  <div className="absolute top-1/4 -right-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100/50 dark:border-slate-800/50 text-center transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-1.5 justify-center mb-1">
                      <Star className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 fill-current" />
                      <p className="text-[9px] font-black uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">Predict Admission Chance</p>
                    </div>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">87%</span>
                      <span className="text-emerald-500 text-xs font-black">&uarr;</span>
                    </div>
                  </div>

                  {/* Overlay 3: Cutoff Predictor */}
                  <div className="absolute -bottom-4 left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100/50 dark:border-slate-800/50 flex items-center gap-3 transition-all hover:scale-[1.02]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                      <Target className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-900 dark:text-white leading-none mb-1">Cutoff Predictor</p>
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 leading-none">Check previous year cutoffs</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK TOOLS GRID PANEL */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-sm border border-slate-100/80 dark:border-slate-800/60">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                {quickTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button
                      key={tool.title}
                      onClick={() => navigate(tool.href)}
                      className={`group flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 border relative ${tool.highlight
                        ? 'bg-blue-50/30 dark:bg-blue-950/10 border-blue-200/80 dark:border-blue-800/50 shadow-[0_4px_12px_rgba(59,130,246,0.04)] hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-[0_12px_24px_-8px_rgba(59,130,246,0.15)] hover:-translate-y-1'
                        : 'bg-slate-50/30 dark:bg-slate-900/30 border-slate-100/70 dark:border-slate-800/40 hover:bg-white dark:hover:bg-slate-800/60 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1'
                        }`}
                    >
                      {tool.highlight && (
                        <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-blue-600 text-white shadow-sm ring-1 ring-blue-500/20">
                          Popular
                        </span>
                      )}
                      <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${tool.bgClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight mb-1">{tool.title}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-snug">{tool.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* TOP COLLEGE COLLECTIONS CAROUSEL */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">Top College Collections</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Browse the most searched categories in one place.</p>
                </div>
                <button
                  onClick={() => navigate('/search')}
                  className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  View all <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Slider wrapper */}
              <div className="relative group">
                {/* Left trigger arrow */}
                <button
                  onClick={() => scrollCollections('left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <div
                  ref={collectionsRef}
                  className="flex gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {collegeCollections.map((collection) => (
                    <button
                      key={collection.title}
                      onClick={() => navigate(collection.route)}
                      className="group/card relative min-w-[240px] max-w-[240px] aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-sm border border-slate-100 dark:border-slate-800 transition hover:shadow-md hover:-translate-y-1"
                    >
                      <img
                        src={collection.image}
                        alt={collection.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                      />
                      {/* Gradient overlay matching the visual card */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-4 space-y-2.5">
                        <span className="inline-flex rounded-full bg-white/20 dark:bg-black/25 backdrop-blur px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                          {collection.tag}
                        </span>
                        <div>
                          <h3 className="text-sm font-black text-white leading-tight">{collection.title}</h3>
                          <p className="text-[11px] text-white/80 font-bold mt-0.5">{collection.count}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Right trigger arrow */}
                <button
                  onClick={() => scrollCollections('right')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </section>

            {/* STATS SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">

              {/* Exams Covered Card (Lavender/Purple) */}
              <div className="relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br from-indigo-50/80 to-white dark:from-indigo-950/15 dark:to-slate-900 border border-indigo-100/30 dark:border-slate-800 flex justify-between items-center shadow-sm">
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Exams Covered</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">200+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">National & State Exams</p>
                </div>
                {/* SVG Illustration of Graduation Cap on Book */}
                <svg className="w-16 h-16 opacity-85 text-indigo-500 dark:text-indigo-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6 17H58V50H6V17Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
                  <path d="M6 50A2.5 2.5 0 0 0 8.5 52.5H54" />
                  <path d="M32 10 L52 18 L32 26 L12 18 Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M20 23 V34 C20 38 32 40 32 40 C32 40 44 38 44 34 V23" />
                  <path d="M48 21.5 V35" />
                  <circle cx="48" cy="35" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Colleges Listed Card (Green) */}
              <div className="relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br from-emerald-50/80 to-white dark:from-emerald-950/15 dark:to-slate-900 border border-emerald-100/30 dark:border-slate-800 flex justify-between items-center shadow-sm">
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-wider text-emerald-500 dark:text-emerald-400">Colleges Listed</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">50,000+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Colleges Across India</p>
                </div>
                {/* SVG Illustration of School Building */}
                <svg className="w-16 h-16 opacity-85 text-emerald-500 dark:text-emerald-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M32 6 L6 20 V56 H58 V20 Z" fill="currentColor" fillOpacity="0.05" />
                  <path d="M6 20 L32 30 L58 20" />
                  <path d="M26 44 H38 V56 H26 Z" fill="currentColor" fillOpacity="0.1" />
                  <circle cx="32" cy="15" r="3" fill="currentColor" />
                  <line x1="16" y1="32" x2="20" y2="32" />
                  <line x1="16" y1="40" x2="20" y2="40" />
                  <line x1="44" y1="32" x2="48" y2="32" />
                  <line x1="44" y1="40" x2="48" y2="40" />
                </svg>
              </div>

              {/* Students Trust Us Card (Orange) */}
              <div className="relative overflow-hidden rounded-[2rem] p-6 bg-gradient-to-br from-amber-50/80 to-white dark:from-amber-950/15 dark:to-slate-900 border border-amber-100/30 dark:border-slate-800 flex justify-between items-center shadow-sm">
                <div className="space-y-1">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-500 dark:text-amber-400">Students Trust Us</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">10 Lakh+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Happy Students</p>
                </div>
                {/* SVG Illustration of Students */}
                <svg className="w-16 h-16 opacity-85 text-amber-500 dark:text-amber-400" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 28 C23.5 28 28 23.5 28 18 C28 12.5 23.5 8 18 8 C12.5 8 8 12.5 8 18 C8 23.5 12.5 28 18 28 Z" fill="currentColor" fillOpacity="0.05" />
                  <path d="M18 32 C10 32 4 38 4 46 V52 H32 V46 C32 38 26 32 18 32 Z" fill="currentColor" fillOpacity="0.1" />
                  <path d="M46 28 C51.5 28 56 23.5 56 18 C56 12.5 51.5 8 46 8 C40.5 8 36 12.5 36 18 C36 23.5 40.5 28 46 28 Z" fill="currentColor" fillOpacity="0.05" />
                  <path d="M46 32 C38 32 32 38 32 46 V52 H60 V46 C60 38 54 32 46 32 Z" fill="currentColor" fillOpacity="0.1" />
                </svg>
              </div>

            </section>

            {/* JOB OPENINGS */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm border border-slate-100/80 dark:border-slate-800/60 mt-4 premium-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-blue-500" />
                    Latest Job & Internship Openings
                  </h2>
                </div>
                <button
                  onClick={() => navigate('/jobs')}
                  className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center gap-1"
                >
                  View all <ArrowRight className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {jobOpenings.map((job, idx) => (
                  <div
                    key={idx}
                    className={`group flex flex-col p-3 rounded-2xl border bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-300 hover:shadow-sm hover:-translate-y-0.5 ${job.color}`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-white/60 dark:bg-slate-950/60 shadow-sm border border-inherit">
                        {job.type}
                      </span>
                    </div>

                    <div className="mb-2">
                      <p className="text-[13px] font-black leading-tight mb-0.5 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.role}</p>
                      <p className="text-[9px] font-extrabold uppercase tracking-widest opacity-80">{job.company}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-bold opacity-80">
                        <MapPin className="h-3 w-3" />
                        <span>{job.location}</span>
                      </div>
                      <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-800 border border-inherit flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar Cards (Sticky) */}
          <aside className="space-y-6">

            {/* LIVE UPDATES */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-sm border border-slate-100/80 dark:border-slate-800/60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Live Updates</h2>
                <button
                  onClick={() => navigate('/news')}
                  className="text-[11px] font-black text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-widest"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {liveUpdates.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3.5 p-3 rounded-2xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition duration-200"
                    >
                      <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${item.tone} shadow-sm`}>
                        <Icon className="h-5 w-5" />
                        <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-tight">{item.title}</p>
                          <span className="whitespace-nowrap text-[9px] font-bold text-slate-400 shrink-0">{item.time}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-snug mt-0.5">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* AI CAREER ASSISTANT */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-sm border border-slate-100/80 dark:border-slate-800/60">
              <div className="space-y-1 mb-4">
                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-blue-600 dark:text-blue-400">AI Career Assistant</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-tight">Ask anything about colleges, exams, courses & careers.</p>
              </div>

              <div className="relative flex items-center bg-slate-50 dark:bg-slate-950 rounded-full px-3 py-1.5 border border-slate-100 dark:border-slate-800">
                <Search className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500 shrink-0 ml-1" />
                <input
                  type="text"
                  value={assistantPrompt}
                  onChange={(e) => setAssistantPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      submitAssistantPrompt();
                    }
                  }}
                  placeholder="Ask me anything..."
                  className="mx-2 w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 font-medium"
                />
                <button
                  onClick={submitAssistantPrompt}
                  className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition"
                  aria-label="Send query"
                >
                  <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </section>

            {/* STUDENT COMMUNITY */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-sm border border-slate-100/80 dark:border-slate-800/60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Student Community</h2>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-[11px] font-black text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-widest"
                >
                  View all
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4 text-[10px] font-black uppercase tracking-wider">
                {(['trending', 'recent', 'unanswered'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCommunityTab(tab)}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all ${communityTab === tab
                      ? 'bg-[#e0e9ff] dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Thread list */}
              <div className="space-y-3">
                {communityThreads.map((thread, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100/60 dark:border-slate-800/60 shadow-sm"
                  >
                    <div
                      className={`h-8.5 w-8.5 shrink-0 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${thread.avatarBg}`}
                    >
                      {thread.avatar}
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 leading-snug line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                        {thread.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-extrabold uppercase">
                        <span className="text-blue-600 dark:text-blue-400 font-black">{thread.author}</span>
                        <span>•</span>
                        <span>{thread.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 shrink-0 self-center">
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>{thread.replies}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onStartCounseling}
                className="mt-4 w-full rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase py-3.5 shadow-[0_8px_25px_rgba(37,99,235,0.2)] tracking-wider transition hover:scale-[1.01] active:scale-[0.99]"
              >
                Ask a Doubt
              </button>
            </section>

            {/* PERSONALIZED FOR YOU */}
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 shadow-sm border border-slate-100/80 dark:border-slate-800/60">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Personalized For You</h2>
                <button
                  onClick={() => navigate('/college-matcher')}
                  className="text-[11px] font-black text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-widest"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {personalizedMatches.map((match, idx) => {
                  const isRed = match.name === 'DTU Delhi';
                  const isTrichy = match.name === 'NIT Trichy';
                  const badgeColorClass = isRed
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/30'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/30';
                  const badgeDotColorClass = isRed ? 'bg-rose-500' : 'bg-emerald-500';

                  const iconColorClass = isRed
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100/30 dark:border-rose-900/30'
                    : isTrichy
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100/30 dark:border-indigo-900/30'
                      : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100/30 dark:border-blue-900/30';

                  return (
                    <div
                      key={idx}
                      className="group flex items-center gap-3.5 p-3.5 rounded-2xl border border-slate-100/60 dark:border-slate-800/50 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-blue-100 dark:hover:border-blue-900/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      <div className={`flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl border ${iconColorClass} group-hover:scale-105 transition-transform duration-300`}>
                        <Landmark className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-black text-slate-800 dark:text-slate-200 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{match.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-none mt-1.5">{match.course}</p>
                      </div>
                      <span className={`shrink-0 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider border shadow-sm ${badgeColorClass}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${badgeDotColorClass} animate-pulse`} />
                        {match.match}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

          </aside>
        </div>
      </main>
    </div>
  );
};

export default HomeView;
