import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, Building2, CalendarClock, Clock, GraduationCap, IndianRupee, MapPin } from 'lucide-react';
import SEO from '../../components/common/SEO';
import NotFound from '../NotFound';
import { ApplyButton, CompanyLogo, Deadline } from '../../features/jobs/JobCard';
import { JobDetail, formatLastDate, getJob, postedAgo } from '../../services/jobsService';

const EMPLOYMENT_TYPES: Record<string, string> = {
  'Full-time': 'FULL_TIME',
  'Part-time': 'PART_TIME',
  Internship: 'INTERN',
  Contract: 'CONTRACTOR',
};

/** Google "JobPosting" structured data, so open jobs can show in Google's job search. */
const jobSchema = (job: JobDetail) => {
  const [city, region] = job.location.split(',').map((s) => s.trim());
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description.replace(/\n/g, '<br>'),
    datePosted: job.postedAt.slice(0, 10),
    employmentType: EMPLOYMENT_TYPES[job.jobType] ?? 'OTHER',
    hiringOrganization: { '@type': 'Organization', name: job.company, ...(job.logoUrl ? { logo: job.logoUrl } : {}) },
    directApply: false,
  };
  if (job.lastDate) schema.validThrough = `${job.lastDate}T23:59:59+05:30`;
  if (job.workMode === 'Remote') {
    schema.jobLocationType = 'TELECOMMUTE';
    schema.applicantLocationRequirements = { '@type': 'Country', name: 'India' };
  } else {
    schema.jobLocation = {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'IN' },
    };
  }
  if (job.salaryMin || job.salaryMax) {
    schema.baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        unitText: 'YEAR',
        ...(job.salaryMin ? { minValue: job.salaryMin * 100000 } : {}),
        ...(job.salaryMax ? { maxValue: job.salaryMax * 100000 } : {}),
      },
    };
  }
  return schema;
};

const Fact: React.FC<{ icon: React.ElementType; label: string; value: string }> = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4" aria-hidden="true" />
    </span>
    <div>
      <dt className="text-[12px] font-semibold text-neutral-500">{label}</dt>
      <dd className="text-[14px] font-bold text-neutral-800">{value}</dd>
    </div>
  </div>
);

const JobDetailPage = () => {
  const { slug = '' } = useParams();
  const [job, setJob] = useState<JobDetail | null | undefined>(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setJob(undefined);
    setError(false);
    getJob(slug)
      .then((result) => active && setJob(result))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [slug]);

  if (job === null) return <NotFound />;

  if (error) {
    return (
      <div className="page-container py-16 text-center">
        <p className="text-neutral-700 font-semibold">We couldn't load this job right now.</p>
        <Link to="/jobs" className="mt-3 inline-block text-[13px] font-bold text-primary-600 hover:underline">
          Back to all jobs
        </Link>
      </div>
    );
  }

  if (job === undefined) {
    return (
      <div className="page-container py-10 space-y-4" aria-label="Loading job">
        <div className="h-32 rounded-2xl bg-white border border-neutral-200 animate-pulse" />
        <div className="h-72 rounded-2xl bg-white border border-neutral-200 animate-pulse" />
      </div>
    );
  }

  const paragraphs = job.description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <SEO
        title={`${job.title} at ${job.company} – ${job.location}`}
        description={`${job.title} at ${job.company}, ${job.location}. ${job.jobType}, ${job.experience}, ${job.salary}. Apply on the employer's site.`}
        schema={job.isOpen ? jobSchema(job) : undefined}
        robots={job.isOpen ? undefined : 'noindex, follow'}
      />

      <div className="page-container pt-6">
        <Link to="/jobs" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary-600 hover:underline">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All jobs
        </Link>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <article className="lg:col-span-8 flex flex-col gap-6">
            <header className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 flex flex-col sm:flex-row gap-5">
              <CompanyLogo job={job} size="lg" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{job.title}</h1>
                <p className="mt-1 text-[14px] text-neutral-600">
                  <span className="font-bold text-neutral-800">{job.company}</span> · {job.location}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-neutral-500">
                  <span>Posted {postedAgo(job.postedAt).toLowerCase()}</span>
                  <Deadline lastDate={job.lastDate} />
                  {job.sector === 'Government' && (
                    <span className="px-2 py-0.5 rounded-full bg-secondary-50 text-secondary-700 font-bold">Government</span>
                  )}
                </div>
              </div>
              <div className="shrink-0 self-start">
                {job.isOpen ? (
                  <ApplyButton job={job} className="w-full sm:w-auto" />
                ) : (
                  <span className="inline-flex h-10 items-center px-4 rounded-lg bg-neutral-100 text-[13px] font-bold text-neutral-500">
                    Applications closed
                  </span>
                )}
              </div>
            </header>

            <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="sr-only">Key details</h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Fact icon={Briefcase} label="Job type" value={job.jobType} />
                <Fact icon={MapPin} label="Work mode" value={job.workMode} />
                <Fact icon={Clock} label="Experience" value={job.experience} />
                <Fact icon={IndianRupee} label="Salary" value={job.salary} />
                {job.qualification && <Fact icon={GraduationCap} label="Qualification" value={job.qualification} />}
                <Fact icon={Building2} label="Sector" value={job.sector} />
                {job.lastDate && <Fact icon={CalendarClock} label="Last date to apply" value={formatLastDate(job.lastDate)} />}
              </dl>
            </section>

            <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-lg font-bold text-neutral-900 mb-3">About the job</h2>
              <div className="space-y-3 text-[15px] leading-relaxed text-neutral-700">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {job.skills.length > 0 && (
                <>
                  <h3 className="text-[14px] font-bold text-neutral-900 mt-6 mb-2">Skills</h3>
                  <ul className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <li
                        key={skill}
                        className="px-2.5 py-1 rounded-md text-xs font-bold text-primary-700 bg-primary-50 border border-primary-100/50"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {job.isOpen && (
                <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-[13px] text-neutral-500">
                    You'll apply on {job.company}'s own site. CareerSha doesn't collect applications or charge any fee.
                  </p>
                  <ApplyButton job={job} />
                </div>
              )}
            </section>
          </article>

          <aside className="lg:col-span-4" aria-label="Similar jobs">
            {job.similar.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
                <h2 className="font-bold text-neutral-800 text-[15px] mb-4">Similar jobs</h2>
                <ul className="flex flex-col gap-3">
                  {job.similar.map((other) => (
                    <li key={other.id}>
                      <Link
                        to={`/jobs/${other.slug}`}
                        className="flex gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-100 hover:border-primary-200 transition-colors group"
                      >
                        <CompanyLogo job={other} size="sm" />
                        <span className="min-w-0">
                          <span className="block text-[13px] font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                            {other.title}
                          </span>
                          <span className="block text-[12px] text-neutral-500 mt-0.5">
                            {other.company} · {other.location}
                          </span>
                          <span className="block text-[12px] font-medium text-neutral-600 mt-1">
                            {other.jobType} · {other.salary}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
