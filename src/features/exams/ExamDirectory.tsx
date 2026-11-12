import React, { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowRight, Building2 } from 'lucide-react';
import { STREAM_EXAMS, getStreamExams } from '../../data/exams/streamExams';

const chip = (active: boolean) =>
  `rounded-full border px-4 py-1.5 text-sm ${
    active
      ? 'border-primary-800 bg-primary-800 text-white'
      : 'border-neutral-200 text-neutral-700 hover:border-primary-300'
  }`;

/** Entrance exams by stream (?stream=medical), with #exam-id highlighting the linked exam. */
const ExamDirectory: React.FC = () => {
  const [params] = useSearchParams();
  const { hash } = useLocation();
  const selected = getStreamExams(params.get('stream'));
  const streams = selected ? [selected] : STREAM_EXAMS;
  const highlighted = hash.slice(1);

  useEffect(() => {
    if (highlighted) document.getElementById(highlighted)?.scrollIntoView?.({ block: 'center' });
  }, [highlighted, selected]);

  return (
    <section aria-labelledby="exam-directory" className="mb-12">
      <h2 id="exam-directory" className="text-2xl text-neutral-900">
        {selected ? `${selected.title} Entrance Exams` : 'Entrance Exams by Stream'}
      </h2>

      <nav aria-label="Exam streams" className="mt-4 flex flex-wrap gap-2">
        <Link to="/exams" className={chip(!selected)}>
          All
        </Link>
        {STREAM_EXAMS.map((s) => (
          <Link
            key={s.stream}
            to={`/exams?stream=${s.stream}`}
            aria-current={selected?.stream === s.stream ? 'page' : undefined}
            className={chip(selected?.stream === s.stream)}
          >
            {s.title}
          </Link>
        ))}
      </nav>

      {streams.map((s) => (
        <div key={s.stream} className="mt-8">
          {!selected && <h3 className="text-xl text-neutral-900">{s.title}</h3>}
          {s.groups.map((g) => (
            <div key={g.title} className="mt-4">
              <h4 className="text-sm uppercase tracking-wide text-neutral-500">{g.title}</h4>
              <ul className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {g.exams.map((x) => (
                  <li
                    key={x.id}
                    id={x.id}
                    className={`flex flex-col rounded-2xl border bg-white p-5 ${
                      highlighted === x.id ? 'border-accent-500 shadow-lg ring-2 ring-accent-200' : 'border-neutral-200'
                    }`}
                  >
                    <h5 className="text-lg text-neutral-900">{x.name}</h5>
                    <p className="mt-1 text-sm text-neutral-600">{x.fullName}</p>
                    <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
                      <Building2 className="h-3.5 w-3.5 shrink-0" /> Conducted by {x.conductedBy}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-sm">
                      {x.detailId && (
                        <Link
                          to={`/exams/${x.detailId}`}
                          className="inline-flex items-center gap-1 text-primary-700 hover:underline"
                        >
                          Exam details <ArrowRight size={14} />
                        </Link>
                      )}
                      {x.predictor && (
                        <Link to={`/rank-estimator/${x.predictor}`} className="text-primary-700 hover:underline">
                          Rank predictor
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default ExamDirectory;
