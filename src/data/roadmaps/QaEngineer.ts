import { RoadmapData } from "../types";

export const qaEngineerData: RoadmapData = {
    id: "qa-engineer",
    title: "QA Engineer",
    subtitle: "Quality Champion",
    description: "Ensure software reliability through manual and automated testing.",
    iconName: "Target",
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Computer Science and Analytical thinking.",
            details: ["Logical Reasoning", "Computer Basics", "Attention to Detail"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "CS / IT",
            description: "B.Tech/BCA provides technical context.",
            details: ["Software Engineering", "Programming Basics", "DBMS"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Software Testing Basics",
            subtitle: "Manual Testing",
            description: "Understanding the testing lifecycle.",
            details: ["STLC & SDLC", "Test Cases & Plans", "Bug Life Cycle"],
            iconName: "ClipboardCheck"
        },
        {
            id: 4,
            title: "Types of Testing",
            subtitle: "Methodologies",
            description: "Different ways to break software.",
            details: ["Black box vs White box", "Regression Testing", "Functional Testing"],
            iconName: "List"
        },
        {
            id: 5,
            title: "SQL for Testers",
            subtitle: "Database Testing",
            description: "Verifying data integrity.",
            details: ["Basic Queries", "Joins", "Data Validation"],
            iconName: "Database"
        },
        {
            id: 6,
            title: "Java / Python",
            subtitle: "Coding",
            description: "Programming language for automation.",
            details: ["Core Java", "Python Scripting", "OOP Concepts"],
            iconName: "Terminal"
        },
        {
            id: 7,
            title: "Web Automation",
            subtitle: "Selenium",
            description: "Automating browser interactions.",
            details: ["Selenium WebDriver", "TestNG / JUnit", "Page Object Model"],
            iconName: "Globe"
        },
        {
            id: 8,
            title: "Modern Frameworks",
            subtitle: "Cypress / Playwright",
            description: "Faster, more reliable testing.",
            details: ["Cypress", "Playwright", "Debugging Flaky Tests"],
            iconName: "Zap"
        },
        {
            id: 9,
            title: "API Testing",
            subtitle: "Postman",
            description: "Testing backend services directly.",
            details: ["Postman / Newman", "Rest Assured", "JSON Schema Validation"],
            iconName: "Server"
        },
        {
            id: 10,
            title: "Performance Testing",
            subtitle: "Load Testing",
            description: "Testing system under stress.",
            details: ["JMeter", "K6", "Stress Testing"],
            iconName: "Activity"
        },
        {
            id: 11,
            title: "CI/CD Integration",
            subtitle: "DevOps",
            description: "Running tests in the pipeline.",
            details: ["Jenkins Integration", "GitHub Actions", "Docker for Testing"],
            iconName: "RefreshCcw"
        },
        {
            id: 12,
            title: "Career Path",
            subtitle: "SDET",
            description: "Software Development Engineer in Test.",
            details: ["Test Architect", "QA Manager", "Release Manager"],
            iconName: "Briefcase"
        }
    ]
};
