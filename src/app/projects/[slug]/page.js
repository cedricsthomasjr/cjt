"use client";
import { useParams } from "next/navigation";
import projects from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function ProjectDetail() {
  const { slug } = useParams(); // ⬅️ FIXED: unwrap params using the hook
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const paragraphs = project.content.trim().split("\n").filter(Boolean);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <main className="px-6 md:px-16 py-24 max-w-4xl mx-auto space-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-red-500 to-red-700 text-transparent bg-clip-text">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-lg">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-zinc-800 px-3 py-1 text-sm rounded-full border border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-zinc-700"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Overview Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-400 border-b border-zinc-700 pb-2">
              Overview
            </h2>
            <div className="space-y-4 text-zinc-300 text-lg leading-relaxed">
              {paragraphs.map((line, i) => (
                <p key={i}>{line.trim()}</p>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-400 border-b border-zinc-700 pb-2">
              Links
            </h2>
            <div className="flex gap-4 flex-wrap">
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
                >
                  Visit Live Site
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition border border-zinc-600"
                >
                  View GitHub Repo
                </Link>
              )}
            </div>
          </div>
        </motion.section>

        {/* Back Nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="pt-10"
        >
          <Link
            href="/projects"
            className="text-sm text-zinc-500 hover:text-white transition"
          >
            ← Back to Projects
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
