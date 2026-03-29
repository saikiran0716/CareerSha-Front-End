export interface ExamStep {
    event: string;
    date: string;
    status: 'upcoming' | 'completed' | 'ongoing';
}

export interface EntranceExamInfo {
    id: string;
    title: string;
    fullName: string;
    year: string;
    overview: string;
    category: 'Engineering' | 'Medical' | 'Management' | 'Law' | 'Design';
    currentStatus: string;
    lastChecked: string;
    keyPoints: string[];
    timeline: ExamStep[];
    syllabusDetails: {
        subject: string;
        topics: string[];
    }[];
    eligibilityCriteria: string[];
    patternInfo: {
        examMode: string;
        testDuration: string;
        questionMatrix: string;
        markingScheme: string;
    };
    prepStrategy?: string[];
    participatingColleges?: {
        name: string;
        location: string;
    }[];
    applicationSteps?: string[];
    documentsRequired?: string[];
    portalUrl: string;
    heroImage: string;
}

export const ENTRANCE_EXAMS_DATA: Record<string, EntranceExamInfo> = {
    'cat': {
        id: 'cat',
        title: 'CAT 2026',
        fullName: 'Common Admission Test 2026',
        year: '2026',
        overview: 'The Common Admission Test (CAT) is a premier management entrance exam for admission into IIMs and various other top-tier B-schools across India.',
        category: 'Management',
        currentStatus: 'Notification Awaited',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Entrance to 21 IIMs and 1000+ other management institutes',
            'Testing of Quantitative, Verbal, and Data Reasoning skills',
            'Conducting Body: Rotational basis among IIMs'
        ],
        timeline: [
            { event: 'Official Notification', date: 'July 2026', status: 'upcoming' },
            { event: 'Registration Window', date: 'August - September 2026', status: 'upcoming' },
            { event: 'Admit Card Download', date: 'October 2026', status: 'upcoming' },
            { event: 'Examination Day', date: 'November 2026', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Quant (QA)', topics: ['Arithmetic (Profit/Loss, Interest, Time/Work)', 'Algebra (Linear & Quadratic Equations)', 'Number Systems', 'Geometry & Mensuration', 'Trigonometry', 'Permutation & Combination'] },
            { subject: 'Verbal (VARC)', topics: ['Reading Comprehension (Long & Short)', 'Para Jumbles', 'Sentence Correction', 'Para Summary', 'Odd One Out', 'Critical Reasoning'] },
            { subject: 'Reasoning (DILR)', topics: ['Logical Reasoning (Arrangements, Matrix)', 'Data Interpretation (Charts, Tables)', 'Games & Tournaments', 'Venn Diagrams', 'Binary Logic'] }
        ],
        eligibilityCriteria: [
            'Minimum 50% marks in Graduation (45% for SC/ST)',
            'Final year undergraduate students are eligible to apply',
            'No age restriction'
        ],
        patternInfo: {
            examMode: 'Computer Based Test (CBT)',
            testDuration: '120 Minutes',
            questionMatrix: '66 Questions across 3 sections',
            markingScheme: '+3 for correct, -1 for incorrect'
        },
        prepStrategy: [
            'Master RCs: CAT Verbal is 70% Reading Comprehension. Read diverse topics from Aeon, Guardian, and NYT.',
            'Arithmetic Prowess: Over 50% of the Quant section is Arithmetic. Perfect your ratios and percentages.',
            'Logical Puzzles: Solve at least 2 DILR sets daily to improve pattern recognition.',
            'Mock Analysis: Spend 4 hours analyzing every 2-hour mock test you take.'
        ],
        participatingColleges: [
            { name: 'IIM Ahmedabad', location: 'Ahmedabad, Gujarat' },
            { name: 'IIM Bangalore', location: 'Bangalore, Karnataka' },
            { name: 'IIM Calcutta', location: 'Kolkata, West Bengal' },
            { name: 'FMS Delhi', location: 'New Delhi' },
            { name: 'SPJIMR Mumbai', location: 'Mumbai, Maharashtra' }
        ],
        applicationSteps: [
            'Register on iimcat.ac.in during the August window.',
            'Fill personal, academic, and work experience details.',
            'Select IIM programs and interview cities.',
            'Upload documents and pay the registration fee online.',
            'Download the admit card in October.'
        ],
        documentsRequired: [
            'Class 10, 12 and Graduation Marksheets',
            'Work Experience Certificates (if any)',
            'Category Certificate (SC/ST/OBC/EWS) if applicable',
            'Scanned Photo and Signature'
        ],
        portalUrl: 'https://iimcat.ac.in',
        heroImage: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&q=80&w=1200'
    },
    'jee-main': {
        id: 'jee-main',
        title: 'JEE MAINS 2026',
        fullName: 'Joint Entrance Examination 2026',
        year: '2026',
        overview: 'JEE MAINS is the largest engineering entrance exam in India, serving as the gateway to NITs, IIITs, and becoming eligible for JEE Advanced (IIT admissions).',
        category: 'Engineering',
        currentStatus: 'Session 2 Ongoing',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'National level test for Engineering and Architecture',
            'Conducted by the National Testing Agency (NTA)',
            'Score accepted by most state and private technical universities'
        ],
        timeline: [
            { event: 'Session 1 Registration', date: 'November 2026', status: 'completed' },
            { event: 'Session 1 Examination', date: 'January 2026', status: 'completed' },
            { event: 'Session 2 Registration', date: 'February 2026', status: 'ongoing' },
            { event: 'Session 2 Examination', date: 'April 2026', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Physics', topics: ['Mechanics & Kinematics', 'Thermodynamics', 'Electrostatics & Magnetism', 'Modern Physics', 'Optics & Waves', 'Current Electricity', 'Fluids'] },
            { subject: 'Chemistry', topics: ['Organic (Aldehydes, Ketones, Polymers)', 'Physical (Kinetics, Equilibrium)', 'Inorganic (Coordination, P-Block)', 'Atomic Structure'] },
            { subject: 'Mathematics', topics: ['Calculus (Diff & Int)', 'Algebra (Vectors, Complex)', 'Coordinate Geometry', 'Trigonometry', 'Probability & Statistics'] }
        ],
        eligibilityCriteria: [
            'Passed Class 12 with Physics and Maths compulsory',
            'Must be among top 20 percentile or score above 75% for NITs/IITs',
            'Maximum 3 attempts'
        ],
        patternInfo: {
            examMode: 'Computer Based Test (CBT)',
            testDuration: '180 Minutes (3 Hours)',
            questionMatrix: '90 Questions (30 per subject)',
            markingScheme: '+4 for correct, -1 for incorrect'
        },
        prepStrategy: [
            'Focus on NCERT: 80% of JEE MAINS questions are directly or indirectly based on NCERT concepts.',
            'Previous Year Papers: Solve the last 5 years of NTA papers to understand trends.',
            'Timed Practice: Solve 25 questions in 60 minutes to improve speed.',
            'Formula Sheets: Maintain a quick-revision notebook for Physics and Math formulas.'
        ],
        participatingColleges: [
            { name: 'NIT Trichy', location: 'Tiruchirappalli, Tamil Nadu' },
            { name: 'NIT Surathkal', location: 'Mangalore, Karnataka' },
            { name: 'IIIT Hyderabad', location: 'Hyderabad, Telangana' },
            { name: 'DTU Delhi', location: 'New Delhi' },
            { name: 'NSUT Delhi', location: 'New Delhi' }
        ],
        applicationSteps: [
            'Register on jeemain.nta.nic.in.',
            'Fill the application form and choose exam sessions.',
            'Upload scanned images and category certificates.',
            'Pay the examination fee via Net Banking/UPI.',
            'Print the confirmation page.'
        ],
        documentsRequired: [
            'Class 12 Marksheet/Board details',
            'Aadhar Card or Valid ID Proof',
            'Scanned Photograph (JPG)',
            'Scanned Signature (JPG)',
            'EWS/OBC/SC/ST Certificate (if applicable)'
        ],
        portalUrl: 'https://jeemain.nta.nic.in',
        heroImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200'
    },
    'neet': {
        id: 'neet',
        title: 'NEET 2026',
        fullName: 'National Eligibility cum Entrance Test 2026',
        year: '2026',
        overview: 'NEET UG is the solitary medical entrance exam in India for admission to MBBS, BDS, and other related medical courses in all government and private colleges.',
        category: 'Medical',
        currentStatus: 'Registration Opening Soon',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Single gateway for medical studies in India',
            'Over 20 lakh students compete every year',
            'Offline OMR based examination'
        ],
        timeline: [
            { event: 'Registration Portal Opens', date: 'March 2026', status: 'upcoming' },
            { event: 'Admit Card Issuance', date: 'April 2026', status: 'upcoming' },
            { event: 'NEET UG Exam Day', date: 'May 2026', status: 'upcoming' },
            { event: 'Result Declaration', date: 'June 2026', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Biology', topics: ['Genetics', 'Human Physiology', 'Plant Physiology', 'Cell Biology'] },
            { subject: 'Physics', topics: ['Electrostatics', 'Kinematics', 'Optics', 'Atoms & Nuclei'] },
            { subject: 'Chemistry', topics: ['Biomolecules', 'Periodic Table', 'Redox Reactions'] }
        ],
        eligibilityCriteria: [
            'Minimum 17 years of age by Dec 31, 2026',
            'Physics, Chemistry, Biology in 10+2 with minimum 50% aggregate'
        ],
        patternInfo: {
            examMode: 'Offline (Pen and Paper)',
            testDuration: '200 Minutes',
            questionMatrix: '200 Questions (Physics-50, Chemistry-50, Biology-100)',
            markingScheme: '+4 for correct, -1 for incorrect'
        },
        prepStrategy: [
            'NCERT Biology: Memorize every diagram and label in NCERT. 95% of Biology is from here.',
            'Physics Practice: Focus on formula application and unit conversions. Solve 50 MCQs daily.',
            'Chemistry: Master Organic reactions and Periodic Table trends.',
            'Time Management: Practice solving 180 questions in 150 minutes to have buffer time for OMR filling.'
        ],
        participatingColleges: [
            { name: 'AIIMS New Delhi', location: 'New Delhi' },
            { name: 'MAMC Delhi', location: 'New Delhi' },
            { name: 'CMC Vellore', location: 'Vellore, Tamil Nadu' },
            { name: 'AFMC Pune', location: 'Pune, Maharashtra' }
        ],
        applicationSteps: [
            'Register on neet.nta.nic.in.',
            'Generate a password and system-generated Application No.',
            'Fill personal and qualification details.',
            'Upload Passport size photo, Postcard size photo, and Thumb impression.',
            'Pay fee and save the Application Confirmation Page.'
        ],
        documentsRequired: [
            'Passport & Postcard size photos (with name/date)',
            'Left & Right hand Fingers and Thumb impression',
            'Class 10 and 12 Passing Certificates',
            'Category/Citizenship Certificate'
        ],
        portalUrl: 'https://neet.nta.nic.in',
        heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200'
    },
    'gate': {
        id: 'gate',
        title: 'GATE 2026',
        fullName: 'Graduate Aptitude Test in Engineering 2026',
        year: '2026',
        overview: 'GATE tests the comprehensive understanding of undergraduate subjects in engineering and science. It\'s used for postgraduate admissions and PSU job opportunities.',
        category: 'Engineering',
        currentStatus: 'Results Declared',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Conducted by IISc and IITs on rotation',
            'Score valid for 3 years',
            'Highly preferred by Public Sector Undertakings (PSUs)'
        ],
        timeline: [
            { event: 'Application Process', date: 'September - October 2026', status: 'completed' },
            { event: 'GATE Examination', date: 'February 2026', status: 'completed' },
            { event: 'Resulsts Upload', date: 'March 16, 2026', status: 'completed' },
            { event: 'Scorecard Download', date: 'March 2026', status: 'ongoing' }
        ],
        syllabusDetails: [
            { subject: 'General Aptitude', topics: ['Logical Reasoning', 'Numerical Ability'] },
            { subject: 'Engg Mathematics', topics: ['Linear Algebra', 'Calculus', 'Probability'] },
            { subject: 'Core Subject', topics: ['Specific stream related topics'] }
        ],
        eligibilityCriteria: [
            'Current students in 3rd or higher years of UG degree',
            'Graduates in Engineering, Technology, Architecture, or Science',
            'No age limit'
        ],
        patternInfo: {
            examMode: 'Computer Based Test (CBT)',
            testDuration: '180 Minutes',
            questionMatrix: '65 Questions total',
            markingScheme: 'MCQs and NATs (1 or 2 marks each)'
        },
        prepStrategy: [
            'Virtual Calculator: Get used to the official virtual calculator to avoid manual errors.',
            'Engineering Math: This section along with Aptitude covers 28-30 marks. It is the highest ROI section.',
            'NATs (Numerical Answer Type): Practice these heavily as they have no options and require high accuracy.',
            'Short Notes: Make 2-page summaries for every core subject for last-minute revision.'
        ],
        participatingColleges: [
            { name: 'IISc Bangalore', location: 'Bangalore, Karnataka' },
            { name: 'IIT Bombay', location: 'Mumbai, Maharashtra' },
            { name: 'IIT Delhi', location: 'New Delhi' },
            { name: 'IIT Madras', location: 'Chennai, Tamil Nadu' },
            { name: 'PSUs (ONGC, NTPC, IOCL)', location: 'Pan India (Jobs)' }
        ],
        applicationSteps: [
            'Apply via GOAPS (GATE Online Application Processing System).',
            'Upload high-quality photograph and signature.',
            'Select one or two papers (as per eligibility).',
            'Pay the application fee based on category.',
            'Download the admit card in early January.'
        ],
        documentsRequired: [
            'Personal Details (Name, DOB, Mobile)',
            'Address for Communication',
            'Degree/Diploma Certificate or Pre-final year marksheet',
            'Good quality Passport Image and Signature'
        ],
        portalUrl: 'https://gate2026.iitm.ac.in',
        heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200'
    },
    'xat': {
        id: 'xat',
        title: 'XAT 2026',
        fullName: 'Xavier Aptitude Test 2026',
        year: '2026',
        overview: 'XAT is a national-level test conducted by XLRI Jamshedpur for over 70 years. Scores are used for XLRI and 160+ other B-schools.',
        category: 'Management',
        currentStatus: 'Planning Phase',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Unique section on Decision Making',
            'Conducted by XLRI for XAMI',
            'Over 160 management institutes accept XAT'
        ],
        timeline: [
            { event: 'Registration Portal Opens', date: 'August 2026', status: 'upcoming' },
            { event: 'Admit Card Release', date: 'December 2026', status: 'upcoming' },
            { event: 'Examination Day', date: 'January 2027', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Decision Making', topics: ['Ethics', 'Analytical Reasoning', 'Management Scenarios'] },
            { subject: 'Quant & DI', topics: ['Arithmetic', 'Algebra', 'Charts & Graphs'] },
            { subject: 'Verbal & LR', topics: ['Critical Thinking', 'Vocabulary', 'RCs'] }
        ],
        eligibilityCriteria: [
            'Bachelor\'s degree of 3 years minimum duration',
            'No minimum marks required to sit for the exam',
            'Final year students can apply'
        ],
        patternInfo: {
            examMode: 'Computer Based Test (CBT)',
            testDuration: '210 Minutes',
            questionMatrix: 'Decision Making, Quant, Verbal, GK, Essay',
            markingScheme: '+1 for correct, -0.25 for incorrect'
        },
        prepStrategy: [
            'Master Decision Making: This unique XAT section is the make-or-break. Practice case studies weekly.',
            'Verbal Proficiency: XAT Verbal is known for its difficulty. Focus on context and vocabulary.',
            'Essay Writing: Practice writing concise 250-word essays on social and ethical topics.',
            'GK Current Affairs: Focus on economy and business news from the last 12 months.'
        ],
        participatingColleges: [
            { name: 'XLRI Jamshedpur', location: 'Jamshedpur, Jharkhand' },
            { name: 'XLRI Delhi-NCR', location: 'Jhajjar, Haryana' },
            { name: 'SPJIMR Mumbai', location: 'Mumbai, Maharashtra' },
            { name: 'XIM University', location: 'Bhubaneswar, Odisha' },
            { name: 'IMT Ghaziabad', location: 'Ghaziabad, UP' }
        ],
        applicationSteps: [
            'Visit xatonline.in and create a new user profile.',
            'Fill academic history and work experience (if any).',
            'Select XLRI programs and other member institutes.',
            'Pay the XAT registration fee via online mode.',
            'Wait for the admit card release in late December.'
        ],
        documentsRequired: [
            'Class 10, 12, and Graduation Marksheets',
            'Valid Identity Proof (Aadhar/Passport)',
            'Scanned Passport Photo and Signature',
            'Category/Disability Certificates (if applicable)'
        ],
        portalUrl: 'https://xatonline.in',
        heroImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200'
    },
    'clat': {
        id: 'clat',
        title: 'CLAT 2026',
        fullName: 'Common Law Admission Test 2026',
        year: '2026',
        overview: 'CLAT is the gateway to 22 National Law Universities in India for undergraduate (UG) and postgraduate (PG) law degrees.',
        category: 'Law',
        currentStatus: 'Pre-Notification',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Gateway to top-tier NLUs',
            'Focused on comprehension and logic rather than memory',
            'Open for both Undergraduate and Masters courses'
        ],
        timeline: [
            { event: 'Notification Release', date: 'June 2026', status: 'upcoming' },
            { event: 'Apply Online', date: 'July - October 2026', status: 'upcoming' },
            { event: 'Examination Conduct', date: 'December 2026', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Legal Reasoning', topics: ['Torts', 'Contracts', 'IPR', 'Constitution'] },
            { subject: 'English', topics: ['Reading Comprehension', 'Sentence Correction'] },
            { subject: 'General Knowledge', topics: ['Current Affairs', 'Static GK'] }
        ],
        eligibilityCriteria: [
            'Class 12 with minimum 45% aggregate (UG)',
            'LL.B with minimum 50% aggregate (PG)',
            'No age limit'
        ],
        patternInfo: {
            examMode: 'Offline (Pen and Paper)',
            testDuration: '120 Minutes',
            questionMatrix: '120 Questions based on passages',
            markingScheme: '+1 for correct, -0.25 for incorrect'
        },
        prepStrategy: [
            'Comprehension Focus: CLAT is now reading-heavy. Speed-read editorials from The Hindu or Indian Express.',
            'Legal Aptitude: Focus on building legal reasoning skills rather than memorizing laws.',
            'Current Affairs: 25% of the paper is GK. Revise monthly current affairs for at least 15 months.',
            'Logical Reasoning: Practice syllogisms and analogies with a timer.'
        ],
        participatingColleges: [
            { name: 'NLSIU Bangalore', location: 'Bangalore, Karnataka' },
            { name: 'NALSAR Hyderabad', location: 'Hyderabad, Telangana' },
            { name: 'WBNUJS Kolkata', location: 'Kolkata, WB' },
            { name: 'NLU Jodhpur', location: 'Jodhpur, Rajasthan' }
        ],
        applicationSteps: [
            'Register on consortiumofnlus.ac.in during the July-Oct window.',
            'Fill personal, academic, and category details.',
            'Select the preferred exam centers (choice of 3).',
            'Pay the registration fee (General: ₹4000, SC/ST: ₹3500).',
            'Download the hall ticket in November/December.'
        ],
        documentsRequired: [
            'Class 10 and 12 Marksheets',
            'Passport Photograph (Front face, white background)',
            'Signature of the Candidate',
            'Category/Domicile Certificate'
        ],
        portalUrl: 'https://consortiumofnlus.ac.in',
        heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200'
    },
    'mat': {
        id: 'mat',
        title: 'MAT 2026',
        fullName: 'Management Aptitude Test 2026',
        year: '2026',
        overview: 'MAT is a national-level standardized test conducted quarterly for screening candidates for MBA and PGDM programs in over 600 B-Schools.',
        category: 'Management',
        currentStatus: 'Ongoing Admissions',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Conducted 4 times a year (Feb, May, Sept, Dec)',
            'Multiple modes of testing available (PBT, CBT, IBT)',
            'Accepted by a vast network of B-schools'
        ],
        timeline: [
            { event: 'May Session Registration', date: 'March - May 2026', status: 'ongoing' },
            { event: 'May Session Exam', date: 'May 2026', status: 'upcoming' },
            { event: 'September Session', date: 'July - August 2026', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Language Comp.', topics: ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Para Jumbles', 'Sentence Correction', 'Contextual Usage', 'Fill in the Blanks'] },
            { subject: 'Mathematical Skills', topics: ['Arithmetic (Ratio, Percentage, Profit/Loss)', 'Algebra', 'Geometry & Mensuration', 'Modern Math', 'Number System', 'Time and Work', 'Distance & Speed'] },
            { subject: 'Intelligence & LR', topics: ['Analytical Reasoning', 'Critical Reasoning', 'Coding-Decoding', 'Family Tree', 'Series & Sequences', 'Blood Relations', 'Visual Reasoning'] },
            { subject: 'Data Analysis & Sufficiency', topics: ['Tables & Line Graphs', 'Pie Charts & Bar Graphs', 'Caselets', 'Data Sufficiency Patterns', 'Statistical Charts'] },
            { subject: 'Indian & Global Environment', topics: ['Current Affairs (Last 6 Months)', 'Static GK', 'Business Environment', 'Awards & Honors', 'National & International Organizations'] }
        ],
        eligibilityCriteria: [
            'Graduate in any discipline from a recognized University',
            'Final year students appearing for their Bachelor\'s degree exams are also eligible',
            'No minimum percentage required for appearing in MAT; however, individual B-schools may have their own criteria',
            'No age restriction'
        ],
        patternInfo: {
            examMode: 'Choice between PBT (Paper-Based), CBT (Computer-Based), and IBT (Internet-Based)',
            testDuration: '150 Minutes (2.5 Hours)',
            questionMatrix: '200 Questions (40 per section)',
            markingScheme: '+1 for correct, -0.25 for incorrect'
        },
        prepStrategy: [
            'Daily Practice: Allocate at least 2 hours for Mathematical Skills and 1 hour for Language Comprehension.',
            'Mock Tests: Take full-length IBT/CBT mock tests every weekend to build stamina.',
            'GK Updates: Read business newspapers daily for the Indian & Global Environment section.',
            'Sectional Focus: Focus on Critical Reasoning as it usually carries high weightage in the Intelligence section.'
        ],
        participatingColleges: [
            { name: 'XIME Bangalore', location: 'Bangalore, Karnataka' },
            { name: 'BIMTECH Noida', location: 'Greater Noida, UP' },
            { name: 'Amity University', location: 'Noida/Mumbai/Jaipur' },
            { name: 'Christ University', location: 'Bangalore/Delhi' },
            { name: 'Alliance School of Business', location: 'Bangalore, Karnataka' }
        ],
        applicationSteps: [
            'Visit the official AIMA MAT portal (mat.aima.in).',
            'Register with a valid Email ID and Mobile Number.',
            'Select the preferred exam mode (PBT/CBT/IBT).',
            'Upload scanned photograph and signature in required format.',
            'Pay the application fee via credit/debit card or net banking.',
            'Download and save the confirmation page for future reference.'
        ],
        documentsRequired: [
            'Valid Email ID and Active Mobile Number',
            'Scanned Image of Photograph (10KB to 50KB)',
            'Scanned Image of Signature (5KB to 20KB)',
            'Details of Credit card/Debit card/Net Banking for fee payment',
            'Final year marksheet or Graduation degree (if completed)'
        ],
        portalUrl: 'https://mat.aima.in',
        heroImage: 'https://images.unsplash.com/photo-1454165833767-027ffea9e7a7?auto=format&fit=crop&q=80&w=1200'
    },
    'nift': {
        id: 'nift',
        title: 'NIFT Entrance 2026',
        fullName: 'NIFT Entrance Examination 2026',
        year: '2026',
        overview: 'NIFT Entrance is a national test for admission into apparel, design, and management courses in National Institute of Fashion Technology campuses.',
        category: 'Design',
        currentStatus: 'Interview Phase',
        lastChecked: 'March 19, 2026',
        keyPoints: [
            'Premier institute for Fashion and Design in India',
            'Two-stage process for design: Written + Situation Test',
            'Multi-campus availability across India'
        ],
        timeline: [
            { event: 'Written Entrance (GAT/CAT)', date: 'February 2026', status: 'completed' },
            { event: 'Result Declaration', date: 'March 2026', status: 'completed' },
            { event: 'Situation Test/GDPI', date: 'April 2026', status: 'upcoming' },
            { event: 'Final Selection List', date: 'May 2026', status: 'upcoming' }
        ],
        syllabusDetails: [
            { subject: 'Creative Ability Test', topics: ['Sketching', 'Visualization', 'Color Theory'] },
            { subject: 'General Ability Test', topics: ['Quantitative', 'Analytical', 'English'] },
            { subject: 'Situation Test', topics: ['Model making with physical materials'] }
        ],
        eligibilityCriteria: [
            'Class 12 with any stream (B.Des)',
            'Maximum age limit of 24 years for General category',
            'Graduates required for Masters programs'
        ],
        patternInfo: {
            examMode: 'CBT for GAT, Physical for CAT',
            testDuration: 'Variable by Course (2-3 Hours)',
            questionMatrix: 'Creative and General Ability tests',
            markingScheme: 'Holistic assessment for Design'
        },
        portalUrl: 'https://nift.ac.in',
        heroImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200'
    }
};
