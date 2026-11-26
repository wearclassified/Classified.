# Classified.

A minimal landing page and login interface for Classified, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Sign-in and credentials

There are no demo or default login credentials in this repository. The login and account-creation screens are frontend UI only and are not connected to an authentication service, so there is no working account ID or password to provide yet. Do not add personal passwords or other secrets to this README or the repository.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint 9 with `eslint-config-next`

## Project Structure

```text
src/
  app/
    layout.tsx          # Root layout, metadata, theme bootstrapping
    page.tsx            # Landing page
    login/page.tsx      # Login route entry
    globals.css         # Global styles and keyframes
  components/
    brand-logo.tsx
    brand-mark.tsx
    icons.tsx           # Shared SVG icon components
    settings-modal.tsx
    site-footer.tsx
  features/
    auth/components/
      login-form.tsx
  lib/
    theme.ts            # Theme preference helpers
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build
- `npm run start` - run production server
- `npm run lint` - run ESLint checks

## Theme Behavior

- Theme preference is saved in `localStorage` under `classified.theme`.
- Light/dark mode is applied before hydration to avoid flash.
- Users can toggle theme from the settings modal in the footer.

## Build Notes

- `next.config.ts` includes `turbopack.root` to ensure the correct workspace root is used during builds.

## Deployment

The production project is connected to this GitHub repository on Vercel. Pushes to `main` trigger a Vercel deployment; check the Vercel project’s Deployments page for its status.

The legacy GitHub Actions workflow in `.github/workflows/deploy.yml` also deploys the static site to cPanel on pushes to `main`. It remains enabled and requires these repository secrets in **GitHub > Settings > Secrets and variables > Actions**:

- `CPANEL_DOMAIN` — cPanel server hostname
- `CPANEL_USERNAME` — your cPanel username
- `CPANEL_API_TOKEN` — a cPanel API token

Store the token only as a GitHub Actions secret; never put credentials in the repository. cPanel API tokens can access account APIs, so use one only for deployment and rotate it before it expires. Check the repository’s **Actions** tab for the cPanel workflow result.

The project is configured for static export in `next.config.ts`.
