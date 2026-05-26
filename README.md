# LearnOS — Student Learning Dashboard

## Overview

LearnOS is a **production-ready** student learning dashboard built with **Next.js 14**, **Supabase**, **Tailwind CSS**, and **Framer Motion**. It features a premium **bento-grid layout** with animated tiles showing course progress, activity heatmaps, and real-time data from a PostgreSQL database.

The UI is **dark-themed**, fully responsive across three breakpoints (mobile, tablet, desktop), and uses **physics-based spring animations** throughout for a polished, native-feeling experience. Perfect for **senior frontend/full-stack hiring assessments**.

### 🎯 Key Features

- ✨ **Premium Landing Page** with gradient animations, feature cards, stats, and dashboard preview
- 📊 **Bento Grid Dashboard** with responsive tiles for hero, courses, activity, and achievements
- 🚀 **Server Components** for data fetching (no client waterfall, no API keys exposed)
- 🎬 **Framer Motion** spring animations with staggered page load
- 🎨 **Dark Futuristic Theme** with cyan/purple gradients and glassmorphism
- 📱 **Full Responsiveness**: desktop sidebar, tablet icon nav, mobile bottom nav
- 🔄 **Loading Skeletons** with pulse animations and graceful error states
- 🌐 **No Div Soup**: semantic HTML (nav, main, section, article, header)
- ⚡ **Zero Layout Shift**: only transform and opacity animations

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 14 (App Router)** | Framework — enables Server Components, streaming, nested layouts |
| **Supabase (PostgreSQL)** | Database — auto-generated REST API via `@supabase/supabase-js` |
| **Tailwind CSS** | Utility-first styling; custom CSS variables for dark theme |
| **Framer Motion** | Declarative animations — spring physics, stagger, layout animations |
| **Lucide React** | Tree-shakeable icon library with dynamic icon rendering by string name |
| **TypeScript** | End-to-end type safety with strict mode |

---

## Architecture Decisions

### Server vs Client Components

**Server Components** (no `"use client"`):
- `app/dashboard/page.tsx` — fetches courses from Supabase at request time
- Prevents client-side data waterfall and exposes no API keys to the browser

**Client Components** (`"use client"`):
- All animated components (`BentoGrid`, `HeroTile`, `CourseTile`, `ActivityTile`, `ProgressBar`, `Sidebar`)
- Login & landing pages with form state and interactivity
- `app/dashboard/error.tsx` — Next.js requires error boundaries to be client components

This separation ensures:
- Database fetch happens on the server with zero client-side waterfall
- All interactive animations remain client-side with DOM access
- Type-safe prop passing across the server/client boundary

### Data Flow

```
Supabase (PostgreSQL)
    ↓ (server-side fetch in page.tsx)
Server Component (app/dashboard/page.tsx)
    ↓ (props: Course[])
BentoGrid Client Component
    ├→ HeroTile (welcome, streak, XP progress)
    ├→ CourseTile × N (from database)
    └→ ActivityTile (contribution heatmap)
```

The server component owns all async data fetching. Data is serialized as plain JSON props at the server/client boundary — **no client-side fetch**, **no loading spinners for initial data**, **no API keys exposed**.

---

## Animation Strategy

All animations use **Framer Motion** with spring physics (`type: "spring"`) for organic, physically-grounded movement:

```ts
// Standard spring used throughout
{ type: "spring", stiffness: 300, damping: 30 }
```

### Performance Principles

1. **Only `transform` and `opacity`** are animated (no `width`, `height`, `top`, etc.) — stays on the compositor thread, prevents layout thrashing
2. **Exception**: `ProgressBar` animates `width` intentionally as it's a bounded, non-layout-shifting element
3. **Viewport Triggers**: `useInView` in `ProgressBar` ensures animations only fire when visible
4. **Staggered Cascade**: `staggerChildren` in `BentoGrid` creates cascading tile animations
5. **Shared Element Transitions**: `layoutId` in `Sidebar` enables smooth active nav indicator animation

### Staggered Page Load

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
}
```

---

## Dashboard Layout

### Bento Grid Structure

```
┌─────────────────────────────────────────┐
│           HERO TILE (Full width)        │
│  Welcome back, Name · Streak · XP bar   │
├──────────┬──────────┬──────────┬────────┤
│ Course 1 │ Course 2 │ Course 3 │Course 4│
│          │          │          │        │
├─────────────────────────────────────────┤
│      ACTIVITY TILE (Full width)         │
│  Heatmap · Last 7 days bar chart        │
└─────────────────────────────────────────┘
```

### Course Tiles

- **Dynamic Lucide Icons** rendered from `icon_name` field in database
- **Animated Progress Bar** with count-up number animation
- **Gradient Backgrounds** with color themes (cyan, purple, green, amber)
- **Spring Hover Effects** with subtle lift and glow
- **Status Badges** (Just Started, Halfway There, Almost Done)
- **Last Active Time** displayed with clock icon

### Responsive Behavior

- **Desktop**: Full sidebar (240px) + main content
- **Tablet**: Collapsed sidebar (60px icons) + main content
- **Mobile**: Bottom navigation bar + full-width content

---

## Supabase Setup

### Database Schema

```sql
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Seed Data

```sql
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'Code2'),
  ('System Design Fundamentals', 45, 'Database'),
  ('TypeScript Mastery', 90, 'FileCode'),
  ('Node.js Backend Development', 30, 'Server');
```

> The `icon_name` column stores a Lucide React icon name as a string. `CourseTile` dynamically resolves this to the actual component via `(LucideIcons as any)[course.icon_name]` with `BookOpen` fallback.

---

## Getting Started

### Prerequisites

- **Node.js 18+**
- **A [Supabase](https://supabase.com) account** (free tier works fine)
- **Git**

### Installation Steps

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd learnos_upgraded
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase project URL and anon key:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project → Settings → API
   - Copy `Project URL` and `anon` public key

3. **Create the database table**
   - Go to Supabase → SQL Editor
   - Run the `CREATE TABLE` statement from [Database Schema](#database-schema)

4. **Seed sample data**
   - Run the `INSERT INTO` statement from [Seed Data](#seed-data)

5. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

> **Note:** If Supabase isn't connected, the dashboard automatically falls back to hard-coded demo data so you can see the UI immediately.

---

## File Structure

```
.
├── app/
│   ├── page.tsx                  # Landing page (hero, features, stats, preview)
│   ├── login/
│   │   └── page.tsx              # Login/signup with form validation
│   ├── dashboard/
│   │   ├── page.tsx              # Server component (fetches from Supabase)
│   │   ├── error.tsx             # Error boundary for dashboard
│   │   └── loading.tsx           # Loading skeleton UI
│   ├── profile/
│   ├── courses/
│   ├── activity/
│   ├── settings/
│   ├── layout.tsx                # Root layout with Sidebar
│   └── globals.css               # Tailwind + CSS variables
├── components/
│   ├── LayoutWrapper.tsx         # Client wrapper for conditional sidebar margin
│   ├── dashboard/
│   │   ├── Sidebar.tsx           # Desktop/tablet/mobile navigation
│   │   ├── HeroTile.tsx          # Welcome, streak counter, XP progress
│   │   ├── CourseTile.tsx        # Individual course card with progress bar
│   │   ├── ActivityTile.tsx      # Contribution heatmap + bar chart
│   │   ├── ProgressBar.tsx       # Animated progress bar with count-up
│   │   └── Sidebar.module.css    # Sidebar styles
│   └── ui/
│       ├── BentoGrid.tsx         # Main dashboard grid layout
│       └── SkeletonCard.tsx      # Loading skeleton with pulse animation
├── lib/
│   ├── supabase.ts               # Supabase client initialization
│   └── types.ts                  # TypeScript interfaces (Course, NavItem)
├── .env.example                  # Environment variables template
├── tailwind.config.ts            # Tailwind configuration with CSS variables
├── tsconfig.json                 # TypeScript strict mode config
└── package.json                  # Dependencies and scripts
```

---

## Key Technical Challenges & Solutions

### 1. Server/Client Boundary with Supabase SSR

**Challenge:** `@supabase/ssr` requires `cookies()` from `next/headers` (Server Component only), but animated tiles need `"use client"`. Can't pass Supabase client across boundary.

**Solution:** Server component (`page.tsx`) fetches data and passes it as plain JSON props (`Course[]`) to client `BentoGrid`. Supabase client never touches the client bundle. Error state propagated as nullable string prop.

### 2. Dynamic Icon Rendering from String Name

**Challenge:** Course records store icon name as string (e.g., `"Code2"`). React requires uppercase component references, not strings.

**Solution:** Import entire Lucide namespace and index with the string:
```tsx
import * as LucideIcons from 'lucide-react'
const IconComponent = (LucideIcons as any)[course.icon_name] ?? LucideIcons.BookOpen
```

### 3. Progress Bar Animation Timing

**Challenge:** Progress bars should animate only when scrolled into view, with count-up number synchronized to bar fill.

**Solution:** Use `useInView` from Framer Motion with `once: true` and `-20px` margin. Count-up driven by `requestAnimationFrame` loop with easeOutCubic curve, both start simultaneously.

### 4. Zero Layout Shift with Animations

**Challenge:** Animating `width`, `height`, `top` causes layout thrashing and jank.

**Solution:** **Only animate `transform` and `opacity`** throughout. Use `scale()` instead of `width` changes, `translateY()` instead of `height` changes. Exception: ProgressBar's `width` animation is bounded and non-layout-shifting.

### 5. Responsive Navigation Without Layout Shift

**Challenge:** Switching between desktop sidebar, tablet icons, and mobile bottom nav without content jumping.

**Solution:** Use a client `LayoutWrapper` that conditionally applies `md:ml-[240px]` based on pathname. `Sidebar` returns `null` on `/` and `/login`. Mobile bottom nav is `fixed` at bottom.

### 6. Logout Flow with Landing Page

**Challenge:** After logout, should show landing page (with stats, features, preview) not just sign-in button.

**Solution:** Premium landing page (`app/page.tsx`) has hero, feature cards, stats section, dashboard preview mockup, and multiple CTAs. Logout redirects to `/` instead of `/login`.

---

## Performance Optimizations

1. **Server-side Data Fetching**: No client-side API calls for initial dashboard data
2. **Suspense Boundaries**: `<Suspense>` wrapper with skeleton fallback prevents content flash
3. **Image Optimization**: Lucide icons are imported, not loaded as images
4. **CSS-in-JS Minimization**: Inline styles only where necessary (component logic), Tailwind utilities elsewhere
5. **Spring Animations**: Physics-based instead of time-based (feels smoother, no jank)
6. **Transform Only**: No expensive `width`/`height`/`top` animations that cause reflows

---

## Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Vercel auto-detects Next.js and deploys
# No additional config needed!
```

### Docker

```bash
docker build -t learnos .
docker run -p 3000:3000 learnos
```

### Environment Variables on Vercel

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy

---

## Hiring Assessment Checklist

✅ **Next.js 14 App Router** — Using latest App Router with server/client split  
✅ **Server Components** — Dashboard data fetching at request time, zero API exposure  
✅ **Tailwind CSS Dark Theme** — Custom CSS variables, cyan/purple/green gradients, glassmorphism  
✅ **Framer Motion** — Spring animations, stagger children, layout animations, hover effects  
✅ **Bento Grid Dashboard** — Responsive layout, hero tile, course tiles, activity tile  
✅ **Responsive Navigation** — Desktop sidebar, tablet icons, mobile bottom nav  
✅ **Loading Skeletons** — Suspense fallback with skeleton cards and pulse animations  
✅ **Error States** — Graceful error banner with demo mode fallback  
✅ **Semantic HTML** — nav, main, section, article, header (no div soup)  
✅ **Zero Layout Shift** — Only transform and opacity animations, no width/height changes  
✅ **Dynamic Icons** — Lucide icons rendered by string name from database  
✅ **Premium Landing Page** — Hero, features, stats, dashboard preview, multiple CTAs  
✅ **Type Safety** — End-to-end TypeScript with strict mode  
✅ **Production Ready** — Error handling, fallbacks, responsive, accessible  

---

## Contributing

Pull requests welcome! Please ensure:
- TypeScript passes type check
- Tailwind classes follow naming conventions
- Animations respect performance guidelines (transform + opacity only)
- Components are properly typed with interfaces

---

## License

MIT © 2026 LearnOS

