import { IMAGES } from './constants.ts';
import { ALL_MBA } from './MBA/mbaData';
import { MBA_INDIA } from './MBA/mbaDataIndia';
import { MBA_DELHI } from './MBA/mbaDataDelhi';
import { MBA_BANGALORE } from './MBA/mbaDataBangalore';
import { MBA_MUMBAI } from './MBA/mbaDataMumbai';
import { MBA_IIMS } from './MBA/mbaDataIIMs';
import { MBA_EXECUTIVE } from './MBA/mbaDataExecutive';
import { MBA_DISTANCE } from './MBA/mbaDataDistance';
import { MBA_ONLINE } from './MBA/mbaDataOnline';
import { ALL_ENGG } from './ENGINEERING/engData';
import { ENG_INDIA } from './ENGINEERING/engDataIndia';
import { ENG_IITS } from './ENGINEERING/engDataIITs';
import { ENG_NITS } from './ENGINEERING/engDataNITs';
import { ENG_HYDERABAD } from './ENGINEERING/engDataHyderabad';
import { ENG_MUMBAI } from './ENGINEERING/engDataMumbai';
import { ENG_DELHI } from './ENGINEERING/engDataDelhi';
import { ENG_BANGALORE } from './ENGINEERING/engDataBangalore';
import { ENG_MTECH } from './ENGINEERING/engDataMTech';
import { MED_INDIA } from './MEDICAL/medDataIndia';
import { MED_AIIMS } from './MEDICAL/medDataAIIMS';
import { MED_PG } from './MEDICAL/medDataPG';
import { ALL_BDS } from './MEDICAL/bdsData';
import { ALL_PHARMA } from './MEDICAL/pharmaData';
import { ALL_NURSING } from './MEDICAL/nursingData';
import { ALL_PARAMEDICAL } from './MEDICAL/paramedicalData';

// Mock EXAMS Data to replace deleted files for footer functionality
const EXAMS_MANAGEMENT: any[] = [];
const EXAMS_ENGINEERING: any[] = [];
const EXAMS_MEDICAL: any[] = [];
const EXAMS_LAW: any[] = [];
const EXAMS_DESIGN: any[] = [];
import { TOOLS_LOAN } from './ADMISSION_TOOLS/loanData';
import { TOOLS_SCHOLARSHIP } from './ADMISSION_TOOLS/scholarshipData';
import { TOOLS_ABROAD } from './ADMISSION_TOOLS/studyAbroadData';
import { TOOLS_PREDICTOR } from './ADMISSION_TOOLS/predictorData';
import { TOOLS_RANK } from './ADMISSION_TOOLS/rankEstimatorData';
import { TOOLS_REVIEWS } from './ADMISSION_TOOLS/reviewsData';
import { TOOLS_COMPARE } from './ADMISSION_TOOLS/compareData';
import { TOOLS_COUNSELOR } from './ADMISSION_TOOLS/counselorData';

import { PageItem, PageData } from './types';




// Reusable Assets

// Note: IMAGES constant moved to constants.ts
// Note: ALL_MBA, ALL_ENGG, ALL_MED moved to separate files

// Colleges Data Imports (aliases for local usage in this file if needed, though we imported them as ALL_MBA etc above)
const COLLEGES_MBA = ALL_MBA;
const COLLEGES_ENGG = ALL_ENGG;
const COLLEGES_MED = MED_INDIA;

// Restored EXAMS array for internal footer logic
const EXAMS = [
    { title: 'CAT', subtitle: 'Common Admission Test', tags: ['MBA', 'Entrance'], image: IMAGES.exam },
    { title: 'JEE MAINS', subtitle: 'Joint Entrance Exam', tags: ['Engineering', 'Entrance'], image: IMAGES.exam },
    { title: 'NEET', subtitle: 'National Eligibility cum Entrance Test', tags: ['Medical', 'Entrance'], image: IMAGES.exam },
    { title: 'GATE', subtitle: 'Graduate Aptitude Test in Engineering', tags: ['M.Tech', 'Entrance'], image: IMAGES.exam },
    { title: 'CLAT', subtitle: 'Common Law Admission Test', tags: ['Law', 'Entrance'], image: IMAGES.exam }
];

const getCollegesByCity = (city: string): PageItem[] => {
    const all = [...ALL_MBA, ...ALL_ENGG, ...MED_INDIA];
    return all.filter(c => c.subtitle.toLowerCase().includes(city.toLowerCase()));
};

const COMMON_FAQS = [
    { question: 'What are the eligibility criteria?', answer: 'Generally, candidates must have completed their 10+2 or graduation with a minimum aggregate score (usually 50-60%) depending on the program and category.' },
    { question: 'Is there an entrance exam?', answer: 'Yes, most top tier colleges accept national level scores like CAT, JEE MAINS, NEET, or GATE. Some private universities have their own entrance tests.' },
    { question: 'What is the fee structure?', answer: 'Fees vary significantly. Government colleges usually range from ₹10K to ₹2L per year, while private institutions can range from ₹2L to ₹25L per year.' },
    { question: "How to check college ranking?", answer: "Check NIRF ranking on the official website." },
    { question: "Are scholarships available?", answer: "Yes, most colleges offer merit-based and need-based scholarships." }
];

const generateCityContent = (city: string) => `
  <p><strong>${city}</strong> is a premier education hub in India, hosting some of the country's finest institutions across Engineering, Medicine, and Management.</p>
  <ul>
    <li>Home to top-ranked Tier 1 and Tier 2 institutes.</li>
    <li>Excellent placement opportunities with proximity to corporate hubs.</li>
    <li>Vibrant student life and cultural diversity.</li>
  </ul>
`;

const generateCityData = (city: string, colleges: PageItem[] = []): PageData => {
    // Merge explicit colleges with generated ones, verifying duplicates
    let cityColleges = [...colleges, ...getCollegesByCity(city)];
    // Deduplicate by title to avoid repeating if curated is also in generated (unlikely but safe)
    cityColleges = Array.from(new Map(cityColleges.map(item => [item.title, item])).values());

    return {
        title: `Top Colleges in ${city}`,
        description: `Explore the best Tier 1 and Tier 2 educational institutions in ${city}. Compare fees, placements, and rankings.`,
        items: cityColleges.length ? cityColleges : [ALL_ENGG[0], ALL_MBA[0], MED_INDIA[0]], // Fallback if no match
        type: 'college',
        content: generateCityContent(city),
        faqs: [
            { question: `Why study in ${city}?`, answer: `${city} offers excellent industrial exposure, world-class faculty, and a thriving student community.` },
            ...COMMON_FAQS
        ]
    };
};

export const FOOTER_PAGES: Record<string, PageData> = {
    // MBA
    'mba-india': {
        title: 'MBA Colleges in India 2026 - Top MBA Colleges | CareerSha',
        description: 'Explore top MBA colleges in India, entrance exams, fees, placements and career guidance.',
        items: COLLEGES_MBA.slice(0, 150),
        type: 'college',
        content: `
            <div class="prose prose-slate max-w-none">
                <p><strong>MBA in India</strong> remains one of the most sought-after postgraduate degrees, offering a gateway to high-paying corporate roles and leadership positions. With India's economy growing rapidly, the demand for skilled managers in sectors like Finance, Marketing, Operations, and Business Analytics has never been higher.</p>
                <p>The <strong>Indian Institutes of Management (IIMs)</strong> are the most prestigious MBA colleges in India, known for their rigorous selection process and stellar placement records. However, several other top-tier institutions like XLRI Jamshedpur, FMS Delhi, and SPJIMR Mumbai offer world-class management education that is on par with global standards.</p>
                <h3>Top MBA Entrance Exams</h3>
                <ul>
                    <li><strong>CAT (Common Admission Test):</strong> Conducted by IIMs, it is the most popular entrance exam for management aspirants.</li>
                    <li><strong>XAT (Xavier Aptitude Test):</strong> Accepted by XLRI and several other top-tier private B-schools.</li>
                    <li><strong>MAT, CMAT, and NMAT:</strong> Other important national-level exams for various private and state universities.</li>
                </ul>
                <h3>Specializations in High Demand</h3>
                <p>Modern MBA programs offer specialized tracks to help students align their education with industry trends. <strong>Data Analytics</strong> and <strong>Digital Marketing</strong> are currently trending, while traditional specializations like <strong>Financial Management</strong> and <strong>Human Resource Management</strong> continue to offer stable and lucrative career paths.</p>
                <p>When choosing an MBA college, students should consider factors such as <strong>ROI (Return on Investment)</strong>, faculty expertise, alumni network, and industrial exposure. At CareerSha, we provide detailed insights into every top B-school to help you make an informed decision for your 2026 admissions.</p>
                <p>Whether you are a fresh graduate or a working professional looking for an Executive MBA, the Indian management education landscape has something for everyone. Explore our comprehensive list of colleges, compare their fees, and check placement statistics to start your management journey today.</p>
            </div>
        `,
        faqs: COMMON_FAQS
    },
    'mba-delhi': { title: 'MBA Colleges in Delhi NCR', description: 'Premier management institutes in the capital region.', items: getCollegesByCity('Delhi').filter(c => COLLEGES_MBA.some(m => m.title === c.title)).concat(getCollegesByCity('Gurgaon'), getCollegesByCity('Ghaziabad'), getCollegesByCity('Noida')), type: 'college', content: '<p>Delhi NCR is a hub for corporate headquarters.</p>', faqs: COMMON_FAQS },
    'mba-bangalore': { title: 'MBA Colleges in Bangalore', description: 'Top B-schools in the Silicon Valley of India.', items: getCollegesByCity('Bangalore').filter(c => COLLEGES_MBA.some(m => m.title === c.title)), type: 'college', content: '<p>Bangalore, the startup capital, is perfect for aspirants looking into Tech-MBA.</p>', faqs: COMMON_FAQS },
    'mba-mumbai': { title: 'MBA Colleges in Mumbai', description: 'Leading management institutes in the financial capital.', items: getCollegesByCity('Mumbai').filter(c => COLLEGES_MBA.some(m => m.title === c.title)), type: 'college', content: '<p>Mumbai offers unparalleled exposure to the Finance and BFSI sectors.</p>', faqs: COMMON_FAQS },

    // Engineering
    'eng-india': {
        title: 'Engineering Colleges in India 2026 - Top BTech Colleges | CareerSha',
        description: 'Find top engineering colleges, JEE counselling, cutoff and placements in India.',
        items: ENG_INDIA,
        type: 'college',
        content: `
            <div class="prose prose-slate max-w-none">
                <p><strong>Engineering in India</strong> is a cornerstone of the nation's higher education system, producing millions of skilled professionals every year. With the rise of AI, Robotics, and Renewable Energy, the technical education landscape is evolving rapidly to meet the challenges of the 21st century.</p>
                <p>The <strong>Indian Institutes of Technology (IITs)</strong> and <strong>National Institutes of Technology (NITs)</strong> represent the pinnacle of technical excellence in India. Getting into these institutions requires passing the grueling JEE Main and JEE Advanced examinations, which test a student's deep understanding of Physics, Chemistry, and Mathematics.</p>
                <h3>Popular Engineering Branches</h3>
                <ul>
                    <li><strong>Computer Science (CSE):</strong> The most popular choice, focusing on software development, AI, and data science.</li>
                    <li><strong>Mechanical Engineering:</strong> A core branch dealing with machinery, thermodynamics, and manufacturing.</li>
                    <li><strong>Electronics & Communication (ECE):</strong> Focuses on semiconductors, telecommunications, and VLSI design.</li>
                </ul>
                <h3>Admission and Counselling Process</h3>
                <p>Admissions to B.Tech programs are primarily merit-based. The <strong>JoSAA (Joint Seat Allocation Authority)</strong> handles counselling for IITs, NITs, and IIITs. State-level exams like EAMCET, KCET, and MHT-CET are also pivotal for admission into reputable state-government and private engineering colleges.</p>
                <p>Prospective students should look beyond rankings and evaluate colleges based on <strong>Research Labs</strong>, industry tie-ups, internship opportunities, and the strength of their entrepreneurship cells. CareerSha offers comprehensive tools including rank predictors and college matchers to simplify your engineering admission journey.</p>
                <p>As the "Startup Capital of the World," India offers immense potential for engineering graduates to innovate and lead. Start exploring the top B.Tech colleges today and choose the branch that aligns with your passion and the future of technology.</p>
            </div>
        `,
        faqs: COMMON_FAQS
    },
    'iits-india': {
        title: 'List of IITs in India',
        description: 'Premier Institutes of Technology.',
        items: ENG_IITS,
        type: 'college',
        content: '<p>The Indian Institutes of Technology (IITs) are autonomous public technical universities located across India.</p>',
        faqs: COMMON_FAQS
    },
    'nits-india': {
        title: 'List of NITs in India',
        description: 'National Institutes of Technology.',
        items: ENG_NITS,
        type: 'college',
        content: '<p>The National Institutes of Technology (NITs) are premier public technical universities funded by the Government of India.</p>',
        faqs: COMMON_FAQS
    },
    'eng-hyd': { title: 'Engineering Colleges in Hyderabad', description: 'Best technical campuses in Hyderabad.', items: ENG_HYDERABAD, type: 'college', content: 'Hyderabad is a major IT hub.', faqs: COMMON_FAQS },
    'eng-mumbai': { title: 'Engineering Colleges in Mumbai', description: 'Best technical campuses in Mumbai.', items: ENG_MUMBAI, type: 'college', content: 'Mumbai is home to IIT Bombay and ICT.', faqs: COMMON_FAQS },
    'eng-delhi': { title: 'Engineering Colleges in Delhi', description: 'Best technical campuses in Delhi.', items: ENG_DELHI, type: 'college', content: 'Delhi is home to IIT Delhi and DTU.', faqs: COMMON_FAQS },
    'eng-bangalore': { title: 'Engineering Colleges in Bangalore', description: 'Best technical campuses in Bangalore.', items: ENG_BANGALORE, type: 'college', content: 'Bangalore is the Silicon Valley of India.', faqs: COMMON_FAQS },
    'eng-mtech': {
        title: 'Top M.Tech Colleges in India',
        description: 'Masters in Technology from premier institutes like IITs, IISc, and NITs.',
        items: ENG_MTECH,
        type: 'college',
        content: '<p>M.Tech is the preferred choice for students aiming for research, teaching, or specialized technical roles. GATE score is the primary criterion for admission.</p>',
        faqs: COMMON_FAQS
    },

    // Medical
    'med-india': {
        title: 'Medical Colleges in India 2026 - MBBS, NEET Colleges | CareerSha',
        description: 'Discover top medical colleges, NEET counselling, MBBS fees and rankings in India.',
        items: MED_INDIA,
        type: 'college',
        content: `
            <div class="prose prose-slate max-w-none">
                <p><strong>Medical Education in India</strong> is highly prestigious and rigorously structured to produce world-class doctors and healthcare professionals. The journey to becoming a doctor in India starts with the NEET (National Eligibility cum Entrance Test), which is the mandatory gateway for MBBS and BDS admissions across the country.</p>
                <p>The <strong>All India Institutes of Medical Sciences (AIIMS)</strong> are the most coveted medical institutions, known for their state-of-the-art facilities and experienced faculty. Other leading names include Maulana Azad Medical College (MAMC), Christian Medical College (CMC) Vellore, and Armed Forces Medical College (AFMC) Pune.</p>
                <h3>Top Medical Courses</h3>
                <ul>
                    <li><strong>MBBS (Bachelor of Medicine and Bachelor of Surgery):</strong> The standard degree for aspiring doctors.</li>
                    <li><strong>BDS (Bachelor of Dental Surgery):</strong> For students focusing on dental care and oral health.</li>
                    <li><strong>B.Pharma & Nursing:</strong> Essential allied health services that offer excellent career opportunities.</li>
                </ul>
                <h3>The Path to Specialization</h3>
                <p>After completing an MBBS degree, many students pursue postgraduate specialization (MD/MS) through exams like NEET PG or INI-CET. These advanced degrees allow doctors to specialize in fields such as Cardiology, Neurology, Pediatrics, and Surgery, catering to the growing healthcare needs of India's population.</p>
                <p>Choosing the right medical college involves evaluating the <strong>clinical exposure</strong> (patient inflow), hospital infrastructure, faculty-to-student ratio, and the success rate of students in PG exams. CareerSha helps you navigate the complex NEET counselling process with expert insights and college rankings.</p>
                <p>With India emerging as a global hub for medical tourism, the scope for healthcare professionals is vast. Explore top medical colleges today and take the first step towards a noble career in saving lives and improving public health.</p>
            </div>
        `,
        faqs: COMMON_FAQS
    },
    'aiims-colleges': {
        title: 'All AIIMS Colleges in India',
        description: 'Premier Medical Institutes.',
        items: MED_AIIMS,
        type: 'college',
        content: '<p>AIIMS are a group of autonomous public medical colleges of higher education.</p>',
        faqs: COMMON_FAQS
    },
    'med-pg': {
        title: 'Top MD/MS Colleges in India',
        description: 'Post-graduate medical specialty courses.',
        items: MED_PG,
        type: 'college',
        content: '<p>MD/MS is the next step after MBBS for specialization. Admission is via NEET PG or INI-CET.</p>',
        faqs: COMMON_FAQS
    },

    // Exams
    'exam-cat': { title: 'CAT 2026', description: 'Common Admission Test 2026.', items: EXAMS_MANAGEMENT, type: 'exam', content: '<p>CAT is the toughest management entrance exam in India.</p>', faqs: [{ question: 'When is CAT 2026 conducted?', answer: 'Usually on the last Sunday of November 2026.' }] },
    'exam-gate': { title: 'GATE 2026', description: 'Graduate Aptitude Test in Engineering 2026.', items: EXAMS_ENGINEERING, type: 'exam', content: '<p>GATE is the entry point for M.Tech and PSUs.</p>', faqs: [{ question: 'When is GATE 2026?', answer: 'February 2026.' }] },
    'exam-jee-main': { title: 'JEE MAINS 2026', description: 'Joint Entrance Examination 2026.', items: EXAMS_ENGINEERING, type: 'exam', content: '<p>JEE MAINS is for NITs and IIITs.</p>', faqs: [{ question: 'How many attempts?', answer: '3 years.' }] },
    'exam-neet': { title: 'NEET 2026', description: 'National Eligibility cum Entrance Test 2026.', items: EXAMS_MEDICAL, type: 'exam', content: '<p>NEET UG is mandatory for MBBS/BDS.</p>', faqs: [{ question: 'Negative marking?', answer: 'Yes.' }] },
    'exam-xat': { title: 'XAT 2026', description: 'Xavier Aptitude Test 2026.', items: EXAMS_MANAGEMENT, type: 'exam', content: '<p>XAT is for XLRI and other top B-schools.</p>', faqs: COMMON_FAQS },
    'exam-clat': { title: 'CLAT 2026', description: 'Common Law Admission Test 2026.', items: EXAMS_LAW, type: 'exam', content: '<p>CLAT is for NLUs.</p>', faqs: COMMON_FAQS },
    'exam-mat': { title: 'MAT 2026', description: 'Management Aptitude Test 2026.', items: EXAMS_MANAGEMENT, type: 'exam', content: '<p>MAT is held multiple times a year.</p>', faqs: COMMON_FAQS },
    'exam-nift': { title: 'NIFT Entrance 2026', description: 'NIFT Admissions 2026.', items: EXAMS_DESIGN, type: 'exam', content: '<p>For fashion design aspirants.</p>', faqs: COMMON_FAQS },

    // Admission Tools
    'tool-loan': { title: 'Education Loan Providers', description: 'Compare interest rates and schemes.', items: TOOLS_LOAN, type: 'exam', content: '<p>Education loans cover tuition fees, accommodation, and other expenses. Check for tax benefits under Sec 80E.</p>', faqs: COMMON_FAQS },
    'tool-scholarship': { title: 'Top Scholarships in India', description: 'Merit and Need-based Financial Aid.', items: TOOLS_SCHOLARSHIP, type: 'exam', content: '<p>Scholarships are available from government, corporates, and universities.</p>', faqs: COMMON_FAQS },
    'tool-abroad': { title: 'Study Abroad Destinations', description: 'USA, UK, Canada, Germany, Australia.', items: TOOLS_ABROAD, type: 'exam', content: '<p>Studying abroad offers global exposure. Check visa requirements and post-study work rights.</p>', faqs: COMMON_FAQS },
    'tool-predictor': { title: 'College Predictors', description: 'JEE MAINS, NEET, CAT, GATE', items: TOOLS_PREDICTOR, type: 'exam', content: '<p>Predict your chances of admission into top colleges based on your exam score or percentile.</p>', faqs: COMMON_FAQS },
    'tool-rank': { title: 'Rank Estimators', description: 'Calculate your expected rank', items: TOOLS_RANK, type: 'exam', content: '<p>Estimate your All India Rank (AIR) based on your expected score.</p>', faqs: COMMON_FAQS },
    'tool-reviews': { title: 'College Reviews', description: 'Student & Alumni Verdicts', items: TOOLS_REVIEWS, type: 'review', content: '<p>Read authentic reviews from current students and alumni about campus life, placements, and faculty.</p>', faqs: COMMON_FAQS },
    'tool-compare': { title: 'Compare Colleges', description: 'Side-by-side Comparison', items: TOOLS_COMPARE, type: 'exam', content: '<p>Compare colleges on parameters like placements, fees, infrastructure, and cutoffs.</p>', faqs: COMMON_FAQS },
    'tool-counselor': { title: 'Ask a Counselor', description: 'Expert Guidance', items: TOOLS_COUNSELOR, type: 'exam', content: '<p>Connect with expert counselors for personalized career guidance and admission assistance.</p>', faqs: COMMON_FAQS },
};

// DYNAMIC GENERATION FOR ALL CITIES
// This ensures that for every city we have mba-[city], eng-[city], med-[city] and city-[city] (generic)
const CITIES_LIST = [
    'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Chandigarh',
    'Coimbatore', 'Nagpur', 'Noida', 'Gurgaon'
];

CITIES_LIST.forEach(city => {
    const slug = city.toLowerCase().replace(' ', '-');

    // MBA Page
    FOOTER_PAGES[`mba-${slug}`] = {
        title: `MBA Colleges in ${city}`,
        description: `Top Management Institutes in ${city}.`,
        items: getCollegesByCity(city).filter(c => COLLEGES_MBA.some(m => m.title === c.title)),
        type: 'college',
        content: `<p>${city} is a prime destination for management studies.</p>`,
        faqs: COMMON_FAQS
    };

    // Engineering Page
    FOOTER_PAGES[`eng-${slug}`] = {
        title: `Engineering Colleges in ${city}`,
        description: `Best B.Tech Colleges in ${city}.`,
        items: getCollegesByCity(city).filter(c => COLLEGES_ENGG.some(e => e.title === c.title)),
        type: 'college',
        content: `<p>${city} offers great technical education opportunities.</p>`,
        faqs: COMMON_FAQS
    };

    // Medical Page
    FOOTER_PAGES[`med-${slug}`] = {
        title: `Medical Colleges in ${city}`,
        description: `Top MBBS/BDS Colleges in ${city}.`,
        items: getCollegesByCity(city).filter(c => COLLEGES_MED.some(m => m.title === c.title)),
        type: 'college',
        content: `<p>Top medical institutions in ${city}.</p>`,
        faqs: COMMON_FAQS
    };

    // Generic City Page
    // We already have some manual ones in the object above (lines 249-265 of original), 
    // but the object above is now cut off in this replacement.
    // We should re-add them or let this loop handle them if they weren't special.
    // The manual ones had some extra curated items passed to generateCityData. 
    // Let's Handle a few special cases if needed, but for now we follow the improved generateCityData logic which merges manual+auto.
    // Actually, looking at the previous file, the manual items were passed TO generateCityData.
    // Since I am replacing the big block, I need to preserve those calls.

    let manualItems: PageItem[] = [];
    if (city === 'Pune') manualItems = [{ title: 'Symbiosis (SIBM)', subtitle: 'Pune, MH', tags: ['Private', 'MBA', 'Tier 2'], stats: [{ label: 'Avg Pkg', value: '₹24 LPA' }], image: IMAGES.mba }];
    if (city === 'Jaipur') manualItems = [{ title: 'MNIT Jaipur', subtitle: 'Jaipur, Rajasthan', tags: ['NIT', 'Public', 'Tier 1'], stats: [{ label: 'Avg Pkg', value: '₹12 LPA' }], image: IMAGES.eng }];
    if (city === 'Bhopal') manualItems = [{ title: 'IISER Bhopal', subtitle: 'Bhopal, MP', tags: ['Science', 'Research', 'Tier 1'], stats: [{ label: 'Focus', value: 'Pure Sci' }], image: IMAGES.eng }];
    if (city === 'Chandigarh') manualItems = [{ title: 'Punjab Engineering College', subtitle: 'Chandigarh', tags: ['Deemed', 'Public', 'Tier 2'], stats: [{ label: 'Avg Pkg', value: '₹14 LPA' }], image: IMAGES.eng }];
    if (city === 'Coimbatore') manualItems = [{ title: 'PSG Tech', subtitle: 'Coimbatore, TN', tags: ['Private', 'Top Tier', 'Tier 2'], stats: [{ label: 'Avg Pkg', value: '₹8 LPA' }], image: IMAGES.eng }];
    if (city === 'Nagpur') manualItems = [{ title: 'VNIT Nagpur', subtitle: 'Nagpur, MH', tags: ['NIT', 'Public', 'Tier 1'], stats: [{ label: 'Avg Pkg', value: '₹10 LPA' }], image: IMAGES.eng }];

    FOOTER_PAGES[`city-${slug}`] = generateCityData(city, manualItems);
});


// MBA Specific Pages
const SHARED_MBA_INDIA = { title: 'Top MBA Colleges in India', items: MBA_INDIA, type: 'college' as const, description: 'Explore the best MBA colleges in India...' }; // Define locally or use existing structure logic

FOOTER_PAGES['mba-india'] = { ...SHARED_MBA_INDIA }; // Map explicitly

FOOTER_PAGES['mba-delhi'] = { ...SHARED_MBA_INDIA, title: 'Top MBA Colleges in Delhi', items: MBA_DELHI };
FOOTER_PAGES['mba-bangalore'] = { ...SHARED_MBA_INDIA, title: 'Top MBA Colleges in Bangalore', items: MBA_BANGALORE };
FOOTER_PAGES['mba-mumbai'] = { ...SHARED_MBA_INDIA, title: 'Top MBA Colleges in Mumbai', items: MBA_MUMBAI };
FOOTER_PAGES['mba-iims'] = { ...SHARED_MBA_INDIA, title: 'Top IIMs in India', items: MBA_IIMS };
FOOTER_PAGES['mba-executive'] = { ...SHARED_MBA_INDIA, title: 'Best Executive MBA Programs', items: MBA_EXECUTIVE };
FOOTER_PAGES['mba-distance'] = { ...SHARED_MBA_INDIA, title: 'Top Distance MBA Colleges', items: MBA_DISTANCE };
FOOTER_PAGES['mba-online'] = { ...SHARED_MBA_INDIA, title: 'Best Online MBA Programs', items: MBA_ONLINE };

// Legacy aliases (if needed) or remove if now covered
// FOOTER_PAGES['online-mba'] = ...; // We can remove the old aliases OR map them to new keys if safe.
// For now, let's keep old keys mapping to new structure if they were used elsewhere, or just define new ones.
// The user asked to create specific files/links. The footer directory uses specific logic.
// I will remove the old lines 180-182 and replace with these new proper definitions.

FOOTER_PAGES['btech-india'] = FOOTER_PAGES['eng-india'];
// FOOTER_PAGES['iits-india'] and 'nits-india' are now explicitly defined above

FOOTER_PAGES['mbbs-india'] = FOOTER_PAGES['med-india'];
// FOOTER_PAGES['aiims-colleges'] explicitly defined above


// Pharmacy
FOOTER_PAGES['pharma-india'] = {
    title: 'Top B.Pharma Colleges in India',
    description: 'Best Pharmacy Institutes for B.Pharma and M.Pharma.',
    items: ALL_PHARMA,
    type: 'college',
    content: '<p>Pharmacy is a growing sector in India. NIPER and Jamia Hamdard are among the top institutes.</p>',
    faqs: COMMON_FAQS
};

// Nursing
FOOTER_PAGES['nursing-india'] = {
    title: 'Top Nursing Colleges in India',
    description: 'Best Institutes for B.Sc Nursing and GNM.',
    items: ALL_NURSING,
    type: 'college',
    content: '<p>Nursing offers immense career opportunities in healthcare. AIIMS and CMC Vellore are top choices.</p>',
    faqs: COMMON_FAQS
};

// BDS
FOOTER_PAGES['bds-india'] = {
    title: 'Top Dental Colleges (BDS) in India',
    description: 'Best Dental Institutes for BDS.',
    items: ALL_BDS,
    type: 'college',
    content: '<p>BDS is the most popular medical course after MBBS. Maulana Azad Dental College is the top choice.</p>',
    faqs: COMMON_FAQS
};

// Paramedical
FOOTER_PAGES['paramedical-india'] = {
    title: 'Top Paramedical Colleges in India',
    description: 'Best Institutes for Allied Health Sciences.',
    items: ALL_PARAMEDICAL,
    type: 'college',
    content: '<p>Paramedical courses like BPT, MLT, and Optometry are in high demand.</p>',
    faqs: COMMON_FAQS
};

// State/City specific Medical aliases (using filters or generic lists for now if specific data absent)


// Company Pages
FOOTER_PAGES['company-team'] = {
    title: 'Our Team',
    description: 'Meet the team behind CareerSha.',
    items: [],
    type: 'college',
    content: '<p>CareerSha is led by a team of passionate educators and technologists committed to democratizing education guidance in India.</p>',
    faqs: []
};
FOOTER_PAGES['company-careers'] = {
    title: 'Careers at CareerSha',
    description: 'Join our mission.',
    items: [],
    type: 'college',
    content: '<p>We are always looking for talented individuals to join our team. Check out our open positions and help us shape the future of education.</p>',
    faqs: []
};

// Legal Pages
FOOTER_PAGES['legal-privacy'] = {
    title: 'Privacy Policy',
    description: 'How we handle your data.',
    items: [],
    type: 'college',
    content: '<p>We value your privacy. This policy outlines how we collect, use, and protect your personal data in compliance with Indian laws.</p>',
    faqs: []
};
FOOTER_PAGES['legal-terms'] = {
    title: 'Terms of Service',
    description: 'Rules of usage.',
    items: [],
    type: 'college',
    content: '<p>By using CareerSha, you agree to these terms and conditions. Please read them carefully before using our services.</p>',
    faqs: []
};
FOOTER_PAGES['legal-grievances'] = {
    title: 'Grievance Redressal',
    description: 'Report issues.',
    items: [],
    type: 'college',
    content: '<p>Contact our Grievance Officer for any concerns regarding content or services. We are committed to resolving issues promptly.</p>',
    faqs: []
};
FOOTER_PAGES['site-sitemap'] = {
    title: 'Sitemap',
    description: 'Navigate CareerSha.',
    items: [],
    type: 'college',
    content: '<p>Detailed sitemap of all colleges, exams, and resources available on CareerSha.</p>',
    faqs: []
};

// Aliases for Top Colleges
FOOTER_PAGES['mba-top-colleges'] = { ...FOOTER_PAGES['mba-india'], title: 'Top 10 MBA Colleges in India', items: COLLEGES_MBA.slice(0, 10) };
FOOTER_PAGES['eng-top-colleges'] = FOOTER_PAGES['eng-india'];
FOOTER_PAGES['med-top-colleges'] = FOOTER_PAGES['med-india'];

// Engineering Specializations
FOOTER_PAGES['eng-cse'] = { title: 'Best Computer Science Engineering Colleges', description: 'Top CSE Colleges in India.', items: [], type: 'college', content: '<p>Computer Science is the most popular branch for engineering aspirants.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-mechanical'] = { title: 'Top Mechanical Engineering Colleges', description: 'Best Mechanical Engineering Institutes.', items: [], type: 'college', content: '<p>Mechanical Engineering is an evergreen branch.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-ece'] = { title: 'Top Electronics Engineering Colleges', description: 'Best ECE Colleges.', items: [], type: 'college', content: '<p>ECE offers opportunities in core electronics and IT sectors.</p>', faqs: COMMON_FAQS };

// Medical Special categories
FOOTER_PAGES['med-government'] = { title: 'Top Government Medical Colleges', description: 'Affordable and prestigious medical education.', items: [], type: 'college', content: '<p>Government colleges like AIIMS and MAMC are the top choice for NEET aspirants due to low fees and high patient inflow.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['mbbs-india'] = FOOTER_PAGES['med-india']; // Alias for MBBS

// Design
const COMMON_DESIGN_CONTENT = { type: 'college' as const, faqs: COMMON_FAQS, items: [] };
FOOTER_PAGES['design-top-colleges'] = { ...COMMON_DESIGN_CONTENT, title: 'Top Design Colleges in India', description: 'Best institutes for Fashion, Interior, and Graphic Design.', content: '<p>Design education in India is spearheaded by NIDs and NIFTs.</p>' };
FOOTER_PAGES['design-india'] = FOOTER_PAGES['design-top-colleges'];
FOOTER_PAGES['design-nid'] = { ...COMMON_DESIGN_CONTENT, title: 'List of NID Colleges', description: 'National Institutes of Design.', content: '<p>NID allocates seats based on NID DAT score.</p>' };
FOOTER_PAGES['design-nift'] = { ...COMMON_DESIGN_CONTENT, title: 'List of NIFT Colleges', description: 'National Institutes of Fashion Technology.', content: '<p>NIFT campuses are the benchmark for fashion education.</p>' };
FOOTER_PAGES['design-fashion'] = { ...COMMON_DESIGN_CONTENT, title: 'Top Fashion Design Colleges', description: 'Best Fashion Designing Courses.', content: '<p>Fashion design combines creativity with technical skills.</p>' };
FOOTER_PAGES['design-interior'] = { ...COMMON_DESIGN_CONTENT, title: 'Top Interior Design Colleges', description: 'Best Interior Designing Courses.', content: '<p>Interior design focuses on functional and aesthetic living spaces.</p>' };
FOOTER_PAGES['design-graphic'] = { ...COMMON_DESIGN_CONTENT, title: 'Top Graphic Design Colleges', description: 'Best Graphic Designing Courses.', content: '<p>Graphic design is essential for digital media and branding.</p>' };

// Exams missing
FOOTER_PAGES['exam-nid-dat'] = { title: 'NID Design Aptitude Test (DAT)', description: 'Entrance for NID.', items: EXAMS_DESIGN, type: 'exam', content: '<p>NID DAT consists of Prelims and Mains.</p>', faqs: COMMON_FAQS };

// More - Law, Commerce, Hospitality
FOOTER_PAGES['law-top-colleges'] = { title: 'Top Law Colleges in India', description: 'Best NLUs and Private Law Schools.', items: [], type: 'college', content: '<p>Law education in India has evolved with 5-year integrated LLB courses.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['commerce-top-colleges'] = { title: 'Top Commerce Colleges in India', description: 'Best B.Com and BBA Colleges.', items: [], type: 'college', content: '<p>Commerce colleges like SRCC set the cutoff benchmark.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['hospitality-top-colleges'] = { title: 'Top Hotel Management Colleges', description: 'Best IHMs and Hospitality Institutes.', items: [], type: 'college', content: '<p>Hotel Management offers careers in luxury hospitality and tourism.</p>', faqs: COMMON_FAQS };

// Company
FOOTER_PAGES['company-about'] = { title: 'About CareerSha', description: 'Our Mission and Vision.', items: [], type: 'college', content: '<p>CareerSha is your AI-powered companion for college admissions.</p>', faqs: [] };
FOOTER_PAGES['company-contact'] = { title: 'Contact Us', description: 'Get in touch.', items: [], type: 'college', content: '<p>Email us at support@careersha.ai</p>', faqs: [] };

// --- NEWLY ADDED KEYS TO MATCH FOOTER NAVIGATION ---

// ENGINEERING
FOOTER_PAGES['iits-india'] = { title: 'List of IITs in India', description: 'Indian Institutes of Technology.', items: [], type: 'college', content: '<p>IITs are the premier engineering institutes in India.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['nits-india'] = { title: 'List of NITs in India', description: 'National Institutes of Technology.', items: [], type: 'college', content: '<p>NITs offer excellent technical education across India.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-hyd'] = { title: 'Engineering Colleges in Hyderabad', description: 'Top Engineering Institutes in Hyderabad.', items: [], type: 'college', content: '<p>Hyderabad is a major IT hub with numerous engineering colleges.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-mumbai'] = { title: 'Engineering Colleges in Mumbai', description: 'Top Engineering Institutes in Mumbai.', items: [], type: 'college', content: '<p>Mumbai offers great industrial exposure for engineering students.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-arch'] = { title: 'Top Architecture (B.Arch) Colleges', description: 'Best Institutes for Architecture.', items: [], type: 'college', content: '<p>Architecture combines art and technology in building design.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-diploma'] = { title: 'Top Diploma in Engineering Colleges', description: 'Polytechnic Institutes.', items: [], type: 'college', content: '<p>Diploma courses offer practical technical skills.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['eng-mtech'] = { title: 'Top M.Tech Colleges in India', description: 'Masters in Technology.', items: [], type: 'college', content: '<p>M.Tech is for specialization after B.Tech.</p>', faqs: COMMON_FAQS };

// MEDICAL
FOOTER_PAGES['aiims-colleges'] = { title: 'List of AIIMS in India', description: 'All India Institutes of Medical Sciences.', items: [], type: 'college', content: '<p>AIIMS are the most prestigious medical colleges in India.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['bds-india'] = { title: 'Top BDS Colleges in India', description: 'Dental Colleges.', items: [], type: 'college', content: '<p>BDS is the second most popular medical course after MBBS.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['med-kerala'] = { title: 'Medical Colleges in Kerala', description: 'Top Medical Institutes in Kerala.', items: [], type: 'college', content: '<p>Kerala has diverse medical education options.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['med-karnataka'] = { title: 'Medical Colleges in Karnataka', description: 'Top Medical Institutes in Karnataka.', items: [], type: 'college', content: '<p>Karnataka is a hub for medical education in South India.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['pharma-india'] = { title: 'Top B.Pharma Colleges', description: 'Pharmacy Institutes.', items: [], type: 'college', content: '<p>B.Pharma opens careers in the pharmaceutical industry.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['nursing-india'] = { title: 'Top Nursing Colleges', description: 'B.Sc Nursing Institutes.', items: [], type: 'college', content: '<p>Nursing is a noble and high-demand profession.</p>', faqs: COMMON_FAQS };
FOOTER_PAGES['paramedical-india'] = { title: 'Top Paramedical Colleges', description: 'Allied Health Sciences.', items: [], type: 'college', content: '<p>Paramedical courses support the healthcare system.</p>', faqs: COMMON_FAQS };

// Removing redundant plural keys to avoid misrouting to /college/

// TOOLS
FOOTER_PAGES['tools-predictor'] = { title: 'College Predictor', description: 'Predict your college based on rank.', items: [], type: 'generic', content: '<p>Use our advanced algorithms to predict your admission chances.</p>', faqs: [] };
FOOTER_PAGES['tools-rank'] = { title: 'Rank Estimator', description: 'Estimate your rank based on score.', items: [], type: 'generic', content: '<p>Estimate your potential rank before official results.</p>', faqs: [] };
FOOTER_PAGES['tools-reviews'] = { title: 'College Reviews', description: 'Real student feedback.', items: [], type: 'review', content: '<p>Read honest reviews from students.</p>', faqs: [] };
FOOTER_PAGES['tools-compare'] = { title: 'Compare Colleges', description: 'Side-by-side comparison.', items: [], type: 'generic', content: '<p>Compare colleges on fees, placements, and more.</p>', faqs: [] };
FOOTER_PAGES['tools-loan'] = { title: 'Education Loan', description: 'Financing your education.', items: [], type: 'generic', content: '<p>Information on education loans and interest rates.</p>', faqs: [] };
FOOTER_PAGES['tools-scholarship'] = { title: 'Scholarships', description: 'Financial aid opportunities.', items: [], type: 'generic', content: '<p>Find scholarships you are eligible for.</p>', faqs: [] };
FOOTER_PAGES['tools-hub'] = {
    title: 'Rank Predictor & College Predictor Tools | CareerSha',
    description: 'Use CareerSha tools like JEE, NEET, EAMCET rank predictors and college predictor.',
    items: [
        {
            title: 'College Predictor',
            subtitle: 'Find matching colleges from your rank and category',
            tags: ['Live Tool', 'Admissions'],
            link: '/college-matcher',
            stats: [
                { label: 'Type', value: 'Predictor' },
                { label: 'Status', value: 'Open' }
            ]
        },
        {
            title: 'Rank Estimator',
            subtitle: 'Estimate your rank before counseling starts',
            tags: ['Live Tool', 'Results'],
            link: '/rank-estimator',
            stats: [
                { label: 'Type', value: 'Estimator' },
                { label: 'Status', value: 'Open' }
            ]
        },
        {
            title: 'Exam Results',
            subtitle: 'Check result guidance and next-step counseling info',
            tags: ['Guidance', 'Updates'],
            link: '/results',
            stats: [
                { label: 'Type', value: 'Results' },
                { label: 'Status', value: 'Updated' }
            ]
        },
        {
            title: 'Career Roadmaps',
            subtitle: 'Explore step-by-step roadmaps for top careers',
            tags: ['Planning', 'Guides'],
            link: '/roadmaps',
            stats: [
                { label: 'Type', value: 'Guide' },
                { label: 'Status', value: 'Updated' }
            ]
        },
        {
            title: 'Search Colleges',
            subtitle: 'Search colleges, exams, and courses in India',
            tags: ['Search', 'Discovery'],
            link: '/search',
            stats: [
                { label: 'Type', value: 'Search' },
                { label: 'Status', value: 'Open' }
            ]
        },
        {
            title: 'Latest News',
            subtitle: 'Read education news and admission updates',
            tags: ['News', 'Alerts'],
            link: '/news',
            stats: [
                { label: 'Type', value: 'News' },
                { label: 'Status', value: 'Live' }
            ]
        }
    ],
    type: 'generic',
    content: `<p><strong>Access all CareerSha tools in one place:</strong> College Predictor, Rank Estimator, Results Checker, and News Hub for 2026 admissions. These AI-powered tools help you navigate the entire college admission journey—from exam scores to seat allotment.</p>
    <p><strong>CareerSha Tools Hub</strong> brings the main admission tools together in one place. Each page below has a clear purpose: estimate your rank, match colleges, review results, and follow a career roadmap.</p><p>Use the dedicated pages rather than query-string shortcuts so the URLs remain stable, crawlable, and easy to index.</p>`,
    faqs: []
};


