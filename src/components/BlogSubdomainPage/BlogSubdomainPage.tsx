import React from 'react';

const BLOG_SUBDOMAIN_URL = 'https://blog.edupath.ai';

const BlogSubdomainPage: React.FC = () => {
  return (
    <main className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Blog</h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          This is for subdomain blog page.
        </p>
        <p className="mt-2 text-slate-500 text-sm sm:text-base leading-relaxed">
          Click below to open the blog subdomain.
        </p>

        <a
          href={BLOG_SUBDOMAIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors"
        >
          Open Blog Subdomain
        </a>
      </section>
    </main>
  );
};

export default BlogSubdomainPage;
