export interface CarouselItem {
    id: number;
    title: string;
    subtitle?: string;
    image: string;
    link: string; // Internal link ID or external URL
    description: string;
    buttonText?: string;
}

export const carouselData: CarouselItem[] = [
    {
        id: 1,
        title: "ENGINEERING",
        subtitle: "Featured Stream",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
        link: "predictor",
        description: "Innovate the future with top engineering institutes. Explore IITs, NITs, and premier technical campuses.",
        buttonText: "Explore Colleges",
    },
    {
        id: 2,
        title: "MEDICAL",
        subtitle: "Featured Stream",
        image: "https://images.unsplash.com/photo-1538108197017-c1b99a37ad11?q=80&w=2070&auto=format&fit=crop",
        link: "rank",
        description: "Your journey to becoming a healthcare hero starts here. Discover top AIIMS and medical colleges.",
        buttonText: "Estimate Rank",
    },
    {
        id: 3,
        title: "MBA",
        subtitle: "Featured Stream",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        link: "library",
        description: "Master the art of leadership. Connect with premier IIMs and global business schools.",
        buttonText: "View Roadmaps",
    },
    {
        id: 4,
        title: "DESIGN",
        subtitle: "Featured Stream",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
        link: "predictor",
        description: "Shape the world with your creativity. Explore NID, NIFT, and leading design studios.",
        buttonText: "Find Matches",
    },
    {
        id: 5,
        title: "RESEARCH",
        subtitle: "Featured Stream",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop",
        link: "results",
        description: "Push the boundaries of knowledge. Find advanced research programs and scientific domains.",
        buttonText: "Explore Insights",
    }
];
