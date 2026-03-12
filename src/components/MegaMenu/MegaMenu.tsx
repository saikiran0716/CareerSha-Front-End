import React from "react";
import { Link } from "react-router-dom";

interface NavLink {
    name: string;
    url: string;
}

interface NavSection {
    heading: string;
    links: NavLink[];
}

interface MegaMenuProps {
    sections: NavSection[];
    onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ sections, onClose }) => {
    return (
        <div
            className="animate-dropdown z-50 pt-2 relative"
            onMouseLeave={onClose}
            style={{ width: 'max-content', minWidth: '220px', maxWidth: '300px' }}
        >
            <div className="bg-white/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-slate-200/50 p-5 relative overflow-hidden">
                {sections.map((section, idx) => (
                    <div key={idx} className="mb-2 last:mb-0">
                        {section.heading && (
                            <h4 className="font-bold text-slate-800 mb-3 text-[11px] uppercase tracking-wider border-b border-indigo-50 pb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                {section.heading}
                            </h4>
                        )}
                        <ul className="space-y-2">
                            {section.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                    <Link
                                        to={link.url}
                                        className="text-[12px] text-slate-600 hover:text-indigo-600 hover:bg-slate-50 block px-2 py-1.5 rounded-lg transition-all duration-200 font-medium whitespace-nowrap"
                                        onClick={onClose}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MegaMenu;
