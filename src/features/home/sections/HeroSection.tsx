import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, Star, Target } from 'lucide-react';
import { trendingTopics } from '../../../data/home/homeContent';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const goToSearch = () => {
    const query = searchQuery.trim();
    navigate(query ? `/search?query=${encodeURIComponent(query)}` : '/search');
  };

  const handleTrendingClick = (topic: string) => {
    navigate(`/search?query=${encodeURIComponent(topic)}`);
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-center pt-2 sm:pt-4">
      {/* Hero Left Info */}
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.18] tracking-tight text-neutral-900 dark:text-white">
            Find the <span className="text-primary-600 dark:text-primary-400">Right College</span>{' '}
            <br className="hidden sm:inline" />
            for Your Rank
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm max-w-xl leading-relaxed">
            Explore 50K+ colleges, 200+ entrance exams, cutoffs, placements, and get personalized AI-powered guidance to
            shape your future.
          </p>
        </div>

        {/* Hero Search Bar */}
        <div className="max-w-xl">
          <div className="relative flex items-center bg-white dark:bg-neutral-900 rounded-full px-4 py-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] border border-neutral-100 dark:border-neutral-800 transition-all focus-within:ring-2 focus-within:ring-primary-500/20">
            <Search className="h-5 w-5 text-neutral-500 dark:text-neutral-500 shrink-0" />
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
              placeholder="Search colleges, exams, courses"
              className="mx-3 w-full bg-transparent text-sm text-neutral-800 dark:text-neutral-200 outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-500 font-medium"
            />
            <button
              onClick={goToSearch}
              className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-primary-800 text-white shadow-md hover:bg-primary-700 transition duration-200 hover:scale-105 active:scale-95"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>

          {/* Trending tags */}
          <div className="mt-4 flex flex-nowrap items-center gap-2 text-xs overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="font-extrabold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mr-1">
              Trending:
            </span>
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTrendingClick(topic)}
                className="shrink-0 rounded-full border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-1.5 font-bold text-neutral-700 dark:text-neutral-300 shadow-sm transition hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 dark:hover:border-primary-500"
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
            className="w-full h-full object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-white/80 dark:border-neutral-800"
          />
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-neutral-900/10 via-transparent to-transparent pointer-events-none" />

          {/* Overlay 1: AI Recommendation */}
          <div className="absolute -top-4 -left-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-neutral-100/50 dark:border-neutral-800/50 flex items-center gap-3 animate-float transition-all hover:scale-[1.02]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-primary-600 dark:text-primary-400 leading-none mb-1">
                AI Recommendation
              </p>
              <p className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 leading-none">
                Find best colleges for you
              </p>
            </div>
          </div>

          {/* Overlay 2: Admission Chance */}
          <div className="absolute top-1/4 -right-8 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-neutral-100/50 dark:border-neutral-800/50 text-center transition-all hover:scale-[1.02]">
            <div className="flex items-center gap-1.5 justify-center mb-1">
              <Star className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400 fill-current" />
              <p className="text-[9px] font-black uppercase tracking-[0.1em] text-neutral-500 dark:text-neutral-400">
                Admission Chance
              </p>
              <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9px] font-bold uppercase text-neutral-500">
                Example
              </span>
            </div>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl font-black text-neutral-900 dark:text-white leading-none">87%</span>
              <span className="text-success-500 text-xs font-black">&uarr;</span>
            </div>
          </div>

          {/* Overlay 3: Cutoff Predictor */}
          <div className="absolute -bottom-4 left-6 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-neutral-100/50 dark:border-neutral-800/50 flex items-center gap-3 transition-all hover:scale-[1.02]">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary-50 dark:bg-secondary-950/40 text-secondary-600 dark:text-secondary-400">
              <Target className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.15em] text-neutral-900 dark:text-white leading-none mb-1">
                Cutoff Predictor
              </p>
              <p className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 leading-none">
                Check previous year cutoffs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
