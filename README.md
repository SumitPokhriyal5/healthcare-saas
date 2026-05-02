# Healthcare SaaS

A B2B healthcare frontend: authentication, dashboard, analytics, and a patient management module — built with React, TypeScript, and Firebase.

**Live demo:** https://healthcare-saas-bice.vercel.app/

## Features

- **Authentication** — Email/password and Google OAuth via Firebase, with sign-up and sign-in flows. Sessions persist across reloads.
- **Dashboard** — KPI metrics, recent activity feed, quick actions, and a notifications card.
- **Analytics** — Admissions vs. discharges line chart, department breakdown donut, and appointment status bar — all with a date-range filter.
- **Patients** — Grid and list views with a persisted toggle, full-text search, status filter, and a deep-linkable detail drawer (`/patients/:id`).
- **Notifications** — Service worker registers on load; "critical alert" demo dispatches a real OS-level notification with smart focus restoration on click.
- **Performance** — Routes are lazy-loaded and split per-page; vendor chunks (React, Recharts, Firebase) are extracted; patient list is memoized.
- **Accessibility** — Skip-to-content link, focus-visible rings, focus restoration on dialog close, `aria-live` result announcements, and reduced-motion support.


## Screenshots
### Dashboard
<img width="1728" height="958" alt="Image" src="https://github.com/user-attachments/assets/aeb77af8-89e8-4522-8a8b-bef251ec3337" />

### Analytics
<img width="1728" height="958" alt="Image" src="https://github.com/user-attachments/assets/4d35ffb6-0dea-4571-a4a8-658950d2b401" />

### Patients
<img width="1728" height="958" alt="Image" src="https://github.com/user-attachments/assets/7c1e0826-13ab-404b-98ac-ddecd52a6aa6" />

### Login
<img width="1728" height="958" alt="Image" src="https://github.com/user-attachments/assets/fbfdb9b3-779b-4410-81b0-1e6056d6a599" />

### Sign up
<img width="1728" height="958" alt="Image" src="https://github.com/user-attachments/assets/232e4507-33b6-4daf-a71c-59f319085c2d" />


## Tech stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** for styling
- **Zustand** for state (auth, UI, patients, notifications)
- **React Router v6** for routing
- **Firebase Auth** for authentication
- **Recharts** for visualizations
- **Zod** for form validation
- **Lucide React** for icons

## Getting started

### Prerequisites

- Node 18+ and npm
- A Firebase project with Authentication enabled (Email/Password + Google providers)

### Setup

```bash
git clone <repo-url> healthcare-saas
cd healthcare-saas
npm install
cp .env.example .env.local
```

Fill in `.env.local` with your Firebase web app config — find these values in **Firebase Console → Project Settings → Your apps → SDK setup and configuration**:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Enable sign-in providers in **Firebase Console → Authentication → Sign-in method**:

- **Email/Password** — toggle on
- **Google** — toggle on, set a project public-facing name and support email

### Running

```bash
npm run dev          # Dev server on http://localhost:5173
npm run build        # Production build to dist/
npm run preview      # Preview the production build
npm run typecheck    # TypeScript-only check, no emit
npm run lint         # ESLint
npm run format       # Prettier
```

### Demo credentials

You can either sign up a new account, sign in with Google, or use:

- **Email:** vediyof815@gixpos.com
- **Password:** vediyof815@gixpos.com

## Project structure

```
src/
├── modules/              # Feature modules — each owns its pages, components, types, mock data
│   ├── auth/             # Login, signup, Google OAuth, auth bootstrap
│   ├── dashboard/        # KPI cards, activity feed, notifications card, quick actions
│   ├── analytics/        # Charts and date-range filtering
│   └── patients/         # Grid/list views, search, filter, detail drawer
├── shared/               # Cross-cutting code
│   ├── components/       # Design-system primitives (Button, Card, Input, Toggle, etc.)
│   │   └── layout/       # AppShell, Sidebar, Topbar, SkipToContent
│   ├── hooks/            # useDocumentTitle, etc.
│   ├── types/            # Shared TS types (Patient, AuthUser)
│   └── utils/            # Pure helpers (initials, etc.)
├── lib/                  # External integrations and global state
│   ├── firebase/         # Firebase client init
│   ├── notifications/    # SW registration, permission handling, notify hook
│   └── store/            # Zustand stores
└── routes/               # AppRouter, ProtectedRoute, PublicOnlyRoute
```

The module structure is intentionally feature-sliced rather than type-sliced (no top-level `components/`, `pages/`, etc.). This keeps each feature self-contained and makes it easy to introduce a real micro-frontend split later — each `modules/*` folder can become its own remote with minimal refactoring.

## Architectural notes

**State management.** Zustand was chosen over Redux for the lower boilerplate and over Context for cross-module reactivity without prop drilling. Three stores: `authStore` (Firebase user, persisted), `uiStore` (view modes and sidebar state, persisted), and `patientsStore` (data and filters, in-memory). The `notificationsStore` mirrors the browser's `Notification.permission` for reactive UI.

**Auth flow.** A single `onAuthStateChanged` listener (in `AuthBootstrap`) is the source of truth for the user. Login/signup functions in `useAuth` don't `setUser` directly — they wait for the listener to fire. This keeps state consistent across tabs and after refresh.

**Routing & guards.** `ProtectedRoute` wraps the `AppShell` so every authenticated page gets the layout for free. `PublicOnlyRoute` keeps signed-in users away from `/login` and `/signup`. The `from` location is preserved on protected redirects, so a user bounced to `/login` lands on their original destination after authenticating.

**Service worker.** Registered from `public/sw.js` at root scope. Notifications use a `postMessage` from the page → `showNotification` from the SW pattern, which keeps the page in control of when alerts fire while still using the SW's persistent notification surface. Click handling on a notification focuses an existing tab and dispatches a navigation `postMessage` back to the page (so deep-linking to `/patients/:id` works from a notification click).

**Performance.** Routes are lazy-loaded, vendor chunks are split (React / Recharts / Firebase), patient cards are memoized, and the heaviest dependency (Recharts, ~390KB) only loads when the user visits Analytics. Lighthouse scores 95+ across categories on the production build.

## Known limitations

- **Mock data.** Patient and analytics data are local — no real backend.
- **Web push.** Notifications are local (page-triggered). True web push would require a VAPID server, which is out of scope for the assignment.
- **Signup redirect-back.** A user who lands on `/login` from a protected route, then clicks "Create one," is redirected to `/dashboard` after signup rather than the original target. Login itself preserves the redirect.
- **Focus trap.** The patient detail drawer auto-focuses, supports Esc, and restores focus on close, but doesn't fully cycle Tab within the dialog. A library like `focus-trap-react` would close that gap.

## Deployment

This app deploys to Vercel out of the box. The `vercel.json` at the root configures SPA fallback rewrites and the correct headers for the service worker.

```bash
npm i -g vercel
vercel              # First time — link to your Vercel account / project
vercel --prod       # Deploy to production
```

Add the `VITE_FIREBASE_*` environment variables in Vercel project settings before deploying. Then add your Vercel domain to the **Authorized domains** list in Firebase Console → Authentication → Settings, or Google sign-in will fail with `auth/unauthorized-domain`.

## License

MIT
