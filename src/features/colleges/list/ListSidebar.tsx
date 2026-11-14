import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Target } from 'lucide-react';
import { NavCategory, NavLink, navigationData } from '../../../data/navigationData';
import { ExamStream, getStreamExams, streamExamUrl } from '../../../data/exams/streamExams';
import { ListStream } from '../../../services/collegeListService';

const NAV_CATEGORY: Partial<Record<ListStream, string>> = {
  Engineering: 'engineering',
  Management: 'mba',
  Medical: 'medical',
  Dental: 'medical',
  Pharmacy: 'medical',
  Nursing: 'medical',
  Paramedical: 'medical',
};
const EXAM_STREAM: Partial<Record<ListStream, ExamStream>> = {
  Engineering: 'engineering',
  Management: 'management',
  Medical: 'medical',
  Dental: 'medical',
  Nursing: 'medical',
  Pharmacy: 'medical',
  Paramedical: 'medical',
  Law: 'law',
  Design: 'design',
};
const LIST_GROUPS = ['Top Ranked Colleges', 'Popular Courses', 'Colleges By Location'];

/** College-list links from the header menu for this stream (excluding the current page). */
const relatedLists = (stream: ListStream | undefined, current: string): NavLink[] => {
  const cat: NavCategory | undefined = navigationData.find((c) => c.slug === (stream && NAV_CATEGORY[stream]));
  if (!cat) return [];
  const links = cat.groups
    .filter((g) => LIST_GROUPS.includes(g.title))
    .flatMap((g) => [...g.links, ...(g.sections ?? []).flatMap((s) => s.links)])
    .filter((l) => !l.url.includes('?') && l.url !== current);
  return links.filter((l, i) => links.findIndex((x) => x.url === l.url) === i).slice(0, 8);
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="rounded-2xl border border-neutral-200 bg-white p-5">
    <h2 className="text-sm text-neutral-900">{title}</h2>
    <div className="mt-3">{children}</div>
  </section>
);

/** Right column: predictor call-to-action, related lists and exams for the stream. */
const ListSidebar: React.FC<{ stream?: ListStream }> = ({ stream }) => {
  const { pathname } = useLocation();
  const related = relatedLists(stream, pathname);
  const examStream = stream && EXAM_STREAM[stream];
  const exams = examStream ? getStreamExams(examStream) : undefined;

  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <section className="rounded-2xl bg-primary-800 p-5 text-white">
        <Target className="h-6 w-6 text-accent-400" />
        <h2 className="mt-2 text-base text-white">Which of these can you get?</h2>
        <p className="mt-1 text-sm text-primary-100">Enter your rank to see colleges within your reach.</p>
        <Link
          to="/college-matcher"
          className="mt-4 inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm text-primary-800 hover:bg-primary-50"
        >
          Predict my colleges <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      {related.length > 0 && (
        <Card title="Explore more lists">
          <ul className="space-y-1">
            {related.map((l) => (
              <li key={l.url}>
                <Link
                  to={l.url}
                  className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-neutral-700 hover:bg-neutral-50 hover:text-primary-800"
                >
                  {l.name} <ChevronRight className="h-4 w-4 shrink-0 text-neutral-400" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {exams && examStream && (
        <Card title={`${exams.title} entrance exams`}>
          <div className="flex flex-wrap gap-1.5">
            {exams.groups
              .flatMap((g) => g.exams)
              .slice(0, 8)
              .map((x) => (
                <Link
                  key={x.id}
                  to={streamExamUrl(examStream, x)}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 hover:border-primary-300 hover:text-primary-800"
                >
                  {x.name}
                </Link>
              ))}
          </div>
        </Card>
      )}
    </aside>
  );
};

export default ListSidebar;
