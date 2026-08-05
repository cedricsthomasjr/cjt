import Image from "next/image";
import type { Project } from "./ProjectsExplorer";

/**
 * Grid-view card. Unlike ProjectRow (the plain vertical-scroll list this page
 * used to render), the whole surface is a <button> that opens the detail
 * drawer rather than a Link — the direct case-study link now lives inside
 * the drawer, so this doesn't need ProjectRow's stretched-anchor trick.
 */
export default function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group card card-hover block w-full overflow-hidden text-left"
    >
      {project.image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-rule">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="shot object-cover object-top"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="t-label">
            {project.year} · {project.role}
          </p>
          <span className="pill pill-gold">{project.status}</span>
        </div>

        <h3 className="t-h3 mt-3">{project.title}</h3>
        <p className="t-sub-sm mt-2">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="pill">{tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}
