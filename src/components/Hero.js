"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HeroHighlights from "./HeroHighlights";

export default function Hero() {
  return (
    <section className="border-b border-white/10 bg-[#080806] pt-10 text-[#f4f1ea] sm:pt-12">
      <div className="site-shell grid items-end gap-6 py-6 sm:gap-7 sm:py-8 md:py-10 lg:grid-cols-[1fr_400px]">
        <div className="max-w-4xl">
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Designed in code / tested in markets
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 }}
            >
              <HeroHighlights />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.14 }}
              className="display-title max-w-5xl"
            >
              CJ Thomas
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.20 }}
              className="body-copy max-w-2xl font-medium"
            >
              Computer science and finance student building data systems,
              AI-powered finance tools, and machine learning workflows with a
              practical product edge.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.26 }}
              className="mobile-stack-actions pt-1"
            >
              <Link href="/projects" className="solid-button">
                Explore work <ArrowUpRight size={16} />
              </Link>
              <Link href="/resume" className="outline-button">
                View resume
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[320px] aspect-[5/4] overflow-hidden border border-white/10 bg-[#11100d] sm:aspect-[4/5] md:max-w-none"
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
