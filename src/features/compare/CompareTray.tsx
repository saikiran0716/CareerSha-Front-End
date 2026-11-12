import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { SAMPLE_COLLEGES } from '../../data/catalog/colleges';
import { compareService } from '../../services/compareService';
import { useCompare } from '../../hooks/useCompare';

const nameOf = (slug: string) => SAMPLE_COLLEGES.find((c) => c.slug === slug)?.shortName ?? slug;

/** Bottom bar listing the colleges picked for comparison (hidden on the compare page itself). */
const CompareTray: React.FC = () => {
  const list = useCompare();
  const { pathname } = useLocation();
  if (list.length === 0 || pathname === '/compare') return null;

  return (
    <aside
      aria-label="Colleges to compare"
      className="fixed inset-x-0 bottom-0 z-[900] border-t border-neutral-200 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(15,23,42,0.08)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 px-4 py-3 pr-24">
        <span className="text-sm text-neutral-700">Compare ({list.length}/4):</span>
        <ul className="flex flex-wrap gap-2">
          {list.map((slug) => (
            <li
              key={slug}
              className="flex items-center gap-1 rounded-full bg-primary-50 py-1 pl-3 pr-1 text-sm text-primary-800"
            >
              {nameOf(slug)}
              <button
                onClick={() => compareService.remove(slug)}
                aria-label={`Remove ${nameOf(slug)} from compare`}
                className="rounded-full p-1 hover:bg-primary-100"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => compareService.clear()}
            className="px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            Clear
          </button>
          <Link
            to="/compare"
            aria-disabled={list.length < 2}
            onClick={(e) => list.length < 2 && e.preventDefault()}
            className={`rounded-xl px-5 py-2 text-sm font-bold text-white ${
              list.length < 2 ? 'cursor-not-allowed bg-neutral-400' : 'bg-primary-800 hover:bg-primary-700'
            }`}
          >
            {list.length < 2 ? 'Add 1 more to compare' : 'Compare now'}
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default CompareTray;
