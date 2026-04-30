import Hero from "@/components/Hero";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import projects from "src/data/projects.json";
import { companyBrands } from "@/data/resume";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#080806] text-[#f4f1ea]">
      <Hero />
      <section className="index-band">
        <div className="index-band-grid">
          <span>Computer Science</span>
          <span>AI/ML Engineering</span>
          <span>Finance Systems</span>
        </div>
      </section>

      <section className="site-shell grid gap-6 py-8 sm:gap-7 sm:py-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Affiliations</p>
          <h2 className="section-title mt-3">
            Company and campus index
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {companyBrands.slice(0, 6).map((brand) => (
            <div key={brand} className="compact-grid-card bg-[#11100d]">
              <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[#f4f1ea] sm:text-xs sm:tracking-[0.12em]">
                {brand}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#12100d] py-8 sm:py-10">
        <div className="site-shell">
          <div className="mb-5 grid gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Explore the line</p>
              <h2 className="section-title mt-3">
                Selected builds
              </h2>
            </div>
            <Link href="/projects" className="outline-button">
              See all <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden border border-white/10 bg-[#080806]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute left-3 top-3 bg-[#f05a28] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-black sm:left-4 sm:top-4 sm:px-3 sm:tracking-[0.18em]">
                    {project.status}
                  </span>
                </div>
                <div className="p-4">
                  <p className="spec-label">{project.caption}</p>
                  <h3 className="mt-2.5 text-[1.35rem] font-black uppercase leading-tight break-words sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#d7d1c3]">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
