"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const spotlightRef = useRef(null);

  return (
    <section
      className="relative min-h-[100dvh] px-6 md:px-12 flex items-center justify-center overflow-hidden
        bg-background text-foreground before:content-[''] before:absolute before:inset-0
        before:pointer-events-none before:bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(239,68,68,0.1)_0%,transparent_80%)]"
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between text-center md:text-left gap-12 z-10">
        {/* 🧠 Text LEFT */}
        <div className="space-y-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="origin-left h-[2px] w-20 bg-red-600 mx-auto md:mx-0"
          />

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            CJ Thomas
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-xl font-medium italic text-red-600"
          >
            CS × Finance × Visual Design
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0"
          >
            Building data-backed tools and design-first experiences for the
            modern era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 justify-center md:justify-start pt-2"
          >
            <Link
              href="/resume"
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-medium"
            >
              View Resume
            </Link>
            <Link
              href="/projects"
              className="border border-white text-white px-6 py-2 rounded hover:bg-white hover:text-black transition font-medium"
            >
              See Projects
            </Link>
          </motion.div>
        </div>

        {/* 🖼️ Image RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-[300px] md:w-[360px] aspect-square overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl"
        >
          <Image
            src="/cj.jpeg"
            alt="CJ Thomas"
            width={360}
            height={360}
            className="object-cover w-full h-full rounded-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-40 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
