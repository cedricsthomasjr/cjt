import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { contactLinks } from "@/data/resume";

export default function PhotoCallout() {
  return (
    <div className="group grid gap-8 border border-rule sm:grid-cols-[1.1fr_1fr] sm:items-center">
      <div className="p-6 sm:p-10">
        <p className="t-label-gold">Elsewhere</p>
        <h2 className="t-h2 mt-3">what cj sees</h2>
        <p className="t-sub mt-3 max-w-sm">
          I shoot when I travel. Composition and restraint are the same problem
          in a photograph and in an interface, which is most of why my work
          looks the way it does.
        </p>
        <a
          href={contactLinks.photography}
          target="_blank"
          rel="noreferrer"
          className="btn mt-6"
        >
          View the gallery <ArrowUpRight size={15} />
        </a>
      </div>

      <a
        href={contactLinks.photography}
        target="_blank"
        rel="noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="relative aspect-[16/10] overflow-hidden border-t border-rule sm:h-full sm:border-l sm:border-t-0"
      >
        <Image
          src="/projects/whatcjsees.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 45vw"
          className="object-cover object-left-top"
        />
      </a>
    </div>
  );
}
