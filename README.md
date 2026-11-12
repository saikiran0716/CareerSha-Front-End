# CareerSha — Frontend

React 19 + TypeScript + Vite + Tailwind. Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000  (proxies /api to VITE_DEV_API_PROXY_TARGET or localhost:8000)
npm run build
```

Environment (`.env`): `VITE_API_BASE_URL`, `VITE_GOOGLE_CLIENT_ID`.

## Project structure

```
src/
├── app/            App shell (App.tsx) and all routes (AppRoutes.tsx, lazy-loaded)
├── pages/          One file per route — thin, composes features
│   ├── home/ auth/ search/ colleges/ exams/ predictors/
│   ├── news/ jobs/ community/ results/ static/
│   └── NotFound.tsx
├── features/       Feature-specific components and logic
│   ├── predictors/   Rank predictors (config-driven) + other predictor tools
│   ├── colleges/ exams/ home/ news/ jobs/ community/ report/
│   └── auth/ chatbot/ content/ profile/
├── components/     Shared, feature-agnostic UI
│   ├── layout/       Header, MegaMenu, Footer, ScrollToTop, StaticLayout
│   └── common/       SEO, loaders
├── services/       API layer (apiConfig, authService, aiService, …)
├── data/           Static content (engineering/, mba/, medical/, exams/, …)
├── hooks/          Reusable hooks (useDarkMode)
├── lib/            Utilities (theme helpers)
├── styles/         theme.css — global color tokens
└── types/          Shared TypeScript types
```

Rules of thumb:

- A file rendered directly by a route goes in `pages/`. Everything it's built from goes in `features/<feature>/` or, if used across features, `components/`.
- Folders are lowercase (`kebab-case`); component files are `PascalCase.tsx`.

## Colors / theming

**All colors are defined once, in [`src/styles/theme.css`](src/styles/theme.css).** Change a value there and it updates everywhere.

Use the semantic Tailwind tokens — never raw palette names (`blue-600`) or hex values:

| Token                            | Use for                                       |
| -------------------------------- | --------------------------------------------- |
| `primary`                        | Main brand color — buttons, links, highlights |
| `secondary`                      | Supporting brand color — accents, active nav  |
| `accent`                         | Decorative third color — badges, gradients    |
| `neutral`                        | Text, backgrounds, borders, surfaces          |
| `success` / `warning` / `danger` | Status states                                 |
| `highlight`                      | News/Results editorial red                    |

Each has shades `50`–`950` and supports opacity: `bg-primary-600`, `text-neutral-500`, `border-success-200/50`.

For inline styles or chart libraries, use the helpers in `src/lib/theme.ts`:
`themeVar('primary-600')` (CSS value) or `themeColor('primary-600')` (resolved color for SVG/canvas).

Third-party brand colors (WhatsApp, LinkedIn, YouTube, …) intentionally stay as hex.

## Adding a rank predictor

Every `/rank-estimator/:examSlug` page is generated from one entry in
[`src/features/predictors/exams.ts`](src/features/predictors/exams.ts). Add an entry — no new component or route needed.
Optional long-form content (marks-vs-rank tables, cutoffs, colleges, FAQs) goes in `content`; sections render only when provided.
The year shown on all predictor pages is `PREDICTOR_YEAR` in the same file.
