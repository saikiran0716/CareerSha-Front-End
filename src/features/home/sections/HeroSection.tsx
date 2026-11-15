import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, Search } from 'lucide-react';
import { trendingTopics } from '../../../data/home/homeContent';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const goToSearch = () => {
    const query = searchQuery.trim();
    navigate(query ? `/search?query=${encodeURIComponent(query)}` : '/search');
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
            Explore 50,000+ colleges, entrance and government exams, cutoffs, placements and previous papers, and get
            personalized AI-powered guidance to shape your future.
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

          {/* Trending: each topic opens its own page (exam guide, college list, predictor…) */}
          <nav aria-label="Trending" className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 font-extrabold text-orange-600 uppercase tracking-wider mr-1">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" /> Trending
            </span>
            {trendingTopics.map((topic) => (
              <Link
                key={topic.to}
                to={topic.to}
                className="shrink-0 rounded-full border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 py-1.5 font-bold text-neutral-700 dark:text-neutral-300 shadow-sm transition hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 dark:hover:text-primary-400 dark:hover:border-primary-500"
              >
                {topic.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Right Image */}
      <div className="relative w-full max-w-[360px] mx-auto flex items-center justify-center py-6">
        <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-visible">
          {/* Base student photo */}
          <img
            src="/assets/images/college-study-elite.png"
            alt="Students studying"
            className="w-full h-full object-cover rounded-[2rem] shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-white/80 dark:border-neutral-800"
          />
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-neutral-900/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
