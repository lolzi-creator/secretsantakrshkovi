'use client'

import { motion } from 'framer-motion'

export default function Snowflakes() {
  const snowflakes = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake}
          className="absolute text-white text-2xl opacity-60"
          initial={{
            x: `${Math.random() * 100}%`,
            y: -50,
            rotate: 0,
          }}
          animate={{
            y: '100vh',
            x: `${(Math.random() - 0.5) * 100 + (flake * 5)}%`,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
          style={{
            fontSize: `${Math.random() * 10 + 10}px`,
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  )
}

