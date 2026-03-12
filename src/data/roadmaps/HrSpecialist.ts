import { RoadmapData } from "../types";

export const hrSpecialistData: RoadmapData = {
    id: "hr-specialist",
    title: "HR Specialist",
    subtitle: "People Champion",
    description: "Manage recruitment, employee relations, and organizational culture.",
    iconName: "Users",
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Humanities or Commerce focusing on Psychology/Business.",
            details: ["Psychology", "Business Studies", "Communication"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "BBA / BA",
            description: "Bachelor's in Human Resources, Psychology, or Management.",
            details: ["Human Resource Management", "Industrial Psychology", "Labor Laws"],
            iconName: "School"
        },
        {
            id: 3,
            title: "MBA / Masters",
            subtitle: "Specialization",
            description: "Advanced degree for career acceleration.",
            details: ["MBA in HR", "Master's in Org. Dev.", "Labour Welfare"],
            iconName: "Award"
        },
        {
            id: 4,
            title: "Recruitment (TA)",
            subtitle: "Hiring",
            description: "Finding the right talent.",
            details: ["Sourcing Strategies", "Interviewing Skills", "Applicant Tracking Systems (ATS)"],
            iconName: "UserPlus"
        },
        {
            id: 5,
            title: "Onboarding & Training",
            subtitle: "L&D",
            description: "Helping employees succeed.",
            details: ["Orientation Programs", "Skill Gap Analysis", "Training Delivery"],
            iconName: "BookOpen"
        },
        {
            id: 6,
            title: "Performance Mgmt",
            subtitle: "Appraisals",
            description: "Managing employee growth.",
            details: ["KPIs & KRAs", "360 Feedback", "Performance Reviews"],
            iconName: "TrendingUp"
        },
        {
            id: 7,
            title: "Compensation & Benefits",
            subtitle: "Rewards",
            description: "Managing salaries and perks.",
            details: ["Payroll Management", "Salary Benchmarking", "Employee Benefits"],
            iconName: "DollarSign"
        },
        {
            id: 8,
            title: "Employee Relations",
            subtitle: "Engagement",
            description: "Keeping the workforce happy.",
            details: ["Conflict Resolution", "Employee Engagement", "Grievance Handling"],
            iconName: "Heart"
        },
        {
            id: 9,
            title: "HR Analytics",
            subtitle: "Data Driven",
            description: "Using data to make people decisions.",
            details: ["Attrition Analysis", "Engagement Metrics", "Workforce Planning"],
            iconName: "BarChart"
        },
        {
            id: 10,
            title: "HR Software",
            subtitle: "HRIS",
            description: "Tools of the trade.",
            details: ["Workday", "BambooHR", "SAP SuccessFactors"],
            iconName: "Monitor"
        },
        {
            id: 11,
            title: "Labor Law & Compliance",
            subtitle: "Legal",
            description: "Staying within the law.",
            details: ["Employment Contracts", "Labor Codes", "Workplace Safety"],
            iconName: "Shield"
        },
        {
            id: 12,
            title: "Career Leadership",
            subtitle: "CHRO Path",
            description: "Leading the people function.",
            details: ["HR Business Partner", "Director of HR", "Chief Human Resources Officer"],
            iconName: "Briefcase"
        }
    ]
};
