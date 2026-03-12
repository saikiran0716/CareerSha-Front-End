import { RoadmapData } from "../types";

export const dataScientistData: RoadmapData = {
    id: "data-scientist",
    title: "Data Scientist",
    subtitle: "Insight Explorer",
    description: "Use mathematical and statistical techniques to extract value from data.",
    iconName: "Database",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10",
            description: "Build strong analytical and mathematical reasoning skills.",
            details: ["Mathematics Focus", "Logic Puzzles", "Computer Basics"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Higher Secondary",
            subtitle: "Streams selection",
            description: "Opt for Science stream with Mathematics and Statistics.",
            details: ["Class 11-12 (PCM/Statistics)", "Intro to Programming", "Probability Basics"],
            iconName: "BookOpen"
        },
        {
            id: 3,
            title: "Undergraduate Degree",
            subtitle: "B.Tech / B.Sc",
            description: "Pursue a degree in CS, Statistics, or Mathematics.",
            details: ["Computer Science", "Statistics Major", "Applied Mathematics"],
            iconName: "School"
        },
        {
            id: 4,
            title: "Math Foundation",
            subtitle: "Statistics & Calculus",
            description: "Strong grasp of mathematics is crucial for data analysis.",
            details: ["Linear Algebra", "Probability Theory", "Multivariate Calculus"],
            iconName: "Sigma"
        },
        {
            id: 5,
            title: "Coding & Tools",
            subtitle: "Python & R",
            description: "Learn to manipulate data using popular libraries.",
            details: ["Python (Pandas, Numpy)", "SQL for Databases", "Data Visualization"],
            iconName: "Code"
        },
        {
            id: 6,
            title: "Data Wrangling",
            subtitle: "Cleaning & Prep",
            description: "Master the art of cleaning messy data for analysis.",
            details: ["Missing Value Imputation", "Feature Engineering", "Data Normalization"],
            iconName: "Filter"
        },
        {
            id: 7,
            title: "Machine Learning",
            subtitle: "Predictive Modeling",
            description: "Build models that learn from historical data.",
            details: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
            iconName: "BrainCircuit"
        },
        {
            id: 8,
            title: "Deep Learning",
            subtitle: "Neural Networks",
            description: "Dive into complex models for unstructured data.",
            details: ["TensorFlow / PyTorch", "CNNs (Vision)", "RNNs/Transformers (NLP)"],
            iconName: "Network"
        },
        {
            id: 9,
            title: "Big Data Tech",
            subtitle: "Scale & Speed",
            description: "Handle massive datasets efficiently.",
            details: ["Spark / Hadoop", "Distributed Computing", "NoSQL Databases"],
            iconName: "Server"
        },
        {
            id: 10,
            title: "MLOps",
            subtitle: "Production AI",
            description: "Deploy and maintain models in production environments.",
            details: ["Model Deployment", "Monitoring", "CI/CD for ML"],
            iconName: "Settings"
        },
        {
            id: 11,
            title: "Data Visualization",
            subtitle: "Storytelling",
            description: "Communicate insights effectively to stakeholders.",
            details: ["Tableau / PowerBI", "D3.js", "Dashboard Design"],
            iconName: "PieChart"
        },
        {
            id: 12,
            title: "Domain Knowledge",
            subtitle: "Contextual application",
            description: "Apply data science to specific industries (Finance, Health, etc.).",
            details: ["FinTech", "HealthTech", "Marketing Analytics"],
            iconName: "Briefcase"
        },
        {
            id: 13,
            title: "Soft Skills",
            subtitle: "Communication",
            description: "Translate technical findings into business value.",
            details: ["Presenting to Leadership", "Tech Writing", "Critical Thinking"],
            iconName: "Users"
        }
    ]
};
