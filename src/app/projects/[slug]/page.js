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
    <main className="min-h-screen bg-[#080806] pt-14 text-[#f4f1ea] sm:pt-16">
      <section className="site-shell grid gap-6 py-8 sm:gap-7 sm:py-10 md:py-14 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="self-end"
        >
          <Link
            href="/projects"
            className="mb-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d7d1c3] hover:text-white sm:mb-7 sm:text-xs sm:tracking-[0.18em]"
          >
            <ArrowLeft size={16} /> Projects
          </Link>
          <p className="eyebrow">{project.status}</p>
          <h1 className="display-title mt-4">
            {project.title}
          </h1>
          <p className="body-copy mt-4 max-w-2xl">
            {project.description}
          </p>
          <div className="mobile-stack-actions mt-5 sm:mt-6">
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

        <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#11100d] sm:aspect-[16/11]">
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

      <section className="index-band">
        <div className="site-shell flex flex-wrap justify-center gap-x-5 gap-y-2 text-center text-[10px] font-black uppercase tracking-[0.1em] sm:gap-x-7 sm:text-[11px] sm:tracking-[0.14em]">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </section>

      <section className="site-shell grid gap-6 py-8 sm:gap-7 sm:py-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 className="section-title mt-3">
            {project.caption}
          </h2>
        </div>
        <div className="space-y-6">
          <p className="body-copy">
            {project.content}
          </p>
          {project.features?.length > 0 && (
          <div>
              <p className="spec-label mb-3">Key features</p>
              <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="compact-grid-card bg-[#11100d] text-sm leading-6 text-[#d7d1c3]"
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
                    className="compact-grid-card bg-[#11100d] text-sm leading-6 text-[#d7d1c3]"
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
