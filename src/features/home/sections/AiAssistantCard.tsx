import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';

const AiAssistantCard: React.FC<{ onStartCounseling: () => void; onAskAI: (question: string) => void }> = ({
  onStartCounseling,
  onAskAI,
}) => {
  const [assistantPrompt, setAssistantPrompt] = useState('');

  const submitAssistantPrompt = () => {
    const prompt = assistantPrompt.trim();
    if (prompt) {
      onAskAI(prompt);
    } else {
      onStartCounseling();
    }
    setAssistantPrompt('');
  };

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-[2rem] p-5 shadow-sm border border-neutral-100/80 dark:border-neutral-800/60">
      <div className="space-y-1 mb-4">
        <p className="text-xs font-black uppercase tracking-[0.15em] text-primary-600 dark:text-primary-400">
          AI Career Assistant
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold leading-tight">
          Ask anything about colleges, exams, courses & careers.
        </p>
      </div>

      <div className="relative flex items-center bg-neutral-50 dark:bg-neutral-950 rounded-full px-3 py-1.5 border border-neutral-100 dark:border-neutral-800">
        <Search className="h-4.5 w-4.5 text-neutral-500 dark:text-neutral-500 shrink-0 ml-1" />
        <input
          type="text"
          value={assistantPrompt}
          onChange={(e) => setAssistantPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submitAssistantPrompt();
            }
          }}
          placeholder="Ask me anything..."
          className="mx-2 w-full bg-transparent text-xs text-neutral-800 dark:text-neutral-200 outline-none placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-medium"
        />
        <button
          onClick={submitAssistantPrompt}
          className="h-8 w-8 shrink-0 flex items-center justify-center rounded-full bg-primary-800 text-white shadow-sm hover:bg-primary-700 transition"
          aria-label="Send query"
        >
          <ArrowRight className="h-4.5 w-4.5" />
        </button>
      </div>
    </section>
  );
};

export default AiAssistantCard;
