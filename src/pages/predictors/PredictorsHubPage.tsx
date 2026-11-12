import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardEdit, BarChart4, Target, Flag } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { PREDICTORS_DATA } from '../../data/predictors/predictorsHub';

const PredictorsHubPage = () => {
  return (
    <div className="bg-neutral-50 min-h-screen pb-20">
      <SEO
        title="Rank & College Predictors 2026 | JEE, NEET, CAT, GATE & More"
        description="Use free rank predictors and college predictors for JEE Main, JEE Advanced, NEET, CAT, GATE, EAMCET and more. Estimate your rank and admission chances for 2026."
        keywords="rank predictor, college predictor, jee rank predictor, neet rank predictor, cat percentile predictor, gate rank predictor"
      />
      {/* Hero Section */}
      <div className="bg-white border-b border-neutral-200 pt-10 pb-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-neutral-900 mb-2 tracking-tight">Predict Your Future</h1>
          <p className="text-[14px] text-neutral-500 max-w-2xl leading-relaxed">
            Our intelligent predictors help you make informed decisions about your career, college and exams based on
            your profile.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {PREDICTORS_DATA.map((item) => (
            <Link
              key={item.id}
              to={item.route}
              className="bg-white rounded-[14px] p-4 shadow-[0_2px_8px_rgb(0,0,0,0.03)] border border-neutral-100 flex flex-col h-full hover:shadow-[0_8px_24px_rgb(0,0,0,0.06)] hover:-translate-y-1 hover:border-neutral-200 transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <item.icon className={item.iconClass} />
                </div>
                <h3 className="text-[14px] font-bold text-neutral-900 leading-tight group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-1">{item.description}</p>

              {/* Action Link Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-neutral-50">
                <span className={`text-xs font-bold ${item.buttonColor.split(' ')[0]}`}>Explore now</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.iconBg}`}>
                  <ArrowRight className={`w-3 h-3 ${item.buttonColor.split(' ')[0]}`} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* How Predictors Work Section */}
        <div className="mt-10 bg-white rounded-[20px] p-6 lg:p-8 shadow-[0_2px_8px_rgb(0,0,0,0.04)] border border-neutral-100">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="lg:w-40 shrink-0">
              <h2 className="text-[18px] font-bold text-neutral-900 leading-tight">
                How Predictors
                <br className="hidden lg:block" /> Work?
              </h2>
            </div>

            <div className="flex-1 w-full flex flex-col md:flex-row items-start justify-between gap-5 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-[1px] border-t border-dashed border-neutral-300 z-0"></div>

              {/* Step 1 */}
              <div className="relative z-10 flex flex-col md:items-center text-left md:text-center flex-1">
                <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-3 mx-0 md:mx-auto shadow-sm border border-white">
                  <ClipboardEdit className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-start md:justify-center gap-2 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-primary-100 text-primary-600 text-xs font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <h4 className="font-bold text-[13px] text-neutral-900">Answer Questions</h4>
                </div>
                <p className="text-xs text-neutral-500 max-w-[160px] leading-relaxed">
                  Fill out a short questionnaire about your interests, skills and goals.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative z-10 flex flex-col md:items-center text-left md:text-center flex-1">
                <div className="w-10 h-10 bg-secondary-50 text-secondary-600 rounded-full flex items-center justify-center mb-3 mx-0 md:mx-auto shadow-sm border border-white">
                  <BarChart4 className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-start md:justify-center gap-2 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-secondary-100 text-secondary-600 text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h4 className="font-bold text-[13px] text-neutral-900">AI Analysis</h4>
                </div>
                <p className="text-xs text-neutral-500 max-w-[160px] leading-relaxed">
                  Our AI analyzes your profile and matches it with thousands of data points.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col md:items-center text-left md:text-center flex-1">
                <div className="w-10 h-10 bg-accent-50 text-accent-600 rounded-full flex items-center justify-center mb-3 mx-0 md:mx-auto shadow-sm border border-white">
                  <Target className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-start md:justify-center gap-2 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-accent-100 text-accent-600 text-xs font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <h4 className="font-bold text-[13px] text-neutral-900">Get Results</h4>
                </div>
                <p className="text-xs text-neutral-500 max-w-[160px] leading-relaxed">
                  Receive personalized recommendations and detailed insights.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col md:items-center text-left md:text-center flex-1">
                <div className="w-10 h-10 bg-success-50 text-success-600 rounded-full flex items-center justify-center mb-3 mx-0 md:mx-auto shadow-sm border border-white">
                  <Flag className="w-4 h-4" />
                </div>
                <div className="flex items-center justify-start md:justify-center gap-2 mb-1.5">
                  <span className="w-4 h-4 rounded-full bg-success-100 text-success-600 text-xs font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <h4 className="font-bold text-[13px] text-neutral-900">Plan Your Future</h4>
                </div>
                <p className="text-xs text-neutral-500 max-w-[160px] leading-relaxed">
                  Use insights to take confident decisions about your career and education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictorsHubPage;
