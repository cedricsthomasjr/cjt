"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const listRef = useRef(null);
  const [thumb, setThumb] = useState({ x: 0, w: 0, ready: false });

  /**
   * Measure the active item so the gold pill can travel to it. Runs on route
   * change, and again whenever the row resizes — the webfonts land after first
   * paint and change the label widths under us.
   */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector('[data-active="true"]');
      if (!active) {
        setThumb((prev) => ({ ...prev, ready: false }));
        return;
      }
      const listBox = list.getBoundingClientRect();
      const activeBox = active.getBoundingClientRect();
      setThumb({
        x: activeBox.left - listBox.left,
        w: activeBox.width,
        ready: true,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ink/90 backdrop-blur-md">
      <nav className="shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="text-[0.9375rem] tracking-[-0.03em] hover:text-gold-lift"
        >
          CJ Thomas
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <div className="navpill" ref={listRef}>
            <span
              aria-hidden="true"
              className={`navpill-thumb ${thumb.ready ? "is-ready" : ""}`}
              style={{ "--nx": `${thumb.x}px`, "--nw": `${thumb.w}px` }}
            />
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  data-active={active}
                  className="navpill-item"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <a
            href={contactLinks.resumePdf}
            target="_blank"
            rel="noreferrer"
            className="btn h-9 min-h-0 rounded-full px-4 text-[0.75rem]"
          >
            Resume PDF
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-rule text-bone md:hidden"
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
