import React from 'react';
import { Link } from 'react-router-dom';
import { GitCompare, MessageCircleQuestion, Target, type LucideIcon } from 'lucide-react';

const STEPS: { icon: LucideIcon; title: string; text: string; cta: string; url: string }[] = [
  {
    icon: Target,
    title: 'Predict your rank',
    text: 'Enter your expected score to estimate your rank in JEE, NEET, CAT, CLAT and 15+ other exams.',
    cta: 'Rank predictors',
    url: '/predictors',
  },
  {
    icon: GitCompare,
    title: 'Shortlist & compare',
    text: 'See colleges within reach of your rank, then compare fees, cutoffs and placements side by side.',
    cta: 'Compare colleges',
    url: '/compare',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Ask before you decide',
    text: 'Read student reviews, ask questions to the community or get answers from the AI counsellor.',
    cta: 'Student community',
    url: '/community',
  },
];

/** Three-step explanation of how to use CareerSha. */
const HowItWorks: React.FC = () => (
  <section aria-labelledby="how-it-works" className="rounded-[2rem] border border-neutral-100 bg-white p-6 shadow-sm">
    <h2 id="how-it-works" className="text-xl text-neutral-900">
      How CareerSha works
    </h2>
    <p className="text-sm text-neutral-500">From exam score to college decision in three steps.</p>
    <ol className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
      {STEPS.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.title} className="relative rounded-2xl bg-neutral-50/70 p-5">
            <span className="absolute right-4 top-4 text-3xl font-brand text-neutral-200" aria-hidden="true">
              {i + 1}
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800 text-white">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-3 text-base text-neutral-900">{s.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-600">{s.text}</p>
            <Link to={s.url} className="mt-3 inline-block text-sm text-primary-700 hover:underline">
              {s.cta} →
            </Link>
          </li>
        );
      })}
    </ol>
  </section>
);

export default HowItWorks;
