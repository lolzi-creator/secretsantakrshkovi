import { createUser } from './users'

/**
 * Hilfsfunktion zum Batch-Import von Benutzern
 * Nützlich für Migration von data/users.ts zu Supabase
 */
export async function importUsers(
  users: Array<{ slug: string; username: string; targetName: string }>
): Promise<{ success: number; failed: number }> {
  let success = 0
  let failed = 0

  for (const user of users) {
    try {
      const result = await createUser(user.slug, user.username, user.targetName)
      if (result) {
        success++
        console.log(`✓ User ${user.username} (${user.slug}) hinzugefügt`)
      } else {
        failed++
        console.error(`✗ User ${user.username} (${user.slug}) fehlgeschlagen`)
      }
    } catch (error) {
      failed++
      console.error(`✗ User ${user.username} (${user.slug}) Fehler:`, error)
    }
  }

  return { success, failed }
}

