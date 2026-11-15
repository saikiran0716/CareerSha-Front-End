import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Building2, GraduationCap, Mail, Target } from 'lucide-react';
import type { Job, JobFacets } from '../../services/jobsService';
import { Deadline } from './JobCard';
import { BLOG_URL } from '../../config/links';

interface Props {
  facets: JobFacets | null;
  closingSoon: Job[];
  onPickCompany: (name: string) => void;
}

const resources = [
  { title: 'Career guides', desc: 'Exams, admissions and careers on our blog', icon: BookOpen, href: BLOG_URL, external: true },
  { title: 'Government exams', desc: 'Dates, eligibility and patterns', icon: Building2, href: '/govt-exams' },
  { title: 'College Matcher', desc: 'Find colleges that fit your rank', icon: GraduationCap, href: '/college-matcher' },
  { title: 'Rank Estimator', desc: 'Turn marks into a likely rank', icon: Target, href: '/rank-estimator' },
];

/** Right column: companies hiring, jobs closing soon, career links and how employers list a job. */
export const JobsRightSidebar: React.FC<Props> = ({ facets, closingSoon, onPickCompany }) => (
  <div className="flex flex-col gap-6">
    {facets && facets.companies.length > 0 && (
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
        <h2 className="font-bold text-neutral-800 text-[15px] mb-4">Companies Hiring</h2>
        <ul className="flex flex-col gap-3">
          {facets.companies.map((company) => (
            <li key={company.name}>
              <button
                type="button"
                onClick={() => onPickCompany(company.name)}
                className="w-full flex items-center justify-between gap-3 group text-left"
              >
                <span className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-700 font-bold flex items-center justify-center shrink-0">
                    {company.name.charAt(0)}
                  </span>
                  <span className="text-[13px] font-bold text-neutral-800 group-hover:text-primary-600 transition-colors truncate">
                    {company.name}
                  </span>
                </span>
                <span className="text-[12px] text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded shrink-0">
                  {company.count} opening{company.count === 1 ? '' : 's'}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    )}

    {closingSoon.length > 0 && (
      <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
        <h2 className="font-bold text-neutral-800 text-[15px] mb-4">Closing Soon</h2>
        <ul className="flex flex-col gap-3">
          {closingSoon.map((job) => (
            <li key={job.id}>
              <Link
                to={`/jobs/${job.slug}`}
                className="block p-3 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-primary-200 transition-colors group"
              >
                <span className="block text-[13px] font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                  {job.title}
                </span>
                <span className="block text-[12px] text-neutral-500 mt-0.5">
                  {job.company} · {job.location}
                </span>
                <span className="block mt-1.5">
                  <Deadline lastDate={job.lastDate} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )}

    <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
      <h2 className="font-bold text-neutral-800 text-[15px] mb-4">Career Resources</h2>
      <ul className="flex flex-col gap-4">
        {resources.map(({ title, desc, icon: Icon, href, external }) => {
          const body = (
            <>
              <span className="w-8 h-8 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-500 group-hover:text-primary-600 group-hover:border-primary-200 transition-colors shrink-0">
                <Icon className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-neutral-800 group-hover:text-primary-600 transition-colors">
                  {title}
                </span>
                <span className="block text-[12px] text-neutral-500">{desc}</span>
              </span>
            </>
          );
          return (
            <li key={title}>
              {external ? (
                <a href={href} className="flex items-start gap-3 group">
                  {body}
                </a>
              ) : (
                <Link to={href} className="flex items-start gap-3 group">
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>

    <section className="bg-secondary-50/50 rounded-2xl shadow-sm border border-secondary-100 p-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">
          <Mail className="w-5 h-5" aria-hidden="true" />
        </span>
        <h2 className="font-bold text-neutral-800 text-[15px]">Hiring students or freshers?</h2>
      </div>
      <p className="text-[13px] text-neutral-600 mb-4">
        Send us your opening and the link to apply, and our team will list it on CareerSha.
      </p>
      <Link
        to="/contact-us"
        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 bg-primary-800 hover:bg-primary-700 text-white font-bold text-[13px] rounded-lg transition-colors shadow-sm"
      >
        List a job <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Link>
    </section>
  </div>
);
