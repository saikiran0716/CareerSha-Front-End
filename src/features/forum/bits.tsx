import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowBigDown,
  ArrowBigUp,
  Briefcase,
  Building,
  Calculator,
  ClipboardList,
  Compass,
  Cpu,
  Landmark,
  Palette,
  Plane,
  Scale,
  Stethoscope,
  Target,
  Users,
} from 'lucide-react';
import { CommunityBrief, ForumAuthor, Vote, applyVote, formatScore, forumService } from '../../services/forumService';

const ICONS: Record<string, React.ElementType> = {
  calculator: Calculator,
  stethoscope: Stethoscope,
  'clipboard-list': ClipboardList,
  building: Building,
  target: Target,
  briefcase: Briefcase,
  cpu: Cpu,
  landmark: Landmark,
  compass: Compass,
  plane: Plane,
  scale: Scale,
  palette: Palette,
};

const COLORS: Record<string, string> = {
  blue: 'bg-blue-600',
  red: 'bg-rose-600',
  violet: 'bg-violet-600',
  teal: 'bg-teal-600',
  orange: 'bg-orange-500',
  green: 'bg-green-600',
  slate: 'bg-slate-600',
};

export const communityColor = (color: string) => COLORS[color] ?? COLORS.blue;

export const CommunityIcon: React.FC<{ community: Pick<CommunityBrief, 'icon' | 'color'>; size?: 'xs' | 'sm' | 'md' | 'lg' }> = ({
  community,
  size = 'sm',
}) => {
  const Icon = ICONS[community.icon] ?? Users;
  const box = { xs: 'w-5 h-5', sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-16 h-16 ring-4 ring-white' }[size];
  const icon = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-8 h-8' }[size];
  return (
    <span className={`${box} ${communityColor(community.color)} rounded-full flex items-center justify-center text-white shrink-0`} aria-hidden="true">
      <Icon className={icon} />
    </span>
  );
};

/** "u/name", "Anonymous" or "[deleted]", with a link to the profile when there is one. */
export const AuthorName: React.FC<{ author: ForumAuthor; className?: string }> = ({ author, className = '' }) => {
  if (author.deleted) return <span className={`text-neutral-400 ${className}`}>[deleted]</span>;
  if (author.anonymous || !author.username) return <span className={`italic ${className}`}>Anonymous</span>;
  return (
    <Link to={`/community/u/${author.username}`} className={`hover:underline ${className}`}>
      u/{author.username}
    </Link>
  );
};

/** Returns a function that runs `action` when signed in, or sends the visitor to sign in (and back here). */
export const useSignedInAction = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  return (action: () => void) => {
    if (forumService.isSignedIn()) action();
    else navigate('/login', { state: { from: `${pathname}${search}` } });
  };
};

/** Reddit-style up/down arrows with the score in between; updates at once and rolls back on error. */
export const VoteControl: React.FC<{
  score: number;
  myVote: Vote;
  onVote: (value: Vote) => Promise<{ score: number; myVote: Vote }>;
  label: string;
  horizontal?: boolean;
  disabled?: boolean;
}> = ({ score: initialScore, myVote: initialVote, onVote, label, horizontal, disabled }) => {
  const [state, setState] = useState({ score: initialScore, myVote: initialVote });
  const [busy, setBusy] = useState(false);
  const requireSignIn = useSignedInAction();

  const vote = (direction: 1 | -1) =>
    requireSignIn(async () => {
      if (busy || disabled) return;
      const prev = state;
      const next: Vote = prev.myVote === direction ? 0 : direction;
      setState({ score: applyVote(prev.score, prev.myVote, next), myVote: next });
      setBusy(true);
      try {
        setState(await onVote(next));
      } catch {
        setState(prev);
      } finally {
        setBusy(false);
      }
    });

  const tone = state.myVote === 1 ? 'text-orange-600' : state.myVote === -1 ? 'text-indigo-600' : 'text-neutral-700';
  return (
    <div className={`flex items-center ${horizontal ? 'flex-row gap-1' : 'flex-col'} select-none`} role="group" aria-label={`Vote on ${label}`}>
      <button
        type="button"
        onClick={() => vote(1)}
        disabled={disabled}
        aria-label="Upvote"
        aria-pressed={state.myVote === 1}
        className={`p-1 rounded-md hover:bg-orange-50 hover:text-orange-600 disabled:opacity-40 ${state.myVote === 1 ? 'text-orange-600' : 'text-neutral-400'}`}
      >
        <ArrowBigUp className="w-6 h-6" fill={state.myVote === 1 ? 'currentColor' : 'none'} />
      </button>
      <span className={`text-[13px] font-bold min-w-[2ch] text-center ${tone}`} aria-label={`${state.score} points`}>
        {formatScore(state.score)}
      </span>
      <button
        type="button"
        onClick={() => vote(-1)}
        disabled={disabled}
        aria-label="Downvote"
        aria-pressed={state.myVote === -1}
        className={`p-1 rounded-md hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-40 ${state.myVote === -1 ? 'text-indigo-600' : 'text-neutral-400'}`}
      >
        <ArrowBigDown className="w-6 h-6" fill={state.myVote === -1 ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
};

const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g;

/** Plain text with paragraphs kept and links made clickable (no HTML from users is ever rendered). */
export const RichText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <div className={`space-y-3 ${className}`}>
    {text
      .split(/\n\s*\n/)
      .filter((p) => p.trim())
      .map((paragraph, i) => (
        <p key={i} className="whitespace-pre-line break-words">
          {paragraph.split(URL_RE).map((part, j) =>
            j % 2 === 1 ? (
              <a key={j} href={part} target="_blank" rel="noopener noreferrer nofollow ugc" className="text-primary-700 underline break-all">
                {part}
              </a>
            ) : (
              <React.Fragment key={j}>{part}</React.Fragment>
            ),
          )}
        </p>
      ))}
  </div>
);

export const Flair: React.FC<{ text: string }> = ({ text }) =>
  text ? (
    <span className="inline-block px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-bold align-middle">{text}</span>
  ) : null;
