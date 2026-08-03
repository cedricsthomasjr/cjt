import Link from "next/link";
import Figure from "@/components/Figure";
import { record } from "@/data/resume";

/**
 * The hero is a brief — the thing BullBrief does to a company, pointed at CJ.
 * Bold sans carries the claims and the figures; Palatino italic carries the
 * voice. Those are the only two registers on the page.
 */
export default function Hero() {
  return (
    <section className="shell pb-16 pt-20 sm:pb-24 sm:pt-28">
      <div className="rise" style={{ animationDelay: "0ms" }}>
        <h1 className="t-display">CJ Thomas</h1>
        <p className="t-sub-lg mt-3 max-w-2xl">
          AI/ML and Data Engineering · NYU Computer Science, 2027 · New York and Atlanta
        </p>
      </div>

      <p
        className="t-sub-lg rise mt-8 max-w-xl text-bone"
        style={{ animationDelay: "80ms" }}
      >
        Most of my work sits upstream of the dashboard — the pipelines and
        schemas that decide whether a number can be trusted. What comes out is
        usually a pipeline, a dashboard, or a brief.
      </p>

      <div className="card rise mt-12 p-6 sm:p-8" style={{ animationDelay: "160ms" }}>
        <div className="flex items-baseline justify-between gap-4">
          <p className="t-label-gold">The record</p>
          <p className="t-label">Corbin Advisors · 2024—2025</p>
        </div>
        <hr className="hairline-gold mt-3" />

        <div className="readout mt-1">
          {record.map((row, i) => (
            <div
              key={row.key}
              className="readout-row rise"
              style={{ animationDelay: `${220 + i * 70}ms` }}
            >
              <p className="readout-key t-label">{row.key}</p>
              <p className="readout-note t-sub-sm">{row.note}</p>
              <p className="readout-value t-figure">
                <Figure
                  prefix={row.prefix}
                  num={row.num}
                  suffix={row.suffix}
                  delay={i * 90}
                />
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="rise mt-8 flex flex-wrap gap-3"
        style={{ animationDelay: "520ms" }}
      >
        <Link href="/projects" className="btn-solid">
          See the work
        </Link>
        <Link href="/contact" className="btn">
          Get in touch
        </Link>
      </div>
    </section>
  );
}
