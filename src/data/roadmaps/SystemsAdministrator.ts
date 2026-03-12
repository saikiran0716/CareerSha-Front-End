import { RoadmapData } from "../types";

export const systemsAdministratorData: RoadmapData = {
    id: "systems-administrator",
    title: "Systems Administrator",
    subtitle: "Infrastructure Keeper",
    description: "Install, configure, and maintain computer systems and servers.",
    iconName: "Server",
    color: "text-slate-600",
    bg: "bg-slate-50 dark:bg-slate-800/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Computer basics and logic.",
            details: ["Hardware Components", "Networking Basics", "Math"]
        },
        {
            id: 2,
            title: "IT Degree / Certification",
            subtitle: "Credentials",
            description: "A degree in IT/CS or strong industry certifications.",
            details: ["BCA / B.Sc IT", "CompTIA A+", "CompTIA Network+"]
        },
        {
            id: 3,
            title: "Hardware & Networking",
            subtitle: "The Physical Layer",
            description: "Understand servers, cables, switches, and storage.",
            details: ["Server Hardware", "RAID Configurations", "TCP/IP & DNS"]
        },
        {
            id: 4,
            title: "Operating Systems",
            subtitle: "Windows & Linux",
            description: "Master the OS environments you will manage.",
            details: ["Windows Server", "Linux (Ubuntu/RHEL)", "Command Line Mastery"]
        },
        {
            id: 5,
            title: "User Management",
            subtitle: "Identity",
            description: "Manage who has access to what.",
            details: ["Active Directory", "LDAP", "Group Policy (GPO)"]
        },
        {
            id: 6,
            title: "Scripting & Automation",
            subtitle: "Efficiency",
            description: "Stop doing things manually.",
            details: ["PowerShell (Windows)", "Bash (Linux)", "Python"]
        },
        {
            id: 7,
            title: "Virtualization",
            subtitle: "VMs",
            description: "Running multiple OS instances on one hardware.",
            details: ["VMware vSphere", "Hyper-V", "KVM"]
        },
        {
            id: 8,
            title: "Web Servers",
            subtitle: "Hosting",
            description: "Deploy and manage web applications.",
            details: ["Apache / Nginx", "IIS", "SSL/TLS Certificates"]
        },
        {
            id: 9,
            title: "Storage & Backup",
            subtitle: "Data Integrity",
            description: "Managing storage networks and backup solutions.",
            details: ["NAS / SAN", "Backup Strategies", "Disaster Recovery"]
        },
        {
            id: 10,
            title: "Monitoring",
            subtitle: "Observability",
            description: "Keep an eye on system health.",
            details: ["Nagios / Zabbix", "Log Management", "Uptime Monitoring"]
        },
        {
            id: 11,
            title: "Security Fundamentals",
            subtitle: "Hardening",
            description: "Basic security practices for sysadmins.",
            details: ["Firewall Configuration", "Patch Management", "Access Control Lists"]
        },
        {
            id: 12,
            title: "Cloud Administration",
            subtitle: "Hybrid IT",
            description: "Extending on-prem infrastructure to the cloud.",
            details: ["AWS / Azure Basics", "Office 365 Admin", "Hybrid Cloud"]
        },
        {
            id: 13,
            title: "Containerization",
            subtitle: "Modern Ops",
            description: "Introduction to modern application capabilities.",
            details: ["Docker Basics", "Kubernetes Administration", "Container Registries"]
        },
        {
            id: 14,
            title: "DevOps Transition",
            subtitle: "Career Growth",
            description: "Moving from SysAdmin to DevOps.",
            details: ["CI/CD Pipelines", "Infrastructure as Code", "GitOps"]
        },
        {
            id: 15,
            title: "IT Manager",
            subtitle: "Leadership",
            description: "Managing a team of admins and IT strategy.",
            details: ["Budgeting", "Vendor Management", "IT Strategy"]
        }
    ]
};
