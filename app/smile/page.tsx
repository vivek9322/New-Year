'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import CatHeroFinal, { CatHeroFinalRef } from '@/components/CatHeroFinal';
import FallingEmojis from '@/components/FallingEmojis';

export default function SmilePage() {
  const router = useRouter();
  const [showPhoto, setShowPhoto] = useState(false);
  const [sparkle, setSparkle] = useState<{ x: number; y: number } | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const catRef = useRef<CatHeroFinalRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show photo after page loads with a brief pause
    setTimeout(() => {
      setShowPhoto(true);
    }, 300);
  }, []);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showPhoto || hasInteracted) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const centerX = rect.width / 2;

    // Determine glance direction
    const direction = clickX < centerX ? 'left' : 'right';

    // Show sparkle at tap location
    setSparkle({ x: clickX, y: clickY });
    setTimeout(() => setSparkle(null), 600);

    // Cat glances toward tap
    if (catRef.current) {
      catRef.current.glance(direction);
    }

    // Mark as interacted (one-time only)
    setHasInteracted(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ backgroundColor: '#F6F6F6', maxWidth: '390px', margin: '0 auto' }}
      onClick={handlePageClick}
    >
      <FallingEmojis
        emojis={['✨', '🤍', '🐱']}
        count={3}
        opacity={0.5}
        speedMultiplier={0.5}
        spawnInterval={4000}
      />

      {/* Sparkle effect */}
      {sparkle && (
        <motion.div
          className="absolute pointer-events-none z-50"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            fontSize: '24px',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          ✨
        </motion.div>
      )}

      {/* Cat Hero - centered */}
      <div className="mt-10 relative z-10">
        <CatHeroFinal ref={catRef} />
      </div>

      {/* Photo Section */}
      {showPhoto && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mt-8"
        >
          <div
            className="relative"
            style={{
              width: '220px',
              maxWidth: '80%',
              margin: '0 auto',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            <img
              src="/shared-photo.jpg"
              alt=""
              style={{
                width: '220px',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '16px',
              }}
            />
            {/* Film grain overlay */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.12'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
                borderRadius: '16px',
              }}
            />
          </div>
          {/* Caption */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="font-handwritten text-center"
            style={{
              fontSize: '14px',
              color: '#9CA3AF',
              marginTop: '8px',
            }}
          >
            This moment stayed with me.
          </motion.p>
        </motion.div>
      )}
    </div>
  );
}

