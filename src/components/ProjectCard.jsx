"use client";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

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
      <Card className="bg-zinc-800/70 backdrop-blur-sm border border-zinc-700 hover:border-red-500 transition-all duration-300 p-6 rounded-2xl shadow-md h-[500px] flex flex-col justify-between">
        <Link
          href={`/projects/${project.slug}`}
          className="flex flex-col justify-between h-full group"
        >
          {/* Image Section */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
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

          {/* Title & Tagline */}
          <div className="space-y-2 pt-4">
            <h3 className="text-xl font-bold text-white leading-tight tracking-tight">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">
              {project.tagline}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 text-xs">
            {project.tags.map((tag, i) => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full bg-zinc-700 text-zinc-200 transition-colors duration-300 hover:bg-red-500 hover:text-white`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-6 mt-auto text-sm font-medium text-red-400 group-hover:underline">
            Learn More →
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
