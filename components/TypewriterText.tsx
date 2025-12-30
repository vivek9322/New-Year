'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  fontSize?: string;
  className?: string;
  bounceOnComplete?: boolean;
}

export default function TypewriterText({
  text,
  speed = 40,
  onComplete,
  fontSize = '18px',
  className = '',
  bounceOnComplete = false,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timer);
    } else if (!isComplete) {
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [displayedText, text, speed, isComplete, onComplete]);

  return (
    <motion.p
      className={className}
      style={{ fontSize, color: '#3A3A3A' }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        scale: isComplete && bounceOnComplete ? [1, 1.1, 1] : 1,
      }}
      transition={{ 
        opacity: { duration: 0.3 },
        scale: isComplete && bounceOnComplete ? {
          duration: 0.3,
          delay: 0.1,
        } : {},
      }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </motion.p>
  );
}

