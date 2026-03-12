import { RoadmapData } from "../types";

export const gameDeveloperData: RoadmapData = {
    id: "game-developer",
    title: "Game Developer",
    subtitle: "Virtual World Builder",
    description: "Create immersive gaming experiences using Unity or Unreal Engine.",
    iconName: "Gamepad2",
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Mathematics and Physics are key for Game Dev.",
            details: ["Mathematics (Geometry/Trig)", "Physics (Mechanics)", "Computer Science"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "CS / Game Design",
            description: "B.Tech CS or specialized Game Design degrees.",
            details: ["Computer Graphics", "Linear Algebra", "Software Engineering"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Programming Core",
            subtitle: "C++ / C#",
            description: "Mastering the languages of game engines.",
            details: ["C++ (Unreal Engine)", "C# (Unity)", "Python (Scripting)"],
            iconName: "Terminal"
        },
        {
            id: 4,
            title: "Game Engines",
            subtitle: "The Workshop",
            description: "Learning the tools to build worlds.",
            details: ["Unity", "Unreal Engine", "Godot"],
            iconName: "Box"
        },
        {
            id: 5,
            title: "Game Physics",
            subtitle: "Simulation",
            description: "Making things move realistically.",
            details: ["Collision Detection", "Rigid Body Dynamics", "Ragdoll Physics"],
            iconName: "Move"
        },
        {
            id: 6,
            title: "Graphics & Shaders",
            subtitle: "Visuals",
            description: "Rendering beautiful scenes.",
            details: ["OpenGL / DirectX / Vulcan", "Shader Graph / HLSL", "Lighting & Textures"],
            iconName: "Eye"
        },
        {
            id: 7,
            title: "Game AI",
            subtitle: "NPC Logic",
            description: "Giving intelligence to game characters.",
            details: ["Pathfinding (A*)", "State Machines", "Behavior Trees"],
            iconName: "Bot"
        },
        {
            id: 8,
            title: "Multiplayer Networking",
            subtitle: "Connectivity",
            description: "Building shared online experiences.",
            details: ["Client-Server Architecture", "Replication", "Lag Compensation"],
            iconName: "Network"
        },
        {
            id: 9,
            title: "Audio & UI",
            subtitle: "Immersion",
            description: "Completing the player experience.",
            details: ["Spatial Audio (FMOD/Wwise)", "HUD / UI Systems", "Input Handling"],
            iconName: "Volume2"
        },
        {
            id: 10,
            title: "Optimization",
            subtitle: "Performance",
            description: "Making games run smoothly on all hardware.",
            details: ["Memory Management", "Profiling Tools", "LOD (Level of Detail)"],
            iconName: "Zap"
        },
        {
            id: 11,
            title: "Publishing",
            subtitle: "Distribution",
            description: "Getting your game to players.",
            details: ["Steam / Epic Store", "Console Certification", "Mobile Stores"],
            iconName: "Upload"
        },
        {
            id: 12,
            title: "Career Track",
            subtitle: "Senior Roles",
            description: "Specializing in Tech Art, Engine Dev, or Gameplay.",
            details: ["Technical Director", "Engine Architect", "Lead Gameplay Programmer"],
            iconName: "Briefcase"
        }
    ]
};
