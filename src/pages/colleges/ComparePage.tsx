import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { Stars } from '../../components/common/StarRating';
import { CatalogCollege } from '../../data/catalog/types';
import { catalogService, lowestFeeLakhs } from '../../services/catalogService';
import { compareService, MAX_COMPARE } from '../../services/compareService';
import { averageRating, communityService } from '../../services/communityService';
import { useAsync } from '../../hooks/useAsync';
import { useCompare } from '../../hooks/useCompare';
import { useDebounced } from '../../hooks/useDebounced';

/** "₹24 LPA" -> 24, "₹1.2 Cr" -> 120 (for picking the best value in a row). */
const packageLakhs = (v?: string) => {
  if (!v) return -1;
  const n = parseFloat(v.replace(/[^\d.]/g, ''));
  if (Number.isNaN(n)) return -1;
  return /cr/i.test(v) ? n * 100 : n;
};

interface Row {
  label: string;
  value: (c: CatalogCollege, rating: number) => React.ReactNode;
  /** returns a number to rank by; the best column is highlighted */
  score?: (c: CatalogCollege, rating: number) => number;
  better?: 'high' | 'low';
}

const ROWS: Row[] = [
  { label: 'Location', value: (c) => [c.city, c.state].filter(Boolean).join(', ') || '—' },
  { label: 'Ownership', value: (c) => c.ownership ?? '—' },
  { label: 'Established', value: (c) => c.established ?? '—' },
  {
    label: 'NIRF rank',
    value: (c) => (c.nirfRank ? `#${c.nirfRank} (${c.nirfCategory ?? c.stream})` : '—'),
    score: (c) => c.nirfRank ?? Infinity,
    better: 'low',
  },
  {
    label: 'Lowest course fee',
    value: (c) =>
      Number.isFinite(lowestFeeLakhs(c)) ? `₹${lowestFeeLakhs(c).toFixed(lowestFeeLakhs(c) < 1 ? 2 : 1)} L` : '—',
    score: (c) => lowestFeeLakhs(c),
    better: 'low',
  },
  {
    label: 'Placement rate',
    value: (c) => c.placements?.placementRate || '—',
    score: (c) => parseFloat(c.placements?.placementRate ?? '') || -1,
    better: 'high',
  },
  {
    label: 'Median package',
    value: (c) => c.placements?.medianPackage || '—',
    score: (c) => packageLakhs(c.placements?.medianPackage),
    better: 'high',
  },
  {
    label: 'Average package',
    value: (c) => c.placements?.averagePackage || '—',
    score: (c) => packageLakhs(c.placements?.averagePackage),
    better: 'high',
  },
  {
    label: 'Highest package',
    value: (c) => c.placements?.highestPackage || '—',
    score: (c) => packageLakhs(c.placements?.highestPackage),
    better: 'high',
  },
  {
    label: 'Student rating',
    value: (_c, r) =>
      r ? (
        <span className="inline-flex items-center gap-1">
          <Stars value={r} size={12} /> {r.toFixed(1)}
        </span>
      ) : (
        '—'
      ),
    score: (_c, r) => r || -1,
    better: 'high',
  },
  { label: 'Courses', value: (c) => c.courses.map((x) => x.name).join(', ') || '—' },
  { label: 'Top recruiters', value: (c) => c.placements?.topRecruiters.slice(0, 4).join(', ') || '—' },
];

/** Search box that adds a college to the comparison. */
const AddCollege: React.FC<{ exclude: string[] }> = ({ exclude }) => {
  const [q, setQ] = useState('');
  const term = useDebounced(q.trim());
  const { data: found, loading } = useAsync(
    async () =>
      term.length < 2
        ? []
        : (await catalogService.listColleges({ search: term, pageSize: 8 })).results.filter(
            (c) => !exclude.includes(c.slug),
          ),
    [term, exclude.join(',')],
  );
  return (
    <div className="relative max-w-md">
      <label className="flex items-center gap-2 text-sm text-neutral-700">
        <Plus size={16} /> Add a college
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a college name or city…"
          className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
        />
      </label>
      {term.length >= 2 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg">
          {loading && <li className="px-3 py-2 text-sm text-neutral-500">Searching…</li>}
          {!loading && !found?.length && <li className="px-3 py-2 text-sm text-neutral-500">No colleges found</li>}
          {!loading &&
            found?.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => {
                    compareService.toggle(c.slug);
                    setQ('');
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-primary-50"
                >
                  {c.shortName}
                  <span className="ml-1 text-xs text-neutral-500">{[c.city, c.state].filter(Boolean).join(', ')}</span>
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

/** /compare — side-by-side comparison of up to 4 colleges (?c=slug1,slug2 also works for sharing). */
const ComparePage: React.FC = () => {
  const list = useCompare();
  const [params] = useSearchParams();

  // A shared link (?c=a,b) replaces the current selection once.
  useEffect(() => {
    const fromUrl = params.get('c');
    if (fromUrl) compareService.set(fromUrl.split(',').filter(Boolean));
  }, [params]);

  const { data: colleges = [] } = useAsync(() => catalogService.getColleges(list), [list.join(',')]);
  const { data: ratings = {} } = useAsync(async () => {
    const entries = await Promise.all(
      list.map(
        async (slug) =>
          [slug, averageRating(await communityService.listReviews({ type: 'college', id: slug }))] as const,
      ),
    );
    return Object.fromEntries(entries) as Record<string, number>;
  }, [list.join(',')]);

  const shareUrl = `${window.location.origin}/compare?c=${list.join(',')}`;

  return (
    <div className="min-h-screen bg-neutral-50 pb-16">
      <SEO
        title="Compare Colleges"
        description="Compare colleges side by side on fees, rankings, placements and student ratings."
      />
      <div className="mx-auto max-w-[1200px] space-y-5 px-4 sm:px-6 py-8">
        <div>
          <h1 className="text-2xl sm:text-3xl text-neutral-900">Compare colleges</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Pick up to {MAX_COMPARE} colleges. The best value in each row is highlighted.
          </p>
        </div>

        {list.length < MAX_COMPARE && <AddCollege exclude={list} />}

        {colleges.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center">
            <h2 className="text-lg text-neutral-900">No colleges selected</h2>
            <p className="mt-1 text-sm text-neutral-500">Add colleges above, or use “Compare” on any college card.</p>
            <Link
              to="/colleges"
              className="mt-4 inline-block rounded-xl bg-primary-800 px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-700"
            >
              Explore colleges
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
              <table className="w-full min-w-[640px] table-fixed">
                <caption className="sr-only">College comparison</caption>
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th scope="col" className="w-44 p-4 text-left text-sm text-neutral-500">
                      College
                    </th>
                    {colleges.map((c) => (
                      <th key={c.slug} scope="col" className="p-4 text-left align-top">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/colleges/${c.slug}`} className="text-base text-primary-800 hover:underline">
                            {c.shortName}
                          </Link>
                          <button
                            onClick={() => compareService.remove(c.slug)}
                            aria-label={`Remove ${c.shortName}`}
                            className="rounded p-1 text-neutral-500 hover:bg-neutral-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs font-normal text-neutral-500">{c.stream}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {/* rows where no college has data are left out */}
                  {ROWS.filter((row) => colleges.some((c) => row.value(c, ratings[c.slug] ?? 0) !== '—')).map((row) => {
                    const scores = row.score ? colleges.map((c) => row.score!(c, ratings[c.slug] ?? 0)) : [];
                    const valid = scores.filter((s) => Number.isFinite(s) && s >= 0);
                    const best =
                      valid.length > 1 ? (row.better === 'low' ? Math.min(...valid) : Math.max(...valid)) : null;
                    return (
                      <tr key={row.label}>
                        <th scope="row" className="p-4 text-left text-sm font-normal text-neutral-500 align-top">
                          {row.label}
                        </th>
                        {colleges.map((c, i) => {
                          const isBest = best !== null && scores[i] === best;
                          return (
                            <td
                              key={c.slug}
                              className={`p-4 text-sm align-top ${isBest ? 'bg-success-50 text-success-800' : 'text-neutral-800'}`}
                            >
                              {row.value(c, ratings[c.slug] ?? 0)}
                              {isBest && <span className="sr-only"> (best)</span>}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-neutral-500">
              Share this comparison:{' '}
              <a href={shareUrl} className="break-all text-primary-700 hover:underline">
                {shareUrl}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
