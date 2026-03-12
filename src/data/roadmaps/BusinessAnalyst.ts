import { RoadmapData } from "../types";

export const businessAnalystData: RoadmapData = {
    id: "business-analyst",
    title: "Business Analyst",
    subtitle: "Strategy Insight",
    description: "Analyze business processes and bridge the gap between IT and business.",
    iconName: "BarChart",
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Commerce or Science with Mathematics.",
            details: ["Mathematics (Statistics)", "Economics", "Business Studies"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "BBA / B.Tech / B.Com",
            description: "Degree in Business, IT, or Commerce.",
            details: ["Business Administration", "Management Information Systems", "Finance"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Business Fundamentals",
            subtitle: "The Context",
            description: "Understanding how businesses work.",
            details: ["SWOT Analysis", "Business Processes", "Organizational Structure"],
            iconName: "Briefcase"
        },
        {
            id: 4,
            title: "Data Analysis Basics",
            subtitle: "Excel & SQL",
            description: "Tools to crunch the numbers.",
            details: ["Advanced Excel (Pivot Tables)", "SQL (Querying)", "Data Modeling"],
            iconName: "BarChart"
        },
        {
            id: 5,
            title: "Requirements Gathering",
            subtitle: "Elicitation",
            description: "Finding out what stakeholders need.",
            details: ["Interviews", "Workshops", "Surveys"],
            iconName: "Users"
        },
        {
            id: 6,
            title: "Documentation",
            subtitle: "BRD / SRS",
            description: "Writing clear specifications.",
            details: ["Business Requirement Document", "Functional Specs", "Use Cases"],
            iconName: "FileText"
        },
        {
            id: 7,
            title: "Process Modeling",
            subtitle: "UML / BPMN",
            description: "Visualizing workflows.",
            details: ["Flowcharts", "Activity Diagrams", "Sequence Diagrams"],
            iconName: "GitMerge"
        },
        {
            id: 8,
            title: "Agile & Scrum",
            subtitle: "Methodology",
            description: "Working in modern software teams.",
            details: ["User Stories", "Backlog Management", "Sprint Planning"],
            iconName: "Repeat"
        },
        {
            id: 9,
            title: "Data Visualization",
            subtitle: "Dashboards",
            description: "Presenting insights.",
            details: ["Tableau", "PowerBI", "Dashboard Design"],
            iconName: "PieChart"
        },
        {
            id: 10,
            title: "Testing & Validation",
            subtitle: "UAT",
            description: "Ensuring the solution meets the need.",
            details: ["User Acceptance Testing", "Test Scenarios", "Defect Tracking"],
            iconName: "CheckCircle"
        },
        {
            id: 11,
            title: "Domain Knowledge",
            subtitle: "Specialization",
            description: "Deep dive into a specific industry.",
            details: ["Finance (Banking)", "Healthcare", "Supply Chain"],
            iconName: "Globe"
        },
        {
            id: 12,
            title: "Career Growth",
            subtitle: "Leadership",
            description: "Moving up the ladder.",
            details: ["Senior BA", "Product Owner", "Management Consultant"],
            iconName: "TrendingUp"
        }
    ]
};
