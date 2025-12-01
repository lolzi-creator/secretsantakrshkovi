# ✅ Deployment Checkliste

## Vor dem Deployment

- [ ] Alle User in Supabase eingefügt (`insert-users-secret-santa.sql`)
- [ ] Supabase Environment Variables notiert:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Lokal getestet: `npm run dev`
- [ ] Alle Links funktionieren lokal

## Deployment Schritte

1. **Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Secret Santa App ready for deployment"
   ```

2. **GitHub Repository erstellen**
   - Erstelle auf GitHub
   - Push Code

3. **Vercel Deployment**
   - Gehe zu vercel.com
   - Import GitHub Repository
   - Setze Environment Variables
   - Deploy!

4. **Nach Deployment**
   - [ ] Teste die App-URL
   - [ ] Teste mindestens 2-3 User-Links
   - [ ] Prüfe ob Supabase Verbindung funktioniert

## User zurücksetzen (falls nötig)

Falls alle User neu ziehen sollen:
1. Gehe zu Supabase SQL Editor
2. Führe `reset-users.sql` aus
3. Alle User können dann erneut ziehen

## Alle User-Links (nach Deployment)

Ersetze `https://deine-app.vercel.app` mit deiner tatsächlichen URL:

- `https://deine-app.vercel.app/santa/metodij`
- `https://deine-app.vercel.app/santa/eleonora`
- `https://deine-app.vercel.app/santa/nikola`
- `https://deine-app.vercel.app/santa/julija`
- `https://deine-app.vercel.app/santa/marija`
- `https://deine-app.vercel.app/santa/trajce`
- `https://deine-app.vercel.app/santa/elizabeta`
- `https://deine-app.vercel.app/santa/gjorgi`
- `https://deine-app.vercel.app/santa/ace`
- `https://deine-app.vercel.app/santa/desi`
- `https://deine-app.vercel.app/santa/mihail`
- `https://deine-app.vercel.app/santa/emili`
- `https://deine-app.vercel.app/santa/anamia`
- `https://deine-app.vercel.app/santa/kire`
- `https://deine-app.vercel.app/santa/jovan`
- `https://deine-app.vercel.app/santa/cece`
- `https://deine-app.vercel.app/santa/mare`
- `https://deine-app.vercel.app/santa/miki`

