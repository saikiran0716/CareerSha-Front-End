import { RoadmapData } from '../types';

export const cloudNativeData: RoadmapData = {
    id: "cloud-native",
    title: "Cloud Native Dev",
    subtitle: "Scalable Systems",
    description: "Build and run scalable applications in modern, dynamic environments.",
    iconName: "Cloud",
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Develop strong problem-solving and mathematical skills.",
            details: ["Physics & Math", "Computer Science", "Logical Reasoning"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech (CS/IT)",
            description: "Foundational knowledge in OS and Networks.",
            details: ["Operating Systems (Linux)", "Computer Networks", "Distributed Systems"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Containerization",
            subtitle: "Docker",
            description: "Package applications with their dependencies.",
            details: ["Images & Containers", "Docker Compose", "Multi-stage Builds"],
            iconName: "Box"
        },
        {
            id: 4,
            title: "Orchestration",
            subtitle: "Kubernetes",
            description: "Automate deployment and scaling of containers.",
            details: ["Pods & Services", "Deployments", "Helm Charts"],
            iconName: "Settings"
        },
        {
            id: 5,
            title: "Microservices",
            subtitle: "Architecture",
            description: "Design systems as loosely coupled services.",
            details: ["Service Mesh", "gRPC", "Distributed Tracing"],
            iconName: "Share2"
        }
    ]
};
