import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Dissertation - MSc",
    description:
      "Leading the design of a reverse logistics optimisation system to improve returns management, inventory recovery, and last-mile operations while enhancing cost efficiency, sustainability, and end-to-end supply chain performance.",
    technologies: ["Supply Chain", "Reverse Logistics", "Network Optimisation"],
  },
  {
    id: 2,
    title: "Final Year Project - B.Tech",
    description:
      "Designed an innovative and eco-friendly personal mobility solution: E-Roller Skates, a compact electric mobility concept for urban commuting using a reverse charging mechanism to enable bidirectional energy flow and support sustainability.",
    technologies: ["Machine Design", "Reverse Charging", "Sustainability"],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden bg-[#020617] text-white py-24 px-6 md:px-10 lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-10 h-[22rem] w-[22rem] rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-10 h-[24rem] w-[24rem] rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-blue-600/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12">
        <motion.h2
          className="text-center text-4xl sm:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}