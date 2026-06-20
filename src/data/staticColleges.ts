export interface CollegeTag {
  label: string;
  type: 'stream' | 'group' | 'ownership';
}

export interface College {
  id: string;
  name: string;
  location: string;
  tags: CollegeTag[];
  description: string;
  nirfRanking: number;
  estYear: number;
  avgPackage: string;
  logoInitial: string;
  verified: boolean;
}

export const staticColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'New Delhi, Delhi',
    tags: [
      { label: 'Engineering', type: 'stream' },
      { label: 'IIT', type: 'group' },
      { label: 'Government', type: 'ownership' }
    ],
    description: 'IIT Delhi is one of the premier engineering institutions in India, known for academic excellence and research.',
    nirfRanking: 2,
    estYear: 1961,
    avgPackage: '₹23.5 LPA',
    logoInitial: 'IITD',
    verified: true
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
    estYear: 1961,
    avgPackage: '₹32.5 LPA',
    logoInitial: 'IIMA',
    verified: true
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
    estYear: 1956,
    avgPackage: '₹18.0 LPA',
    logoInitial: 'AIIMS',
    verified: true
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
    estYear: 1969,
    avgPackage: '₹7.5 LPA',
    logoInitial: 'CU',
    verified: true
  }
];
