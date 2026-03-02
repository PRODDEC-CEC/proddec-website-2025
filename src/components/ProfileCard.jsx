import React from 'react';
import { FaLinkedinIn } from "react-icons/fa6";
import getOptimizedImageUrl from '../utils/optimizeImage';

const ProfileCard = ({ name, title, handle, avatarUrl, className = "" }) => {
  return (
    <div className={`group relative h-[400px] md:h-[450px] w-full max-w-[320px] overflow-hidden bg-zinc-900 rounded-xl border border-zinc-800 transition-all duration-300 hover:border-[#FFA200]/50 hover:shadow-2xl hover:shadow-[#FFA200]/10 ${className}`}>

      {/* 2/3 Image Section - approx 66% */}
      <div className="relative h-[66%] w-full overflow-hidden">
        {/* Dark Overlay that fades on hover */}
        <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />

        {/* Image */}
        <img
          src={getOptimizedImageUrl(avatarUrl, 400)}
          alt={name}
          draggable="false"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 select-none"
        />

        {/* Tech Decorations on Image */}
        <div className="absolute top-4 right-4 z-20 flex space-x-1 opacity-60">
          <div className="h-1 w-1 rounded-full bg-white group-hover:bg-[#FFA200] transition-colors" />
          <div className="h-1 w-1 rounded-full bg-white/50" />
          <div className="h-1 w-1 rounded-full bg-white/20" />
        </div>

        {/* Gradient fade at bottom of image to blend with black */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
      </div>

      {/* 1/3 Content Section - approx 34% (adjusted to overlap slightly) */}
      <div className="relative h-[34%] w-full bg-zinc-900 px-6 pb-6 pt-2 flex flex-col justify-between z-20 -mt-2">
        {/* Progress/Divider Line */}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-zinc-800">
          <div className="h-full w-0 bg-[#FFA200] transition-all duration-700 ease-out group-hover:w-full" />
        </div>

        <div className="mt-4">
          <h3 className="font-zentry text-3xl font-bold uppercase text-white leading-none mb-1 group-hover:translate-x-1 transition-transform duration-300">
            {name}
          </h3>
          <p className="font-sans text-[10px] text-[#FFA200] tracking-widest uppercase">
                / {title} /
          </p>
        </div>

        <div className="flex items-end justify-between mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-zinc-600 font-inter uppercase tracking-widest">Connect</span>
          </div>

          <a
            href={`https://linkedin.com/in/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-[#FFA200] hover:bg-[#FFA200] hover:text-black transition-all duration-300 group-hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
