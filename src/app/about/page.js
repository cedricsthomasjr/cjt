import Image from "next/image";
import Link from "next/link";
import PhotoCallout from "@/components/PhotoCallout";
import PhotoGrid from "@/components/PhotoGrid";
import Reveal from "@/components/Reveal";
import { affiliations } from "@/data/resume";

export const metadata = {
  title: "About",
  description:
    "CJ Thomas — NYU computer science, incoming AI/ML engineer intern at NIKE, previously data science and analytics at Corbin Advisors.",
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
              learning, data engineering, and business intelligence. This summer
              I join the AI, Data &amp; Machine Learning Engineering team at
              NIKE, in Beaverton.
            </p>
            <p className="t-sub-lg mt-4 max-w-xl">
              Before that I spent two summers at Corbin Advisors, an investor
              relations firm, where I learned that the useful part of analytics
              is rarely the model. It is getting ten thousand inconsistent
              records into a shape someone can present to a board.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden border border-rule bg-raised">
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
        <div className="mt-8 grid gap-px bg-rule sm:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="bg-ink p-6">
              <h3 className="t-h3">{principle.title}</h3>
              <p className="t-sub-sm mt-3">{principle.text}</p>
            </article>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="shell pb-8">
          <PhotoCallout />
          <div className="mt-4">
            <PhotoGrid />
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
