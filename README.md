# CareerSha — Frontend

React 19 + TypeScript + Vite + Tailwind. Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000  (proxies /api to VITE_DEV_API_PROXY_TARGET or localhost:8000)
npm run build
```

## Code quality

Run these before every commit / PR — all must pass:

```bash
npm run typecheck     # TypeScript, strict mode
npm run lint          # ESLint (lint:fix to auto-fix)
npm run format:check  # Prettier (format to auto-format)
npm test              # Vitest + React Testing Library (test:watch while developing)
```

Tests live next to the code they cover (`*.test.ts` / `*.test.tsx`). Helpers in `src/test/utils.tsx`:
`renderAt(<Page />)` renders inside the router/providers, `signIn()` simulates a signed-in user.

- **TypeScript strict mode** is on. Don't use `any`; ESLint treats it as an error. If one is truly unavoidable,
  add `// eslint-disable-next-line @typescript-eslint/no-explicit-any` with a short reason.
- **Prettier** owns formatting (`.prettierrc.json`); don't hand-format.
- **Keep files small**: a page composes components; a component over ~250 lines is a sign to split it
  (see `features/colleges/detail/` or `features/home/sections/` for the pattern).
- **Data lives in `src/data/`**, not inside components.
- `.git-blame-ignore-revs` hides the one-off Prettier commit from `git blame`:
  `git config blame.ignoreRevsFile .git-blame-ignore-revs`

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

## Typography

- **Font:** Plus Jakarta Sans. To change it, edit `--font-sans` / `--font-heading` in `src/styles/theme.css`
  and the Google Fonts `<link>` in `index.html`.
- **Weight rule:** only headings (`h1`–`h6`) are bold; all other text is regular. `font-semibold`, `font-bold`,
  `font-extrabold` and `font-black` are bold inside headings and regular everywhere else (controlled by the
  `--fw-*` variables in `theme.css`). Use a real heading tag when text should be bold.
- **Exception:** `font-brand` is always bold (logo wordmark).
- Buttons, form labels and nav links use medium weight (500).

## Dark mode

Switched off until every page has dark styles: `DARK_MODE_ENABLED` in `src/hooks/useDarkMode.ts`.
Setting it to `true` brings back the header toggle.

## Adding a rank predictor

Every `/rank-estimator/:examSlug` page is generated from one entry in
[`src/features/predictors/exams.ts`](src/features/predictors/exams.ts). Add an entry — no new component or route needed.
Optional long-form content (marks-vs-rank tables, cutoffs, colleges, FAQs) goes in `content`; sections render only when provided.
The year shown on all predictor pages is `PREDICTOR_YEAR` in the same file.
