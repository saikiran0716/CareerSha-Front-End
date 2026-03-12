import { RoadmapData } from "../types";

export const cloudArchitectData: RoadmapData = {
    id: "cloud-architect",
    title: "Cloud Architect",
    subtitle: "Cloud Infrastructure Expert",
    description: "Design and manage scalable cloud computing strategies.",
    iconName: "Cloud",
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Strong base in Computers and Mathematics.",
            details: ["Computer Science", "Mathematics", "Logical Thinking"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "B.Tech / BCA",
            description: "Degree in CS/IT or related field.",
            details: ["Computer Architecture", "Networking", "Database Systems"],
            iconName: "School"
        },
        {
            id: 3,
            title: "IT Fundamentals",
            subtitle: "SysAdmin",
            description: "Understanding traditional IT infrastructure.",
            details: ["Linux Administration", "Virtualization (VMware)", "Networking Basics"],
            iconName: "Server"
        },
        {
            id: 4,
            title: "Cloud Basics",
            subtitle: "Introduction",
            description: "Understanding Cloud Computing models.",
            details: ["IaaS, PaaS, SaaS", "Public vs Private Cloud", "High Availability"],
            iconName: "CloudSun"
        },
        {
            id: 5,
            title: "AWS / Azure / GCP",
            subtitle: "Platform Mastery",
            description: "Deep dive into one major provider.",
            details: ["EC2 / VM", "S3 / Blob Storage", "IAM / Active Directory"],
            iconName: "CloudLightning"
        },
        {
            id: 6,
            title: "Networking in Cloud",
            subtitle: "VPC & DNS",
            description: "Designing secure and efficient cloud networks.",
            details: ["VPC Peering", "Load Balancers", "Direct Connect/ExpressRoute"],
            iconName: "Network"
        },
        {
            id: 7,
            title: "Database Services",
            subtitle: "Manage Data",
            description: "Choosing the right DB for the job.",
            details: ["RDS / SQL Azure", "DynamoDB / CosmosDB", "Redshift / Synapse"],
            iconName: "Database"
        },
        {
            id: 8,
            title: "Infrastructure as Code",
            subtitle: "Automation",
            description: "Provisioning infrastructure via code.",
            details: ["Terraform", "CloudFormation / ARM", "Ansible"],
            iconName: "Code"
        },
        {
            id: 9,
            title: "Containers & Orchestration",
            subtitle: "Modern Apps",
            description: "Running microservices at scale.",
            details: ["Docker", "Kubernetes (K8s)", "EKS / AKS / GKE"],
            iconName: "Box"
        },
        {
            id: 10,
            title: "Serverless Computing",
            subtitle: "Function as a Service",
            description: "Building event-driven architectures.",
            details: ["AWS Lambda", "Azure Functions", "API Gateway"],
            iconName: "Zap"
        },
        {
            id: 11,
            title: "Security & Compliance",
            subtitle: "Governance",
            description: "Ensuring cloud environments are secure.",
            details: ["Identity Management", "Encryption", "Compliance Standards"],
            iconName: "Shield"
        },
        {
            id: 12,
            title: "Solution Architecture",
            subtitle: "Design Patterns",
            description: "Designing robust, scalable, and cost-effective systems.",
            details: ["Well-Architected Framework", "Disaster Recovery", "Cost Optimization"],
            iconName: "Layout"
        }
    ]
};
