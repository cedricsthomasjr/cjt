"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { contactLinks } from "@/data/resume";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ink/90 backdrop-blur-md">
      <nav className="shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-[0.9375rem] tracking-[-0.03em] hover:text-gold-lift"
        >
          CJ Thomas
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.8125rem] tracking-[-0.01em] transition-colors ${
                  active ? "text-gold" : "text-muted hover:text-bone"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={contactLinks.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="btn h-9 min-h-0 px-3 text-[0.75rem]"
          >
            Resume PDF
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center border border-rule text-bone md:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-rule md:hidden">
          <div className="shell flex flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-rule py-4 text-[0.9375rem] last:border-b-0 ${
                  pathname.startsWith(link.href) ? "text-gold" : "text-bone"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={contactLinks.resumePdf}
              target="_blank"
              rel="noreferrer"
              className="border-t border-rule py-4 text-[0.9375rem] text-muted"
            >
              Resume PDF
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
