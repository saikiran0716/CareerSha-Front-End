import React from 'react';
import SEO from '../components/SEO/SEO';
import { navigationData } from '../data/navigationData';
import { Link } from 'react-router-dom';

const ExamsHubPage: React.FC = () => {
  const exams = navigationData.find(n => n.slug === 'exams')?.sections[0].links || [];

  return (
    <div className="pt-8">
      <SEO 
        title="Entrance Exams 2026 India - JEE, NEET, EAMCET Updates | CareerSha"
        description="Get latest updates on JEE, NEET, EAMCET exams including syllabus, dates and results."
        canonical="https://careersha.com/exams"
      />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Entrance Exams 2026 in India</h1>
        
        {/* SEO Content Section */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
            <p>The landscape of <strong>Entrance Exams 2026 in India</strong> is highly competitive, serving as the primary gateway for students to enter prestigious national and state-level institutions. Whether you are aiming for Engineering, Medicine, Law, or Management, staying updated with the latest exam cycles is crucial for a successful admission journey.</p>
            
            <h2>Most Popular Entrance Exams in 2026</h2>
            <p>Among the hundreds of exams conducted annually, a few stand out due to their massive scale and the caliber of institutions they represent:</p>
            <ul>
                <li><strong>JEE Main & JEE Advanced:</strong> The definitive exams for engineering aspirants seeking admission into IITs, NITs, and IIITs. JEE Main is also the eligibility test for JEE Advanced.</li>
                <li><strong>NEET UG:</strong> The single national-level entrance exam for MBBS and BDS courses across all medical colleges in India, including AIIMS and JIPMER.</li>
                <li><strong>CAT (Common Admission Test):</strong> The premier exam for management graduates aiming for the Indian Institutes of Management (IIMs).</li>
                <li><strong>CLAT (Common Law Admission Test):</strong> For students aspiring to enter National Law Universities (NLUs) for undergraduate and postgraduate law programs.</li>
            </ul>

            <h2>Key Updates for the 2026 Exam Cycle</h2>
            <p>Staying informed about the <strong>exam dates, syllabus changes, and result declarations</strong> is the first step toward preparation. Most major exams like JEE and NEET follow a strict timeline, with registrations usually starting months in advance. It is essential to monitor the official websites of the NTA (National Testing Agency) and other governing bodies for the most accurate information.</p>
            
            <h2>Preparation Tips and Resources</h2>
            <p>Success in these entrance exams requires more than just hard work; it requires a strategic approach. Utilizing <strong>previous years' question papers</strong>, mock tests, and standardized study materials can significantly boost your performance. CareerSha provides detailed roadmaps and toolkits to help you navigate these challenges effectively.</p>
            
            <p>Explore the full list of exams below to find detailed information on patterns, eligibility criteria, and important dates for the 2026 session. Let CareerSha be your guide to choosing the right exam and securing your future.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {exams.map((exam) => (
            <Link 
              key={exam.url} 
              to={exam.url}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{exam.name}</h3>
              <p className="text-sm text-slate-500">View Pattern, Syllabus & Dates</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamsHubPage;
