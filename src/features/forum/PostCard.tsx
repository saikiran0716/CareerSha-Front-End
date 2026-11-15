import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkCheck, ExternalLink, Flag, Link2, Lock, MessageSquare, Pin, Share2 } from 'lucide-react';
import { ForumPost, Poll, forumService, timeAgo } from '../../services/forumService';
import { AuthorName, CommunityIcon, Flair, RichText, VoteControl, useSignedInAction } from './bits';

/** Results bars once you've voted, otherwise one button per option. */
export const PollView: React.FC<{ postId: number; poll: Poll; disabled?: boolean }> = ({ postId, poll: initial, disabled }) => {
  const [poll, setPoll] = useState(initial);
  const [error, setError] = useState('');
  const requireSignIn = useSignedInAction();
  const showResults = poll.myVote !== null || disabled;

  const vote = (option: number) =>
    requireSignIn(async () => {
      setError('');
      try {
        setPoll(await forumService.votePoll(postId, option));
      } catch (e) {
        setError((e as Error).message);
      }
    });

  return (
    <div className="mt-3 rounded-xl border border-neutral-200 p-3 space-y-2">
      {poll.options.map((option) => {
        const pct = poll.totalVotes ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
        return showResults ? (
          <div key={option.id} className="relative h-9 rounded-lg bg-neutral-100 overflow-hidden">
            <div className={`absolute inset-y-0 left-0 ${poll.myVote === option.id ? 'bg-primary-200' : 'bg-neutral-200'}`} style={{ width: `${pct}%` }} />
            <div className="relative h-full flex items-center justify-between px-3 text-[13px]">
              <span className="font-semibold text-neutral-800">
                {option.text} {poll.myVote === option.id && <span className="text-primary-700">✓</span>}
              </span>
              <span className="font-bold text-neutral-700">{pct}%</span>
            </div>
          </div>
        ) : (
          <button
            key={option.id}
            type="button"
            onClick={() => vote(option.id)}
            className="w-full h-9 rounded-lg border border-primary-200 text-[13px] font-semibold text-primary-800 hover:bg-primary-50 text-left px-3"
          >
            {option.text}
          </button>
        );
      })}
      <p className="text-[12px] text-neutral-500">
        {poll.totalVotes} vote{poll.totalVotes === 1 ? '' : 's'}
      </p>
      {error && <p className="text-[12px] text-danger-600">{error}</p>}
    </div>
  );
};

const REASONS = ['Spam or advertising', 'Harassment or hate', 'Misinformation', 'Personal information', 'Other'];

/** "Report" with a short list of reasons. */
export const ReportButton: React.FC<{ target: { postId?: number; commentId?: number } }> = ({ target }) => {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const requireSignIn = useSignedInAction();
  if (done) return <span className="text-[12px] font-semibold text-neutral-500 px-2">Reported. Thanks!</span>;
  return (
    <span className="relative">
      <button
        type="button"
        onClick={() => requireSignIn(() => setOpen((o) => !o))}
        aria-expanded={open}
        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100"
      >
        <Flag className="w-3.5 h-3.5" aria-hidden="true" /> Report
      </button>
      {open && (
        <span className="absolute z-20 left-0 top-full mt-1 w-52 rounded-xl border border-neutral-200 bg-white shadow-lg p-1 flex flex-col">
          {REASONS.map((reason) => (
            <button
              key={reason}
              type="button"
              onClick={async () => {
                try {
                  await forumService.report(target, reason);
                  setDone(true);
                } finally {
                  setOpen(false);
                }
              }}
              className="text-left px-3 py-2 rounded-lg text-[13px] text-neutral-700 hover:bg-neutral-50"
            >
              {reason}
            </button>
          ))}
        </span>
      )}
    </span>
  );
};

export const ShareButton: React.FC<{ postId: number }> = ({ postId }) => {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = `${window.location.origin}/community/post/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link', url);
    }
  };
  return (
    <button type="button" onClick={share} className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100">
      {copied ? <Link2 className="w-3.5 h-3.5" aria-hidden="true" /> : <Share2 className="w-3.5 h-3.5" aria-hidden="true" />}
      {copied ? 'Link copied' : 'Share'}
    </button>
  );
};

export const SaveButton: React.FC<{ postId: number; saved: boolean }> = ({ postId, saved: initial }) => {
  const [saved, setSaved] = useState(initial);
  const requireSignIn = useSignedInAction();
  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() =>
        requireSignIn(async () => {
          setSaved(!saved);
          try {
            setSaved((await forumService.savePost(postId, !saved)).saved);
          } catch {
            setSaved(saved);
          }
        })
      }
      className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold hover:bg-neutral-100 ${saved ? 'text-primary-700' : 'text-neutral-500'}`}
    >
      {saved ? <BookmarkCheck className="w-3.5 h-3.5" aria-hidden="true" /> : <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />}
      {saved ? 'Saved' : 'Save'}
    </button>
  );
};

/** "c/jee · Posted by u/name · 3h ago" */
export const PostMeta: React.FC<{ post: ForumPost; showCommunity?: boolean }> = ({ post, showCommunity = true }) => (
  <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12px] text-neutral-500">
    {showCommunity && (
      <>
        <CommunityIcon community={post.community} size="xs" />
        <Link to={`/community/c/${post.community.slug}`} className="font-bold text-neutral-800 hover:underline">
          c/{post.community.slug}
        </Link>
        <span aria-hidden="true">·</span>
      </>
    )}
    <span>
      Posted by <AuthorName author={post.author} />
    </span>
    {post.author.tag && <span className="text-neutral-400">({post.author.tag})</span>}
    <span aria-hidden="true">·</span>
    <time dateTime={post.createdAt}>{timeAgo(post.createdAt)}</time>
    {post.editedAt && <span className="text-neutral-400">(edited)</span>}
    {post.isPinned && (
      <span className="inline-flex items-center gap-0.5 text-green-700 font-bold">
        <Pin className="w-3 h-3" aria-hidden="true" /> Pinned
      </span>
    )}
    {post.isLocked && (
      <span className="inline-flex items-center gap-0.5 text-amber-700 font-bold">
        <Lock className="w-3 h-3" aria-hidden="true" /> Locked
      </span>
    )}
  </div>
);

/** A post in a feed: votes on the left, preview in the middle, actions underneath. */
export const PostCard: React.FC<{ post: ForumPost; showCommunity?: boolean }> = ({ post, showCommunity = true }) => {
  const href = `/community/post/${post.id}`;
  return (
    <article className="flex bg-white rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors overflow-hidden">
      <div className="bg-neutral-50/80 px-1.5 py-2 hidden sm:block">
        <VoteControl
          score={post.score}
          myVote={post.myVote}
          label={post.title}
          disabled={post.isDeleted}
          onVote={(v) => forumService.votePost(post.id, v)}
        />
      </div>
      <div className="flex-1 min-w-0 p-3 sm:pl-3">
        <PostMeta post={post} showCommunity={showCommunity} />
        <h2 className="mt-1.5 text-[17px] leading-snug font-bold text-neutral-900">
          <Link to={href} className="hover:underline">
            {post.title}
          </Link>{' '}
          <Flair text={post.flair} />
        </h2>
        {post.kind === 'link' && post.url && (
          <a href={post.url} target="_blank" rel="noopener noreferrer nofollow ugc" className="mt-1 inline-flex items-center gap-1 text-[13px] text-primary-700 hover:underline">
            {post.domain} <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        )}
        {post.body && (
          <Link to={href} className="block mt-2 text-[14px] text-neutral-700 line-clamp-4" tabIndex={-1}>
            <RichText text={post.body} />
          </Link>
        )}
        {post.poll && <PollView postId={post.id} poll={post.poll} disabled={post.isDeleted} />}
        <div className="mt-2 -ml-2 flex flex-wrap items-center gap-0.5">
          <span className="sm:hidden">
            <VoteControl
              horizontal
              score={post.score}
              myVote={post.myVote}
              label={post.title}
              disabled={post.isDeleted}
              onVote={(v) => forumService.votePost(post.id, v)}
            />
          </span>
          <Link to={href} className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100">
            <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            {post.commentCount} comment{post.commentCount === 1 ? '' : 's'}
          </Link>
          <ShareButton postId={post.id} />
          <SaveButton postId={post.id} saved={post.saved} />
          {!post.isMine && <ReportButton target={{ postId: post.id }} />}
        </div>
      </div>
    </article>
  );
};
