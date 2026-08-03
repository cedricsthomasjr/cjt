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
