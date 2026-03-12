
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
