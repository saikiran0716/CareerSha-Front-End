export interface NavLink {
  name: string;
  url: string;
}

export interface NavSection {
  heading: string;
  links: NavLink[];
}

export interface NavCategory {
  title: string;
  slug: string;
  sections: NavSection[];
}

export const navigationData: NavCategory[] = [
  {
    title: 'Explore Colleges',
    slug: 'colleges',
    sections: [],
  },
  {
    title: 'Exams',
    slug: 'exams',
    sections: [],
  },
  {
    title: 'Predictors',
    slug: 'predictors',
    sections: [],
  },
  {
    title: 'Tools',
    slug: 'tools',
    sections: [],
  },
  {
    title: 'Jobs',
    slug: 'jobs',
    sections: [],
  },
];
