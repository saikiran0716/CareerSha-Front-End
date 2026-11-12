import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import { communityThreads } from '../../../data/home/homeContent';

const CommunityCard: React.FC<{ onStartCounseling: () => void }> = ({ onStartCounseling }) => {
  const navigate = useNavigate();
  const [communityTab, setCommunityTab] = useState<'trending' | 'recent' | 'unanswered'>('trending');

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wider">
          Student Community
        </h2>
        <button
          onClick={() => navigate('/community')}
          className="text-[11px] font-black text-primary-600 dark:text-primary-400 hover:underline uppercase tracking-widest"
        >
          View all
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 text-[10px] font-black uppercase tracking-wider">
        {(['trending', 'recent', 'unanswered'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setCommunityTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              communityTab === tab
                ? 'bg-secondary-200 dark:bg-primary-950/40 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400'
                : 'bg-neutral-50 dark:bg-neutral-900 border-neutral-100 dark:border-neutral-800 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Thread list */}
      <div className="space-y-3">
        {communityThreads.map((thread, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100/60 dark:border-neutral-800/60 shadow-sm"
          >
            <div
              className={`h-8.5 w-8.5 shrink-0 rounded-full flex items-center justify-center text-xs font-black shadow-sm ${thread.avatarBg}`}
            >
              {thread.avatar}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-xs font-extrabold text-neutral-800 dark:text-neutral-200 leading-snug line-clamp-2 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                {thread.title}
              </p>
              <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-extrabold uppercase">
                <span className="text-primary-600 dark:text-primary-400 font-black">{thread.author}</span>
                <span>•</span>
                <span>{thread.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 shrink-0 self-center">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{thread.replies}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStartCounseling}
        className="mt-4 w-full rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-black uppercase py-3.5 shadow-[0_8px_25px_rgba(37,99,235,0.2)] tracking-wider transition hover:scale-[1.01] active:scale-[0.99]"
      >
        Ask a Doubt
      </button>
    </section>
  );
};

export default CommunityCard;
