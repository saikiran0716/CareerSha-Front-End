import { RoadmapData } from "../types";

export const devOpsEngineerData: RoadmapData = {
    id: "devops-engineer",
    title: "DevOps Engineer",
    subtitle: "The Pipeline Master",
    description: "Automate software delivery and maintain scalable infrastructure.",
    iconName: "RefreshCcw",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Basics of Computer Science and Logic.",
            details: ["Computer Science", "Mathematics", "Problem Solving"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "CS / IT",
            description: "B.Tech in CS or IT for strong technical base.",
            details: ["Operating Systems", "Networking", "Programming (Python/Go)"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Linux & Scripting",
            subtitle: "The Core",
            description: "Mastering the server environment.",
            details: ["Bash Scripting", "Linux Administration", "Python Automation"],
            iconName: "Terminal"
        },
        {
            id: 4,
            title: "Networking",
            subtitle: "Connectivity",
            description: "How servers talk to each other.",
            details: ["DNS / HTTP / SSL", "Load Balancing (Nginx)", "Firewalls"],
            iconName: "Network"
        },
        {
            id: 5,
            title: "Version Control",
            subtitle: "Git",
            description: "Managing code changes.",
            details: ["Git / GitHub / GitLab", "Branch strategies", "Pull Requests"],
            iconName: "GitBranch"
        },
        {
            id: 6,
            title: "Cloud Providers",
            subtitle: "Infrastructure",
            description: "Managing resources on the cloud.",
            details: ["AWS / Azure / GCP", "IAM & Security", "VPC & Networking"],
            iconName: "Cloud"
        },
        {
            id: 7,
            title: "CI/CD Pipelines",
            subtitle: "Automation",
            description: "Building and deploying code automatically.",
            details: ["Jenkins", "GitHub Actions", "GitLab CI"],
            iconName: "Repeat"
        },
        {
            id: 8,
            title: "Containers",
            subtitle: "Docker",
            description: "Packaging applications for consistency.",
            details: ["Dockerfiles", "Docker Compose", "Image Optimization"],
            iconName: "Box"
        },
        {
            id: 9,
            title: "Orchestration",
            subtitle: "Kubernetes",
            description: "Managing containers at scale.",
            details: ["K8s Architecture", "Helm Charts", "Service Mesh (Istio)"],
            iconName: "Grid"
        },
        {
            id: 10,
            title: "IaC",
            subtitle: "Terraform",
            description: "Infrastructure as Code.",
            details: ["Terraform Modules", "State Management", "Ansible (Config Mgmt)"],
            iconName: "Code"
        },
        {
            id: 11,
            title: "Monitoring",
            subtitle: "Observability",
            description: "Keeping systems healthy.",
            details: ["Prometheus / Grafana", "ELK Stack (Logging)", "Datadog"],
            iconName: "Activity"
        },
        {
            id: 12,
            title: "SRE Practices",
            subtitle: "Reliability",
            description: "Site Reliability Engineering principles.",
            details: ["SLO / SLA / SLI", "Incident Management", "Capacity Planning"],
            iconName: "Shield"
        }
    ]
};
