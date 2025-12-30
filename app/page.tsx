'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CatHero from '@/components/CatHero';
import FallingEmojis from '@/components/FallingEmojis';

export default function Home() {
  const router = useRouter();
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current || !noButtonRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;
    
    // Calculate random position away from cursor, within container bounds
    const padding = 32;
    const maxX = container.width - button.width - padding;
    const maxY = container.height - button.height - padding;
    
    // Generate positions until we find one away from cursor
    let newX, newY;
    let attempts = 0;
    do {
      newX = (Math.random() - 0.5) * maxX;
      newY = (Math.random() - 0.5) * maxY;
      attempts++;
    } while (
      attempts < 10 && 
      Math.abs(newX - (mouseX - container.width / 2)) < 50 &&
      Math.abs(newY - (mouseY - container.height / 2)) < 50
    );
    
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Trigger hover to move button away
    handleNoHover(e);
  };

  const handleYesClick = () => {
    router.push('/yes');
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ backgroundColor: '#F6F6F6', maxWidth: '390px', margin: '0 auto' }}
    >
      <FallingEmojis />
      
      {/* Cat Hero Image - ~40px from top */}
      <div className="mt-10 relative z-10">
        <CatHero />
      </div>

      {/* Text Section */}
      <div className="mt-4 text-center relative z-10" style={{ color: '#3A3A3A' }}>
        <p className="mb-1" style={{ fontSize: '18px', lineHeight: '1.2' }}>
          hey! i made something for you
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.2' }}>
          will you see it?
        </p>
      </div>

      {/* Buttons - ~20px margin-top from text */}
      <div className="mt-5 flex flex-row items-center gap-4 relative z-10">
        {/* YES Button */}
        <motion.button
          onClick={handleYesClick}
          whileHover={{ y: -2 }}
          className="font-handwritten"
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #1E1E1E',
            borderRadius: '12px',
            padding: '10px 26px',
            color: '#1E1E1E',
            boxShadow: '0 4px 0 #E2B45A',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s ease',
          }}
          onHoverStart={(e) => {
            if (e.currentTarget) {
              e.currentTarget.style.boxShadow = '0 2px 0 #E2B45A';
            }
          }}
          onHoverEnd={(e) => {
            if (e.currentTarget) {
              e.currentTarget.style.boxShadow = '0 4px 0 #E2B45A';
            }
          }}
        >
          YES
        </motion.button>

        {/* NO Button - dodges on hover, never allows click */}
        <motion.button
          ref={noButtonRef}
          onMouseEnter={handleNoHover}
          onMouseMove={handleNoHover}
          onClick={handleNoClick}
          className="font-handwritten"
          style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid #1E1E1E',
            borderRadius: '12px',
            padding: '10px 26px',
            color: '#1E1E1E',
            boxShadow: '0 4px 0 #E2B45A',
            fontSize: '16px',
            cursor: 'pointer',
            position: 'relative',
            userSelect: 'none',
          }}
          animate={{
            x: noButtonPosition.x,
            y: noButtonPosition.y,
          }}
          transition={{
            duration: 0.15,
            ease: [0.25, 0.1, 0.25, 1], // More playful easing
          }}
        >
          NO
        </motion.button>
      </div>
    </div>
  );
}

