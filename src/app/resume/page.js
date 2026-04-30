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
    <main className="min-h-screen bg-[#080806] pt-14 text-[#f4f1ea] sm:pt-16">
      <section className="site-shell grid gap-6 py-8 sm:gap-7 sm:py-10 lg:grid-cols-[1fr_0.62fr] lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="eyebrow">Resume / Summer 2026 profile</p>
          <h1 className="display-title mt-4">
            Engineered to execute.
          </h1>
          <p className="body-copy mt-4 max-w-2xl">
            NYU computer science student focused on AI/ML engineering, data
            pipelines, business intelligence, market research, and full-stack
            product development.
          </p>
          <div className="mobile-stack-actions mt-5 sm:mt-6">
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
          className="industrial-panel self-end p-4 sm:p-5"
        >
          <p className="spec-label">Connect</p>
          <div className="mt-4 grid gap-2 border-t border-white/10 pt-4 text-sm text-[#d7d1c3]">
            <div className="flex items-center justify-between gap-3">
              Location <span className="text-right">{contactLinks.location}</span>
            </div>
            <Link
              href={`mailto:${contactLinks.email}`}
              className="flex items-center justify-between gap-3 hover:text-white"
            >
              Email <Mail size={16} />
            </Link>
            <Link
              href="tel:+12164064458"
              className="flex items-center justify-between gap-3 hover:text-white"
            >
              Phone <Phone size={16} />
            </Link>
            <Link
              href={contactLinks.website}
              target="_blank"
              className="flex items-center justify-between gap-3 hover:text-white"
            >
              Website <Globe size={16} />
            </Link>
            <Link
              href={contactLinks.github}
              target="_blank"
              className="flex items-center justify-between gap-3 hover:text-white"
            >
              GitHub <Github size={16} />
            </Link>
            <Link
              href={contactLinks.linkedin}
              target="_blank"
              className="flex items-center justify-between gap-3 hover:text-white"
            >
              LinkedIn <Linkedin size={16} />
            </Link>
          </div>
        </motion.aside>
      </section>

      <section className="index-band">
        <div className="index-band-grid">
          <span>NYU Computer Science</span>
          <span>AI/ML Engineering</span>
          <span>Data Science + Analytics</span>
        </div>
      </section>

      <section className="site-shell space-y-8 py-8 sm:space-y-10 sm:py-10">
        {resumeSections.map((section, sectionIndex) => (
          <motion.section
            key={section.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: sectionIndex * 0.03 }}
            className="grid gap-4 sm:gap-5 lg:grid-cols-[0.28fr_1fr]"
          >
            <div>
              <p className="eyebrow">{section.kicker}</p>
              <h2 className="mt-2.5 text-lg font-black uppercase leading-tight sm:mt-3 sm:text-xl">
                {section.title}
              </h2>
            </div>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {section.items.map((item) => (
                <article
                  key={`${section.title}-${item.title}-${item.org}`}
                  className="grid gap-3 py-4 md:grid-cols-[0.9fr_1.4fr] md:gap-4"
                >
                  <div>
                    <p className="spec-label">{item.org}</p>
                    <h3 className="mt-2 text-base font-black uppercase leading-tight break-words sm:text-lg">
                      {item.title}
                    </h3>
                    {item.time && (
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f05a28] sm:text-xs sm:tracking-[0.18em]">
                        {item.time}
                      </p>
                    )}
                    {item.slug && (
                      <Link
                        href={`/projects/${item.slug}`}
                        className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#f05a28] hover:text-white sm:mt-4 sm:text-xs sm:tracking-[0.18em]"
                      >
                        Case study <ArrowUpRight size={14} />
                      </Link>
                    )}
                  </div>
                  <ul className="space-y-2.5 text-sm leading-6 text-[#d7d1c3]">
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
