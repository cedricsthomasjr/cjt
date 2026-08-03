import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

/**
 * A full-width project record. Three shapes fall out of the data:
 * an entry with a screenshot, an entry without one, and a link-out entry that
 * has no case study at all.
 *
 * The card itself is a plain <article> — only the title carries a real link.
 * That anchor's ::after (see .card-link in globals.css) stretches its hit
 * area over the whole surface, so the card still reads as one clickable
 * region while keeping exactly one focusable link and a clean <h2>.
 */
export default function ProjectRow({ project, priority = false }) {
  const href = project.linkOut ? project.external : `/projects/${project.slug}`;
  const external = Boolean(project.linkOut);

  const shell = `group card card-hover grid overflow-hidden ${
    project.image ? "sm:grid-cols-2" : ""
  }`;

  return (
    <article className={shell}>
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] border border-rule sm:aspect-auto sm:h-full sm:min-h-[15rem]">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, 48vw"
            className="shot object-cover object-top"
          />
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="t-label">
            {project.year} · {project.role}
          </p>
          <span className="pill pill-gold">{project.status}</span>
        </div>

        <h2 className="t-h2 mt-4">
          {external ? (
            <a href={href} target="_blank" rel="noreferrer" className="card-link">
              {project.title}
            </a>
          ) : (
            <Link href={href} className="card-link">
              {project.title}
            </Link>
          )}
        </h2>
        <p className="t-sub mt-3 max-w-lg">{project.summary}</p>

        {project.features.length > 0 && (
          <ul className="mt-5">
            {project.features.slice(0, 3).map((feature) => (
              <li key={feature} className="t-sub-sm border-t border-rule py-2.5">
                {feature}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="pill">{tag}</span>
            </li>
          ))}
        </ul>

        <p className="link-rule mt-6 text-[0.8125rem] text-gold">
          {external ? "Visit the site" : "Read the case study"}
          <ArrowUpRight size={15} />
        </p>
      </div>
    </article>
  );
}
