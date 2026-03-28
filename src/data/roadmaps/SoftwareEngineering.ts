import { RoadmapData } from "../types";

export const softwareEngineeringData: RoadmapData = {
    id: "software-engineer",
    title: "Software Engineering",
    subtitle: "Architect of the Digital World",
    description: "A complete end-to-end journey from entrance exams to building world-scale software systems.",
    iconName: "Terminal",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10 (Scratch)",
            description: "The journey starts here. Build a strong base in Mathematics and Analytical thinking.",
            details: ["SSC/CBSE/ICSE Boards", "Foundation for JEE/EAMCET", "POLYCET (Diploma Path)"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Pre-University / Diploma",
            subtitle: "Choose Your Path",
            description: "Either complete Class 12 Science (PCM) or a 3-year Diploma in Engineering.",
            details: ["Class 12 (IIT-JEE Focus)", "Diploma (ECET Path)", "SAT/ACT (Global Targets)"],
            iconName: "BookOpen"
        },
        {
            id: 3,
            title: "Entrance Exams",
            subtitle: "The Gateways",
            description: "Clear national, state, or global exams to enter your choice of elite institutions.",
            details: ["JEE MAINS/Adv (IITs/NITs)", "EAMCET / ECET (State)", "SAT / TOEFL (Global: MIT)"],
            iconName: "Zap"
        },
        {
            id: 4,
            title: "Professional Degree",
            subtitle: "Elite Institutions",
            description: "Aim for top-tier colleges like IITs, MIT, NITs, or state engineering universities.",
            details: ["IITs / NITs / IIITs", "MIT / Stanford / CMU", "B.Tech/BCA Paths"],
            iconName: "School"
        },
        {
            id: 5,
            title: "Programming Core",
            subtitle: "Mastery of 1 Language",
            description: "Pick one language and master its syntax, features, and paradigms completely.",
            details: ["Python (AI/Backend)", "Java (Enterprise)", "C++ (Systems/Competitive)", "JavaScript (Web)"],
            iconName: "Terminal"
        },
        {
            id: 6,
            title: "Computer Fundamentals",
            subtitle: "How Systems Work",
            description: "Learn the theoretical core of tech that separates engineers from coders.",
            details: ["Operating Systems", "DBMS (Database Systems)", "Computer Networks", "System Design"],
            iconName: "Cpu"
        },
        {
            id: 7,
            title: "DSA & Problem Solving",
            subtitle: "The Hiring Bar",
            description: "Master Data Structures and Algorithms to clear top-tier tech interviews.",
            details: ["Arrays & Linked Lists", "Trees & Graphs", "Dynamic Programming", "Recursion Mastery"],
            iconName: "Code2"
        },
        {
            id: 8,
            title: "Web & API Ecosystem",
            subtitle: "Full-Stack Basics",
            description: "Understand how the internet works and how to build responsive applications.",
            details: ["HTML5 / CSS3 / React", "Node.js / Express", "API Design (REST/GraphQL)", "Browser Internals"],
            iconName: "Globe"
        },
        {
            id: 9,
            title: "Database Mastery",
            subtitle: "Data Reliability",
            description: "Learn to design scalable schemas and manage data consistency.",
            details: ["SQL (PostgreSQL, MySQL)", "NoSQL (MongoDB, Redis)", "ORM (Prisma, Mongoose)"],
            iconName: "Database"
        },
        {
            id: 10,
            title: "Version Control",
            subtitle: "Team Collaboration",
            description: "Learn Git and GitHub to work on large codebases in professional teams.",
            details: ["Git Flow / Branching", "Pull Requests & Reviews", "GitHub Actions (CI/CD)"],
            iconName: "GitBranch"
        },
        {
            id: 11,
            title: "Professional Standards",
            subtitle: "Quality Code",
            description: "Write clean, testable, and maintainable code that lasts in production.",
            details: ["Unit & Integration Testing", "CLEAN Architecture", "SOLID Principles", "Agile/Scrum"],
            iconName: "Briefcase"
        },
        {
            id: 12,
            title: "Cloud & Infrastructure",
            subtitle: "Modern Deployment",
            description: "Learn to ship your code to millions of users using cloud platforms.",
            details: ["AWS / Azure / GCP", "Docker Containers", "Kubernetes (K8s)", "Serverless Functions"],
            iconName: "Cloud"
        },
        {
            id: 13,
            title: "Specialized Tracks",
            subtitle: "Expertise selection",
            description: "Carve out your niche based on your interests and industry demand.",
            details: ["AI / Machine Learning", "Mobile (Flutter/React Native)", "Cybersecurity", "Blockchain"],
            iconName: "Box"
        },
        {
            id: 14,
            title: "Soft Skills & Career",
            subtitle: "The Human Element",
            description: "Communication, teamwork, and networking are as important as coding.",
            details: ["Resume Building", "LinkedIn Networking", "Tech Writing", "Team Leadership"],
            iconName: "Users"
        },
        {
            id: 15,
            title: "The Ultimate Goal",
            subtitle: "Senior Architect",
            description: "The path to becoming a leader who designs world-scale distributed systems.",
            details: ["Scalability Strategies", "Distributed Systems", "Tech Mentorship", "Lifelong Learning"],
            iconName: "Stars"
        }
    ]
};
