import React from 'react';
import { ArrowUp, MessageSquare, Bookmark, Eye } from 'lucide-react';

interface QuestionCardProps {
  id: string;
  author: {
    name: string;
    avatarInitials: string;
    avatarBg: string;
  };
  examTag: string;
  timeAgo: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  comments: number;
  views: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  author,
  examTag,
  timeAgo,
  title,
  content,
  tags,
  upvotes,
  comments,
  views
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${author.avatarBg}`}>
          {author.avatarInitials}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white text-sm">{author.name}</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
              {examTag}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">• {timeAgo}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
          {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
          {content}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors group">
            <div className="p-1.5 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <ArrowUp size={18} />
            </div>
            {upvotes}
          </button>
          
          <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-sm transition-colors group">
            <div className="p-1.5 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
              <MessageSquare size={18} />
            </div>
            {comments}
          </button>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <Eye size={16} />
            {views} views
          </span>
          <button className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
