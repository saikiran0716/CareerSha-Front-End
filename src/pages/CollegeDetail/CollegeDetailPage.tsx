import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { staticColleges } from '../../data/staticColleges';
import HeroSection from '../../components/CollegeDetail/HeroSection';
import StickyNav from '../../components/CollegeDetail/StickyNav';
import OverviewTab from '../../components/CollegeDetail/OverviewTab';
import RightSidebar from '../../components/CollegeDetail/RightSidebar';

const CollegeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Overview');

  // Find college details by id. Fallback to first if not found for testing.
  const college = staticColleges.find(c => c.id === id) || staticColleges[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!college) return <div className="p-8 text-center">College not found</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 font-sans py-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-slate-500 font-medium mb-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <Link to="/colleges" className="hover:text-blue-600 transition-colors">Explore Colleges</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-slate-800 dark:text-slate-200">{college.name}</span>
        </div>

        {/* Hero Section */}
        <HeroSection college={college} />

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Left/Center Column - Tabs & Content */}
          <div className="flex-1 w-full min-w-0">
            <StickyNav activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {activeTab === 'Overview' && <OverviewTab college={college} />}
            {activeTab !== 'Overview' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 font-medium">
                Content for {activeTab} is under construction.
              </div>
            )}
          </div>

          {/* Right Sidebar Column */}
          <div className="w-full lg:w-[320px] shrink-0">
            <RightSidebar college={college} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CollegeDetailPage;
