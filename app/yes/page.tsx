'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CatHeroYes from '@/components/CatHeroYes';
import FallingEmojis from '@/components/FallingEmojis';
import TypewriterText from '@/components/TypewriterText';
import FloatingHearts from '@/components/FloatingHearts';

export default function YesPage() {
  const router = useRouter();
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Start first line immediately
    setShowLine1(true);
  }, []);

  const handleLine1Complete = () => {
    // Small bounce effect handled by TypewriterText
    setTimeout(() => {
      setShowLine2(true);
    }, 400); // 400ms pause
  };

  const handleLine2Complete = () => {
    setTimeout(() => {
      setShowLine3(true);
    }, 500); // 500ms pause
  };

  const handleLine3Complete = () => {
    // Show hearts after line 3
    setShowHearts(true);
    // Show button after hearts animation
    setTimeout(() => {
      setShowButton(true);
    }, 1500);
  };

  const handleContinueClick = () => {
    router.push('/final');
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ backgroundColor: '#F6F6F6', maxWidth: '390px', margin: '0 auto' }}
    >
      <FallingEmojis
        emojis={['💖', '✨', '🐱']}
        count={5}
        opacity={0.6}
        speedMultiplier={0.7}
        spawnInterval={3000}
      />

      {/* Cat Hero - ~40px from top */}
      <div className="mt-10 relative z-10">
        <CatHeroYes />
      </div>

      {/* Text Section - Center aligned */}
      <div className="mt-8 text-center relative z-10 space-y-4">
        {/* Line 1: yay!! */}
        {showLine1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TypewriterText
              text="yay!!"
              speed={40}
              fontSize="22px"
              onComplete={handleLine1Complete}
              className="font-handwritten"
              bounceOnComplete={true}
            />
          </motion.div>
        )}

        {/* Line 2: i knew you'd say yes */}
        {showLine2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TypewriterText
              text="i knew you'd say yes"
              speed={40}
              fontSize="18px"
              onComplete={handleLine2Complete}
              className="font-handwritten"
            />
          </motion.div>
        )}

        {/* Line 3: this made me really happy 🥺 */}
        {showLine3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TypewriterText
              text="this made me really happy 🥺"
              speed={40}
              fontSize="18px"
              onComplete={handleLine3Complete}
              className="font-handwritten"
            />
          </motion.div>
        )}
      </div>

      {/* Floating Hearts */}
      {showHearts && <FloatingHearts count={6} />}

      {/* Continue Button */}
      {showButton && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 relative z-10"
        >
          <motion.button
            ref={yesButtonRef}
            onClick={handleContinueClick}
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
            animate={{
              boxShadow: [
                '0 4px 0 #E2B45A',
                '0 3px 0 #E2B45A',
                '0 4px 0 #E2B45A',
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
            onHoverStart={() => {
              if (yesButtonRef.current) {
                yesButtonRef.current.style.boxShadow = '0 2px 0 #E2B45A';
              }
            }}
            onHoverEnd={() => {
              if (yesButtonRef.current) {
                yesButtonRef.current.style.boxShadow = '0 4px 0 #E2B45A';
              }
            }}
          >
            wait… one more thing
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
