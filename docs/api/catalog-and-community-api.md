# Catalog & Community API (for the backend)

The frontend currently uses **sample data** for colleges, exam cutoffs/results, reviews and Q&A
(`src/data/catalog/`) and stores visitors' posts in the browser. When these endpoints exist, only two
files change — every page keeps working:

| Frontend file                      | Replace with calls to         |
| ---------------------------------- | ----------------------------- |
| `src/services/catalogService.ts`   | Catalog endpoints below       |
| `src/services/communityService.ts` | Reviews & Q&A endpoints below |

Then set `SHOW_SAMPLE_DATA_NOTICE = false` in `src/config/features.ts`.

All paths are under the existing base: `${VITE_API_BASE_URL}/api`. JSON field names match the
TypeScript types in `src/data/catalog/types.ts` (camelCase). Auth uses the existing header
`Authorization: Token <token>`.

---

## Catalog

### `GET /colleges/`

List colleges. Query parameters (all optional):

| Param               | Example                  | Notes                                                                |
| ------------------- | ------------------------ | -------------------------------------------------------------------- |
| `q`                 | `warangal`               | Matches name, short name, city, state, stream                        |
| `stream`            | `Engineering,Management` | Comma-separated                                                      |
| `ownership`         | `Government`             | `Government` \| `Private` \| `Deemed`                                |
| `state`             | `Telangana`              | Comma-separated                                                      |
| `exam`              | `jee-main`               | Colleges with a course accepting this exam                           |
| `sort`              | `rank`                   | `relevance` (default) \| `rank` (NIRF) \| `fees` (lowest course fee) |
| `page`, `page_size` | `1`, `20`                | Pagination                                                           |

Response: `{ "count": 123, "results": CatalogCollege[] }`

### `GET /colleges/{slug}/`

One `CatalogCollege` (404 if unknown). Shape:

```jsonc
{
  "slug": "nit-warangal",
  "name": "National Institute of Technology Warangal",
  "shortName": "NIT Warangal",
  "city": "Warangal",
  "state": "Telangana",
  "stream": "Engineering", // Engineering | Medical | Management | Law | Design | Science
  "ownership": "Government", // Government | Private | Deemed
  "established": 1959,
  "nirfRank": 21, // optional
  "campusAcres": 256, // optional
  "accreditation": ["NAAC A++"],
  "about": "…",
  "highlights": ["…"],
  "courses": [
    {
      "name": "B.Tech Computer Science",
      "level": "UG",
      "duration": "4 years",
      "totalFees": "₹5.9 L",
      "seats": 180,
      "exams": ["jee-main"],
    },
  ],
  "cutoffs": [
    {
      "exam": "jee-main",
      "course": "B.Tech Computer Science",
      "category": "General",
      "year": 2025,
      "closingRank": "2,400",
    },
  ],
  "placements": {
    "year": 2025,
    "placementRate": "88%",
    "averagePackage": "₹13 LPA",
    "medianPackage": "₹10 LPA",
    "highestPackage": "₹62 LPA",
    "topRecruiters": ["Google"],
  },
  "facilities": ["Hostels"],
  "website": "https://www.nitw.ac.in",
}
```

### `GET /colleges/?slugs=a,b,c`

Several colleges by slug, in the given order (used by Compare).

### `GET /exams/{examId}/extras/`

Cutoffs and result info for an exam page (`ExamExtras`):

```jsonc
{
  "cutoffNote": "Qualifying percentile to appear for JEE Advanced.",
  "cutoffs": [{ "category": "General", "year": 2025, "value": "93.1 %ile" }],
  "result": {
    "year": 2025,
    "declaredOn": "February",
    "candidatesAppeared": "14 lakh",
    "candidatesQualified": "2.5 lakh",
    "howToCheck": ["…"],
  },
}
```

---

## Community (reviews & Q&A)

`target` identifies what a review/question is about:
`targetType` = `college` | `exam`, `targetId` = college slug or exam id.

### Reviews

| Method & path                                            | Body / query        | Response                                              |
| -------------------------------------------------------- | ------------------- | ----------------------------------------------------- |
| `GET /reviews/?targetType=college&targetId=nit-warangal` | —                   | `Review[]`, newest first                              |
| `POST /reviews/` 🔒                                      | `NewReview` (below) | created `Review` (201)                                |
| `POST /reviews/{id}/helpful/` 🔒                         | —                   | `{ "helpful": 35 }` — once per user (409 if repeated) |

`NewReview`:

```jsonc
{
  "target": { "type": "college", "id": "nit-warangal" },
  "course": "B.Tech Computer Science",
  "batch": "2022–2026",
  "overall": 4.2, // server should recompute as the mean of ratings
  "ratings": { "academics": 4, "placements": 5, "infrastructure": 4, "campusLife": 4, "value": 4 },
  "title": "…",
  "liked": "…",
  "improve": "…",
}
```

The server sets `id`, `author` (from the signed-in user), `createdAt`, `helpful`.
Validation: every rating 1–5; `title` required (≤120 chars); `liked` ≥ 20 chars.
Recommended: one review per user per college; reviews go through moderation before publishing.

### Questions & answers

| Method & path                                       | Body / query                                   | Response                                                   |
| --------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------- |
| `GET /questions/?targetType=exam&targetId=jee-main` | —                                              | `Question[]` with `answers`, sorted by upvotes then newest |
| `POST /questions/` 🔒                               | `{ "target": {…}, "title": "…", "body": "…" }` | created `Question` (201)                                   |
| `POST /questions/{id}/answers/` 🔒                  | `{ "body": "…" }`                              | created `Answer` (201)                                     |
| `POST /votes/` 🔒                                   | `{ "itemId": "q-1" }` (question or answer id)  | `{ "upvotes": 19 }` — once per user (409 if repeated)      |

Validation: question `title` ≥ 10 chars (≤200); answer `body` ≥ 10 chars.
`Answer.authorTag` (e.g. "Student, NIT Warangal") should come from a verified profile, not free text.

🔒 = requires `Authorization: Token <token>`. While `ACCOUNT_REQUIRES_SIGN_IN` is `false` the
frontend lets guests post; when switching to the API, either require sign-in for posting or accept
anonymous posts with rate-limiting and moderation.
