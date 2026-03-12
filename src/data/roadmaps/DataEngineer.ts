import { RoadmapData } from "../types";

export const dataEngineerData: RoadmapData = {
    id: "data-engineer",
    title: "Data Engineer",
    subtitle: "Pipeline Architect",
    description: "Design and build systems for collecting, storing, and analyzing data at scale.",
    iconName: "Database",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Mathematics and Computer Science basics.",
            details: ["Algebra", "Statistics", "Programming logic"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "CS / IT",
            description: "B.Tech in CS or IT.",
            details: ["Database Systems", "Data Structures", "Operating Systems"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Programming",
            subtitle: "Python / Java / Scala",
            description: "Languages for data processing.",
            details: ["Python (Pandas)", "Java", "Scala (Spark)"],
            iconName: "Terminal"
        },
        {
            id: 4,
            title: "SQL Mastery",
            subtitle: "The Core",
            description: "Advanced querying and optimization.",
            details: ["Complex Joins", "Window Functions", "Query Tuning"],
            iconName: "Database"
        },
        {
            id: 5,
            title: "Data Warehousing",
            subtitle: "Storage",
            description: "Storing data for analytics.",
            details: ["Snowflake", "BigQuery", "Redshift"],
            iconName: "Server"
        },
        {
            id: 6,
            title: "ETL / ELT",
            subtitle: "Pipelines",
            description: "Moving and transforming data.",
            details: ["Apache Airflow", "dbt (Data Build Tool)", "Luigi"],
            iconName: "GitMerge"
        },
        {
            id: 7,
            title: "Big Data Frameworks",
            subtitle: "Distributed Processing",
            description: "Handling petabytes of data.",
            details: ["Apache Spark", "Hadoop Ecosystem", "Hive / Presto"],
            iconName: "Grid"
        },
        {
            id: 8,
            title: "Streaming Data",
            subtitle: "Real-time",
            description: "Processing data as it arrives.",
            details: ["Apache Kafka", "AWS Kinesis", "Flink"],
            iconName: "Activity"
        },
        {
            id: 9,
            title: "NoSQL Databases",
            subtitle: "Unstructured Data",
            description: "Handling non-relational data.",
            details: ["MongoDB", "Cassandra", "DynamoDB"],
            iconName: "FileText"
        },
        {
            id: 10,
            title: "Cloud Data Engineering",
            subtitle: "Platform",
            description: "Building on the cloud.",
            details: ["AWS Glue", "Azure Data Factory", "GCP Dataflow"],
            iconName: "Cloud"
        },
        {
            id: 11,
            title: "Data Governance",
            subtitle: "Quality & Security",
            description: "Ensuring data is accurate and safe.",
            details: ["Data Catalogs", "GDPR/CCPA Compliance", "Data Lineage"],
            iconName: "Shield"
        },
        {
            id: 12,
            title: "Career Path",
            subtitle: "Architect",
            description: "Designing enterprise data platforms.",
            details: ["Data Architect", "Analytics Engineer", "Head of Data"],
            iconName: "Briefcase"
        }
    ]
};
