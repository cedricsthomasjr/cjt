"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowUpRight } from "lucide-react";
import type { Project } from "./ProjectsExplorer";

/**
 * The quick-look slide-over opened from the grid/ledger. Deliberately thin —
 * it links out to the full case study at /projects/[slug] rather than
 * duplicating it, and gracefully omits sections a project doesn't have (the
 * link-out entries have no content/lessons at all).
 */
export default function ProjectDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasCaseStudy = !project.linkOut && project.content.length > 0;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[var(--radius-card)] border-t border-rule bg-[var(--color-raised)] p-6 shadow-[var(--glow-gold-strong)] sm:p-8 lg:inset-y-0 lg:left-auto lg:right-0 lg:bottom-auto lg:h-full lg:max-h-none lg:w-[28rem] lg:rounded-t-none lg:border-l lg:border-t-0 lg:p-10"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="t-label">
              {project.year} · {project.role}
            </p>
            <h2 className="t-h2 mt-2">{project.title}</h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-rule p-2 text-muted transition-colors hover:border-gold/50 hover:text-bone"
          >
            <X size={16} />
          </button>
        </div>

        <span className="pill pill-gold mt-4 inline-flex">
          {project.status}
        </span>

        <p className="t-sub mt-5">{project.summary}</p>

        {project.content.length > 0 && (
          <div className="mt-7">
            <p className="t-label-gold">The problem</p>
            <hr className="hairline-gold mt-2" />
            <p className="t-sub-sm mt-3">{project.content[0]}</p>
          </div>
        )}

        {project.content.length > 1 && (
          <div className="mt-6">
            <p className="t-label-gold">The approach</p>
            <hr className="hairline-gold mt-2" />
            <p className="t-sub-sm mt-3">{project.content[1]}</p>
          </div>
        )}

        {project.lessons.length > 0 && (
          <div className="mt-6">
            <p className="t-label-gold">Takeaways</p>
            <hr className="hairline-gold mt-2" />
            <ul className="mt-1">
              {project.lessons.map((lesson) => (
                <li
                  key={lesson}
                  className="t-sub-sm border-b border-rule py-2.5 last:border-0"
                >
                  {lesson}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="pill">{tag}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              onClick={onClose}
              className="link-rule text-[0.8125rem] text-gold"
            >
              Read the full case study <ArrowUpRight size={15} />
            </Link>
          )}
          {project.linkOut && project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noreferrer"
              className="btn-solid"
            >
              Visit the site <ArrowUpRight size={15} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="btn-solid"
            >
              Open the site <ArrowUpRight size={15} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              Source <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
