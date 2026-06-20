# Portfolio — Nissrine Bussenet

Portfolio personnel de Nissrine Bussenet, développeuse fullstack junior en reconversion professionnelle.

## Stack

- **Framework** : Next.js 16 (App Router, Turbopack)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS v4
- **API** : Groq (llama-3.3-70b) pour le chat IA, Resend pour les emails
- **Déploiement** : Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | Clé API Groq pour le chat IA | Oui (pour le chat) |
| `RESEND_API_KEY` | Clé API Resend pour l'envoi d'emails | Oui (pour le RDV) |
| `EMAIL_TO` | Email destinataire des demandes RDV | Non (défaut: niss91@icloud.com) |

## Project Structure

```
app/
  api/
    chat/route.ts    # API route — Chat IA (Groq)
    rdv/route.ts     # API route — Demande de RDV (Resend)
  cv/page.tsx        # Page CV interactif avec tabs
  portfolio/page.tsx # Page portfolio
  page.tsx           # Page d'accueil
components/
  cv/                # Composants du CV
  home/              # Composants de la page d'accueil
  portfolio/         # Composants du portfolio
constants/           # Données statiques (projets, expériences, etc.)
hooks/               # Custom hooks (useChat, useRdv)
types/               # TypeScript interfaces
```

## Scripts

```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```
