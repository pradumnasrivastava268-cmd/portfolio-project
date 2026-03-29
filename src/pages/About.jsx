import React from "react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.png";

export default function About() {
  const stats = [
    { label: "Experience", value: "3+ Years" },
    { label: "Speciality", value: "Supply Chain & Operations" },
  ];

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[160px] delay-500",
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-[#020617] text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            className={`absolute rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 animate-pulse ${c}`}
            key={i}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-10 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="relative w-40 h-40 md:w-50 md:h-50 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-emerald-500/15 to-blue-600/15 border-2 border-teal-400/40"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <img
              src={profileImg}
              alt="Pradumna Srivastava"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400">
              Pradumna Srivastava
            </h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90">
              Assistant Manager - Supply Chain & Operations
            </p>

            <p className="mt-4 text-slate-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              Supply chain and operations professional with 3+ years of experience
              across DHL, Flipkart, and Zepto. Skilled in logistics optimisation,
              operational efficiency, and cost reduction, with a proven track
              record of leading cross-functional teams to implement solutions that
              improve supply chain performance and customer satisfaction.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-teal-300/15 bg-white/5 px-4 py-3 text-center backdrop-blur"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-slate-400">{item.label}</div>
                  <div className="text-base font-semibold text-white">
                    {item.value}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 shadow-lg hover:opacity-90 transition"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg border border-teal-300/20 bg-white/10 text-white px-5 py-3 hover:bg-white/15 transition backdrop-blur"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            About Me
          </h3>

          <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
            At DHL, Flipkart, and Zepto, I streamlined warehouse and logistics
            operations using SAP, Power BI, and data-driven insights to improve
            throughput, accuracy, and cost efficiency. I also led process
            optimisation and demand planning initiatives that boosted productivity
            and enabled scalable, high-performance supply chain operations.
          </p>

          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            I am currently pursuing an MSc in Information Systems and Operations
            Management at the University of Nottingham, with a focus on analytics,
            system design, and operations strategy. My goal is to bridge
            engineering and analytics to enhance supply chain performance,
            forecasting, and process efficiency in complex environments.
          </p>
        </motion.div>
      </div>
    </section>
  );
}