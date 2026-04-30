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
    <main className="min-h-screen bg-[#080806] pt-14 text-[#f4f1ea] sm:pt-16">
      <section className="site-shell grid items-end gap-6 py-8 sm:gap-7 sm:py-10 md:py-14 lg:grid-cols-[1fr_360px]">
        <div className="max-w-4xl">
          <p className="eyebrow">Profile</p>
          <h1 className="display-title mt-4">
            Built between code, capital, and camera.
          </h1>
          <p className="body-copy mt-4 max-w-2xl">
            I am CJ, a computer science student at NYU working across AI/ML
            engineering, data science, business intelligence, and finance
            systems. My work sits where practical systems meet sharp
            presentation: analytics pipelines, AI research tools, and product
            dashboards.
          </p>
        </div>
        <div className="relative aspect-[5/4] overflow-hidden border border-white/10 bg-[#11100d] sm:aspect-[4/5]">
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

      <section className="site-shell grid gap-6 border-y border-white/10 py-8 sm:gap-7 sm:py-9 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Brand index</p>
          <h2 className="section-title mt-3">
            Places in the story
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {companyBrands.slice(0, 6).map((brand) => (
            <div key={brand} className="compact-grid-card bg-[#080806]">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#d7d1c3] sm:text-xs sm:tracking-[0.12em]">
                {brand}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell grid gap-6 py-8 sm:gap-7 sm:py-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Operating system</p>
          <h2 className="section-title mt-3">
            How I move
          </h2>
          <div className="mobile-stack-actions mt-5 sm:mt-6">
            <Link href="/resume" className="solid-button">
              Resume <ArrowUpRight size={16} />
            </Link>
            <Link href="/projects" className="outline-button">
              Projects
            </Link>
          </div>
        </div>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="industrial-panel p-4 sm:p-5">
              <p className="spec-label">Principle</p>
              <h3 className="mt-2.5 text-lg font-black uppercase leading-tight sm:mt-3 sm:text-xl">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#d7d1c3] sm:mt-4">
                {principle.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#0f0e0b] py-8 text-[#f4f1ea] sm:py-10">
        <div className="site-shell grid gap-6 sm:gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">
              Specs
            </p>
            <h2 className="section-title mt-3">
              Quick facts
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {quickFacts.map((fact) => (
              <div key={fact} className="compact-grid-card bg-[#11100d]">
                <p className="text-[13px] font-bold uppercase leading-5 tracking-[0.06em] text-[#d7d1c3] sm:text-sm sm:tracking-[0.08em]">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-8 sm:py-10">
        <div className="industrial-panel p-4 sm:p-5 md:p-7">
          <div className="mb-5 grid gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Build rhythm</p>
              <h2 className="mt-2 text-xl font-black uppercase leading-tight sm:text-2xl">
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
          <div className="overflow-x-auto pb-1">
            <GitHubCalendar
              username="cedricsthomasjr"
              blockSize={12}
              blockMargin={3}
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
