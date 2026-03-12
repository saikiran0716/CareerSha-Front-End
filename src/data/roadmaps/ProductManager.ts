import { RoadmapData } from "../types";

export const productManagerData: RoadmapData = {
    id: "product-manager",
    title: "Product Manager",
    subtitle: "Visionary Leader",
    description: "Bridge the gap between business, technology, and user experience.",
    iconName: "Briefcase",
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Balanced focus on Commerce, Economics, or Science.",
            details: ["Economics", "Communication Skills", "Analytical Thinking"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "Diverse Paths",
            description: "Engineering, Business, or Economics degrees work well.",
            details: ["B.Tech (Tech background)", "BBA / Commmerce", "Economics"],
            iconName: "School"
        },
        {
            id: 3,
            title: "MBA (Optional)",
            subtitle: "Business Mastey",
            description: "Master of Business Administration for strategic depth.",
            details: ["Strategy", "Marketing", "Finance"],
            iconName: "Award"
        },
        {
            id: 4,
            title: "Tech Literacy",
            subtitle: "Understanding Eng",
            description: "Speaking the language of engineers.",
            details: ["SDLC Basics", "API High-level understanding", "Database Concepts"],
            iconName: "Terminal"
        },
        {
            id: 5,
            title: "User Research",
            subtitle: "Empathy",
            description: "Knowing your customer better than they know themselves.",
            details: ["User Interviews", "Surveys", "Data Analysis"],
            iconName: "Search"
        },
        {
            id: 6,
            title: "Data Analytics",
            subtitle: "Metrics",
            description: "Making decisions based on data, not hunches.",
            details: ["SQL Basics", "Amplitude / Mixpanel", "A/B Testing"],
            iconName: "BarChart"
        },
        {
            id: 7,
            title: "Product Design",
            subtitle: "UX Basics",
            description: "Collaborating with designers.",
            details: ["Wireframing", "Figma Basics", "Design Thinking"],
            iconName: "PenTool"
        },
        {
            id: 8,
            title: "Strategy & Roadmap",
            subtitle: "Vision",
            description: "Planning what to build and why.",
            details: ["Prioritization (RICE/MoSCoW)", "Roadmapping Tools", "Market Analysis"],
            iconName: "Map"
        },
        {
            id: 9,
            title: "Agile & Scrum",
            subtitle: "Execution",
            description: "Managing the build process.",
            details: ["Jira / Linear", "Sprint Planning", "Backlog Grooming"],
            iconName: "Repeat"
        },
        {
            id: 10,
            title: "Go-to-Market",
            subtitle: "Launch",
            description: "Launching products successfully.",
            details: ["Product Marketing", "Launch Strategy", "Sales Enablement"],
            iconName: "Rocket"
        },
        {
            id: 11,
            title: "Stakeholder Mgmt",
            subtitle: "Leadership",
            description: "Influencing without authority.",
            details: ["Negotiation", "Presentation", "Conflict Resolution"],
            iconName: "Users"
        },
        {
            id: 12,
            title: "Career Growth",
            subtitle: "CPO Path",
            description: "Moving from PM to Product Leader.",
            details: ["Group PM", "Director of Product", "Chief Product Officer"],
            iconName: "TrendingUp"
        }
    ]
};
