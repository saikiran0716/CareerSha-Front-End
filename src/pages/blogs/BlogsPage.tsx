import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ChevronRight } from 'lucide-react';
import SEO from '../../components/common/SEO';

/** Until articles are published, point readers to the guides that already exist. */
const READ_NOW = [
  { title: 'Latest Education News', text: 'Admission, exam and result updates.', url: '/news' },
  { title: 'Entrance Exam Guides', text: 'Pattern, syllabus and dates for JEE, NEET, CAT and more.', url: '/exams' },
  { title: 'Government Exams', text: 'Banking, SSC, Railway, Defence and UPSC by sector.', url: '/govt-exams' },
  { title: 'Student Community', text: 'Questions and answers from students and alumni.', url: '/community' },
];

/** /blogs — placeholder until blog articles are added. */
const BlogsPage: React.FC = () => (
  <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 lg:px-8">
    <SEO
      title="Blogs | CareerSha"
      description="Articles and guides on colleges, entrance exams and careers in India from CareerSha."
      canonical="https://www.careersha.com/blogs"
    />
    <div className="rounded-[2rem] border border-neutral-100 bg-white p-8 text-center shadow-sm">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-800">
        <BookOpen className="h-6 w-6" />
      </span>
      <h1 className="mt-4 text-3xl text-neutral-900 sm:text-4xl">Blogs</h1>
      <p className="mx-auto mt-3 max-w-xl text-neutral-600">
        Articles on choosing colleges, preparing for entrance exams and planning your career are coming soon.
      </p>
    </div>

    <h2 className="mt-10 text-xl text-neutral-900">Read in the meantime</h2>
    <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {READ_NOW.map((r) => (
        <li key={r.url}>
          <Link
            to={r.url}
            className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-5 transition-colors hover:border-primary-300"
          >
            <span>
              <span className="block text-base text-neutral-900">{r.title}</span>
              <span className="mt-1 block text-sm text-neutral-600">{r.text}</span>
            </span>
            <ChevronRight className="h-5 w-5 shrink-0 text-primary-800" />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default BlogsPage;
