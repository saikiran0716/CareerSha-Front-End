import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ChevronRight, Cpu, Palette, Scale, Stethoscope, type LucideIcon } from 'lucide-react';
import { ExamStream, getStreamExams, streamExamUrl } from '../../../data/exams/streamExams';

interface StreamCard {
  stream: ExamStream;
  icon: LucideIcon;
  tone: string;
  blurb: string;
  colleges: string;
  courses: { name: string; url: string }[];
}

const STREAMS: StreamCard[] = [
  {
    stream: 'engineering',
    icon: Cpu,
    tone: 'bg-primary-50 text-primary-700',
    blurb: 'B.Tech, M.Tech and B.Arch at IITs, NITs, IIITs and private universities.',
    colleges: '/colleges?stream=Engineering',
    courses: [
      { name: 'CSE', url: '/eng/cse' },
      { name: 'ECE', url: '/eng/ece' },
      { name: 'Mechanical', url: '/eng/mechanical' },
    ],
  },
  {
    stream: 'medical',
    icon: Stethoscope,
    tone: 'bg-danger-50 text-danger-600',
    blurb: 'MBBS, BDS, Nursing and Pharmacy — from AIIMS to state medical colleges.',
    colleges: '/colleges?stream=Medical',
    courses: [
      { name: 'MBBS', url: '/mbbs/india' },
      { name: 'BDS', url: '/bds/india' },
      { name: 'Nursing', url: '/nursing/india' },
    ],
  },
  {
    stream: 'management',
    icon: Briefcase,
    tone: 'bg-accent-50 text-accent-700',
    blurb: 'MBA and PGDM at IIMs and top B-schools, plus executive and online options.',
    colleges: '/colleges?stream=Management',
    courses: [
      { name: 'IIMs', url: '/mba/iims' },
      { name: 'Executive MBA', url: '/mba/executive' },
      { name: 'Online MBA', url: '/mba/online' },
    ],
  },
  {
    stream: 'law',
    icon: Scale,
    tone: 'bg-secondary-50 text-secondary-700',
    blurb: 'Five-year integrated LLB and LLM at National Law Universities and more.',
    colleges: '/colleges?stream=Law',
    courses: [{ name: 'Top Law Colleges', url: '/law/top/colleges' }],
  },
  {
    stream: 'design',
    icon: Palette,
    tone: 'bg-success-50 text-success-700',
    blurb: 'Fashion, product, interior and graphic design at NID, NIFT and IIT design schools.',
    colleges: '/colleges?stream=Design',
    courses: [
      { name: 'Fashion', url: '/design/fashion' },
      { name: 'Interior', url: '/design/interior' },
      { name: 'Graphic', url: '/design/graphic' },
    ],
  },
];

/** One card per stream: what it covers, its main exams and popular courses. */
const ExploreByStream: React.FC = () => (
  <section aria-labelledby="explore-streams">
    <div className="mb-4 flex items-end justify-between">
      <div>
        <h2 id="explore-streams" className="text-xl text-neutral-900">
          Explore by Stream
        </h2>
        <p className="text-sm text-neutral-500">Exams, courses and colleges for the path you are choosing.</p>
      </div>
      <Link to="/exams" className="text-xs uppercase tracking-widest text-primary-700 hover:underline">
        All exams
      </Link>
    </div>

    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
      {STREAMS.map((s) => {
        const data = getStreamExams(s.stream)!;
        const exams = data.groups.flatMap((g) => g.exams);
        const Icon = s.icon;
        return (
          <li
            key={s.stream}
            className="flex flex-col rounded-[1.5rem] border border-neutral-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base text-neutral-900">{data.title}</h3>
                <p className="text-xs text-neutral-500">{exams.length} entrance exams</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">{s.blurb}</p>

            <p className="mt-4 text-[11px] uppercase tracking-wider text-neutral-400">Top exams</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {exams.slice(0, 4).map((x) => (
                <Link
                  key={x.id}
                  to={streamExamUrl(s.stream, x)}
                  className="rounded-full border border-neutral-200 px-2.5 py-1 text-xs text-neutral-700 hover:border-primary-300 hover:text-primary-800"
                >
                  {x.name}
                </Link>
              ))}
            </div>

            <p className="mt-3 text-[11px] uppercase tracking-wider text-neutral-400">Popular</p>
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
              {s.courses.map((c) => (
                <Link key={c.url} to={c.url} className="text-sm text-primary-700 hover:underline">
                  {c.name}
                </Link>
              ))}
            </div>

            <Link
              to={s.colleges}
              className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-neutral-900 hover:text-primary-800"
            >
              Browse {data.title} colleges <ChevronRight className="h-4 w-4" />
            </Link>
          </li>
        );
      })}
      <li className="flex flex-col justify-center rounded-[1.5rem] bg-primary-800 p-5 text-white">
        <h3 className="text-base text-white">Preparing for a government job?</h3>
        <p className="mt-2 text-sm text-primary-100">
          Banking, SSC, Railway, Defence, Teaching and UPSC exams, grouped by sector.
        </p>
        <Link
          to="/govt-exams"
          className="mt-4 inline-flex w-fit items-center gap-1 rounded-xl bg-white px-4 py-2 text-sm text-primary-800 hover:bg-primary-50"
        >
          Sarkari Exams <ChevronRight className="h-4 w-4" />
        </Link>
      </li>
    </ul>
  </section>
);

export default ExploreByStream;
