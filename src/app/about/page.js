import Image from "next/image";
import Link from "next/link";
import Connector from "@/components/Connector";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import Timeline from "@/components/Timeline";
import { affiliations, community, resumeSections } from "@/data/resume";

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

export default function AboutPage() {
  return (
    <main>
      <section className="shell section">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <h1 className="t-display">About</h1>
            <p className="t-sub-lg mt-5 max-w-xl">
              I am CJ — a Computer Science student at NYU working across machine
              learning, data engineering, and business intelligence. I am on the
              AI, Data &amp; Machine Learning Engineering team at NIKE, in
              Beaverton.
            </p>
            <p className="t-sub-lg mt-4 max-w-xl">
              Before that I spent two summers at Corbin Advisors, an investor
              relations firm, where I learned that the useful part of analytics
              is rarely the model. It is getting ten thousand inconsistent
              records into a shape someone can present to a board.
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

      <Reveal>
        <section className="shell section pt-0">
          <h2 className="t-label-gold">Where I have been</h2>
          <hr className="hairline-gold mt-3" />
          <div className="mt-8">
            <Timeline items={resumeSections[0].items} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="shell section pt-0">
          <h2 className="t-label-gold">Outside the work</h2>
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
