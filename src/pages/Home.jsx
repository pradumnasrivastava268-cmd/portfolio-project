import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import ParticlesBackground from "../components/ParticlesBackground";

export default function Home() {
  const socials = [
    {
      Icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/pradumnasrivastava",
    },
    {
      Icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/pradumnasrivastava268-cmd",
    },
  ];

  const glowVariants = {
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
      scale: 1.15,
      y: -3,
      filter:
        "drop-shadow(0 0 10px rgba(16,185,129,0.9)) drop-shadow(0 0 20px rgba(59,130,246,0.7))",
    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
  };

  const roles = useMemo(
    () => [
      "Supply Chain Specialist",
      "Logistics Manager",
      "Operations Professional",
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) {
          setSubIndex(subIndex + 1);
        } else if (!deleting && subIndex === current.length) {
          setTimeout(() => setDeleting(true), 1200);
        } else if (deleting && subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((index + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="home" className="relative w-full h-screen bg-[#020617]">
      <ParticlesBackground />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-64 sm:w-80 md:w-[32rem] h-64 sm:h-80 md:h-[32rem] rounded-full bg-gradient-to-r from-emerald-500/30 via-teal-500/25 to-blue-600/20 blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-0 right-0 w-64 sm:w-80 md:w-[32rem] h-64 sm:h-80 md:h-[32rem] rounded-full bg-gradient-to-r from-emerald-400/20 via-cyan-500/20 to-blue-600/30 blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 flex items-center justify-center lg:justify-start">
        <div className="w-full max-w-3xl mx-auto lg:mx-0 lg:pr-24">
          <motion.div
            className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gradient-primary">
              {roles[index].substring(0, subIndex)}
            </span>
            <span
              className="inline-block w-0.5 ml-1 bg-emerald-300 animate-pulse align-middle"
              style={{ height: "1em" }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 drop-shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Hello, I'm
            <br />
            <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
              Pradumna Srivastava
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            MSc Information Systems student and supply chain & operations
            professional with 3+ years of experience across DHL, Flipkart, and
            Zepto. Skilled in logistics optimisation, process improvement,
            operational efficiency, and cost reduction.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#experience"
              className="px-6 py-3 rounded-full font-medium text-lg text-white shadow-lg transition-all hover:scale-105 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600"
            >
              Work Experience
            </a>

            <a
              href="/CV - Pradumna Srivastava.pdf"
              download
              className="px-6 py-3 rounded-full text-lg font-medium text-white border border-teal-300/30 bg-white/10 backdrop-blur hover:bg-white/15 shadow-lg transition-all hover:scale-105"
            >
              Download CV
            </a>
          </motion.div>

          <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
            {socials.map(({ Icon, label, href }) => (
              <motion.a
                href={href}
                key={label}
                target="_blank"
                aria-label={label}
                rel="noopener noreferrer"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="text-slate-300 hover:text-white transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}