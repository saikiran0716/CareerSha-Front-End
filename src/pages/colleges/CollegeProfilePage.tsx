import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ExternalLink, MapPin, ShieldCheck } from 'lucide-react';
import SEO from '../../components/common/SEO';
import PageLoader from '../../components/common/loaders/PageLoader';
import SampleDataNotice from '../../components/common/SampleDataNotice';
import SaveCollegeButton from '../../features/account/SaveCollegeButton';
import CompareButton from '../../features/compare/CompareButton';
import ReviewsSection from '../../features/community/ReviewsSection';
import QnaSection from '../../features/community/QnaSection';
import { CoursesTab, CutoffsTab, OverviewTab, PlacementsTab } from '../../features/colleges/profile/CollegeTabs';
import { catalogService } from '../../services/catalogService';
import { useAsync } from '../../hooks/useAsync';
import NotFound from '../NotFound';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'courses', label: 'Courses & Fees' },
  { id: 'cutoffs', label: 'Cutoffs' },
  { id: 'placements', label: 'Placements' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'qna', label: 'Q&A' },
] as const;
type TabId = (typeof TABS)[number]['id'];

/** /colleges/:slug — college profile with tabs (tab kept in ?tab= so it can be linked). */
const CollegeProfilePage: React.FC = () => {
  const { slug = '' } = useParams();
  const [params, setParams] = useSearchParams();
  const { data: college, loading } = useAsync(() => catalogService.getCollege(slug), [slug]);
  const tab: TabId = TABS.some((t) => t.id === params.get('tab')) ? (params.get('tab') as TabId) : 'overview';

  if (loading) return <PageLoader />;
  if (!college) return <NotFound />;
  const c = college;

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      <SEO
        title={`${c.shortName}: Courses, Fees, Cutoffs, Placements & Reviews`}
        description={`${c.name} — courses and fees, cutoffs, placements, student reviews and Q&A.`}
        keywords={`${c.shortName}, ${c.shortName} fees, ${c.shortName} cutoff, ${c.shortName} placements, ${c.shortName} reviews`}
      />

      <header className="bg-primary-800 text-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-6">
          <nav aria-label="Breadcrumb" className="text-sm text-primary-200">
            <Link to="/colleges" className="hover:text-white">
              Colleges
            </Link>{' '}
            / <span className="text-white">{c.shortName}</span>
          </nav>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl">{c.name}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-primary-100">
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {c.city}, {c.state}
                </span>
                <span>Est. {c.established}</span>
                <span>{c.ownership}</span>
                {c.nirfRank && <span className="rounded bg-accent-600 px-2 py-0.5 text-white">NIRF #{c.nirfRank}</span>}
              </p>
              <p className="mt-2 flex items-center gap-1 text-sm text-primary-100">
                <ShieldCheck size={14} /> {c.accreditation.join(' · ')}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SaveCollegeButton
                college={{ name: c.shortName, location: `${c.city}, ${c.state}`, slug: c.slug }}
                variant="label"
              />
              <CompareButton slug={c.slug} name={c.shortName} className="w-40" />
              <a
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-primary-800"
              >
                Official website <ExternalLink size={12} />
              </a>
            </div>
          </div>
          <div role="tablist" aria-label="College sections" className="mt-6 flex overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="college-tabpanel"
                onClick={() => setParams(t.id === 'overview' ? {} : { tab: t.id }, { replace: true })}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors ${
                  tab === t.id ? 'border-accent-500 text-white' : 'border-transparent text-primary-200 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] space-y-5 px-4 sm:px-6 pt-6">
        <SampleDataNotice />
        <div role="tabpanel" id="college-tabpanel" aria-labelledby={`tab-${tab}`}>
          {tab === 'overview' && <OverviewTab c={c} />}
          {tab === 'courses' && <CoursesTab c={c} />}
          {tab === 'cutoffs' && <CutoffsTab c={c} />}
          {tab === 'placements' && <PlacementsTab c={c} />}
          {tab === 'reviews' && (
            <ReviewsSection target={{ type: 'college', id: c.slug }} courses={c.courses.map((x) => x.name)} />
          )}
          {tab === 'qna' && <QnaSection target={{ type: 'college', id: c.slug }} subject={c.shortName} />}
        </div>
      </main>
    </div>
  );
};

export default CollegeProfilePage;
