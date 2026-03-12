export interface CarouselItem {
    id: number;
    title: string;
    image: string;
    link: string; // Internal link ID or external URL
    description: string;
}

export const carouselData: CarouselItem[] = [
    {
        id: 1,
        title: "ENGINEERING",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
        link: "colleges",
        description: "Innovate the future with top engineering institutes. Explore IITs, NITs, and premier technical campuses.",
    },
    {
        id: 2,
        title: "MEDICAL",
        image: "https://images.unsplash.com/photo-1538108197017-c1b99a37ad11?q=80&w=2070&auto=format&fit=crop",
        link: "exams",
        description: "Your journey to becoming a healthcare hero starts here. Discover top AIIMS and medical colleges.",
    },
    {
        id: 3,
        title: "MBA",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
        link: "library",
        description: "Master the art of leadership. Connect with premier IIMs and global business schools.",
    },
    {
        id: 4,
        title: "DESIGN",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
        link: "predictor",
        description: "Shape the world with your creativity. Explore NID, NIFT, and leading design studios.",
    },
    {
        id: 5,
        title: "RESEARCH",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070&auto=format&fit=crop",
        link: "results",
        description: "Push the boundaries of knowledge. Find advanced research programs and scientific domains.",
    }
];
