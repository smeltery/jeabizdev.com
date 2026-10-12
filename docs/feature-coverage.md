# Public website feature coverage

The references were inspected from the local `bold-performance` and `adamou-financial-consulting` repositories and their live websites. Scope confirmed by the user: public website only, excluding Afin’s separate private client workspace.

| Reference capability                          | JEA implementation                                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Astro static pages, React where interactive   | Prerendered marketing and asset pages; focused React island components                                                   |
| Sticky navigation and current-page indicator  | Shared responsive header with services, advisor, approach, assets, and resource menu                                     |
| Full mobile navigation                        | Native modal drawer with descriptive links, search, resources, and inquiry CTA                                           |
| Keyboard site search                          | Cmd/Ctrl+K; category filters; arrow navigation; Enter to open; Escape and focus restoration                              |
| Dedicated services, about, and approach pages | JEA-specific content and four engagement models                                                                          |
| Professional footer                           | Identity, navigation, direct contact, external resources, legal pages, brand downloads, back-to-top                      |
| Detailed intake and submission                | Company, role, priorities, asset, territory, timeline, engagement preference, consent, direct submission                 |
| Inquiry delivery                              | Existing Formcarry endpoint, status feedback, retained details on error, in-form retry                                   |
| FAQs                                          | Native accessible disclosures on home and approach pages                                                                 |
| Brand resources                               | Original DNA mark, full wordmark, palette, typography, downloadable SVGs                                                 |
| SEO and discovery                             | Canonical metadata, social card, JSON-LD, sitemap, robots, llms.txt, 404                                                 |
| Motion and accessibility                      | CSS navigation transitions where supported, focus indicators, reduced-motion support, semantic landmarks, native dialogs |

## Existing JEA features preserved

- All nine published asset records, with original scientific descriptions on detail pages; filtering expanded to therapeutic area, stage, text, and sorting.
- Five client announcements with logos and original PDFs.
- Eight historical deal summaries.
- Both external Google Drive resource folders.
- John’s biography, career metrics, LinkedIn links, and direct email.
- Original privacy and disclaimer documents.
- Existing server-side Formcarry delivery.

## Deliberate adaptations

JEA’s scientific content and historical data are preserved with source-context notes; current clinical status has not been independently updated. No testimonials, booking availability, prices, clients, or transaction claims were invented.

The original JEA inline asset dialog has become a linkable detail page with the full material and a contextual inquiry link.

No third-party accounts, private client management, or public hosting project has been provisioned. Existing hosting remains under the repository’s deployment workflow.
