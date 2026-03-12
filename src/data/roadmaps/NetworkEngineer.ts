import { RoadmapData } from "../types";

export const networkEngineerData: RoadmapData = {
    id: "network-engineer",
    title: "Network Engineer",
    subtitle: "Connectivity Expert",
    description: "Design and manage the digital nervous system of organizations.",
    iconName: "Search",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Physics and Computers.",
            details: ["Physics (Electronics)", "Computer Science", "Mathematics"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "B.Tech / BCA",
            description: "Degree in CS, IT, or ECE.",
            details: ["Computer Networks", "Digital Communications", "Operating Systems"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Networking Basics",
            subtitle: "CCNA Level",
            description: "Core networking concepts.",
            details: ["OSI Model", "TCP/IP", "IP Addressing & Subnetting"],
            iconName: "Network"
        },
        {
            id: 4,
            title: "Routing & Switching",
            subtitle: "Traffic Control",
            description: "Moving data efficiently.",
            details: ["VLANs", "STP (Spanning Tree)", "OSPF / EIGRP"],
            iconName: "Shuffle"
        },
        {
            id: 5,
            title: "Network Security",
            subtitle: "Defense",
            description: "Securing the perimeter.",
            details: ["ACLs", "Firewalls (ASA/Palo Alto)", "VPNs"],
            iconName: "Shield"
        },
        {
            id: 6,
            title: "Wireless Networking",
            subtitle: "WiFi",
            description: "Designing wireless LANs.",
            details: ["802.11 Standards", "WPA3 Security", "Site Surveys"],
            iconName: "Wifi"
        },
        {
            id: 7,
            title: "WAN Technologies",
            subtitle: "Long Distance",
            description: "Connecting branch offices.",
            details: ["MPLS", "SD-WAN", "Leased Lines"],
            iconName: "Globe"
        },
        {
            id: 8,
            title: "Network Automation",
            subtitle: "Python / Ansible",
            description: "Programmable networks.",
            details: ["Python (Netmiko/Nornir)", "Ansible Playbooks", "REST APIs"],
            iconName: "Code"
        },
        {
            id: 9,
            title: "Cloud Networking",
            subtitle: "Hybrid Cloud",
            description: "Networking in AWS/Azure.",
            details: ["Direct Connect", "VPC Peering", "Transit Gateway"],
            iconName: "Cloud"
        },
        {
            id: 10,
            title: "Certifications",
            subtitle: "Professional",
            description: "Proving your skills.",
            details: ["CCNP Enterprise", "JNCIA", "AWS Adv. Networking"],
            iconName: "Award"
        },
        {
            id: 11,
            title: "Monitoring & T-Shoot",
            subtitle: "Operations",
            description: "Keeping the network up.",
            details: ["Wireshark", "SolarWinds", "SNMP"],
            iconName: "Activity"
        },
        {
            id: 12,
            title: "Career Path",
            subtitle: "Architect",
            description: "Designing global networks.",
            details: ["Network Architect", "CCIE", "Start a ISP/WISP"],
            iconName: "Briefcase"
        }
    ]
};
