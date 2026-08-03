import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Stagger from "@/components/Stagger";

const destinations = [
  { href: "/projects", name: "Work", note: "Three builds, and what the data layer cost in each" },
  { href: "/about", name: "About", note: "How I work, and where I have been" },
  { href: "/resume", name: "Resume", note: "Experience, education, and the full record" },
  { href: "/contact", name: "Contact", note: "Email, phone, LinkedIn, GitHub" },
];

/**
 * The landing page's second table. It shares the readout's three-column grid
 * on purpose — one instrument, two tables: figures, then destinations.
 */
export default function SiteIndex() {
  return (
    <>
      <div className="flex items-baseline justify-between gap-4">
        <p className="t-label-gold">Index</p>
        <p className="t-label">Four pages</p>
      </div>
      <hr className="hairline-gold mt-3" />

      <Stagger className="mt-1" step={60}>
        {destinations.map((d) => (
          <Link key={d.href} href={d.href} className="index-row">
            <p className="index-name t-h3">{d.name}</p>
            <p className="index-note t-sub-sm">{d.note}</p>
            <ArrowUpRight size={17} className="index-arrow" />
          </Link>
        ))}
      </Stagger>
    </>
  );
}
