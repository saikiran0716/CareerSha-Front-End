import { RoadmapData } from "../types";

export const cyberSecurityData: RoadmapData = {
    id: "cyber-security",
    title: "Cyber Security",
    subtitle: "Digital Shield",
    description: "Protect systems, networks, and data from digital attacks.",
    iconName: "ShieldCheck",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Focus on Computer Science and Mathematics.",
            details: ["Computer Basics", "Logical Reasoning", "Mathematics"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "B.Tech / BCA",
            description: "Pursue Computer Science or IT.",
            details: ["Computer Networks", "Operating Systems", "Programming Basics"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Networking Basics",
            subtitle: "The Foundation",
            description: "Deep understanding of how data travels.",
            details: ["TCP/IP Model", "OSI Model", "DNS/DHCP", "Subnetting"],
            iconName: "Network"
        },
        {
            id: 4,
            title: "Linux & Scripting",
            subtitle: "OS Mastery",
            description: "Master the command line and scripting languages.",
            details: ["Linux Administration", "Bash Scripting", "Python for Security"],
            iconName: "Terminal"
        },
        {
            id: 5,
            title: "Security Fundamentals",
            subtitle: "CIA Triad",
            description: "Core principles of information security.",
            details: ["Confidentiality", "Integrity", "Availability", "Authentication"],
            iconName: "Shield"
        },
        {
            id: 6,
            title: "Network Security",
            subtitle: "Defense",
            description: "Protecting the network infrastructure.",
            details: ["Firewalls", "IDS/IPS", "VPNs", "Wireshark"],
            iconName: "Lock"
        },
        {
            id: 7,
            title: "Web Security",
            subtitle: "OWASP Top 10",
            description: "Securing web applications from common vulnerabilities.",
            details: ["SQL Injection", "XSS", "CSRF", "Burp Suite"],
            iconName: "Globe"
        },
        {
            id: 8,
            title: "Cryptography",
            subtitle: "Encryption",
            description: "Securing data at rest and in transit.",
            details: ["Symmetric/Asymmetric Encryption", "Hashing", "PKI"],
            iconName: "Key"
        },
        {
            id: 9,
            title: "Ethical Hacking",
            subtitle: "Red Teaming",
            description: "Thinking like an attacker to find weaknesses.",
            details: ["Penetration Testing", "Metasploit", "Social Engineering"],
            iconName: "Skull"
        },
        {
            id: 10,
            title: "Certifications",
            subtitle: "Validation",
            description: "Industry-recognized credentials.",
            details: ["CompTIA Security+", "CEH", "CISSP", "OSCP"],
            iconName: "Award"
        },
        {
            id: 11,
            title: "Cloud Security",
            subtitle: "Modern Sec",
            description: "Securing cloud environments.",
            details: ["AWS Security", "Azure Sentinel", "Container Security"],
            iconName: "Cloud"
        },
        {
            id: 12,
            title: "Career Path",
            subtitle: "Specialization",
            description: "Choosing a specific role in the industry.",
            details: ["SOC Analyst", "Penetration Tester", "CISO"],
            iconName: "Briefcase"
        }
    ]
};
