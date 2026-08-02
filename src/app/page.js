import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import PhotoCallout from "@/components/PhotoCallout";
import projects from "@/data/projects.json";
import { affiliations } from "@/data/resume";

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="shell">
        <hr className="hairline" />
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 py-5">
          <p className="t-label">Affiliations</p>
          {affiliations.map((name) => (
            <p key={name} className="t-label text-bone">
              {name}
            </p>
          ))}
        </div>
        <hr className="hairline" />
      </section>

      <section className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="t-h2">Work</h2>
            <p className="t-sub mt-2 max-w-md">
              Three builds where the data layer was the actual problem.
            </p>
          </div>
          <Link href="/projects" className="link-rule text-[0.8125rem]">
            All projects <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={i === 0}
            />
          ))}
        </div>
      </section>

      <section className="shell pb-24">
        <PhotoCallout />
      </section>
    </main>
  );
}
