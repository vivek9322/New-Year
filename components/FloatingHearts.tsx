'use client';

import { motion } from 'framer-motion';

interface FloatingHeartsProps {
  count?: number;
}

export default function FloatingHearts({ count = 6 }: FloatingHeartsProps) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // -50% to 50% from center
    y: Math.random() * 30 + 20, // 20% to 50% from top
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            fontSize: '20px',
            opacity: 0.8,
          }}
          initial={{
            x: heart.x,
            y: heart.y,
            scale: 0,
            opacity: 0.8,
          }}
          animate={{
            y: heart.y - 60,
            scale: [0, 1.2, 0],
            opacity: [0.8, 0.8, 0],
          }}
          transition={{
            duration: 1.2,
            delay: heart.delay,
            ease: 'easeOut',
          }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}

