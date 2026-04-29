"use client";

import { useParams, notFound } from "next/navigation";
import projects from "src/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen bg-[#080806] pt-16 text-[#f4f1ea]">
      <section className="site-shell grid gap-8 py-12 md:py-16 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="self-end"
        >
          <Link
            href="/projects"
            className="mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#d7d1c3] hover:text-white"
          >
            <ArrowLeft size={16} /> Projects
          </Link>
          <p className="eyebrow">{project.status}</p>
          <h1 className="mt-4 text-[clamp(3rem,8vw,6.8rem)] font-black uppercase leading-[0.86]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#d7d1c3] md:text-lg">
            {project.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                className="solid-button"
              >
                Live <ExternalLink size={16} />
              </Link>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                className="outline-button"
              >
                GitHub <Github size={16} />
              </Link>
            )}
          </div>
        </motion.div>

        <div className="relative aspect-[16/11] overflow-hidden border border-white/10 bg-[#11100d]">
          <Image
            src={project.image}
            alt={`Preview of ${project.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#f4f1ea] py-3 text-[#080806]">
        <div className="site-shell flex flex-wrap justify-center gap-x-8 gap-y-2 text-center text-[11px] font-black uppercase tracking-[0.22em]">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="site-shell grid gap-8 py-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 className="mt-3 text-3xl font-black uppercase md:text-5xl">
            {project.caption}
          </h2>
        </div>
        <div className="space-y-6">
          <p className="text-base leading-7 text-[#d7d1c3] md:text-lg">
            {project.content}
          </p>
          {project.features?.length > 0 && (
            <div>
              <p className="spec-label mb-3">Key features</p>
              <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="bg-[#11100d] p-4 text-sm leading-6 text-[#d7d1c3]"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          )}
          {project.lessons?.filter(Boolean).length > 0 && (
            <div>
              <p className="spec-label mb-3">Learnings</p>
              <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                {project.lessons.filter(Boolean).map((lesson) => (
                  <div
                    key={lesson}
                    className="bg-[#11100d] p-4 text-sm leading-6 text-[#d7d1c3]"
                  >
                    {lesson}
                  </div>
                ))}
              </div>
            </div>
          )}
          <Link href="/contact" className="outline-button">
            Discuss work <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
