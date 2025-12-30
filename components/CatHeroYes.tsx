'use client';

import { motion } from 'framer-motion';

export default function CatHeroYes() {
  return (
    <motion.div
      className="relative mx-auto"
      style={{ width: '155px', height: '155px' }}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -6, 6, 0],
      }}
      transition={{
        scale: {
          duration: 0.6,
          ease: 'easeOut',
        },
        opacity: {
          duration: 0.6,
          ease: 'easeOut',
        },
        y: {
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.6,
        },
      }}
    >
      {/* Cat face container */}
      <svg
        width="155"
        height="155"
        viewBox="0 0 140 140"
        className="relative z-10"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      >
        {/* Cat face circle with white stroke - organic/circular crop */}
        <circle
          cx="70"
          cy="70"
          r="65"
          fill="#F6F6F6"
          stroke="white"
          strokeWidth="2"
        />
        
        {/* Left whiskers (3 lines) - pink hand-drawn style */}
        <line
          x1="20"
          y1="68"
          x2="5"
          y2="63"
          stroke="#FFB6C1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="75"
          x2="5"
          y2="75"
          stroke="#FFB6C1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="82"
          x2="5"
          y2="87"
          stroke="#FFB6C1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Right whiskers (3 lines) */}
        <line
          x1="120"
          y1="68"
          x2="135"
          y2="63"
          stroke="#FFB6C1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="120"
          y1="75"
          x2="135"
          y2="75"
          stroke="#FFB6C1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="120"
          y1="82"
          x2="135"
          y2="87"
          stroke="#FFB6C1"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Left ear with pink bow */}
        <g>
          {/* Left ear triangle */}
          <path
            d="M 35 25 L 50 45 L 30 40 Z"
            fill="#F6F6F6"
            stroke="white"
            strokeWidth="1.5"
          />
          {/* Pink bow on left ear - small and cute */}
          <circle
            cx="40"
            cy="35"
            r="5"
            fill="#FFB6C1"
          />
          <ellipse
            cx="38"
            cy="33"
            rx="3"
            ry="2"
            fill="#FFB6C1"
          />
          <ellipse
            cx="42"
            cy="33"
            rx="3"
            ry="2"
            fill="#FFB6C1"
          />
        </g>
        
        {/* Right ear */}
        <path
          d="M 105 25 L 110 45 L 125 40 Z"
          fill="#F6F6F6"
          stroke="white"
          strokeWidth="1.5"
        />
        
        {/* Eyes (simple dots) */}
        <circle cx="55" cy="60" r="5" fill="#1E1E1E" />
        <circle cx="85" cy="60" r="5" fill="#1E1E1E" />
        
        {/* Nose */}
        <path
          d="M 70 75 L 65 85 L 75 85 Z"
          fill="#FFB6C1"
        />
        
        {/* Mouth - cute smile */}
        <path
          d="M 70 85 Q 65 90 60 88"
          stroke="#1E1E1E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 70 85 Q 75 90 80 88"
          stroke="#1E1E1E"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

