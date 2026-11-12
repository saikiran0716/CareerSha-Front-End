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
  views,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-100 dark:border-neutral-800 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${author.avatarBg}`}
        >
          {author.avatarInitials}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900 dark:text-white text-sm">{author.name}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary-50 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
              {examTag}
            </span>
          </div>
          <span className="text-xs text-neutral-500 font-medium">• {timeAgo}</span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 leading-snug">{title}</h2>
        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed line-clamp-2">{content}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold text-sm transition-colors group">
            <div className="p-1.5 rounded-lg group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
              <ArrowUp size={18} />
            </div>
            {upvotes}
          </button>

          <button className="flex items-center gap-1.5 text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 font-semibold text-sm transition-colors group">
            <div className="p-1.5 rounded-lg group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
              <MessageSquare size={18} />
            </div>
            {comments}
          </button>
        </div>

        <div className="flex items-center gap-4 text-neutral-500 text-sm font-medium">
          <span className="flex items-center gap-1.5">
            <Eye size={16} />
            {views} views
          </span>
          <button className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <Bookmark size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
