import { RoadmapData } from '../types';

export const salesforceDeveloperData: RoadmapData = {
    id: "salesforce-developer",
    title: "Salesforce Dev",
    subtitle: "CRM Specialist",
    description: "Build custom applications on the Salesforce platform.",
    iconName: "Cloud",
    color: "text-sky-600",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Strong logical and analytical skills.",
            details: ["Computer Applications", "Mathematics", "Databases"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / BCA",
            description: "Degree in Computer Applications or Technology.",
            details: ["OOPS Concepts", "Database Management", "Web Technologies"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Platform Basics",
            subtitle: "Admin",
            description: "Master the declarative (point-and-click) features.",
            details: ["Data Modeling", "Process Automation", "Security Model"],
            iconName: "Settings"
        },
        {
            id: 4,
            title: "Development",
            subtitle: "Apex & LWC",
            description: "Write custom code for complex logic.",
            details: ["Apex (Backend)", "Lightning Web Components", "SOQL/SOSL"],
            iconName: "Code2"
        },
        {
            id: 5,
            title: "Integration",
            subtitle: "APIs",
            description: "Connect Salesforce with other systems.",
            details: ["REST/SOAP APIs", "Platform Events", "Integration Patterns"],
            iconName: "Share2"
        }
    ]
};
