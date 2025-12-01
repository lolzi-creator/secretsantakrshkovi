'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GiftBoxSelectorProps {
  onBoxOpen: () => void
  userName: string
}

export default function GiftBoxSelector({ onBoxOpen, userName }: GiftBoxSelectorProps) {
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [isOpening, setIsOpening] = useState(false)

  const numberOfBoxes = 9 // 9 Boxen
  const boxes = Array.from({ length: numberOfBoxes }, (_, i) => i + 1)

  const handleBoxClick = (boxIndex: number) => {
    if (isOpening) return
    
    setSelectedBox(boxIndex)
    setIsOpening(true)
    
    // Warte auf Animation, dann öffne
    setTimeout(() => {
      onBoxOpen()
    }, 800)
  }

  // Winter Farben für Boxen (9 verschiedene)
  const winterColors = [
    { box: 'bg-winter-blue', lid: 'bg-blue-600', bow: 'bg-winter-ice' },
    { box: 'bg-winter-purple', lid: 'bg-purple-600', bow: 'bg-winter-pink' },
    { box: 'bg-winter-light-blue', lid: 'bg-blue-400', bow: 'bg-winter-blue' },
    { box: 'bg-winter-pink', lid: 'bg-pink-500', bow: 'bg-winter-purple' },
    { box: 'bg-winter-ice', lid: 'bg-blue-300', bow: 'bg-winter-blue' },
    { box: 'bg-winter-accent', lid: 'bg-cyan-600', bow: 'bg-winter-ice' },
    { box: 'bg-indigo-300', lid: 'bg-indigo-500', bow: 'bg-winter-pink' },
    { box: 'bg-violet-300', lid: 'bg-violet-500', bow: 'bg-winter-ice' },
    { box: 'bg-sky-300', lid: 'bg-sky-500', bow: 'bg-winter-pink' },
  ]

  return (
    <div className="w-full text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-2 text-winter-blue mb-6"
      >
        ❄️ Здраво {userName}! ❄️
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-700 mb-8 text-lg font-medium"
      >
        Избери една кутија за подарок:
      </motion.p>
      
      <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8 px-2">
        {boxes.map((boxNum, index) => {
          const isSelected = selectedBox === boxNum
          const colors = winterColors[index % winterColors.length]
          
          return (
            <motion.button
              key={boxNum}
              onClick={() => handleBoxClick(boxNum)}
              disabled={isOpening}
              className="aspect-square relative rounded-xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-winter-accent focus:ring-offset-2"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{
                opacity: isOpening && !isSelected ? 0.4 : 1,
                scale: isSelected ? 1.2 : isOpening ? 0.8 : 1,
                y: isSelected ? -5 : 0,
                rotate: isSelected ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
              whileHover={
                !isOpening && !isSelected
                  ? {
                      scale: 1.15,
                      y: -8,
                      transition: {
                        duration: 0.2,
                        type: 'spring',
                        stiffness: 400,
                      },
                    }
                  : {}
              }
              whileTap={
                !isOpening
                  ? {
                      scale: 0.9,
                      transition: { duration: 0.1 },
                    }
                  : {}
              }
            >
              {/* Geschenkbox */}
              <div className={`
                w-full h-full rounded-xl relative overflow-hidden shadow-lg
                ${colors.box}
                transition-all duration-300
                ${!isOpening && !isSelected ? 'hover:shadow-2xl hover:ring-4 hover:ring-white/50' : ''}
              `}>
                {/* Box Deckel mit Animation */}
                <motion.div
                  className={`
                    absolute top-0 left-0 right-0 h-1/3 ${colors.lid}
                    rounded-t-xl z-10
                  `}
                  animate={{
                    y: isSelected ? '-100%' : '0%',
                    rotateX: isSelected ? 90 : 0,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Schleife */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12"
                    animate={{
                      scale: isSelected ? [1, 1.2, 0] : 1,
                      rotate: isSelected ? [0, 360] : 0,
                    }}
                    transition={{
                      duration: 0.6,
                    }}
                  >
                    <div className={`
                      w-full h-full rounded-full ${colors.bow}
                      shadow-lg flex items-center justify-center
                    `}>
                      <div className="w-3 h-8 bg-white/60 rounded-full"></div>
                    </div>
                  </motion.div>
                </motion.div>
                
                {/* Geschenk Icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-0"
                  animate={{
                    scale: isSelected ? 1.3 : 1,
                    y: isSelected ? -10 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                >
                  <motion.span
                    className="text-4xl md:text-5xl"
                    animate={{
                      rotate: isSelected ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: isSelected ? Infinity : 0,
                      repeatDelay: 0.2,
                    }}
                  >
                    🎁
                  </motion.span>
                </motion.div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
