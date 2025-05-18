"use client";

import { useParams, notFound } from "next/navigation";
import projects from "src/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Brain, Stars } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <Navbar />

      <main className="pt-24 px-6 md:px-20 max-w-5xl mx-auto space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/projects"
            className="text-sm border border-white rounded-full px-4 py-2 hover:text-red-400 transition"
          >
            ← Back to Projects
          </Link>
        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                className="bg-zinc-900 border border-zinc-800 text-xs uppercase tracking-wider text-zinc-400"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.section>

        {/* Preview Image */}
        <section className="space-y-4">
          <div className="relative w-full h-80 md:h-[30rem] overflow-hidden rounded-2xl border border-zinc-800">
            <Image
              src={project.image}
              alt={`Preview of ${project.title}`}
              fill
              className="object-cover"
            />
          </div>

          {/* Caption */}
          {project.caption && (
            <div className="text-sm text-zinc-500 space-y-1">
              <p className="italic">{project.caption}</p>
              <p className="text-xs">
                A visual overview of the core interface or concept.
              </p>
            </div>
          )}

          {/* Links */}
          {(project.github || project.live) && (
            <div className="flex justify-center gap-4 pt-3">
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-red-500 rounded-lg text-sm text-zinc-300 transition"
                >
                  <Github size={16} /> GitHub
                </Link>
              )}
              {project.live && (
                <Link
                  href={project.live}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-red-500 rounded-lg text-sm text-zinc-300 transition"
                >
                  <ExternalLink size={16} /> Live Site
                </Link>
              )}
            </div>
          )}
        </section>

        {/* Overview Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold border-b border-zinc-800 pb-2">
              Project Overview
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed pt-3 whitespace-pre-line">
              {project.content}
            </p>
          </div>

          {/* Key Features */}
          {project.features && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Stars className="text-red-500" size={20} />
                <h3 className="text-xl font-semibold">Key Features</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <Card key={i} className="bg-zinc-900 border border-zinc-800">
                    <CardContent className="p-4 text-sm text-zinc-300">
                      {feature}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* What I Learned */}
          {project.lessons && (
            <div className="space-y-4 pb-6">
              <div className="flex items-center gap-3">
                <Brain className="text-red-500" size={20} />
                <h3 className="text-xl font-semibold">What I Learned</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.lessons.map((lesson, i) => (
                  <Card key={i} className="bg-zinc-900 border border-zinc-800">
                    <CardContent className="p-4 text-sm text-zinc-300">
                      {lesson}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
