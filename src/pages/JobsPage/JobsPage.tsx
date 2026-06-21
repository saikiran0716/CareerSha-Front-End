import React, { useState } from 'react';
import { Search, MapPin, LayoutGrid, List, Briefcase, UploadCloud } from 'lucide-react';
import { JobsSidebarFilter } from './JobsSidebarFilter';
import { JobsRightSidebar } from './JobsRightSidebar';
import { JobCard, JobData } from './JobCard';

// Mock Data
const MOCK_JOBS: JobData[] = [
    {
        id: '1',
        company: 'Google',
        role: 'Software Engineer',
        isNew: true,
        location: 'Bengaluru, Karnataka',
        type: 'Full-time',
        experience: '2-4 Yrs',
        salary: '₹18 - 28 LPA',
        workModel: 'Hybrid',
        tags: ['Java', 'Data Structures', 'System Design'],
        postedAt: '2h ago',
        logoBg: 'bg-white text-blue-500 font-bold text-2xl',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
    },
    {
        id: '2',
        company: 'Microsoft',
        role: 'Data Analyst',
        isNew: true,
        location: 'Hyderabad, Telangana',
        type: 'Full-time',
        experience: '1-3 Yrs',
        salary: '₹10 - 16 LPA',
        workModel: 'Hybrid',
        tags: ['SQL', 'Excel', 'Power BI', 'Python'],
        postedAt: '3h ago',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
    },
    {
        id: '3',
        company: 'Amazon',
        role: 'Product Manager',
        isHot: true,
        location: 'Bengaluru, Karnataka',
        type: 'Full-time',
        experience: '3-5 Yrs',
        salary: '₹25 - 40 LPA',
        workModel: 'On-site',
        tags: ['Product Strategy', 'Analytics', 'SQL', 'Roadmap'],
        postedAt: '1d ago',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
    },
    {
        id: '4',
        company: 'Swiggy',
        role: 'UX Designer',
        isNew: true,
        location: 'Pune, Maharashtra',
        type: 'Full-time',
        experience: '2-5 Yrs',
        salary: '₹12 - 20 LPA',
        workModel: 'Hybrid',
        tags: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
        postedAt: '2d ago',
        logoBg: 'bg-orange-500 text-white font-bold',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg'
    },
    {
        id: '5',
        company: 'Deloitte',
        role: 'Business Analyst',
        isNew: true,
        location: 'Gurugram, Haryana',
        type: 'Full-time',
        experience: '1-3 Yrs',
        salary: '₹8 - 14 LPA',
        workModel: 'Hybrid',
        tags: ['Excel', 'SQL', 'Requirement Gathering', 'Business Analysis'],
        postedAt: '2d ago',
        logoBg: 'bg-black text-white font-bold',
    }
];

const JobsPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-8">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">

                        {/* Left Side: Header & Search */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
                                {/* Header */}
                                <div className="flex items-center gap-4 shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                                        <Briefcase className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Find Your Dream Job</h1>
                                        <p className="text-slate-500 text-[13px] hidden sm:block">Explore opportunities & build your future.</p>
                                    </div>
                                </div>

                                {/* Search Bar & Popular Searches */}
                                <div className="flex-1 w-full max-w-[780px]">
                                    <div className="bg-white rounded-[14px] shadow-sm border border-slate-200/80 p-1 flex flex-col md:flex-row items-center w-full relative z-20">
                                        <div className="flex-[1.2] flex items-center gap-2 px-3 h-10 w-full hover:bg-slate-50/80 rounded-xl transition-colors cursor-text">
                                            <Search className="w-4 h-4 text-slate-400 shrink-0" />
                                            <input 
                                                type="text" 
                                                placeholder="Job title, role or keyword" 
                                                className="w-full h-full text-[13px] font-medium outline-none placeholder:text-slate-400 bg-transparent"
                                            />
                                        </div>
                                        <div className="hidden md:block w-px h-5 bg-slate-200 mx-1"></div>
                                        <div className="flex-[0.8] flex items-center gap-2 px-3 h-10 w-full hover:bg-slate-50/80 rounded-xl transition-colors border-t md:border-t-0 border-slate-100 cursor-text">
                                            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                            <input 
                                                type="text" 
                                                placeholder="Location" 
                                                className="w-full h-full text-[13px] font-medium outline-none placeholder:text-slate-400 bg-transparent"
                                            />
                                        </div>
                                        <div className="hidden md:block w-px h-5 bg-slate-200 mx-1"></div>
                                        <div className="w-full md:w-32 h-10 border-t md:border-t-0 border-slate-100 relative hover:bg-slate-50/80 rounded-xl transition-colors">
                                            <select className="w-full h-full pl-2 pr-6 text-[13px] font-medium text-slate-600 outline-none bg-transparent cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiM2NDc0OGIiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTkgOWwtNyA3LTctNyIvPjwvc3ZnPg==')] bg-no-repeat bg-[position:calc(100%-8px)_center]">
                                                <option value="">Job Types</option>
                                                <option value="full-time">Full-time</option>
                                                <option value="part-time">Part-time</option>
                                                <option value="internship">Internship</option>
                                            </select>
                                        </div>
                                        <button className="w-full md:w-auto h-10 px-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[13px] rounded-[10px] transition-colors shadow-sm md:ml-1 mt-1 md:mt-0 whitespace-nowrap">
                                            Search Jobs
                                        </button>
                                    </div>

                                    {/* Popular Searches */}
                                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                                        <span className="text-[11px] font-bold text-slate-700 mr-1">Popular:</span>
                                        {['Software Engineer', 'Data Analyst', 'Marketing', 'UX Designer'].map((term, idx) => (
                                            <span key={idx} className="px-2.5 py-1 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-full cursor-pointer hover:bg-slate-100 transition-colors">
                                                {term}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Upload Resume Widget */}
                        <div className="w-full lg:w-[340px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 relative overflow-hidden hidden md:block">
                            <div className="relative z-10 w-[65%]">
                                <h3 className="font-bold text-slate-800 text-[15px] mb-1">Find Jobs That Match You</h3>
                                <p className="text-[12px] text-slate-500 mb-1 leading-snug">Upload your resume and let us show the best jobs for you.</p>
                            </div>
                            {/* Decorative Profile Card Graphic */}
                            <div className="absolute right-[-10px] top-[10px] w-48 h-48 pointer-events-none transform scale-[0.65] origin-top-right">
                                <div className="w-32 h-32 bg-indigo-50/80 rounded-full absolute top-2 right-4"></div>
                                <div className="absolute top-6 right-8 w-24 h-28 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 p-3 transform rotate-[-2deg]">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 mb-3 flex items-center justify-center mx-auto overflow-hidden">
                                        <div className="w-full h-full bg-[url('https://api.dicebear.com/7.x/notionists/svg?seed=Felix')] bg-cover bg-center"></div>
                                    </div>
                                    <div className="w-full h-1.5 bg-slate-100 rounded-full mb-2"></div>
                                    <div className="w-4/5 h-1.5 bg-slate-100 rounded-full mb-3"></div>
                                    <div className="w-2/3 h-1 bg-slate-100 rounded-full mb-1"></div>
                                    <div className="w-1/2 h-1 bg-slate-100 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-10 right-4 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <div className="absolute top-4 left-6 w-3 h-3 bg-amber-400 rounded-full shadow-sm"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Left Sidebar - Filters */}
                    <div className="hidden lg:block lg:col-span-3">
                        <JobsSidebarFilter />
                    </div>

                    {/* Center Content - Job Listings */}
                    <div className="lg:col-span-6 flex flex-col gap-5">

                        {/* Tabs and Controls */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-px gap-4 sm:gap-0">
                            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                                {[
                                    { id: 'all', label: 'All Jobs', count: '12,450' },
                                    { id: 'recommended', label: 'Recommended', count: '245' },
                                    { id: 'saved', label: 'Saved Jobs', count: '18' },
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`pb-3 text-[14px] font-bold transition-colors whitespace-nowrap border-b-2 relative -bottom-px
                                        ${activeTab === tab.id ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-800'}`}
                                    >
                                        {tab.label} <span className="font-normal opacity-70">({tab.count})</span>
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 shrink-0 pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] text-slate-500 font-medium">Sort by:</span>
                                    <select className="text-[13px] font-bold text-slate-800 outline-none bg-transparent cursor-pointer appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0IiBzdHJva2U9IiMxbWUyZTMiPjxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTkgOWwtNyA3LTctNyIvPjwvc3ZnPg==')] bg-no-repeat bg-[position:calc(100%-4px)_center] pr-4">
                                        <option>Most Relevant</option>
                                        <option>Newest First</option>
                                        <option>Highest Salary</option>
                                    </select>
                                </div>
                                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-sm">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Job Cards */}
                        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                            {MOCK_JOBS.map(job => (
                                <JobCard key={job.id} job={job} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-[14px]">1</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-[14px]">2</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-[14px]">3</button>
                            <span className="w-6 text-center text-slate-400">...</span>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bold text-[14px]">50</button>
                            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar - Widgets */}
                    <div className="hidden lg:block lg:col-span-3">
                        <JobsRightSidebar />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobsPage;
