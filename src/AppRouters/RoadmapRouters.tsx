import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { FOOTER_PAGES } from '../data/footerData';
import { navigationData } from '../data/navigationData';
import GenericFooterPage from '../components/GenericFooterPage/GenericFooterPage';
import StaticInfoPage from '../components/StaticInfoPage/StaticInfoPage';
import AIRoadmap from '../features/roadmaps/AIRoadmap';
import HomePage from '../components/HomePage/HomePage';
import Loader from '../components/Loader/Loader';
import NotFound from './NotFound';
import CollegeMatchResults from '../components/CollegeMatcher/CollegeMatchResults';
import CollegeDetailPage from '../components/CollegeMatcher/CollegeDetailPage';
import { NewsView } from '../components/NewsSection';
import BlogListPage from '../pages/Blog/BlogListPage';
import BlogDetailPage from '../pages/Blog/BlogDetailPage';
import ExamDetailsPge from '../components/EXAMS/ExamDetailsPge';

// Static Pages Imports
import AboutUs from '../pages/Static/AboutUs';
import ContactUs from '../pages/Static/ContactUs';
import PrivacyPolicy from '../pages/Static/PrivacyPolicy';
import TermsAndConditions from '../pages/Static/TermsAndConditions';
import Disclaimer from '../pages/Static/Disclaimer';

// Roadmap Imports
// Lazy Load Roadmap Components
const SoftwareEngineeringRoadmap = lazy(() => import('../features/roadmaps/SoftwareEngineering/SoftwareEngineeringRoadmap'));
const DataScientistRoadmap = lazy(() => import('../features/roadmaps/DataScientist/DataScientistRoadmap'));
const UiUxDesignerRoadmap = lazy(() => import('../features/roadmaps/UiUxDesigner/UiUxDesignerRoadmap'));
const CyberSecurityRoadmap = lazy(() => import('../features/roadmaps/CyberSecurity/CyberSecurityRoadmap'));
const CloudArchitectRoadmap = lazy(() => import('../features/roadmaps/CloudArchitect/CloudArchitectRoadmap'));
const AiEngineerRoadmap = lazy(() => import('../features/roadmaps/AiEngineer/AiEngineerRoadmap'));
const MobileAppDeveloperRoadmap = lazy(() => import('../features/roadmaps/MobileAppDeveloper/MobileAppDeveloperRoadmap'));
const BlockchainDeveloperRoadmap = lazy(() => import('../features/roadmaps/BlockchainDeveloper/BlockchainDeveloperRoadmap'));
const GameDeveloperRoadmap = lazy(() => import('../features/roadmaps/GameDeveloper/GameDeveloperRoadmap'));
const EmbeddedSystemsRoadmap = lazy(() => import('../features/roadmaps/EmbeddedSystems/EmbeddedSystemsRoadmap'));
const DevOpsEngineerRoadmap = lazy(() => import('../features/roadmaps/DevOpsEngineer/DevOpsEngineerRoadmap'));
const ArVrDeveloperRoadmap = lazy(() => import('../features/roadmaps/ArVrDeveloper/ArVrDeveloperRoadmap'));
const ProductManagerRoadmap = lazy(() => import('../features/roadmaps/ProductManager/ProductManagerRoadmap'));
const DataEngineerRoadmap = lazy(() => import('../features/roadmaps/DataEngineer/DataEngineerRoadmap'));
const NetworkEngineerRoadmap = lazy(() => import('../features/roadmaps/NetworkEngineer/NetworkEngineerRoadmap'));
const QaEngineerRoadmap = lazy(() => import('../features/roadmaps/QaEngineer/QaEngineerRoadmap'));
const DigitalMarketerRoadmap = lazy(() => import('../features/roadmaps/DigitalMarketer/DigitalMarketerRoadmap'));
const BusinessAnalystRoadmap = lazy(() => import('../features/roadmaps/BusinessAnalyst/BusinessAnalystRoadmap'));
const HrSpecialistRoadmap = lazy(() => import('../features/roadmaps/HrSpecialist/HrSpecialistRoadmap'));
const ContentStrategistRoadmap = lazy(() => import('../features/roadmaps/ContentStrategist/ContentStrategistRoadmap'));
const RoboticsEngineerRoadmap = lazy(() => import('../features/roadmaps/RoboticsEngineer/RoboticsEngineerRoadmap'));
const DatabaseAdministratorRoadmap = lazy(() => import('../features/roadmaps/DatabaseAdministrator/DatabaseAdministratorRoadmap'));
const SystemsAdministratorRoadmap = lazy(() => import('../features/roadmaps/SystemsAdministrator/SystemsAdministratorRoadmap'));
const TechnicalWriterRoadmap = lazy(() => import('../features/roadmaps/TechnicalWriter/TechnicalWriterRoadmap'));
const SalesEngineerRoadmap = lazy(() => import('../features/roadmaps/SalesEngineer/SalesEngineerRoadmap'));
const GraphicDesignerRoadmap = lazy(() => import('../features/roadmaps/GraphicDesigner/GraphicDesignerRoadmap'));
const VideoEditorRoadmap = lazy(() => import('../features/roadmaps/VideoEditor/VideoEditorRoadmap'));
const SoundEngineerRoadmap = lazy(() => import('../features/roadmaps/SoundEngineer/SoundEngineerRoadmap'));
const PublicRelationsSpecialistRoadmap = lazy(() => import('../features/roadmaps/PublicRelationsSpecialist/PublicRelationsSpecialistRoadmap'));
const OperationsManagerRoadmap = lazy(() => import('../features/roadmaps/OperationsManager/OperationsManagerRoadmap'));
const MernStackRoadmap = lazy(() => import('../features/roadmaps/MernStack/MernStackRoadmap'));
const MeanStackRoadmap = lazy(() => import('../features/roadmaps/MeanStack/MeanStackRoadmap'));
const FullStackJavaRoadmap = lazy(() => import('../features/roadmaps/FullStackJava/FullStackJavaRoadmap'));
const FullStackPythonRoadmap = lazy(() => import('../features/roadmaps/FullStackPython/FullStackPythonRoadmap'));
const CloudNativeRoadmap = lazy(() => import('../features/roadmaps/CloudNative/CloudNativeRoadmap'));
const DataAnalystRoadmap = lazy(() => import('../features/roadmaps/DataAnalyst/DataAnalystRoadmap'));
const MachineLearningEngineerRoadmap = lazy(() => import('../features/roadmaps/MachineLearningEngineer/MachineLearningEngineerRoadmap'));
const ItProjectManagerRoadmap = lazy(() => import('../features/roadmaps/ItProjectManager/ItProjectManagerRoadmap'));
const SapConsultantRoadmap = lazy(() => import('../features/roadmaps/SapConsultant/SapConsultantRoadmap'));
const SalesforceDeveloperRoadmap = lazy(() => import('../features/roadmaps/SalesforceDeveloper/SalesforceDeveloperRoadmap'));
const EmbeddedDeveloperRoadmap = lazy(() => import('../features/roadmaps/EmbeddedDeveloper/EmbeddedDeveloperRoadmap'));
const AutomationEngineerRoadmap = lazy(() => import('../features/roadmaps/AutomationEngineer/AutomationEngineerRoadmap'));
const ContentCreatorRoadmap = lazy(() => import('../features/roadmaps/ContentCreator/ContentCreatorRoadmap'));
const AnimatorRoadmap = lazy(() => import('../features/roadmaps/Animator/AnimatorRoadmap'));
const MotionGraphicsRoadmap = lazy(() => import('../features/roadmaps/MotionGraphics/MotionGraphicsRoadmap'));

// Rank Predictor Pages
const JEEMainRank = lazy(() => import('../pages/RankPredictors/JEEMainRank'));
const NEETRank = lazy(() => import('../pages/RankPredictors/NEETRank'));
const EAMCETRank = lazy(() => import('../pages/RankPredictors/EAMCETRank'));

interface RoadmapRoutersProps {
    onAskAI: (topic: string) => void;
    user: any;
    setIsAuthModalOpen: (isOpen: boolean) => void;
}

const RoadmapRouters: React.FC<RoadmapRoutersProps> = ({ onAskAI, user, setIsAuthModalOpen }) => {
    return (
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><Loader /></div>}>
            <Routes>
                <Route path="/" element={<HomePage user={user} setIsAuthModalOpen={setIsAuthModalOpen} onAskAI={onAskAI} />} />
                <Route path="/roadmaps" element={<main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12"><AIRoadmap /></main>} />
                <Route path="/roadmap/software-engineer" element={<SoftwareEngineeringRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/data-scientist" element={<DataScientistRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/ui-ux-designer" element={<UiUxDesignerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/cyber-security" element={<CyberSecurityRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/cloud-architect" element={<CloudArchitectRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/ai-engineer" element={<AiEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/mobile-app-developer" element={<MobileAppDeveloperRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/blockchain-developer" element={<BlockchainDeveloperRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/game-developer" element={<GameDeveloperRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/embedded-systems" element={<EmbeddedSystemsRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/devops-engineer" element={<DevOpsEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/ar-vr-developer" element={<ArVrDeveloperRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/product-manager" element={<ProductManagerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/data-engineer" element={<DataEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/network-engineer" element={<NetworkEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/qa-engineer" element={<QaEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/digital-marketer" element={<DigitalMarketerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/business-analyst" element={<BusinessAnalystRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/hr-specialist" element={<HrSpecialistRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/content-strategist" element={<ContentStrategistRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/robotics-engineer" element={<RoboticsEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/database-administrator" element={<DatabaseAdministratorRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/systems-administrator" element={<SystemsAdministratorRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/technical-writer" element={<TechnicalWriterRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/sales-engineer" element={<SalesEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/graphic-designer" element={<GraphicDesignerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/video-editor" element={<VideoEditorRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/sound-engineer" element={<SoundEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/public-relations-specialist" element={<PublicRelationsSpecialistRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/operations-manager" element={<OperationsManagerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/mern-stack" element={<MernStackRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/mean-stack" element={<MeanStackRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/full-stack-java" element={<FullStackJavaRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/full-stack-python" element={<FullStackPythonRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/cloud-native" element={<CloudNativeRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/data-analyst" element={<DataAnalystRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/machine-learning-engineer" element={<MachineLearningEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/it-project-manager" element={<ItProjectManagerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/sap-consultant" element={<SapConsultantRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/salesforce-developer" element={<SalesforceDeveloperRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/embedded-developer" element={<EmbeddedDeveloperRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/automation-engineer" element={<AutomationEngineerRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/content-creator" element={<ContentCreatorRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/animator" element={<AnimatorRoadmap onAskAI={onAskAI} />} />
                <Route path="/roadmap/motion-graphics" element={<MotionGraphicsRoadmap onAskAI={onAskAI} />} />

                {/* Rank Predictor Routes */}
                <Route path="/rank/jee-main" element={<JEEMainRank />} />
                <Route path="/rank/neet" element={<NEETRank />} />
                <Route path="/rank/ts-eamcet" element={<EAMCETRank />} />
                
                {/* Static Content Routes */}
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/disclaimer" element={<Disclaimer />} />

                <Route path="/exams/:examId" element={<ExamDetailsPge />} />
                <Route path="/latest-news" element={<NewsView />} />
                <Route path="/blog" element={<BlogListPage />} />
                <Route path="/blog/category/:categorySlug" element={<BlogListPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
                <Route path="/recommended-colleges" element={<CollegeMatchResults />} />
                {/* Global Redirects for Exams hitting /college/ path */}
                <Route path="/college/gate*" element={<Navigate to="/exams/gate" replace />} />
                <Route path="/college/cat*" element={<Navigate to="/exams/cat" replace />} />
                <Route path="/college/jee*" element={<Navigate to="/exams/jee-main" replace />} />
                <Route path="/college/neet*" element={<Navigate to="/exams/neet" replace />} />
                <Route path="/college/xat*" element={<Navigate to="/exams/xat" replace />} />
                <Route path="/college/clat*" element={<Navigate to="/exams/clat" replace />} />
                <Route path="/college/mat*" element={<Navigate to="/exams/mat" replace />} />
                <Route path="/college/nift*" element={<Navigate to="/exams/nift" replace />} />

                <Route path="/college/:collegeName" element={<CollegeDetailPage />} />
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
                    // Special cases like 'iits-india' should keep their structure if needed, 
                    // but for footer links we usually want the URL in the navigation to match.

                    // Since FOOTER_PAGES is at the root level of navigationData mapping, 
                    // we try to reconstruct the path or find it in navigationData.

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
                                                onAskAI={onAskAI}
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
        </Suspense>
    );
};

export default RoadmapRouters;
