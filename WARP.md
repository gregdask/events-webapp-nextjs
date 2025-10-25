# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```pwsh
npm run dev          # Start development server on http://localhost:3000
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint
```

## Project Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **React**: v19.2.0
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with custom utilities
- **Fonts**: Schibsted Grotesk (primary), Martian Mono (secondary)
- **WebGL**: OGL library for LightRays component
- **Analytics**: PostHog (with EU instance)

### Key Architectural Patterns

#### Path Aliases
The project uses `@/*` to reference the root directory (configured in tsconfig.json):
```typescript
import { events } from "@/lib/constants";
import EventCard from "@/components/EventCard";
```

#### Custom Tailwind Utilities
Defined in `app/globals.css`:
- `flex-center` - Flex with centered items
- `text-gradient` - Blue gradient text effect
- `glass` - Glassmorphism effect with backdrop blur
- `card-shadow` - Standard card shadow

#### CSS Custom Properties
Primary color variables defined in `:root`:
- `--color-blue`: #94eaff
- `--primary`: #59deca
- `--background`: #030708
- `--color-dark-100`, `--color-dark-200` for UI elements

#### Layout Structure
- Root layout (`app/layout.tsx`) includes:
  - Global fonts via `next/font/google`
  - Fixed `<Navbar />` component
  - Full-viewport `<LightRays />` WebGL background effect (z-index: -1)
  - Main content area

#### Component Styling
Components use Tailwind classes with custom CSS modules targeting component IDs:
- `#event-card` - Event card styling
- `#explore-btn` - Explore button styling
- `header` - Navigation header with glass effect

#### LightRays Component
Complex WebGL shader-based component using OGL that:
- Uses WebGL shaders (vertex + fragment) for animated light ray effects
- Implements intersection observer for performance (only renders when visible)
- Supports extensive customization via props (origin, color, speed, mouse tracking, etc.)
- Manages WebGL context lifecycle with proper cleanup
- Ray origin is configurable (top-center, top-center-offset, etc.)

#### Data Architecture
Event data structure (`lib/constants.ts`):
```typescript
type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}
```
Static event data exported as `events` array.

#### PostHog Configuration
PostHog analytics configured with EU instance in `next.config.ts`:
- `/ingest/*` routes proxy to `https://eu.i.posthog.com`
- `/ingest/static/*` routes proxy to `https://eu-assets.i.posthog.com`
- `skipTrailingSlashRedirect: true` required for PostHog API

### File Structure
```
app/                    # Next.js App Router
  layout.tsx           # Root layout with fonts, Navbar, LightRays
  page.tsx             # Homepage with event listing
  globals.css          # Tailwind config + custom utilities
components/            # React components
  EventCard.tsx        # Event card component (linked to event detail)
  LightRays.tsx        # WebGL animated background effect
  Navbar.tsx           # Navigation header
lib/                   # Utilities and constants
  constants.ts         # Event data types and static data
  utils.ts             # cn() utility for class merging
```

## Development Notes

### Windows Development
This project is developed on Windows. Use PowerShell for running commands.

### React Server Components
This is an App Router project using React Server Components by default. Components that need client-side interactivity (like LightRays) use `"use client"` directive.

### ESLint Configuration
Uses Next.js ESLint configs (`eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`) with custom ignores.
