"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] bg-background text-foreground px-6 flex items-center justify-center overflow-hidden">
      {/* 🔴 Background Gradient Wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-900/10 via-transparent to-background" />

      {/* 🔴 Blurred Red Accent Glow */}
      <div className="absolute -bottom-24 -left-20 w-[600px] h-[300px] bg-red-600/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* 🧠 Left: Text */}
        <div className="space-y-10 text-center md:text-left">
          {/* Red line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="origin-left h-[2px] w-32 bg-primary mx-auto md:mx-0"
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            CJ Thomas
            <br />
            <span className="text-muted-foreground italic text-2xl block mt-2">
              CS × Finance × Visual Design
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Building data-backed tools and design-first experiences for the
            modern era.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center md:justify-start gap-4"
          >
            <Link
              href="/resume"
              className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-2 rounded font-medium bg-primary text-primary-foreground hover:scale-105 transition"
            >
              <span className="relative z-10">View Resume</span>
              <span className="absolute inset-0 bg-primary/50 opacity-0 group-hover:opacity-100 transition-all blur-md z-0" />
            </Link>

            <Link
              href="/projects"
              className="group relative inline-flex items-center justify-center overflow-hidden px-6 py-2 rounded font-medium border border-foreground hover:text-background text-foreground hover:scale-105 transition"
            >
              <span className="relative z-10">See Projects</span>
              <span className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-100 transition-all blur-md z-0" />
            </Link>
          </motion.div>
        </div>

        {/* 🖼️ Right: Floating Image */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted"
        >
          <Image
            src="/cj.jpeg"
            alt="CJ Thomas"
            width={700}
            height={875}
            className="object-cover w-full h-full rounded-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* 🔽 Scroll Cue */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-60">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
