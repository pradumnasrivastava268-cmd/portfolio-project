import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const iconVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.12,
    y: -3,
    filter:
      "drop-shadow(0 0 10px rgba(16,185,129,0.8)) drop-shadow(0 0 20px rgba(59,130,246,0.7))",
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="relative z-10 flex min-h-[320px] flex-col rounded-2xl border border-teal-300/15 bg-slate-900/80 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/35"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/8 via-transparent to-blue-500/8" />

      <div className="relative z-10 mb-3 flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">
          {project.title}
        </h3>

        {project.live && (
          <span className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        )}
      </div>

      <div className="relative z-10 mb-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-teal-300/15 bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-blue-500/15 px-3 py-1 text-xs font-medium text-slate-200"
          >
            {tech}
          </span>
        ))}
      </div>

      <p className="relative z-10 mb-6 grow text-sm leading-relaxed text-slate-300">
        {project.description}
      </p>

      {(project.github || project.live) && (
        <div className="relative z-10 mt-auto flex items-center gap-5 text-xl">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-slate-300 hover:text-white"
            >
              <FaGithub />
            </motion.a>
          )}

          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-slate-300 hover:text-white text-lg"
            >
              <FaExternalLinkAlt />
            </motion.a>
          )}
        </div>
      )}
    </motion.article>
  );
}