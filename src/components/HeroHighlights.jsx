"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillCategories = [
  {
    category: "Languages",
    items: ["Java", "Python", "SQL", "C", "JavaScript", "TypeScript"],
  },
  {
    category: "Concepts",
    items: ["Data Science", "Business Intelligence", "Market Research", "Full-Stack Development", "Agile"],
  },
  {
    category: "Tools",
    items: ["Git", "Snowflake", "Microsoft Suite", "APIs"],
  },
  {
    category: "Frameworks",
    items: ["FastAPI", "React", "Next.js", "Pandas", "NumPy", "Scikit-learn", "PyMC", "SQLAlchemy"],
  },
];

export default function HeroHighlights() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % skillCategories.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-32 sm:h-40 flex flex-col justify-between">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col justify-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#f05a28] sm:text-xs sm:tracking-[0.18em]">
            {skillCategories[current].category}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3 sm:gap-2.5">
            {skillCategories[current].items.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="inline-block border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-white sm:px-3 sm:py-2 sm:text-sm sm:tracking-[0.08em]"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-1.5">
        {skillCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-300 ${
              index === current
                ? "w-8 bg-[#f05a28]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to ${skillCategories[index].category}`}
          />
        ))}
      </div>
    </div>
  );
}
