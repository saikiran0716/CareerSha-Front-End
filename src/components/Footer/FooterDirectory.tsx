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
            <div className="grid grid-cols-1 md:grid-cols-3 fhd:grid-cols-5 gap-x-12 gap-y-8 mb-12">
                {footerNavigation.map((category, index) => {
                    const isOpen = openSection === category.title;
                    const isLast = index === footerNavigation.length - 1;
                    return (
                        <div key={category.title} className={`${!isLast ? 'border-b border-gray-800/50' : ''} md:border-none pb-6 md:pb-0`}>
                            <button
                                onClick={() => toggleSection(category.title)}
                                className="w-full flex items-center justify-between md:cursor-default md:pointer-events-none group py-2 md:py-0"
                            >
                                <h4 className="text-white font-black uppercase tracking-[0.2em] md:mb-6 md:pb-3 md:border-b md:border-gray-800/50 text-[11px] ms:text-xs">
                                    {category.title}
                                </h4>
                                <span className={`md:hidden transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </span>
                            </button>
                            
                            <ul className={`space-y-4 mt-3 md:mt-0 md:block transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 md:max-h-none opacity-0 md:opacity-100'}`}>
                                {category.links.map((link, idx) => {
                                    return (
                                        <li key={idx}>
                                            <button
                                                onClick={() => onNavigate?.(link.url)}
                                                className="text-gray-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300 text-[11px] ms:text-xs text-left w-full font-bold uppercase tracking-widest py-1 md:py-0"
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
            <div className="mb-12 pt-8 border-t border-gray-800/50">
                <h4 className="text-white font-black uppercase tracking-[0.2em] mb-6 text-xs ms:text-sm text-center md:text-left">Explore Colleges By City</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-4 text-gray-500 text-[10px] ms:text-xs font-bold uppercase tracking-widest justify-center md:justify-start">
                    {['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Indore', 'Bhopal', 'Chandigarh', 'Coimbatore', 'Nagpur', 'Noids', 'Gurgaon'].map(city => {
                        const cityPath = `/city/${city.toLowerCase().replace(' ', '-')}`;
                        return (
                            <button
                                key={city}
                                onClick={() => onNavigate?.(cityPath)}
                                className="hover:text-white transition-all duration-300 border-b border-transparent hover:border-indigo-500 pb-1"
                            >
                                {city}
                            </button>
                        );
                    })}
                    <button className="text-indigo-500 font-black hover:text-indigo-400 transition-colors uppercase tracking-[0.2em]">View All Cities &rarr;</button>
                </div>
            </div>
        </>
    );
};

export default FooterDirectory;
