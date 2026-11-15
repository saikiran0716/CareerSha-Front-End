import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { Job, listJobs, postedAgo } from '../../../services/jobsService';

const SHOW = 3;

/** Card colour by job type, so internships and government jobs stand out. */
const tone = (job: Job) =>
  job.jobType === 'Internship'
    ? 'text-success-700 bg-success-50 dark:bg-success-900/30 dark:text-success-400 border-success-200 dark:border-success-800'
    : job.sector === 'Government'
      ? 'text-secondary-700 bg-secondary-50 dark:bg-secondary-900/30 dark:text-secondary-400 border-secondary-200 dark:border-secondary-800'
      : 'text-primary-700 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 border-primary-200 dark:border-primary-800';

/** Home page: the newest open jobs from the Jobs section; each card opens the job. */
const JobOpenings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    let active = true;
    listJobs({ pageSize: SHOW })
      .then((list) => active && setJobs(list.results))
      .catch(() => active && setJobs([]));
    return () => {
      active = false;
    };
  }, []);

  // Nothing posted yet (or the jobs service is down): don't show an empty box on the home page.
  if (jobs !== null && jobs.length === 0) return null;

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-4 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60 mt-4 premium-card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white flex items-center gap-1.5">
          <Briefcase className="h-4 w-4 text-primary-500" aria-hidden="true" />
          Latest Job & Internship Openings
        </h2>
        <Link
          to="/jobs"
          className="text-xs font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {jobs === null
          ? Array.from({ length: SHOW }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-neutral-50 animate-pulse" aria-hidden="true" />
            ))
          : jobs.map((job) => (
              <Link
                key={job.id}
                to={`/jobs/${job.slug}`}
                className={`group flex flex-col p-3 rounded-2xl border hover:shadow-sm hover:-translate-y-0.5 transition duration-300 ${tone(job)}`}
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-white/70 dark:bg-neutral-950/60 shadow-sm border border-inherit">
                    {job.sector === 'Government' ? 'Government' : job.jobType}
                  </span>
                  <span className="text-[11px] font-semibold opacity-70">{postedAgo(job.postedAt)}</span>
                </div>
                <div className="mb-2">
                  <p className="text-[13px] font-black leading-tight mb-0.5 text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                    {job.title}
                  </p>
                  <p className="text-xs font-extrabold uppercase tracking-widest opacity-80">{job.company}</p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1 text-xs font-bold opacity-80 min-w-0">
                    <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">{job.location}</span>
                  </span>
                  <span className="text-xs font-bold opacity-80 whitespace-nowrap">{job.salary}</span>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default JobOpenings;
