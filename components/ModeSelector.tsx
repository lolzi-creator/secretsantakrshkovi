'use client'

import { motion } from 'framer-motion'

interface ModeSelectorProps {
  userName: string
  onModeSelect: (mode: 'box' | 'scratch') => void
}

export default function ModeSelector({ userName, onModeSelect }: ModeSelectorProps) {
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
        Избери го твојот режим на игра:
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Modus 1: Box-Auswahl */}
        <motion.button
          onClick={() => onModeSelect('box')}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-winter-blue hover:border-winter-accent transition-all"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-6xl mb-4">🎁</div>
          <h3 className="text-2xl font-bold text-winter-blue mb-2">Избор на кутија</h3>
          <p className="text-gray-600 text-sm">
            Едноставно избери една кутија за подарок и дознај кого ќе поклониш!
          </p>
        </motion.button>

        {/* Modus 2: Rubbellos */}
        <motion.button
          onClick={() => onModeSelect('scratch')}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-winter-purple hover:border-winter-accent transition-all"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-6xl mb-4">🎫</div>
          <h3 className="text-2xl font-bold text-winter-purple mb-2">Гребенка</h3>
          <p className="text-gray-600 text-sm">
            Гребни 9 кутии! Едно име се појавува 3 пати - најди ги сите 3!
          </p>
        </motion.button>
      </div>
    </div>
  )
}
