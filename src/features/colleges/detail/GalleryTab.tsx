import React, { useState } from 'react';
import { ExternalLink, School, Image } from 'lucide-react';
import { SkeletonBlock } from './ui';
import type { CollegeView } from './useCollegeDetail';

const GalleryTab: React.FC<{ view: CollegeView }> = ({ view }) => {
  const { d, loading, website } = view;
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2.5">
        <Image size={16} className="text-primary-500" />
        <h2 className="text-[14px] font-extrabold text-neutral-800">Campus Gallery</h2>
      </div>
      {loading ? (
        <div className="p-6">
          <SkeletonBlock lines={4} />
        </div>
      ) : d?.galleryImages && d.galleryImages.filter((_, i) => !imgErrors[i]).length > 0 ? (
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {d.galleryImages.map(
            (img, i) =>
              !imgErrors[i] && (
                <div key={i} className="relative rounded-xl overflow-hidden bg-neutral-100 aspect-video group">
                  <img
                    src={img.url}
                    alt={img.caption}
                    onError={() => setImgErrors((prev) => ({ ...prev, [i]: true }))}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                      <p className="text-[11px] text-white font-semibold leading-tight">{img.caption}</p>
                    </div>
                  )}
                </div>
              ),
          )}
        </div>
      ) : (
        <div className="p-12 flex flex-col items-center gap-3 text-center">
          <School size={40} className="text-neutral-300" />
          <p className="text-neutral-500 text-[13px] font-semibold">Gallery images not available</p>
          {website && (
            <a
              href={`${website}/gallery`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-primary-600 hover:underline flex items-center gap-1"
            >
              View on official website <ExternalLink size={11} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryTab;
