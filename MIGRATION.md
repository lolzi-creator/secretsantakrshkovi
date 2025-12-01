# Migration von localStorage zu Supabase

Falls du bereits Benutzer in `data/users.ts` hast, kannst du sie einfach nach Supabase migrieren.

## Option 1: Via Supabase SQL Editor

1. Öffne die `data/users.ts` Datei
2. Kopiere die User-Daten
3. Gehe zu Supabase → SQL Editor
4. Füge sie ein:

```sql
INSERT INTO users (slug, username, target_name) VALUES
  ('alice', 'Alice', 'Bob'),
  ('bob', 'Bob', 'Charlie'),
  ('charlie', 'Charlie', 'Diana'),
  ('diana', 'Diana', 'Eve'),
  ('eve', 'Eve', 'Frank'),
  ('frank', 'Frank', 'Grace'),
  ('grace', 'Grace', 'Henry'),
  ('henry', 'Henry', 'Alice');
```

## Option 2: Via Supabase Dashboard

1. Gehe zu **Table Editor** → `users`
2. Klicke für jeden User auf **Insert row**
3. Fülle die Felder manuell aus

## Option 3: Via Script (für Entwickler)

Du kannst auch ein Node-Script erstellen, das die Migration automatisch durchführt.

```typescript
// scripts/migrate-users.ts
import { importUsers } from '@/lib/admin'

const users = [
  { slug: 'alice', username: 'Alice', targetName: 'Bob' },
  { slug: 'bob', username: 'Bob', targetName: 'Charlie' },
  // ... weitere User
]

async function migrate() {
  console.log('Starte Migration...')
  const result = await importUsers(users)
  console.log(`Fertig! Erfolgreich: ${result.success}, Fehlgeschlagen: ${result.failed}`)
}

migrate()
```

## Wichtig nach Migration

1. Stelle sicher, dass alle User in Supabase sind
2. Teste die Links (z.B. `/santa/alice`)
3. Die alte `data/users.ts` Datei wird nicht mehr verwendet, du kannst sie löschen oder behalten als Backup

