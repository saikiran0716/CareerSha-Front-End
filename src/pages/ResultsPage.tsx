import React from 'react';
import SEO from '../components/SEO/SEO';
import { ResultsView } from '../components/ExploreViews';

const ResultsPage: React.FC<{ onAskAI: (topic: string) => void }> = ({ onAskAI }) => {
  return (
    <div className="pt-8">
      <SEO
        title="Exam Results 2026 - JEE, NEET, EAMCET Results | CareerSha"
        description="Check latest exam results for JEE, NEET, EAMCET and other entrance exams."
        canonical="https://www.careersha.com/results"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center uppercase tracking-tight">Exam Results 2026 India</h1>

        {/* SEO Content Section */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <p>Checking your <strong>Exam Results 2026</strong> is the final and most critical step in your academic journey. At CareerSha, we provide a centralized portal to access the latest results for national and state-level entrance exams, including <strong>JEE Main</strong>, <strong>NEET UG</strong>, and <strong>EAMCET</strong>. We understand the anxiety and excitement that comes with result day, and our goal is to ensure you have quick, reliable access to your scores.</p>

          <h2>How to Check Your 2026 Entrance Exam Results</h2>
          <p>Most national-level results are hosted on official government portals (like NTA or individual exam bodies). To check your result, you typically need your <strong>Application Number</strong> and <strong>Date of Birth</strong>. Following these steps will help you access your scorecard without hassle:</p>
          <ol>
            <li>Visit the official result link provided in our interactive list below.</li>
            <li>Enter your credentials accurately as per your admit card.</li>
            <li>Download and print your <strong>Rank Card</strong> or Scorecard for future counseling rounds.</li>
          </ol>

          <h2>Understanding Your Rank and Percentile</h2>
          <p>For exams like JEE Main, results are often declared in terms of <strong>NTA Percentile Scores</strong>. It is important to distinguish between your percentile and your actual All India Rank (AIR). Your percentile indicates the percentage of candidates who scored equal to or below you, while your AIR determines your seat allocation in the counseling process. Use our <a href="/rank-estimator" className="text-[#b91c1c] font-bold">Rank Predictor</a> to understand what your score means for your admission chances.</p>

          <h2>Next Steps After Results: Counseling and Admissions</h2>
          <p>Once your results are out, the next phase is <strong>Online Counseling</strong> (JoSAA, MCC, or State-level counseling). This is where you will fill in your choices for colleges and branches. Having your result handy and understanding your rank category (General, OBC, SC, ST, EWS) is vital for securing the best possible seat. CareerSha's <strong>College Matcher</strong> tool can help you identify which colleges aligned with your 2026 result.</p>

          <p>Stay tuned to this page for real-time updates on result announcement dates and direct links to official portals. We wish all 2026 aspirants the very best of luck with their results!</p>
        </div>

        <ResultsView onAskAI={onAskAI} />
      </div>
    </div>
  );
};

export default ResultsPage;
