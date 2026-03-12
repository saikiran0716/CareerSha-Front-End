import React from 'react';

interface BookLoaderProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    text?: string;
}

const BookLoader: React.FC<BookLoaderProps> = ({ size = 'md', className = '', text }) => {
    // Size mappings
    const dimensions = {
        sm: { width: '24px', height: '16px', pageLeft: '12px', pageWidth: '12px', pageHeight: '16px', perspective: '400px' },
        md: { width: '60px', height: '40px', pageLeft: '30px', pageWidth: '30px', pageHeight: '40px', perspective: '1000px' },
        lg: { width: '100px', height: '70px', pageLeft: '50px', pageWidth: '50px', pageHeight: '70px', perspective: '1500px' }
    };

    const dim = dimensions[size];
    const isSmall = size === 'sm';

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <style>
                {`
          .book-loader-container-${size} {
            position: relative;
            width: ${dim.width};
            height: ${dim.height};
            perspective: ${dim.perspective};
            transform-style: preserve-3d;
            margin: 0 auto;
          }
          
          .book-page-${size} {
            position: absolute;
            top: 0;
            left: ${dim.pageLeft};
            width: ${dim.pageWidth};
            height: ${dim.pageHeight};
            background-color: #fff;
            background-image: ${isSmall ? 'none' : `
              linear-gradient(90deg, transparent 5%, #e2e8f0 5%, #e2e8f0 10%, transparent 10%),
              linear-gradient(#475569 1px, transparent 1px)
            `};
            background-size: ${isSmall ? 'auto' : '100% 100%, 100% 8px'};
            border: 1px solid ${isSmall ? '#c7d2fe' : '#cbd5e1'};
            ${!isSmall ? 'border-left: 2px solid #94a3b8;' : ''}
            transform-origin: left center;
            transform-style: preserve-3d;
            animation: book-flip-${size} ${isSmall ? '1.2s' : '2s'} infinite cubic-bezier(0.645, 0.045, 0.355, 1);
            ${!isSmall ? 'box-shadow: 2px 2px 5px rgba(0,0,0,0.05);' : ''}
            backface-visibility: hidden;
          }

          .book-page-${size}:nth-child(1) { animation-delay: 0s; z-index: 5; }
          .book-page-${size}:nth-child(2) { animation-delay: -0.3s; z-index: 4; }
          .book-page-${size}:nth-child(3) { animation-delay: -0.6s; z-index: 3; }
          .book-page-${size}:nth-child(4) { animation-delay: -0.9s; z-index: 2; }
          
          @keyframes book-flip-${size} {
            0% { transform: rotateY(0deg); }
            20% { transform: rotateY(-30deg); background-color: #f8fafc; }
            50% { transform: rotateY(-180deg); background-color: #f1f5f9; }
            100% { transform: rotateY(-180deg); }
          }
          
          /* Corner Curl Effect (Pseudo-element) */
          ${!isSmall ? `
          .book-page-${size}::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.05) 50%, #fff 55%);
            z-index: 10;
          }
          ` : ''}
        `}
            </style>

            <div className={`book-loader-container-${size}`}>
                {/* Back Cover / Spine Base */}
                <div
                    className="absolute top-0 left-0 bg-indigo-700 rounded-l-md shadow-lg"
                    style={{ width: dim.pageWidth, height: dim.height }}
                ></div>
                <div
                    className="absolute top-0 right-0 bg-indigo-50 border border-indigo-200 rounded-r-md -z-10 shadow-sm"
                    style={{ width: dim.pageWidth, height: dim.height }}
                ></div>

                {/* Pages */}
                <div className={`book-page-${size}`}></div>
                <div className={`book-page-${size}`}></div>
                <div className={`book-page-${size}`}></div>
                <div className={`book-page-${size}`}></div>

                {/* Spine Detail */}
                <div
                    className="absolute top-0 bg-indigo-800 z-10 rounded-sm"
                    style={{ left: `calc(${dim.pageLeft} - 2px)`, width: '4px', height: dim.height }}
                ></div>
            </div>

            {text && (
                <div className="mt-4 text-center">
                    <p className="text-slate-500 font-medium animate-pulse">{text}</p>
                </div>
            )}
        </div>
    );
};

export default BookLoader;
