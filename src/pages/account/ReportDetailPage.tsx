import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/common/SEO';
import PersonalizedReport from '../../features/report/PersonalizedReport';
import { useUserData } from '../../hooks/useUserData';
import { userData } from '../../services/userDataService';
import NotFound from '../NotFound';

/** /account/reports/:reportId — re-opens a saved career report. */
const ReportDetailPage: React.FC = () => {
  const { reportId = '' } = useParams();
  const navigate = useNavigate();
  const report = useUserData(() => userData.getReport(reportId));

  if (!report) return <NotFound />;

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8">
      <SEO title="Career Report" robots="noindex, nofollow" />
      <Link
        to="/account/reports"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-primary-700 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> All reports
      </Link>
      <PersonalizedReport
        aiResponse={report.recommendation}
        profile={report.profile}
        onReset={() => navigate('/account/reports')}
      />
    </div>
  );
};

export default ReportDetailPage;
