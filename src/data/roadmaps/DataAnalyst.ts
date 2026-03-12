import { RoadmapData } from '../types';

export const dataAnalystData: RoadmapData = {
    id: "data-analyst",
    title: "Data Analyst",
    subtitle: "Insights & Visualization",
    description: "Transform raw data into meaningful business insights.",
    iconName: "BarChart",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Strong grasp of Mathematics and Statistics.",
            details: ["Mathematics", "Statistics", "Computer Science"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Sc / B.Tech",
            description: "Degree in Math, Statistics, CS, or Economics.",
            details: ["Probability & Statistics", "Linear Algebra", "Database Basics"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Spreadsheets",
            subtitle: "Excel / Google Sheets",
            description: "Master the fundamental tool of data handling.",
            details: ["Pivot Tables", "VLOOKUP/XLOOKUP", "Data Cleaning"],
            iconName: "Table"
        },
        {
            id: 4,
            title: "Querying",
            subtitle: "SQL",
            description: "Extract and manipulate data from relational databases.",
            details: ["Joins & Unions", "Window Functions", "Subqueries"],
            iconName: "Database"
        },
        {
            id: 5,
            title: "Visualization",
            subtitle: "Tableau / PowerBI",
            description: "Create interactive dashboards for stakeholders.",
            details: ["DAX (PowerBI)", "Storytelling", "Chart Selection"],
            iconName: "PieChart"
        }
    ]
};
