# JEA BizDev Consulting – Website

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0081C9?style=flat-square&logo=framer&logoColor=white)

![JEA BizDev Consulting](assets/preview.png)

A modern, fast, and testable marketing site for JEA BizDev Consulting built with Next.js 15, TypeScript, Tailwind CSS, and Vitest. It showcases services, client deals, and available assets for partnering, and includes a contact form with validation.

## Features
- Next.js 15 App with React 18
- TypeScript with strict mode
- Tailwind CSS for styling
- Framer Motion animations
- Componentized Assets section with detail dialog
- Client Showcase fed by data module
- Contact form with zod + react-hook-form validation and toast feedback
- Vitest + React Testing Library for unit tests
- ESLint (Next.js core-web-vitals) for code quality

## Tech stack
- Framework: Next.js 15 (React 18)
- Language: TypeScript (5.4.x)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Forms: react-hook-form + zod
- Testing: Vitest, React Testing Library, JSDOM
- Linting: ESLint with eslint-config-next

## Getting started

Prerequisites:
- Node.js 18.18+ or 20+
- pnpm 9+

Install dependencies:

```bash
pnpm install
```

Run the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start the production server (after build):

```bash
pnpm start
```

## Scripts
- dev: start Next.js in development mode
- build: build the Next.js production bundle
- start: run the Next.js production server
- lint: run ESLint
- test: run the Vitest test suite once (no watch)
- test:watch: run tests in watch mode
- test:coverage: run tests with coverage report

Example:

```bash
pnpm lint
pnpm test
pnpm run test:coverage
```

## Testing
This project uses Vitest with JSDOM and React Testing Library. Path aliases ("@/*") are supported in tests via the Vitest config.

- Test environment: jsdom
- Setup file: vitest.setup.ts (extends jest-dom matchers)

You can run tests in single-run mode to avoid interactive watch:

```bash
pnpm test
```

Or in watch mode when iterating locally:

```bash
pnpm run test:watch
```

## Linting
ESLint is configured with Next.js core web vitals rules.

```bash
pnpm lint
```

## Project structure (high level)
```
app/                  # Next.js app directory
components/           # UI components
  Assets/             # Assets list, card, dialog, and utils
  ui/                 # Reusable UI primitives (buttons, cards, inputs, etc.)
data/                 # Data modules (e.g., assets, deals)
lib/                  # Library helpers (if any)
public/               # Static assets (images, PDFs)
vitest.config.ts      # Vitest configuration
vitest.setup.ts       # Vitest setup (jest-dom)
```

Path aliases are set in tsconfig.json and vitest.config.ts:
- Import with `@/...` (e.g., `@/components/Assets/AssetList`).

## Environment variables
If the contact form posts to an API route (e.g., `/api/send-email`), you may need environment variables for email or API credentials.

Create a `.env` file in the project root and add any required secrets for your email service provider or infrastructure. Example (placeholder names):

```
# example placeholders — replace with your actual keys/provider
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_USER=your-user
SMTP_PASS=your-password
CONTACT_TO=recipient@example.com
```

Note: Do not commit secrets. Use environment-specific `.env` files or your hosting provider’s secrets manager.

## Development notes
- Components under `components/Assets` share utility logic in `utils.tsx` (e.g., icon selection, stage color/text, description formatting, and client-side filtering), improving maintainability and testability.
- The Assets list supports client-side search.
- The Client Showcase data is separated in `data/deals.tsx` for Single Responsibility and easier updates.

## Deployment
This is a standard Next.js app and can be deployed to any Node.js-compatible environment (e.g., Vercel, Netlify, Render, or custom infra). Follow your platform’s Next.js deployment guide. Ensure required environment variables are configured in the hosting environment.

## Contributing
Contributions to improve code quality, tests, or docs are welcome. Please:
- Run `pnpm lint` and `pnpm test` before submitting a PR
- Keep changes focused and include tests where appropriate

## License
Proprietary — all rights reserved unless otherwise agreed by the repository owner. If you need a different license, please update this section accordingly.

## Contact
- Email: jeabizdev@gmail.com
- LinkedIn: https://www.linkedin.com/company/jea-bizdev-consulting-llc
