import { RoadmapData } from "../types";

export const embeddedDeveloperData: RoadmapData = {
    id: "embedded-developer",
    title: "Embedded Systems Developer",
    subtitle: "Hardware & Software Integration",
    description: "Design and program the brains inside everyday devices, from cars to smart home gadgets.",
    iconName: "Cpu",
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    steps: [
        {
            id: 1,
            title: "Higher Secondary",
            subtitle: "Class 11-12",
            description: "Build a strong foundation in Physics and Mathematics.",
            details: ["Physics (Electricity & Magnetism)", "Mathematics (Calculus)", "Computer Science Basics"],
            iconName: "BookOpen"
        },
        {
            id: 2,
            title: "Bachelor's Degree",
            subtitle: "B.Tech / B.E.",
            description: "Pursue Electronics & Communication (ECE) or Electrical Engineering (EEE).",
            details: ["Digital Electronics", "Microprocessors", "Signals & Systems"],
            iconName: "GraduationCap"
        },
        {
            id: 3,
            title: "Programming Foundations",
            subtitle: "C & C++",
            description: "Master the languages used to talk directly to hardware.",
            details: ["Pointers & Memory Management", "Data Structures", "Bitwise Operations"],
            iconName: "Code"
        },
        {
            id: 4,
            title: "Basic Electronics",
            subtitle: "Circuits",
            description: "Understand how hardware components work together.",
            details: ["Resistors, Capacitors, transistors", "Reading Schematics", "Soldering Basics"],
            iconName: "Zap"
        },
        {
            id: 5,
            title: "Microcontrollers",
            subtitle: "MCU Programming",
            description: "Learn to program simple chips like Arduino or 8051.",
            details: ["GPIO (Inputs/Outputs)", "Interrupts", "Timers & Counters"],
            iconName: "Cpu"
        },
        {
            id: 6,
            title: "Communication Protocols",
            subtitle: "Data Transfer",
            description: "How chips talk to each other.",
            details: ["UART / USART", "I2C & SPI", "CAN Bus (Automotive)"],
            iconName: "Share2"
        },
        {
            id: 7,
            title: "Advanced Microcontrollers",
            subtitle: "ARM Cortex",
            description: "Work with powerful 32-bit processors like STM32.",
            details: ["ARM Architecture", "Direct Memory Access (DMA)", "Low Power Modes"],
            iconName: "Settings"
        },
        {
            id: 8,
            title: "Real-Time Operating Systems",
            subtitle: "RTOS",
            description: "Manage complex tasks with strict timing requirements.",
            details: ["FreeRTOS", "Task Scheduling", "Semaphores & Mutexes"],
            iconName: "Clock"
        },
        {
            id: 9,
            title: "Embedded Linux",
            subtitle: "OS on Hardware",
            description: "Run full operating systems on embedded devices (e.g., Raspberry Pi).",
            details: ["Linux Kernel Basics", "Device Drivers", "Yocto / Buildroot"],
            iconName: "Terminal"
        },
        {
            id: 10,
            title: "IoT & Networking",
            subtitle: "Connectivity",
            description: "Connect devices to the internet.",
            details: ["MQTT / CoAP", "Wi-Fi & Bluetooth (BLE)", "Edge Computing"],
            iconName: "Wifi"
        },
        {
            id: 11,
            title: "Testing & Debugging",
            subtitle: "Validation",
            description: "Ensure hardware and software work reliably.",
            details: ["JTAG / SWD Debugging", "Oscilloscopes & Logic Analyzers", "Unit Testing"],
            iconName: "CheckCircle"
        },
        {
            id: 12,
            title: "Project Portfolio",
            subtitle: "Build & Showcase",
            description: "Create real-world devices.",
            details: ["Smart Weather Station", "Autonomous Robot", "Home Automation System"],
            iconName: "Briefcase"
        }
    ]
};
