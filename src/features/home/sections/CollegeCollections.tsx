import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { collegeCollections } from '../../../data/home/homeContent';

const CollegeCollections: React.FC = () => {
  const navigate = useNavigate();
  const collectionsRef = useRef<HTMLDivElement>(null);

  const scrollCollections = (direction: 'left' | 'right') => {
    const container = collectionsRef.current;
    if (!container) return;
    const amount = Math.max(container.clientWidth * 0.8, 300);
    container.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white">Top College Collections</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Browse the most searched categories in one place.
          </p>
        </div>
        <button
          onClick={() => navigate('/search')}
          className="text-xs font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest hover:underline flex items-center gap-1"
        >
          View all <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Slider wrapper */}
      <div className="relative group">
        {/* Left trigger arrow */}
        <button
          onClick={() => scrollCollections('left')}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 transition-opacity"
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
              className="group/card relative min-w-[240px] max-w-[240px] aspect-[4/5] overflow-hidden rounded-2xl text-left shadow-sm border border-neutral-100 dark:border-neutral-800 transition hover:shadow-md hover:-translate-y-1"
            >
              <img
                src={collection.image}
                alt={collection.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
              />
              {/* Gradient overlay matching the visual card */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 space-y-2.5">
                <span className="inline-flex rounded-full bg-white/20 dark:bg-black/25 backdrop-blur px-2.5 py-1 text-xs font-black uppercase tracking-widest text-white">
                  {collection.tag}
                </span>
                <div>
                  <h3 className="text-sm font-black text-white leading-tight">{collection.title}</h3>
                  <p className="text-xs text-white/80 font-bold mt-0.5">{collection.count}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right trigger arrow */}
        <button
          onClick={() => scrollCollections('right')}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800 transition hover:scale-105 active:scale-95 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default CollegeCollections;
