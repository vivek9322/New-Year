'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import CatHeroFinal, { CatHeroFinalRef } from '@/components/CatHeroFinal';
import FallingEmojis from '@/components/FallingEmojis';
import TypewriterText from '@/components/TypewriterText';

export default function FinalPage() {
  const [showText1, setShowText1] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [showText3, setShowText3] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [sparkle, setSparkle] = useState<{ x: number; y: number } | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const catRef = useRef<CatHeroFinalRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 500ms delay before text appears
    const timer = setTimeout(() => {
      setShowText1(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleText1Complete = () => {
    // Pause 700ms after text 1
    setTimeout(() => {
      setShowText2(true);
    }, 700);
  };

  const handleText2Complete = () => {
    // Pause 900ms after text 2
    setTimeout(() => {
      setShowText3(true);
    }, 900);
  };

  const handleText3Complete = () => {
    // Show button after text 3
    setTimeout(() => {
      setShowButton(true);
    }, 100);
    // Show photo after 1200ms pause
    setTimeout(() => {
      setShowPhoto(true);
    }, 1200);
  };

  const handleButtonClick = () => {
    // Button fades out
    setButtonVisible(false);
    // Cat performs nod
    if (catRef.current) {
      catRef.current.nod();
    }
  };

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

      {/* Text Section - Center aligned */}
      <div className="mt-8 text-center relative z-10 px-6">
        {/* Text 1: Typewriter */}
        {showText1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TypewriterText
              text="I just wanted you to know that you matter to me."
              speed={70}
              fontSize="19px"
              onComplete={handleText1Complete}
              className="font-handwritten"
            />
          </motion.div>
        )}

        {/* Text 2: Fade In */}
        {showText2 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-handwritten"
            style={{ fontSize: '17px', color: '#3A3A3A', marginTop: '10px' }}
            onAnimationComplete={handleText2Complete}
          >
            I'm really glad you're here.
          </motion.p>
        )}

        {/* Text 3: Grouped Fade */}
        {showText3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="font-handwritten"
            style={{ fontSize: '15.5px', color: '#3A3A3A', lineHeight: '1.6', marginTop: '18px' }}
            onAnimationComplete={handleText3Complete}
          >
            Happy New Year.
            <br />
            I hope 2026 is kind to you, and if it isn't, remember you won't have to handle it by yourself.
            <br />
            I'm with you.
          </motion.div>
        )}

        {/* Photo */}
        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
            style={{ marginTop: '22px' }}
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
                  filter: 'blur(2px)',
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

        {/* Button */}
        {showButton && buttonVisible && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: buttonVisible ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleButtonClick}
            className="font-handwritten mt-6"
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1E1E1E',
              borderRadius: '12px',
              padding: '8px 20px',
              color: '#1E1E1E',
              boxShadow: '0 4px 0 #E2B45A',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            you can smile now
          </motion.button>
        )}
      </div>
    </div>
  );
}
