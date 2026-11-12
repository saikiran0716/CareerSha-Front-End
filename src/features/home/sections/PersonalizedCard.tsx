import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MoveRight } from 'lucide-react';

/** Invites the student to get real matches from the College Matcher (no sample match scores). */
const PersonalizedCard: React.FC = () => (
  <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
    <h2 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Personalized For You</h2>
    <div className="rounded-2xl bg-primary-50 p-5 text-center">
      <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary-600 shadow-sm">
        <Sparkles className="h-5 w-5" />
      </div>
      <p className="text-sm text-neutral-700 leading-relaxed">
        Enter your rank and preferences to see colleges that match your profile.
      </p>
      <Link
        to="/college-matcher"
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-800 px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-700 transition-colors"
      >
        Find my matches <MoveRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default PersonalizedCard;
