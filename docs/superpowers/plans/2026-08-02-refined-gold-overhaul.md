# Refined Gold Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild cjst.dev's surface language on rython.dev's card-and-glow look, translated to black and old gold and executed as refined rather than tech-forward, with motion throughout and `/` reduced to a landing page.

**Architecture:** Multi-page Next.js App Router stays exactly as it is — five routes, server components by default. All visual change lands in `globals.css` design tokens plus a small set of presentational components. Motion is CSS transitions driven by one shared `useInView` hook; no animation library is added.

**Tech Stack:** Next.js 15.3.8 (App Router), React 19, Tailwind CSS v4 (`@theme` tokens, `@layer components`), lucide-react. No new dependencies.

## Global Constraints

- **No new npm dependencies.** Motion is CSS + IntersectionObserver only.
- **Typography does not change.** Helvetica Neue Bold (`--font-hn`) carries every heading, figure, label, and control. Palatino Italic (`--font-pal`) carries every explanatory voice. Two registers, no third. Do not adopt rython.dev's Montserrat.
- **Palette is black and old gold only:** `--color-ink #08080a`, `--color-raised #101014`, `--color-rule #1e1e24`, `--color-gold #c8a046`, `--color-gold-lift #e8ce8a`, `--color-bone #ece9e2`, `--color-muted #8a8781`. No teal, no third accent.
- **Page structure is unchanged.** Routes stay `/`, `/projects`, `/projects/[slug]`, `/about`, `/resume`, `/contact`. Do not merge into a single-page tabbed layout.
- **Proper capitalization in all copy.** Sentence case for prose, Title Case for page headings and proper nouns. No all-lowercase styling.
- **Copy register is measured, not brash.** State what the work was; let the figures carry the weight.
- **Every animation respects `prefers-reduced-motion: reduce`.**
- **Content must be visible without JavaScript.** No reveal may leave content at `opacity: 0` when scripting is off.
- **What CJ Sees appears only on `/projects`**, with no preview imagery anywhere.
- **Do not clone rython.dev.** Borrow the surface vocabulary only. The following are explicitly NOT adopted: its Montserrat typeface, its teal/mint accent, its single-page tabbed architecture, its greeting headline ("Good evening!"), its circular avatar with icon-button row, its segmented tab controls, its edge-to-edge dot grid, and its interactive hover-toy section. Anything that would let a viewer recognize the two sites as the same template is out.
- **`src/data/resume.js` is authoritative and must match the resume PDF** (see Data reconciliation below). Where the site and the resume disagree, the resume wins.

## Data reconciliation

Checked against the resume text and the LinkedIn profile CJ supplied on 2026-08-02. (Automated fetching of LinkedIn returns HTTP 999; CJ pasted the profile.) Where the two disagree, the resume wins. Congratulatory posts and reshares were disregarded as CJ instructed.

**CJ's pronouns are he/him** (stated on his LinkedIn profile). Use them in any copy that refers to him in the third person.

**Confirmed correct in the repo, do not change:** phone `(216) 406-4458`; email `cst9351@nyu.edu`; GPA 3.55; President's List and Dean's List (2x); Expected May 2027; every figure in the `record` export (450+ hours, $100K, 10K+ records, +40% delivery); NIKE dates June 2026 – August 2026; Corbin dates Summer 2024 – Summer 2025.

**Must be corrected (folded into Task 4):**

1. **NIKE job title.** The resume reads `Artificial Intelligence & Machine Learning Engineer Intern`. Both `currentRole.title` and `resumeSections[0].items[0].title` currently read `AI & Machine Learning Engineer Intern`. Use the full title.
2. **Skills groupings.** `resumeSections` invents four categories (Languages / Data & ML / Product / Practice) that do not match the resume, and lists `PostgreSQL`, `Flask`, and `REST APIs`, none of which appear on the resume. Replace with the resume's exact four groups and members:
   - `Languages`: Java, Python, SQL, C, JavaScript, TypeScript
   - `Concepts`: Data Science, Business Intelligence, Market Research, Full-Stack Development, Agile
   - `Tools`: Git, Snowflake, Microsoft Suite (Word, Excel, PowerPoint), APIs
   - `Frameworks & Libraries`: FastAPI, React, Next.js, Pandas, NumPy, Scikit-learn, PyMC, SQLAlchemy
3. **The $100K figure is approximate on the resume** (`~$100K`). The site renders a bare `$100K`. Change the `record` note to read `in annual cost, approximately, from that same pipeline` rather than implying precision.

**Deliberately diverging from the resume, on CJ's instruction:** UniVizr appears under PROJECT WORK on the resume but is inactive and comes off the site entirely.

**Tense — the largest correction in this plan.** LinkedIn lists the NIKE role as `Jun 2026 - Present · 3 mos`. Today is 2026-08-02. **CJ is currently at NIKE**, so every "incoming", "joining", "this summer I join", and "Next" on the site is factually wrong. The resume's own "Incoming intern" bullet is stale too. All of it moves to present tense:

| Location | Currently reads | Must read |
|---|---|---|
| `resume.js` `currentRole.summary` | "Joining the team that builds…" | "On the team that builds the machine learning infrastructure behind Nike's global digital platforms." |
| `resume.js` `currentRole.bullets[0]` | "Incoming to the AI, Data & Machine Learning Engineering team, working on…" | "Working on production-scale ML infrastructure with the AI, Data & Machine Learning Engineering team." |
| `resumeSections[0].items[0].bullets[0]` | "Incoming to the AI, Data & Machine Learning Engineering team…" | same replacement as above |
| `page.js` landing eyebrow | `Next` | `Now` |
| `about/page.js` intro | "This summer I join the AI, Data & Machine Learning Engineering team at NIKE" | "I am currently on the AI, Data & Machine Learning Engineering team at NIKE, in Beaverton." |
| `about/page.js` metadata description | "incoming AI/ML engineer intern at NIKE" | "AI/ML engineer intern at NIKE" |
| `resume/page.js` metadata description | "AI/ML engineer intern at NIKE" | unchanged, already correct |
| `layout.js` root metadata description | "incoming AI/ML engineer intern at NIKE" | "AI/ML engineer intern at NIKE" |

`currentRole.time` stays `Jun 2026 — Aug 2026` — the resume gives the end date, LinkedIn only says "Present".

**Additional facts from LinkedIn, available if wanted but NOT built into this plan** (they go beyond the resume, so they are CJ's call, not the implementer's): he transferred to NYU from Louisiana State University (Aug 2023 – May 2025, CS with a software engineering concentration); the Corbin relationship was three separate stints (Data Science Intern Jul–Aug 2024, Winter Intern Dec 2024–Jan 2025, Intern Jun–Aug 2025) rather than one continuous run; the 2024 stint included a real-time stock scraper over 200+ tickers using JavaScript and the Yahoo Finance API. Do not add these without asking.

**Disregarded from LinkedIn:** the "Open to work — Baton Rouge, LA" banner (private, and inconsistent with the rest of the profile), follower and impression counts, and all reshared posts.

## Design translation

Traits taken from rython.dev, with the exact value each becomes here:

| rython.dev | This site |
|---|---|
| Dot grid, `#303030` dots at `20px` | Gold dots at `rgb(200 160 70 / 0.07)`, `22px`, masked to fade out below the fold |
| Card radius `12px` | `10px` (`--radius-card`) — the site is currently all hard corners; this is the shift |
| Card fill `linear-gradient(#101010 → #202020)` | `linear-gradient(158deg, #0c0c10, #141419)` |
| Teal glow `rgba(4,57,57,.5) 0 10px 25px 10px` | Gold glow `0 14px 40px -10px rgb(200 160 70 / .14)`, deepening on hover |
| Pill nav, white active pill | Pill nav, gold active pill, backdrop blur |
| Connector lines between sections | Gold hairline connectors that draw in on scroll |
| Timeline dots | Gold ring dots on the experience timeline |
| Plain-text tags | Gold-outline pills |
| Montserrat | **Unchanged** — Helvetica Neue Bold + Palatino Italic |

The restraint move that keeps this "refined" rather than "tech-forward": the dot grid is masked so it exists only behind the top of each page and dissolves as you scroll. It reads as paper texture, not as a technical backdrop.

---

## File structure

**Create:**
- `src/components/useInView.js` — the one IntersectionObserver hook everything reveals through
- `src/components/Stagger.jsx` — reveals a list of children in sequence
- `src/components/Connector.jsx` — the vertical gold hairline between sections
- `src/components/PageTransition.jsx` — route-change fade
- `src/components/SiteIndex.jsx` — the landing page's destination table
- `src/components/ProjectRow.jsx` — a full-width project record, handles image-less and link-out entries
- `src/components/Timeline.jsx` — dotted experience timeline

**Modify:**
- `src/app/globals.css` — tokens, surfaces, motion, pills, timeline
- `src/app/layout.js` — `js` class script, `PageTransition`
- `src/components/Navbar.js` — pill nav
- `src/components/Reveal.jsx` — use the shared hook
- `src/data/projects.json` — drop `univizr`, add `whatcjsees`
- `src/data/resume.js` — add `community` export
- `src/app/page.js` — landing
- `src/app/projects/page.js` — rows
- `src/app/projects/[slug]/page.js` — exclude link-out entries, pill tags
- `src/app/about/page.js` — timeline + community, photography removed
- `src/app/resume/page.js` — cards, timeline, pill tags
- `src/app/contact/page.js` — card treatment, photography channel removed

**Delete:**
- `src/components/PhotoCallout.jsx`
- `src/components/PhotoGrid.jsx`

**Note on verification:** this repo has no test framework and no test script. Every task is verified by `npm run build` succeeding plus browser inspection through the preview tools. Do not invent a test harness.

---

### Task 1: Design tokens and surface primitives

**Files:**
- Modify: `src/app/globals.css:41-53` (the `@theme` block) and the `@layer components` block

**Interfaces:**
- Produces: CSS classes `.card`, `.card-hover`, `.pill`, `.pill-gold`, and tokens `--radius-card`, `--glow-gold`, `--glow-gold-strong`. Tasks 3, 5, 6, 7, 8, 9, 10 consume these.

- [ ] **Step 1: Add the new tokens to `@theme`**

Append inside the existing `@theme` block, after `--font-pal`:

```css
  --radius-card: 10px;
  --glow-gold: 0 14px 40px -10px rgb(200 160 70 / 0.14);
  --glow-gold-strong: 0 18px 50px -10px rgb(200 160 70 / 0.26);
```

- [ ] **Step 2: Add the masked dot grid**

The existing `body::after` holds the film grain — leave it alone. Add a separate `body::before` in `@layer base`, immediately before the `body::after` rule:

```css
  /* Dot grid, lifted from rython.dev but masked so it only exists behind the
     top of the page. Wallpapering it edge to edge is what makes that look read
     as technical; letting it dissolve makes it read as paper. */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: radial-gradient(
      circle,
      rgb(200 160 70 / 0.07) 1px,
      transparent 1px
    );
    background-size: 22px 22px;
    -webkit-mask-image: radial-gradient(
      ellipse 110% 78% at 50% 0%,
      #000 32%,
      transparent 76%
    );
    mask-image: radial-gradient(
      ellipse 110% 78% at 50% 0%,
      #000 32%,
      transparent 76%
    );
  }
```

- [ ] **Step 3: Add card and pill components**

Append to `@layer components`, after the existing `.panel` rule:

```css
  /* --- cards ------------------------------------------------------------ */

  .card {
    position: relative;
    border-radius: var(--radius-card);
    border: 1px solid var(--color-rule);
    background: linear-gradient(158deg, #0c0c10 0%, #141419 100%);
    box-shadow: var(--glow-gold);
    transition: border-color 0.3s ease, box-shadow 0.45s ease,
      transform 0.45s cubic-bezier(0.2, 0.6, 0.2, 1);
  }

  .card-hover:hover,
  .card-hover:focus-within {
    transform: translateY(-4px);
    border-color: rgb(200 160 70 / 0.42);
    box-shadow: var(--glow-gold-strong);
  }

  /* --- pills ------------------------------------------------------------ */

  .pill {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    border: 1px solid var(--color-rule);
    padding: 0.3125rem 0.6875rem;
    font-family: var(--font-hn);
    font-weight: 700;
    font-size: 0.6875rem;
    line-height: 1;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
    transition: border-color 0.25s ease, color 0.25s ease;
  }

  .group:hover .pill {
    border-color: rgb(200 160 70 / 0.35);
    color: var(--color-bone);
  }

  .pill-gold {
    border-color: rgb(200 160 70 / 0.5);
    color: var(--color-gold);
  }
```

- [ ] **Step 4: Verify the build compiles**

Run: `npm run build`
Expected: build completes with no CSS errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add card, pill, and dot-grid surface tokens"
```

---

### Task 2: Motion system

**Files:**
- Create: `src/components/useInView.js`
- Create: `src/components/Stagger.jsx`
- Create: `src/components/Connector.jsx`
- Create: `src/components/PageTransition.jsx`
- Modify: `src/components/Reveal.jsx`
- Modify: `src/app/layout.js`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces:
  - `useInView(options?) -> [ref, inView]` — `ref` attaches to any element, `inView` is `true` once it has entered the viewport (or immediately under reduced motion).
  - `<Stagger step={number} className={string}>` — wraps each child in a revealing div, delayed by `index * step` ms. Default `step` is 70.
  - `<Connector />` — a centered vertical gold hairline that draws downward on entry.
  - `<PageTransition>` — client wrapper keyed on pathname.
- Consumed by: Tasks 6, 7, 8, 9, 10.

- [ ] **Step 1: Fix the no-JS reveal bug first**

`src/components/Reveal.jsx` claims hidden styles are "scoped to `.js`", but `globals.css` has no such scoping — with scripting off, every `.reveal` block stays at `opacity: 0` permanently. Since this task multiplies the number of revealing elements, fix it now.

In `src/app/globals.css`, change the reveal rule to gate on `html.js`:

```css
  @media (prefers-reduced-motion: no-preference) {
    .js .reveal {
      opacity: 0;
      transform: translateY(0.75rem);
      transition: opacity 0.6s cubic-bezier(0.2, 0.6, 0.2, 1),
        transform 0.6s cubic-bezier(0.2, 0.6, 0.2, 1);
    }

    .js .reveal.is-in {
      opacity: 1;
      transform: none;
    }
  }
```

Apply the same `.js` prefix to the `.reveal .hairline-gold` rules directly below it.

- [ ] **Step 2: Set the `js` class in the layout**

In `src/app/layout.js`, inside `<head>`, after the viewport meta:

```jsx
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
```

- [ ] **Step 3: Write the shared hook**

Create `src/components/useInView.js`:

```jsx
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One IntersectionObserver contract for the whole site. Returns `true`
 * immediately when the visitor has asked for reduced motion, so callers never
 * have to branch on it themselves.
 */
export default function useInView({
  threshold = 0.1,
  rootMargin = "0px 0px -6% 0px",
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
```

- [ ] **Step 4: Rewrite Reveal on top of the hook**

Replace the body of `src/components/Reveal.jsx`:

```jsx
"use client";

import useInView from "@/components/useInView";

/**
 * Reveals a block once, when it enters the viewport. Applied to whole
 * sections; use Stagger when the children should arrive in sequence.
 */
export default function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 5: Write Stagger**

Create `src/components/Stagger.jsx`:

```jsx
"use client";

import { Children } from "react";
import useInView from "@/components/useInView";

/**
 * Reveals children in sequence. Kept to lists that are genuinely a set —
 * a run of cards, a run of rows — never applied to arbitrary prose.
 */
export default function Stagger({ children, step = 70, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => (
        <div
          className={`reveal ${inView ? "is-in" : ""}`}
          style={{ transitionDelay: `${i * step}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
```

Note: `Stagger` wraps each child in a `div`, so it cannot be the direct parent of a CSS grid whose children need to be grid items. When staggering a grid, put the grid classes on `Stagger`'s `className` and accept that the wrapper divs become the grid items — that works because the wrappers are full-width blocks.

- [ ] **Step 6: Write Connector**

Create `src/components/Connector.jsx`:

```jsx
"use client";

import useInView from "@/components/useInView";

/**
 * The vertical gold hairline that links one section to the next. Taken from
 * rython.dev's circuit connectors, drawn as a single tapered rule instead —
 * the same gesture as the site's existing gold hairlines, turned 90 degrees.
 */
export default function Connector({ height = "4rem" }) {
  const [ref, inView] = useInView({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`connector ${inView ? "is-in" : ""}`}
      style={{ height }}
    />
  );
}
```

- [ ] **Step 7: Write PageTransition**

Create `src/components/PageTransition.jsx`:

```jsx
"use client";

import { usePathname } from "next/navigation";

/**
 * Remounts on route change so the entry animation replays. Keyed on pathname
 * rather than wrapped in a transition library — this is a five-page site.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  );
}
```

- [ ] **Step 8: Add the motion CSS**

Append to `@layer components` in `src/app/globals.css`:

```css
  /* --- motion ----------------------------------------------------------- */

  .connector {
    width: 1px;
    margin: 0 auto;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--color-gold) 45%,
      transparent
    );
    opacity: 0.55;
  }

  @media (prefers-reduced-motion: no-preference) {
    .js .connector {
      transform: scaleY(0);
      transform-origin: top center;
      transition: transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
    }

    .js .connector.is-in {
      transform: scaleY(1);
    }
  }

  @keyframes pageIn {
    from {
      opacity: 0;
      transform: translateY(0.625rem);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .page-in {
    animation: pageIn 0.5s cubic-bezier(0.2, 0.6, 0.2, 1) both;
  }
```

The global `prefers-reduced-motion: reduce` rule already in `@layer base` collapses `pageIn` to 0.01ms, so no extra guard is needed.

- [ ] **Step 9: Wire PageTransition into the layout**

In `src/app/layout.js`, import it and wrap the main div's children:

```jsx
        <div id="main">
          <PageTransition>{children}</PageTransition>
        </div>
```

- [ ] **Step 10: Verify**

Run: `npm run build`, then start the dev server and load `/`.
Expected: build passes; navigating between pages plays a short fade-and-lift; no console errors.

Then confirm the no-JS fix: in the browser console run `document.documentElement.classList.remove('js')` and reload with JS disabled via devtools — all section content must be visible.

- [ ] **Step 11: Commit**

```bash
git add src/components/useInView.js src/components/Stagger.jsx src/components/Connector.jsx src/components/PageTransition.jsx src/components/Reveal.jsx src/app/layout.js src/app/globals.css
git commit -m "feat: shared in-view hook, stagger, connectors, page transitions"
```

---

### Task 3: Pill navigation

**Files:**
- Modify: `src/components/Navbar.js`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `--radius-card` and colour tokens from Task 1.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Add nav CSS**

Append to `@layer components`:

```css
  /* --- nav -------------------------------------------------------------- */

  .navpill {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    border-radius: 999px;
    border: 1px solid var(--color-rule);
    background: rgb(14 14 18 / 0.72);
    backdrop-filter: blur(14px);
    padding: 0.3125rem;
  }

  .navpill-item {
    border-radius: 999px;
    padding: 0.4375rem 0.875rem;
    font-family: var(--font-hn);
    font-weight: 700;
    font-size: 0.8125rem;
    letter-spacing: -0.01em;
    color: var(--color-muted);
    transition: color 0.22s ease, background-color 0.22s ease;
  }

  .navpill-item:hover {
    color: var(--color-bone);
  }

  .navpill-item[data-active="true"] {
    background: var(--color-gold);
    color: var(--color-ink);
  }
```

- [ ] **Step 2: Restructure the desktop nav**

In `src/components/Navbar.js`, replace the `<div className="hidden items-center gap-7 md:flex">` block. Keep the `active` computation and the Resume PDF link exactly as they are; only the wrapper and item classes change:

```jsx
        <div className="hidden items-center gap-3 md:flex">
          <div className="navpill">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  data-active={active}
                  className="navpill-item"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <a
            href={contactLinks.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="btn h-9 min-h-0 rounded-full px-4 text-[0.75rem]"
          >
            Resume PDF
          </a>
        </div>
```

- [ ] **Step 3: Round the mobile trigger**

Change the mobile button's className from `border border-rule` to `rounded-full border border-rule` so it matches the new language.

- [ ] **Step 4: Verify**

Load any page. Expected: the four links sit in a single rounded pill; the current page's link is a solid gold pill with dark text; `aria-current="page"` is still present on it; keyboard focus shows the gold outline.

Resize to 375px wide. Expected: the pill is hidden, the round menu button appears, and the drawer still opens and closes.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.js src/app/globals.css
git commit -m "feat: pill navigation with gold active state"
```

---

### Task 4: Project and resume data

**Files:**
- Modify: `src/data/projects.json`
- Modify: `src/data/resume.js`

**Interfaces:**
- Produces:
  - `projects.json` entries gain an optional `linkOut: true` flag and an optional `external` URL string. Entries with `linkOut` have no detail page.
  - `resume.js` exports `community: Array<{ title: string, org: string, time: string, text: string }>`.
- Consumed by: Tasks 5, 7, 8.

- [ ] **Step 1: Remove UniVizr**

Delete the entire `univizr` object from `src/data/projects.json`. It is referenced nowhere else in the codebase — verify with:

Run: `grep -rn "univizr" src/ public/`
Expected: no matches.

- [ ] **Step 2: Add the What CJ Sees entry**

Append to the array in `src/data/projects.json`:

```json
  {
    "title": "What CJ Sees",
    "slug": "whatcjsees",
    "year": "2024 — 2025",
    "role": "Solo build",
    "status": "Live",
    "image": null,
    "linkOut": true,
    "external": "https://whatcjsees.vercel.app",
    "summary": "A photography portfolio built by hand — custom frontend, JSON-backed galleries, and no page builder anywhere in it.",
    "tags": ["Next.js", "Tailwind CSS", "Vercel", "JSON"],
    "content": [],
    "features": [],
    "lessons": [],
    "gallery": []
  }
```

No preview image, no gallery, no case study — the row links straight out. The dates, stack, and framing come from CJ's own LinkedIn project entry (Feb 2024 – May 2025, "built entirely by hand using Next.js, Vercel, Tailwind, and JSON-based gallery data"), so nothing here is invented.

- [ ] **Step 3: Add the community export**

In `src/data/resume.js`, after the `affiliations` export, add:

```js
/**
 * The leadership entries, flattened for the About page. The resume keeps the
 * full bulleted version; this is the short form.
 */
export const community = [
  {
    title: "Secretary",
    org: "Business and Finance Group, NYU",
    time: "Oct 2025 — Present",
    text: "Executive communications and internal operations for a 1000+ member finance organization, across the Tandon and CAS chapters.",
  },
  {
    title: "Co-Founder",
    org: "The Vanguard Initiative",
    time: "May 2024 — Present",
    text: "A mentorship initiative for underrepresented students, built around the points where students actually fall off.",
  },
  {
    title: "EDGE Participant",
    org: "SEO Career",
    time: "Oct 2025 — Present",
    text: "Technical and professional coaching toward internship recruiting, with industry-specific training and assessments.",
  },
];
```

- [ ] **Step 4: Correct the NIKE job title against the resume**

The resume reads `Artificial Intelligence & Machine Learning Engineer Intern`. In `src/data/resume.js`, set that exact string as both `currentRole.title` and `resumeSections[0].items[0].title`.

- [ ] **Step 5: Correct the Skills section against the resume**

Replace the entire `Skills` entry in `resumeSections` with the resume's own four groups:

```js
  {
    title: "Skills",
    items: [
      {
        title: "Languages",
        bullets: ["Java, Python, SQL, C, JavaScript, TypeScript"],
      },
      {
        title: "Concepts",
        bullets: [
          "Data Science, Business Intelligence, Market Research, Full-Stack Development, Agile",
        ],
      },
      {
        title: "Tools",
        bullets: [
          "Git, Snowflake, Microsoft Suite (Word, Excel, PowerPoint), APIs",
        ],
      },
      {
        title: "Frameworks & Libraries",
        bullets: [
          "FastAPI, React, Next.js, Pandas, NumPy, Scikit-learn, PyMC, SQLAlchemy",
        ],
      },
    ],
  },
```

This drops `PostgreSQL`, `Flask`, and `REST APIs`, which are not on the resume.

- [ ] **Step 6: Soften the $100K claim**

The resume says `~$100K`. In the `record` export, change the `Avoided` entry's `note` to:

```js
    note: "in annual cost, approximately, from that same pipeline",
```

- [ ] **Step 7: Move the NIKE role to present tense**

CJ is currently at NIKE. In `src/data/resume.js`:

```js
// currentRole.summary
  summary:
    "On the team that builds the machine learning infrastructure behind Nike's global digital platforms.",

// currentRole.bullets[0] AND resumeSections[0].items[0].bullets[0] — both
  "Working on production-scale ML infrastructure with the AI, Data & Machine Learning Engineering team.",
```

Leave the other two bullets alone — "Building and optimizing…" and "Leading an interdisciplinary…" are already present tense.

- [ ] **Step 8: Fix the stale metadata**

In `src/app/layout.js`, the root `description` reads "…NYU computer science, incoming AI/ML engineer intern at NIKE." Drop the word `incoming`. Do the same in `src/app/about/page.js`'s `metadata.description`.

- [ ] **Step 9: Verify**

Run: `npm run build`
Expected: build succeeds. `/projects/univizr` is gone from the static output; `/projects/whatcjsees` is not generated either (Task 7 handles the exclusion — until then it may still generate an empty page, which is fine at this checkpoint).

- [ ] **Step 10: Commit**

```bash
git add src/data/projects.json src/data/resume.js src/app/layout.js src/app/about/page.js
git commit -m "feat: reconcile resume data, present-tense NIKE, remove UniVizr"
```

---

### Task 5: ProjectRow and Timeline components

**Files:**
- Create: `src/components/ProjectRow.jsx`
- Create: `src/components/Timeline.jsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `.card`, `.card-hover`, `.pill` from Task 1; the `linkOut`/`external` fields from Task 4.
- Produces:
  - `<ProjectRow project={object} priority={boolean} />`
  - `<Timeline items={Array<{ title, org, place?, time, bullets: string[] }>} />`
- Consumed by: Tasks 7, 8, 9.

- [ ] **Step 1: Add timeline CSS**

Append to `@layer components`:

```css
  /* --- timeline --------------------------------------------------------- */

  .tl {
    position: relative;
    padding-left: 1.875rem;
  }

  .tl::before {
    content: "";
    position: absolute;
    left: 0.3125rem;
    top: 0.75rem;
    bottom: 0.75rem;
    width: 1px;
    background: linear-gradient(
      to bottom,
      var(--color-gold),
      rgb(200 160 70 / 0.1)
    );
  }

  .tl-item {
    position: relative;
  }

  .tl-item::before {
    content: "";
    position: absolute;
    left: -1.875rem;
    top: 0.5rem;
    width: 0.6875rem;
    height: 0.6875rem;
    border-radius: 999px;
    border: 1px solid var(--color-gold);
    background: var(--color-ink);
  }
```

- [ ] **Step 2: Write Timeline**

Create `src/components/Timeline.jsx`:

```jsx
/**
 * A dotted vertical timeline. Order carries meaning here — these are dated
 * positions in sequence — which is the only reason the site uses a timeline
 * device at all.
 */
export default function Timeline({ items }) {
  return (
    <div className="tl">
      {items.map((item) => (
        <article key={`${item.org}-${item.title}`} className="tl-item pb-9 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="t-h3">{item.title}</h3>
            <p className="t-label">{item.time}</p>
          </div>
          <p className="t-sub-sm mt-1.5">
            {item.org}
            {item.place ? ` · ${item.place}` : ""}
          </p>
          <ul className="mt-3">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="t-sub mb-1.5 last:mb-0">
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Write ProjectRow**

Create `src/components/ProjectRow.jsx`:

```jsx
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * A full-width project record. Three shapes fall out of the data:
 * an entry with a screenshot, an entry without one, and a link-out entry that
 * has no case study at all.
 */
export default function ProjectRow({ project, priority = false }) {
  const href = project.linkOut ? project.external : `/projects/${project.slug}`;
  const external = Boolean(project.linkOut);

  const body = (
    <>
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-rule sm:aspect-auto sm:h-full sm:min-h-[15rem]">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, 48vw"
            className="shot object-cover object-top"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="t-label">
            {project.year} · {project.role}
          </p>
          <span className="pill pill-gold">{project.status}</span>
        </div>

        <h2 className="t-h2 mt-4">{project.title}</h2>
        <p className="t-sub mt-3 max-w-lg">{project.summary}</p>

        {project.features.length > 0 && (
          <ul className="mt-5">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="t-sub-sm border-t border-rule py-2.5">
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="pill">
              {tag}
            </span>
          ))}
        </div>

        <p className="link-rule mt-6 text-[0.8125rem] text-gold">
          {external ? "Visit the site" : "Read the case study"}
          <ArrowUpRight size={15} />
        </p>
      </div>
    </>
  );

  const shell = `group card card-hover grid overflow-hidden ${
    project.image ? "sm:grid-cols-2" : ""
  }`;

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={shell}>
      {body}
    </a>
  ) : (
    <Link href={href} className={shell}>
      {body}
    </Link>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: compiles. The components are not rendered anywhere yet — Task 7 mounts them.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectRow.jsx src/components/Timeline.jsx src/app/globals.css
git commit -m "feat: ProjectRow and Timeline components"
```

---

### Task 6: Landing page

**Files:**
- Create: `src/components/SiteIndex.jsx`
- Modify: `src/app/page.js`
- Modify: `src/components/Hero.js`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `Connector`, `Stagger`, `Reveal` (Task 2); `.card`, `.pill` (Task 1); `currentRole`, `affiliations` (existing `resume.js`).
- Produces: `<SiteIndex />`, self-contained.

The landing keeps four things and drops everything else: hero, the record readout, the NIKE block, and a destination index. No project grid, no portrait, no photography.

```
CJ Thomas / positioning / intro
THE RECORD ──────── gold rule
  four gold figures
AFFILIATIONS strip
        │ connector
NEXT ──────────── gold rule
  NIKE, Inc. card
        │ connector
INDEX ─────────── gold rule
  Work · About · Resume · Contact rows
```

- [ ] **Step 1: Add index CSS**

Append to `@layer components`:

```css
  /* --- index ------------------------------------------------------------ */

  .index-row {
    display: grid;
    align-items: baseline;
    gap: 0.25rem 1.5rem;
    padding: 1.125rem 0;
    border-bottom: 1px solid var(--color-rule);
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "name  arrow"
      "note  note";
    transition: border-color 0.25s ease;
  }

  @media (min-width: 640px) {
    .index-row {
      grid-template-columns: 9rem 1fr auto;
      grid-template-areas: "name note arrow";
      gap: 1.5rem;
    }
  }

  .index-row:hover {
    border-color: rgb(200 160 70 / 0.45);
  }

  .index-name {
    grid-area: name;
  }

  .index-note {
    grid-area: note;
  }

  .index-arrow {
    grid-area: arrow;
    color: var(--color-muted);
    transition: color 0.25s ease, transform 0.35s cubic-bezier(0.2, 0.6, 0.2, 1);
  }

  .index-row:hover .index-arrow {
    color: var(--color-gold);
    transform: translate(3px, -3px);
  }
```

- [ ] **Step 2: Write SiteIndex**

Create `src/components/SiteIndex.jsx`:

```jsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Stagger from "@/components/Stagger";

const destinations = [
  { href: "/projects", name: "Work", note: "Three builds, and what the data layer cost in each" },
  { href: "/about", name: "About", note: "How I work, and where I have been" },
  { href: "/resume", name: "Resume", note: "Experience, education, and the full record" },
  { href: "/contact", name: "Contact", note: "Email, phone, LinkedIn, GitHub" },
];

/**
 * The landing page's second table. It shares the readout's three-column grid
 * on purpose — one instrument, two tables: figures, then destinations.
 */
export default function SiteIndex() {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-label-gold">Index</p>
        <p className="t-label">Four pages</p>
      </div>
      <hr className="hairline-gold mt-3" />

      <Stagger className="mt-1" step={60}>
        {destinations.map((d) => (
          <Link key={d.href} href={d.href} className="index-row">
            <p className="index-name t-h3">{d.name}</p>
            <p className="index-note t-sub-sm">{d.note}</p>
            <ArrowUpRight size={17} className="index-arrow" />
          </Link>
        ))}
      </Stagger>
    </>
  );
}
```

- [ ] **Step 3: Card the NIKE block and rewrite the page**

Replace the whole body of `src/app/page.js`:

```jsx
import Hero from "@/components/Hero";
import SiteIndex from "@/components/SiteIndex";
import Connector from "@/components/Connector";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import { affiliations, currentRole } from "@/data/resume";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="shell">
        <hr className="hairline" />
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 py-5">
          <p className="t-label">Affiliations</p>
          {affiliations.map((name) => (
            <p key={name} className="t-label text-bone">
              {name}
            </p>
          ))}
        </div>
        <hr className="hairline" />
      </section>

      <Connector />

      <Reveal>
        <section className="shell">
          <div className="flex items-baseline justify-between gap-4">
            <p className="t-label-gold">Now</p>
            <p className="t-label">{currentRole.time}</p>
          </div>
          <hr className="hairline-gold mt-3" />

          <div className="card mt-6 grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1fr] lg:gap-14">
            <div>
              <h2 className="t-h2">{currentRole.org}</h2>
              <p className="t-h3 mt-3 text-bone">{currentRole.title}</p>
              <p className="t-sub mt-4 max-w-md">{currentRole.summary}</p>
              <p className="t-label mt-6 leading-[1.6]">
                {currentRole.team} · {currentRole.place}
              </p>
            </div>

            <Stagger className="grid content-start" step={80}>
              {currentRole.bullets.map((bullet) => (
                <p key={bullet} className="t-sub-sm border-t border-rule py-4">
                  {bullet}
                </p>
              ))}
            </Stagger>
          </div>
        </section>
      </Reveal>

      <Connector />

      <Reveal>
        <section className="shell pb-24">
          <SiteIndex />
        </section>
      </Reveal>
    </main>
  );
}
```

- [ ] **Step 4: Card the hero readout**

In `src/components/Hero.js`, wrap the readout block. Change the `<div className="rise mt-12" ...>` opening tag to:

```jsx
      <div className="card rise mt-12 p-6 sm:p-8" style={{ animationDelay: "160ms" }}>
```

Leave everything inside it unchanged. Then change the trailing button row's margin from `mt-10` to `mt-8`.

- [ ] **Step 5: Verify**

Load `/`. Expected:
- The eyebrow above the NIKE card reads "Now", not "Next"
- Hero figures sit inside a gently glowing rounded card
- Two gold connectors draw downward as they scroll into view
- The NIKE card and the index rows are present; no project cards, no portrait, no photography
- Index rows stagger in; hovering one turns its border gold and nudges the arrow up-right
- At 375px wide, `document.documentElement.scrollWidth - clientWidth` is `0`
- Console and server logs are clean

- [ ] **Step 6: Commit**

```bash
git add src/app/page.js src/components/SiteIndex.jsx src/components/Hero.js src/app/globals.css
git commit -m "feat: rebuild / as a landing page with card surfaces and connectors"
```

---

### Task 7: Work page

**Files:**
- Modify: `src/app/projects/page.js`
- Modify: `src/app/projects/[slug]/page.js`
- Delete: `src/components/ProjectCard.jsx`

**Interfaces:**
- Consumes: `ProjectRow` (Task 5), `Stagger` (Task 2), the `linkOut` flag (Task 4).

- [ ] **Step 1: Rewrite the index**

Replace `src/app/projects/page.js`:

```jsx
import ProjectRow from "@/components/ProjectRow";
import Stagger from "@/components/Stagger";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Work",
  description:
    "Projects by CJ Thomas — AI-powered equity research, NBA analytics over a cached pipeline, and a photography portfolio.",
};

export default function ProjectsPage() {
  return (
    <main className="shell section">
      <h1 className="t-display">Work</h1>
      <p className="t-sub-lg mt-4 max-w-xl">
        Everything here started as a data problem. The interface came second,
        which is usually the right order and occasionally the wrong one.
      </p>

      <Stagger className="mt-14 grid gap-6" step={90}>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} priority={i === 0} />
        ))}
      </Stagger>
    </main>
  );
}
```

- [ ] **Step 2: Exclude link-out entries from detail routes**

In `src/app/projects/[slug]/page.js`, change `generateStaticParams`:

```jsx
export function generateStaticParams() {
  return projects.filter((p) => !p.linkOut).map((p) => ({ slug: p.slug }));
}
```

and change the lookup in both `generateMetadata` and `ProjectDetail` from `projects.find((p) => p.slug === slug)` to:

```jsx
  const project = projects.find((p) => p.slug === slug && !p.linkOut);
```

This makes `/projects/whatcjsees` return 404 rather than rendering an empty case study.

- [ ] **Step 3: Pill the detail page tags**

In `src/app/projects/[slug]/page.js`, replace the "Built with" `<ul>` with pills:

```jsx
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="pill">{tag}</span>
              </li>
            ))}
          </ul>
```

Also round the hero screenshot: add `rounded-[var(--radius-card)]` to the `className` of the `div` wrapping the `project.image` `Image`.

- [ ] **Step 4: Delete the unused card**

Run: `grep -rn "ProjectCard" src/`
Expected: no matches after Steps 1–3. Then:

```bash
git rm src/components/ProjectCard.jsx
```

- [ ] **Step 5: Verify**

Load `/projects`. Expected: three rows — BullBrief and Athlytics with screenshots in a two-up card, What CJ Sees as a text-only card whose call to action reads "Visit the site" and opens whatcjsees.vercel.app in a new tab. Rows stagger in. Hover lifts the card and deepens the gold glow.

Load `/projects/whatcjsees`. Expected: 404.
Load `/projects/bullbrief`. Expected: renders, tags are pills.

- [ ] **Step 6: Commit**

```bash
git add -A src/app/projects src/components
git commit -m "feat: editorial project rows, link-out entries, pill tags"
```

---

### Task 8: About page

**Files:**
- Modify: `src/app/about/page.js`
- Delete: `src/components/PhotoCallout.jsx`, `src/components/PhotoGrid.jsx`

**Interfaces:**
- Consumes: `Timeline` (Task 5), `Reveal`/`Stagger`/`Connector` (Task 2), `community` and `resumeSections` (Task 4).

- [ ] **Step 1: Strip photography and add the new sections**

In `src/app/about/page.js`:

- Remove the `PhotoCallout` and `PhotoGrid` imports and the `<Reveal>` section that renders them.
- Correct the intro tense: the first paragraph currently says "This summer I join the AI, Data & Machine Learning Engineering team at NIKE, in Beaverton." Replace with "I am currently on the AI, Data & Machine Learning Engineering team at NIKE, in Beaverton."
- Add imports for `Timeline`, `Stagger`, `Connector`, and `{ affiliations, community, resumeSections }`.
- Leave the intro, portrait, affiliations strip, and "How I work" sections as they are, but put each principle in a `.card`:

```jsx
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-3" step={80}>
          {principles.map((principle) => (
            <article key={principle.title} className="card h-full p-6">
              <h3 className="t-h3">{principle.title}</h3>
              <p className="t-sub-sm mt-3">{principle.text}</p>
            </article>
          ))}
        </Stagger>
```

Note the old markup used `gap-px bg-rule` hairline seams — that conflicts with rounded cards, so it becomes a real gap.

- [ ] **Step 2: Add the experience timeline**

Insert after the "How I work" section:

```jsx
      <Connector />

      <Reveal>
        <section className="shell section pt-0">
          <p className="t-label-gold">Where I have been</p>
          <hr className="hairline-gold mt-3" />
          <div className="mt-8">
            <Timeline items={resumeSections[0].items} />
          </div>
        </section>
      </Reveal>
```

`resumeSections[0]` is the Experience section — NIKE first, then Corbin Advisors.

- [ ] **Step 3: Add the community section**

Insert after the timeline:

```jsx
      <Reveal>
        <section className="shell section pt-0">
          <p className="t-label-gold">Outside the work</p>
          <hr className="hairline-gold mt-3" />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-3" step={80}>
            {community.map((entry) => (
              <article key={entry.org} className="card h-full p-6">
                <p className="t-label">{entry.time}</p>
                <h3 className="t-h3 mt-3">{entry.title}</h3>
                <p className="t-sub-sm mt-1.5 text-bone">{entry.org}</p>
                <p className="t-sub-sm mt-3">{entry.text}</p>
              </article>
            ))}
          </Stagger>
        </section>
      </Reveal>
```

- [ ] **Step 4: Round the portrait**

Add `rounded-[var(--radius-card)]` to the portrait wrapper's className, and swap `bg-raised` for `card` so it picks up the glow.

- [ ] **Step 5: Delete the photo components**

Run: `grep -rn "PhotoCallout\|PhotoGrid" src/`
Expected: no matches. Then:

```bash
git rm src/components/PhotoCallout.jsx src/components/PhotoGrid.jsx
```

The "Restraint is a skill" principle still mentions photography as an influence on the work — that is prose about how he thinks, not a feature of the gallery, so it stays.

- [ ] **Step 6: Verify**

Load `/about`. Expected: no photography block anywhere; a dotted gold timeline with NIKE above Corbin; three community cards; principles as glowing cards. Build passes with no unresolved imports.

- [ ] **Step 7: Commit**

```bash
git add -A src/app/about src/components
git commit -m "feat: About timeline and community, photography removed"
```

---

### Task 9: Resume page

**Files:**
- Modify: `src/app/resume/page.js`

**Interfaces:**
- Consumes: `.card`, `.pill` (Task 1); `Reveal`, `Stagger` (Task 2).

- [ ] **Step 1: Card the record readout**

Wrap the `readout` section's contents in a card, matching the hero:

```jsx
      <section className="mt-16">
        <p className="t-label-gold">Impact</p>
        <hr className="hairline-gold mt-3" />
        <div className="card mt-6 p-6 sm:p-8">
          <div className="readout">
            {/* existing record.map block unchanged */}
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Pill the Skills section values**

The Skills section's items are comma-joined strings in `bullets` (for example `"Python, SQL, Java, JavaScript, TypeScript, C"`). Split them on `", "` and render each as a pill. Replace the existing `<ul>` inside the `section.items.map` with:

```jsx
                <ul
                  className={
                    section.title === "Skills"
                      ? "flex max-w-2xl flex-wrap gap-2"
                      : "max-w-2xl"
                  }
                >
                  {section.title === "Skills"
                    ? item.bullets
                        .flatMap((bullet) => bullet.split(", "))
                        .map((skill) => (
                          <li key={skill}>
                            <span className="pill">{skill}</span>
                          </li>
                        ))
                    : item.bullets.map((bullet) => (
                        <li key={bullet} className="t-sub mb-2 last:mb-0">
                          {bullet}
                        </li>
                      ))}
                </ul>
```

- [ ] **Step 3: Wrap sections in Reveal**

Wrap each `<section>` produced by `resumeSections.map` and the Projects section in `<Reveal>` so they arrive on scroll.

- [ ] **Step 4: Verify**

Load `/resume`. Expected: the Impact figures sit in a card; Skills render as wrapped pills rather than comma prose; Experience, Education, Leadership, Affiliations, and Projects each fade up on scroll; the PDF and email buttons still work.

- [ ] **Step 5: Commit**

```bash
git add src/app/resume/page.js
git commit -m "feat: card the resume readout, pill the skills"
```

---

### Task 10: Contact page

**Files:**
- Modify: `src/app/contact/page.js`
- Modify: `src/components/ContactForm.jsx`

**Interfaces:**
- Consumes: `.card` (Task 1).

- [ ] **Step 1: Remove the photography channel**

In `src/app/contact/page.js`, delete this line from the `channels` array:

```js
  { label: "Photography", value: "whatcjsees", href: contactLinks.photography },
```

What CJ Sees now appears only on `/projects`. `contactLinks.photography` stays in `resume.js` because `projects.json` no longer needs it but nothing breaks by keeping the constant — actually, verify: run `grep -rn "contactLinks.photography" src/` and if there are no remaining consumers, remove the `photography` key from `contactLinks` too.

- [ ] **Step 2: Card the channel list and the form**

Wrap the channel list in a card:

```jsx
          <div className="card mt-10 p-6 sm:p-8">
            <hr className="hairline-gold" />
            {/* existing channels.map block unchanged */}
          </div>
```

Then read `src/components/ContactForm.jsx` and give its outer wrapper the `card` class with `p-6 sm:p-8`, and round its inputs to match by adding `rounded-md` to each field. Keep the existing focus treatment.

- [ ] **Step 3: Verify**

Load `/contact`. Expected: no Photography row; channels and form each sit in a glowing card; the form's focus rings are still visible gold; tab order is unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.js src/components/ContactForm.jsx
git commit -m "feat: card the contact page, drop the photography channel"
```

---

### Task 11: Final verification pass

**Files:** none modified unless defects are found.

- [ ] **Step 1: Build clean**

Run: `npm run build`
Expected: no errors, no warnings about missing modules. Confirm the route list contains `/`, `/about`, `/contact`, `/projects`, `/resume`, `/projects/bullbrief`, `/projects/athlytics` — and does **not** contain `/projects/univizr` or `/projects/whatcjsees`.

- [ ] **Step 2: Check for dead references**

Run: `grep -rn "univizr\|PhotoGrid\|PhotoCallout\|ProjectCard" src/`
Expected: no matches.

- [ ] **Step 3: Walk every page at desktop and mobile**

For each of `/`, `/projects`, `/projects/bullbrief`, `/about`, `/resume`, `/contact`:
- `read_console_messages` with `onlyErrors: true` → empty
- At 375px wide, `document.documentElement.scrollWidth - document.documentElement.clientWidth` → `0`
- Screenshot for the record

- [ ] **Step 4: Check reduced motion**

Run `resize_window` with `colorScheme` unchanged, then in the console emulate reduced motion via devtools. Expected: all content visible, no transforms animating, connectors fully drawn.

- [ ] **Step 5: Check keyboard focus**

Tab through `/` from the top. Expected: the skip link appears first, then the nav pill items, each showing the gold focus outline against the dark surface.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "fix: verification pass corrections"
```

---

## Self-review

**Spec coverage.** Every instruction from the brief maps to a task: rython.dev's look → Tasks 1, 3, 5, 6 (dot grid, radius, glow, pill nav, connectors, timeline, tag pills); refined black-and-gold rather than tech-forward → the masked dot grid and the unchanged typography in Global Constraints; "keep the separate pages the same" → the routing constraint, all five routes preserved; "animate throughout" → Task 2 plus staggers and reveals in 6–9; UniVizr removed → Task 4 Step 1 and Task 11 Step 2; What CJ Sees only on `/projects` with no preview images → Task 4 Step 2 (`image: null`, `gallery: []`), Task 8 (removed from About), Task 10 (removed from Contact); `/` as a landing page → Task 6; more content on the real pages → Tasks 7, 8, 9.

**Known trade-offs.**
- `Stagger` wraps children in divs, which breaks direct grid parenthood. Task 2 Step 5 documents the workaround and Tasks 6–8 apply grid classes to `Stagger` itself.
- Rounded cards are incompatible with the `gap-px bg-rule` hairline-seam trick used on About; Task 8 Step 1 replaces it with real gaps.

**Open item for CJ, not a blocker.** `PhotoGrid` pointed at `/public/placeholders/photo-*.webp` — generated placeholders, never real photographs. Deleting the component removes that inaccuracy from the site rather than fixing it. The files stay in `/public` and can be deleted separately.

**Date discrepancy worth resolving before shipping.** `currentRole.time` is `Jun 2026 — Aug 2026` and the landing labels it "Next" with copy reading "Joining". Today is August 2, 2026, so that window is closing or closed. The tense should probably move to present or past. This plan preserves the existing strings verbatim; changing them is a copy decision for CJ.
