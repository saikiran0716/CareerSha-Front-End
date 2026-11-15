import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { ExamConfig } from './types';
import { PREDICTOR_YEAR } from './exams';
import PredictorForm from './components/PredictorForm';
import PredictorContent from './components/PredictorContent';
import RankTables from './components/RankTables';
import { getRankModel } from './rankModel';

const SITE_URL = 'https://www.careersha.com';

/** Full rank-predictor page for one exam, driven entirely by its config. */
const RankPredictor: React.FC<{ exam: ExamConfig }> = ({ exam }) => {
  const { name, slug, admissionFor, seo } = exam;
  const model = getRankModel(slug);
  const [marks, setMarks] = useState<number | null>(null);

  const highlights = [
    `Instant expected rank and percentile from your ${name} score`,
    model?.categories.length
      ? `Category-wise ranks (${model.categories.map((c) => c.id).join(', ')})`
      : `Find your chances at top ${admissionFor} colleges`,
    'Full marks-vs-rank table and marks needed for every target rank',
  ];

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 min-h-screen font-sans transition-colors duration-300">
      <SEO
        title={`${name} Rank Predictor ${PREDICTOR_YEAR} | ${seo.titleSuffix}`}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`${SITE_URL}/rank-estimator/${slug}`}
      />

      {/* Hero */}
      <div className="bg-primary-50/50 dark:bg-primary-950/20 pt-12 pb-24 relative px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white tracking-tight leading-tight">
            {name} Rank Predictor <span className="text-accent-600">{PREDICTOR_YEAR}</span>
          </h1>
          <ul className="space-y-3">
            {highlights.map((text) => (
              <li key={text} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success-600 dark:text-success-500 flex-shrink-0 mt-0.5" />
                <span className="text-neutral-700 dark:text-neutral-300 font-medium text-[15px]">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Form card overlapping the hero */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative -mt-16 z-10 mb-16">
        <PredictorForm exam={exam} onPredict={setMarks} />
      </div>

      {model && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
          <RankTables exam={exam} model={model} highlightMarks={marks} />
        </div>
      )}

      <PredictorContent exam={exam} />
    </div>
  );
};

export default RankPredictor;
