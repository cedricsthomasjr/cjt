"use client";

import { useParams, notFound } from "next/navigation";
import projects from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const paragraphs = project.content.trim().split("\n").filter(Boolean);

  return (
    <div className="bg-[#0d0d0d] text-zinc-200 min-h-screen font-sans antialiased">
      <Navbar />
      <section className="pt-10 py-40 px-6">
        <Link
          href="/projects"
          className="text-sm text-white border border-white rounded-full px-4 py-2  hover:text-red-400 transition"
        >
          ← Back to Projects
        </Link>
      </section>

      <main className="px-6 md:px-20 pt-32 pb-24 max-w-4xl mx-auto space-y-16">
        {/* TITLE */}
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {project.description}
          </p>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="uppercase tracking-wider text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* HERO IMAGE */}
        <div className="space-y-2">
          <div className="relative w-full h-80 md:h-[28rem] overflow-hidden rounded-xl border border-zinc-800">
            <Image
              src={project.image}
              alt={`Image preview of ${project.title}`}
              fill
              className="object-cover"
            />
          </div>
          {project.caption && (
            <figcaption className="text-sm text-zinc-500 italic pt-2">
              {project.caption} — a visual overview of the core interface or
              concept.
            </figcaption>
          )}
        </div>

        {/* OVERVIEW */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">
            Project Overview
          </h2>

          <div className="space-y-6">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-base md:text-lg text-zinc-300 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* LINKS */}
        {(project.live || project.github) && (
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white border-b border-zinc-800 pb-2">
              Related Links
            </h2>

            <ul className="space-y-2 text-sm text-zinc-400">
              {project.live && (
                <li className="flex items-center gap-2">
                  <ExternalLink size={16} className="text-red-500" />
                  <Link
                    href={project.live}
                    target="_blank"
                    className="hover:text-white underline underline-offset-4"
                  >
                    Live Site
                  </Link>
                </li>
              )}
              {project.github && (
                <li className="flex items-center gap-2">
                  <Github size={16} className="text-red-500" />
                  <Link
                    href={project.github}
                    target="_blank"
                    className="hover:text-white underline underline-offset-4"
                  >
                    GitHub Repository
                  </Link>
                </li>
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
