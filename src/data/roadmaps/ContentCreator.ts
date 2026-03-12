import { RoadmapData } from "../types";

export const contentCreatorData: RoadmapData = {
    id: "content-creator",
    title: "Content Creator",
    subtitle: "Digital Storyteller",
    description: "Create engaging videos, blogs, and social media content to build an audience and brand.",
    iconName: "Video",
    color: "text-red-500",
    bg: "bg-red-50 dark:bg-red-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Arts, Humanities, or Media Studies is ideal.",
            details: ["Communication Skills", "Literature & Writing", "Creative Arts"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "BJMC / BA",
            description: "Journalism, Mass Communication, or Film Studies.",
            details: ["Media Ethics", "Video Production Basics", "Digital Marketing"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Niche Selection",
            subtitle: "Find Your Voice",
            description: "Decide what you want to talk about.",
            details: ["Tech / Gaming", "Lifestyle / Vlogging", "Education / Tutorials"],
            iconName: "Target"
        },
        {
            id: 4,
            title: "Scripting & Storytelling",
            subtitle: "The Hook",
            description: "Learn to write compelling scripts that keep people watching.",
            details: ["Story Arcs", "Hook-Body-CTA Structure", "Copywriting"],
            iconName: "Edit3"
        },
        {
            id: 5,
            title: "Video Production",
            subtitle: "Filming",
            description: "Master the gear and techniques for high-quality video.",
            details: ["Camera Basics (ISO, Aperture)", "Lighting Techniques", "Audio Recording"],
            iconName: "Camera"
        },
        {
            id: 6,
            title: "Video Editing",
            subtitle: "Post-Production",
            description: "Turn raw footage into a polished story.",
            details: ["Adobe Premiere Pro / DaVinci Resolve", "CapCut (Mobile)", "Color Grading"],
            iconName: "Scissors"
        },
        {
            id: 7,
            title: "Graphic Design",
            subtitle: "Thumbnails & Branding",
            description: "Create visual assets that get clicks.",
            details: ["Canva / Photoshop", "Thumbnail Psychology", "Channel Branding"],
            iconName: "Image"
        },
        {
            id: 8,
            title: "SEO & Analytics",
            subtitle: "Growth",
            description: "Understand how algorithms work.",
            details: ["Keyword Research", "Audience Retention", "CTR Analysis"],
            iconName: "BarChart2"
        },
        {
            id: 9,
            title: "Distribution",
            subtitle: "Platforms",
            description: "Master the nuances of each platform.",
            details: ["YouTube (Long-form)", "Instagram Reels / TikTok", "LinkedIn / Twitter"],
            iconName: "Share2"
        },
        {
            id: 10,
            title: "Monetization",
            subtitle: "Revenue Streams",
            description: "Turn your audience into a business.",
            details: ["AdSense", "Brand Deals & Sponsorships", "Merchandise / Digital Products"],
            iconName: "DollarSign"
        }
    ]
};
