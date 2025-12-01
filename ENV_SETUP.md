# Supabase Setup Anleitung

## 1. Supabase Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Erstelle ein neues Projekt (oder nutze ein bestehendes)
3. Notiere dir die **Project URL** und den **anon/public key**

## 2. Datenbank Schema erstellen

1. Gehe in deinem Supabase Projekt zu **SQL Editor**
2. Öffne die Datei `supabase-schema.sql` aus diesem Projekt
3. Kopiere den gesamten SQL-Code
4. Führe ihn im SQL Editor aus (Run Button)

Das erstellt:
- Die `users` Tabelle
- Index für schnelle Lookups
- Row Level Security Policies
- Automatisches Update von `updated_at`

## 3. Umgebungsvariablen einrichten

1. Erstelle eine `.env.local` Datei im Projekt-Root (falls nicht vorhanden)
2. Füge folgende Variablen hinzu:

```env
NEXT_PUBLIC_SUPABASE_URL=deine_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=dein_supabase_anon_key
```

**Wichtig:** Die Werte findest du unter:
- Supabase Dashboard → Settings → API
- `NEXT_PUBLIC_SUPABASE_URL` = Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon/public key

## 4. Benutzer hinzufügen

Du kannst Benutzer auf zwei Arten hinzufügen:

### Option A: Via Supabase SQL Editor

```sql
INSERT INTO users (slug, username, target_name) VALUES
  ('alice', 'Alice', 'Bob'),
  ('bob', 'Bob', 'Charlie'),
  ('charlie', 'Charlie', 'Diana');
```

### Option B: Via Supabase Dashboard

1. Gehe zu **Table Editor** → `users`
2. Klicke auf **Insert row**
3. Fülle die Felder aus:
   - `slug`: z.B. "alice" (für Link `/santa/alice`)
   - `username`: z.B. "Alice"
   - `target_name`: z.B. "Bob"
   - `has_picked`: false
   - `picked_target`: leer lassen

## 5. Dependencies installieren

```bash
npm install
```

## 6. App starten

```bash
npm run dev
```

## Datenstruktur

### users Tabelle

| Spalte       | Typ      | Beschreibung                           |
|--------------|----------|----------------------------------------|
| id           | UUID     | Primärschlüssel (automatisch)          |
| slug         | TEXT     | Eindeutiger Link-Identifikator         |
| username     | TEXT     | Name des Benutzers                     |
| target_name  | TEXT     | Wer soll beschenkt werden              |
| has_picked   | BOOLEAN  | Ob bereits gezogen wurde               |
| picked_target| TEXT     | Wer wurde gezogen (falls bereits)      |
| created_at   | TIMESTAMP| Erstellungszeitpunkt                   |
| updated_at   | TIMESTAMP| Letztes Update (automatisch)           |

## Beispiel-Links

Nach dem Setup funktionieren Links wie:
- `/santa/alice` - für Alice
- `/santa/bob` - für Bob
- etc.

## Troubleshooting

### Fehler: "Missing Supabase environment variables"
- Prüfe ob `.env.local` existiert
- Prüfe ob die Variablen korrekt gesetzt sind
- Starte den Dev-Server neu nach Änderungen

### Fehler: "relation 'users' does not exist"
- Das SQL Schema wurde noch nicht ausgeführt
- Führe `supabase-schema.sql` im SQL Editor aus

### Fehler: "new row violates row-level security policy"
- Prüfe ob die RLS Policies korrekt erstellt wurden
- Führe das Schema erneut aus falls nötig

