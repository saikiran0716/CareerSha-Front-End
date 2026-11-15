import React, { useState } from 'react';
import { MessageSquare, MinusSquare, Pencil, PlusSquare, Trash2 } from 'lucide-react';
import SignInPrompt from '../community/SignInPrompt';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ForumComment, forumService, timeAgo } from '../../services/forumService';
import { AuthorName, RichText, VoteControl, useSignedInAction } from './bits';
import { ReportButton } from './PostCard';

const MAX_INDENT = 6;

/** Text box for a new comment or reply. */
export const CommentBox: React.FC<{
  postId: number;
  parentId?: number | null;
  onPosted: (comment: ForumComment) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
}> = ({ postId, parentId = null, onPosted, onCancel, autoFocus, placeholder = 'What are your thoughts?' }) => {
  const user = useCurrentUser();
  const [body, setBody] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (!user) return <SignInPrompt action="comment" compact={!!parentId} />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    setError('');
    try {
      onPosted(await forumService.addComment(postId, body.trim(), parentId, anonymous));
      setBody('');
      setAnonymous(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-neutral-300 focus-within:border-neutral-500 bg-white">
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder={placeholder}
        aria-label={parentId ? 'Write a reply' : 'Write a comment'}
        autoFocus={autoFocus}
        rows={parentId ? 3 : 4}
        maxLength={10000}
        className="w-full rounded-t-xl p-3 text-[14px] outline-none resize-y"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-neutral-50 rounded-b-xl border-t border-neutral-200">
        <label className="flex items-center gap-2 text-[12px] text-neutral-600">
          <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
          Comment anonymously
        </label>
        <div className="flex items-center gap-2">
          {error && <span className="text-[12px] text-danger-600">{error}</span>}
          {onCancel && (
            <button type="button" onClick={onCancel} className="px-3 py-1.5 rounded-full text-[13px] font-bold text-neutral-600 hover:bg-neutral-100">
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={busy || !body.trim()}
            className="px-4 py-1.5 rounded-full bg-primary-800 hover:bg-primary-700 text-white text-[13px] font-bold disabled:opacity-50"
          >
            {busy ? 'Posting…' : parentId ? 'Reply' : 'Comment'}
          </button>
        </div>
      </div>
    </form>
  );
};

const CommentItem: React.FC<{
  comment: ForumComment;
  postId: number;
  locked: boolean;
  depth: number;
  onChange: (comment: ForumComment | null) => void;
}> = ({ comment, postId, locked, depth, onChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(comment.body);
  const [error, setError] = useState('');
  const requireSignIn = useSignedInAction();

  const replaceReply = (index: number, next: ForumComment | null) => {
    const replies = [...comment.replies];
    if (next) replies[index] = next;
    else replies.splice(index, 1);
    onChange({ ...comment, replies });
  };

  const saveEdit = async () => {
    try {
      const updated = await forumService.editComment(comment.id, draft.trim());
      onChange({ ...comment, body: updated.body, editedAt: updated.editedAt });
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this comment?')) return;
    try {
      await forumService.deleteComment(comment.id);
      // Keep a [deleted] placeholder while it still has replies, like Reddit.
      onChange(comment.replies.length ? { ...comment, isDeleted: true, body: '', author: { ...comment.author, deleted: true } } : null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <li className="relative">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand comment' : 'Collapse comment'}
          aria-expanded={!collapsed}
          className="mt-0.5 text-neutral-400 hover:text-neutral-700 shrink-0"
        >
          {collapsed ? <PlusSquare className="w-4 h-4" /> : <MinusSquare className="w-4 h-4" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 text-[12px] text-neutral-500">
            <AuthorName author={comment.author} className="font-bold text-neutral-800" />
            {comment.author.tag && <span className="text-neutral-400">{comment.author.tag}</span>}
            <span aria-hidden="true">·</span>
            <time dateTime={comment.createdAt}>{timeAgo(comment.createdAt)}</time>
            {comment.editedAt && <span className="text-neutral-400">(edited)</span>}
            {collapsed && (
              <span className="text-neutral-400">
                · {comment.score} point{Math.abs(comment.score) === 1 ? '' : 's'}
                {comment.replies.length > 0 && ` · ${comment.replies.length} repl${comment.replies.length === 1 ? 'y' : 'ies'}`}
              </span>
            )}
          </div>

          {!collapsed && (
            <>
              {editing ? (
                <div className="mt-2 space-y-2">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    aria-label="Edit comment"
                    rows={3}
                    className="w-full rounded-lg border border-neutral-300 p-2 text-[14px]"
                  />
                  <div className="flex gap-2">
                    <button type="button" onClick={saveEdit} disabled={!draft.trim()} className="px-3 py-1 rounded-full bg-primary-800 text-white text-[12px] font-bold">
                      Save
                    </button>
                    <button type="button" onClick={() => setEditing(false)} className="px-3 py-1 rounded-full text-[12px] font-bold text-neutral-600 hover:bg-neutral-100">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : comment.isDeleted ? (
                <p className="mt-1 text-[14px] text-neutral-400 italic">[deleted]</p>
              ) : (
                <RichText text={comment.body} className="mt-1 text-[14px] text-neutral-800" />
              )}

              {!comment.isDeleted && !editing && (
                <div className="mt-1 -ml-1 flex flex-wrap items-center gap-0.5">
                  <VoteControl
                    horizontal
                    score={comment.score}
                    myVote={comment.myVote}
                    label="comment"
                    onVote={(v) => forumService.voteComment(comment.id, v)}
                  />
                  {!locked && (
                    <button
                      type="button"
                      onClick={() => requireSignIn(() => setReplying(!replying))}
                      className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100"
                    >
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" /> Reply
                    </button>
                  )}
                  {comment.isMine ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setDraft(comment.body);
                          setEditing(true);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100"
                      >
                        <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={remove}
                        className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
                      </button>
                    </>
                  ) : (
                    <ReportButton target={{ commentId: comment.id }} />
                  )}
                </div>
              )}
              {error && <p className="text-[12px] text-danger-600">{error}</p>}

              {replying && (
                <div className="mt-2">
                  <CommentBox
                    postId={postId}
                    parentId={comment.id}
                    autoFocus
                    placeholder="Write a reply"
                    onCancel={() => setReplying(false)}
                    onPosted={(reply) => {
                      setReplying(false);
                      onChange({ ...comment, replies: [reply, ...comment.replies] });
                    }}
                  />
                </div>
              )}

              {comment.replies.length > 0 && (
                <ul className={`mt-3 space-y-4 ${depth < MAX_INDENT ? 'pl-3 border-l-2 border-neutral-200' : ''}`}>
                  {comment.replies.map((reply, i) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      postId={postId}
                      locked={locked}
                      depth={depth + 1}
                      onChange={(next) => replaceReply(i, next)}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
};

/** The whole comment tree of a post. */
export const CommentThread: React.FC<{
  comments: ForumComment[];
  postId: number;
  locked: boolean;
  onChange: (comments: ForumComment[]) => void;
}> = ({ comments, postId, locked, onChange }) => (
  <ul className="space-y-5">
    {comments.map((comment, i) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        postId={postId}
        locked={locked}
        depth={1}
        onChange={(next) => {
          const list = [...comments];
          if (next) list[i] = next;
          else list.splice(i, 1);
          onChange(list);
        }}
      />
    ))}
  </ul>
);
