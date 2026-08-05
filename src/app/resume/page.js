import { ArrowUpRight } from "lucide-react";
import ImpactCalculator from "@/components/ImpactCalculator";
import Reveal from "@/components/Reveal";
import Skills from "@/components/Skills";
import { contactLinks, resumeSections } from "@/data/resume";

export const metadata = {
  title: "Resume",
  description:
    "CJ Thomas — AI/ML engineer intern at NIKE, data science and analytics at Corbin Advisors, B.S. Computer Science at NYU.",
};

/**
 * Skills renders directly under Impact via its own component (it needs
 * hover/tap state the plain ResumeSection below doesn't), pulled out of the
 * normal resumeSections loop. Everything else — Experience / Timeline,
 * Education, Leadership and Reach, Affiliations — renders in data order
 * after that pair. Project cards live on their own route (/projects); this
 * page no longer duplicates them.
 */
const skillsSection = resumeSections.find((section) => section.title === "Skills");
const remainingSections = resumeSections.filter((section) => section.title !== "Skills");

function ResumeSection({ section }) {
  return (
    <Reveal>
      <section className="mt-12 sm:mt-16 lg:mt-20">
        <h2 className="t-h2">{section.title}</h2>
        <hr className="hairline-gold mt-3" />

        <div>
          {section.items.map((item) => (
            <article
              key={`${section.title}-${item.title}`}
              className="grid gap-3 border-b border-rule py-6 last:border-b-0 sm:py-7 lg:grid-cols-[18rem_1fr] lg:gap-10 lg:py-8"
            >
              <div>
                <h3 className="t-h3">{item.title}</h3>
                {item.org && (
                  <p className="t-sub-sm mt-1.5">
                    {item.org}
                    {item.place ? ` · ${item.place}` : ""}
                  </p>
                )}
                {item.time && <p className="t-label-gold mt-3">{item.time}</p>}
                {item.status && (
                  <p className="mt-2">
                    <span className="pill pill-gold">{item.status}</span>
                  </p>
                )}
              </div>

              <ul className="max-w-2xl">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="t-sub mb-2 last:mb-0">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

export default function ResumePage() {
  return (
    <main className="shell section">
      <h1 className="t-display">Resume</h1>
      <p className="t-sub-lg mt-4 max-w-xl">
        Machine learning, data engineering, and business intelligence, with
        enough finance to know what the numbers are for.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href={contactLinks.resumePdf}
          target="_blank"
          rel="noreferrer"
          className="btn-solid"
        >
          Download PDF <ArrowUpRight size={15} />
        </a>
        <a href={`mailto:${contactLinks.email}`} className="btn">
          Email me
        </a>
      </div>

      {/* Same seven stops as the About page's map, but flat: no grouping, no
          narrative, no story. Corbin's three stints get one row each here,
          because a reader checking a metric wants the stint, not the place.
          This is the one Impact surface on the page now — the old static
          metric cards were a redundant second copy of the same numbers. */}
      <Reveal>
        <section className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="t-label-gold">Impact</h2>
          <hr className="hairline-gold mt-3" />
          <div className="mt-6 sm:mt-7 lg:mt-8">
            <ImpactCalculator />
          </div>
        </section>
      </Reveal>

      {skillsSection && <Skills section={skillsSection} />}

      {remainingSections.map((section) => (
        <ResumeSection key={section.title} section={section} />
      ))}
    </main>
  );
}
