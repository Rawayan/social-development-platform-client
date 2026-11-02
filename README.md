# Together

**Together** is a community development platform where people connect, organize social events, and take action to create positive change in their communities.

**Live Site:** https://together.example.com _(replace with the deployed URL once the site is live)_

## Features

- **Discover community events** — Browse all upcoming cleanup, plantation, donation, education, and community-support events in one place.
- **Create and organize events** — Logged-in users can publish their own events with a title, description, image, location, type, and date/time.
- **Join events with one click** — Authenticated users can join any upcoming event and instantly see it in their personal joined-events list.
- **Manage your own events** — A dedicated dashboard lets creators view, edit, and delete only the events they created, keeping ownership enforced.
- **Secure authentication** — Sign up and log in with email or GitHub OAuth, with protected routes and server-verified sessions.
- **Personal profile** — Update your display name and profile image from a dedicated account page.
- **Responsive, themeable UI** — A clean, mobile-friendly interface with light/dark mode support and loading skeletons for smooth navigation.

## Tech Stack

- **Framework:** Next.js (App Router) with React and TypeScript
- **Styling:** Tailwind CSS and shadcn/ui components
- **Auth:** Better Auth (email + GitHub OAuth)
- **API:** Express.js REST API with MongoDB
- **Icons & UI:** Lucide React, Sonner toasts

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Make sure the API server is running and `NEXT_PUBLIC_API_URL` is set in `.env.local` (see `.env.example`).
