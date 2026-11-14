import React from 'react';
import SEO from '../../components/common/SEO';
import ExamDirectory from '../../features/exams/ExamDirectory';

const ExamsHubPage: React.FC = () => {
  return (
    <div className="pt-8">
      <SEO
        title="Entrance Exams 2026 India | JEE, NEET, EAMCET, CAT & GATE UPDATES"
        description="Stay updated with the latest entrance exam dates, syllabus changes, and result declarations for JEE, NEET, EAMCET, CAT, and GATE 2026 in India."
        keywords="entrance exams 2026, JEE Main registration, NEET exam dates, catalyst entrance exam, gate 2026 syllabus, mba cat exam india"
        canonical="https://www.careersha.com/exams"
      />
      <div className="page-container">
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
          Entrance Exams 2026 in India
        </h1>

        <ExamDirectory />

        {/* SEO Content Section */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
          <p>
            Stay updated on{' '}
            <strong>JEE, NEET, CAT, CLAT, and other entrance exam schedules, results, and announcements</strong> for
            2026. Get exam-specific preparation guides, mock tests, official registration links, and expert tips from
            one centralized hub designed for Indian aspirants.
          </p>
          <p>
            The landscape of <strong>Entrance Exams 2026 in India</strong> is highly competitive, serving as the primary
            gateway for students to enter prestigious national and state-level institutions. Whether you are aiming for
            Engineering, Medicine, Law, or Management, staying updated with the latest exam cycles is crucial for a
            successful admission journey.
          </p>

          <h2>Most Popular Entrance Exams in 2026</h2>
          <p>
            Among the hundreds of exams conducted annually, a few stand out due to their massive scale and the caliber
            of institutions they represent:
          </p>
          <ul>
            <li>
              <strong>JEE Main & JEE Advanced:</strong> The definitive exams for engineering aspirants seeking admission
              into IITs, NITs, and IIITs. JEE Main is also the eligibility test for JEE Advanced.
            </li>
            <li>
              <strong>NEET UG:</strong> The single national-level entrance exam for MBBS and BDS courses across all
              medical colleges in India, including AIIMS and JIPMER.
            </li>
            <li>
              <strong>CAT (Common Admission Test):</strong> The premier exam for management graduates aiming for the
              Indian Institutes of Management (IIMs).
            </li>
            <li>
              <strong>CLAT (Common Law Admission Test):</strong> For students aspiring to enter National Law
              Universities (NLUs) for undergraduate and postgraduate law programs.
            </li>
          </ul>

          <h2>Key Updates for the 2026 Exam Cycle</h2>
          <p>
            Staying informed about the <strong>exam dates, syllabus changes, and result declarations</strong> is the
            first step toward preparation. Most major exams like JEE and NEET follow a strict timeline, with
            registrations usually starting months in advance. It is essential to monitor the official websites of the
            NTA (National Testing Agency) and other governing bodies for the most accurate information.
          </p>

          <h2>Preparation Tips and Resources</h2>
          {/* TODO: Remove the roadmap content */}
          <p>
            Success in these entrance exams requires more than just hard work; it requires a strategic approach.
            Utilizing <strong>previous years' question papers</strong>, mock tests, and standardized study materials can
            significantly boost your performance. CareerSha provides detailed roadmaps and toolkits to help you navigate
            these challenges effectively.
          </p>

          <p>
            Explore the full list of exams below to find detailed information on patterns, eligibility criteria, and
            important dates for the 2026 session. Let CareerSha be your guide to choosing the right exam and securing
            your future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamsHubPage;
