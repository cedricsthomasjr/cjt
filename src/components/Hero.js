import Link from "next/link";
import Image from "next/image";

/**
 * The landing page, and the whole of it: a face, a sentence, two ways in.
 * Everything that used to sit under this — the figures, the affiliations, the
 * current role — now lives on the page it belongs to, so this one only has to
 * do the job a front door does.
 *
 * Bold sans carries the name, Palatino italic carries the voice. Those are
 * still the only two registers.
 */
export default function Hero() {
  return (
    <section className="shell flex min-h-[calc(100svh-4rem)] items-center py-12 sm:py-16">
      <div className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p
            className="t-label-gold rise"
            style={{ animationDelay: "1.15s" }}
          >
            AI/ML and Data Engineering
          </p>

          <h1 className="t-display mt-5">
            <span className="maskline">
              <span style={{ animationDelay: "0.2s" }}>CJ</span>
            </span>
            <span className="maskline">
              <span style={{ animationDelay: "0.32s" }}>Thomas</span>
            </span>
          </h1>

          <hr
            className="hairline-gold mt-6 max-w-xs"
            style={{ animationDelay: "0.85s" }}
          />

          <p
            className="t-sub-lg rise mt-6 max-w-md"
            style={{ animationDelay: "1.25s" }}
          >
            Most of my work sits upstream of the dashboard — the pipelines and
            schemas that decide whether a number can be trusted.
          </p>

          <div
            className="rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "1.4s" }}
          >
            <Link href="/projects" className="btn-solid">
              See the work
            </Link>
            <Link href="/contact" className="btn">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="plate-wrap order-first lg:order-none">
          <div className="plate-halo" aria-hidden="true" />
          {/* Sized off the viewport height, not the column width, so the whole
              landing stays inside the fold on a laptop. */}
          <div className="plate relative mx-auto aspect-[4/5] w-full max-w-[min(15rem,32svh)] lg:max-w-[min(26rem,50svh)]">
            <Image
              src="/cj.jpeg"
              alt="CJ Thomas"
              fill
              priority
              sizes="(max-width: 1024px) 15rem, 26rem"
              className="object-cover object-[50%_20%]"
            />
            <div className="plate-scrim" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
