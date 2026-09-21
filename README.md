This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase setup

Install dependencies with `npm install`. Copy `.env.example` to `.env.local`
and set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
from the Supabase Connect dialog. Restart the development server after changing
these values. Configure the same variables in your deployment environment.
The local environment file is ignored by Git. Never use secret or service-role
keys in NEXT_PUBLIC_ variables.

- Client Components: import createClient from `@/lib/supabase/client`.
- Server Components, Server Actions, Route Handlers: import createClient from
  `@/lib/supabase/server` and call `await createClient()` per request.
- `proxy.ts` refreshes authentication cookies and preserves cache headers.
  Route authorization and database Row Level Security must be implemented
  when adding memo features.

This setup provides connection and session infrastructure. Database tables,
memo persistence, and sign-in/sign-up screens are not implemented yet.
See the [Supabase SSR guide](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs).

Verify changes with `npm test`, `npm run typecheck`, and `npm run lint`.

With the development server running, open
`http://localhost:3000/api/supabase/health` to check the configured Supabase URL
and publishable key. The route requests the public Auth settings endpoint without
requiring a login or database tables. It returns HTTP 200 with `{"ok":true}` on
success, or HTTP 503 with a generic error on failure (including a 5-second upstream
timeout). Responses are not cached and do not expose keys or upstream settings.
This checks API connectivity, not database queries, RLS, or sign-in behavior.

## Workspace layout

The shared header, responsive sidebar, skip link, and page container live in
`components/layout/app-shell.tsx`, composed by `app/layout.tsx`. The home page
provides empty memo, category, and tag sections. On mobile, the navigation can
be opened with the menu button and dismissed with Escape or by choosing a link.

`app/globals.css` defines shared colors, system typography, spacing, focus styles,
responsive layouts, and automatic dark mode. Reduced-motion preferences are
respected. Icons use `lucide-react`.

The layout takes inspiration from Apple's Human Interface Guidelines:
https://developer.apple.com/design/human-interface-guidelines/

This is the UI foundation only. Memo editing/persistence, Markdown rendering,
category/tag management, and user authentication are not implemented yet.
## Design consistency

Read the [design system](docs/design-system.md) at the start of each task, as
required by [AGENTS.md](AGENTS.md). It documents the current shared styles and
layout, rules for extending components, and visual checks for new pages.
Update the guide alongside changes to shared design decisions.