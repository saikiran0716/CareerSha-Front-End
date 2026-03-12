import { RoadmapData } from '../types';

export const itProjectManagerData: RoadmapData = {
    id: "it-project-manager",
    title: "IT Project Manager",
    subtitle: "Delivery Lead",
    description: "Lead software projects to successful delivery on time and budget.",
    iconName: "ClipboardCheck",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Communication and organizational skills.",
            details: ["Mathematics", "English / Communication", "Business Studies (Optional)"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / BBA / BCA",
            description: "Technical or Management background.",
            details: ["Project Management Basics", "IT Fundamentals", "Business Administration"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Methodologies",
            subtitle: "Agile & Waterfall",
            description: "Understand the frameworks for managing work.",
            details: ["Scrum Master", "Kanban", "SDLC"],
            iconName: "List"
        },
        {
            id: 4,
            title: "Tools & Planning",
            subtitle: "Execution",
            description: "Master the tools to track progress and resources.",
            details: ["JIRA / Confluence", "Gantt Charts", "Resource Allocation"],
            iconName: "Calendar"
        },
        {
            id: 5,
            title: "Leadership",
            subtitle: "People Management",
            description: "Manage stakeholders and team dynamics.",
            details: ["Risk Management", "Stakeholder Communication", "Conflict Resolution"],
            iconName: "Users"
        }
    ]
};
