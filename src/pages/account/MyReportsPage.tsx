import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, FileText, Trash2 } from 'lucide-react';
import AccountLayout, { EmptyState } from '../../features/account/AccountLayout';
import { formatDate } from '../../features/account/accountNav';
import { useUserData } from '../../hooks/useUserData';
import { userData } from '../../services/userDataService';

const MyReportsPage: React.FC = () => {
  const reports = useUserData(() => userData.getReports());

  return (
    <AccountLayout title="My Reports" description="Career guidance reports from the AI counsellor.">
      {reports.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-5 w-5" />}
          title="No reports yet"
          text="Fill in the career counselling form on the homepage and your personalised report will be saved here."
          cta={{ to: '/', label: 'Get my career report' }}
        />
      ) : (
        <ul className="space-y-3">
          {reports.map((r) => {
            const top = r.recommendation.recommendations?.[0]?.title;
            return (
              <li key={r.id} className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
                <Link to={`/account/reports/${r.id}`} className="flex min-w-0 flex-1 items-center gap-4 group">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-base text-neutral-900 group-hover:text-primary-700">
                      {top ? `Top match: ${top}` : 'Career report'}
                    </h2>
                    <p className="truncate text-sm text-neutral-500">
                      {[r.profile.exam?.examName, r.profile.preferences?.stream, formatDate(r.createdAt)]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                  <ChevronRight className="ml-auto h-5 w-5 shrink-0 text-neutral-400 group-hover:text-primary-700" />
                </Link>
                <button
                  onClick={() => userData.removeReport(r.id)}
                  aria-label="Delete report"
                  className="rounded-lg p-2 text-neutral-500 hover:bg-danger-50 hover:text-danger-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </AccountLayout>
  );
};

export default MyReportsPage;
