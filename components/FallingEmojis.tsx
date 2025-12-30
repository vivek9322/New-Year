'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FallingEmojisProps {
  emojis?: string[];
  count?: number;
  opacity?: number;
  speedMultiplier?: number;
  spawnInterval?: number;
}

const defaultEmojis = ['🐱', '💖', '✨', '😺'];

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  size: number;
  duration: number;
}

export default function FallingEmojis({
  emojis = defaultEmojis,
  count = 8,
  opacity = 0.8,
  speedMultiplier = 1,
  spawnInterval = 2000,
}: FallingEmojisProps = {}) {
  const [emojiList, setEmojiList] = useState<Emoji[]>([]);

  useEffect(() => {
    // Create initial emojis
    const initialEmojis: Emoji[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      size: Math.random() * 8 + 14, // 14px to 22px
      duration: (Math.random() * 3 + 8) / speedMultiplier, // Adjusted by speed multiplier
    }));
    setEmojiList(initialEmojis);

    // Add new emojis periodically
    const interval = setInterval(() => {
      setEmojiList((prev) => {
        const newEmoji: Emoji = {
          id: Date.now(),
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * 100,
          size: Math.random() * 8 + 14,
          duration: (Math.random() * 3 + 8) / speedMultiplier,
        };
        return [...prev.slice(-(count - 1)), newEmoji];
      });
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [emojis, count, speedMultiplier, spawnInterval]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {emojiList.map((item) => (
        <motion.div
          key={item.id}
          className="absolute top-0"
          style={{
            left: `${item.x}%`,
            fontSize: `${item.size}px`,
            opacity: opacity,
          }}
          initial={{ y: -50, x: 0 }}
          animate={{
            y: '100vh',
            x: [0, Math.random() * 20 - 10, Math.random() * 20 - 10],
          }}
          transition={{
            duration: item.duration,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}

