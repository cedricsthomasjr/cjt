import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import PhotoCallout from "@/components/PhotoCallout";
import PhotoGrid from "@/components/PhotoGrid";
import Reveal from "@/components/Reveal";
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

      <Reveal>
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
      </Reveal>

      <Reveal>
        <section className="shell section pt-0">
          <div className="grid gap-10 border border-rule p-6 sm:p-10 lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-16">
            <div>
              <p className="t-label-gold">Who is building this</p>
              <h2 className="t-h2 mt-4">
                Two summers of turning inconsistent records into something a
                board could read.
              </h2>
              <p className="t-sub-lg mt-4 max-w-xl">
                Computer science at NYU, data science and analytics at Corbin
                Advisors, and this summer the AI, Data & Machine Learning
                Engineering team at NIKE.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/about" className="btn">
                  More about me
                </Link>
                <Link href="/resume" className="btn">
                  Resume
                </Link>
              </div>
            </div>

            <div className="tile aspect-[4/5] lg:aspect-[4/5]">
              <Image
                src="/cj.jpeg"
                alt="CJ Thomas"
                fill
                sizes="(max-width: 1024px) 100vw, 320px"
                className="object-cover object-[50%_22%]"
              />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="shell pb-24">
          <PhotoCallout />
          <div className="mt-4">
            <PhotoGrid />
          </div>
        </section>
      </Reveal>
    </main>
  );
}
