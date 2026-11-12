import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark } from 'lucide-react';
import { GOVT_EXAM_CATEGORIES, govtExamsUrl } from '../../../data/exams/govtExams';

/** Sidebar card: government exam sectors with their exam counts. */
const GovtExamsCard: React.FC = () => (
  <section className="rounded-[2rem] border border-neutral-100/80 bg-white p-5 shadow-sm">
    <div className="mb-3 flex items-center justify-between">
      <h2 className="flex items-center gap-2 text-base text-neutral-900">
        <Landmark className="h-4 w-4 text-primary-700" /> Government Exams
      </h2>
      <Link to={govtExamsUrl()} className="text-xs uppercase tracking-widest text-primary-700 hover:underline">
        View all
      </Link>
    </div>
    <ul className="grid grid-cols-2 gap-2">
      {GOVT_EXAM_CATEGORIES.map((c) => (
        <li key={c.slug}>
          <Link
            to={govtExamsUrl(c.slug)}
            className="flex items-center justify-between rounded-xl border border-neutral-100 bg-neutral-50/60 px-3 py-2 text-sm text-neutral-700 hover:border-primary-200 hover:text-primary-800"
          >
            {c.title}
            <span className="text-xs text-neutral-400">{c.exams.length}</span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default GovtExamsCard;
