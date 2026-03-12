import { RoadmapData } from "../types";

export const mobileAppDeveloperData: RoadmapData = {
    id: "mobile-app-developer",
    title: "Mobile App Developer",
    subtitle: "Pocket-Sized Solutions",
    description: "Build applications for iOS and Android platforms using modern frameworks.",
    iconName: "Smartphone",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Focus on Computer Science and Creative Logic.",
            details: ["Computer Programming", "Mathematics", "Logic & Design"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "CS / IT",
            description: "B.Tech or BCA providing strong programming fundamentals.",
            details: ["Object Oriented Programming", "Data Structures", "Software Engineering"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Programming Basics",
            subtitle: "Core Languages",
            description: "Java/Kotlin for Android or Swift for iOS.",
            details: ["Java / Kotlin", "Swift", "JavaScript / TypeScript"],
            iconName: "Terminal"
        },
        {
            id: 4,
            title: "Choose Path",
            subtitle: "Native vs Cross-Platform",
            description: "Decide between specialized or universal development.",
            details: ["Native (Android/iOS)", "Cross-Platform (Flutter/React Native)"],
            iconName: "Split"
        },
        {
            id: 5,
            title: "UI/UX For Mobile",
            subtitle: "Design",
            description: "Mobile-first design principles.",
            details: ["Material Design", "Human Interface Guidelines", "Responsive Layouts"],
            iconName: "Layout"
        },
        {
            id: 6,
            title: "Framework Mastery",
            subtitle: "The Tools",
            description: "Deep dive into your chosen framework.",
            details: ["React Native / Flutter", "Android SDK", "iOS UIKit / SwiftUI"],
            iconName: "Code"
        },
        {
            id: 7,
            title: "Local Data Storage",
            subtitle: "Persistence",
            description: "Saving data on the device.",
            details: ["SQLite / Room", "Core Data / Realm", "Shared Preferences"],
            iconName: "Database"
        },
        {
            id: 8,
            title: "API Integration",
            subtitle: "Connectivity",
            description: "Fetching data from the web.",
            details: ["REST APIs", "GraphQL", "Networking Libraries (Retrofit/Alamofire)"],
            iconName: "Globe"
        },
        {
            id: 9,
            title: "State Management",
            subtitle: "Data Flow",
            description: "Managing app state efficiently.",
            details: ["Redux / Context (RN)", "Provider / Riverpod (Flutter)", "MVVM / Bloc"],
            iconName: "Activity"
        },
        {
            id: 10,
            title: "App Lifecycle",
            subtitle: "Publishing",
            description: "Deploying to App Stores.",
            details: ["Google Play Store", "Apple App Store", "CI/CD for Mobile"],
            iconName: "Upload"
        },
        {
            id: 11,
            title: "Advanced Features",
            subtitle: "Native Capabilities",
            description: "Using device hardware.",
            details: ["Camera & GPS", "Push Notifications", "Bluetooth / NFC"],
            iconName: "Smartphone"
        },
        {
            id: 12,
            title: "Career & Leadership",
            subtitle: "Senior Dev",
            description: "Leading mobile teams and architecting complex apps.",
            details: ["System Architecture", "Performance Optimization", "Team Leadership"],
            iconName: "Briefcase"
        }
    ]
};
