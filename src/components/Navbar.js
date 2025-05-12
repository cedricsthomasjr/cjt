"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* 🔥 Logo */}
        <Link
          href="/"
          className="text-white text-xl font-bold tracking-wide hover:text-red-500 transition"
        >
          CJ Thomas
        </Link>

        {/* 🧭 Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition font-medium ${
                pathname === link.href
                  ? "text-red-500"
                  : "text-zinc-300 hover:text-red-500"
              }`}
            >
              {link.label}
              {/* 🔴 Red underline on hover */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full scale-x-0 bg-red-500 transition-transform duration-300 ease-in-out ${
                  pathname === link.href ? "scale-x-100" : "hover:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* 🍔 Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[300px] py-4 px-6" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium transition ${
                pathname === link.href
                  ? "text-red-500"
                  : "text-zinc-300 hover:text-red-500"
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
