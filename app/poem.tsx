'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const poemLines = [
  "rain on my window,",
  "echoes of things i'll never show.",
  "each drop, a fading reminiscence,",
  "and wonder if time forgives in silence;",
];

export default function Poem() {
  const [showButton, setShowButton] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [slideUpPoem, setSlideUpPoem] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);


  const router = useRouter();

  // Customize these values for slower animation
  const delayPerLine = 800; // ms
  const duration = 800; // ms

  useEffect(() => {
    const totalDelay = (poemLines.length - 1) * delayPerLine + duration;
  
    // After poem lines finish animating, slide up poem container
    const slideUpTimer = setTimeout(() => {
      setSlideUpPoem(true);
    }, totalDelay);
  
    // After slide-up animation duration, show button
    const showButtonTimer = setTimeout(() => {
      setShowButton(true);
    }, totalDelay + 1000); // 1 second for slide-up animation
  
    return () => {
      clearTimeout(slideUpTimer);
      clearTimeout(showButtonTimer);
    };
  }, []);  

  const handleButtonClick = () => {
    setButtonClicked(true);
    setTimeout(() => {
      router.push("/cont");
    }, 800); // Match this duration with fade-out time
  };

  return (

    <motion.div
  initial={{ opacity: 1 }}
  animate={{ opacity: isFadingOut ? 0 : 1 }}
  transition={{ duration: 1}}
  className="min-h-screen bg-white flex flex-col items-center justify-center"
>
<div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="px-15 sm:px-6 md:px-12 w-full max-w-3xl"
>
  {poemLines.map((line, index) => {
    if (line.trim() === "") {
      return <div key={index} className="h-6" />;
    }

    if (line.includes("silence;")) {
      const parts = line.split("silence;");

      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * (delayPerLine / 1000),
            duration: duration / 1000,
          }}
          className="text-left text-sm sm:text-lg md:text-xl italic text-gray-900 font-serif leading-snug"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {parts[0]}
          <span
            onClick={() => {
                setIsFadingOut(true);
                setTimeout(() => {
                  router.push("/cont");
                }, 800); // match duration above
              }}              
            className="text-black cursor-pointer transition-colors duration-300 hover:text-blue-400"
          >
            silence;
          </span>
          {parts[1]}
        </motion.p>
      );
    }

    return (
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * (delayPerLine / 1000),
          duration: duration / 1000,
        }}
        className="text-left text-sm sm:text-lg md:text-xl italic text-gray-900 font-serif leading-snug"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        {line}
      </motion.p>
    );
  })}
</motion.div>

    </div>
</motion.div>

    
  );
}
