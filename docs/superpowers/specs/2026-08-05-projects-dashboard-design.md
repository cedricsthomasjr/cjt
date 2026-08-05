# Projects page → dynamic engineering dashboard

Status: approved
Date: 2026-08-05
Branch: `page/projects`

## Summary

Replace the current `/projects` page — a title, a subhead, and a vertical stack of
`ProjectRow` cards — with a richer, still-in-system showcase: a "currently building"
banner, a GitHub activity readout, a flagship project spotlight, and a filterable,
view-toggleable project grid that opens a detail drawer instead of navigating away.

The original task brief described this in generic AI-dashboard language (emoji status
badges, a GitHub-green contribution heatmap, a literal terminal-window CLI view). This
spec keeps every piece of *functionality* from that brief but reinterprets the visuals
in the site's existing black/gold, Helvetica-Neue-Bold + Palatino-Italic language —
no emoji, no green heatmap, no fake terminal chrome. See "Visual reinterpretation
notes" per section below.

## Existing system this builds on

- `src/app/projects/page.js` — server component, exports `metadata`, currently renders
  `Stagger` + `ProjectRow` over `src/data/projects.json`.
- `src/app/projects/[slug]/page.js` — full case-study page per project (architecture
  prose, features, lessons, gallery). **Stays as-is** — the new drawer links into it
  rather than replacing it.
- `src/data/projects.json` — the one source of truth for project content.
- `src/app/globals.css` — the design system: `.card`/`.card-hover`, `.pill`/`.pill-gold`,
  `.usa-chip`/`.usa-chip.is-active` (tab/filter pill pattern), `.impcalc-tick` (same
  pattern, second instance), `.readout-row` (label/value/note grid that stacks on
  mobile), `t-display`/`t-h2`/`t-h3`/`t-sub`/`t-label`/`t-figure` type scale,
  `--color-gold`/`--color-gold-lift`/`--color-rule`/`--color-muted`.
- No test framework is configured in this repo (`package.json` has no jest/vitest).
  Verification is manual, via the dev server, matching how `ImpactCalculator.tsx` and
  `UsaMap.tsx` were verified.

## Data changes

`src/data/projects.json`:
- Add `category` to every entry: BullBrief → `"AI/ML & Agents"`, Athlytics →
  `"Data Engineering"`, What CJ Sees → `"Full-Stack"`. (`"Automation & Workflows"` has
  no current project — the filter must handle an empty result gracefully, see below.)
- Add `overview` (string, 1–2 sentences) and `impactMetrics` (array of
  `{ label, value }`) to the BullBrief entry only, for the Hero tabs.

New `src/data/engineering.ts`:
- `currentFocus`: `{ status: "Active Sprint", focus: "Enterprise AI Agent
  Orchestration & Pipeline Automation", tags: ["AWS Bedrock", "Databricks",
  "Pydantic", "TypeScript"] }` — copy confirmed accurate, used verbatim.
- `githubFallback`: a hand-authored snapshot matching the shape the live fetch
  produces — `{ weeks: number[12], stats: { reposShipped, primaryStack,
  engineeringFocus, latestCommitAt } }` — used when the live fetch fails, and
  rendered first (see below) even when it doesn't.

## 1. BuildingStatus (`src/components/projects/BuildingStatus.tsx`)

Server component (no interactivity, no client bundle cost). Renders:
- A status chip: gold-outlined pill with a small filled gold dot (not 🟢) + "Active
  Sprint" in `t-label-gold` styling — same visual family as the `.pill-gold` already
  used for project status on `ProjectRow`.
- The focus line in `t-h3`.
- The 4 focus tags as `.pill`s, same as tag rows elsewhere.

Sits directly under the page's `t-display`/`t-sub-lg` intro, above the GitHub panel.

**Visual reinterpretation:** spec asked for `🟢 Active Sprint` — no emoji anywhere on
this site; a gold dot inside a pill (already how "Live" reads on `ProjectRow`) carries
the same meaning.

## 2. GitHubActivity (`src/components/projects/GitHubActivity.tsx`)

Client component (`"use client"`).

**Data flow:**
1. On mount, render immediately using `githubFallback` from `engineering.ts` — no
   loading spinner, no layout shift.
2. `fetch("https://api.github.com/users/cedricsthomasjr/events", { cache: "no-store" })`
   in a `useEffect`. On success, bucket `PushEvent` entries by week (last 12 weeks from
   today) into a `number[12]` and compute the most recent event's relative time; swap
   these into state, replacing the fallback.
3. On any failure (non-200, network error, rate limit) — catch silently, keep the
   fallback data. No error UI, no "showing cached data" disclaimer.

**Contribution grid:** NOT a GitHub-green calendar. A single row of 12 small square
dots (one per week), most-recent on the right. Fill opacity scales with that week's
commit count using the same gold-on-dark-lattice idiom as `body::before` /
`.pointer-light` / `UsaMap`'s dot layers — zero activity renders as a `--color-rule`
outline only, low/medium/high commit counts step up through gold opacity tiers ending
at `--color-gold-lift` for the busiest week. No horizontal scroll needed at any
viewport — 12 cells at ~14px each fit comfortably at 375px.

**Stats row:** 4 boxes in a grid (2×2 on mobile, 4-across from `sm:`), styled like the
Impact Calculator's readout cells — `t-label` caption on top, `t-figure` gold value
below, hairline separators, no colored KPI-card backgrounds:
- Total Repositories Shipped (static count, derived from `projects.json` + one
  archived/private repo not listed publicly → curated number in `engineering.ts`)
- Primary Stack — "Python / TypeScript / SQL" (static)
- Engineering Focus — "Data Engineering & AI/ML" (static)
- Latest Commit — relative time, live if the fetch succeeded, else the fallback's
  fixed timestamp formatted the same way

**Visual reinterpretation:** spec asked for a GitHub-green heatmap and 4 generic "metric
boxes" — replaced with the gold-dot row and the readout-cell treatment already
established by `ImpactCalculator`.

## 3. HeroProject (`src/components/projects/HeroProject.tsx`)

Client component (tabs need state). Wide `.card` spanning the shell width. Two-column
at `lg:`, stacked below that.

**Left column:** `t-h2` title, `t-sub` summary, the 2–3 `impactMetrics` as inline
`t-figure` callouts, then the existing `btn-solid`/`btn` link row (Live, GitHub) —
same link treatment as the case-study page.

**Right column:** a 3-tab switcher — *System Overview*, *Tech Stack & Tools*, *Impact
Metrics* — reusing the exact `.usa-chip`/`.usa-chip.is-active` (equivalently
`.impcalc-tick`) pill pattern already coded twice in this repo, rather than inventing a
third tab component:
1. Overview → the new `overview` field, `t-sub` prose.
2. Tech Stack → `project.tags` rendered as `.pill`s (already "interactive" in the sense
   that they highlight on hover via the existing `.group:hover .pill` rule).
3. Impact Metrics → the same `impactMetrics` array as a small `readout`-style list.

## 4. Filterable grid, view toggle, drawer

New client orchestrator `src/components/projects/ProjectsExplorer.tsx`, rendered by
`page.js` and given the full `projects` array. Owns three pieces of state: active
category filter, view mode (`"grid" | "ledger"`), and the currently-open drawer project
(`null` when closed).

**`CategoryFilter.tsx`:** pills — `All`, `AI/ML & Agents`, `Data Engineering`,
`Automation & Workflows`, `Full-Stack` — same `.usa-chip`/`is-active` pattern as the
hero tabs, for visual consistency across the page. Filtering `Automation & Workflows`
(no current project) shows a quiet empty state in `t-sub-sm`, e.g. "Nothing filed under
this category yet." — not an error state.

**View toggle:** two-option segmented control, same pill family, `Grid` / `Ledger`.

**Grid view (`ProjectCard.tsx`):** a tighter version of `ProjectRow` — image (if any),
`t-label` year/role, status pill, `t-h3` title, `t-sub-sm` summary, tags. Whole card is
a `<button>` (not a `Link`) that opens the drawer — the direct case-study link moves
inside the drawer now, so the card no longer needs the `.card-link::after` stretched-
anchor trick; a plain button covering the card surface with the existing `.card`/
`.card-hover` treatment and a visible `:focus-visible` ring does the job.

**Ledger view (`ProjectLedger.tsx`):** monospace row list, columns `repo · branch ·
status · tech`, one row per project, each row a `<button>` opening the drawer. Built on
the existing `.readout-row` grid (which already stacks label/value/note on mobile) so
it doesn't clip horizontally on small screens — the tech tags wrap into the row's
"note" area below `repo`/`status` under `sm:`. `branch` is derived, not stored: `"main"`
for everything (this isn't pulling real git data, just completing the ledger's shape).
A scoped monospace font stack (`ui-monospace, "SF Mono", ...`) applies only inside this
component — the one deliberate "terminal" cue, with no window chrome, no prompt
characters, no fake cursor.

**`ProjectDrawer.tsx`:** slides in from the right on `lg:` and up (fixed panel, dimmed
backdrop, closes on `Escape` or backdrop click), full-height sheet from the bottom on
mobile. Content: title, year/role/status, `content[0]`/`content[1]` from `projects.json`
framed as "The problem" / "The approach", `lessons` as takeaways, tags, then a link row:
"Read the full case study →" to `/projects/[slug]` (the existing page), plus GitHub/live
links. For the link-out entry (What CJ Sees, no case study, empty `content`/`lessons`),
the drawer shows only summary + tags + "Visit the site" — no broken links, no empty
section headers.

**Visual reinterpretation:** spec asked for a literal "Terminal / CLI View" styled like
a terminal window — replaced with a monospace ledger list using the site's existing
`readout-row` grid, no window chrome.

## Responsiveness

- Grid: 1 col → 2 (`sm:`) → 3 (`lg:`), matching the `impcalc-grid` count-based
  breakpoint approach already used on this site.
- Ledger rows stack the same way `.readout-row` already stacks on mobile — no new
  pattern needed.
- Heatmap: fixed 12 cells, no scroll container needed at any width.
- Drawer: full-bottom-sheet under `lg:`, right-fixed panel at `lg:` and up.
- Filter pills and view toggle: `flex-wrap`, same as existing tag rows.

## Out of scope

- No changes to `/projects/[slug]` beyond what's needed to keep linking into it.
- No new backend/API route — the GitHub fetch is client-side, unauthenticated, public
  events endpoint only (60 req/hr/IP is enough for a low-traffic portfolio).
- No persistence of filter/view state across page loads (resets on navigation).

## Verification plan

No test framework configured. Manual verification via the dev server (`vercel:deploy`
preview or `npm run dev` through the browser tool):
1. Filter pills change the visible grid/ledger set correctly, including the empty
   Automation & Workflows state.
2. Grid ↔ Ledger toggle preserves the active filter.
3. Clicking a card/row opens the drawer with correct content; Escape and backdrop click
   close it; the case-study link goes to the right `/projects/[slug]`.
4. GitHub panel renders instantly with fallback data, then (when not rate-limited)
   swaps in live data without visible layout shift.
5. `next lint` passes.
6. Responsive check at 375px / 768px / 1280px — no horizontal clipping anywhere on the
   page.

Separately (not part of this component work): replace `public/projects/bullbrief.webp`
with a fresh screenshot of the live BullBrief site.
