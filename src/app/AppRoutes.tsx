import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { User } from '../services/authService';
import { FOOTER_PAGES } from '../data/footerData';
import PageLoader from '../components/common/loaders/PageLoader';
import { GENERIC_FOOTER_SLUGS, footerSlugToPath } from './footerRoutePaths';

// Pages are lazy-loaded so each route downloads only its own code.
const HomePage = lazy(() => import('../pages/home/HomePage'));
const AuthPage = lazy(() => import('../pages/auth/AuthPage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const RankPredictorPage = lazy(() => import('../pages/predictors/RankPredictorPage'));
const ExamRankPredictorPage = lazy(() => import('../pages/predictors/ExamRankPredictorPage'));
const CollegeMatcherPage = lazy(() => import('../pages/predictors/CollegeMatcherPage'));
const PredictorsHubPage = lazy(() => import('../pages/predictors/PredictorsHubPage'));
const ExamsHubPage = lazy(() => import('../pages/exams/ExamsHubPage'));
const ExamDetailsPage = lazy(() => import('../pages/exams/ExamDetailsPage'));
const GovtExamsPage = lazy(() => import('../pages/exams/GovtExamsPage'));
const ExploreCollegesPage = lazy(() => import('../pages/colleges/ExploreCollegesPage'));
const CollegeDetailPage = lazy(() => import('../pages/colleges/CollegeDetailPage'));
const CollegeProfilePage = lazy(() => import('../pages/colleges/CollegeProfilePage'));
const ComparePage = lazy(() => import('../pages/colleges/ComparePage'));
const CollegeMatchResultsPage = lazy(() => import('../pages/colleges/CollegeMatchResultsPage'));
const ResultsPage = lazy(() => import('../pages/results/ResultsPage'));
const NewsPage = lazy(() => import('../pages/news/NewsPage'));
const JobsPage = lazy(() => import('../pages/jobs/JobsPage'));
const CommunityPage = lazy(() => import('../pages/community/CommunityPage'));
const AboutUs = lazy(() => import('../pages/static/AboutUs'));
const ContactUs = lazy(() => import('../pages/static/ContactUs'));
const PrivacyPolicy = lazy(() => import('../pages/static/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/static/TermsAndConditions'));
const Disclaimer = lazy(() => import('../pages/static/Disclaimer'));
const NotFound = lazy(() => import('../pages/NotFound'));
const ProfilePage = lazy(() => import('../pages/account/ProfilePage'));
const MyReportsPage = lazy(() => import('../pages/account/MyReportsPage'));
const ReportDetailPage = lazy(() => import('../pages/account/ReportDetailPage'));
const MyPredictionsPage = lazy(() => import('../pages/account/MyPredictionsPage'));
const SavedCollegesPage = lazy(() => import('../pages/account/SavedCollegesPage'));
const GenericFooterPage = lazy(() => import('../features/content/GenericFooterPage'));
const StaticInfoPage = lazy(() => import('../features/content/StaticInfoPage'));

interface AppRoutesProps {
  user: User | null;
  onOpenAuth: (open: boolean) => void;
  onAskAI: (topic: string) => void;
}

const goBack = () => window.history.back();

/** Wraps a data-driven category page in the standard page container. */
const CategoryPage: React.FC<{ pageId: string; onAskAI: (t: string) => void }> = ({ pageId, onAskAI }) => (
  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
    <GenericFooterPage data={FOOTER_PAGES[pageId]} onBack={goBack} onAskAI={onAskAI} pageId={pageId} />
  </div>
);

/** Top-level category routes backed by FOOTER_PAGES entries. */
const CATEGORY_ROUTES: Record<string, string> = {
  '/mba': 'mba-india',
  '/engineering': 'eng-india',
  '/medical': 'med-india',
  '/tools': 'tools-hub',
};

/** Legacy /college/<exam> URLs that should point to exam pages. */
const EXAM_REDIRECTS: Record<string, string> = {
  gate: 'gate',
  cat: 'cat',
  jee: 'jee-main',
  neet: 'neet',
  xat: 'xat',
  clat: 'clat',
  mat: 'mat',
  nift: 'nift',
};

const isInfoSlug = (slug: string) => /^(legal|company|site)-/.test(slug);

const footerRoutes = (onAskAI: (t: string) => void) =>
  GENERIC_FOOTER_SLUGS.map((slug) => (
    <Route
      key={slug}
      path={footerSlugToPath(slug)}
      element={
        <div className="relative z-10">
          {isInfoSlug(slug) ? (
            <StaticInfoPage data={FOOTER_PAGES[slug]} onBack={goBack} />
          ) : (
            <CategoryPage pageId={slug} onAskAI={onAskAI} />
          )}
        </div>
      }
    />
  ));

const AppRoutes: React.FC<AppRoutesProps> = ({ user, onOpenAuth, onAskAI }) => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<HomePage onAskAI={onAskAI} />} />
      <Route path="/login" element={<AuthPage user={user} onAuthSuccess={() => onOpenAuth(false)} />} />
      <Route path="/register" element={<AuthPage user={user} onAuthSuccess={() => onOpenAuth(false)} />} />
      <Route path="/search" element={<SearchPage />} />

      {/* Predictors */}
      <Route path="/predictors" element={<PredictorsHubPage />} />
      <Route path="/rank-estimator" element={<RankPredictorPage />} />
      <Route path="/rank-estimator/:examSlug" element={<ExamRankPredictorPage />} />
      <Route path="/college-matcher" element={<CollegeMatcherPage />} />
      <Route path="/recommended-colleges" element={<CollegeMatchResultsPage />} />

      {/* Exams */}
      <Route path="/exams" element={<ExamsHubPage />} />
      <Route path="/exams/:examId" element={<ExamDetailsPage />} />
      <Route path="/govt-exams" element={<GovtExamsPage />} />
      <Route path="/results" element={<ResultsPage />} />

      {/* Colleges */}
      <Route path="/colleges" element={<ExploreCollegesPage />} />
      <Route path="/colleges/:slug" element={<CollegeProfilePage />} />
      <Route path="/compare" element={<ComparePage />} />
      {Object.entries(EXAM_REDIRECTS).map(([from, to]) => (
        <Route key={from} path={`/college/${from}/*`} element={<Navigate to={`/exams/${to}`} replace />} />
      ))}
      <Route path="/college/:collegeName" element={<CollegeDetailPage />} />

      {/* Content */}
      <Route path="/news" element={<NewsPage />} />
      <Route path="/latest-news" element={<Navigate to="/news" replace />} />
      {/* Blog is disabled for now — send old blog links to News */}
      <Route path="/blog/*" element={<Navigate to="/news" replace />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/community" element={<CommunityPage />} />

      {/* Category landing pages */}
      {Object.entries(CATEGORY_ROUTES).map(([path, pageId]) => (
        <Route key={path} path={path} element={<CategoryPage pageId={pageId} onAskAI={onAskAI} />} />
      ))}

      {/* Account */}
      <Route path="/account" element={<Navigate to="/account/profile" replace />} />
      <Route path="/account/profile" element={<ProfilePage />} />
      <Route path="/account/reports" element={<MyReportsPage />} />
      <Route path="/account/reports/:reportId" element={<ReportDetailPage />} />
      <Route path="/account/predictions" element={<MyPredictionsPage />} />
      <Route path="/account/saved-colleges" element={<SavedCollegesPage />} />

      {/* Static pages */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/disclaimer" element={<Disclaimer />} />

      {/* Data-driven footer pages */}
      {footerRoutes(onAskAI)}

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
