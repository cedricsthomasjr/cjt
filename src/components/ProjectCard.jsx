"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article className="group grid overflow-hidden border border-white/10 bg-[#11100d] lg:grid-cols-[0.9fr_1.1fr]">
      <Link
        href={`/projects/${project.slug}`}
        className="relative min-h-52 overflow-hidden sm:min-h-60"
      >
        <Image
          src={project.image}
          alt={`Preview of ${project.title}`}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 42vw"
          priority={index < 2}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
        <span className="absolute left-3 top-3 bg-[#f05a28] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-black sm:left-4 sm:top-4 sm:px-3 sm:tracking-[0.18em]">
          {project.status}
        </span>
      </Link>

      <div className="flex min-h-0 flex-col justify-between p-4 sm:min-h-60 sm:p-5">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="spec-label">
              Build {String(index + 1).padStart(2, "0")}
            </p>
            <div className="flex items-center gap-3">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  aria-label={`${project.title} GitHub`}
                  className="text-[#9d9a91] hover:text-white"
                >
                  <Github size={18} />
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  aria-label={`${project.title} live site`}
                  className="text-[#9d9a91] hover:text-white"
                >
                  <ExternalLink size={18} />
                </Link>
              )}
            </div>
          </div>
          <h3 className="mt-3 text-[1.45rem] font-black uppercase leading-[1.05] break-words sm:mt-4 sm:text-2xl md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#d7d1c3]">
            {project.description}
          </p>
        </div>

        <div className="mt-5">
          <div className="mb-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-white/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#d7d1c3] sm:tracking-[0.16em]"
              >
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/projects/${project.slug}`} className="outline-button">
            Inspect <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
