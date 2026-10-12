# <img src="public/brand/mark.svg" width="36" height="36" alt=""> JEA BizDev Consulting

[![CI](https://github.com/smeltery/jeabizdev.com/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/jeabizdev.com/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/jeabizdev.com)](https://github.com/smeltery/jeabizdev.com/releases)
![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-1.3.11-222?logo=bun&logoColor=white)
![Flox](https://img.shields.io/badge/Flox-reproducible-58A55C)
[![License](https://img.shields.io/badge/License-PolyForm_Shield-blue)](LICENSE)

A fast, accessible website for JEA’s biotech and biopharma advisory practice.
Explore partnering assets, transaction announcements, sixteen business development
tools, and a guided inquiry flow. Astro serves the pages; React powers the
interactive features. The original blue DNA identity and source documents remain.

[Visit JEA](https://www.jeabizdev.com) · [User guides](docs/README.md) · [Development](docs/development/setup.md)

![JEA — Cross-border deals. Lasting value.](public/brand/social.png)

```sh
flox activate
bun install --frozen-lockfile
bunx playwright install --only-shell chromium
bun run dev
```

Run `bun run check` inside Flox for the same gate as CI and pre-commit: formatting,
Markdown/Mermaid, source budgets, workflow/shell validation, types, unit tests,
production build, links, and desktop/mobile browser tests.

See [the documentation](docs/README.md) for using the site, editing content,
configuring inquiries, deployment, and automatic releases.

Licensed under [PolyForm Shield 1.0.0](LICENSE).
