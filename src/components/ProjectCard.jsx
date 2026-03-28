import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const iconVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(45,27,78,0.8))",
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="relative flex flex-col bg-white/5 border border-white/10 rounded-2xl p-6
                 hover:border-[#692097]/60 hover:bg-white/8 transition-colors duration-300 group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 pointer-events-none
                    bg-gradient-to-br from-[#302b63]/20 via-transparent to-[#692097]/20"
      />
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-xl font-semibold text-white
                     group-hover:text-transparent group-hover:bg-clip-text
                     group-hover:bg-gradient-to-r group-hover:from-[#1580de] group-hover:to-[#692097]
                     transition-all duration-300"
        >
          {project.title}
        </h3>
        {project.live && (
          <span
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium
                           bg-green-500/10 border border-green-500/30 text-green-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full text-xs font-medium text-gray-300
                       bg-gradient-to-r from-[#302b63]/60 to-[#37053c]/60 border border-white/10"
          >
            {tech}
          </span>
        ))}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed grow mb-6">
        {project.description}
      </p>
      <div className="flex items-center gap-5 text-xl mt-auto">
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
            className="text-gray-300"
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
            className="text-gray-300 text-lg"
          >
            <FaExternalLinkAlt />
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
