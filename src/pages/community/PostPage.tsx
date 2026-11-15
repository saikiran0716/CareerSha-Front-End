import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Lock, MessageSquare, Pencil, Trash2 } from 'lucide-react';
import SEO from '../../components/common/SEO';
import NotFound from '../NotFound';
import { CommentSort, CommunityDetail, PostDetail, forumService } from '../../services/forumService';
import { Flair, RichText, VoteControl } from '../../features/forum/bits';
import { PollView, PostMeta, ReportButton, SaveButton, ShareButton } from '../../features/forum/PostCard';
import { CommentBox, CommentThread } from '../../features/forum/Comments';
import { AboutCommunity } from '../../features/forum/layout';

const COMMENT_SORTS: { id: CommentSort; label: string }[] = [
  { id: 'best', label: 'Best' },
  { id: 'top', label: 'Top' },
  { id: 'new', label: 'New' },
  { id: 'old', label: 'Old' },
];

/** /community/post/:id — a post, its actions and the full comment thread. */
const PostPage: React.FC = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDetail | null | undefined>(undefined);
  const [community, setCommunity] = useState<CommunityDetail | null>(null);
  const [sort, setSort] = useState<CommentSort>('best');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    forumService
      .post(id, sort)
      .then((p) => active && setPost(p))
      .catch(() => active && setPost(null));
    return () => {
      active = false;
    };
  }, [id, sort]);

  const slug = post?.community.slug;
  useEffect(() => {
    if (!slug) return;
    let active = true;
    forumService
      .community(slug)
      .then((c) => active && setCommunity(c))
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [slug]);

  if (post === null) return <NotFound />;
  if (post === undefined) {
    return (
      <div className="page-container py-8 space-y-3" aria-label="Loading post">
        <div className="h-48 rounded-xl bg-white border border-neutral-200 animate-pulse" />
        <div className="h-64 rounded-xl bg-white border border-neutral-200 animate-pulse" />
      </div>
    );
  }

  const saveEdit = async () => {
    try {
      const updated = await forumService.editPost(post.id, { body: draft });
      setPost({ ...post, body: updated.body, editedAt: updated.editedAt });
      setEditing(false);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return;
    try {
      const updated = await forumService.deletePost(post.id);
      setPost({ ...post, ...updated });
    } catch (e) {
      setError((e as Error).message);
    }
  };

  /** Live (not deleted) comments in a tree, to keep the count in step with replies and deletions. */
  const countAll = (list: PostDetail['comments']): number =>
    list.reduce((n, c) => n + (c.isDeleted ? 0 : 1) + countAll(c.replies), 0);

  return (
    <div className="min-h-screen bg-neutral-100/70">
      <SEO
        title={`${post.title} : c/${post.community.slug}`}
        description={(post.body || post.title).slice(0, 155)}
        ogType="article"
      />
      <div className="page-container py-6">
        <button
          type="button"
          onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(`/community/c/${post.community.slug}`))}
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-neutral-600 hover:text-neutral-900 mb-3"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-4 min-w-0">
            <article className="flex bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="bg-neutral-50/80 px-1.5 py-3 hidden sm:block">
                <VoteControl
                  score={post.score}
                  myVote={post.myVote}
                  label={post.title}
                  disabled={post.isDeleted}
                  onVote={(v) => forumService.votePost(post.id, v)}
                />
              </div>
              <div className="flex-1 min-w-0 p-4">
                <PostMeta post={post} />
                <h1 className="mt-2 text-[22px] leading-snug font-bold text-neutral-900">
                  {post.title} <Flair text={post.flair} />
                </h1>
                {post.kind === 'link' && post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow ugc"
                    className="mt-2 inline-flex items-center gap-1 text-[14px] text-primary-700 hover:underline break-all"
                  >
                    {post.url} <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </a>
                )}
                {editing ? (
                  <div className="mt-3 space-y-2">
                    <textarea
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      rows={6}
                      aria-label="Edit post"
                      className="w-full rounded-lg border border-neutral-300 p-3 text-[14px]"
                    />
                    <div className="flex gap-2">
                      <button type="button" onClick={saveEdit} className="px-4 py-1.5 rounded-full bg-primary-800 text-white text-[13px] font-bold">
                        Save
                      </button>
                      <button type="button" onClick={() => setEditing(false)} className="px-4 py-1.5 rounded-full text-[13px] font-bold text-neutral-600 hover:bg-neutral-100">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : post.isDeleted ? (
                  <p className="mt-3 text-[15px] italic text-neutral-400">[This post was deleted by its author]</p>
                ) : (
                  post.body && <RichText text={post.body} className="mt-3 text-[15px] leading-relaxed text-neutral-800" />
                )}
                {post.poll && <PollView postId={post.id} poll={post.poll} disabled={post.isDeleted} />}
                <div className="mt-3 -ml-2 flex flex-wrap items-center gap-0.5">
                  <span className="sm:hidden">
                    <VoteControl horizontal score={post.score} myVote={post.myVote} label={post.title} onVote={(v) => forumService.votePost(post.id, v)} />
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1.5 text-[12px] font-bold text-neutral-500">
                    <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" /> {post.commentCount} comment{post.commentCount === 1 ? '' : 's'}
                  </span>
                  <ShareButton postId={post.id} />
                  <SaveButton postId={post.id} saved={post.saved} />
                  {post.isMine && !post.isDeleted ? (
                    <>
                      {post.kind !== 'link' && (
                        <button
                          type="button"
                          onClick={() => {
                            setDraft(post.body);
                            setEditing(true);
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100"
                        >
                          <Pencil className="w-3.5 h-3.5" aria-hidden="true" /> Edit
                        </button>
                      )}
                      <button type="button" onClick={remove} className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md text-[12px] font-bold text-neutral-500 hover:bg-neutral-100">
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Delete
                      </button>
                    </>
                  ) : (
                    !post.isMine && <ReportButton target={{ postId: post.id }} />
                  )}
                </div>
                {error && <p className="text-[12px] text-danger-600 mt-1">{error}</p>}
              </div>
            </article>

            <section className="bg-white rounded-xl border border-neutral-200 p-4 space-y-4" aria-label="Comments">
              {post.isLocked ? (
                <p className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-[13px] text-amber-900">
                  <Lock className="w-4 h-4" aria-hidden="true" /> This post is locked. New comments are turned off.
                </p>
              ) : (
                !post.isDeleted && (
                  <CommentBox
                    postId={post.id}
                    onPosted={(comment) =>
                      setPost({ ...post, comments: [comment, ...post.comments], commentCount: post.commentCount + 1 })
                    }
                  />
                )
              )}
              <div className="flex items-center gap-2 text-[13px]">
                <label htmlFor="comment-sort" className="text-neutral-500">
                  Sort by:
                </label>
                <select
                  id="comment-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as CommentSort)}
                  className="font-bold text-neutral-800 bg-transparent outline-none cursor-pointer"
                >
                  {COMMENT_SORTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              {post.comments.length === 0 ? (
                <p className="py-6 text-center text-[14px] text-neutral-500">No comments yet. Start the conversation.</p>
              ) : (
                <CommentThread
                  comments={post.comments}
                  postId={post.id}
                  locked={post.isLocked}
                  onChange={(comments) => {
                    const diff = countAll(comments) - countAll(post.comments);
                    setPost({ ...post, comments, commentCount: Math.max(0, post.commentCount + diff) });
                  }}
                />
              )}
            </section>
          </main>
          <aside className="lg:col-span-4" aria-label={`About c/${post.community.slug}`}>
            {community ? (
              <AboutCommunity community={community} onJoinChange={(joined, memberCount) => setCommunity({ ...community, joined, memberCount })} />
            ) : (
              <Link to={`/community/c/${post.community.slug}`} className="text-[13px] font-bold text-primary-700 hover:underline">
                c/{post.community.slug}
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
