"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  const stats = [
    ["Expected Graduation", "May 2027"],
    ["GPA", "3.53"],
    ["Semester GPA", "4.00"],
    ["Dean’s List", "3x"],
    ["President’s List", "1x"],
    ["Internships", "2x"],
    ["Projects Being Built", "3"],
    ["Countries Traveled", "7"],
    ["Mission", "1"],
  ];

  const timeline = [
    { year: "2021", event: "Graduated High School" },
    { year: "2022", event: "Started LSU | First Internship" },
    { year: "2023", event: "Launched 'WhatCJSees' | 2nd Internship" },
    { year: "2024", event: "Built 'Athlytic' | Applied to Transfer" },
    { year: "2025", event: "Transferred | Finalized Career Plan" },
  ];

  return (
    <main className="relative min-h-screen bg-black text-white px-6 md:px-12 py-24 overflow-hidden">
      <section className="relative z-10 max-w-6xl mx-auto space-y-20">
        <Navbar />
        {/* Hero Section - now less vertical, side by side layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h1 className="relative inline-block text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-red-500 animate-gradient-glow">
              Who is CJ Thomas?
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed">
              I'm a builder, a thinker, and a product of both contrast and
              connection. Raised in multiple states, molded by movement, and
              driven by design. Currently studying Computer Science with a
              concentration in Software Engineering, I pair technical edge with
              a passion for finance, visuals, and people.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-xl shadow-lg mx-auto w-full max-w-xs"
          >
            <Image
              src="/cj2.jpeg"
              alt="CJ Thomas in an art gallery"
              width={384}
              height={512}
              className="object-cover w-full h-auto"
            />
          </motion.div>
        </motion.div>

        {/* The Pillars */}
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          {[
            ["🧠 Thinking in Systems", "Logic-first with design at heart."],
            ["🎨 Creative Execution", "From pixels to product."],
            ["📈 Impact-Oriented", "Everything I touch has purpose."],
          ].map(([title, desc]) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 hover:border-red-600 transition"
            >
              <h4 className="text-lg font-semibold mb-2">{title}</h4>
              <p className="text-sm text-neutral-400">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-2xl font-semibold text-left">📅 Timeline</h3>
          <div className="border-l-2 border-zinc-700 pl-6 space-y-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-[13px] top-1 w-3 h-3 bg-red-600 rounded-full" />
                <p className="text-sm text-white font-medium">{item.year}</p>
                <p className="text-sm text-neutral-400">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deeper Sections */}
        <div className="space-y-16 max-w-3xl mx-auto">
          {["📍 Where I'm From", "🧠 How I Think", "🎯 What Drives Me"].map(
            (title, i) => {
              const content = [
                "Born in Cleveland, raised between Dana Point, the Bay Area, and Atlanta. I’ve lived in twelve homes, attended five schools, and seen both sides of the socioeconomic divide. That journey gave me a trait most people talk about but rarely have — adaptability.",
                "I build with intention. My background in software engineering grounds me in logic, but I’m obsessed with experiences that feel natural — frictionless. Whether it’s a photography site or a data tool, I want it to leave an impression without needing to shout.",
                "Equity in tech. Efficiency in systems. Freedom through design. I’m not here to follow blueprints — I’m here to write my own. The future I’m building? Clean UI. Clear outcomes. Real impact.",
              ][i];
              return (
                <div
                  key={title}
                  className={`space-y-3 ${
                    i % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="text-base text-neutral-400 leading-relaxed">
                    {content}
                  </p>
                </div>
              );
            }
          )}
        </div>

        {/* Personal Quote */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="border-l-4 border-red-600 pl-6 text-neutral-300 italic text-lg max-w-3xl mx-auto"
        >
          “I was never chasing titles. I’m here to build things that matter —
          and make sure they look good doing it.”
        </motion.blockquote>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.05 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
        >
          {stats.map(([label, stat]) => (
            <motion.div
              key={label}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="rounded-md border border-neutral-800 bg-zinc-950/40 p-2.5 text-center hover:border-red-600 hover:shadow-[0_0_10px_#dc2626aa] transition"
            >
              <div className="text-sm font-medium text-white/90 leading-tight">
                {stat}
              </div>
              <div className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wide">
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Outro Line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-neutral-500 text-base max-w-2xl mx-auto"
        >
          Everything you see on this site? Built from scratch. Same goes for the
          path I’m on.
        </motion.div>
      </section>
    </main>
  );
}
