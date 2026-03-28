import React from 'react';

interface FooterBottomProps {
    onNavigate?: (pageId: string) => void;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ onNavigate }) => {
    return (
        <div className="border-t border-gray-800/50 mt-8 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-6 fhd:max-w-[1440px] fhd:mx-auto">
            <div className="flex flex-col items-center md:items-start space-y-1">
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] xs:text-[11px] ms:text-xs">
                    © 2026 CAREERSHA
                </p>
                <p className="text-gray-600 font-medium text-[9px] xs:text-[10px] ms:text-[11px]">
                    Made with excellence in India for the World.
                </p>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center md:justify-end items-center gap-x-4 gap-y-4 sm:gap-x-5">
                {[
                    { label: 'About Us', id: 'company-about' },
                    { label: 'Contact Us', id: 'company-contact' },
                    { label: 'Terms & Conditions', id: 'legal-terms' },
                    { label: 'Privacy Policy', id: 'legal-privacy' },
                    { label: 'Disclaimer', id: 'legal-disclaimer' }
                ].map((link) => (
                    <button
                        key={link.id}
                        onClick={() => {
                            const pathMap: Record<string, string> = {
                                'company-about': '/about-us',
                                'company-contact': '/contact-us',
                                'legal-terms': '/terms-and-conditions',
                                'legal-privacy': '/privacy-policy',
                                'legal-disclaimer': '/disclaimer'
                            };
                            const path = pathMap[link.id] || `/${link.id.replace('legal-', '').replace('company-', '')}`;
                            onNavigate?.(path);
                        }}
                        className="text-gray-500 hover:text-white transition-all duration-300 text-[10px] ms:text-[11px] font-bold uppercase tracking-widest text-center sm:text-left"
                    >
                        {link.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FooterBottom;
