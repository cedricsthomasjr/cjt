import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      <h1 className="t-display">resume</h1>
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

      <section className="mt-16">
        <p className="t-label-gold">Impact</p>
        <hr className="hairline-gold mt-3" />
        <div className="readout mt-1">
          {record.map((row) => (
            <div key={row.key} className="readout-row">
              <p className="readout-key t-label">{row.key}</p>
              <p className="readout-note t-sub-sm">{row.note}</p>
              <p className="readout-value t-figure">{row.value}</p>
            </div>
          ))}
        </div>
      </section>

      {resumeSections.map((section) => (
        <section key={section.title} className="mt-16">
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
      ))}

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
                <Link
                  href={`/projects/${project.slug}`}
                  className="link-rule mt-3 text-[0.8125rem] text-gold"
                >
                  Case study <ArrowUpRight size={14} />
                </Link>
              </div>
              <p className="t-sub max-w-2xl">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
