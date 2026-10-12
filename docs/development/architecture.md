# Architecture

Astro prerenders public pages. React islands provide state only where needed:
asset filtering, select controls, calculator workspaces, and inquiry review.
Navigation, site search, and directory filtering use small browser scripts.

```mermaid
flowchart TD
  Data[Content and asset records] --> Astro[Astro build]
  Astro --> Static[Prerendered pages and documents]
  Static --> Browser[Visitor browser]
  Browser --> Islands[React interactive components]
  Islands --> Local[Local calculations and form draft]
  Islands --> API[POST /api/send-email]
  API --> Validate[Validate fields, consent, origin, and size]
  Validate --> Provider[Configured Formcarry endpoint]
  Provider --> Status[Success or recoverable error]
  Status --> Browser
```

## Boundaries

- `src/pages/` owns routes, metadata, asset detail pages, and calculator guides.
- `src/components/` owns shared presentation and reusable controls.
- `src/client/` owns search, navigation, and static directory interactions.
- `src/tools/` owns calculator definitions, pure arithmetic, and React controls.
- `src/server/` owns inquiry validation and delivery; the provider URL remains
  server-side.
- `public/` holds original PDFs, logos, fonts, and generated social assets.

Public pages remain readable without JavaScript. Calculators require JavaScript;
their formulas and examples remain available as static text. The inquiry page
provides a direct email option.

## Delivery and testing

Vercel receives prerendered pages plus one server function. `scripts/serve.ts`
serves built static output on an isolated loopback port for browser tests.
Those tests mock the inquiry endpoint; unit tests exercise its validation and
provider-error handling separately.

Production retains Vercel Web Analytics. Financial inputs and introduction text
are not included in custom analytics events or browser storage.

[Deployment](deployment.md) · [Back to documentation](../README.md)
