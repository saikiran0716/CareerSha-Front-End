import React, { useState, useEffect } from 'react';
import { resolveLiveResultLink } from '../../services/geminiService';
import { BookOpen, GraduationCap, Stethoscope, Building2, Map, MapPin, Landmark, Briefcase, Landmark as Bank, Users, FileText, FileBadge } from 'lucide-react';

const EXAM_CATEGORIES = [
    {
        title: 'School Boards (10th/12th)',
        icon: BookOpen,
        exams: [
            { name: 'CBSE Class 10 & 12', link: 'https://results.cbse.nic.in/' },
            { name: 'ICSE / ISC Results', link: 'https://results.cisce.org/' },
            { name: 'UP Board Results', link: 'https://upresults.nic.in/' },
            { name: 'Bihar Board (BSEB)', link: 'http://results.biharboardonline.com/' },
            { name: 'Maharashtra HSC/SSC', link: 'http://mahresult.nic.in/' },
            { name: 'TS Intermediate/SSC', link: 'https://bse.telangana.gov.in/' },
            { name: 'AP Intermediate/SSC', link: 'https://bieap.apcfss.in/' },
            { name: 'Karnataka PUC/SSLC', link: 'https://karresults.nic.in/' },
            { name: 'Tamil Nadu HSE/SSLC', link: 'https://tnresults.nic.in/' },
            { name: 'Kerala Plus Two/SSLC', link: 'https://keralaresults.nic.in/' },
        ]
    },
    {
        title: 'Engineering (B.Tech/BE)',
        icon: GraduationCap,
        exams: [
            { name: 'JEE Main 2025', link: 'https://jeemain.nta.nic.in' },
            { name: 'JEE Advanced 2025', link: 'https://jeeadv.ac.in/' },
            { name: 'GATE 2025 (IIT Roorkee)', link: 'https://gate2025.iitr.ac.in/' },
            { name: 'BITSAT Results', link: 'https://www.bitsadmission.com/' },
            { name: 'VITEEE Results', link: 'https://viteee.vit.ac.in/' },
            { name: 'SRMJEEE Results', link: 'https://www.srmist.edu.in/' },
            { name: 'COMEDK UGET', link: 'https://www.comedk.org/' },
            { name: 'MHT-CET (Engg)', link: 'https://cetcell.mahacet.org/' },
            { name: 'TS EAPCET 2025', link: 'https://eapcet.tgche.ac.in/' },
            { name: 'AP EAPCET 2025', link: 'https://cets.apsche.ap.gov.in/' },
            { name: 'WBJEE Results', link: 'https://wbjeeb.nic.in/' },
            { name: 'KCET Results', link: 'https://kea.kar.nic.in/' },
        ]
    },
    {
        title: 'Medical & Pharma',
        icon: Stethoscope,
        exams: [
            { name: 'NEET UG 2025', link: 'https://neet.nta.nic.in' },
            { name: 'NEET PG Results', link: 'https://natboard.edu.in/' },
            { name: 'AIIMS Professional', link: 'https://www.aiimsexams.ac.in/' },
            { name: 'NIPER JEE Results', link: 'https://www.niperhyd.ac.in/' },
            { name: 'GPAT (Pharmacy)', link: 'https://gpat.nta.nic.in/' },
            { name: 'ICAR AIEEA (Agri)', link: 'https://icar.nta.ac.in/' },
            { name: 'KEAM (Kerala)', link: 'https://cee.kerala.gov.in/' },
        ]
    },
    {
        title: 'Central Universities',
        icon: Building2,
        exams: [
            { name: 'DU Result Portal', link: 'https://durslt.du.ac.in/' },
            { name: 'JNU Result Portal', link: 'https://jnuee.jnu.ac.in/' },
            { name: 'BHU Samarth Portal', link: 'https://bhuonline.in/' },
            { name: 'AMU Controller Exams', link: 'https://www.amucontrollerexams.com/' },
            { name: 'JMI Results', link: 'https://www.jmi.ac.in/' },
            { name: 'CUET UG/PG Results', link: 'https://cuet.samarth.ac.in/' },
        ]
    },
    {
        title: 'State Universities (N/E)',
        icon: Map,
        exams: [
            { name: 'Lucknow University', link: 'https://www.lkouniv.ac.in/' },
            { name: 'Calcutta University', link: 'https://www.caluniv.ac.in/' },
            { name: 'Patna University', link: 'https://www.patnauniversity.ac.in/' },
            { name: 'Chandigarh University', link: 'https://www.cuchd.in/' },
            { name: 'Gauhati University', link: 'https://www.gauhati.ac.in/' },
        ]
    },
    {
        title: 'State Universities (S/W)',
        icon: MapPin,
        exams: [
            { name: 'Osmania Univ Results', link: 'https://www.osmania.ac.in/' },
            { name: 'Andhra University', link: 'https://www.andhrauniversity.edu.in/' },
            { name: 'Mumbai Univ Results', link: 'https://mumresults.in/' },
            { name: 'Pune Univ Results', link: 'https://onlineresults.unipune.ac.in/' },
            { name: 'Bangalore University', link: 'https://bangaloreuniversity.ac.in/' },
            { name: 'Anna Univ (COE)', link: 'https://coe1.annauniv.edu/' },
        ]
    },
    {
        title: 'Private Universities',
        icon: Landmark,
        exams: [
            { name: 'Manipal (MAHE)', link: 'https://manipal.edu/' },
            { name: 'Amrita Vishwa', link: 'https://www.amrita.edu/' },
            { name: 'Thapar Institute', link: 'https://www.thapar.edu/' },
            { name: 'Amity University', link: 'https://www.amity.edu/' },
            { name: 'LPU Result Portal', link: 'https://www.lpu.in/' },
            { name: 'Symbiosis (SIU)', link: 'https://www.siu.edu.in/' },
        ]
    },
    {
        title: 'Management & Law',
        icon: Briefcase,
        exams: [
            { name: 'CAT 2024 Results', link: 'https://iimcat.ac.in' },
            { name: 'XAT 2025 Results', link: 'https://xatonline.in/' },
            { name: 'NMAT Results', link: 'https://www.mba.com/' },
            { name: 'CLAT (Law) Results', link: 'https://consortiumofnlus.ac.in/' },
            { name: 'AILET Results', link: 'https://nationallawuniversitydelhi.in/' },
            { name: 'TS/AP ICET Results', link: 'https://icet.tsche.ac.in/' },
        ]
    },
    {
        title: 'Banking & Insurance',
        icon: Bank,
        exams: [
            { name: 'IBPS Result Portal', link: 'https://www.ibps.in/' },
            { name: 'SBI Careers (Results)', link: 'https://www.sbi.co.in/careers' },
            { name: 'RBI Grade B Results', link: 'https://www.rbi.org.in/' },
            { name: 'LIC AAO/ADO Results', link: 'https://licindia.in/careers' },
        ]
    },
    {
        title: 'SSC & Central Jobs',
        icon: Users,
        exams: [
            { name: 'SSC Official Portal', link: 'https://ssc.gov.in/' },
            { name: 'UPSC Result Portal', link: 'https://www.upsc.gov.in/' },
            { name: 'RRB Recruitment', link: 'https://www.indianrailways.gov.in/' },
            { name: 'UGC NET Results', link: 'https://ugcnet.nta.nic.in/' },
        ]
    },
    {
        title: 'State PSC Results',
        icon: FileText,
        exams: [
            { name: 'TSPSC Results', link: 'https://tspsc.gov.in/' },
            { name: 'APPSC Results', link: 'https://psc.ap.gov.in/' },
            { name: 'UPPSC Results', link: 'https://uppsc.up.nic.in/' },
            { name: 'BPSC Results', link: 'https://bpsc.bih.nic.in/' },
            { name: 'MPSC Results', link: 'https://mpsc.gov.in/' },
        ]
    },
    {
        title: 'Professional & Others',
        icon: FileBadge,
        exams: [
            { name: 'CA/CS/CMA Results', link: 'https://icai.nic.in/' },
            { name: 'CTET (Teaching)', link: 'https://ctet.nic.in/' },
            { name: 'NATA (Architecture)', link: 'https://www.nata.in/' },
            { name: 'NIFT Results', link: 'https://nift.ac.in/' },
        ]
    }
];

interface ExamResultsPageProps {
    onAskAI: (topic: string) => void;
    compact?: boolean;
}

const ExamResultsPage: React.FC<ExamResultsPageProps> = ({ onAskAI, compact = false }) => {
    const [resolvingFor, setResolvingFor] = useState<{ name: string; categoryIdx: number } | null>(null);
    const [is1024, setIs1024] = useState(window.innerWidth >= 1024 && window.innerWidth < 1280);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIs1024(window.innerWidth >= 1024 && window.innerWidth < 1280);
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelect = async (examName: string, staticLink: string, categoryIdx: number) => {
        if (!staticLink) return;

        setResolvingFor({ name: examName, categoryIdx });

        try {
            // Direct Redirection via API
            const liveLink = await resolveLiveResultLink(examName);
            const finalUrl = liveLink || staticLink;

            // Using location.assign for 100% reliability in async context
            window.location.assign(finalUrl);
        } catch (error) {
            console.error("Link resolution error:", error);
            window.open(staticLink, '_blank', 'noreferrer');
        } finally {
            setResolvingFor(null);
        }
    };


    return (
        <div className={compact ? "font-sans pb-12 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8" : "w-full pt-4 pb-12 mb-6 font-sans max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"}>
            {!compact && (
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-[#4B63D3] pl-4 sm:pl-5 py-1">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] tracking-tight leading-none">
                            EXAM <span className="text-[#4B63D3]">RESULTS</span>
                        </h2>
                        <p className="text-[#64748B] text-sm sm:text-[15px] leading-snug">Direct links to official scorecards.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-800 flex-shrink-0">
                        {resolvingFor ? (
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 border-2 border-slate-200 border-t-slate-800 dark:border-slate-800 dark:border-t-white rounded-full animate-spin" />
                                <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest animate-pulse">Syncing Live API...</span>
                            </div>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                </div>
            )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {EXAM_CATEGORIES.map((category, idx) => {
                    const CategoryIcon = category.icon;
                    return (
                        <div key={idx} className="space-y-3">
                            <div className="flex items-center gap-2 pl-1 border-l-2 border-slate-200 dark:border-slate-800 py-1">
                                <CategoryIcon className="w-4 h-4 text-slate-400" />
                                <h3 className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none">
                                    {category.title}
                                </h3>
                            </div>
                            <div className="relative">
                                <select
                                    className="w-[85%] max-w-[360px] bg-white dark:bg-slate-950 px-4 py-3 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm text-sm text-slate-700 dark:text-slate-300 font-medium cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            const exam = JSON.parse(e.target.value);
                                            handleSelect(exam.name, exam.link, idx);
                                            // Reset the select value back to empty after selection
                                            e.target.value = "";
                                        }
                                    }}
                                    disabled={!!resolvingFor}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        {(resolvingFor && resolvingFor.categoryIdx === idx)
                                            ? `Loading ${resolvingFor.name}...`
                                            : (is1024 || isMobile)
                                                ? `${category.title.split('(')[0].trim()} Results`
                                                : `Know Your ${category.title.split('(')[0].trim()} Results`}
                                    </option>
                                    {category.exams.map((exam, eIdx) => (
                                        <option key={eIdx} value={JSON.stringify(exam)}>
                                            {exam.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    );
                })}
            </div>


        </div >
    );
};

export default ExamResultsPage;
