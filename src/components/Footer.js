import Link from "next/link";
import { contactLinks } from "@/data/resume";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#080806] py-10 text-sm text-[#9d9a91]">
      <div className="site-shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#f05a28]">
            CJ Thomas
          </p>
          <p className="mt-2 max-w-lg text-[#d7d1c3]">
            AI/ML engineering, data science, business intelligence, and
            full-stack product work.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-xs font-bold uppercase tracking-[0.18em]">
          <Link
            href={contactLinks.github}
            target="_blank"
            className="transition hover:text-white"
          >
            GitHub
          </Link>
          <Link
            href={`mailto:${contactLinks.email}`}
            className="transition hover:text-white"
          >
            Email
          </Link>
          <Link
            href={contactLinks.linkedin}
            target="_blank"
            className="transition hover:text-white"
          >
            LinkedIn
          </Link>
        </div>
      </div>
      <div className="site-shell mt-8 border-t border-white/10 pt-5 text-xs">
        © {new Date().getFullYear()} CJ Thomas. All rights reserved.
      </div>
    </footer>
  );
}
