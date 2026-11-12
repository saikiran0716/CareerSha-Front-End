import React, { useState } from 'react';

const FaqSection: React.FC<{ faqs: { question: string; answer: string }[] }> = ({ faqs }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setActiveFaq(activeFaq === idx ? null : idx);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-base font-black text-neutral-800 dark:text-white mb-4 uppercase tracking-wide">
        Frequently Asked Questions
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden bg-white dark:bg-neutral-900"
          >
            <button
              onClick={() => toggleFaq(idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <span className="font-semibold text-neutral-800 dark:text-white text-sm pr-6">{faq.question}</span>
              <span
                className={`transform transition-transform duration-200 shrink-0 ${activeFaq === idx ? 'rotate-180' : ''}`}
              >
                <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {activeFaq === idx && (
              <div className="px-5 pb-4 text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed border-t border-neutral-100 dark:border-neutral-700 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
