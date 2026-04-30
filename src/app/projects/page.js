"use client";

import ProjectCard from "@/components/ProjectCard";
import projects from "src/data/projects.json";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#080806] pt-14 text-[#f4f1ea] sm:pt-16">
      <section className="site-shell py-8 sm:py-10 md:py-14">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
          <p className="eyebrow">Catalog</p>
          <h1 className="display-title mt-4">
            Built. Branded. Backed by code.
          </h1>
          <p className="body-copy mt-4 max-w-2xl">
            A limited collection of software products, visual systems, and
            finance experiments built for clarity, speed, and taste.
          </p>
        </motion.section>
      </section>

      <section className="index-band">
        <div className="index-band-grid">
          <span>AI finance</span>
          <span>Academic planning</span>
          <span>Full-stack data</span>
        </div>
      </section>

      <section className="site-shell space-y-5 py-8 sm:py-10">
        <motion.div initial="hidden" animate="show" className="space-y-4 sm:space-y-6">
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
