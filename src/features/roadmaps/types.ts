
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
    iconName: string; // Used to identify which icon to render
    color: string;
    bg: string;
    steps: RoadmapStep[];
}
