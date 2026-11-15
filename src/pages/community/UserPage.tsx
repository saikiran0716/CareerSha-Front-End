import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Cake, Pencil } from 'lucide-react';
import SEO from '../../components/common/SEO';
import NotFound from '../NotFound';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ForumProfile, forumService, timeAgo } from '../../services/forumService';
import { CommunityIcon, RichText } from '../../features/forum/bits';
import { PostCard } from '../../features/forum/PostCard';

type Tab = 'posts' | 'comments' | 'saved';

/** /community/u/:username — karma, posts and comments; your own page also shows Saved and Edit profile. */
const UserPage: React.FC = () => {
  const { username = '' } = useParams();
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [myUsername, setMyUsername] = useState<string | null>(null);
  const isMe = !!myUsername && myUsername === username.toLowerCase();
  const requested = (params.get('tab') as Tab) || 'posts';
  const tab: Tab = requested === 'saved' && !isMe ? 'posts' : requested;
  const [profile, setProfile] = useState<ForumProfile | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ username: '', tag: '', bio: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setMyUsername(null);
      return;
    }
    forumService
      .me()
      .then((me) => setMyUsername(me.username))
      .catch(() => setMyUsername(null));
  }, [user]);

  useEffect(() => {
    let active = true;
    setProfile((p) => (p && p.username === username.toLowerCase() ? p : undefined));
    forumService
      .user(username, tab)
      .then((p) => active && setProfile(p))
      .catch(() => active && setProfile(null));
    return () => {
      active = false;
    };
  }, [username, tab]);

  if (profile === null) return <NotFound />;

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const updated = await forumService.updateMe(form);
      setEditing(false);
      setMyUsername(updated.username);
      if (updated.username !== username) navigate(`/community/u/${updated.username}`, { replace: true });
      else setProfile((p) => (p ? { ...p, tag: updated.tag, bio: updated.bio } : p));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'posts', label: 'Posts' },
    { id: 'comments', label: 'Comments' },
    ...(isMe ? [{ id: 'saved' as Tab, label: 'Saved' }] : []),
  ];

  return (
    <div className="min-h-screen bg-neutral-100/70">
      <SEO title={`u/${username} | CareerSha Community`} robots="noindex, follow" />
      <div className="page-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <main className="lg:col-span-8 space-y-3 min-w-0">
            <div className="flex gap-1 bg-white rounded-xl border border-neutral-200 p-1.5" role="tablist" aria-label="Profile sections">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  onClick={() => setParams(t.id === 'posts' ? {} : { tab: t.id })}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-bold ${tab === t.id ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:bg-neutral-100'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            {!profile ? (
              <div className="h-40 rounded-xl bg-white border border-neutral-200 animate-pulse" aria-label="Loading" />
            ) : tab === 'comments' ? (
              (profile.comments ?? []).length === 0 ? (
                <p className="bg-white rounded-xl border border-neutral-200 p-8 text-center text-neutral-500">No comments yet.</p>
              ) : (
                <ul className="space-y-3">
                  {profile.comments!.map((c) => (
                    <li key={c.id} className="bg-white rounded-xl border border-neutral-200 p-4">
                      <p className="flex flex-wrap items-center gap-1.5 text-[12px] text-neutral-500">
                        <CommunityIcon community={c.post.community} size="xs" />
                        <Link to={`/community/c/${c.post.community.slug}`} className="font-bold text-neutral-800 hover:underline">
                          c/{c.post.community.slug}
                        </Link>
                        · on{' '}
                        <Link to={`/community/post/${c.post.id}`} className="font-semibold text-neutral-800 hover:underline">
                          {c.post.title}
                        </Link>
                        · {timeAgo(c.createdAt)} · {c.score} point{Math.abs(c.score) === 1 ? '' : 's'}
                      </p>
                      <RichText text={c.body} className="mt-2 text-[14px] text-neutral-800 line-clamp-6" />
                    </li>
                  ))}
                </ul>
              )
            ) : (profile.posts ?? []).length === 0 ? (
              <p className="bg-white rounded-xl border border-neutral-200 p-8 text-center text-neutral-500">
                {tab === 'saved' ? 'Nothing saved yet.' : 'No posts yet.'}
              </p>
            ) : (
              <div className="space-y-3">
                {profile.posts!.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </main>

          <aside className="lg:col-span-4 order-first lg:order-none" aria-label="Profile">
            <section className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="h-16 bg-gradient-to-r from-primary-800 to-primary-500" />
              <div className="p-4 -mt-10 space-y-3">
                <span className="w-16 h-16 rounded-full bg-white ring-4 ring-white shadow flex items-center justify-center text-2xl font-black text-primary-800" aria-hidden="true">
                  {username.charAt(0).toUpperCase()}
                </span>
                <div>
                  <h1 className="text-lg font-bold text-neutral-900">u/{profile?.username ?? username}</h1>
                  {profile?.tag && <p className="text-[13px] text-neutral-600">{profile.tag}</p>}
                </div>
                {profile?.bio && <p className="text-[14px] text-neutral-700">{profile.bio}</p>}
                {profile && (
                  <dl className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-3">
                    <div>
                      <dd className="text-[16px] font-bold text-neutral-900">{profile.karma.toLocaleString('en-IN')}</dd>
                      <dt className="text-[12px] text-neutral-500">Karma</dt>
                    </div>
                    <div>
                      <dd className="text-[14px] font-bold text-neutral-900 flex items-center gap-1">
                        <Cake className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        {new Date(profile.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      </dd>
                      <dt className="text-[12px] text-neutral-500">Joined</dt>
                    </div>
                  </dl>
                )}
                {isMe && !editing && profile && (
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ username: profile.username, tag: profile.tag, bio: profile.bio });
                      setEditing(true);
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-full border border-neutral-300 text-[13px] font-bold text-neutral-800 hover:bg-neutral-50"
                  >
                    <Pencil className="w-4 h-4" aria-hidden="true" /> Edit profile
                  </button>
                )}
                {isMe && editing && (
                  <form onSubmit={saveProfile} className="space-y-2 border-t border-neutral-100 pt-3">
                    <label className="block text-[12px] font-bold text-neutral-600">
                      Username
                      <input
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value.toLowerCase() })}
                        maxLength={20}
                        className="mt-1 w-full h-9 rounded-lg border border-neutral-300 px-2 text-[14px] font-normal"
                      />
                    </label>
                    <label className="block text-[12px] font-bold text-neutral-600">
                      Tag
                      <input
                        value={form.tag}
                        onChange={(e) => setForm({ ...form, tag: e.target.value })}
                        maxLength={60}
                        placeholder="e.g. JEE 2026 aspirant"
                        className="mt-1 w-full h-9 rounded-lg border border-neutral-300 px-2 text-[14px] font-normal"
                      />
                    </label>
                    <label className="block text-[12px] font-bold text-neutral-600">
                      About you
                      <textarea
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                        maxLength={300}
                        rows={3}
                        className="mt-1 w-full rounded-lg border border-neutral-300 p-2 text-[14px] font-normal"
                      />
                    </label>
                    {error && <p className="text-[12px] text-danger-600">{error}</p>}
                    <div className="flex gap-2">
                      <button type="submit" className="px-4 py-1.5 rounded-full bg-primary-800 text-white text-[13px] font-bold">
                        Save
                      </button>
                      <button type="button" onClick={() => setEditing(false)} className="px-4 py-1.5 rounded-full text-[13px] font-bold text-neutral-600 hover:bg-neutral-100">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
