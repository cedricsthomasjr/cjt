"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#080806]/86 text-[#f4f1ea] backdrop-blur-xl">
      <div className="site-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-black uppercase tracking-[0.24em] transition hover:text-[#f05a28]"
        >
          <span className="grid h-9 w-9 place-items-center border border-white/20 bg-white/8 text-xs tracking-normal">
            CJ
          </span>
          <span className="hidden sm:inline">Thomas</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition ${
                pathname === link.href
                  ? "text-[#f05a28]"
                  : "text-[#d7d1c3] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/resume"
            className="ml-2 inline-flex h-9 items-center gap-2 border border-white/20 px-3 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:border-[#f05a28] hover:bg-[#f05a28] hover:text-black"
          >
            PDF <ArrowUpRight size={14} />
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center border border-white/20 text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-white/10 bg-[#0f0e0b] transition-all duration-300 md:hidden ${
          menuOpen ? "max-h-80 border-t" : "max-h-0"
        }`}
      >
        <div className="site-shell flex flex-col py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border-b border-white/8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition last:border-b-0 ${
                pathname === link.href
                  ? "text-[#f05a28]"
                  : "text-[#d7d1c3] hover:text-white"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
