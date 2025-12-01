import { supabase, DatabaseUser } from './supabase'

export interface User {
  slug: string
  userName: string
  hasPicked: boolean
  pickedTarget: string | null
}

/**
 * Holt einen User anhand des Slugs aus Supabase
 */
export async function getUserBySlug(slug: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching user:', error)
      return null
    }

    if (!data) {
      return null
    }

    return {
      slug: data.slug,
      userName: data.username,
      hasPicked: data.has_picked || false,
      pickedTarget: data.picked_target,
    }
  } catch (error) {
    console.error('Error in getUserBySlug:', error)
    return null
  }
}

/**
 * Zieht zufällig einen anderen User (nicht sich selbst)
 * Stellt sicher, dass bereits gezogene Personen nicht nochmal gezogen werden
 * Verhindert Race Conditions durch doppelte Prüfung
 */
export async function pickRandomTarget(currentUserSlug: string): Promise<string | null> {
  try {
    // Prüfe zuerst, ob der User bereits gezogen hat
    const currentUserData = await getUserBySlug(currentUserSlug)
    if (currentUserData?.hasPicked && currentUserData?.pickedTarget) {
      // User hat bereits gezogen, gib das gespeicherte Ergebnis zurück
      return currentUserData.pickedTarget
    }

    // Hole alle User (frisch aus DB)
    const { data: allUsers, error: fetchError } = await supabase
      .from('users')
      .select('slug, username, picked_target, has_picked')

    if (fetchError) {
      console.error('Error fetching users:', fetchError)
      return null
    }

    if (!allUsers || allUsers.length === 0) {
      console.error('No users found')
      return null
    }

    // Finde den aktuellen User
    const currentUser = allUsers.find(u => u.slug === currentUserSlug)
    if (!currentUser) {
      console.error('Current user not found')
      return null
    }

    // Prüfe nochmal ob bereits gezogen wurde (Race Condition Schutz)
    if (currentUser.has_picked && currentUser.picked_target) {
      return currentUser.picked_target
    }

    // Hole alle bereits gezogenen Personen (Case-insensitive Vergleich)
    const alreadyPicked = allUsers
      .filter(u => u.has_picked && u.picked_target)
      .map(u => u.picked_target!.toLowerCase().trim())
      .filter((target): target is string => target !== null && target !== '')

    // Verfügbare Ziele: Alle User außer sich selbst und bereits gezogene
    const availableTargets = allUsers
      .filter(u => {
        // Nicht sich selbst
        if (u.slug === currentUserSlug) return false
        // Nicht bereits gezogen (Case-insensitive)
        const usernameLower = u.username.toLowerCase().trim()
        if (alreadyPicked.includes(usernameLower)) return false
        return true
      })
      .map(u => u.username)

    if (availableTargets.length === 0) {
      console.warn('No available targets - all users already picked')
      // Fallback: Alle außer sich selbst (falls alle schon gezogen wurden)
      const fallbackTargets = allUsers
        .filter(u => u.slug !== currentUserSlug)
        .map(u => u.username)
      
      if (fallbackTargets.length === 0) {
        console.error('No other users found')
        return null
      }
      
      // Zufällig aus Fallback wählen
      const randomIndex = Math.floor(Math.random() * fallbackTargets.length)
      const pickedTarget = fallbackTargets[randomIndex]
      
      // Speichern
      const { error: updateError } = await supabase
        .from('users')
        .update({
          has_picked: true,
          picked_target: pickedTarget,
          updated_at: new Date().toISOString(),
        })
        .eq('slug', currentUserSlug)
      
      if (updateError) {
        console.error('Error saving picked target:', updateError)
        return null
      }
      
      return pickedTarget
    }

    // Zufällig aus verfügbaren Zielen wählen
    // Max 3 Versuche um Race Conditions zu vermeiden
    let pickedTarget: string | null = null
    let attempts = 0
    const maxAttempts = 3

    while (!pickedTarget && attempts < maxAttempts) {
      attempts++
      
      // Hole frische Daten vor jedem Versuch (Race Condition Schutz)
      const { data: freshUsers, error: freshError } = await supabase
        .from('users')
        .select('slug, username, picked_target, has_picked')

      if (freshError || !freshUsers) {
        console.error('Error fetching fresh users:', freshError)
        break
      }

      // Prüfe nochmal ob aktueller User bereits gezogen hat
      const freshCurrentUser = freshUsers.find(u => u.slug === currentUserSlug)
      if (freshCurrentUser?.has_picked && freshCurrentUser?.picked_target) {
        return freshCurrentUser.picked_target
      }

      // Aktualisiere Liste der bereits gezogenen Personen
      const freshAlreadyPicked = freshUsers
        .filter(u => u.has_picked && u.picked_target)
        .map(u => u.picked_target!.toLowerCase().trim())
        .filter((target): target is string => target !== null && target !== '')

      // Verfügbare Ziele aktualisieren
      const freshAvailableTargets = freshUsers
        .filter(u => {
          if (u.slug === currentUserSlug) return false
          const usernameLower = u.username.toLowerCase().trim()
          if (freshAlreadyPicked.includes(usernameLower)) return false
          return true
        })
        .map(u => u.username)

      if (freshAvailableTargets.length === 0) {
        console.warn('No available targets after fresh check')
        break
      }

      // Zufällig wählen
      const randomIndex = Math.floor(Math.random() * freshAvailableTargets.length)
      const candidateTarget = freshAvailableTargets[randomIndex]

      // Finale Prüfung: Ist diese Person wirklich noch verfügbar?
      const targetUser = freshUsers.find(u => u.username === candidateTarget)
      if (!targetUser) {
        continue // Versuch erneut
      }

      // Prüfe ob diese Person bereits gezogen wurde (nochmal sicherstellen)
      const targetIsPicked = freshUsers.some(
        u => u.has_picked && u.picked_target?.toLowerCase().trim() === candidateTarget.toLowerCase().trim()
      )

      if (targetIsPicked) {
        // Diese Person wurde gerade gezogen, versuche nächste
        continue
      }

      // Versuche zu speichern
      const { error: updateError, data: updateData } = await supabase
        .from('users')
        .update({
          has_picked: true,
          picked_target: candidateTarget,
          updated_at: new Date().toISOString(),
        })
        .eq('slug', currentUserSlug)

      if (updateError) {
        console.error(`Attempt ${attempts}: Error saving picked target:`, updateError)
        // Prüfe ob User inzwischen bereits gezogen hat
        const retryUser = await getUserBySlug(currentUserSlug)
        if (retryUser?.pickedTarget) {
          return retryUser.pickedTarget
        }
        continue // Versuch erneut
      }

      // Verifiziere dass wirklich gespeichert wurde
      if (updateData) {
        // Nochmal final prüfen: Wurde diese Person vielleicht gleichzeitig von jemand anderem gezogen?
        const verifyCheck = await supabase
          .from('users')
          .select('username, picked_target, has_picked')
          .eq('username', candidateTarget)
          .single()

        if (verifyCheck.data) {
          // Prüfe ob mehrere User diese Person gezogen haben
          const allPickers = await supabase
            .from('users')
            .select('slug, username, picked_target')
            .eq('picked_target', candidateTarget)

          if (allPickers.data && allPickers.data.length > 1) {
            // Problem: Mehrere User haben diese Person gezogen!
            console.error(`DUPLICATE PICK DETECTED: ${candidateTarget} was picked by multiple users!`)
            // Versuche es mit einer anderen Person
            continue
          }

          // Alles gut - diese Person wurde nur von uns gezogen
          pickedTarget = candidateTarget
          break
        }
      }
    }

    if (!pickedTarget) {
      console.error('Failed to pick a target after', maxAttempts, 'attempts')
      return null
    }

    return pickedTarget
  } catch (error) {
    console.error('Error in pickRandomTarget:', error)
    return null
  }
}

/**
 * Holt alle User-Namen (für Rubbellos)
 */
export async function getAllUserNames(excludeSlug?: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username, slug')

    if (error) {
      console.error('Error fetching all users:', error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    return data
      .filter(u => !excludeSlug || u.slug !== excludeSlug)
      .map(u => u.username)
  } catch (error) {
    console.error('Error in getAllUserNames:', error)
    return []
  }
}

/**
 * Erstellt einen neuen User (für Admin/Setup)
 * targetName wird nicht mehr benötigt - wird zufällig gezogen
 */
export async function createUser(
  slug: string,
  username: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('users')
      .insert({
        slug,
        username,
        has_picked: false,
        picked_target: null,
      })

    if (error) {
      console.error('Error creating user:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error in createUser:', error)
    return false
  }
}

