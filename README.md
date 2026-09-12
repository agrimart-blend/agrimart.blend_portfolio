# Agrimart.blend Portfolio

A fully interactive React + Vite portfolio website for **Agrimart.blend** (Agrim Kaushal) — 3D Artist, Blender Creator & Anime Renderer.

## Features
- **Exact loading screen** from futuristic skeleton (TiltedCard parallax + BlobCursor + progress bar)
- **Scroll-driven frame animation** — 112 UE5/Blender render frames scrub as you scroll
- **Staggered GSAP menu** — white panel slides in with animated nav items
- **TopBar scroll progress** — decorative frame overlay with progress fill
- **ParallaxHero** — fullscreen hero with scroll parallax on background image
- **Geometric dividers & grain overlay** — artistic atmospheric style
- **Work grid** — YouTube embeds + render images
- **Auto-scrolling gallery marquee**
- **Assets library** — 8 Gumroad products with direct links
- **Handpainted section** with mosaic image layout
- **Reviews section** — real customer feedback
- **Contact section** with all social links
- **Lenis smooth scroll**
- Fully responsive (mobile, tablet, desktop)

## Quick Start

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))

### Steps

```bash
# 1. Unzip the project
unzip agrimart-portfolio.zip
cd agrimart-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production
```bash
npm run build
# output goes to /dist — deploy to Netlify, Vercel, GitHub Pages, etc.
```

## Project Structure
```
agrimart-portfolio/
├── public/
│   ├── frames/        ← 112 scroll animation frames (frame0000.jpg … frame0222.jpg)
│   ├── sky.jpg        ← Anime sky / power tower render
│   ├── metro.jpg      ← Anime metro / train scene render
│   ├── room.jpg       ← Anime room interior render
│   └── ue5.jpg        ← UE5 environment render (replace with your actual UE5 render)
├── src/
│   ├── loading/
│   │   └── LoadingScreen.jsx   ← Exact skeleton loading screen
│   ├── components/
│   │   ├── BlobCursor.jsx      ← Blob cursor (exact from skeleton)
│   │   ├── StaggeredMenu.jsx   ← GSAP staggered menu (exact from skeleton)
│   │   ├── TopBar/TopBar.jsx   ← Scroll progress bar (exact from skeleton)
│   │   ├── TiltedCard.jsx      ← 3D tilt card (exact from skeleton)
│   │   ├── ParallaxHero.jsx    ← Hero section with parallax
│   │   ├── ScrollFrameCanvas.jsx ← Scroll-scrubbed frame animation
│   │   ├── WorkGrid.jsx        ← Work/renders grid
│   │   ├── AssetsSection.jsx   ← Gumroad assets
│   │   ├── HandpaintedSection.jsx
│   │   ├── ReviewsSection.jsx
│   │   ├── ContactSection.jsx
│   │   └── GeometricDivider.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── styles/
│   │   ├── global.css          ← Base styles + loader styles
│   │   └── components.css      ← All component styles
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

## Replacing the UE5 Render
Replace `public/ue5.jpg` with your actual Unreal Engine 5 render.

## Adding Your Own Frames
The scroll animation uses `public/frames/frame0000.jpg` through `frame0222.jpg` (step 2, 112 frames total).
To replace with different footage:
1. Export your video as JPEG frames named `frame0000.jpg`, `frame0002.jpg`, etc.
2. Place them in `public/frames/`
3. Update `TOTAL_FRAMES` in `ScrollFrameCanvas.jsx` if count differs.

## Deployment (Netlify)
```bash
npm run build
# Drag & drop the /dist folder to netlify.com/drop
```

## Tech Stack
- React 18 + Vite
- GSAP 3 (StaggeredMenu animations)
- Lenis (smooth scroll)
- Motion / Framer Motion (TiltedCard)
- @react-spring/web (BlobCursor trail)
- Google Fonts: Bebas Neue, Space Mono, Noto Serif JP
