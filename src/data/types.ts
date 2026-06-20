export interface PageItem {
    title: string;
    subtitle: string;
    image?: string;
    tags: string[];
    link?: string;
    stats?: { label: string; value: string }[];
    content?: string; // For reviews or extra details
}

export interface PageData {
    title: string;
    description: string;
    items: PageItem[];
    type: 'college' | 'exam' | 'generic' | 'review';
    content?: string;
    faqs?: { question: string; answer: string }[];
}

export interface RoadmapStep {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
    iconName?: string;
}

export interface RoadmapData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    iconName: string;
    color: string;
    bg: string;
    steps: RoadmapStep[];
}

export interface CareerPredictorData {
    id: string;
    title: string;
    category: string;
    description: string;
    duration: string;
    difficulty: string;
    type?: string;
    items?: any[];
    iconName?: string;
    color?: string;
    bg?: string;
}