'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getAllUserNames } from '@/lib/users'

interface ScratchCardProps {
  targetName: string
  userName: string
  userSlug: string
  onComplete: () => void
}

export default function ScratchCard({ targetName, userName, userSlug, onComplete }: ScratchCardProps) {
  const [boxContents, setBoxContents] = useState<string[]>([])
  const [foundCount, setFoundCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [revealedBoxes, setRevealedBoxes] = useState<Set<number>>(new Set())
  const canvasRefs = useRef<{ [key: number]: HTMLCanvasElement | null }>({})
  const isDraggingRef = useRef<{ [key: number]: boolean }>({})
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  // Lade alle Namen und initialisiere Box-Inhalte
  useEffect(() => {
    async function initializeBoxes() {
      const allNames = await getAllUserNames(userSlug)
      
      if (allNames.length === 0) {
        console.error('No names available')
        return
      }

      const contents: string[] = []
      const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
      
      // Mische die Positionen
      for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]]
      }

      // Setze 3x den Zielnamen an zufälligen Positionen
      const targetPositions = positions.slice(0, 3)
      
      // Für die anderen 6 Positionen: Zufällige Namen aus allen verfügbaren
      const otherNames = allNames.filter(name => name !== targetName)
      const availableNames = [...otherNames]
      
      // Fülle alle 9 Boxen
      for (let i = 0; i < 9; i++) {
        if (targetPositions.includes(i)) {
          contents[i] = targetName
        } else {
          if (availableNames.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableNames.length)
            contents[i] = availableNames[randomIndex]
          } else {
            contents[i] = allNames[Math.floor(Math.random() * allNames.length)]
          }
        }
      }
      
      setBoxContents(contents)
    }

    initializeBoxes()
  }, [targetName, userSlug])

  // Initialisiere Canvas für jede Box
  useEffect(() => {
    if (boxContents.length === 0) return

    boxContents.forEach((_, index) => {
      const canvas = canvasRefs.current[index]
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Setze Canvas Größe
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Zeichne Scratch-Oberfläche
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, '#9CA3AF')
      gradient.addColorStop(0.5, '#6B7280')
      gradient.addColorStop(1, '#4B5563')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Textur hinzufügen
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      for (let i = 0; i < canvas.width; i += 8) {
        for (let j = 0; j < canvas.height; j += 8) {
          if ((i + j) % 16 === 0) {
            ctx.fillRect(i, j, 4, 4)
          }
        }
      }
    })
  }, [boxContents])

  const scratch = (index: number, x: number, y: number) => {
    const canvas = canvasRefs.current[index]
    if (!canvas || revealedBoxes.has(index) || isComplete) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Rubbel die Oberfläche weg
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, 2 * Math.PI)
    ctx.fill()

    // Beim ersten Rubbeln direkt als gerubbelt markieren
    if (!revealedBoxes.has(index)) {
      checkAndReveal(index)
    }
  }

  const getCoordinates = (index: number, event: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRefs.current[index]
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const x = 'touches' in event 
      ? event.touches[0].clientX - rect.left 
      : event.clientX - rect.left
    const y = 'touches' in event 
      ? event.touches[0].clientY - rect.top 
      : event.clientY - rect.top

    return { x, y }
  }

  const handleStart = (index: number, event: React.MouseEvent | React.TouchEvent) => {
    if (isComplete) return
    event.preventDefault()
    isDraggingRef.current[index] = true
    const coords = getCoordinates(index, event)
    if (coords) {
      scratch(index, coords.x, coords.y)
    }
  }

  const handleMove = (index: number, event: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingRef.current[index] || isComplete) return
    event.preventDefault()
    const coords = getCoordinates(index, event)
    if (coords) {
      scratch(index, coords.x, coords.y)
    }
  }

  const handleEnd = (index: number) => {
    isDraggingRef.current[index] = false
  }

  const checkAndReveal = (index: number) => {
    // Markiere Box als gerubbelt (Name wird sichtbar, aber Canvas bleibt)
    setRevealedBoxes(prev => new Set(prev).add(index))
    
    if (boxContents[index] === targetName) {
      setFoundCount(prev => {
        const newCount = prev + 1
        if (newCount === 3) {
          // Alle 3 gefunden - direkt zum Ergebnis, kein "Opening box"
          setIsComplete(true)
          setTimeout(() => {
            onComplete()
          }, 1000)
        }
        return newCount
      })
    }
  }

  return (
    <div className="w-full text-center relative z-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-2 text-winter-blue mb-4"
      >
        🎫 Гребенка 🎫
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-700 mb-2 text-lg font-medium"
      >
        Гребни ги кутиите!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-6 py-2 shadow-md">
          <span className="text-2xl">🎯</span>
          <span className="font-bold text-winter-blue">
            {foundCount} / 3 најдено
          </span>
        </div>
      </motion.div>

      {isComplete && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4"
        >
          <div className="bg-winter-purple text-white rounded-xl p-4 font-bold text-xl animate-pulse">
            🎉 Успеано! 🎉
          </div>
        </motion.div>
      )}

      {!isComplete && (
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 px-2">
          {boxContents.map((content, index) => {
            const isTarget = content === targetName
            
            return (
              <div
                key={index}
                className="aspect-square relative rounded-xl overflow-hidden"
                style={{ touchAction: 'none' }}
              >
                {/* Hintergrund mit Name - ALLE GLEICHE FARBE */}
                <div className="absolute inset-0 bg-gray-100 text-gray-600 flex items-center justify-center rounded-xl z-0">
                  <span className="text-xl md:text-2xl font-bold text-center px-2">
                    {content}
                  </span>
                </div>

                {/* Canvas für Scratch-Oberfläche - bleibt für Animation */}
                <canvas
                  ref={(el) => {
                    canvasRefs.current[index] = el
                  }}
                  className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing transition-opacity duration-300"
                  style={{
                    touchAction: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    pointerEvents: revealedBoxes.has(index) ? 'none' : 'auto',
                    opacity: revealedBoxes.has(index) ? 0 : 1,
                  }}
                  onMouseDown={(e) => !revealedBoxes.has(index) && handleStart(index, e)}
                  onMouseMove={(e) => !revealedBoxes.has(index) && handleMove(index, e)}
                  onMouseUp={() => handleEnd(index)}
                  onMouseLeave={() => handleEnd(index)}
                  onTouchStart={(e) => !revealedBoxes.has(index) && handleStart(index, e)}
                  onTouchMove={(e) => !revealedBoxes.has(index) && handleMove(index, e)}
                  onTouchEnd={() => handleEnd(index)}
                />
              </div>
            )
          })}
        </div>
      )}

      {foundCount > 0 && foundCount < 3 && !isComplete && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600"
        >
          Уште {3 - foundCount} {foundCount === 1 ? 'пат' : 'пати'}!
        </motion.p>
      )}

      {!isComplete && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500 mt-4"
        >
          💡 Совет: Држи и движи прст/глувче за гребене
        </motion.p>
      )}
    </div>
  )
}
