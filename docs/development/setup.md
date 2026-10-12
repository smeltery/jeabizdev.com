# Development setup

## Locked toolchain

Install Flox 1.18.1, clone this repository, and enter its directory. Flox supplies
Bun 1.3.11, Node 24, Git, actionlint, and ShellCheck using the committed manifest
and lockfile. The environment supports macOS and Linux on Intel and ARM.

```sh
flox activate
bun install --frozen-lockfile
bunx playwright install --only-shell chromium
bun run dev
```

On a fresh Linux host, browser system libraries may also be needed:
`bunx playwright install --with-deps --only-shell chromium`. CI installs these
before invoking the shared gate.

Use Astro’s printed local URL. It can choose another port if the default is
occupied. The Maestri review portals use the local preview URL; the social preview
is available at `/brand/social.png`.

## Commands

| Command                       | Purpose                                               |
| ----------------------------- | ----------------------------------------------------- |
| `bun run dev`                 | Local Astro preview with live updates                 |
| `bun run check`               | Complete CI and pre-commit gate                       |
| `bun run format`              | Format source and documentation                       |
| `bun run typecheck`           | Astro and TypeScript diagnostics                      |
| `bun run test`                | Unit tests with mocked inquiry delivery               |
| `bun run build`               | Prerender pages and bundle the Vercel endpoint        |
| `bun run test:e2e`            | Start an isolated built-site server and test browsers |
| `bun run og`                  | Regenerate SVG and PNG social images                  |
| `flox services start preview` | Run the development preview as a Flox service         |

## Hooks and environment variables

Flox activation installs `.githooks` as this checkout’s Git hooks directory. The
pre-commit hook runs the same `scripts/check.sh` used by CI. Stage or stash
unstaged tracked changes first so checked content matches the commit.

Copy `.env.example` to `.env` for local inquiry configuration. Never commit `.env`
or credentials. Browser tests intercept inquiry delivery and do not contact JEA.

The package manager is Bun, with `bun.lock` as the only package lockfile. Update
dependencies deliberately inside Flox, then run the complete gate. Node remains
available for Astro and deployment compatibility.

[Quality checks](quality.md) · [Back to documentation](../README.md)
