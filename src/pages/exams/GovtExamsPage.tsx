import React, { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Building2, Info } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { GOVT_EXAM_CATEGORIES, getGovtCategory, govtExamsUrl } from '../../data/exams/govtExams';

/** /govt-exams — government recruitment exams by sector (?category=banking, #exam-id highlights one). */
const GovtExamsPage: React.FC = () => {
  const [params] = useSearchParams();
  const { hash } = useLocation();
  const selected = getGovtCategory(params.get('category'));
  const categories = selected ? [selected] : GOVT_EXAM_CATEGORIES;
  const highlighted = hash.slice(1);

  useEffect(() => {
    if (highlighted) document.getElementById(highlighted)?.scrollIntoView?.({ block: 'center' });
  }, [highlighted, selected]);

  const heading = selected ? `${selected.title} Exams` : 'Government (Sarkari) Exams';

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
      <SEO
        title={`${heading} 2026 | CareerSha`}
        description="Government recruitment exams in India by sector: banking, teaching, SSC, defence, railway, UPSC, state PSC, insurance and police."
        canonical={`https://www.careersha.com/govt-exams${selected ? `?category=${selected.slug}` : ''}`}
      />
      <h1 className="text-3xl text-neutral-900 sm:text-4xl">{heading}</h1>
      <p className="mt-2 max-w-2xl text-neutral-600">
        Recruitment exams conducted by central and state government bodies, grouped by sector.
      </p>

      <nav aria-label="Exam sectors" className="mt-6 flex flex-wrap gap-2">
        <Link
          to={govtExamsUrl()}
          className={`rounded-full border px-4 py-1.5 text-sm ${!selected ? 'border-primary-800 bg-primary-800 text-white' : 'border-neutral-200 text-neutral-700 hover:border-primary-300'}`}
        >
          All
        </Link>
        {GOVT_EXAM_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to={govtExamsUrl(c.slug)}
            aria-current={selected?.slug === c.slug ? 'page' : undefined}
            className={`rounded-full border px-4 py-1.5 text-sm ${selected?.slug === c.slug ? 'border-primary-800 bg-primary-800 text-white' : 'border-neutral-200 text-neutral-700 hover:border-primary-300'}`}
          >
            {c.title}
          </Link>
        ))}
      </nav>

      <p
        role="note"
        className="mt-6 flex items-start gap-2 rounded-xl border border-primary-100 bg-primary-50 px-4 py-2.5 text-sm text-primary-800"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        Dates, vacancies and eligibility change every year — always check the latest official notification of the
        conducting body.
      </p>

      {categories.map((c) => (
        <section key={c.slug} aria-labelledby={`sec-${c.slug}`} className="mt-10">
          <h2 id={`sec-${c.slug}`} className="text-xl text-neutral-900">
            {c.title}
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.exams.map((e) => (
              <li
                key={e.id}
                id={e.id}
                className={`rounded-2xl border bg-white p-5 transition-shadow ${
                  highlighted === e.id ? 'border-accent-500 shadow-lg ring-2 ring-accent-200' : 'border-neutral-200'
                }`}
              >
                <h3 className="text-lg text-neutral-900">{e.name}</h3>
                <p className="mt-1 text-sm text-neutral-600">{e.fullName}</p>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
                  <Building2 className="h-3.5 w-3.5" /> Conducted by {e.conductedBy}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default GovtExamsPage;
