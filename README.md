# Classified.

A modern login-first frontend for Classified, built with Next.js App Router, React, TypeScript, and Tailwind CSS.

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
    page.tsx            # Redirects to /login
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

GitHub Actions builds the static site and deploys it to cPanel over HTTPS whenever you push to `main`. The workflow is in `.github/workflows/deploy.yml`.

Add these repository secrets in **GitHub > Settings > Secrets and variables > Actions**:

- `CPANEL_DOMAIN` — `comet.frostserver.com`
- `CPANEL_USERNAME` — your cPanel username
- `CPANEL_API_TOKEN` — a cPanel API token

Store the token only as a GitHub Actions secret; do not put it in the repository or share it in chat. cPanel API tokens can access all APIs available to your account, so use one only for deployment and rotate it before it expires. Once the secrets are set, every push to `main` triggers a build and deployment; check the repository’s **Actions** tab for the result.

The project is configured for static export in `next.config.ts`, so it can be served directly by cPanel without a Node.js server.
