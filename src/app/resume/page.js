"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { companyBrands, contactLinks, resumeSections } from "@/data/resume";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#080806] pt-16 text-[#f4f1ea]">
      <section className="site-shell grid gap-8 py-12 lg:grid-cols-[1fr_0.62fr] lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="eyebrow">Resume / Summer 2026 profile</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-black uppercase leading-[0.88]">
            Engineered to execute.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#d7d1c3] md:text-lg">
            NYU computer science student focused on AI/ML engineering, data
            pipelines, business intelligence, market research, and full-stack
            product development.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={contactLinks.resumePdf}
              target="_blank"
              className="solid-button"
            >
              PDF <ArrowDownToLine size={16} />
            </Link>
            <Link
              href={`mailto:${contactLinks.email}`}
              className="outline-button"
            >
              Email <Mail size={16} />
            </Link>
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="industrial-panel self-end p-5"
        >
          <p className="spec-label">Brand index</p>
          <div className="mt-4 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {companyBrands.slice(0, 4).map((brand) => (
              <div key={brand} className="bg-[#11100d] p-3">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#d7d1c3]">
                  {brand}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-sm text-[#d7d1c3]">
            <div className="flex items-center justify-between">
              Location <span>{contactLinks.location}</span>
            </div>
            <Link
              href={`mailto:${contactLinks.email}`}
              className="flex items-center justify-between hover:text-white"
            >
              Email <Mail size={16} />
            </Link>
            <Link
              href="tel:+12164064458"
              className="flex items-center justify-between hover:text-white"
            >
              Phone <Phone size={16} />
            </Link>
            <Link
              href={contactLinks.website}
              target="_blank"
              className="flex items-center justify-between hover:text-white"
            >
              Website <Globe size={16} />
            </Link>
            <Link
              href={contactLinks.github}
              target="_blank"
              className="flex items-center justify-between hover:text-white"
            >
              GitHub <Github size={16} />
            </Link>
            <Link
              href={contactLinks.linkedin}
              target="_blank"
              className="flex items-center justify-between hover:text-white"
            >
              LinkedIn <Linkedin size={16} />
            </Link>
          </div>
        </motion.aside>
      </section>

      <section className="border-y border-white/10 bg-[#f4f1ea] py-3 text-[#080806]">
        <div className="site-shell grid gap-3 text-center text-[11px] font-black uppercase tracking-[0.22em] sm:grid-cols-3">
          <span>NYU Computer Science</span>
          <span>AI/ML Engineering</span>
          <span>Data Science + Analytics</span>
        </div>
      </section>

      <section className="site-shell space-y-12 py-12">
        {resumeSections.map((section, sectionIndex) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: sectionIndex * 0.03 }}
            className="grid gap-5 lg:grid-cols-[0.28fr_1fr]"
          >
            <div>
              <p className="eyebrow">{section.kicker}</p>
              <h2 className="mt-3 text-2xl font-black uppercase">
                {section.title}
              </h2>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {section.items.map((item) => (
                <article
                  key={`${section.title}-${item.title}-${item.org}`}
                  className="grid gap-4 py-5 md:grid-cols-[0.9fr_1.4fr]"
                >
                  <div>
                    <p className="spec-label">{item.org}</p>
                    <h3 className="mt-2 text-xl font-black uppercase leading-tight">
                      {item.title}
                    </h3>
                    {item.time && (
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f05a28]">
                        {item.time}
                      </p>
                    )}
                    {item.slug && (
                      <Link
                        href={`/projects/${item.slug}`}
                        className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f05a28] hover:text-white"
                      >
                        Case study <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                  <ul className="space-y-3 text-sm leading-6 text-[#d7d1c3]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </motion.section>
        ))}
      </section>
    </main>
  );
}
