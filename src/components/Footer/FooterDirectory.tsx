import React from 'react';
import { footerNavigation } from './footerNavigation';

interface FooterDirectoryProps {
    onNavigate?: (pageId: string) => void;
}

const FooterDirectory: React.FC<FooterDirectoryProps> = ({ onNavigate }) => {
    const [openSection, setOpenSection] = React.useState<string | null>(null);

    const toggleSection = (title: string) => {
        setOpenSection(openSection === title ? null : title);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-4 md:gap-y-12 md:mb-8 mb-2">
                {footerNavigation.map((category, index) => {
                    const isOpen = openSection === category.title;
                    const isLast = index === footerNavigation.length - 1;
                    return (
                        <div key={category.title} className={`${!isLast ? 'border-b border-gray-800' : ''} md:border-none pb-4 md:pb-0`}>
                            <button
                                onClick={() => toggleSection(category.title)}
                                className="w-full flex items-center justify-between md:cursor-default md:pointer-events-none group py-2 md:py-0"
                            >
                                <h4 className="text-white font-bold uppercase tracking-widest md:mb-6 md:pb-2 md:border-b md:border-gray-800 text-xs">
                                    {category.title}
                                </h4>
                                <span className={`md:hidden transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </button>
                            
                            <ul className={`space-y-3 mt-2 md:mt-0 md:block transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 md:max-h-none opacity-0 md:opacity-100'}`}>
                                {category.links.map((link, idx) => {
                                    return (
                                        <li key={idx}>
                                            <button
                                                onClick={() => onNavigate?.(link.url)}
                                                className="text-gray-400 hover:text-white transition-colors text-xs text-left w-full font-medium py-1 md:py-0"
                                            >
                                                {link.name}
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>

            {/* City Explorer */}
            <div className="md:mb-8 mb-4 md:pt-6 pt-2 border-t border-gray-800">
                <h4 className="text-white font-bold uppercase tracking-widest md:mb-6 mb-4 text-sm">Explore Colleges By City</h4>
                <div className="flex flex-wrap gap-x-5 gap-y-3 text-gray-500 text-sm">
                    {['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Chandigarh', 'Coimbatore', 'Nagpur', 'Noida', 'Gurgaon'].map(city => {
                        const cityPath = `/city/${city.toLowerCase().replace(' ', '-')}`;
                        return (
                            <button
                                key={city}
                                onClick={() => onNavigate?.(cityPath)}
                                className="hover:text-white transition-colors border-b border-transparent hover:border-indigo-500 pb-0.5"
                            >
                                {city}
                            </button>
                        );
                    })}
                    <button className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">View All Cities &rarr;</button>
                </div>
            </div>
        </>
    );
};

export default FooterDirectory;
