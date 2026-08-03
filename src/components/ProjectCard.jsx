import Link from "next/link";
import Image from "next/image";

/**
 * Not every project has a screenshot worth showing. Rather than filling the
 * gap with a generated gradient, a project without an image gets a
 * typographic plate — the title set large against the raised surface.
 */
function Plate({ title }) {
  return (
    <div className="flex h-full w-full items-end bg-raised p-5">
      <span
        className="t-display text-[#2e2e38] transition-colors group-hover:text-[#3a3a46]"
        aria-hidden="true"
      >
        {title.toLowerCase()}
      </span>
    </div>
  );
}

export default function ProjectCard({ project, priority = false }) {
  return (
    <article className="group border border-rule bg-ink transition-colors hover:border-gold/40">
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="wipe relative aspect-[16/10] overflow-hidden border-b border-rule">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} interface`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="shot object-cover object-top"
            />
          ) : (
            <Plate title={project.title} />
          )}
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="t-label">
              {project.year} · {project.role}
            </p>
            <p className="t-label-gold">{project.status}</p>
          </div>

          <h3 className="t-h3 mt-3 group-hover:text-gold-lift">
            {project.title}
          </h3>

          <p className="t-sub-sm mt-2">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {project.tags.map((tag) => (
              <span key={tag} className="t-label">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
