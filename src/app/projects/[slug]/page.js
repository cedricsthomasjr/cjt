"use client";

import { useParams, notFound } from "next/navigation";
import projects from "@/data/projects.json";
import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, Brain, Stars } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <div className="bg-black text-white min-h-screen font-sans antialiased">
      <Navbar />

      {/* Back Link */}
      <main className="pt-24">
        <div className="px-6 md:px-20 pb-6">
          <Link
            href="/projects"
            className="text-sm border border-white rounded-full px-4 py-2 hover:text-red-400 transition"
          >
            ← Back to Projects
          </Link>
        </div>
      </main>

      {/* Hero */}
      <section className="px-6 md:px-20 pt-8 pb-10 max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight">
          {project.title}
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              className="bg-zinc-900 border border-zinc-800 text-xs uppercase tracking-wider text-zinc-400"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>

      {/* Image */}
      <section className="px-6 md:px-20 pb-6 max-w-4xl mx-auto space-y-2">
        <div className="relative w-full h-80 md:h-[28rem] overflow-hidden rounded-xl border border-zinc-800">
          <Image
            src={project.image}
            alt={`Image preview of ${project.title}`}
            fill
            className="object-cover"
          />
        </div>
        {project.caption && (
          <div className="text-sm text-zinc-500">
            <p className="italic">{project.caption}</p>
            <p className="text-xs pt-1">
              A visual overview of the core interface or concept.
            </p>
          </div>
        )}

        {(project.github || project.live) && (
          <div className="flex justify-center gap-3 pt-4">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-md text-sm hover:border-red-500"
              >
                <Github size={16} /> GitHub
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-md text-sm hover:border-red-500"
              >
                <ExternalLink size={16} /> Live Site
              </Link>
            )}
          </div>
        )}
      </section>

      {/* Overview */}
      <section className="px-6 md:px-20 pb-20 max-w-4xl mx-auto space-y-10">
        <h2 className="text-2xl font-semibold border-b border-zinc-800 pb-2">
          Project Overview
        </h2>
        <p className="text-zinc-300 text-lg leading-relaxed">
          {project.content}
        </p>

        {/* Key Features */}
        {project.features && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Stars className="text-red-500" size={20} />
              <h3 className="text-xl font-semibold">Key Features</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-3 text-sm text-zinc-300">
                    {feature}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* What I Learned */}
        {project.lessons && (
          <div className="space-y-4 pt-8">
            <div className="flex items-center gap-3">
              <Brain className="text-red-500" size={20} />
              <h3 className="text-xl font-semibold">What I Learned</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {project.lessons.map((lesson, i) => (
                <Card key={i} className="bg-zinc-900 border-zinc-800">
                  <CardContent className="p-3 text-sm text-zinc-300">
                    {lesson}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
