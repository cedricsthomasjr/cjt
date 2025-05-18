"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function AboutPage() {
  const controls = useAnimation();

  useEffect(() => {
    const mountedRef = { current: true };

    const handleScroll = () => {
      if (!mountedRef.current) return;

      if (window.scrollY >= 100) {
        controls.start({
          opacity: 0,
          y: 10,
          transition: { duration: 0.6, ease: "easeOut" },
        });
      } else {
        controls.start({
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        });
      }
    };

    // Set up
    window.addEventListener("scroll", handleScroll);

    return () => {
      mountedRef.current = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <section className="relative px-6 md:px-16 py-20 max-w-6xl mx-auto space-y-24">
        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative grid md:grid-cols-2 gap-6 bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 shadow-lg"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              WHO IS
              <br /> CJ THOMAS?
            </h1>
            <p className="text-zinc-400 text-sm md:text-base">
              I&rsquo;m CJ — a software engineer in training with a
              designer&rsquo;s eye and a strategist’s mindset. I move between
              pixels and Python, always hunting for clarity in complexity.
            </p>
            <p className="text-zinc-400 text-sm md:text-base">
              My background blends code, finance, and storytelling — from
              developing visual dashboards to building AI-powered tools and
              documenting moments through my lens.
            </p>
            <p className="text-zinc-400 text-sm md:text-base">
              I believe good systems feel inevitable, not forced. And good code
              reads like a thought, not a task. I’m building toward a future
              where logic and creativity aren’t opposites — they’re teammates.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <Link
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition duration-200"
              >
                View Résumé
              </Link>
              <Link
                href="/projects"
                className="inline-block px-4 py-1.5 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black transition duration-200"
              >
                See My Work
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-xl overflow-hidden shadow-md max-w-sm mx-auto"
          >
            <Image
              src="/cj2.jpeg"
              alt="CJ Thomas portrait"
              width={420}
              height={525}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          animate={controls}
          initial={{ opacity: 1, y: 0 }}
          className="flex justify-center -mt-6"
        >
          <div className="text-zinc-500 text-sm flex flex-col items-center">
            <span>Scroll down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-5 h-5 mt-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Pillars, Stats, Facts Cards */}
        <div id="about-content" className="grid md:grid-cols-3 gap-8">
          {["Pillars", "Quick Stats", "Fun Facts"].map((title) => (
            <div
              key={title}
              className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-md hover:shadow-red-600/20 transition duration-300"
            >
              <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
              <ul className="space-y-3 text-sm text-zinc-400">
                {title === "Pillars" && [
                  <li key="1">
                    <strong className="text-white">🧠 Systems Thinking:</strong>{" "}
                    Structure isn’t boring — it’s power.
                  </li>,
                  <li key="2">
                    <strong className="text-white">
                      🎨 Visual Expression:
                    </strong>{" "}
                    Design is code’s louder twin.
                  </li>,
                  <li key="3">
                    <strong className="text-white">🚀 Momentum:</strong> Every
                    commit is forward motion.
                  </li>,
                ]}
                {title === "Quick Stats" && [
                  <li key="1">
                    <span className="text-white">Graduation:</span> May 2027
                  </li>,
                  <li key="2">
                    <span className="text-white">GPA:</span> 3.67
                  </li>,
                  <li key="3">
                    <span className="text-white">Current Semester GPA:</span>{" "}
                    4.03
                  </li>,
                  <li key="4">
                    <span className="text-white">Projects:</span> 2 active
                    builds
                  </li>,
                  <li key="5">
                    <span className="text-white">Countries Visited:</span> 12
                  </li>,
                  <li key="6">
                    <span className="text-white">Internships:</span> 2x
                  </li>,
                  <li key="7">
                    <span className="text-white">Languages:</span> JavaScript,
                    Java, Python, C, SQL
                  </li>,
                ]}
                {title === "Fun Facts" && [
                  <li key="1">Cleveland sports loyalty = pain + pride</li>,
                  <li key="2">A hobby of mine is photography</li>,
                  <li key="3">
                    I&rsquo;m currently playing Elden Ring and College Football
                    25
                  </li>,
                  <li key="4">Moved 12+ times</li>,
                  <li key="5">Avid NBA fan</li>,
                ]}
              </ul>
            </div>
          ))}
        </div>
        {/* GitHub Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-md"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            GitHub Activity
          </h2>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="cedricsthomasjr"
              blockSize={14}
              blockMargin={4}
              colorScheme="dark"
              theme={{
                light: ["#161b22", "#0d1117", "#1f6feb", "#238636", "#2ea043"],
              }}
            />
          </div>
        </motion.div>

        {/* Spotify & Quote Card */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
            <iframe
              src="https://open.spotify.com/embed/playlist/1tRKMjosM29rWKWHBN9S9z?utm_source=generator"
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-md"
            ></iframe>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-md text-sm text-zinc-400">
            <h2 className="text-2xl font-bold mb-2 text-white">
              💭 Why I Build
            </h2>
            <p>
              I build tools I wish I had. Whether it’s making class planning
              smarter or turning stat noise into signal, my goal is simple:
              clarity. Not just for me — but for the next version of me that
              hasn&rsquo;t figured it out yet.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
