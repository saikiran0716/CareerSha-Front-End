import React from 'react';
import FooterBrand from './FooterBrand';
import FooterDirectory from './FooterDirectory';
import FooterBottom from './FooterBottom';

interface FooterProps {
    onPageRequest?: (pageId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageRequest }) => {
    return (
        <footer className="relative z-10 bg-[#0F0F0F] text-white pt-6 md:pt-12 pb-4 md:pb-8 font-sans border-t border-gray-800 leading-relaxed overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 fhd:px-16">
                <FooterBrand />
                <FooterDirectory onNavigate={onPageRequest} />
                <FooterBottom onNavigate={onPageRequest} />
            </div>
        </footer>
    );
};

export default Footer;
