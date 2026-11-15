import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, IndianRupee, Building2, ExternalLink, CalendarClock } from 'lucide-react';
import { Job, daysLeft, formatLastDate, isNewJob, postedAgo } from '../../services/jobsService';

const MAX_TAGS = 4;

export const CompanyLogo: React.FC<{ job: Pick<Job, 'company' | 'logoUrl'>; size?: 'sm' | 'md' | 'lg' }> = ({
  job,
  size = 'md',
}) => {
  const box = { sm: 'w-10 h-10 text-base', md: 'w-14 h-14 text-xl', lg: 'w-16 h-16 text-2xl' }[size];
  return (
    <div
      className={`${box} rounded-xl flex-shrink-0 flex items-center justify-center font-bold border border-neutral-100 shadow-sm ${
        job.logoUrl ? 'bg-white p-2' : 'bg-primary-50 text-primary-700'
      }`}
    >
      {job.logoUrl ? (
        <img src={job.logoUrl} alt={`${job.company} logo`} className="w-full h-full object-contain" loading="lazy" />
      ) : (
        <span aria-hidden="true">{job.company.charAt(0)}</span>
      )}
    </div>
  );
};

/** "Closes today", "Closes in 3 days" (red when a week or less) or "Apply by 20 Nov 2026". */
export const Deadline: React.FC<{ lastDate: string | null }> = ({ lastDate }) => {
  const left = daysLeft(lastDate);
  if (left === null || !lastDate) return null;
  const urgent = left <= 7;
  const text =
    left <= 0
      ? 'Closes today'
      : left <= 7
        ? `Closes in ${left} day${left === 1 ? '' : 's'}`
        : `Apply by ${formatLastDate(lastDate)}`;
  return (
    <span
      className={`flex items-center gap-1 text-[12px] font-semibold ${urgent ? 'text-danger-600' : 'text-neutral-500'}`}
    >
      <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" /> {text}
    </span>
  );
};

export const ApplyButton: React.FC<{ job: Pick<Job, 'applyUrl' | 'title' | 'company'>; className?: string }> = ({
  job,
  className = '',
}) => (
  <a
    href={job.applyUrl}
    target="_blank"
    rel="noopener noreferrer nofollow"
    aria-label={`Apply for ${job.title} at ${job.company} (opens the employer's site)`}
    className={`inline-flex items-center justify-center gap-1.5 h-10 px-5 bg-primary-800 hover:bg-primary-700 text-white text-[13px] font-bold rounded-lg transition-colors shadow-sm active:scale-95 ${className}`}
  >
    Apply Now <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
  </a>
);

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const extraTags = job.skills.length - MAX_TAGS;
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5 hover:border-primary-300 transition-all hover:shadow-md flex flex-col sm:flex-row gap-5">
      <CompanyLogo job={job} />

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <h3 className="text-base font-bold text-neutral-900">
                <Link to={`/jobs/${job.slug}`} className="hover:text-primary-700 hover:underline">
                  {job.title}
                </Link>
              </h3>
              {job.isFeatured && (
                <span className="px-2 py-0.5 text-xs font-black uppercase tracking-wider text-orange-700 bg-orange-100 rounded-full">
                  Featured
                </span>
              )}
              {isNewJob(job.postedAt) && (
                <span className="px-2 py-0.5 text-xs font-black uppercase tracking-wider text-success-700 bg-success-100 rounded-full">
                  New
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-neutral-600">
              <span className="text-neutral-800 font-bold">{job.company}</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" aria-hidden="true"></span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" />
                {job.location}
              </span>
            </div>
          </div>
          <span className="text-[12px] text-neutral-500 font-medium hidden sm:block whitespace-nowrap">
            {postedAgo(job.postedAt)}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-neutral-600">
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" /> {job.jobType}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" /> {job.experience}
          </span>
          <span className="flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" /> {job.salary}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-neutral-500" aria-hidden="true" /> {job.workMode}
          </span>
          {job.sector === 'Government' && (
            <span className="flex items-center gap-1.5 text-secondary-700">
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" /> Government
            </span>
          )}
        </div>

        {job.skills.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {job.skills.slice(0, MAX_TAGS).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-bold text-primary-700 bg-primary-50 border border-primary-100/50"
              >
                {tag}
              </span>
            ))}
            {extraTags > 0 && (
              <span className="px-2 py-1 rounded-md text-xs font-bold text-neutral-500 bg-neutral-50 border border-neutral-200">
                +{extraTags}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0 min-w-[140px]">
        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="text-[12px] text-neutral-500 font-medium sm:hidden">{postedAgo(job.postedAt)}</span>
          <Deadline lastDate={job.lastDate} />
        </div>
        <div className="flex flex-col items-stretch sm:items-end gap-2">
          <ApplyButton job={job} />
          <Link
            to={`/jobs/${job.slug}`}
            className="text-center text-[12px] font-bold text-primary-600 hover:text-primary-700 hover:underline"
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
};
