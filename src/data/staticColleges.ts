import college_image from "../../public/college_images/college_image.jpg";

export interface CollegeTag {
  label: string;
  type: 'stream' | 'group' | 'ownership';
}

export interface College {
  id: string;
  name: string;
  location: string;
  logoInitial: string;
  verified: boolean;
  tags: CollegeTag[];
  description: string;
  nirfRanking: number;
  nirfCategory: string;
  estYear: number;
  ownership: string;
  campusSize: string;
  approval: string;

  about: string;

  accreditation: string;
  accreditationGrade: string;
  globalRank: string;
  globalRankPublisher: string;
  researchOutput: string;
  startups: string;

  galleryImages: string[];

  highlights: {
    avgPackage: string;
    highestPackage: string;
    placementRate: string;
    totalStudents: string;
    facultyStrength: string;
    programsOffered: string;
  };

  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

export const staticColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    logoInitial: 'IITD',
    verified: true,
    tags: [
      { label: 'Engineering', type: 'stream' },
      { label: 'IIT', type: 'group' },
      { label: 'Government', type: 'ownership' }
    ],
    description: 'IIT Delhi is one of the premier engineering institutions in India, known for academic excellence, innovative research and outstanding placements.',
    
    nirfRanking: 2,
    nirfCategory: '(Engineering)',
    estYear: 1961,
    ownership: 'Government',
    campusSize: '320 Acres',
    approval: 'AICTE, UGC',
    
    about: 'Established in 1961, IIT Delhi is a premier institute of national importance. It offers undergraduate, postgraduate and doctoral programs across engineering, sciences, humanities and management. The institute is renowned for its cutting-edge research, world-class faculty and excellent placement opportunities.',
    
    accreditation: 'NAAC Accreditation',
    accreditationGrade: 'A++ Grade',
    globalRank: '501-600',
    globalRankPublisher: 'QS World University',
    researchOutput: '7000+',
    startups: '250+',
    
    galleryImages: [
      college_image,
      college_image,
      college_image,
      college_image
    ],
    
    highlights: {
      avgPackage: '₹23.5 LPA',
      highestPackage: '₹1.15 CPA',
      placementRate: '95%',
      totalStudents: '8,326',
      facultyStrength: '620+',
      programsOffered: '70+'
    },
    
    contact: {
      address: 'Hauz Khas, New Delhi,\nDelhi - 110016',
      phone: '011 2659 1122',
      email: 'office@admin.iitd.ac.in',
      website: 'https://home.iitd.ac.in'
    }
  },
  {
    id: '2',
    name: 'IIM Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    tags: [
      { label: 'Management', type: 'stream' },
      { label: 'IIM', type: 'group' },
      { label: 'Government', type: 'ownership' }
    ],
    description: 'IIM Ahmedabad is a globally recognized management institute offering world-class MBA programs.',
    nirfRanking: 1,
    nirfCategory: '(Management)',
    estYear: 1961,
    ownership: 'Government',
    campusSize: '102 Acres',
    approval: 'AICTE',
    logoInitial: 'IIMA',
    verified: true,
    about: 'IIM Ahmedabad is one of the top business schools in the world, offering premier management education and cultivating global leaders.',
    accreditation: 'EQUIS Accreditation',
    accreditationGrade: 'Accredited',
    globalRank: '44',
    globalRankPublisher: 'FT Global MBA',
    researchOutput: '2000+',
    startups: '150+',
    galleryImages: [
      college_image,
      college_image,
      college_image,
      college_image
    ],
    highlights: {
      avgPackage: '₹32.5 LPA',
      highestPackage: '₹1.14 CPA',
      placementRate: '100%',
      totalStudents: '1,200',
      facultyStrength: '100+',
      programsOffered: '10+'
    },
    contact: {
      address: 'Vastrapur, Ahmedabad,\nGujarat - 380015',
      phone: '079 2630 8357',
      email: 'admission@iima.ac.in',
      website: 'https://www.iima.ac.in'
    }
  },
  {
    id: '3',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, Delhi',
    tags: [
      { label: 'Medical', type: 'stream' },
      { label: 'AIIMS', type: 'group' },
      { label: 'Government', type: 'ownership' }
    ],
    description: 'AIIMS Delhi is a leader in medical education, research and healthcare services.',
    nirfRanking: 1,
    nirfCategory: '(Medical)',
    estYear: 1956,
    ownership: 'Government',
    campusSize: '115 Acres',
    approval: 'MCI',
    logoInitial: 'AIIMS',
    verified: true,
    about: 'AIIMS New Delhi is a medical college and medical research public university renowned globally for its medical care, research, and education.',
    accreditation: 'MCI Approved',
    accreditationGrade: 'Approved',
    globalRank: '123',
    globalRankPublisher: 'QS World Medicine',
    researchOutput: '15000+',
    startups: '50+',
    galleryImages: [
      college_image,
      college_image,
      college_image,
      college_image
    ],
    highlights: {
      avgPackage: '₹18.0 LPA',
      highestPackage: '₹40.0 LPA',
      placementRate: '100%',
      totalStudents: '3,500',
      facultyStrength: '800+',
      programsOffered: '40+'
    },
    contact: {
      address: 'Ansari Nagar, New Delhi,\nDelhi - 110029',
      phone: '011 2658 8500',
      email: 'info@aiims.edu',
      website: 'https://www.aiims.edu'
    }
  },
  {
    id: '4',
    name: 'Christ University',
    location: 'Bengaluru, Karnataka',
    tags: [
      { label: 'Management', type: 'stream' },
      { label: 'Autonomous', type: 'group' },
      { label: 'Private', type: 'ownership' }
    ],
    description: 'Christ University is known for holistic education and strong industry connections.',
    nirfRanking: 60,
    nirfCategory: '(Management)',
    estYear: 1969,
    ownership: 'Private',
    campusSize: '25 Acres',
    approval: 'UGC',
    logoInitial: 'CU',
    verified: true,
    about: 'Christ University is a deemed to be university in Bangalore, providing a nurturing environment and comprehensive education.',
    accreditation: 'NAAC Accreditation',
    accreditationGrade: 'A Grade',
    globalRank: 'N/A',
    globalRankPublisher: '',
    researchOutput: '1000+',
    startups: '20+',
    galleryImages: [
      college_image,
      college_image,
      college_image,
      college_image
    ],
    highlights: {
      avgPackage: '₹7.5 LPA',
      highestPackage: '₹20.0 LPA',
      placementRate: '85%',
      totalStudents: '21,000',
      facultyStrength: '900+',
      programsOffered: '50+'
    },
    contact: {
      address: 'Hosur Road, Bengaluru,\nKarnataka - 560029',
      phone: '080 4012 9100',
      email: 'mail@christuniversity.in',
      website: 'https://christuniversity.in'
    }
  }
];
