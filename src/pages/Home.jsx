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
  ];

  const glowVariants = {
    initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
      scale: 1.2,
      y: -3,
      filter:
        "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(45, 27, 78,0.8))",
    },
    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
  };

  const roles = useMemo(
    () => ["Supply Chain Specialist", "Logistics Manager", "Operartions Expert"],
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
    <section id="home" className="w-full h-screen relative bg-black">
      <ParticlesBackground />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-62.5 sm:w-87.5 md:w-125 h-62.5 sm:h-87.5 md:h-125 rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] blur-3xl animate-glow-pulse" />
        <div
          className="absolute bottom-0 right-0 w-62.5 sm:w-87.5 md:w-125 h-62.5 sm:h-87.5 md:h-125 rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] blur-3xl animate-glow-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 flex items-center justify-center lg:justify-start">
        <div className="w-full lg:pr-24 mx-auto max-w-3xl">
          <motion.div
            className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6rem]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span>{roles[index].substring(0, subIndex)}</span>
            <span
              className="inline-block w-0.5 ml-1 bg-white animate-pulse align-middle"
              style={{ height: "1em" }}
            />
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63] drop-shadow-lg"
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
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            MSc Information Systems student & Supply Chain and Operations professional with 3+ years of experience in DHL, Flipkart, and Zepto. Skilled in optimizing logistics, enhancing operational efficiency, and driving cost savings. Proven track record of leading cross-functional teams to streamline operations.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a
              href="#experience"
              className="px-6 py-3 rounded-full font-medium text-lg text-white bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] shadow-lg hover:scale-105 transition-all"
            >
              View my Work
            </a>
            <a
              href="/CV - Pradumna Srivastava.pdf"
              download
              className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
            >
              My Resume
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
                className="text-gray-300"
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
