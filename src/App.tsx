import React, { useState, useCallback, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import { authService, User } from './services/authService';
import ScrollToTop from './components/Scrollbutton/ScrollToTop';
import AuthModal from './components/AuthModal/AuthModal';
import ChatBot from './components/ChatBot/ChatBot';
import { StudentProfile, Qualification, BudgetRange, CollegeType } from './types';
import HomePage from './components/HomePage/HomePage';
import AuthPage from './pages/AuthPage';
import SearchPage from './pages/SearchPage';
import RankPredictorPage from './pages/Predictors/RankPredictorPage';
import CollegeMatcherPage from './pages/Predictors/CollegeMatcherPage';
import ExamsHubPage from './pages/ExamsHub/ExamsHubPage';
import ExploreCollegesPage from './pages/ExploreColleges/ExploreCollegesPage';
import PredictorsHubPage from './pages/Predictors/PredictorsHubPage';
import ResultsPage from './pages/ResultsPage';
import NewsPage from './pages/NewsPage';
import JobsPage from './pages/JobsPage/JobsPage';

import GenericFooterPage from './components/GenericFooterPage/GenericFooterPage';
import { FOOTER_PAGES } from './data/footerData';
import AboutUs from './pages/Footer_Pages_Static/AboutUs';
import ContactUs from './pages/Footer_Pages_Static/ContactUs';
import PrivacyPolicy from './pages/Footer_Pages_Static/PrivacyPolicy';
import TermsAndConditions from './pages/Footer_Pages_Static/TermsAndConditions';
import Disclaimer from './pages/Footer_Pages_Static/Disclaimer';
import CollegeDetailPage from './components/CollegeMatcher/CollegeDetailPage';
import CollegeMatchResults from './components/CollegeMatcher/CollegeMatchResults';
import ExamDetailsPge from './components/EXAMS/ExamDetailsPge';
import BlogDetailPage from './pages/Blog/BlogDetailPage';
import BlogListPage from './pages/Blog/BlogListPage';
import StaticInfoPage from './components/StaticInfoPage/StaticInfoPage';
import CommunityPage from './pages/Community/CommunityPage';
import NotFound from './AppRouters/NotFound';

const App: React.FC = () => {

    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const [user, setUser] = useState<User | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [chatInitialMessage, setChatInitialMessage] = useState<string | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = authService.onStateChange((u) => setUser(u));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    // Handle scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleLogout = async () => {
        await authService.logout();
        setUser(null);
    };

    const handleAskAI = useCallback((topic: string) => {
        setChatInitialMessage(topic);
    }, []);

    const defaultProfile: StudentProfile = {
        name: user?.name || 'Explorer',
        academic: {
            qualification: Qualification.Twelfth,
            board: '',
            year: '',
            subjects: '',
            marks: ''
        },
        exam: {
            examName: '',
            rank: '',
            category: 'General',
            quota: 'State'
        },
        preferences: {
            stream: '',
            location: '',
            budget: BudgetRange.Medium,
            collegeType: CollegeType.Government,
            careerGoal: '' as any
        }
    };

    return (
        <div className={
            `min-h-screen w-full max-w-full box-border bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500/30 ${isDarkMode ? 'dark' : ''
            }`
        }>
            {/* Global Background */}
            {/* <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-50 dark:bg-slate-950">
                <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-overlay">
                    <div className="absolute top-[10%] right-[30%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute bottom-[20%] left-[20%] w-[40%] h-[40%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                </div>
            </div> */}

            <Header user={user}
                onOpenAuth={
                    () => setIsAuthModalOpen(true)
                }
                onLogout={handleLogout}
                isDarkMode={isDarkMode}
                onToggleDarkMode={toggleDarkMode} />

            <AuthModal isOpen={isAuthModalOpen}
                onClose={
                    () => setIsAuthModalOpen(false)
                }
                onAuthSuccess={
                    (u) => setUser(u)
                } />

            {/* The routes will render the appropriate components based on the URL */}

            <ChatBot
                profile={defaultProfile}
                initialMessage={chatInitialMessage}
                onMessageProcessed={() => setChatInitialMessage(null)}
            />

            <ScrollToTop />

            <Routes>
                <Route path="/" element={<HomePage user={user} setIsAuthModalOpen={setIsAuthModalOpen} onAskAI={handleAskAI} />} />
                <Route path="/login" element={<AuthPage user={user} onAuthSuccess={(u) => setIsAuthModalOpen(false)} />} />
                <Route path="/register" element={<AuthPage user={user} onAuthSuccess={(u) => setIsAuthModalOpen(false)} />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/rank-estimator" element={<RankPredictorPage onAskAI={handleAskAI} />} />
                <Route path="/college-matcher" element={<CollegeMatcherPage onAskAI={handleAskAI} />} />
                <Route path="/exams" element={<ExamsHubPage />} />

                {/* Header Top-Level Redirects */}
                <Route path="/colleges" element={<ExploreCollegesPage />} />
                <Route path="/predictors" element={<PredictorsHubPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/community" element={<CommunityPage />} />
                {/* <Route path="/career-library" element={<Navigate to="/roadmaps" replace />} /> */}
                <Route path="/results" element={<ResultsPage onAskAI={handleAskAI} />} />
                <Route path="/news" element={<NewsPage />} />





                {/* Master Category SEO Routes */}
                <Route path="/mba" element={
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
                        <GenericFooterPage
                            data={FOOTER_PAGES['mba-india']}
                            onBack={() => window.history.back()}
                            onAskAI={handleAskAI}
                            pageId="mba-india"
                        />
                    </div>
                } />
                <Route path="/engineering" element={
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
                        <GenericFooterPage
                            data={FOOTER_PAGES['eng-india']}
                            onBack={() => window.history.back()}
                            onAskAI={handleAskAI}
                            pageId="eng-india"
                        />
                    </div>
                } />
                <Route path="/medical" element={
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
                        <GenericFooterPage
                            data={FOOTER_PAGES['med-india']}
                            onBack={() => window.history.back()}
                            onAskAI={handleAskAI}
                            pageId="med-india"
                        />
                    </div>
                } />
                <Route path="/tools" element={
                    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
                        <GenericFooterPage
                            data={FOOTER_PAGES['tools-hub']}
                            onBack={() => window.history.back()}
                            onAskAI={handleAskAI}
                            pageId="tools-hub"
                        />
                    </div>
                } />



                {/* Static Content Routes */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/disclaimer" element={<Disclaimer />} />

                <Route path="/exams/:examId" element={<ExamDetailsPge />} />
                <Route path="/latest-news" element={<Navigate to="/news" replace />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/category/:categorySlug" element={<BlogListPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/recommended-colleges" element={<CollegeMatchResults />} />
                {/* Global Redirects for Exams hitting /college/ path */}
                <Route path="/college/gate/*" element={<Navigate to="/exams/gate" replace />} />
                <Route path="/college/cat/*" element={<Navigate to="/exams/cat" replace />} />
                <Route path="/college/jee/*" element={<Navigate to="/exams/jee-main" replace />} />
                <Route path="/college/neet/*" element={<Navigate to="/exams/neet" replace />} />
                <Route path="/college/xat/*" element={<Navigate to="/exams/xat" replace />} />
                <Route path="/college/clat/*" element={<Navigate to="/exams/clat" replace />} />
                <Route path="/college/mat/*" element={<Navigate to="/exams/mat" replace />} />
                <Route path="/college/nift/*" element={<Navigate to="/exams/nift" replace />} />

                <Route path="/college/:collegeName" element={<CollegeDetailPage />} />

                {/* Dynamic Footer Pages */}
                {Object.keys(FOOTER_PAGES).map((slug) => {
                    // Skip exam-related slugs here as they are handled by the static /exams/:examId route
                    if (slug.startsWith('exam-') || slug.startsWith('exams-')) return null;

                    const footerPageData = FOOTER_PAGES[slug];
                    // Skip these specific slugs as they are now handled by dedicated components above
                    const isDedicatedStatic = [
                        'company-about', 'company-contact',
                        'legal-privacy', 'legal-terms', 'legal-disclaimer'
                    ].includes(slug);

                    if (isDedicatedStatic) return null;

                    let path = `/${slug.replace(/-/g, '/')}`;

                    // Special override for consistency with navigationData urls
                    if (slug === 'iits-india') path = '/iits/india';
                    if (slug === 'nits-india') path = '/nits/india';
                    if (slug === 'aiims-colleges') path = '/aiims/colleges';
                    if (slug === 'btech-india') path = '/eng/india';
                    if (slug === 'mbbs-india') path = '/mbbs/india';
                    if (slug.startsWith('tool-')) path = `/tools/${slug.replace('tool-', '')}`;
                    if (slug.startsWith('legal-')) path = `/legal/${slug.replace('legal-', '')}`;
                    if (slug.startsWith('company-')) path = `/company/${slug.replace('company-', '')}`;
                    if (slug.startsWith('site-')) path = `/site/${slug.replace('site-', '')}`;

                    return (
                        <Route
                            key={slug}
                            path={path}
                            element={
                                <div className="relative z-10">
                                    {(slug.startsWith('legal-') || slug.startsWith('company-') || slug.startsWith('site-')) ? (
                                        <StaticInfoPage
                                            data={footerPageData}
                                            onBack={() => window.history.back()}
                                        />
                                    ) : (
                                        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12">
                                            <GenericFooterPage
                                                data={footerPageData}
                                                onBack={() => window.history.back()}
                                                onAskAI={handleAskAI}
                                                pageId={slug}
                                            />
                                        </div>
                                    )}
                                </div>
                            }
                        />
                    );
                })}

                {/* Fallback for unmapped routes - Elite 404 Page */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer onPageRequest={
                (path) => navigate(path)
            } />
        </div>
    );
};

export default App;
