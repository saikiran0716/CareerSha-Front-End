import { RoadmapData } from "../types";

export const blockchainDeveloperData: RoadmapData = {
    id: "blockchain-developer",
    title: "Blockchain Developer",
    subtitle: "Decentralized Architect",
    description: "Develop smart contracts and decentralized applications (DApps).",
    iconName: "Link",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    steps: [
        {
            id: 1,
            title: "Foundational Schooling",
            subtitle: "Class 10-12",
            description: "Strong grasp of Mathematics and Computer Science.",
            details: ["Mathematics (Cryptography focus)", "Computer Science", "Economics basics"],
            iconName: "GraduationCap"
        },
        {
            id: 2,
            title: "Undergraduate Degree",
            subtitle: "CS / Math",
            description: "B.Tech/BCA with strong algorithm focus.",
            details: ["Algorithms", "Distributed Systems", "Cryptography"],
            iconName: "School"
        },
        {
            id: 3,
            title: "Web 2.0 Basics",
            subtitle: "Full Stack",
            description: "Understanding standard web development before Web3.",
            details: ["JavaScript / TypeScript", "React / Next.js", "Node.js (Backend)"],
            iconName: "Globe"
        },
        {
            id: 4,
            title: "Blockchain Fundamentals",
            subtitle: "Theory",
            description: "How decentralized ledgers work.",
            details: ["P2P Networks", "Consensus Mechanisms (PoW/PoS)", "Hashing / Merkle Trees"],
            iconName: "Database"
        },
        {
            id: 5,
            title: "Smart Contracts",
            subtitle: "The Logic",
            description: "Writing code that runs on the blockchain.",
            details: ["Solidity (Ethereum)", "Rust (Solana/Polkadot)", "Remix IDE / Hardhat"],
            iconName: "FileCode"
        },
        {
            id: 6,
            title: "Web3 Integration",
            subtitle: "Frontend Connection",
            description: "Connecting websites to the blockchain.",
            details: ["Ethers.js / Web3.js", "Wagmi / RainbowKit", "Wallet Connection"],
            iconName: "Link"
        },
        {
            id: 7,
            title: "Testing & Security",
            subtitle: "Auditing",
            description: "Ensuring smart contracts are hack-proof.",
            details: ["Unit Testing (Chai/Mocha)", "Security Audits", "Gas Optimization"],
            iconName: "ShieldCheck"
        },
        {
            id: 8,
            title: "DeFi & NFTs",
            subtitle: "Use Cases",
            description: "Building financial and asset applications.",
            details: ["ERC-20 / ERC-721 Standards", "AMM / DEX logic", "Staking / Yield Farming"],
            iconName: "DollarSign"
        },
        {
            id: 9,
            title: "Layer 2 Solutions",
            subtitle: "Scaling",
            description: "Working with faster, cheaper chains.",
            details: ["Polygon / Arbitrum", "Rollups", "Sidechains"],
            iconName: "Layers"
        },
        {
            id: 10,
            title: "Blockchain Architecture",
            subtitle: "System Design",
            description: "Designing complex decentralized systems.",
            details: ["Oracles (Chainlink)", "Graph Protocol (Indexing)", "Cross-chain Bridges"],
            iconName: "Cpu"
        },
        {
            id: 11,
            title: "Career Growth",
            subtitle: "Protocol Dev",
            description: "Contributing to core blockchain protocols.",
            details: ["Core Dev (Geth)", "Research & Implementation", "DAO Governance"],
            iconName: "Briefcase"
        }
    ]
};
