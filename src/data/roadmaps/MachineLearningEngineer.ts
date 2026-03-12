import { RoadmapData } from '../types';

export const machineLearningEngineerData: RoadmapData = {
    id: "machine-learning-engineer",
    title: "ML Engineer",
    subtitle: "Model Deployment",
    description: "Build and deploy machine learning models to production.",
    iconName: "Brain",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Advanced Mathematics (Calculus & Stats) is key.",
            details: ["Advanced Math", "Physics", "Computer Science"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / B.Sc",
            description: "Focus on AI, Math, or Computer Science.",
            details: ["Artificial Intelligence", "Linear Algebra & Calculus", "Algorithms"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Foundations",
            subtitle: "Python & Math",
            description: "Strong coding skills and mathematical understanding.",
            details: ["Linear Algebra", "Calculus", "Python (Pandas, Scikit-learn)"],
            iconName: "FunctionSquare"
        },
        {
            id: 4,
            title: "Deep Learning",
            subtitle: "Neural Networks",
            description: "Build complex models for vision and NLP.",
            details: ["TensorFlow / PyTorch", "CNNs & RNNs", "Transformers"],
            iconName: "Cpu"
        },
        {
            id: 5,
            title: "MLOps",
            subtitle: "Deployment",
            description: "Deploy and monitor models in production.",
            details: ["Model Serving", "Pipeline Automation", "Model Monitoring"],
            iconName: "Settings"
        }
    ]
};
