export interface CoursoalItem {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    link: string; // Internal link ID or external URL
    description: string;
    buttonText?: string;
}

export const coursoalData: CoursoalItem[] = [];
