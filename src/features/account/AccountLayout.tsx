import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { ACCOUNT_LINKS } from './accountNav';
import SEO from '../../components/common/SEO';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ACCOUNT_REQUIRES_SIGN_IN } from '../../config/features';

interface AccountLayoutProps {
  title: string;
  description?: string;
  /** Optional buttons shown next to the title */
  actions?: React.ReactNode;
  children: React.ReactNode;
}

/** Shell for /account/* pages: side navigation + a sign-in gate. */
const AccountLayout: React.FC<AccountLayoutProps> = ({ title, description, actions, children }) => {
  const user = useCurrentUser();
  const allowed = Boolean(user) || !ACCOUNT_REQUIRES_SIGN_IN;

  return (
    <div className="min-h-[70vh] bg-neutral-50">
      <SEO title={title} robots="noindex, nofollow" />
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Account" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {ACCOUNT_LINKS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary-800 text-white'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-primary-300 hover:text-primary-700'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <section className="min-w-0">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl text-neutral-900">{title}</h1>
              {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
            </div>
            {allowed && actions}
          </div>

          {allowed ? (
            children
          ) : (
            <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                <LogIn className="h-5 w-5" />
              </div>
              <h2 className="text-lg text-neutral-900">Sign in to see this page</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Your reports, predictions and saved colleges are kept in your account.
              </p>
              <Link
                to="/login"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
              >
                Sign in
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

/** Friendly "nothing here yet" box used by the account pages. */
export const EmptyState: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
  cta?: { to: string; label: string };
}> = ({ icon, title, text, cta }) => (
  <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
      {icon}
    </div>
    <h2 className="text-lg text-neutral-900">{title}</h2>
    <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">{text}</p>
    {cta && (
      <Link
        to={cta.to}
        className="mt-5 inline-flex items-center rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
      >
        {cta.label}
      </Link>
    )}
  </div>
);

export default AccountLayout;
