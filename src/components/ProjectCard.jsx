"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Card className="bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 hover:border-red-500 transition-all duration-300 p-6 rounded-2xl shadow-md h-[520px] flex flex-col justify-between">
        <div className="flex flex-col justify-between h-full group">
          {/* Image Section */}
          <Link href={`/projects/${project.slug}`}>
            <div className="relative w-full h-48 rounded-lg overflow-hidden cursor-pointer">
              <Image
                src={project.image}
                alt={`Preview of ${project.title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
            </div>
          </Link>

          {/* External Links */}
          <div className="flex items-center justify-start gap-3 pt-3">
            {project.github && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition"
              >
                <Github size={18} />
              </Link>
            )}
            {project.live && (
              <Link
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition"
              >
                <ExternalLink size={18} />
              </Link>
            )}
          </div>

          {/* Title + Status + Description */}
          <div className="space-y-2 pt-4">
            <h3 className="text-xl font-bold text-white leading-tight tracking-tight">
              {project.title}
            </h3>
            {project.status && (
              <span
                className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase
      ${
        project.status === "scaffolding"
          ? "bg-red-500/20 text-red-400"
          : project.status === "in progress"
          ? "bg-orange-500/20 text-orange-400"
          : project.status === "paused"
          ? "bg-yellow-500/20 text-yellow-400"
          : project.status === "live"
          ? "bg-green-500/20 text-green-400"
          : "bg-zinc-600/20 text-zinc-300"
      }
    `}
              >
                {project.status}
              </span>
            )}

            <p className="text-sm text-zinc-400 line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 text-xs">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full bg-zinc-700 text-zinc-200 transition-colors duration-300 hover:bg-red-500 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Learn More CTA */}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 mt-auto text-sm font-medium text-red-400 border border-zinc-700 rounded-md hover:border-red-500 transition"
          >
            Learn More →
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
