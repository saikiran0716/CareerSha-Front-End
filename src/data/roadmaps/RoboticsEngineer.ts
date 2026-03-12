import { RoadmapData } from "../types";

export const roboticsEngineerData: RoadmapData = {
    id: "robotics-engineer",
    title: "Robotics Engineer",
    subtitle: "Automation Architect",
    description: "Design and build autonomous machines that interact with the physical world.",
    iconName: "Cpu",
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Strong focus on Physics and Mathematics is essential.",
            details: ["PCM (Physics, Chemistry, Math)", "Mechanics", "Electricity & Magnetism"]
        },
        {
            id: 2,
            title: "Entrance Exams",
            subtitle: "Engineering Entry",
            description: "Clear exams to get into top technical institutes.",
            details: ["JEE Main/Advanced", "Bitsat", "State CETs"]
        },
        {
            id: 3,
            title: "Undergraduate Degree",
            subtitle: "B.Tech / B.E.",
            description: "Pursue Mechatronics, Mechanical, Electronics, or CS Engineering.",
            details: ["Mechatronics Engineering", "Electronics (ECE)", "Computer Science"]
        },
        {
            id: 4,
            title: "Core Electronics",
            subtitle: "Circuits & Sensors",
            description: "Understand how to power and sense the environment.",
            details: ["Circuit Analysis", "Sensors (Lidar, Ultrasonic)", "Actuators & Motors"]
        },
        {
            id: 5,
            title: "Microcontrollers",
            subtitle: "The Brains",
            description: "Learn to program the chips that control robots.",
            details: ["Arduino / ESP32", "Raspberry Pi", "Embedded C"]
        },
        {
            id: 6,
            title: "Robotics Fundamentals",
            subtitle: "Math & Physics",
            description: "Master the physics of robotic movement.",
            details: ["Kinematics (Forward/Inverse)", "Dynamics", "Linear Algebra"]
        },
        {
            id: 7,
            title: "Programming",
            subtitle: "Code Control",
            description: "Software engineering skills for hardware.",
            details: ["C++ (High Performance)", "Python (Scripting/AI)", "MATLAB"]
        },
        {
            id: 8,
            title: "Robot Operating System",
            subtitle: "ROS / ROS 2",
            description: "The standard middleware for robotic software development.",
            details: ["Nodes & Topics", "Services & Actions", "Navigation Stack"]
        },
        {
            id: 9,
            title: "Control Systems",
            subtitle: "Stability",
            description: "Ensure robots move smoothly and accurately.",
            details: ["PID Controllers", "Feedback Loops", "State Estimation (Kalman)"]
        },
        {
            id: 10,
            title: "AI & Computer Vision",
            subtitle: "Perception",
            description: "Give robots the ability to see and understand.",
            details: ["OpenCV", "Object Detection (YOLO)", "SLAM (Localization)"]
        },
        {
            id: 11,
            title: "Simulation",
            subtitle: "Virtual Testing",
            description: "Test robots in virtual worlds before building them.",
            details: ["Gazebo", "V-REP / CoppeliaSim", "Isaac Sim (NVIDIA)"]
        },
        {
            id: 12,
            title: "Advanced Robotics",
            subtitle: "Next Gen",
            description: "Dive into specialized fields.",
            details: ["Humanoid Robotics", "Swarm Robotics", "Soft Robotics"]
        },
        {
            id: 13,
            title: "Project Portfolio",
            subtitle: "Build Stuff",
            description: "Hands-on experience is the most important qualification.",
            details: ["Line Follower / Arm", "Autonomous Drone", "Self-Driving Car Proto"]
        },
        {
            id: 14,
            title: "Higher Education",
            subtitle: "Masters / PhD",
            description: "Often required for top R&D roles in robotics.",
            details: ["M.S. in Robotics", "PhD Research", "Academic Papers"]
        },
        {
            id: 15,
            title: "Professional Career",
            subtitle: "Industry Roles",
            description: "Work in automation, automotive, or space industries.",
            details: ["Robotics Software Engineer", "Control Systems Engineer", "R&D Scientist"]
        }
    ]
};
