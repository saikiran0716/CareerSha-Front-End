# College Lists API (for the backend)

The header menu links to about 110 college list pages, for example `/eng/hyd`, `/mbbs/india`,
`/mba/delhi` and `/city/pune`. Each page is identified by a **list slug**: the `FOOTER_PAGES` key in
`src/data/footerData.ts`, such as `eng-hyd`, `mbbs-india`, `mba-delhi` or `city-pune`.

Today the lists are built from sample data in `src/data`, combined by
`src/data/collegeLists/sources.ts`. When this endpoint exists, only one function changes:

| Frontend file                        | Change                                                |
| ------------------------------------ | ----------------------------------------------------- |
| `src/services/collegeListService.ts` | `getCollegeList(slug)` → `GET /college-lists/{slug}/` |

Search, ownership filters and sorting run in the browser on the returned list (`filterColleges`), so
no extra endpoints are needed while lists stay under a few hundred colleges.

All paths are under `${VITE_API_BASE_URL}/api`. Field names are camelCase.

## `GET /college-lists/{slug}/`

The response is a `CollegeList`, or 404 if the slug is unknown.

```jsonc
{
  "slug": "eng-hyd",
  "title": "Engineering Colleges in Hyderabad",
  "description": "Top Engineering Institutes in Hyderabad.",
  "stream": "Engineering", // Engineering | Management | Medical | Dental | Pharmacy | Nursing | Paramedical | Design | Law | Commerce | Hospitality
  "city": "Hyderabad", // only for city lists
  "colleges": [
    {
      "id": "iit-hyderabad",
      "name": "IIT Hyderabad",
      "location": "Kandi, Sangareddy",
      "stream": "Engineering",
      "ownership": "Government", // Government | Private | Deemed (optional)
      "nirfRank": 8, // optional
      "fees": "₹10 L", // display text, optional
      "avgPackage": "₹20.07 LPA", // display text, optional
      "feesLakhs": 10, // number for sorting, optional
      "packageLpa": 20.07, // number for sorting, optional
      "extraStats": [{ "label": "Seats", "value": "120" }], // anything else worth showing
      "highlights": ["Top Tier"], // short tags
      "website": "https://www.iith.ac.in/",
      "profileSlug": "iit-hyderabad", // set when /colleges/{slug} exists (enables View details + Compare)
    },
  ],
  "alsoPopular": [], // optional: national picks shown under short lists
  "content": "<p>…</p>", // optional guide HTML (sanitised on the server)
  "faqs": [{ "question": "…", "answer": "…" }],
}
```

The frontend shows `colleges` in the order returned under "Top ranked", so return them in ranking
order. When the API is live, set `SHOW_SAMPLE_DATA_NOTICE = false` in `src/config/features.ts`.
