import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';

/** "Sign in to …" — shown instead of a posting form to signed-out visitors (returns them here afterwards). */
const SignInPrompt: React.FC<{ action: string; compact?: boolean }> = ({ action, compact }) => {
  const { pathname, search } = useLocation();
  const link = (
    <Link
      to="/login"
      state={{ from: `${pathname}${search}` }}
      className={
        compact
          ? 'inline-flex items-center gap-1 text-sm text-primary-700 hover:underline'
          : 'inline-flex items-center gap-1.5 rounded-xl bg-primary-800 px-4 py-2 text-sm font-bold text-white hover:bg-primary-700'
      }
    >
      <LogIn size={14} /> Sign in to {action}
    </Link>
  );
  if (compact) return link;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-neutral-300 bg-white p-4">
      <p className="text-sm text-neutral-600">
        Reviews and answers come from signed-in students, so others can trust them.
      </p>
      {link}
    </div>
  );
};

export default SignInPrompt;
