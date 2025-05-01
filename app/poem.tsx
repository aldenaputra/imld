'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const poemLines = [
  "sendirian kita hidup—pun berdampingan.",
  "",
  "karena saat sendirian,",
  "kesalahan hari kemarin, dirasa begitu bodoh.",
  "",
  "karena saat sepi,",
  "engkau dan dirimu kian bersaut cerita.",
  "",
  "disaat sendiri hadir,",
  "sebuah panggung untuk suara-suaramu yang tidak terucap.",
  "",
  "sebuah pemikir untuk setiap keluh yang disimpan dan kesah yang diredam.",
  "",
  "sebuah hati untuk menjawab yang belum dimengerti baik salah atau benarnya.",
  "",
  "sebuah teman yang selalu kita benci akan semua tuturnya tentang dirimu yang selalu benar.",
  "",
  "engkau dan dirimu.",
  "sendiri memanggilmu.",
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
  className="p-6 max-w-2xl w-full"
>
  {poemLines.map((line, index) => {
    if (line.trim() === "") {
      return <div key={index} className="h-6" />;
    }

    if (line.includes("memanggilmu.")) {
      const parts = line.split("memanggilmu.");

      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * (delayPerLine / 1000),
            duration: duration / 1000,
          }}
          className="text-left text-[1.25rem] italic text-gray-900 font-serif leading-tight"
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
            'memanggilmu;'
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
        className="text-left text-[1.25rem] italic text-gray-900 font-serif leading-tight"
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
