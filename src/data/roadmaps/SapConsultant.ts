import { RoadmapData } from '../types';

export const sapConsultantData: RoadmapData = {
    id: "sap-consultant",
    title: "SAP Consultant",
    subtitle: "ERP Expert",
    description: "Implement and configure SAP solutions for large enterprises.",
    iconName: "Briefcase",
    color: "text-blue-700",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Commerce or Science background.",
            details: ["Accounting", "Business Studies", "Computer Science"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / B.Com / MBA",
            description: "Mixing business and technology.",
            details: ["ERP Basics", "Financial Accounting", "Supply Chain Management"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Business Processes",
            subtitle: "Domain Knowledge",
            description: "Understand core business functions.",
            details: ["Finance (FICO)", "Supply Chain (MM/SD)", "HR (SuccessFactors)"],
            iconName: "BookOpen"
        },
        {
            id: 4,
            title: "SAP Modules",
            subtitle: "Configuration",
            description: "Specialize in specific SAP modules.",
            details: ["S/4HANA", "Module Customization", "Implementation Lifecycle"],
            iconName: "Settings"
        },
        {
            id: 5,
            title: "Technical Basics",
            subtitle: "ABAP",
            description: "Basic programming knowledge for customization.",
            details: ["ABAP Debugging", "Data Dictionary", "Enhancements"],
            iconName: "Code"
        }
    ]
};
