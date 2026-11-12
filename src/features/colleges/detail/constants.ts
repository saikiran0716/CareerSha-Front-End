export const TABS = ['Overview', 'Placements', 'Admissions', 'Campus Life', 'Gallery'] as const;
export type CollegeTab = (typeof TABS)[number];
