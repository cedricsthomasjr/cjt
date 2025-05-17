"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";

const sections = [
  {
    title: "Work Experience",
    items: [
      {
        title: "Data Science Intern – Corbin Advisors",
        time: "July 2024 – August 2024",
        bullets: [
          "Built a real-time Yahoo Finance scraper using JavaScript.",
          "Streamlined financial analysis using modern visualization tools.",
          "Automated HR email pipelines with Microsoft Power FX.",
        ],
      },
      {
        title: "Winter Intern – Corbin Advisors",
        time: "December 2024 – January 2025",
        bullets: [
          "Developed VBA macros to automate internal workflows.",
          "Designed UI wireframes to improve user experience.",
          "Built dashboards to visualize operational datasets.",
        ],
      },
    ],
  },
  {
    title: "Projects",
    items: [
      {
        title: "WhatCJSees",
        status: "live",
        slug: "whatcjsees",
        bullets: [
          "Visual-first portfolio showcasing original photography through a full-stack site built with modern best practices.",
          "Engineered responsive layouts, gallery transitions, and performance-optimized image rendering with hover metadata.",
        ],
      },
      {
        title: "Athlytic",
        status: "paused",
        slug: "athlytic",
        bullets: [
          "Stat-driven web app that breaks down athlete performance using dynamic APIs and AI-generated insights.",
          "Integrated NBA data via `nba_api`; features smart search, player timelines, and usage breakdowns.",
          "Building toward AI blurbs, shot charts, and real-time leaderboard comparisons.",
        ],
      },

      {
        title: "DegreeMind",
        status: "scaffolding",
        slug: "degreemind",
        bullets: [
          "AI-powered academic planner that builds optimal course schedules, degree maps, and post-grad pathways.",
          "Early features include intelligent major/minor planning, transfer forecasting, and career-linked curriculum suggestions.",
        ],
      },
    ],
  },

  {
    title: "Education",
    items: [
      {
        title: "Transfer Pending",
        time: "Class of 2027",
        bullets: [],
      },
      {
        title: "Louisiana State University",
        time: "2023 – 2025",
        bullets: [
          "B.S. in Computer Science, Software Engineering Concentration.",
          "GPA: 3.67 | President’s List (Spring 2025) | Dean’s List (2x).",
          "47+ credit hours completed across advanced CS and math courses.",
        ],
      },
    ],
  },
  {
    title: "International Experience",
    items: [
      {
        title: "Digital Ambassador – International Business Seminars",
        time: "May 2024 – June 2024",
        bullets: [
          "Studied abroad across 7 countries in 21 days through immersive global business exposure.",
          "Engaged with industry leaders and explored cross-cultural business strategy.",
        ],
      },
    ],
  },
  {
    title: "Skills & Tools",
    items: [
      {
        title: "Languages & Frameworks",
        bullets: [
          "Java, Python, SQL, C, JavaScript, Data Visualization, Data Analysis, React, Flask, Tailwind",
        ],
      },
      {
        title: "Tools",
        bullets: ["Git, Vercel, VS Code, Figma, Power FX, VBA"],
      },
    ],
  },
  {
    title: "Leadership & Recognition",
    items: [
      {
        title: "The Vanguard Initiative (Co-Founder)",
        bullets: [
          "Built and led mentorship programs at both Pace Academy and LSU.",
          "Hosted alumni panels and academic guidance sessions for Black student success.",
        ],
      },
      {
        title: "Organizations & Awards",
        bullets: [
          "President’s List (1x), Dean’s List (2x)",
          "The National Society of Collegiate Scholars (NSCS)",
          "NSBE, DeSoto Society, Web Dev Club",
        ],
      },
    ],
  },
];

export default function ResumePage() {
  const [expanded, setExpanded] = useState(null);

  const toggle = (key) => {
    setExpanded(key === expanded ? null : key);
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-24 pb-32">
      <Navbar />
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            ENGINEERED TO EXECUTE.
            <br className="hidden sm:block" />
            SHARPENED BY EXPERIENCE.
            <br className="hidden sm:block" />
            READY FOR IMPACT.
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            A breakdown of experience, education, and execution — backed by
            performance and built with intention.
          </p>
          <div className="pt-4">
            <a
              href="/CJ_Thomas_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-red-500 px-6 py-2 rounded-lg hover:bg-red-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              Download PDF
            </a>
            <div className="pt-4 flex justify-center gap-6 text-sm text-zinc-400">
              <a
                href="https://github.com/cedricsthomasjr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/cedric-thomas-jr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="mailto:cedricsthomasjr@gmail.edu"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold border-b border-zinc-700 pb-2">
              {section.title}
            </h2>
            {section.items.map((item, itemIdx) => {
              const key = `${idx}-${itemIdx}`;
              return (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Card className="bg-zinc-900 border-zinc-700 p-6 rounded-xl transition-all hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <div
                      onClick={() => toggle(key)}
                      className="cursor-pointer flex justify-between items-start flex-wrap gap-4 sm:items-center"
                    >
                      {/* Left: Title */}
                      <h3 className="text-lg font-semibold">{item.title}</h3>

                      {/* Right: Badge + Date + Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 text-sm text-zinc-400">
                        {item.status && (
                          <span
                            className={`text-xs font-medium uppercase tracking-wide px-2 py-1 rounded w-fit
                            ${
                              item.status === "paused"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                                : item.status === "paused || archived"
                                ? "bg-zinc-800 text-zinc-500 border border-zinc-700"
                                : item.status === "live"
                                ? "bg-green-500/10 text-green-400 border border-green-500/30"
                                : item.status === "scaffolding"
                                ? "bg-red-500/10 text-red-400 border border-red-500/30"
                                : ""
                            }
                              

        }`}
                          >
                            {item.status}
                          </span>
                        )}
                        {item.time && <span>{item.time}</span>}
                      </div>
                    </div>

                    {/* Expanded Bullet Content */}
                    {expanded === key && (
                      <>
                        <ul className="list-disc pl-6 mt-4 space-y-1 text-sm text-zinc-300">
                          {item.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                        {item.slug && (
                          <div className="mt-6 pl-6">
                            <a
                              href={`/projects/${item.slug}`}
                              className="inline-block text-sm font-medium text-red-400 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-all"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View Case Study →
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </motion.section>
        ))}
      </div>
    </main>
  );
}
