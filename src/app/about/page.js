"use client";

import GitHubCalendar from "react-github-calendar";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { companyBrands } from "@/data/resume";

const principles = [
  {
    title: "Systems thinking",
    text: "I like work that turns messy inputs into dependable workflows.",
  },
  {
    title: "Visual judgment",
    text: "Photography trained my eye for composition, hierarchy, and restraint.",
  },
  {
    title: "Market fluency",
    text: "Finance gives my technical work a sharper sense of stakes and signal.",
  },
];

const quickFacts = [
  "NYU Computer Science, GPA 3.55",
  "President's List and Dean's List (2x)",
  "Incoming AI/ML Engineer Intern at NIKE",
  "Secretary, Business and Finance Group",
  "SEO Career EDGE Participant",
  "Java, Python, SQL, C, JavaScript, TypeScript",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#080806] pt-16 text-[#f4f1ea]">
      <section className="site-shell grid items-end gap-8 py-12 md:py-16 lg:grid-cols-[1fr_380px]">
        <div className="max-w-4xl">
          <p className="eyebrow">Profile</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-black uppercase leading-[0.88]">
            Built between code, capital, and camera.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#d7d1c3] md:text-lg">
            I am CJ, a computer science student at NYU working across AI/ML
            engineering, data science, business intelligence, and finance
            systems. My work sits where practical systems meet sharp
            presentation: analytics pipelines, AI research tools, and product
            dashboards.
          </p>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#11100d]">
          <Image
            src="/cj2.jpeg"
            alt="CJ Thomas portrait"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover object-[50%_24%]"
          />
        </div>
      </section>

      <section className="site-shell grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Brand index</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">
            Places in the story
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {companyBrands.map((brand) => (
            <div key={brand} className="bg-[#080806] p-4">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d7d1c3]">
                {brand}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell grid gap-8 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Operating system</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">
            How I move
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/resume" className="solid-button">
              Resume <ArrowUpRight size={16} />
            </Link>
            <Link href="/projects" className="outline-button">
              Projects
            </Link>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="industrial-panel p-5">
              <p className="spec-label">Principle</p>
              <h3 className="mt-3 text-xl font-black uppercase">
                {principle.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-[#d7d1c3]">
                {principle.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f4f1ea] py-12 text-[#080806]">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a63d1d]">
              Specs
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase md:text-5xl">
              Quick facts
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div key={fact} className="bg-[#f4f1ea] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.1em]">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-12">
        <div className="industrial-panel p-5 md:p-7">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Build rhythm</p>
              <h2 className="mt-2 text-3xl font-black uppercase">
                GitHub activity
              </h2>
            </div>
            <Link
              href="https://github.com/cedricsthomasjr"
              target="_blank"
              className="outline-button"
            >
              GitHub <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="cedricsthomasjr"
              blockSize={14}
              blockMargin={4}
              colorScheme="dark"
              theme={{
                dark: ["#17140f", "#6d2c1a", "#a63d1d", "#d44e24", "#f05a28"],
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
