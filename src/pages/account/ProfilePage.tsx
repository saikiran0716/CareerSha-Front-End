import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import AccountLayout from '../../features/account/AccountLayout';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { AccountProfile, userData } from '../../services/userDataService';
import { BudgetRange, CollegeType, Qualification } from '../../types';

const CATEGORIES = ['General', 'EWS', 'OBC', 'SC', 'ST', 'PwD'];

const inputClass =
  'w-full h-11 rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-900 outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/15';

const Field: React.FC<{ label: string; htmlFor: string; children: React.ReactNode; hint?: string }> = ({
  label,
  htmlFor,
  children,
  hint,
}) => (
  <div className="space-y-1.5">
    <label htmlFor={htmlFor} className="text-sm text-neutral-700">
      {label}
    </label>
    {children}
    {hint && <p className="text-xs text-neutral-500">{hint}</p>}
  </div>
);

const ProfilePage: React.FC = () => {
  const user = useCurrentUser();
  const [form, setForm] = useState<AccountProfile>(() => userData.getProfile());
  const [saved, setSaved] = useState(false);

  // Reload when the signed-in user changes
  useEffect(() => setForm(userData.getProfile()), [user?.id]);

  const set = <K extends keyof AccountProfile>(key: K, value: AccountProfile[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    userData.saveProfile(form);
    setSaved(true);
  };

  return (
    <AccountLayout
      title="Profile & Settings"
      description="Your details pre-fill the predictors and help the AI counsellor give better answers."
    >
      {user && (
        <div className="space-y-6">
          {/* Account (from sign-in) */}
          <div className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-800 text-xl uppercase text-white">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                (user.name || user.email).charAt(0)
              )}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-lg text-neutral-900">{user.name}</h2>
              <p className="truncate text-sm text-neutral-500">{user.email}</p>
              {user.provider && user.provider !== 'local' && (
                <p className="mt-0.5 text-xs capitalize text-neutral-500">Signed in with {user.provider}</p>
              )}
            </div>
          </div>

          {/* Student profile */}
          <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 space-y-6">
            <div>
              <h2 className="text-lg text-neutral-900">Academic details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Current qualification" htmlFor="qualification">
                  <select
                    id="qualification"
                    className={inputClass}
                    value={form.qualification}
                    onChange={(e) => set('qualification', e.target.value as AccountProfile['qualification'])}
                  >
                    <option value="">Select…</option>
                    {Object.values(Qualification).map((q) => (
                      <option key={q}>{q}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Stream / course you want" htmlFor="stream" hint="e.g. Engineering, Medical, MBA">
                  <input
                    id="stream"
                    className={inputClass}
                    value={form.stream}
                    onChange={(e) => set('stream', e.target.value)}
                  />
                </Field>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-neutral-900">Entrance exam</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Exam" htmlFor="examName" hint="e.g. JEE Main, NEET UG, CAT">
                  <input
                    id="examName"
                    className={inputClass}
                    value={form.examName}
                    onChange={(e) => set('examName', e.target.value)}
                  />
                </Field>
                <Field label="Rank (if known)" htmlFor="rank">
                  <input
                    id="rank"
                    inputMode="numeric"
                    className={inputClass}
                    value={form.rank}
                    onChange={(e) => set('rank', e.target.value.replace(/[^\d,]/g, ''))}
                  />
                </Field>
                <Field label="Category" htmlFor="category">
                  <select
                    id="category"
                    className={inputClass}
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                  >
                    <option value="">Select…</option>
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Quota" htmlFor="quota">
                  <select
                    id="quota"
                    className={inputClass}
                    value={form.quota}
                    onChange={(e) => set('quota', e.target.value as AccountProfile['quota'])}
                  >
                    <option>State</option>
                    <option>All India</option>
                  </select>
                </Field>
              </div>
            </div>

            <div>
              <h2 className="text-lg text-neutral-900">College preferences</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Field label="Preferred location" htmlFor="location" hint="City or state">
                  <input
                    id="location"
                    className={inputClass}
                    value={form.location}
                    onChange={(e) => set('location', e.target.value)}
                  />
                </Field>
                <Field label="Budget" htmlFor="budget">
                  <select
                    id="budget"
                    className={inputClass}
                    value={form.budget}
                    onChange={(e) => set('budget', e.target.value as AccountProfile['budget'])}
                  >
                    <option value="">Select…</option>
                    {Object.values(BudgetRange).map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </Field>
                <Field label="College type" htmlFor="collegeType">
                  <select
                    id="collegeType"
                    className={inputClass}
                    value={form.collegeType}
                    onChange={(e) => set('collegeType', e.target.value as AccountProfile['collegeType'])}
                  >
                    <option value="">Any</option>
                    {Object.values(CollegeType).map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>

            <div className="flex items-center gap-4 border-t border-neutral-100 pt-5">
              <button
                type="submit"
                className="rounded-xl bg-primary-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
              >
                Save profile
              </button>
              {saved && (
                <span role="status" className="flex items-center gap-1.5 text-sm text-success-700">
                  <CheckCircle2 className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </div>
      )}
    </AccountLayout>
  );
};

export default ProfilePage;
