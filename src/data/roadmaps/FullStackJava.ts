import { RoadmapData } from '../types';

export const fullStackJavaData: RoadmapData = {
    id: "full-stack-java",
    title: "Full Stack Java",
    subtitle: "Enterprise Development",
    description: "Combine the power of Java Spring Boot backend with modern frontends.",
    iconName: "Coffee",
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Build strong logical and analytical skills.",
            details: ["Mathematics", "Physics", "Intro to Programming"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / MCA",
            description: "Degree in Computer Science or IT.",
            details: ["OOP Concepts", "Data Structures", "Java Programming Lab"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Frontend Fundamentals",
            subtitle: "HTML, CSS & JS",
            description: "Essential skills for any full stack developer.",
            details: ["HTML Structure", "CSS Styling", "DOM Manipulation"],
            iconName: "Layout"
        },
        {
            id: 4,
            title: "Java Core",
            subtitle: "Foundation",
            description: "Master object-oriented programming with Java.",
            details: ["OOP Principles", "Collections Framework", "Concurrency"],
            iconName: "Code"
        },
        {
            id: 5,
            title: "Spring Ecosystem",
            subtitle: "Spring Boot",
            description: "Build production-grade applications quickly.",
            details: ["Dependency Injection", "Spring MVC", "Spring Security"],
            iconName: "Server"
        },
        {
            id: 6,
            title: "Frontend Integration",
            subtitle: "React or Angular",
            description: "Connect your Java backend to a dynamic UI.",
            details: ["REST API Consumption", "State Management", "Deployment"],
            iconName: "Layout"
        }
    ]
};
