# 🚀 Schnell-Deployment Guide

## Vercel (5 Minuten)

1. **GitHub Repository erstellen**
   ```bash
   git init
   git add .
   git commit -m "Secret Santa App"
   # Erstelle Repo auf GitHub und push
   ```

2. **Vercel verbinden**
   - Gehe zu [vercel.com](https://vercel.com)
   - "Add New Project" → GitHub Repository auswählen
   - Environment Variables hinzufügen:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy!

3. **Fertig!** 🎉
   - Du bekommst eine URL wie: `https://deine-app.vercel.app`
   - Links: `https://deine-app.vercel.app/santa/metodij`

## User zurücksetzen

Falls alle User neu ziehen sollen:
- Supabase SQL Editor → `reset-users.sql` ausführen

## Alle User-Links

Nach dem Deployment:
- `https://deine-app.vercel.app/santa/metodij`
- `https://deine-app.vercel.app/santa/eleonora`
- `https://deine-app.vercel.app/santa/nikola`
- ... (siehe `USER_LINKS.md`)

