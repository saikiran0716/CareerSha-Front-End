import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import { jobOpenings } from '../../../data/home/homeContent';

const JobOpenings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-4 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60 mt-4 premium-card">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm sm:text-base font-black text-neutral-900 dark:text-white flex items-center gap-1.5">
            <Briefcase className="h-4 w-4 text-primary-500" />
            Latest Job & Internship Openings
          </h2>
        </div>
        <button
          onClick={() => navigate('/jobs')}
          className="text-[10px] font-black text-primary-600 dark:text-primary-400 uppercase tracking-widest hover:underline flex items-center gap-1"
        >
          View all <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {jobOpenings.map((job, idx) => (
          <div
            key={idx}
            className={`group flex flex-col p-3 rounded-2xl border bg-white dark:bg-neutral-900/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition duration-300 hover:shadow-sm hover:-translate-y-0.5 ${job.color}`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-white/60 dark:bg-neutral-950/60 shadow-sm border border-inherit">
                {job.type}
              </span>
            </div>

            <div className="mb-2">
              <p className="text-[13px] font-black leading-tight mb-0.5 text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {job.role}
              </p>
              <p className="text-[9px] font-extrabold uppercase tracking-widest opacity-80">{job.company}</p>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-bold opacity-80">
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-white dark:bg-neutral-800 border border-inherit flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JobOpenings;
