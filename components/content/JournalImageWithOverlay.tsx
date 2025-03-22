/* eslint-disable @next/next/no-img-element */
// /components/journals/JournalImageWithOverlay.tsx

import React from 'react';
import { urlFor } from '@/lib/client';

interface JournalImageWithOverlayProps {
  image: any;
  category: string;
  title: string;
  date: string;
}

const JournalImageWithOverlay: React.FC<JournalImageWithOverlayProps> = ({ 
  image, 
  category, 
  title, 
  date 
}) => {
  return (
    <div className="relative w-full">
      {/* Image container */}
      <div className="w-full h-auto relative my-8 lg:my-14">
        {/* The image */}
        <img
          src={urlFor(image).url()}
          alt={title}
          className="w-full h-auto object-cover"
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        
        {/* Text content container */}
        <div className="absolute bottom-0 p-4 md:p-6 lg:p-10 lg:px-28 md:px-16 px-4 z-10 inset-x-[20%] text-center">
          {/* Category */}
          <p className="text-persian text-sm lg:text-[20px] uppercase tracking-wider mb-2 md:mb-4">
            {category}
          </p>
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-200 mb-2 md:mb-4">
            {title}
          </h1>
          
          {/* Date */}
          <p className="text-gray-300 mb-6 text-sm lg:text-[20px]">
            {date}
          </p>
        </div>
      </div>
    </div>
  );
};

export default JournalImageWithOverlay;