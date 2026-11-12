import React from 'react';
import { useNavigate } from 'react-router-dom';
import { quickTools } from '../../../data/home/homeContent';

const QuickToolsPanel: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-6 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {quickTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.title}
              onClick={() => navigate(tool.href)}
              className={`group flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 border relative ${
                tool.highlight
                  ? 'bg-primary-50/30 dark:bg-primary-950/10 border-primary-200/80 dark:border-primary-800/50 shadow-[0_4px_12px_rgba(59,130,246,0.04)] hover:border-primary-400 dark:hover:border-primary-600 hover:shadow-[0_12px_24px_-8px_rgba(59,130,246,0.15)] hover:-translate-y-1'
                  : 'bg-neutral-50/30 dark:bg-neutral-900/30 border-neutral-100/70 dark:border-neutral-800/40 hover:bg-white dark:hover:bg-neutral-800/60 hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] hover:-translate-y-1'
              }`}
            >
              {tool.highlight && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-primary-600 text-white shadow-sm ring-1 ring-primary-500/20">
                  Popular
                </span>
              )}
              <div
                className={`mb-3 flex h-11 w-11 items-center justify-center rounded-full ${tool.bgClass} shadow-sm group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-extrabold text-neutral-900 dark:text-white leading-tight mb-1">{tool.title}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">{tool.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickToolsPanel;
