import { RoadmapData } from "../types";

export const videoEditorData: RoadmapData = {
    id: "video-editor",
    title: "Video Editor",
    subtitle: "Storyteller",
    description: "Assemble footage to create compelling visual narratives for film, TV, and web.",
    iconName: "Video",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    steps: [
        {
            id: 1,
            title: "Film Appreciation",
            subtitle: "Schooling",
            description: "Understanding visual storytelling.",
            details: ["Cinema History", "Photography Basics", "Visual Arts"]
        },
        {
            id: 2,
            title: "Degree / Diploma",
            subtitle: "Film School",
            description: "Formal education in media production.",
            details: ["B.Sc Visual Comm", "Film Production Diploma", "Mass Communication"]
        },
        {
            id: 3,
            title: "Editing Theory",
            subtitle: "The Cuts",
            description: "Why and when to cut.",
            details: ["The Kuleshov Effect", "Pacing & Rhythm", "Continuity Editing"]
        },
        {
            id: 4,
            title: "NLE Software",
            subtitle: "The Tools",
            description: "Mastering Non-Linear Editing systems.",
            details: ["Adobe Premiere Pro", "Final Cut Pro X", "DaVinci Resolve"]
        },
        {
            id: 5,
            title: "Color Grading",
            subtitle: "Mood",
            description: "Enhancing the look and feel of footage.",
            details: ["Color Correction", "Color Grading (S-Log/RAW)", "LUTs"]
        },
        {
            id: 6,
            title: "Audio Mixing",
            subtitle: "Soundscapes",
            description: "Bad audio kills good video.",
            details: ["Sound Design", "Audio Syncing", "Noise Reduction"]
        },
        {
            id: 7,
            title: "Motion Graphics",
            subtitle: "FX",
            description: "Adding titles and visual effects.",
            details: ["Adobe After Effects", "Keyframe Animation", "Compositing"]
        },
        {
            id: 8,
            title: "Codecs & Formats",
            subtitle: "Technical",
            description: "Understanding file types and compression.",
            details: ["H.264 / H.265", "Bitrates & Containers", "Proxies"]
        },
        {
            id: 9,
            title: "Collaborative Workflow",
            subtitle: "Teamwork",
            description: "Working with directors and other editors.",
            details: ["Project Organization", "Review Platforms (Frame.io)", "Version Control"]
        },
        {
            id: 10,
            title: "Specialization",
            subtitle: "Niche",
            description: "Choosing a path.",
            details: ["Narrative (Film/TV)", "Commercial", "YouTuber/Social"]
        },
        {
            id: 11,
            title: "Storytelling",
            subtitle: "Advanced",
            description: "Crafting the narrative arc.",
            details: ["Script Analysis", "Emotional Editing", "Documentary Style"]
        },
        {
            id: 12,
            title: "Portfolio",
            subtitle: "Reel",
            description: "A showreel to get clients.",
            details: ["Editing Reel", "Client Projects", "Short Films"]
        },
        {
            id: 13,
            title: "Industry Standards",
            subtitle: "Pro",
            description: "Broadcast standards and deliverables.",
            details: ["QC (Quality Control)", "Broadcast Specs", "DCP (Digital Cinema Package)"]
        },
        {
            id: 14,
            title: "Freelance",
            subtitle: "Business",
            description: "Running your own editing business.",
            details: ["Finding Clients", "Rates & Invoicing", "Networking"]
        },
        {
            id: 15,
            title: "Post-Production Supervisor",
            subtitle: "Lead",
            description: "Managing the entire post-production process.",
            details: ["Scheduling", "Budgeting", "Team Management"]
        }
    ]
};
