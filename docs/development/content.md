# Content and branding

## Editing map

| Content                                         | Source                    |
| ----------------------------------------------- | ------------------------- |
| Services, navigation, FAQs, transaction records | `src/content/site.ts`     |
| Published asset data                            | `data/assets.ts`          |
| Original announcements                          | `public/client-showcase/` |
| Historical summaries                            | `public/deal-summaries/`  |
| Brand files and social image                    | `public/brand/`           |
| Social-image generator                          | `scripts/generate-og.mjs` |
| Layout and responsive styling                   | `src/styles/`             |

## Safe content updates

Confirm source information before changing asset stages, claims, deal values, or
availability. Preserve source PDF filenames so inbound links continue working.
Asset route identifiers should remain stable; changing an identifier
requires updating links and any redirects.

```mermaid
flowchart LR
  Evidence[Confirm source material] --> Edit[Update the relevant record]
  Edit --> Preview[Review desktop and mobile]
  Preview --> Gate[Run the shared quality gate]
  Gate --> Commit[Commit and push]
```

JEA’s blue `#2563EB` and DNA mark come from the original live website. See
[brand provenance](../brand.md) for the supporting palette and typography.

## Social preview

Run `bun run og` after editing the generator, icons, or source photograph. Inspect the generated
1200 × 630 PNG at `public/brand/social.png`, then commit both SVG and PNG.
The site metadata and README reference that PNG. Social platforms may cache it
until their next recrawl.

The renderer uses system Georgia and Arial fonts with serif/sans-serif fallbacks;
regenerate on the same design workstation for matching typography. CI verifies
the committed dimensions and references rather than rewriting the image.

[Back to documentation](../README.md)

## Editorial photographs

Two locally hosted, lazy-loaded WebP photographs add context on Services and
Approach. These are illustrative stock images, not photographs of JEA’s team or
clients. Their original sources and credits are preserved in the captions:

- [Laboratory research](https://unsplash.com/photos/1fvqUP-xaYQ): National Cancer Institute / Daniel Sone.
- [Collaboration](https://unsplash.com/photos/KdeqA3aTnBY): Dylan Gillis.

Both are provided under the [Unsplash License](https://unsplash.com/license).
Use `EditorialImage.astro` for consistent proportions, alt text, and credits.
