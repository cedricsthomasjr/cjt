import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import projects from "@/data/projects.json";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — CJ Thomas`,
      description: project.summary,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="shell section">
      <Link href="/projects" className="link-rule text-[0.8125rem] text-muted">
        <ArrowLeft size={15} /> Work
      </Link>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="t-label">
          {project.year} · {project.role}
        </p>
        <p className="t-label-gold">{project.status}</p>
      </div>

      <h1 className="t-display mt-3">{project.title.toLowerCase()}</h1>
      <p className="t-sub-lg mt-4 max-w-2xl">{project.summary}</p>

      <div className="mt-8 flex flex-wrap gap-3">
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

      {/* Full colour here. The grid normalizes screenshots so it reads as one
          system; the case study is where the product speaks for itself. */}
      {project.image && (
        <div className="relative mt-14 aspect-[16/10] overflow-hidden border border-rule">
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            priority
            sizes="(max-width: 1120px) 100vw, 1120px"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div>
          {project.content.map((paragraph) => (
            <p key={paragraph} className="t-sub-lg mb-5 max-w-2xl last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        <aside>
          <p className="t-label-gold">Built with</p>
          <hr className="hairline mt-3" />
          <ul className="mt-3">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="border-b border-rule py-2 text-[0.8125rem]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {project.gallery?.length > 0 && (
        <Reveal>
          <section className="mt-16">
            <p className="t-label-gold">Screens</p>
            <hr className="hairline-gold mt-3" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((frame) => (
                <figure key={frame.src} className="tile aspect-[16/10]">
                  <Image
                    src={frame.src}
                    alt={frame.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink to-transparent p-3 pt-10">
                    <span className="t-label">{frame.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      <div className="mt-16 grid gap-12 sm:grid-cols-2">
        <section>
          <h2 className="t-h3">What it does</h2>
          <hr className="hairline-gold mt-3" />
          <ul className="mt-1">
            {project.features.map((feature) => (
              <li key={feature} className="border-b border-rule py-3">
                <span className="t-sub-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="t-h3">What it taught me</h2>
          <hr className="hairline-gold mt-3" />
          <ul className="mt-1">
            {project.lessons.map((lesson) => (
              <li key={lesson} className="border-b border-rule py-3">
                <span className="t-sub-sm">{lesson}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
