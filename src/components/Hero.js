"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { companyBrands } from "@/data/resume";

export default function Hero() {
  return (
    <section className="border-b border-white/10 bg-[#080806] pt-16 text-[#f4f1ea]">
      <div className="site-shell grid items-end gap-8 py-12 md:py-16 lg:grid-cols-[1fr_420px]">
        <div className="max-w-4xl">
          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Designed in code / tested in markets
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="max-w-5xl text-[clamp(3.2rem,8vw,7.2rem)] font-black uppercase leading-[0.86] tracking-normal"
            >
              CJ Thomas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="max-w-2xl text-base font-medium leading-7 text-[#d7d1c3] md:text-lg"
            >
              Computer science and finance student building data systems,
              AI-powered finance tools, and machine learning workflows with a
              practical product edge.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <Link href="/projects" className="solid-button">
                Explore work <ArrowUpRight size={16} />
              </Link>
              <Link href="/resume" className="outline-button">
                View resume
              </Link>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
            {companyBrands.slice(0, 6).map((brand) => (
              <div key={brand} className="bg-[#080806] px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#d7d1c3]">
                  {brand}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-[#11100d]"
        >
          <Image
            src="/cj.jpeg"
            alt="CJ Thomas"
            fill
            sizes="(max-width: 1024px) 100vw, 420px"
            priority
            className="object-cover object-[50%_26%]"
          />
        </motion.div>
      </div>
    </section>
  );
}
