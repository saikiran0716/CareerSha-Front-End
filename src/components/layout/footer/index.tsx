import React from 'react';
import FooterBrand from './FooterBrand';
import FooterDirectory from './FooterDirectory';
import FooterBottom from './FooterBottom';

interface FooterProps {
  onPageRequest?: (pageId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageRequest }) => {
  return (
    <footer className="relative z-10 bg-primary-950 text-white pt-4 md:pt-8 pb-4 md:pb-8 font-sans border-t border-neutral-900 leading-relaxed overflow-hidden">
      <div className="page-container">
        <FooterBrand />
        <FooterDirectory onNavigate={onPageRequest} />
        <FooterBottom onNavigate={onPageRequest} />
      </div>
    </footer>
  );
};

export default Footer;
