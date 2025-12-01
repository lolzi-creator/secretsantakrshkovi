# ❄️ Secret Santa Web App

Eine mobile-first Secret-Santa Web App mit Next.js, TypeScript, Tailwind CSS und Supabase.

## Features

- ✅ Mobile-first, vollständig responsive Design
- ✅ Touch-optimiert für Handys
- ✅ Helles Winter-Theme mit Schneeflocken
- ✅ Persönliche Links im Format `/santa/[slug]`
- ✅ Animierte Geschenkbox-Auswahl (Framer Motion)
- ✅ Supabase Backend für zentrale Datenverwaltung
- ✅ Kontrolle darüber, wer bereits gezogen hat
- ✅ Zentriertes Layout mit max. 480px Breite

## Technologie-Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion (Animationen)
- Supabase (Backend/Datenbank)

## Installation

```bash
npm install
```

## Supabase Setup

**Wichtig:** Diese App benötigt Supabase als Backend. Folge der [Supabase Setup Anleitung](./ENV_SETUP.md) für detaillierte Schritte.

Kurzfassung:
1. Erstelle ein Supabase Projekt
2. Führe das SQL Schema aus (`supabase-schema.sql`)
3. Erstelle `.env.local` mit deinen Supabase Credentials
4. Füge Benutzer in die Datenbank ein

## Entwicklung

```bash
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

## Nutzung

1. **Benutzer in Supabase hinzufügen:**
   - Via SQL Editor oder Table Editor
   - Benötigte Felder: `slug`, `username`, `target_name`

2. **Links verteilen:**
   - Jeder Benutzer bekommt einen Link: `/santa/[slug]`
   - Beispiel: `/santa/alice` öffnet die Seite für Alice

3. **Kontrolle:**
   - In Supabase siehst du, wer bereits gezogen hat
   - Feld `has_picked` zeigt den Status
   - Feld `picked_target` zeigt, wer gezogen wurde

## Datenbank Schema

Die `users` Tabelle speichert:
- `slug`: Eindeutiger Link-Identifikator
- `username`: Name des Benutzers
- `target_name`: Wer soll beschenkt werden
- `has_picked`: Ob bereits gezogen wurde
- `picked_target`: Wer wurde gezogen (optional)

## Beispiel-Links

- `/santa/alice`
- `/santa/bob`
- `/santa/charlie`
- etc.

## Dokumentation

- [Supabase Setup Anleitung](./ENV_SETUP.md) - Detaillierte Anleitung zum Einrichten von Supabase

## Anpassungen

### Benutzer hinzufügen

Via Supabase SQL Editor:
```sql
INSERT INTO users (slug, username, target_name) VALUES
  ('neuer-user', 'Neuer User', 'Ziel-Name');
```

Oder via Supabase Dashboard Table Editor.

### Design anpassen

- Farben: `tailwind.config.ts`
- Komponenten: `components/`
- Styling: `app/globals.css`
