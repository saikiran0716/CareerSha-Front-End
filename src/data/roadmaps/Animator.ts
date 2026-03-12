import { RoadmapData } from "../types";

export const animatorData: RoadmapData = {
    id: "animator",
    title: "Animator",
    subtitle: "Bringing Static to Life",
    description: "Create movement and emotion in characters and environments for movies, games, and web.",
    iconName: "Film",
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Fine Arts or Science stream.",
            details: ["Drawing & Sketching", "Physics (for mechanics)", "Computer Science"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Des / BFA",
            description: "Degree in Animation, Graphic Design, or Fine Arts.",
            details: ["Visual Arts", "Digital Media", "Character Design"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Art Fundamentals",
            subtitle: "The Basics",
            description: "Before moving pixels, master paper and pencil.",
            details: ["Anatomy & Proportion", "Perspective & Composition", "Color Theory"],
            iconName: "PenTool"
        },
        {
            id: 4,
            title: "12 Principles",
            subtitle: "Animation Bible",
            description: "Master the core rules of animation defined by Disney.",
            details: ["Squash & Stretch", "Timing & Spacing", "Anticipation"],
            iconName: "Book"
        },
        {
            id: 5,
            title: "2D Animation",
            subtitle: "Traditional & Digital",
            description: "Create frame-by-frame or rigged 2D animations.",
            details: ["Adobe Animate", "Toon Boom Harmony", "After Effects"],
            iconName: "Layers"
        },
        {
            id: 6,
            title: "3D Modeling",
            subtitle: "Sculpting",
            description: "Create 3D assets and environments.",
            details: ["Blender (Open Source)", "Autodesk Maya (Industry Standard)", "ZBrush (Sculpting)"],
            iconName: "Box"
        },
        {
            id: 7,
            title: "Rigging",
            subtitle: "Skeleton",
            description: "Build the internal structure that allows models to move.",
            details: ["Bones & Joints", "Inverse Kinematics (IK)", "Skinning / Weight Painting"],
            iconName: "Move"
        },
        {
            id: 8,
            title: "3D Animation",
            subtitle: "Performance",
            description: "Animate characters and objects in 3D space.",
            details: ["Keyframe Animation", "Graph Editor", "Acting for Animators"],
            iconName: "Activity"
        },
        {
            id: 9,
            title: "Rendering & Compositing",
            subtitle: "Final Look",
            description: "Process the scenes into final video output.",
            details: ["Lighting & Shading", "Render Engines (Cycles/Arnold)", "Nuke / After Effects"],
            iconName: "Sun"
        },
        {
            id: 10,
            title: "Portfolio",
            subtitle: "Demo Reel",
            description: "Showcase your best 1-2 minutes of work.",
            details: ["Showreel Editing", "ArtStation Profile", "Network with Studios"],
            iconName: "Award"
        }
    ]
};
