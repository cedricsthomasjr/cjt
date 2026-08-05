import type { Project } from "./ProjectsExplorer";

const MONO_STACK =
  'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, monospace';

/**
 * Developer-flavored alternative to the grid: one row per project, styled as
 * a ledger rather than a decorated terminal window. Built on the existing
 * .readout-row grid (key / note / value) so it already stacks correctly on
 * mobile without a bespoke breakpoint. The monospace stack is scoped to this
 * component only via inline style, not added to the global type system.
 */
export default function ProjectLedger({
  projects,
  onOpen,
}: {
  projects: Project[];
  onOpen: (project: Project) => void;
}) {
  return (
    <div className="mt-8" style={{ fontFamily: MONO_STACK }}>
      {projects.map((project) => (
        <button
          key={project.slug}
          type="button"
          onClick={() => onOpen(project)}
          className="readout-row w-full text-left transition-colors hover:border-gold/40"
        >
          <span className="readout-key text-[0.8125rem]">
            <span className="text-bone">{project.slug}</span>
            <span className="text-muted"> · main</span>
          </span>

          <span className="readout-note mt-1 flex flex-wrap gap-1.5 sm:mt-0">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="pill text-[0.625rem]"
                style={{ fontFamily: "var(--font-hn)" }}
              >
                {tag}
              </span>
            ))}
          </span>

          <span className="readout-value text-[0.8125rem]">
            <span
              className={
                project.status === "Live" ? "text-gold" : "text-muted"
              }
            >
              {project.status}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
