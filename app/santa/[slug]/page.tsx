'use client'

import { useEffect, useState } from 'react'
import { getUserBySlug, pickRandomTarget } from '@/lib/users'
import ModeSelector from '@/components/ModeSelector'
import GiftBoxSelector from '@/components/GiftBoxSelector'
import ScratchCard from '@/components/ScratchCard'
import RevealResult from '@/components/RevealResult'
import Snowflakes from '@/components/Snowflakes'

type GameMode = null | 'box' | 'scratch'

interface PageProps {
  params: {
    slug: string
  }
}

export default function SantaPage({ params }: PageProps) {
  const [hasOpened, setHasOpened] = useState<boolean | null>(null)
  const [targetName, setTargetName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [userFound, setUserFound] = useState<boolean>(true)
  const [isFirstOpen, setIsFirstOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [gameMode, setGameMode] = useState<GameMode>(null)
  const [scratchTargetPicked, setScratchTargetPicked] = useState<boolean>(false)

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        const user = await getUserBySlug(params.slug)
        
        if (!user) {
          setUserFound(false)
          setHasOpened(false)
          setLoading(false)
          return
        }

        setUserFound(true)
        setUserName(user.userName)
        
        // Prüfe ob bereits gezogen wurde
        if (user.hasPicked && user.pickedTarget) {
          setHasOpened(true)
          setTargetName(user.pickedTarget)
          setIsFirstOpen(false)
        } else {
          setHasOpened(false)
          // targetName wird erst beim Ziehen gesetzt
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        setUserFound(false)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [params.slug])

  const handleModeSelect = (mode: 'box' | 'scratch') => {
    setGameMode(mode)
    
    // Für Scratch-Modus: Ziehe zuerst den Namen
    if (mode === 'scratch') {
      handlePickTargetForScratch()
    }
  }

  const handlePickTargetForScratch = async () => {
    try {
      const pickedTarget = await pickRandomTarget(params.slug)
      if (pickedTarget) {
        setTargetName(pickedTarget)
        setScratchTargetPicked(true)
      } else {
        alert('Fehler beim Ziehen. Bitte versuche es erneut.')
        setGameMode(null)
      }
    } catch (error) {
      console.error('Error picking target for scratch:', error)
      alert('Fehler beim Ziehen. Bitte versuche es erneut.')
      setGameMode(null)
    }
  }

  const handleBoxOpened = async () => {
    try {
      // Ziehe zufällig ein Ziel
      const pickedTarget = await pickRandomTarget(params.slug)
      
      if (pickedTarget) {
        setTargetName(pickedTarget)
        setIsFirstOpen(true)
        setHasOpened(true)
      } else {
        console.error('Failed to pick random target')
        alert('Fehler beim Ziehen. Bitte versuche es erneut.')
      }
    } catch (error) {
      console.error('Error picking random target:', error)
      alert('Fehler beim Ziehen. Bitte versuche es erneut.')
    }
  }

  const handleScratchComplete = () => {
    // Bei Scratch-Modus: Kein "Opening box", direkt zum Ergebnis
    setIsFirstOpen(false)
    setHasOpened(true)
  }

  if (loading || hasOpened === null) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative">
        <Snowflakes />
        <div className="max-w-[480px] w-full text-center relative z-10">
          <div className="animate-pulse text-winter-accent text-xl font-semibold">
            ❄️ Вчитување...
          </div>
        </div>
      </main>
    )
  }

  // Wenn User nicht gefunden, zeige 404
  if (!userFound) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 relative">
        <Snowflakes />
        <div className="max-w-[480px] w-full text-center relative z-10">
          <h1 className="text-5xl mb-4">❄️</h1>
          <h2 className="text-2xl font-bold mb-4 text-winter-blue">
            Линкот не е пронајден
          </h2>
          <p className="text-gray-700">
            Овој Secret-Santa линк не постои.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative">
      <Snowflakes />
      <div className="max-w-[480px] w-full relative z-10">
        {hasOpened ? (
          <RevealResult targetName={targetName} userName={userName} showAnimation={isFirstOpen} />
        ) : gameMode === null ? (
          <ModeSelector userName={userName} onModeSelect={handleModeSelect} />
        ) : gameMode === 'box' ? (
          <GiftBoxSelector
            onBoxOpen={handleBoxOpened}
            userName={userName}
          />
        ) : gameMode === 'scratch' && scratchTargetPicked ? (
          <ScratchCard
            targetName={targetName}
            userName={userName}
            userSlug={params.slug}
            onComplete={handleScratchComplete}
          />
        ) : (
          <div className="text-center">
            <div className="animate-pulse text-winter-accent text-xl">
              🎫 Lade Rubbellos...
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

