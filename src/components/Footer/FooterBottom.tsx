import React from 'react';

interface FooterBottomProps {
    onNavigate?: (pageId: string) => void;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ onNavigate }) => {
    return (
        <div className="border-t border-gray-800 pt-2 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-1 md:gap-6">
            <div className="text-center md:text-left">
                <p className="text-gray-500 font-semibold md:font-bold uppercase tracking-widest text-[11px] md:text-xs">© 2026 CareerSha</p>
                <p className="text-gray-600 font-semibold md:font-normal mt-1 text-[10px] md:text-xs">Made in India for the World.</p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-500 font-semibold md:font-bold uppercase tracking-widest text-[11px] md:text-xs justify-center md:justify-end">
                <button onClick={() => onNavigate?.('/company/team')} className="hover:text-white transition-colors">Our Team</button>
                <button onClick={() => onNavigate?.('/company/careers')} className="hover:text-white transition-colors">Careers</button>
                <button onClick={() => onNavigate?.('/legal/privacy')} className="hover:text-white transition-colors">Privacy</button>
                <button onClick={() => onNavigate?.('/legal/terms')} className="hover:text-white transition-colors">Terms</button>
                <button onClick={() => onNavigate?.('/legal/grievances')} className="hover:text-white transition-colors">Grievances</button>
                <button onClick={() => onNavigate?.('/site/sitemap')} className="hover:text-white transition-colors">Sitemap</button>
            </div>
        </div>
    );
};

export default FooterBottom;
