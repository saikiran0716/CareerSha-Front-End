import React, { useState } from 'react';
import SEO from '../../components/common/SEO';
import { Search } from 'lucide-react';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="pt-8 min-h-[60vh]">
      <SEO
        title="Search Colleges, Exams & Courses in India"
        description="Search top colleges, entrance exams, and courses across India with smart filters and tools."
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">Search Colleges, Exams & Courses</h1>

        <div className="max-w-2xl mx-auto relative group">
          <input
            type="text"
            placeholder="Search for colleges, exams, or courses..."
            className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-full py-4 pl-6 pr-14 text-lg outline-none focus:ring-4 focus:ring-secondary-500/10 transition-all shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400">
            <Search size={24} />
          </div>
        </div>

        <div className="mt-12 text-center text-neutral-500">
          <p>Try searching for "IIT Delhi", "JEE MAINS", or "MBA Colleges"</p>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
