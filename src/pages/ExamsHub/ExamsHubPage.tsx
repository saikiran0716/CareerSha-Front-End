import React, { useState } from 'react';
import { Search, ChevronDown, LayoutGrid, List, CopyPlus } from 'lucide-react';
import { ExamsSidebarFilter } from './ExamsSidebarFilter';
import { ExamsRightSidebar } from './ExamsRightSidebar';
import { ExamCard, ExamData } from './ExamCard';
import { Link } from 'react-router-dom';

const MOCK_EXAMS: ExamData[] = [
  {
    id: '1',
    title: 'JEE Main 2024',
    isTopExam: true,
    category: 'Engineering',
    description: 'National level entrance exam for admission to B.E./B.Tech courses in NITs, IIITs, and other CFTIs.',
    conductingBody: 'NTA',
    examMode: 'Online',
    nextExamDate: '27 Jan - 31 Jan, 2024',
    logoText: 'JEE\nMAIN',
    logoBg: 'bg-[#1e3a8a]',
  },
  {
    id: '2',
    title: 'NEET UG 2024',
    isTopExam: true,
    category: 'Medical',
    description: 'National Eligibility cum Entrance Test (UG) for admission to MBBS, BDS, AYUSH and other undergraduate medical courses in India.',
    conductingBody: 'NTA',
    examMode: 'Offline',
    nextExamDate: '5 May, 2024',
    logoText: 'NEET',
    logoBg: 'bg-[#059669]',
  },
  {
    id: '3',
    title: 'CUET UG 2024',
    category: 'University',
    description: 'Common University Entrance Test (UG) for admission to undergraduate courses in Central, State, and other participating universities.',
    conductingBody: 'NTA',
    examMode: 'Online',
    nextExamDate: '15 May - 24 May, 2024',
    logoText: 'CUET',
    logoBg: 'bg-[#7c3aed]',
  },
  {
    id: '4',
    title: 'GATE 2024',
    category: 'Engineering',
    description: 'Graduate Aptitude Test in Engineering for admission to M.Tech, PhD programs and recruitment in PSUs.',
    conductingBody: 'IISc Bangalore',
    examMode: 'Online',
    nextExamDate: '3, 4, 10 & 11 Feb, 2024',
    logoText: 'GATE',
    logoBg: 'bg-[#0891b2]',
  },
  {
    id: '5',
    title: 'CAT 2024',
    isTopExam: true,
    category: 'Management',
    description: 'Common Admission Test for admission to MBA/PGDM programs in IIMs and other top B-schools.',
    conductingBody: 'IIM Calcutta',
    examMode: 'Online',
    nextExamDate: '24 Nov, 2024',
    logoText: 'CAT',
    logoBg: 'bg-[#ea580c]',
  }
];

const ExamsHubPage = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-6 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-4 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>›</span>
            <span className="text-slate-800">Exams</span>
          </div>

          <div className="w-full">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-12">
              
              {/* Title Section */}
              <div className="flex-1 shrink-0 max-w-lg">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Explore Exams</h1>
                <p className="text-[14px] text-slate-500">
                  Find and prepare for India's top entrance exams. Filter, compare and get all the details you need.
                </p>
              </div>

              {/* Search Bar Block */}
              <div className="flex-[1.8] w-full max-w-[800px]">
                <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                  <div className="flex-1 w-full flex items-center bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <div className="flex items-center pl-3 pr-2 shrink-0">
                      <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search exams by name, conducting body, or purpose..."
                      className="w-full h-10 bg-transparent text-[14px] outline-none placeholder:text-slate-400 font-medium"
                    />
                    <button className="h-10 px-6 bg-[#004EEB] hover:bg-blue-700 text-white text-[13px] font-bold rounded-lg ml-2 transition-colors shrink-0">
                      Search
                    </button>
                  </div>

                  <button className="w-full md:w-auto h-12 md:h-auto py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-bold rounded-xl transition-colors shrink-0 flex items-center justify-center gap-2 shadow-sm">
                    <CopyPlus className="w-4 h-4 text-blue-600" />
                    Compare (0)
                  </button>
                </div>

                {/* Popular Searches */}
                <div className="flex items-center gap-3 mt-4 flex-wrap">
                  <span className="text-[12px] font-bold text-slate-700">Popular Searches:</span>
                  {['JEE Main', 'NEET', 'NEET PG', 'CAT', 'GATE', 'UPSC', 'CLAT', 'NDA'].map((term, idx) => (
                    <span key={idx} className="px-3 py-1.5 text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-full cursor-pointer hover:bg-slate-100 transition-colors">
                      {term}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">

          <ExamsSidebarFilter />

          {/* Middle Column (Exams List) */}
          <div className="flex-1 w-full min-w-0">
            {/* List Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <p className="text-[13px] text-slate-600 font-medium">
                Showing <span className="font-bold text-slate-900">1-10</span> of <span className="font-bold text-slate-900">120+</span> exams
              </p>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold text-slate-700">Sort by:</span>
                  <div className="relative border border-slate-200 rounded-lg bg-white h-9 flex items-center px-3 cursor-pointer hover:bg-slate-50">
                    <span className="text-[12px] font-bold text-slate-800 mr-6">Popularity</span>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-[#004EEB] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-[#004EEB] text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Exam Cards */}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
              {MOCK_EXAMS.map(exam => (
                <ExamCard key={exam.id} exam={exam} />
              ))}
            </div>

            {/* Load More */}
            <div className="mt-8 flex justify-center">
              <button className="px-6 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-[13px] font-bold rounded-full transition-colors flex items-center gap-2 shadow-sm">
                View More Exams
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          <ExamsRightSidebar />

        </div>
      </div>
    </div>
  );
};

export default ExamsHubPage;
