# 🚀 Deployment Anleitung

## Vercel Deployment (Empfohlen)

Vercel ist die einfachste Option für Next.js Apps.

### 1. Vorbereitung

1. **Git Repository erstellen** (falls noch nicht vorhanden):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **GitHub Repository erstellen**:
   - Gehe zu GitHub und erstelle ein neues Repository
   - Push deinen Code:
   ```bash
   git remote add origin https://github.com/dein-username/secret-santa.git
   git push -u origin main
   ```

### 2. Vercel Setup

1. **Gehe zu [vercel.com](https://vercel.com)**
2. **Sign in mit GitHub**
3. **Klicke auf "Add New Project"**
4. **Importiere dein GitHub Repository**
5. **Environment Variables hinzufügen**:
   - `NEXT_PUBLIC_SUPABASE_URL` = deine Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = dein Supabase Anon Key
6. **Klicke auf "Deploy"**

### 3. Nach dem Deployment

- Vercel gibt dir eine URL (z.B. `https://secret-santa.vercel.app`)
- Alle Links funktionieren jetzt: `https://secret-santa.vercel.app/santa/metodij`
- Bei jedem Git Push wird automatisch neu deployed

## Alternative: Andere Hosting-Anbieter

### Netlify

1. Gehe zu [netlify.com](https://netlify.com)
2. Verbinde dein GitHub Repository
3. Build Settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Environment Variables hinzufügen (wie bei Vercel)
5. Deploy!

### Self-Hosting

```bash
# Build erstellen
npm run build

# Production Server starten
npm start
```

## Wichtige Hinweise

- ✅ Environment Variables müssen in der Hosting-Plattform gesetzt werden
- ✅ `.env.local` wird NICHT mit deployed (nur für lokale Entwicklung)
- ✅ Supabase Credentials müssen öffentlich sein (anon key ist sicher)
- ✅ Nach Deployment: Teste alle Links!

## User zurücksetzen

Falls du alle User zurücksetzen möchtest (z.B. für nächstes Jahr):

1. Gehe zu Supabase SQL Editor
2. Führe `reset-users.sql` aus
3. Alle User können dann erneut ziehen

