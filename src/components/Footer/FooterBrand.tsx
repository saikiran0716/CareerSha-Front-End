import React from 'react';

const FooterBrand: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-8 border-b border-gray-800 pb-8">
            <div className="max-w-xl space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg shadow-white/5">
                        <span className="font-bold text-gray-950 text-xl">CS</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">CareerSha</h3>
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mt-0.5">The Admission Intelligence Platform</p>
                    </div>
                </div>
                <p className="text-gray-400 font-normal text-sm leading-7">
                    CareerSha is India's premier education counseling portal, leveraging 10M+ data points to guide students toward their ideal academic future. From rank prediction to college matching, we bridge the gap between aspiration and admission.
                </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 md:gap-5 w-full md:w-auto">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Connect with us</p>
                <div className="flex flex-nowrap gap-3 max-w-[300px] md:justify-start justify-center">
                    {[
                        { name: 'LinkedIn', baseColor: 'text-[#0A66C2]', hoverColor: 'hover:bg-[#0A66C2] hover:text-white', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
                        { name: 'X', baseColor: 'text-white', hoverColor: 'hover:bg-white hover:text-black', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                        { name: 'Instagram', baseColor: 'text-pink-500', hoverColor: 'hover:bg-gradient-to-tr hover:from-orange-500 hover:via-pink-500 hover:to-purple-500 hover:text-white', icon: true },
                        { name: 'Facebook', baseColor: 'text-[#1877F2]', hoverColor: 'hover:bg-[#1877F2] hover:text-white', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                        { name: 'YouTube', baseColor: 'text-[#FF0000]', hoverColor: 'hover:bg-[#FF0000] hover:text-white', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                        { name: 'WhatsApp', baseColor: 'text-[#25D366]', hoverColor: 'hover:bg-[#25D366] hover:text-white', path: 'M 12.011719 0.017578125 C 5.394531 0.017578125 -0.013671875 5.419922 -0.013671875 12.042969 C -0.013671875 14.15625 0.537109 16.216797 1.603516 18.064453 L 0 24 L 6.0625 22.394531 C 7.849609 23.382812 9.882812 23.978516 12.015625 23.978516 C 18.632812 23.978516 24.039062 18.576172 24.039062 11.953125 C 24.039062 5.330078 18.632812 0.017578125 12.011719 0.017578125 Z M 12.013672 21.96875 C 10.191406 21.96875 8.449219 21.464844 6.919922 20.554688 L 6.554688 20.339844 L 2.9375 21.296875 L 3.90625 17.761719 L 3.667969 17.382812 C 2.695312 15.830078 2.181641 13.986328 2.181641 12.044922 C 2.181641 6.640625 6.591797 2.234375 12.015625 2.234375 C 17.439453 2.234375 21.847656 6.638672 21.847656 12.042969 C 21.847656 17.447266 17.435547 21.96875 12.013672 21.96875 Z' },
                        { name: 'Telegram', baseColor: 'text-[#229ED9]', hoverColor: 'hover:bg-[#229ED9] hover:text-white', path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
                    ].map((social) => (
                        <a key={social.name} href="#" className={`w-9 h-9 bg-gray-900 border border-gray-800 rounded flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 ${social.baseColor} ${social.hoverColor} hover:border-transparent`} title={social.name}>
                            <span className="sr-only">{social.name}</span>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                {social.icon ? (
                                    <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
                                ) : <path d={social.path} />}
                            </svg>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FooterBrand;
