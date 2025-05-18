// src/app/projects/page.js
"use client";

import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import projects from "src/data/projects.json";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 pb-24 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            BUILT.
            <br />
            BRANDED.
            <br />
            BACKED BY CODE.
          </h1>
          <p className="mt-6 text-zinc-400 text-lg max-w-xl">
            A collection of tools, experiences, and experiments — built with
            intention and driven by craft.
          </p>
        </motion.section>

        {/* Project Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
}
