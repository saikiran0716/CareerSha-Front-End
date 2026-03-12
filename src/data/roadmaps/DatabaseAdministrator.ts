import { RoadmapData } from "../types";

export const databaseAdministratorData: RoadmapData = {
    id: "database-administrator",
    title: "Database Administrator",
    subtitle: "Data Guardian",
    description: "Manage, secure, and optimize data storage systems for organizations.",
    iconName: "Database",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Computer Science or Information Practices basics.",
            details: ["CS Basics", "Logic & Sets", "Mathematics"]
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "CS / IT",
            description: "Get a degree in Computer Science or Information Technology.",
            details: ["B.Tech / BCA", "Data Structures", "Operating Systems"]
        },
        {
            id: 3,
            title: "SQL Mastery",
            subtitle: "Query Language",
            description: "The universal language of databases.",
            details: ["SELECT, INSERT, UPDATE", "Joins & Subqueries", "Normalization"]
        },
        {
            id: 4,
            title: "RDBMS Concepts",
            subtitle: "Relational Theory",
            description: "Understand how relational databases work internally.",
            details: ["ACID Properties", "Transactions", "Indexing"]
        },
        {
            id: 5,
            title: "Administration Basics",
            subtitle: "Managing Services",
            description: "Learn to install, configure, and manage a database server.",
            details: ["User Management", "Permissions (GRANT/REVOKE)", "Configuration Tuning"]
        },
        {
            id: 6,
            title: "Platform Specialization",
            subtitle: "Pick One",
            description: "Become an expert in one major DB technology.",
            details: ["PostgreSQL / MySQL", "Oracle Database", "Microsoft SQL Server"]
        },
        {
            id: 7,
            title: "Backup & Recovery",
            subtitle: "Disaster Proofing",
            description: "Ensure data is never lost, no matter what happens.",
            details: ["Full/Differential Backups", "Point-in-time Recovery", "Replication"]
        },
        {
            id: 8,
            title: "Performance Tuning",
            subtitle: "Optimization",
            description: "Make queries run fast and efficiently.",
            details: ["Query Execution Plans", "Index Optimization", "Caching Strategies"]
        },
        {
            id: 9,
            title: "NoSQL Databases",
            subtitle: "Modern Data",
            description: "Understand non-relational data stores.",
            details: ["MongoDB (Document)", "Redis (Key-Value)", "Cassandra (Wide-Column)"]
        },
        {
            id: 10,
            title: "Cloud Databases",
            subtitle: "DBaaS",
            description: "Manage managed database services in the cloud.",
            details: ["AWS RDS / Aurora", "Google Cloud SQL", "Azure SQL Database"]
        },
        {
            id: 11,
            title: "High Availability",
            subtitle: "Always On",
            description: "Design systems that never go down.",
            details: ["Clustering", "Sharding", "Failover Strategies"]
        },
        {
            id: 12,
            title: "Security & Compliance",
            subtitle: "Data Protection",
            description: "Secure data against breaches and ensure legal compliance.",
            details: ["Encryption at Rest/Transit", "Auditing", "GDPR/HIPAA"]
        },
        {
            id: 13,
            title: "Automation",
            subtitle: "Scripting",
            description: "Automate routine DBA tasks.",
            details: ["Python / Bash Scripting", "Ansible / Terraform", "Monitoring Implementation"]
        },
        {
            id: 14,
            title: "Big Data",
            subtitle: "Scale Out",
            description: "Handling massive datasets.",
            details: ["Data Warehousing", "ETL Pipelines", "Snowflake / BigQuery"]
        },
        {
            id: 15,
            title: "Lead DBA / Architect",
            subtitle: "Senior Role",
            description: "Design the entire data architecture for an organization.",
            details: ["Capacity Planning", "Data Strategy", "Team Leadership"]
        }
    ]
};
