import React, { useState } from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/common/SEO';
import { useCollegeDetail } from '../../features/colleges/detail/useCollegeDetail';
import type { CollegeTab } from '../../features/colleges/detail/constants';
import CollegeHeader from '../../features/colleges/detail/CollegeHeader';
import CollegeSidebar from '../../features/colleges/detail/CollegeSidebar';
import OverviewTab from '../../features/colleges/detail/OverviewTab';
import PlacementsTab from '../../features/colleges/detail/PlacementsTab';
import AdmissionsTab from '../../features/colleges/detail/AdmissionsTab';
import CampusLifeTab from '../../features/colleges/detail/CampusLifeTab';
import GalleryTab from '../../features/colleges/detail/GalleryTab';

const TAB_COMPONENTS: Record<CollegeTab, React.FC<{ view: ReturnType<typeof useCollegeDetail> }>> = {
  Overview: OverviewTab,
  Placements: PlacementsTab,
  Admissions: AdmissionsTab,
  'Campus Life': CampusLifeTab,
  Gallery: GalleryTab,
};

const CollegeDetailPage: React.FC = () => {
  const { collegeName } = useParams<{ collegeName: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const view = useCollegeDetail(collegeName, (location.state as any)?.college);
  const { d, pc, loading, name, locVal, typeVal } = view;
  const [activeTab, setActiveTab] = useState<CollegeTab>('Overview');

  if (!loading && !d && !pc) {
    return <Navigate to="/404" replace />;
  }

  const ActiveTab = TAB_COMPONENTS[activeTab];

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950 overflow-x-hidden">
      <SEO
        title={`${name} Admission, Fees, Courses & Placement 2026`}
        description={`Check ${name} details including courses, fees, placements, and admission process. Get complete information on 2026 admissions.`}
        keywords={`${name}, ${locVal}, ${typeVal}, college details, placements, admissions, 2026`}
      />

      {/* While loading, sections show skeleton placeholders */}
      <div>
        {/* ── TOP NAV ── */}
        <div className="bg-gradient-to-r from-primary-800 to-secondary-800 sticky top-0 z-50">
          <div className="max-w-[1300px] mx-auto px-6 h-12 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-primary-200 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} /> Back to Results
            </button>
          </div>
        </div>

        <CollegeHeader view={view} activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-[1300px] mx-auto px-6 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
            <div className="space-y-5">
              <ActiveTab view={view} />
            </div>
            <CollegeSidebar view={view} setActiveTab={setActiveTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetailPage;
