# LearnOS — Student Learning Dashboard

## Overview

LearnOS is a production-ready student learning dashboard built with Next.js 14, Supabase, Tailwind CSS, and Framer Motion. It features a bento-grid layout with animated tiles showing course progress, activity heatmaps, and real-time data from a PostgreSQL database.

The UI is dark-themed, fully responsive across three breakpoints (mobile, tablet, desktop), and uses physics-based spring animations throughout for a polished, native-feeling experience.

---

## Tech Stack

| Technology | Role |
|---|---|
| **Next.js 14 (App Router)** | Framework — enables server components, streaming, and nested layouts |
| **Supabase** | PostgreSQL database + auto-generated REST API via `@supabase/ssr` |
| **Tailwind CSS** | Utility-first styling; custom CSS variables for the dark theme |
| **Framer Motion** | Declarative animations — spring physics, stagger, layout animations |
| **Lucide React** | Tree-shakeable icon library with dynamic icon rendering by string name |
| **TypeScript** | End-to-end type safety with strict mode |

---

## Architecture Decisions

### Server vs Client Components

**Server Components** (no `"use client"`):
- `app/dashboard/page.tsx` — fetches courses from Supabase at request time; never ships the Supabase client to the browser

**Client Components** (`"use client"`):
- All animated components (`BentoGrid`, `HeroTile`, `CourseTile`, `ActivityTile`, `ProgressBar`, `Sidebar`) — Framer Motion requires a DOM environment
- `app/dashboard/error.tsx` — Next.js requires error boundaries to be client components

This separation means the database fetch happens on the server with no client-side waterfall, while all interactive animations remain client-side.

### Data Flow

```
Supabase (PostgreSQL)
    ↓ (server-side fetch in page.tsx)
Server Component (app/dashboard/page.tsx)
    ↓ (props: Course[])
BentoGrid Client Component
    ↓ (props: { course: Course, index: number })
CourseTile × 4
```

The server component owns all async data fetching. Data is serialized as plain JSON props at the server/client boundary — no client-side fetch, no loading spinners for the initial data, no API keys exposed to the browser.

---

## Animation Strategy

All animations use Framer Motion with spring physics (`type: "spring"`) for organic, physically-grounded movement:

```ts
// Standard spring used throughout
{ type: "spring", stiffness: 300, damping: 20 }
```

**Performance principles:**
1. Only `transform` and `opacity` are animated (no `width`, `height`, `top`, etc.) — this prevents layout thrashing and stays on the compositor thread
2. Exception: `ProgressBar` animates `width` intentionally as it's a bounded, non-layout-shifting element
3. `useInView` in `ProgressBar` ensures animations only fire when the element enters the viewport
4. `staggerChildren` in `BentoGrid` creates a cascade effect without manually managing delays
5. `layoutId` in `Sidebar` enables smooth shared-element transitions for the active nav indicator

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

> The `icon_name` column stores a Lucide React icon name as a string. `CourseTile` dynamically resolves this to the actual component via `(LucideIcons as any)[course.icon_name]` with `BookOpen` as a fallback.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project (free tier works fine)

### Steps

1. **Clone and install**
   ```bash
   git clone <your-repo>
   cd learnos
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase project URL and anon key from the Supabase dashboard → Settings → API.

3. **Create the database table**
   Go to Supabase → SQL Editor and run the `CREATE TABLE` statement above.

4. **Seed the data**
   Run the `INSERT INTO` statement in the SQL Editor.

5. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard).

> **Note:** If Supabase isn't connected, the dashboard automatically falls back to hard-coded demo data so you can see the UI immediately.

---

## Challenges & Solutions

### 1. Server/Client boundary with Supabase SSR

**Challenge:** `@supabase/ssr` requires the `cookies()` API from `next/headers`, which only works in Server Components. But all animated components need `"use client"`. Passing the entire Supabase client across the boundary isn't possible.

**Solution:** The server component (`page.tsx`) fetches the data and passes it as a plain serializable prop (`Course[]`) to the client `BentoGrid`. The Supabase client never touches the client bundle. Error state is propagated the same way — as a nullable string prop.

### 2. Dynamic Lucide icon rendering by string name

**Challenge:** Course records store an icon name as a string (e.g. `"Code2"`). React components must be uppercase references, not strings.

**Solution:** Import the entire Lucide namespace (`import * as LucideIcons from 'lucide-react'`) and index into it with the string: `(LucideIcons as any)[course.icon_name]`. The `any` cast is the single deliberate TypeScript escape hatch in the codebase, documented with an ESLint disable comment. A `BookOpen` fallback handles unknown icon names gracefully.

### 3. ProgressBar animation triggering only on viewport entry

**Challenge:** Progress bars in off-screen tiles would animate before the user could see them, wasting the "wow moment".

**Solution:** `useInView` from Framer Motion with `once: true` and a `-20px` margin ensures each bar's fill animation fires exactly once, the first time it scrolls into view. The percentage count-up is driven by a `requestAnimationFrame` loop with an easeOutCubic curve, synchronized to start at the same time as the bar fill.
