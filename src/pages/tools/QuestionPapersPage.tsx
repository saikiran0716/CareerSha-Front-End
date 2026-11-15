import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink, FileText, Search } from 'lucide-react';
import SEO from '../../components/common/SEO';
import Pagination from '../../components/common/Pagination';
import { ENTRANCE_EXAMS_DATA } from '../../data/exams/examDetailData';
import {
  MATERIALS_PAGE_SIZE,
  MaterialList,
  StudyMaterial,
  isPdf,
  listStudyMaterials,
} from '../../services/studyMaterialService';

const KIND_TAB_LABELS: Record<string, string> = {
  'question-paper': 'Question papers',
  'answer-key': 'Answer keys',
  solution: 'Solutions',
  'sample-paper': 'Sample papers',
  syllabus: 'Syllabus',
};

/** "Session 1 · 22 Jan · Shift 1 · Paper 1" — the part that tells papers of one exam and year apart. */
const detailOf = (item: StudyMaterial) => [item.session, item.subject].filter(Boolean).join(' · ');

const groupByYear = (items: StudyMaterial[]) => {
  const groups: { year: number | null; items: StudyMaterial[] }[] = [];
  items.forEach((item) => {
    const last = groups[groups.length - 1];
    if (last && last.year === item.year) last.items.push(item);
    else groups.push({ year: item.year, items: [item] });
  });
  return groups;
};

const MaterialRow: React.FC<{ item: StudyMaterial; showExam: boolean }> = ({ item, showExam }) => {
  const pdf = isPdf(item);
  const detail = detailOf(item);
  return (
    <li className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 transition-colors">
      <span className="w-10 h-10 rounded-lg bg-danger-50 text-danger-600 flex items-center justify-center shrink-0" aria-hidden="true">
        <FileText className="w-5 h-5" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-bold text-neutral-900">
          {showExam && <span>{item.exam} {item.year ?? ''} · </span>}
          {item.kindLabel}
          {detail && <span className="font-semibold text-neutral-700"> — {detail}</span>}
        </p>
        <p className="text-[12px] text-neutral-500 mt-0.5">
          {[item.language, item.source && `Source: ${item.source}`].filter(Boolean).join(' · ')}
        </p>
      </div>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${pdf ? 'Download' : 'Open'} ${item.title}`}
        className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg border border-primary-200 bg-primary-50 text-primary-800 text-[13px] font-bold hover:bg-primary-100 transition-colors shrink-0"
      >
        {pdf ? <Download className="w-4 h-4" aria-hidden="true" /> : <ExternalLink className="w-4 h-4" aria-hidden="true" />}
        {pdf ? 'Download PDF' : 'Open'}
      </a>
    </li>
  );
};

/** /tools/question-papers — previous year papers, answer keys, solutions, sample papers and syllabus. */
const QuestionPapersPage = () => {
  const [params, setParams] = useSearchParams();
  const stream = params.get('stream') ?? '';
  const exam = params.get('exam') ?? '';
  const kind = params.get('kind') ?? '';
  const year = params.get('year') ?? '';
  const q = params.get('q') ?? '';
  const page = Math.max(1, Number(params.get('page')) || 1);
  const paramsKey = params.toString();

  const [draft, setDraft] = useState(q);
  const [data, setData] = useState<MaterialList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => setDraft(q), [q]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(false);
    listStudyMaterials({ stream, exam, kind, year, q, page, pageSize: MATERIALS_PAGE_SIZE })
      .then((result) => active && setData(result))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `paramsKey` covers every query value
  }, [paramsKey, attempt]);

  const update = (changes: Record<string, string | null>, keepPage = false) => {
    const next = new URLSearchParams(params);
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
    if (!keepPage) next.delete('page');
    setParams(next);
  };

  const examInfo = useMemo(() => data?.facets.exams.find((e) => e.slug === exam), [data, exam]);
  const examName = examInfo?.name ?? '';
  const hasExamPage = !!exam && exam in ENTRANCE_EXAMS_DATA;
  // The exam picker shows until an exam, a type (e.g. all answer keys) or a search is chosen.
  const showPicker = !exam && !q && !kind;
  const groups = data ? groupByYear(data.results) : [];

  const kindTitle = KIND_TAB_LABELS[kind];
  const pageTitle = examName
    ? `${examName} Previous Year Question Papers`
    : kindTitle
      ? `${kindTitle} for All Exams`
      : 'Previous Year Question Papers';

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <SEO
        title={`${pageTitle} with Answer Keys`}
        description={
          examName
            ? `Download ${examName} previous year question papers, answer keys, solutions and syllabus, year by year.`
            : 'Download previous year question papers, answer keys, solutions, sample papers and syllabus for JEE Main, NEET, GATE, CAT, CLAT, UPSC and more.'
        }
        keywords="previous year question papers, PYQ, answer key, sample paper, syllabus, JEE Main papers, NEET papers"
      />

      <div className="bg-white border-b border-neutral-200 pt-8 pb-6">
        <div className="page-container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-danger-50 flex items-center justify-center shrink-0 border border-danger-100">
                <FileText className="w-6 h-6 text-danger-600" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{pageTitle}</h1>
                <p className="text-neutral-500 text-[13px]">
                  Papers, answer keys, solutions, sample papers and syllabus, free to download.
                </p>
              </div>
            </div>
            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                update({ q: draft.trim() || null });
              }}
              className="flex items-center gap-2 w-full md:w-[380px] bg-white rounded-xl border border-neutral-200 p-1 shadow-sm"
            >
              <label className="flex-1 flex items-center gap-2 px-2">
                <Search className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Search exam, year or shift"
                  aria-label="Search papers"
                  className="w-full h-9 text-[13px] outline-none bg-transparent"
                />
              </label>
              <button type="submit" className="h-9 px-4 rounded-lg bg-primary-800 hover:bg-primary-700 text-white text-[13px] font-bold">
                Search
              </button>
            </form>
          </div>

          {data && data.facets.streams.length > 1 && (
            <div className="flex flex-wrap gap-2 mt-5" role="group" aria-label="Stream">
              {[{ id: '', label: 'All streams' }, ...data.facets.streams].map((s) => (
                <button
                  key={s.id || 'all'}
                  type="button"
                  aria-pressed={stream === s.id}
                  onClick={() => update({ stream: s.id || null, exam: null, kind: null, year: null })}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-bold border transition-colors ${
                    stream === s.id
                      ? 'bg-primary-800 text-white border-primary-800'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:border-primary-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="page-container mt-8">
        {error ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
            <p className="text-neutral-700 font-semibold">We couldn't load question papers right now.</p>
            <button type="button" onClick={() => setAttempt((n) => n + 1)} className="mt-3 text-[13px] font-bold text-primary-600 hover:underline">
              Try again
            </button>
          </div>
        ) : !data ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Loading">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl bg-white border border-neutral-200 animate-pulse" />
            ))}
          </div>
        ) : showPicker ? (
          <section aria-labelledby="pick-exam">
            <h2 id="pick-exam" className="text-[15px] font-bold text-neutral-800 mb-4">
              Choose an exam
            </h2>
            {data.facets.exams.length === 0 ? (
              <p className="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-neutral-600">
                Question papers are being added. Check back soon.
              </p>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.facets.exams.map((e) => (
                  <li key={e.slug}>
                    <button
                      type="button"
                      onClick={() => update({ exam: e.slug })}
                      className="w-full text-left p-5 bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group"
                    >
                      <span className="block text-[16px] font-bold text-neutral-900 group-hover:text-primary-700">{e.name}</span>
                      <span className="block text-[12px] text-neutral-500 mt-1">
                        {e.count} file{e.count === 1 ? '' : 's'} · papers, answer keys and more
                      </span>
                      <span className="inline-block mt-3 text-[12px] font-bold text-primary-600">View papers →</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <aside className="lg:col-span-3" aria-label="Exams">
              <button
                type="button"
                onClick={() => update({ exam: null, kind: null, year: null, q: null })}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-600 hover:underline mb-3"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All exams
              </button>
              <ul className="flex lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-1">
                {data.facets.exams.map((e) => (
                  <li key={e.slug} className="shrink-0">
                    <button
                      type="button"
                      aria-current={exam === e.slug ? 'true' : undefined}
                      onClick={() => update({ exam: e.slug, kind: null, year: null, q: null })}
                      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-[13px] font-bold transition-colors ${
                        exam === e.slug ? 'bg-primary-800 text-white' : 'bg-white border border-neutral-200 text-neutral-700 hover:border-primary-300'
                      }`}
                    >
                      <span className="whitespace-nowrap">{e.name}</span>
                      <span className={`text-[11px] ${exam === e.slug ? 'text-white/80' : 'text-neutral-400'}`}>{e.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <section className="lg:col-span-9 min-w-0" aria-label="Files">
              {(exam || kind) && (
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-neutral-200 pb-px mb-5">
                  <div className="flex items-center gap-5 overflow-x-auto no-scrollbar" role="tablist" aria-label="Type">
                    {[{ id: '', label: 'All', count: data.facets.kinds.reduce((n, k) => n + k.count, 0) }, ...data.facets.kinds]
                      .filter((k) => k.id === '' || k.count > 0)
                      .map((k) => (
                        <button
                          key={k.id || 'all'}
                          role="tab"
                          aria-selected={kind === k.id}
                          onClick={() => update({ kind: k.id || null, year: null })}
                          className={`pb-3 text-[14px] font-bold whitespace-nowrap border-b-2 relative -bottom-px transition-colors ${
                            kind === k.id ? 'text-primary-600 border-primary-600' : 'text-neutral-500 border-transparent hover:text-neutral-800'
                          }`}
                        >
                          {k.id ? KIND_TAB_LABELS[k.id] ?? k.label : 'All'}
                          <span className="font-normal opacity-70"> ({k.count})</span>
                        </button>
                      ))}
                  </div>
                  {data.facets.years.length > 1 && (
                    <label className="flex items-center gap-2 pb-3 shrink-0">
                      <span className="text-[13px] text-neutral-500">Year:</span>
                      <select
                        value={year}
                        onChange={(e) => update({ year: e.target.value || null })}
                        className="text-[13px] font-bold text-neutral-800 bg-transparent outline-none cursor-pointer"
                      >
                        <option value="">All years</option>
                        {data.facets.years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
              )}

              {hasExamPage && (
                <p className="text-[13px] text-neutral-600 mb-4">
                  Dates, pattern and eligibility:{' '}
                  <Link to={`/exams/${exam}`} className="font-bold text-primary-600 hover:underline">
                    {examName} exam guide →
                  </Link>
                </p>
              )}
              {q && (
                <p className="text-[13px] text-neutral-500 mb-4" aria-live="polite">
                  {data.count} result{data.count === 1 ? '' : 's'} for “{q}”
                </p>
              )}

              {data.results.length === 0 ? (
                <p className="bg-white rounded-2xl border border-neutral-200 p-8 text-center text-neutral-600">
                  Nothing here yet. Try another type or year.
                </p>
              ) : (
                <div className={`flex flex-col gap-6 transition-opacity ${loading ? 'opacity-60' : ''}`}>
                  {groups.map((group) => (
                    <section key={`${group.year}-${group.items[0].id}`} aria-label={group.year ? String(group.year) : 'Any year'}>
                      <h2 className="text-[13px] font-black uppercase tracking-widest text-neutral-500 mb-2">
                        {group.year ?? 'Syllabus & general'}
                      </h2>
                      <ul className="flex flex-col gap-2">
                        {group.items.map((item) => (
                          <MaterialRow key={item.id} item={item} showExam={!exam} />
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}

              {data.count > data.pageSize && (
                <div className="mt-6">
                  <Pagination
                    page={data.page}
                    pageSize={data.pageSize}
                    total={data.count}
                    noun="files"
                    onChange={(next) => {
                      update({ page: next > 1 ? String(next) : null }, true);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </div>
              )}

              <p className="mt-8 text-[12px] text-neutral-500">
                Papers and answer keys are published by the exam bodies. Always check the official website for the
                latest notices.
              </p>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPapersPage;
