import { RoadmapData } from '../types';

export const mernStackData: RoadmapData = {
    id: "mern-stack",
    title: "MERN Stack Developer",
    subtitle: "MongoDB, Express, React, Node",
    description: "Master the full JavaScript stack used to build modern single-page applications.",
    iconName: "Layers",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Focus on Computer Science, Mathematics, and logical reasoning.",
            details: ["Physics, Chemistry, Math", "Intro to Programming (C/C++)", "Basic Algorithms"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / B.Sc / BCA",
            description: "Pursue a degree in Computer Science, IT, or related fields.",
            details: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Frontend Fundamentals",
            subtitle: "HTML, CSS & JS",
            description: "Structure, style, and interactivity for the web.",
            details: ["HTML5 & CSS3", "JavaScript (ES6+)", "Responsive Design"],
            iconName: "Layout"
        },
        {
            id: 4,
            title: "Frontend Framework",
            subtitle: "React.js",
            description: "Build dynamic user interfaces with the most popular library.",
            details: ["JSX & Components", "Hooks & Context API", "Redux / Zustand"],
            iconName: "FileCode"
        },
        {
            id: 5,
            title: "Backend Development",
            subtitle: "Node.js & Express",
            description: "Create scalable server-side applications.",
            details: ["RESTful APIs", "Middleware", "Authentication (JWT)"],
            iconName: "Server"
        },
        {
            id: 6,
            title: "Database",
            subtitle: "MongoDB",
            description: "Store data in a flexible, JSON-like format.",
            details: ["Schema Design", "Mongoose ORM", "Aggregation Framework"],
            iconName: "Database"
        }
    ]
};
