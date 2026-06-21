import React, { useState } from 'react';
import QuestionCard from './QuestionCard';
import { ChevronDown } from 'lucide-react';

const Feed: React.FC = () => {
  const [activeTab, setActiveTab] = useState('For You');
  
  const tabs = ['For You', 'Trending', 'Latest', 'Unanswered'];

  // Mock data based on the image provided
  const questions = [
    {
      id: '1',
      author: {
        name: 'Rahul Sharma',
        avatarInitials: 'R',
        avatarBg: 'bg-emerald-500'
      },
      examTag: 'IIT JEE',
      timeAgo: '2h ago',
      title: 'Which NIT can I get with 18k rank in JEE Main?',
      content: 'I scored 18,250 rank in JEE Main 2024 (General Category). Can you suggest the best NITs and branches I can expect?',
      tags: ['JEE Main', 'NITs', 'College Admission'],
      upvotes: 23,
      comments: 18,
      views: '2.1K'
    },
    {
      id: '2',
      author: {
        name: 'Priya Verma',
        avatarInitials: 'P',
        avatarBg: 'bg-purple-500'
      },
      examTag: 'BITSAT',
      timeAgo: '4h ago',
      title: 'BITS Pilani vs IIIT Hyderabad - Which is better for CSE?',
      content: 'Confused between BITS Pilani and IIIT Hyderabad for CSE. Please help me compare based on placements, campus life, fees, and exposure.',
      tags: ['College Comparison', 'CSE', 'BITSAT'],
      upvotes: 31,
      comments: 24,
      views: '3.4K'
    },
    {
      id: '3',
      author: {
        name: 'Ankit Yadav',
        avatarInitials: 'A',
        avatarBg: 'bg-amber-500'
      },
      examTag: 'College Life',
      timeAgo: '6h ago',
      title: 'How is hostel life in DTU?',
      content: 'I got DTU in round 1. I wanted to know how is the hostel life, mess food, and overall campus culture?',
      tags: ['DTU', 'Hostel Life', 'Campus Life'],
      upvotes: 19,
      comments: 16,
      views: '1.6K'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 border border-slate-100 dark:border-slate-800 flex overflow-x-auto hide-scrollbar shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {questions.map(q => (
          <QuestionCard key={q.id} {...q} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
          Load More
          <ChevronDown size={18} />
        </button>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Feed;
