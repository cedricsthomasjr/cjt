"use client";

import ProjectCard from "@/components/ProjectCard";
import projects from "src/data/projects.json";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#080806] pt-16 text-[#f4f1ea]">
      <section className="site-shell py-12 md:py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="eyebrow">Catalog</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.6rem)] font-black uppercase leading-[0.88]">
            Built. Branded. Backed by code.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#d7d1c3] md:text-lg">
            A limited collection of software products, visual systems, and
            finance experiments built for clarity, speed, and taste.
          </p>
        </motion.section>
      </section>

      <section className="border-y border-white/10 bg-[#f4f1ea] py-3 text-[#080806]">
        <div className="site-shell grid gap-3 text-center text-[11px] font-black uppercase tracking-[0.22em] sm:grid-cols-3">
          <span>AI finance</span>
          <span>Academic planning</span>
          <span>Full-stack data</span>
        </div>
      </section>

      <section className="site-shell space-y-6 py-12">
        <motion.div initial="hidden" animate="show" className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
