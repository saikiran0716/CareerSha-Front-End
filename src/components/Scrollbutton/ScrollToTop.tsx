import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled up to given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top coordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-[100px] sm:bottom-[110px] right-[21px] sm:right-[50px] z-[9999]">
            {isVisible && (
                <button
                    type="button"
                    onClick={scrollToTop}
                    onTouchStart={scrollToTop}
                    className="w-10 h-10 bg-indigo-600/90 hover:bg-indigo-700 text-white rounded-full shadow-[0_4px_12px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_16px_rgba(79,70,229,0.4)] transition-all duration-300 active:scale-90 flex items-center justify-center group border border-white/20 backdrop-blur-md"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
