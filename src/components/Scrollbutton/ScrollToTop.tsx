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
        <div className="fixed bottom-[52px] sm:bottom-[47px] right-4 sm:right-[45px] z-[9999]">
            {isVisible && (
                <button
                    type="button"
                    onClick={scrollToTop}
                    onTouchStart={scrollToTop}
                    className="p-2 bg-indigo-600/80 hover:bg-indigo-700 text-white rounded-lg shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-center group border border-indigo-400/20 backdrop-blur-sm"
                    aria-label="Scroll to top"
                >
                    <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
