'use client';

import { motion } from 'framer-motion';

const continuationPoem = [
  "sendirian kita hidup—pun berdampingan.",
  "berdampingan dengan diri kita di masa lalu.",
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Poem container for the continuation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="p-6 max-w-2xl w-full"
      >
        {continuationPoem.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 1, duration: 1 }}
            className="text-left text-[1.25rem] italic text-gray-900 font-serif leading-tight"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}
