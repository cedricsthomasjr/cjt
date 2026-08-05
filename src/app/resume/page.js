import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Figure from "@/components/Figure";
import ImpactCalculator from "@/components/ImpactCalculator";
import Reveal from "@/components/Reveal";
import { contactLinks, record, resumeSections } from "@/data/resume";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Resume",
  description:
    "CJ Thomas — AI/ML engineer intern at NIKE, data science and analytics at Corbin Advisors, B.S. Computer Science at NYU.",
};

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

      {/* The cumulative impact numbers, in one place. The narrative behind
          each one — where, when, and how — lives on the About page; this is
          the figures a reader can scan and defend on their own. */}
      <Reveal>
        <section className="mt-16">
          <h2 className="t-label-gold">Impact</h2>
          <hr className="hairline-gold mt-3" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {record.map((row, i) => (
              <div key={row.key} className="card p-6">
                <p className="t-label">{row.key}</p>
                <p className="t-figure mt-2 text-gold">
                  <Figure
                    prefix={row.prefix}
                    num={row.num}
                    suffix={row.suffix}
                    delay={i * 90}
                  />
                </p>
                <p className="t-sub-sm mt-2">{row.note}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Same seven stops as the About page's map, but flat: no grouping, no
          narrative, no story. Corbin's three stints get one row each here,
          because a reader checking a metric wants the stint, not the place. */}
      <Reveal>
        <section className="mt-16">
          <h2 className="t-label-gold">Impact calculator</h2>
          <hr className="hairline-gold mt-3" />
          <div className="mt-6">
            <ImpactCalculator />
          </div>
        </section>
      </Reveal>

      {resumeSections.map((section) => (
        <Reveal key={section.title}>
          <section className="mt-16">
            <h2 className="t-h2">{section.title}</h2>
            <hr className="hairline-gold mt-3" />

            <div>
              {section.items.map((item) => (
                <article
                  key={`${section.title}-${item.title}`}
                  className="grid gap-3 border-b border-rule py-6 lg:grid-cols-[18rem_1fr] lg:gap-10"
                >
                  <div>
                    <h3 className="t-h3">{item.title}</h3>
                    {item.org && (
                      <p className="t-sub-sm mt-1.5">
                        {item.org}
                        {item.place ? ` · ${item.place}` : ""}
                      </p>
                    )}
                    {item.time && (
                      <p className="t-label-gold mt-3">{item.time}</p>
                    )}
                  </div>

                  <ul
                    className={
                      section.title === "Skills"
                        ? "flex max-w-2xl flex-wrap gap-2"
                        : "max-w-2xl"
                    }
                  >
                    {section.title === "Skills"
                      ? item.bullets
                          .flatMap((bullet) =>
                            bullet.split(/,\s*(?![^()]*\))/)
                          )
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
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      ))}

      <Reveal>
        <section className="mt-16">
          <h2 className="t-h2">Projects</h2>
          <hr className="hairline-gold mt-3" />
          <div>
            {projects.map((project) => (
              <article
                key={project.slug}
                className="grid gap-3 border-b border-rule py-6 lg:grid-cols-[18rem_1fr] lg:gap-10"
              >
                <div>
                  <h3 className="t-h3">{project.title}</h3>
                  <p className="t-sub-sm mt-1.5">{project.role}</p>
                  {project.linkOut ? (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noreferrer"
                      className="link-rule mt-3 text-[0.8125rem] text-gold"
                    >
                      Visit the site <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="link-rule mt-3 text-[0.8125rem] text-gold"
                    >
                      Case study <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
                <p className="t-sub max-w-2xl">{project.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
