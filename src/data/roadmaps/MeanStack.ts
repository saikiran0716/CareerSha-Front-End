import { RoadmapData } from '../types';

export const meanStackData: RoadmapData = {
    id: "mean-stack",
    title: "MEAN Stack Developer",
    subtitle: "MongoDB, Express, Angular, Node",
    description: "Build robust enterprise-grade applications using the Angular framework.",
    iconName: "Layers",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "A solid foundation in math and logic is key.",
            details: ["Mathematics", "Computer Science Basics", "Problem Solving"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / BCA",
            description: "Formal education in software engineering principles.",
            details: ["Computer Networks", "Software Engineering", "Web Technologies"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Frontend Fundamentals",
            subtitle: "HTML, CSS & JS",
            description: "The building blocks of the web.",
            details: ["HTML5 Semantic", "CSS Flexbox/Grid", "JavaScript Logic"],
            iconName: "Layout"
        },
        {
            id: 4,
            title: "Frontend Framework",
            subtitle: "Angular",
            description: "Master the comprehensive framework for building large apps.",
            details: ["TypeScript", "Dependency Injection", "RxJS Observables"],
            iconName: "Code2"
        },
        {
            id: 5,
            title: "Backend Logic",
            subtitle: "Node.js & Express",
            description: "Handle server logic and API routes.",
            details: ["API Architecture", "Error Handling", "Performance Optimization"],
            iconName: "Server"
        },
        {
            id: 6,
            title: "Data Persistence",
            subtitle: "MongoDB",
            description: "Manage application data efficiently.",
            details: ["NoSQL Concepts", "Data Modeling", "Indexing"],
            iconName: "Database"
        }
    ]
};
