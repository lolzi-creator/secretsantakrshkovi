'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RevealResultProps {
  targetName: string
  userName: string
  showAnimation?: boolean
}

export default function RevealResult({ targetName, userName, showAnimation = true }: RevealResultProps) {
  const [isAnimating, setIsAnimating] = useState(showAnimation)

  useEffect(() => {
    if (!showAnimation) {
      setIsAnimating(false)
      return
    }
    
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [showAnimation])

  return (
    <div className="w-full text-center relative z-10">
      <AnimatePresence mode="wait">
        {isAnimating ? (
          <motion.div
            key="opening"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <motion.div
              className="text-8xl md:text-9xl mb-4"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🎁
            </motion.div>
            <motion.p
              className="text-xl md:text-2xl text-winter-accent font-semibold"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Отворање на кутијата...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
          >
            {/* Celebration Emoji */}
            <motion.div
              className="mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                delay: 0.2,
              }}
            >
              <motion.span
                className="text-7xl md:text-8xl inline-block"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                🎉
              </motion.span>
            </motion.div>
            
            {/* Result Card */}
            <motion.div
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-winter-accent mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                delay: 0.3,
              }}
            >
              <motion.h2
                className="text-xl md:text-2xl font-bold text-winter-accent mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Ти го поклонуваш:
              </motion.h2>
              
              <motion.div
                className="text-4xl md:text-5xl font-extrabold text-winter-blue mb-4"
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.2, 1],
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  delay: 0.6,
                }}
              >
                <motion.span
                  animate={{
                    color: ['#3B82F6', '#8B5CF6', '#3B82F6'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {targetName}
                </motion.span>
              </motion.div>
            </motion.div>
            
            {/* Greeting */}
            <motion.div
              className="text-gray-700 text-base md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="mb-2 font-semibold text-lg md:text-xl">
                ❄️ Среќен Божик, {userName}! ❄️
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Убаво време при поклонување!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
