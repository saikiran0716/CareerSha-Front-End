import { RoadmapData } from '../types';

export const fullStackPythonData: RoadmapData = {
    id: "full-stack-python",
    title: "Full Stack Python",
    subtitle: "Django & React",
    description: "Rapidly build secure and maintainable web applications.",
    iconName: "Terminal",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Focus on analytical reasoning and basic coding.",
            details: ["Computer Science (Python focus)", "Mathematics", "Statistics Basics"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / B.Sc CS",
            description: "Comprehensive study of computer science fundamentals.",
            details: ["Algorithms in Python", "Database Systems", "Web Engineering"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Frontend Fundamentals",
            subtitle: "HTML, CSS & JS",
            description: "Core technologies for building web interfaces.",
            details: ["HTML5", "CSS3 / Bootstrap", "JavaScript ES6"],
            iconName: "Layout"
        },
        {
            id: 4,
            title: "Python Advanced",
            subtitle: "Language Mastery",
            description: "Go beyond basics to write efficient Python code.",
            details: ["Decorators", "Generators", "AsyncIO"],
            iconName: "Code"
        },
        {
            id: 5,
            title: "Web Frameworks",
            subtitle: "Django / Flask",
            description: "Build robust backends with Python's top frameworks.",
            details: ["ORM", "Authentication", "API Development (DRF)"],
            iconName: "Server"
        },
        {
            id: 6,
            title: "Full Stack Glue",
            subtitle: "Integration",
            description: "Bring frontend and backend together seamlessly.",
            details: ["React Integration", "Dockerizing", "AWS Deployment"],
            iconName: "Cloud"
        }
    ]
};
