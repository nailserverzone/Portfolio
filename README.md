# Naila's Research Desk — Interactive Portfolio

## Quick Start in Cursor

```bash
cd Portfolio
npm install
npm run dev
```

Open http://localhost:3000

## Project Structure

```
Portfolio/
├── public/
│   └── icons/           ← Your SVG/PNG graphics (already included)
│       ├── terminal.svg         ✅ Computer monitor
│       ├── projects.svg         ✅ Book/files stack
│       ├── gallery.svg          ✅ Gallery object
│       ├── skills.svg           ✅ Pokémon pack
│       ├── aboutme.svg          ✅ About me label
│       ├── aboutmeframe.svg     ✅ Photo frame
│       ├── nailaphoto.svg       ✅ Your photo
│       ├── Naila.svg            ✅ "Naila" text
│       ├── Hi I'm.svg           ✅ "Hi I'm" text
│       ├── hillbackground.png   ✅ Desk background
│       ├── windowslogo.svg      ✅ Start button icon
│       ├── maillogo.svg         ✅ Email icon
│       ├── githublogo.svg       ✅ GitHub icon
│       ├── linkedinlogo.png     ✅ LinkedIn icon
│       └── resumelogo.svg       ✅ Resume icon
├── src/
│   ├── app/
│   │   ├── globals.css          Global styles + CSS variables
│   │   ├── layout.tsx           Root layout + fonts
│   │   └── page.tsx             Main desk scene
│   ├── components/
│   │   ├── Modal.tsx            Shared modal overlay
│   │   ├── Terminal.tsx         Working terminal with commands
│   │   ├── ProjectJournal.tsx   File browser for projects
│   │   ├── PokemonPack.tsx      Slash-to-open + skill cards
│   │   ├── AboutPanel.tsx       Bio and stats
│   │   ├── ContactPanel.tsx     Contact links
│   │   ├── GalleryPanel.tsx     Photo gallery grid
│   │   └── CatCompanion.tsx     Cat with speech bubbles
│   └── data/
│       └── projects.ts          All 14 projects + skill cards
├── .env.local                   API keys placeholder
├── package.json
├── tsconfig.json
└── next.config.js
```

## What's Working

- ✅ Isometric desk scene using your SVG graphics
- ✅ Taskbar with Start, Resume, LinkedIn, Email, GitHub
- ✅ Terminal with commands: help, about, projects, cards, contact, gallery, music, skills, secret, funfact, project [1-14], clear
- ✅ Project journal with filter tabs and detail views
- ✅ Pokémon pack slash-to-open gesture → skill cards burst
- ✅ Holographic skill cards with HP, type, moves, flip animation
- ✅ About panel with stats and resume link
- ✅ Contact panel with email, LinkedIn, GitHub, Notion
- ✅ Gallery panel with masonry grid (placeholder)
- ✅ Cat companion with random speech bubbles
- ✅ All animations (hover lift, scale, spring physics)

## Graphics You Still Need to Create & Upload

### Priority 1 — Replace placeholders
| What | Where to put it | Notes |
|------|----------------|-------|
| Gallery photos (6-10 images) | `public/gallery/` | Your graphic design work, event photos, etc. |
| Project thumbnail images (14) | `public/projects/` | One image per project for the journal detail view |
| Custom Pokémon card art (6) | `public/cards/` | One illustration per skill card |

### Priority 2 — Enhance the desk
| What | Where to put it | Notes |
|------|----------------|-------|
| Cat illustration | `public/icons/cat.svg` | Replace emoji cat with your drawn character |
| Vinyl player graphic | `public/icons/vinyl.svg` | If you want to add music section to desk |
| Contact/phone graphic | `public/icons/phone.svg` | Physical phone object for the desk |
| Desk items (pen, coffee, etc.) | `public/icons/` | Decorative objects to make desk feel alive |

### Priority 3 — Polish
| What | Where to put it | Notes |
|------|----------------|-------|
| Custom cursor | `public/cursor.png` | Optional: pixel art cursor |
| Favicon | `public/favicon.ico` | Your logo/icon |
| OG image | `public/og.png` | Social media preview (1200×630) |

## How to Add Your Graphics in Cursor

1. Drop image files into the appropriate `public/` subfolder
2. Reference them in code as `/gallery/photo1.png` (no `public` prefix)
3. For the gallery, update `GalleryPanel.tsx` to use real `<img>` tags
4. For project thumbnails, add an `image` field to each project in `projects.ts`

## Terminal Commands Reference

| Command | What it does |
|---------|-------------|
| `help` | Shows all available commands |
| `about` | Opens the About panel |
| `projects` | Opens the Project Journal |
| `cards` | Opens the Pokémon pack |
| `contact` | Opens Contact panel |
| `gallery` | Opens Photo Gallery |
| `music` | Shows BTS/vinyl collection info |
| `skills` | Lists all skills by category |
| `secret` | Easter egg! |
| `funfact` | Random fun fact |
| `project [1-14]` | Shows specific project details |
| `clear` | Clears the terminal |

## Deploying to Vercel

1. Push to GitHub
2. Go to vercel.com → Import Project
3. Select your repo
4. Deploy (zero config needed for Next.js)
5. Add custom domain if desired

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Framer Motion 12
- Google Fonts (Silkscreen, Syne, Crimson Pro)

Done