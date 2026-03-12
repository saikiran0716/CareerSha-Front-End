import { RoadmapData } from "../types";

export const automationEngineerData: RoadmapData = {
    id: "automation-engineer",
    title: "QA Automation Engineer",
    subtitle: "Quality Assurance & Testing",
    description: "Ensure software quality by writing code that tests other code automatically.",
    iconName: "Settings", // Or CheckCircle
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Build logical reasoning and basic computer skills.",
            details: ["Mathematics", "Computer Science", "English Communication"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / BCA",
            description: "Degree in Computer Science or IT.",
            details: ["Software Engineering", "Database Systems", "Programming Basics"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Manual Testing",
            subtitle: "The Foundation",
            description: "Understand how to find bugs and document them.",
            details: ["SDLC & STLC", "Test Cases & Scenarios", "Bug Reporting (JIRA)"],
            iconName: "ClipboardList"
        },
        {
            id: 4,
            title: "Programming Basics",
            subtitle: "Python or Java",
            description: "Learn a language to write automation scripts.",
            details: ["Variables & Loops", "Functions & OOP", "File Handling"],
            iconName: "Code"
        },
        {
            id: 5,
            title: "Web Automation",
            subtitle: "Selenium / Playwright",
            description: "Automate browser interactions.",
            details: ["Locators (XPath/CSS)", "Waits & Synchronization", "Page Object Model (POM)"],
            iconName: "Globe"
        },
        {
            id: 6,
            title: "API Testing",
            subtitle: "Postman / RestAssured",
            description: "Test the backend logic directly.",
            details: ["HTTP Methods", "Status Codes", "JSON Validation"],
            iconName: "Server"
        },
        {
            id: 7,
            title: "Test Frameworks",
            subtitle: "Structure",
            description: "Organize your tests efficiently.",
            details: ["TestNG / JUnit (Java)", "PyTest (Python)", "Reporting (Allure)"],
            iconName: "Layers"
        },
        {
            id: 8,
            title: "CI/CD Integration",
            subtitle: "DevOps Basics",
            description: "Run tests automatically when code changes.",
            details: ["Jenkins / GitHub Actions", "Pipeline Configuration", "Docker for Testing"],
            iconName: "Repeat"
        },
        {
            id: 9,
            title: "Version Control",
            subtitle: "Git",
            description: "Manage your test code just like developers.",
            details: ["Branching & Merging", "Pull Requests", "Code Review"],
            iconName: "GitBranch"
        },
        {
            id: 10,
            title: "Mobile Automation",
            subtitle: "Appium",
            description: "Test Android and iOS applications.",
            details: ["Appium Inspector", "Native vs Hybrid Apps", "Device Farm Integration"],
            iconName: "Smartphone"
        },
        {
            id: 11,
            title: "Performance Testing",
            subtitle: "Load & Stress",
            description: "Check how the system handles heavy traffic.",
            details: ["JMeter", "K6", "Locust"],
            iconName: "Activity"
        },
        {
            id: 12,
            title: "Career Path",
            subtitle: "Growth",
            description: "Move towards leadership or specialized roles.",
            details: ["SDET (Software Development Engineer in Test)", "QA Lead", "DevOps Engineer"],
            iconName: "TrendingUp"
        }
    ]
};
