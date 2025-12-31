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
  const [buttonVisible, setButtonVisible] = useState(true);
  const catRef = useRef<CatHeroFinalRef>(null);

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
  };

  const handleButtonClick = () => {
    // Navigate to new page with photo
    window.location.href = '/smile';
  };


  return (
    <div
      className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden"
      style={{ backgroundColor: '#F6F6F6', maxWidth: '390px', margin: '0 auto' }}
    >
      <FallingEmojis
        emojis={['✨', '🤍', '🐱']}
        count={3}
        opacity={0.5}
        speedMultiplier={0.5}
        spawnInterval={4000}
      />

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
