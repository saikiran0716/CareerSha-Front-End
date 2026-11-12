import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import SEO from '../../components/common/SEO';
import SampleDataNotice from '../../components/common/SampleDataNotice';
import { Stars } from '../../components/common/StarRating';
import { SAMPLE_COLLEGES } from '../../data/catalog/colleges';
import { CatalogCollege } from '../../data/catalog/types';
import { catalogService, lowestFeeLakhs } from '../../services/catalogService';
import { compareService, MAX_COMPARE } from '../../services/compareService';
import { averageRating, communityService } from '../../services/communityService';
import { useAsync } from '../../hooks/useAsync';
import { useCompare } from '../../hooks/useCompare';

/** "₹24 LPA" -> 24, "₹1.2 Cr" -> 120 (for picking the best value in a row). */
const packageLakhs = (v: string) => {
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
  { label: 'Location', value: (c) => `${c.city}, ${c.state}` },
  { label: 'Ownership', value: (c) => c.ownership },
  { label: 'Established', value: (c) => c.established },
  {
    label: 'NIRF rank',
    value: (c) => (c.nirfRank ? `#${c.nirfRank} (${c.stream})` : '—'),
    score: (c) => c.nirfRank ?? Infinity,
    better: 'low',
  },
  {
    label: 'Lowest course fee',
    value: (c) => `₹${lowestFeeLakhs(c).toFixed(lowestFeeLakhs(c) < 1 ? 2 : 1)} L`,
    score: (c) => lowestFeeLakhs(c),
    better: 'low',
  },
  {
    label: 'Placement rate',
    value: (c) => c.placements.placementRate,
    score: (c) => parseFloat(c.placements.placementRate) || -1,
    better: 'high',
  },
  {
    label: 'Average package',
    value: (c) => c.placements.averagePackage,
    score: (c) => packageLakhs(c.placements.averagePackage),
    better: 'high',
  },
  {
    label: 'Highest package',
    value: (c) => c.placements.highestPackage,
    score: (c) => packageLakhs(c.placements.highestPackage),
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
  { label: 'Courses', value: (c) => c.courses.map((x) => x.name).join(', ') },
  { label: 'Top recruiters', value: (c) => c.placements.topRecruiters.slice(0, 4).join(', ') },
];

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

  const available = SAMPLE_COLLEGES.filter((c) => !list.includes(c.slug));
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
        <SampleDataNotice />

        {list.length < MAX_COMPARE && (
          <label className="flex flex-wrap items-center gap-2 text-sm text-neutral-700">
            <Plus size={16} /> Add a college
            <select
              className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
              value=""
              onChange={(e) => e.target.value && compareService.toggle(e.target.value)}
            >
              <option value="">Choose…</option>
              {available.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.shortName} ({c.stream})
                </option>
              ))}
            </select>
          </label>
        )}

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
                  {ROWS.map((row) => {
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
