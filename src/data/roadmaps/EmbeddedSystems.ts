import { RoadmapData } from "../types";

export const embeddedSystemsData: RoadmapData = {
    id: "embedded-systems",
    title: "Embedded Systems",
    subtitle: "Hardware-Software Bridge",
    description: "Program microcontrollers and hardware devices for IoT and robotics.",
    iconName: "Cpu",
    color: "text-cyan-600",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Strong Physics and Mathematics background.",
            details: ["Physics (Electronics)", "Mathematics", "Computer Science"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "ECE / EEE / CS",
            description: "Electronics or Computer Engineering degree.",
            details: ["Digital Electronics", "Microprocessors", "Circuit Theory"],
            iconName: "School"
        },
        {
            id: 3,
            title: "C & C++ Programming",
            subtitle: "Low Level",
            description: "Mastering memory management and pointers.",
            details: ["Pointers & Memory", "Data Structures in C", "Bitwise Operations"],
            iconName: "Terminal"
        },
        {
            id: 4,
            title: "Microcontrollers",
            subtitle: "Recall Hardware",
            description: "Programming chips to control devices.",
            details: ["Arduino (AVR)", "STM32 (ARM Cortex)", "ESP32 (WiFi/BLE)"],
            iconName: "Chip"
        },
        {
            id: 5,
            title: "Computer Architecture",
            subtitle: "Under the hood",
            description: "How CPUs work.",
            details: ["RISC vs CISC", "Registers", "Assembly Language"],
            iconName: "Cpu"
        },
        {
            id: 6,
            title: "Embedded Protocols",
            subtitle: "Communication",
            description: "Talking between devices.",
            details: ["UART / SPI / I2C", "CAN Bus (Automotive)", "MQTT (IoT)"],
            iconName: "Share2"
        },
        {
            id: 7,
            title: "RTOS",
            subtitle: "Real-Time OS",
            description: "Managing tasks with strict timing constraints.",
            details: ["FreeRTOS", "Thread Management", "Inter-process Communication"],
            iconName: "Clock"
        },
        {
            id: 8,
            title: "Embedded Linux",
            subtitle: "Advanced OS",
            description: "Running Linux on embedded devices.",
            details: ["Yocto Project", "Kernel Drivers", "Bootloaders (U-Boot)"],
            iconName: "Monitor"
        },
        {
            id: 9,
            title: "PCB Design",
            subtitle: "Hardware Design",
            description: "Creating custom circuit boards.",
            details: ["KiCad / Altium", "Schematic Capture", "PCB Layout"],
            iconName: "Layers"
        },
        {
            id: 10,
            title: "IoT & Wireless",
            subtitle: "Connectivity",
            description: "Connecting devices to the internet.",
            details: ["WiFi / Bluetooth BLE", "LoRaWAN / Zigbee", "Network Stacks"],
            iconName: "Wifi"
        },
        {
            id: 11,
            title: "Testing & Debugging",
            subtitle: "Validation",
            description: "Ensuring hardware reliability.",
            details: ["Oscilloscopes", "Logic Analyzers", "JTAG Debugging"],
            iconName: "Activity"
        },
        {
            id: 12,
            title: "Career specialization",
            subtitle: "Industry",
            description: "Choosing a domain like Automotive, Medical, or Consumer.",
            details: ["Automotive (AUTOSAR)", "Medical Devices", "Robotics"],
            iconName: "Briefcase"
        }
    ]
};
