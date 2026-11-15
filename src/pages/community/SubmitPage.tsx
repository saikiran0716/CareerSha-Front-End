import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BarChart3, FileText, Link2, Plus, X } from 'lucide-react';
import SEO from '../../components/common/SEO';
import SignInPrompt from '../../features/community/SignInPrompt';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { PostKind, forumService } from '../../services/forumService';
import { useCommunities } from '../../features/forum/layout';

const KINDS: { id: PostKind; label: string; icon: React.ElementType }[] = [
  { id: 'text', label: 'Text', icon: FileText },
  { id: 'link', label: 'Link', icon: Link2 },
  { id: 'poll', label: 'Poll', icon: BarChart3 },
];

/** /community/submit — create a text, link or poll post (?c=<community> picks the community). */
const SubmitPage: React.FC = () => {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const communities = useCommunities();
  const [slug, setSlug] = useState(params.get('c') ?? '');
  const [kind, setKind] = useState<PostKind>('text');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [url, setUrl] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [flair, setFlair] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const community = useMemo(() => communities?.find((c) => c.slug === slug), [communities, slug]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const post = await forumService.createPost({
        community: slug,
        title: title.trim(),
        kind,
        body: kind === 'link' ? '' : body,
        url: kind === 'link' ? url.trim() : undefined,
        options: kind === 'poll' ? options.filter((o) => o.trim()) : undefined,
        flair: flair || undefined,
        anonymous,
      });
      navigate(`/community/post/${post.id}`);
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/70">
      <SEO title="Create a post | CareerSha Community" robots="noindex, follow" />
      <div className="page-container py-8 max-w-3xl">
        <h1 className="text-xl font-bold text-neutral-900 mb-4">Create a post</h1>
        {!user ? (
          <SignInPrompt action="post in the community" />
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="sr-only">Community</span>
              <select
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setFlair('');
                }}
                required
                className="w-full sm:w-80 h-11 rounded-xl border border-neutral-300 bg-white px-3 text-[14px] font-semibold"
              >
                <option value="">Choose a community</option>
                {(communities ?? []).map((c) => (
                  <option key={c.slug} value={c.slug}>
                    c/{c.slug} — {c.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="flex border-b border-neutral-200" role="tablist" aria-label="Post type">
                {KINDS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={kind === id}
                    onClick={() => setKind(id)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-3 text-[14px] font-bold border-b-2 ${
                      kind === id ? 'border-primary-700 text-primary-800' : 'border-transparent text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" /> {label}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">
                <div className="relative">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    aria-label="Title"
                    maxLength={300}
                    required
                    className="w-full h-11 rounded-lg border border-neutral-300 px-3 pr-16 text-[14px]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-400">{title.length}/300</span>
                </div>

                {kind === 'text' && (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Text (optional). Share details: your rank, category, state, what you've tried…"
                    aria-label="Text"
                    rows={8}
                    maxLength={20000}
                    className="w-full rounded-lg border border-neutral-300 p-3 text-[14px]"
                  />
                )}
                {kind === 'link' && (
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://"
                    aria-label="Link"
                    required
                    className="w-full h-11 rounded-lg border border-neutral-300 px-3 text-[14px]"
                  />
                )}
                {kind === 'poll' && (
                  <div className="space-y-2">
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Add some context (optional)"
                      aria-label="Text"
                      rows={3}
                      className="w-full rounded-lg border border-neutral-300 p-3 text-[14px]"
                    />
                    {options.map((option, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={option}
                          onChange={(e) => setOptions(options.map((o, j) => (j === i ? e.target.value : o)))}
                          placeholder={`Option ${i + 1}`}
                          aria-label={`Option ${i + 1}`}
                          maxLength={80}
                          className="flex-1 h-10 rounded-lg border border-neutral-300 px-3 text-[14px]"
                        />
                        {options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => setOptions(options.filter((_, j) => j !== i))}
                            aria-label={`Remove option ${i + 1}`}
                            className="px-2 text-neutral-400 hover:text-danger-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {options.length < 6 && (
                      <button
                        type="button"
                        onClick={() => setOptions([...options, ''])}
                        className="inline-flex items-center gap-1 text-[13px] font-bold text-primary-700 hover:underline"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" /> Add option
                      </button>
                    )}
                  </div>
                )}

                {community && community.flairs.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Flair">
                    <span className="text-[12px] font-bold text-neutral-500">Flair:</span>
                    {community.flairs.map((f) => (
                      <button
                        key={f}
                        type="button"
                        aria-pressed={flair === f}
                        onClick={() => setFlair(flair === f ? '' : f)}
                        className={`px-3 py-1 rounded-full text-[12px] font-bold border ${
                          flair === f ? 'bg-primary-800 text-white border-primary-800' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                )}

                <label className="flex items-center gap-2 text-[13px] text-neutral-700">
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} />
                  Post anonymously (your username won't be shown)
                </label>
              </div>

              <div className="flex items-center justify-between gap-3 px-4 py-3 bg-neutral-50 border-t border-neutral-200">
                <p className="text-[12px] text-neutral-500">Be kind. Don't share phone numbers or personal details.</p>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 rounded-full text-[14px] font-bold text-neutral-600 hover:bg-neutral-100">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={busy || !slug || !title.trim()}
                    className="px-5 py-2 rounded-full bg-primary-800 hover:bg-primary-700 text-white text-[14px] font-bold disabled:opacity-50"
                  >
                    {busy ? 'Posting…' : 'Post'}
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <p role="alert" className="text-[13px] text-danger-600">
                {error}
              </p>
            )}
            {community && community.rules.length > 0 && (
              <section className="bg-white rounded-xl border border-neutral-200 p-4">
                <h2 className="text-[13px] font-bold text-neutral-900 mb-2">Posting to c/{community.slug}</h2>
                <ol className="list-decimal list-inside space-y-1 text-[13px] text-neutral-600">
                  {community.rules.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ol>
              </section>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default SubmitPage;
