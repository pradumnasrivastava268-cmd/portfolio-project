import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Dissertation- MSc",
    description:
      "Leading the design of a reverse logistics optimisation system, enhancing returns management, inventory recovery, and last-mile operations, while driving cost efficiency, sustainability, and end-to-end supply chain optimisation.",
    technologies: ["Supply Chain", "Reverse Logistics", "Network Optimisation"],
  },
  {
    id: 2,
    title: "Final Year Project - B.Tech",
    description:
      "Designed innovative and eco-friendly personal mobility solution E- Roller Skates; a compact electric roller skate designed for daily urban commute. using reverse charging mechanism, enabling bidirectional energy flow, enhancing energy efficiency and sustainability.",
    technologies: ["Machine Design", "Reverse Charging", "Sustainability"],

  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="w-full relative bg-black text-white overflow-hidden py-24 px-6 md:px-10 lg:px-12"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 -left-10 w-90 h-90 opacity-20 blur-[120px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse" />
        <div className="absolute bottom-0 right-10 w-105 h-105 opacity-15 blur-[140px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-55 h-55 opacity-10 blur-[160px] rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-12">
        <motion.h2
          className="text-4xl sm:text-5xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
