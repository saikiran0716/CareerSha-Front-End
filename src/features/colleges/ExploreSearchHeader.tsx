import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Copy, Search } from 'lucide-react';
import { Stream } from '../../data/catalog/types';

interface ExploreSearchHeaderProps {
  search: string;
  onSearch: (value: string) => void;
  onPickStream: (stream: Stream) => void;
  compareCount: number;
}

const POPULAR: { label: string; stream: Stream }[] = [
  { label: 'Engineering Colleges', stream: 'Engineering' },
  { label: 'MBA Colleges', stream: 'Management' },
  { label: 'Medical Colleges', stream: 'Medical' },
  { label: 'Law Colleges', stream: 'Law' },
  { label: 'Design Colleges', stream: 'Design' },
];

const ExploreSearchHeader: React.FC<ExploreSearchHeaderProps> = ({ search, onSearch, onPickStream, compareCount }) => {
  const [text, setText] = useState(search);
  useEffect(() => setText(search), [search]);

  return (
    <div className="mb-8 w-full">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-neutral-500">
        <Link to="/" className="hover:text-primary-600">
          Home
        </Link>
        <ChevronRight size={14} />
        <span className="text-neutral-800">Explore Colleges</span>
      </nav>

      <div className="mb-6">
        <h1 className="mb-2 text-3xl md:text-4xl text-neutral-900">Explore Colleges</h1>
        <p className="text-sm md:text-base text-neutral-600">
          Compare fees, cutoffs, placements and student reviews to find the right college for you.
        </p>
      </div>

      <div className="mb-6 flex flex-col items-center gap-4 md:flex-row">
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(text.trim());
          }}
          className="relative flex w-full flex-1 items-center rounded-xl border border-neutral-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary-600/20"
        >
          <Search size={18} className="ml-4 text-neutral-500" aria-hidden="true" />
          <input
            type="search"
            aria-label="Search colleges"
            placeholder="Search by college name, city, state or stream…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-transparent px-3 py-3 text-sm text-neutral-900 focus:outline-none"
          />
          <button
            type="submit"
            className="mr-1.5 rounded-lg bg-primary-800 px-6 py-2 text-sm text-white hover:bg-primary-700"
          >
            Search
          </button>
        </form>
        <Link
          to="/compare"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm text-neutral-700 shadow-sm hover:bg-neutral-50 md:w-auto"
        >
          <Copy size={16} /> Compare ({compareCount})
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <span className="mr-1 text-xs text-neutral-700">Popular:</span>
        {POPULAR.map(({ label, stream }) => (
          <button
            key={label}
            onClick={() => onPickStream(stream)}
            className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 hover:border-primary-300 hover:text-primary-700"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExploreSearchHeader;
