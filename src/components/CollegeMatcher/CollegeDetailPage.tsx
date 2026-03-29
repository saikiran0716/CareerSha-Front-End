import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Navigate } from 'react-router-dom';
import SEO from '../SEO/SEO';
import {
    ArrowLeft, Globe, Phone, Award, ExternalLink,
    MapPin, Building2, Clock, School, Calendar, ChevronDown, ChevronUp,
    Shield, Sparkles, Loader2, GraduationCap, Users, BookOpen,
    TrendingUp, Mail, Star, CheckCircle2, ChevronRight,
    Trophy, FlaskConical, Zap, Tent, UserCheck, Briefcase,
    IndianRupee, Image, BarChart3, Lightbulb
} from 'lucide-react';
import { getCollegeDetails } from '../../services/geminiService';
import { CollegeDetail } from '../../types';
import GlassLoader from '../Loader/GlassLoader';

const getLogoSrc = (apiLogo: string, website: string, passedLogo: string): string => {
    if (passedLogo) return passedLogo;
    if (website) {
        try { return `https://www.google.com/s2/favicons?domain=${new URL(website).hostname}&sz=128`; }
        catch { /* ignore */ }
    }
    return (apiLogo && !apiLogo.includes('wikipedia')) ? apiLogo : '';
};

const TABS = ['Overview', 'Placements', 'Admissions', 'Campus Life', 'Gallery'];

const SectionCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2.5 bg-slate-50">
            <span>{icon}</span>
            <h2 className="text-[14px] font-extrabold text-slate-800">{title}</h2>
        </div>
        <div className="p-6">{children}</div>
    </div>
);

const colors: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    green: 'bg-emerald-50 border-emerald-100 text-emerald-700',
    amber: 'bg-amber-50 border-amber-100 text-amber-700',
    purple: 'bg-violet-50 border-violet-100 text-violet-700',
    rose: 'bg-rose-50 border-rose-100 text-rose-700',
};
const StatBadge: React.FC<{ label: string; value: string; color?: string }> = ({ label, value, color = 'blue' }) => (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border text-center ${colors[color] || colors.blue}`}>
        <p className="text-[20px] font-extrabold leading-tight">{value}</p>
        <p className="text-[10px] font-bold uppercase tracking-wide mt-1 opacity-70">{label}</p>
    </div>
);

const SkeletonBlock: React.FC<{ lines?: number }> = ({ lines = 4 }) => (
    <div className="space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="h-2.5 bg-slate-100 rounded-full animate-pulse" style={{ width: `${[90, 75, 85, 60, 70][i % 5]}%` }} />
        ))}
    </div>
);

const CollegeDetailPage: React.FC = () => {
    const { collegeName } = useParams<{ collegeName: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const decodedName = decodeURIComponent(collegeName || 'College');
    const pc = (location.state as any)?.college;

    const [d, setD] = useState<CollegeDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [logoError, setLogoError] = useState(false);
    const [logoSrc, setLogoSrc] = useState('');
    const [activeTab, setActiveTab] = useState('Overview');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (!collegeName) { setLoading(false); return; }

        const cacheKey = `college_detail_v2_${collegeName}`;
        try {
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                setD(JSON.parse(cached));
                setLoading(false);
                return;
            }
        } catch { /* ignore */ }

        setLoading(true);
        getCollegeDetails(decodedName)
            .then(r => {
                const result = r || null;
                setD(result);
                // Save to cache so return visits are instant
                if (result) {
                    try { sessionStorage.setItem(cacheKey, JSON.stringify(result)); } catch { /* quota exceeded */ }
                }
            })
            .catch(() => setD(null))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [collegeName]);

    useEffect(() => {
        const src = getLogoSrc(d?.logo || '', d?.website || pc?.website || '', pc?.logoUrl || '');
        setLogoSrc(src);
        setLogoError(false);
    }, [d, pc]);

    const name = d?.name || pc?.name || decodedName;
    const locVal = d?.location || pc?.location || '';
    const typeVal = d?.type || pc?.type || '';
    const website = d?.website || pc?.website || '';
    const phone_ = d?.phone || pc?.phone || '';
    const desc = d?.description || pc?.careerInsight || '';
    const est = d?.established || '';
    const nirf = d?.nirfRank || '';
    const email_ = d?.email || '';
    const address_ = d?.address || locVal;

    const highlightRows = [
        { param: 'Established', val: est },
        { param: 'Institute Type', val: typeVal },
        { param: 'Location', val: locVal },
        { param: 'Campus Size', val: d?.campusArea },
        { param: 'Entrance Exams', val: d?.entranceExams?.join(', ') || pc?.entranceExams?.join(', ') },
        { param: 'Total Courses', val: d?.totalCourses },
        { param: 'Total Degrees', val: d?.totalDegrees },
        { param: 'Student Strength', val: d?.totalStudents },
        { param: 'Faculty Count', val: d?.totalFaculty },
        { param: 'Gender Accepted', val: d?.gender },
        { param: 'Gender Ratio (M:F)', val: d?.genderRatio },
        { param: 'Students (Other States)', val: d?.studentsFromOtherStates },
        { param: 'Placement Rate', val: d?.placementRate },
        { param: 'Avg. Package', val: d?.avgPackage || pc?.medianPackage },
        { param: 'Highest Package', val: d?.highestPackage },
        { param: 'NIRF Rank', val: nirf ? `#${nirf} (National)` : undefined },
        { param: 'Accreditations', val: d?.accreditations?.join(' | ') },
        { param: 'Email', val: email_ },
        { param: 'Phone', val: phone_ },
        { param: 'Website', val: website },
    ].filter(r => r.val);

    const isGovt = typeVal?.toLowerCase().includes('gov') || typeVal?.toLowerCase().includes('national') || typeVal?.toLowerCase().includes('central') || typeVal?.toLowerCase().includes('iit') || typeVal?.toLowerCase().includes('nit');

    if (!loading && !d && !pc) {
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-950 overflow-x-hidden">
            <SEO 
                title={`${name} Admission, Fees, Courses & Placement 2026`} 
                description={`Check ${name} details including courses, fees, placements, and admission process. Get complete information on 2026 admissions.`}
                keywords={`${name}, ${locVal}, ${typeVal}, college details, placements, admissions, 2026`}
            />

            {/* Glass Loader Overlay */}
            {loading && <GlassLoader />}

            {/* Main Content Wrapper (Blurred while loading) */}
            <div className={`transition-all duration-1000 ease-out pointer-events-auto ${loading ? 'blur-2xl opacity-40 scale-[0.98]' : 'blur-0 opacity-100 scale-100'}`}>

            {/* ── TOP NAV ── */}
            <div className="bg-gradient-to-r from-blue-800 to-indigo-800 sticky top-0 z-50">
                <div className="max-w-[1300px] mx-auto px-6 h-12 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-blue-200 hover:text-white text-sm font-medium transition-colors">
                        <ArrowLeft size={14} /> Back to Results
                    </button>
                </div>
            </div>

            {/* ── HERO ── */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
                <div className="max-w-[1300px] mx-auto px-6 py-8">
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                        {/* Logo */}
                        <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl flex items-center justify-center p-2 shrink-0">
                            {logoSrc && !logoError
                                ? <img src={logoSrc} alt={name} onError={() => setLogoError(true)} className="w-full h-full object-contain rounded-xl" />
                                : <School size={44} className="text-white/50" />}
                        </div>
                        <div className="flex-1">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                {typeVal && (
                                    <span className={`text-[10px] font-extrabold rounded-full px-3 py-1 uppercase tracking-wider ${isGovt ? 'bg-amber-400 text-amber-900' : 'bg-white/20 text-white'}`}>
                                        {typeVal}
                                    </span>
                                )}
                                {nirf && <span className="text-[10px] font-extrabold bg-amber-400 text-amber-900 rounded-full px-3 py-1 uppercase tracking-wider">NIRF #{nirf}</span>}
                                {d?.accreditations?.slice(0, 3).map((a, i) => (
                                    <span key={i} className="text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full px-2.5 py-0.5">{a}</span>
                                ))}
                            </div>
                            {/* Title */}
                            <h1 className="text-[24px] sm:text-[30px] font-extrabold text-white leading-tight tracking-tight">{name}</h1>
                            {/* Subtitle row */}
                            <div className="flex flex-wrap items-center gap-4 mt-2 text-[13px] text-blue-100">
                                {locVal && <span className="flex items-center gap-1.5"><MapPin size={13} /> {locVal}</span>}
                                {est && <span className="flex items-center gap-1.5"><Clock size={13} /> Est. {est}</span>}
                                {d?.totalStudents && <span className="flex items-center gap-1.5"><Users size={13} /> {d.totalStudents} Students</span>}
                                {d?.campusArea && <span className="flex items-center gap-1.5"><Building2 size={13} /> {d.campusArea}</span>}
                            </div>
                            {/* Placement quick-stat pills */}
                            {(d?.placementRate || d?.avgPackage || d?.highestPackage) && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {d?.placementRate && <span className="bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[11px] font-bold px-3 py-1 rounded-full">📊 {d.placementRate} Placed</span>}
                                    {(d?.avgPackage || pc?.medianPackage) && <span className="bg-blue-400/20 border border-blue-300/30 text-blue-200 text-[11px] font-bold px-3 py-1 rounded-full">💼 {d?.avgPackage || pc?.medianPackage} Avg CTC</span>}
                                    {d?.highestPackage && <span className="bg-violet-400/20 border border-violet-300/30 text-violet-200 text-[11px] font-bold px-3 py-1 rounded-full">🚀 {d.highestPackage} Top CTC</span>}
                                </div>
                            )}
                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-2.5 mt-4">
                                {website && <a href={website} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-white text-blue-700 text-[12px] font-extrabold rounded-lg uppercase tracking-wide transition-all hover:shadow-lg flex items-center gap-1.5"><Globe size={12} /> Website</a>}
                                {website && <a href={`${website}/admissions`} target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-white/15 border border-white/30 text-white hover:bg-white/25 text-[12px] font-extrabold rounded-lg uppercase tracking-wide transition-all flex items-center gap-1.5"><GraduationCap size={12} /> Apply Now</a>}
                                {phone_ && <a href={`tel:${phone_}`} className="px-5 py-2 bg-white/15 border border-white/30 text-white hover:bg-white/25 text-[12px] font-extrabold rounded-lg uppercase tracking-wide transition-all flex items-center gap-1.5"><Phone size={12} /> Call</a>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── TAB NAV ── */}
                <div className="max-w-[1300px] mx-auto px-6">
                    <div className="flex gap-0 overflow-x-auto">
                        {TABS.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3.5 text-[12px] font-bold uppercase tracking-wider whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-white text-white' : 'border-transparent text-blue-200 hover:text-white hover:border-white/40'}`}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="max-w-[1300px] mx-auto px-6 pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

                    {/* ── LEFT CONTENT (tabbed) ── */}
                    <div className="space-y-5">

                        {/* ════════════ OVERVIEW TAB ════════════ */}
                        {activeTab === 'Overview' && (<>

                            {/* About */}
                            <SectionCard title={`About ${name}`} icon={<School size={16} className="text-blue-500" />}>
                                {desc ? (
                                    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
                                ) : (
                                    <SkeletonBlock />
                                )}
                                {d?.campusAtmosphere && (
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <h3 className="text-[13px] font-bold text-slate-700 mb-2">Campus Atmosphere</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{d.campusAtmosphere}</p>
                                    </div>
                                )}
                                {d?.campusLife && (
                                    <div className="mt-4 pt-4 border-t border-slate-100">
                                        <h3 className="text-[13px] font-bold text-slate-700 mb-2">Campus Life</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{d.campusLife}</p>
                                    </div>
                                )}
                            </SectionCard>

                            {/* Key Stats grid */}
                            {!loading && d?.stats && d.stats.length > 0 && (
                                <SectionCard title="Key Statistics" icon={<BarChart3 size={16} className="text-blue-500" />}>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {d.stats.map((s, i) => {
                                            const palette = ['blue', 'green', 'amber', 'purple', 'rose', 'blue'];
                                            return <StatBadge key={i} label={s.label} value={s.value} color={palette[i % palette.length]} />;
                                        })}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Highlights Table */}
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                                    <h2 className="text-[14px] font-extrabold text-slate-800">{name} — Quick Facts</h2>
                                </div>
                                {highlightRows.length === 0 && loading ? (
                                    <div className="p-6"><SkeletonBlock lines={6} /></div>
                                ) : (
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-blue-600 text-white text-left">
                                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide w-[42%]">Parameter</th>
                                                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wide">Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {highlightRows.map((row, i) => (
                                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                    <td className="px-5 py-3 text-slate-500 font-medium text-[13px] border-b border-slate-100">{row.param}</td>
                                                    <td className="px-5 py-3 text-slate-800 font-semibold text-[13px] border-b border-slate-100">
                                                        {row.param === 'Website' ? (
                                                            <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">{website} <ExternalLink size={11} /></a>
                                                        ) : row.param === 'Entrance Exams' ? (
                                                            <div className="flex flex-wrap gap-1.5">
                                                                {(d?.entranceExams || pc?.entranceExams || []).map((e: string, j: number) => (
                                                                    <span key={j} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-[11px] font-bold">{e}</span>
                                                                ))}
                                                            </div>
                                                        ) : row.val}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Achievements/Rankings */}
                            {!loading && d?.achievements && d.achievements.length > 0 && (
                                <SectionCard title="Rankings & Achievements" icon={<Award size={16} className="text-amber-500" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {d.achievements.map((a, i) => (
                                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-100">
                                                <Star size={13} className="text-amber-500 mt-0.5 shrink-0" />
                                                <p className="text-[12.5px] text-amber-900 leading-relaxed">{a}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Courses & Specializations */}
                            {!loading && d?.specializations && d.specializations.length > 0 && (
                                <SectionCard title="Courses & Specializations" icon={<BookOpen size={16} className="text-blue-500" />}>
                                    <div className="flex flex-wrap gap-2">
                                        {d.specializations.map((s, i) => (
                                            <span key={i} className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[12.5px] font-semibold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors cursor-default">{s}</span>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Fee Structure */}
                            {!loading && d?.feeStructure && d.feeStructure.length > 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
                                        <IndianRupee size={16} className="text-blue-500" />
                                        <h2 className="text-[14px] font-extrabold text-slate-800">Fee Structure</h2>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-blue-600 text-white">
                                                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-wide">Program</th>
                                                <th className="px-6 py-3 text-right text-[11px] font-bold uppercase tracking-wide">Annual Fees</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {d.feeStructure.map((f, i) => (
                                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                    <td className="px-6 py-3 text-slate-700 font-medium border-b border-slate-100">{f.program}</td>
                                                    <td className="px-6 py-3 text-emerald-700 font-bold text-right border-b border-slate-100">{f.fees}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {d?.scholarshipInfo && (
                                        <div className="px-6 py-3 bg-emerald-50 border-t border-emerald-100 flex items-start gap-2 text-[12px] text-emerald-700">
                                            <Shield size={13} className="mt-0.5 shrink-0 text-emerald-500" />
                                            <span className="leading-relaxed">{d.scholarshipInfo}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Key Highlights */}
                            {!loading && d?.highlights && d.highlights.length > 0 && (
                                <SectionCard title="Key Highlights" icon={<Sparkles size={16} className="text-blue-500" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {d.highlights.map((h, i) => (
                                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-blue-50 border border-blue-100">
                                                <CheckCircle2 size={13} className="text-blue-500 mt-0.5 shrink-0" />
                                                <p className="text-[12.5px] text-slate-700 leading-relaxed">{h}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Research & Innovations */}
                            {!loading && d?.researchAndInnovations && d.researchAndInnovations.length > 0 && (
                                <SectionCard title="Research & Innovations" icon={<Lightbulb size={16} className="text-violet-500" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {d.researchAndInnovations.map((r, i) => (
                                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-violet-50 border border-violet-100">
                                                <Zap size={13} className="text-violet-500 mt-0.5 shrink-0" />
                                                <p className="text-[12.5px] text-violet-900 leading-relaxed">{r}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Notable Alumni */}
                            {!loading && d?.notableAlumni && d.notableAlumni.length > 0 && (
                                <SectionCard title="Notable Alumni" icon={<UserCheck size={16} className="text-teal-500" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {d.notableAlumni.map((alum, i) => {
                                            const initials = alum.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
                                            return (
                                                <div key={i} className="flex items-start gap-3 p-3.5 bg-teal-50 border border-teal-100 rounded-xl">
                                                    <div className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center text-[11px] font-extrabold shrink-0">{initials}</div>
                                                    <div>
                                                        <p className="text-[13px] font-bold text-teal-800">{alum.name}</p>
                                                        <p className="text-[11.5px] text-teal-600 mt-0.5 leading-relaxed">{alum.achievement}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </SectionCard>
                            )}

                        </>) /* end Overview */}

                        {/* ════════════ PLACEMENTS TAB ════════════ */}
                        {activeTab === 'Placements' && (<>

                            {/* Placement Overview */}
                            {(d?.placementRate || d?.avgPackage || d?.highestPackage || pc?.medianPackage) && (
                                <SectionCard title="Placement Overview" icon={<TrendingUp size={16} className="text-emerald-500" />}>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                                        {[
                                            { label: 'Placement Rate', val: d?.placementRate, color: 'green' },
                                            { label: 'Avg. Package', val: d?.avgPackage || pc?.medianPackage, color: 'blue' },
                                            { label: 'Highest Package', val: d?.highestPackage, color: 'purple' },
                                        ].filter(s => s.val).map((s, i) => (
                                            <StatBadge key={i} label={s.label} value={s.val!} color={s.color} />
                                        ))}
                                    </div>
                                    {(d?.topRecruiters?.length || pc?.recruiters?.length) ? (
                                        <div>
                                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Top Recruiters</p>
                                            <div className="flex flex-wrap gap-2">
                                                {(d?.topRecruiters || pc?.recruiters || []).map((r: string, i: number) => (
                                                    <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-[12px] font-semibold shadow-sm">{r}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ) : null}
                                </SectionCard>
                            )}

                            {/* Placement By Branch */}
                            {!loading && d?.placementByBranch && d.placementByBranch.length > 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
                                        <BarChart3 size={16} className="text-blue-500" />
                                        <h2 className="text-[14px] font-extrabold text-slate-800">Placements by Branch</h2>
                                    </div>
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="bg-blue-600 text-white">
                                                <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide">Branch</th>
                                                <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">Placed %</th>
                                                <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">Avg CTC</th>
                                                <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">Top CTC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {d.placementByBranch.map((b, i) => (
                                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                    <td className="px-5 py-3 text-slate-700 font-semibold text-[13px] border-b border-slate-100">{b.branch}</td>
                                                    <td className="px-5 py-3 text-center text-[13px] font-bold text-emerald-700 border-b border-slate-100">{b.placedPct}</td>
                                                    <td className="px-5 py-3 text-center text-[13px] font-semibold text-slate-700 border-b border-slate-100">{b.avgPackage}</td>
                                                    <td className="px-5 py-3 text-center text-[13px] font-bold text-violet-700 border-b border-slate-100">{b.topPackage}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* Placement Drives */}
                            {!loading && d?.placementDrives && d.placementDrives.length > 0 && (
                                <SectionCard title="Placement Drives & Company Visits" icon={<Briefcase size={16} className="text-blue-600" />}>
                                    <div className="space-y-3">
                                        {d.placementDrives.map((pd, i) => (
                                            <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-colors">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-[11px] font-extrabold shrink-0">
                                                    {pd.company.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="text-[14px] font-bold text-slate-800">{pd.company}</p>
                                                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">{pd.year}</span>
                                                    </div>
                                                    <p className="text-[12px] text-slate-500 mt-0.5">{pd.role}</p>
                                                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">CTC: {pd.package}</span>
                                                        {pd.studentsHired && <span className="text-[11px] font-bold text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">{pd.studentsHired} hired</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {(!d?.placementDrives || d.placementDrives.length === 0) && loading && <SectionCard title="Placement Drives" icon={<Briefcase size={16} className="text-blue-500" />}><SkeletonBlock lines={4} /></SectionCard>}

                        </>) /* end Placements */}

                        {/* ════════════ ADMISSIONS TAB ════════════ */}
                        {activeTab === 'Admissions' && (<>

                            {/* Branch Cutoffs */}
                            {!loading && d?.branchCutoffs && d.branchCutoffs.length > 0 ? (
                                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
                                        <BarChart3 size={16} className="text-blue-500" />
                                        <div>
                                            <h2 className="text-[14px] font-extrabold text-slate-800">Branch-wise Cutoffs (JEE/{d.branchCutoffs[0]?.year || '2024'})</h2>
                                            <p className="text-[11px] text-slate-400 mt-0.5">Closing ranks — lower is better</p>
                                        </div>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-blue-600 text-white">
                                                    <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wide">Branch</th>
                                                    <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">Open</th>
                                                    <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">OBC-NCL</th>
                                                    <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">SC</th>
                                                    <th className="px-5 py-3 text-center text-[11px] font-bold uppercase tracking-wide">ST</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {d.branchCutoffs.map((c, i) => (
                                                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                                        <td className="px-5 py-3 font-semibold text-slate-700 text-[13px] border-b border-slate-100">{c.branch}</td>
                                                        <td className="px-5 py-3 text-center font-bold text-blue-700 text-[13px] border-b border-slate-100">{c.open}</td>
                                                        <td className="px-5 py-3 text-center text-slate-600 text-[13px] border-b border-slate-100">{c.obc}</td>
                                                        <td className="px-5 py-3 text-center text-slate-600 text-[13px] border-b border-slate-100">{c.sc}</td>
                                                        <td className="px-5 py-3 text-center text-slate-600 text-[13px] border-b border-slate-100">{c.st}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : loading ? (
                                <SectionCard title="Branch Cutoffs" icon={<BarChart3 size={16} className="text-blue-500" />}><SkeletonBlock lines={5} /></SectionCard>
                            ) : null}

                            {/* Admission Timeline */}
                            {!loading && d?.admissionTimeline && d.admissionTimeline.length > 0 && (
                                <SectionCard title="Admission Timeline 2025–26" icon={<Calendar size={16} className="text-blue-500" />}>
                                    {d.admissionTimeline.map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-extrabold shrink-0">{i + 1}</div>
                                                {i < d.admissionTimeline.length - 1 && <div className="w-px flex-1 bg-slate-200 my-1" />}
                                            </div>
                                            <div className="pb-5 pt-0.5">
                                                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{item.date}</p>
                                                <p className="text-sm font-semibold text-slate-700 mt-0.5">{item.event}</p>
                                            </div>
                                        </div>
                                    ))}
                                </SectionCard>
                            )}

                            {/* Scholarships */}
                            {!loading && d?.scholarships && d.scholarships.length > 0 && (
                                <SectionCard title="Scholarships Available" icon={<Shield size={16} className="text-emerald-500" />}>
                                    <div className="space-y-3">
                                        {d.scholarships.map((s, i) => (
                                            <div key={i} className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                                                <div className="flex items-start justify-between gap-3">
                                                    <p className="text-[13px] font-bold text-emerald-800">{s.name}</p>
                                                    <span className="text-[11px] font-extrabold bg-emerald-100 text-emerald-700 rounded-full px-2.5 py-0.5 shrink-0">{s.amount}</span>
                                                </div>
                                                <p className="text-[12px] text-emerald-600 mt-1.5 leading-relaxed">{s.criteria}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* FAQs */}
                            {!loading && d?.faqs && d.faqs.length > 0 && (
                                <SectionCard title="Frequently Asked Questions" icon={<ChevronDown size={16} className="text-blue-500" />}>
                                    <div className="space-y-2">
                                        {d.faqs.map((faq, i) => (
                                            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                                    className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-slate-50 transition-colors">
                                                    <span className="text-[13px] font-semibold text-slate-800 pr-4">{i + 1}. {faq.question}</span>
                                                    {openFaq === i ? <ChevronUp size={15} className="shrink-0 text-blue-500" /> : <ChevronDown size={15} className="shrink-0 text-slate-400" />}
                                                </button>
                                                {openFaq === i && (
                                                    <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50">
                                                        <p className="text-[13px] text-slate-600 leading-relaxed">{faq.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                        </>) /* end Admissions */}

                        {/* ════════════ CAMPUS LIFE TAB ════════════ */}
                        {activeTab === 'Campus Life' && (<>

                            {/* Campus Life */}
                            {(d?.campusLife || d?.campusAtmosphere) && (
                                <SectionCard title="Campus Life & Atmosphere" icon={<School size={16} className="text-blue-500" />}>
                                    {d?.campusLife && <p className="text-slate-600 text-sm leading-relaxed">{d.campusLife}</p>}
                                    {d?.campusAtmosphere && (
                                        <div className={d?.campusLife ? 'mt-3 pt-3 border-t border-slate-100' : ''}>
                                            <p className="text-slate-600 text-sm leading-relaxed">{d.campusAtmosphere}</p>
                                        </div>
                                    )}
                                </SectionCard>
                            )}

                            {/* Events & Fests */}
                            {!loading && d?.events && d.events.length > 0 && (
                                <SectionCard title="Events & Fests" icon={<Sparkles size={16} className="text-pink-500" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {d.events.map((ev, i) => (
                                            <div key={i} className="flex items-center gap-2.5 p-3 rounded-lg bg-pink-50 border border-pink-100">
                                                <Star size={13} className="text-pink-400 shrink-0" />
                                                <p className="text-[12.5px] text-pink-900 font-semibold">{ev}</p>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Sports & Games */}
                            {!loading && d?.sportsAndGames && d.sportsAndGames.length > 0 && (
                                <SectionCard title="Sports & Games" icon={<Trophy size={16} className="text-amber-500" />}>
                                    <div className="flex flex-wrap gap-2">
                                        {d.sportsAndGames.map((s, i) => (
                                            <span key={i} className="px-3 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-[12.5px] font-semibold">{s}</span>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Labs & Facilities */}
                            {!loading && d?.labsAndFacilities && d.labsAndFacilities.length > 0 && (
                                <SectionCard title="Labs & Facilities" icon={<FlaskConical size={16} className="text-indigo-500" />}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {d.labsAndFacilities.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2.5 p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                                                <Zap size={12} className="text-indigo-400 shrink-0" />
                                                <span className="text-[12.5px] text-indigo-800 font-semibold">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </SectionCard>
                            )}

                            {/* Hostel */}
                            {!loading && d?.hostelInfo && (
                                <SectionCard title="Hostel & Accommodation" icon={<Tent size={16} className="text-orange-500" />}>
                                    <p className="text-slate-600 text-sm leading-relaxed">{d.hostelInfo}</p>
                                </SectionCard>
                            )}

                            {(!d?.events || d.events.length === 0) && loading && <SectionCard title="Campus Life" icon={<School size={16} className="text-blue-500" />}><SkeletonBlock lines={4} /></SectionCard>}

                        </>) /* end Campus Life */}

                        {/* ════════════ GALLERY TAB ════════════ */}
                        {activeTab === 'Gallery' && (
                            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
                                    <Image size={16} className="text-blue-500" />
                                    <h2 className="text-[14px] font-extrabold text-slate-800">Campus Gallery</h2>
                                </div>
                                {loading ? (
                                    <div className="p-6"><SkeletonBlock lines={4} /></div>
                                ) : d?.galleryImages && d.galleryImages.filter((_, i) => !imgErrors[i]).length > 0 ? (
                                    <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {d.galleryImages.map((img, i) => (
                                            !imgErrors[i] && (
                                                <div key={i} className="relative rounded-xl overflow-hidden bg-slate-100 aspect-video group">
                                                    <img
                                                        src={img.url}
                                                        alt={img.caption}
                                                        onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    {img.caption && (
                                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                                                            <p className="text-[11px] text-white font-semibold leading-tight">{img.caption}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-12 flex flex-col items-center gap-3 text-center">
                                        <School size={40} className="text-slate-300" />
                                        <p className="text-slate-500 text-[13px] font-semibold">Gallery images not available</p>
                                        {website && (
                                            <a href={`${website}/gallery`} target="_blank" rel="noopener noreferrer"
                                                className="text-[12px] text-blue-600 hover:underline flex items-center gap-1">
                                                View on official website <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>

                    {/* ── RIGHT SIDEBAR ── */}
                    <div className="space-y-5">

                        {/* Quick Apply Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4">
                                <p className="text-white text-[13px] font-bold">Applications for Admissions</p>
                                <p className="text-blue-200 text-[11px]">2025 – 26 Academic Year</p>
                            </div>
                            <div className="p-5 space-y-3">
                                {website && <a href={`${website}/admissions`} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[12px] font-bold rounded-lg transition-colors uppercase tracking-wide"><GraduationCap size={13} /> Apply Now</a>}
                                {website && <a href={website} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-[12px] font-bold rounded-lg transition-colors uppercase tracking-wide"><Globe size={13} /> Official Website</a>}
                                {phone_ && <a href={`tel:${phone_}`} className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-300 text-slate-600 hover:bg-slate-50 text-[12px] font-bold rounded-lg transition-colors"><Phone size={13} /> {phone_}</a>}
                            </div>
                        </div>

                        {/* Key Stats - sidebar */}
                        {!loading && d?.stats && d.stats.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Key Statistics</h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {d.stats.slice(0, 6).map((s, i) => (
                                        <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-center">
                                            <p className="text-[18px] font-extrabold text-slate-900 leading-tight">{s.value}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                            <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                {address_ && <div className="flex items-start gap-2.5 text-[12.5px] text-slate-600"><MapPin size={13} className="text-slate-400 mt-0.5 shrink-0" /><span className="leading-relaxed">{address_}</span></div>}
                                {phone_ && <div className="flex items-center gap-2.5 text-[12.5px] text-slate-600"><Phone size={13} className="text-slate-400 shrink-0" /><span className="font-semibold">{phone_}</span></div>}
                                {email_ && <div className="flex items-center gap-2.5 text-[12.5px] text-slate-600"><Mail size={13} className="text-slate-400 shrink-0" /><a href={`mailto:${email_}`} className="hover:text-blue-600 transition-colors">{email_}</a></div>}
                            </div>
                        </div>

                        {/* Official Links */}
                        {!loading && d?.directLinks && d.directLinks.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Official Portal Links</h3>
                                <div className="space-y-0.5">
                                    {d.directLinks.map((link, i) => (
                                        <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center justify-between px-2 py-3 rounded-lg hover:bg-slate-50 group transition-colors border-b border-slate-50 last:border-0">
                                            <span className="text-[12.5px] font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">{link.label}</span>
                                            <ChevronRight size={13} className="text-slate-300 group-hover:text-blue-400" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Accreditations */}
                        {!loading && d?.accreditations && d.accreditations.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Shield size={12} className="text-emerald-500" /> Accreditations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {d.accreditations.map((a, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[11.5px] font-bold">{a}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Latest Cutoffs quick-view */}
                        {!loading && d?.branchCutoffs && d.branchCutoffs.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                                <h3 className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-3">Latest Cutoffs (Open)</h3>
                                <div className="space-y-2">
                                    {d.branchCutoffs.slice(0, 4).map((c, i) => (
                                        <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                            <span className="text-[12px] text-slate-600 font-medium truncate pr-2">{c.branch}</span>
                                            <span className="text-[12px] font-bold text-blue-700 shrink-0 bg-blue-50 px-2 py-0.5 rounded">{c.open}</span>
                                        </div>
                                    ))}
                                </div>
                                {d.branchCutoffs.length > 4 && (
                                    <button onClick={() => setActiveTab('Admissions')} className="w-full mt-2 text-[11px] text-blue-600 hover:underline font-semibold">
                                        View all cutoffs →
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CollegeDetailPage;

