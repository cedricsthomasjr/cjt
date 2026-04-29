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
      <section className="border-b border-white/10 bg-[#f4f1ea] py-3 text-[#080806]">
        <div className="site-shell grid gap-3 text-center text-[11px] font-black uppercase tracking-[0.22em] sm:grid-cols-3">
          <span>Computer Science</span>
          <span>AI/ML Engineering</span>
          <span>Finance Systems</span>
        </div>
      </section>

      <section className="site-shell grid gap-8 py-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="eyebrow">Affiliations</p>
          <h2 className="mt-3 text-3xl font-black uppercase leading-none md:text-5xl">
            Company and campus index
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {companyBrands.map((brand) => (
            <div key={brand} className="bg-[#11100d] p-5">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-[#f4f1ea]">
                {brand}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#12100d] py-12">
        <div className="site-shell">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Explore the line</p>
              <h2 className="mt-3 text-3xl font-black uppercase md:text-5xl">
                Selected builds
              </h2>
            </div>
            <Link href="/projects" className="outline-button">
              See all <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
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
                  <span className="absolute left-4 top-4 bg-[#f05a28] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-black">
                    {project.status}
                  </span>
                </div>
                <div className="p-5">
                  <p className="spec-label">{project.caption}</p>
                  <h3 className="mt-3 text-2xl font-black uppercase">
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
