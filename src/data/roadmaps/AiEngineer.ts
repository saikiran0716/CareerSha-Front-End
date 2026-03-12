import { RoadmapData } from "../types";

export const aiEngineerData: RoadmapData = {
    id: "ai-engineer",
    title: "AI Engineer",
    subtitle: "Intelligence Builder",
    description: "Build AI-powered products using Large Language Models.",
    iconName: "Cpu",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
    steps: [
        {
            id: 1,
            title: "Schooling Foundation",
            subtitle: "Class 10-12",
            description: "Strong focus on Mathematics (Calculus, Probability) and Computer Science.",
            details: ["Advanced Mathematics", "Computer Science", "Physics"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "CS / Math / Stats",
            description: "Undergraduate degree in a quantitative field.",
            details: ["Computer Science", "Data Science", "Mathematics"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Programming Mastery",
            subtitle: "Python",
            description: "Master Python strategies for data manipulation.",
            details: ["Python (Advanced)", "C++ for Performance", "Software Design Patterns"],
            iconName: "Terminal"
        },
        {
            id: 4,
            title: "Data Science Core",
            subtitle: "Analysis",
            description: "Understanding data processing and analysis.",
            details: ["Pandas / NumPy", "Exploratory Data Analysis", "Data Visualization"],
            iconName: "Database"
        },
        {
            id: 5,
            title: "Machine Learning",
            subtitle: "Algorithms",
            description: "The engine of AI.",
            details: ["Regression / Classification", "Clustering", "Scikit-Learn"],
            iconName: "BrainCircuit"
        },
        {
            id: 6,
            title: "Deep Learning",
            subtitle: "Neural Nets",
            description: "Advanced AI models mimicking the human brain.",
            details: ["Neural Networks", "Backpropagation", "TensorFlow / PyTorch"],
            iconName: "Network"
        },
        {
            id: 7,
            title: "NLP & Vision",
            subtitle: "Domains",
            description: "Specializing in text or image processing.",
            details: ["Transformers (BERT, GPT)", "Computer Vision (YOLO, ResNet)", "Audio Processing"],
            iconName: "Eye"
        },
        {
            id: 8,
            title: "LLM Engineering",
            subtitle: "GenAI",
            description: "Building with Large Language Models.",
            details: ["Prompt Engineering", "RAG (Retrieval Augmented Generation)", "Fine-tuning (PEFT/LoRA)"],
            iconName: "Sparkles"
        },
        {
            id: 9,
            title: "AI Deployment",
            subtitle: "Production",
            description: "Serving models to millions of users.",
            details: ["FastAPI / Flask", "Dockerization", "Model Quantization"],
            iconName: "Server"
        },
        {
            id: 10,
            title: "AI Ethics & Safety",
            subtitle: "Responsibility",
            description: "Ensuring AI is safe, fair, and unbiased.",
            details: ["Bias Mitigation", "AI Safety", "Legal Compliance"],
            iconName: "Shield"
        },
        {
            id: 11,
            title: "Research & Innovation",
            subtitle: "Cutting Edge",
            description: "Staying updated with the latest papers.",
            details: ["Reading ArXiv Papers", "Implementing Papers", "Contributing to Open Source"],
            iconName: "BookOpen"
        },
        {
            id: 12,
            title: "Lead AI Engineer",
            subtitle: "Leadership",
            description: "Architecting AI systems and leading teams.",
            details: ["System Architecture", "Team Mentorship", "AI Strategy"],
            iconName: "Briefcase"
        }
    ]
};
