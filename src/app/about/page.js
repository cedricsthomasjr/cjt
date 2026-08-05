import Image from "next/image";
import Link from "next/link";
import Connector from "@/components/Connector";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import UsaMap from "@/components/UsaMap";
import { affiliations } from "@/data/resume";
import { TIMELINE_DATA } from "@/data/timelineData";

export const metadata = {
  title: "About",
  description:
    "CJ Thomas — NYU computer science, AI/ML engineer intern at NIKE, previously data science and analytics at Corbin Advisors.",
};

const principles = [
  {
    title: "The data layer is the product",
    text: "Most tools that feel bad feel bad because the model underneath is wrong. I would rather spend a week on the schema than a month on the symptoms.",
  },
  {
    title: "A number you can defend",
    text: "Analysis is only finished when it survives a follow-up question. I build toward figures that hold up when someone pushes on them.",
  },
  {
    title: "Restraint is a skill",
    text: "Photography taught me that what you leave out decides what the viewer sees. The same holds for an interface and for a dashboard.",
  },
];

/**
 * The chronological groups the route is told in. Connecticut collapses three
 * TIMELINE_DATA entries (the three Corbin stints) into one stop with three
 * sub-entries, since they share a place and an employer.
 */
const ROUTE_GROUPS = [
  { label: "Atlanta", ids: ["atl-stop"] },
  { label: "Baton Rouge", ids: ["btr-stop"] },
  { label: "Connecticut", ids: ["ct-corbin-1", "ct-corbin-2", "ct-corbin-3"] },
  { label: "New York City", ids: ["nyc-stop"] },
  { label: "Beaverton", ids: ["beaverton-stop"] },
].map((group) => ({
  ...group,
  stops: group.ids.map((id) => TIMELINE_DATA.find((stop) => stop.id === id)),
}));

export default function AboutPage() {
  return (
    <main>
      <section className="shell section">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h1 className="t-display">About</h1>
            <p className="t-sub-lg mt-5 max-w-xl">
              I am CJ — a Computer Science student at NYU working across machine
              learning, data engineering, and business intelligence. Currently on
              the AI, Data &amp; Machine Learning Engineering team at NIKE, in
              Beaverton. The route that got me there is below.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden card">
            <Image
              src="/cj2.jpeg"
              alt="CJ Thomas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-[50%_22%]"
            />
          </div>
        </div>
      </section>

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
        <section className="shell section">
          <h2 className="t-label-gold">The route</h2>
          <hr className="hairline-gold mt-3" />
          <div className="mt-8">
            <UsaMap />
          </div>
        </section>
      </Reveal>

      <section className="shell section">
        <h2 className="t-h2">How I work</h2>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-3" step={80}>
          {principles.map((principle) => (
            <article key={principle.title} className="card h-full p-6">
              <h3 className="t-h3">{principle.title}</h3>
              <p className="t-sub-sm mt-3">{principle.text}</p>
            </article>
          ))}
        </Stagger>
      </section>

      <Connector />

      {/* The story, told chronologically: Atlanta → Baton Rouge → Connecticut
          → New York City → Beaverton. Narrative only — quantifiable impact
          lives on the resume page, not here. */}
      <Reveal>
        <section className="shell section pt-0">
          <h2 className="t-label-gold">Where I have been</h2>
          <hr className="hairline-gold mt-3" />
          <div className="tl mt-8">
            {ROUTE_GROUPS.map((group) => (
              <article key={group.label} className="tl-item pb-9 last:pb-0">
                <h3 className="t-h3">{group.label}</h3>

                {group.stops.map((stop) => (
                  <div key={stop.id} className="card mt-4 p-6 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="t-sub-sm text-bone">
                        {stop.companyOrContext}
                        {stop.roleTitle ? ` · ${stop.roleTitle}` : ""}
                      </p>
                      <p className="t-label">{stop.period}</p>
                    </div>

                    <p className="t-sub mt-3 max-w-2xl">{stop.narrativeSummary}</p>

                    {(stop.tricksOfTheTrade.length > 0 ||
                      stop.softSkills.length > 0) && (
                      <ul className="mt-3 max-w-2xl">
                        {[...stop.tricksOfTheTrade, ...stop.softSkills].map(
                          (line) => (
                            <li key={line} className="t-sub-sm mb-1.5 last:mb-0">
                              {line}
                            </li>
                          )
                        )}
                      </ul>
                    )}

                    {stop.affiliationsGained.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {stop.affiliationsGained.map((name) => (
                          <span key={name} className="pill">
                            {name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="shell section">
        <h2 className="t-h2">The short version</h2>
        <p className="t-sub mt-3 max-w-md">
          The full record is on the resume, and the PDF is a click away.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/resume" className="btn-solid">
            Read the resume
          </Link>
          <Link href="/contact" className="btn">
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}
