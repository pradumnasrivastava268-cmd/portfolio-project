import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import flipkartLogo from "../assets/F.png.jpg";
import zeptoLogo from "../assets/Z.png.png";
import dhlLogo from "../assets/D.png.png";

const experiences = [
  {
    role: "Assistant Manager - Central Operations",
    company: "Flipkart",
    logo: flipkartLogo,
    duration: "March 2025 – August 2025",
    description:
      "Streamlined warehouse and supply chain operations at Flipkart using data-driven planning and resource optimisation, achieving 18% cost reduction. Executed high-impact process improvement initiatives, boosting productivity by 48%.",
    technologies: [
      "Logistics Management",
      "SAP ERP",
      "Demand Planning",
      "Warehouse Ops",
      "Power BI",
    ],
  },
  {
    role: "Assistant Manager - Control Tower",
    company: "Zepto",
    logo: zeptoLogo,
    duration: "October 2024 – March 2025",
    description:
      "Optimised real-time supply chain operations using predictive analytics, reducing delays by 20% and improving accuracy to 95%.",
    technologies: [
      "Root Cause Analysis",
      "Process Engineering",
      "Inventory",
      "Network Optimisation",
    ],
  },
  {
    role: "Assistant Manager - Warehouse Operations",
    company: "DHL",
    logo: dhlLogo,
    duration: "March 2022 – June 2024",
    description:
      "Managed 700K+ units/month, reducing dock-to-stock time by 33% and achieving 99.75% order accuracy.",
    technologies: [
      "Supply Chain",
      "Inventory",
      "Reverse Logistics",
      "SAP MM",
    ],
  },
];

function Pills({ items, active }) {
  if (!items?.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 ${
            active
              ? "border border-teal-300/25 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-blue-500/20 text-slate-100"
              : "border border-white/10 bg-white/5 text-slate-300"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function MobileExpCard({ exp, active }) {
  return (
    <div className="relative pl-10">
      <div
        className={`absolute left-0 top-4 z-10 h-6 w-6 rounded-full transition-all duration-300 ${
          active
            ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_18px_rgba(45,212,191,0.35)]"
            : "bg-white/25"
        }`}
      />

      <article
        className={`w-full rounded-xl border p-5 shadow-lg backdrop-blur transition-all duration-300 ${
          active
            ? "border-teal-300/30 bg-slate-900/90 opacity-100"
            : "border-white/10 bg-slate-900/70 opacity-80"
        }`}
      >
        <div className="mb-3 flex items-start gap-3">
          <img
            src={exp.logo}
            alt={exp.company}
            className="h-8 w-8 shrink-0 rounded-md bg-white p-1 object-contain shadow"
          />
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-snug text-white">
              {exp.role}
            </h3>
            <p className="text-xs text-slate-400">
              {exp.company} | {exp.duration}
            </p>
          </div>
        </div>

        <p className="text-sm leading-7 text-slate-300">{exp.description}</p>
        <Pills items={exp.technologies} active={active} />
      </article>
    </div>
  );
}

function DesktopExpCard({ exp, active, position }) {
  const positionClass =
    position === "left"
      ? "left-[5%] top-[12%]"
      : position === "center"
        ? "left-1/2 bottom-[14%] -translate-x-1/2"
        : "right-[5%] top-[12%]";

  return (
    <article
      className={`absolute w-[320px] rounded-2xl border p-6 shadow-lg backdrop-blur transition-all duration-300 ${positionClass} ${
        active
          ? "border-teal-300/35 bg-slate-900/92 opacity-100 scale-[1.02] shadow-[0_0_26px_rgba(45,212,191,0.08)]"
          : "border-white/10 bg-slate-900/72 opacity-75 scale-100"
      }`}
    >
      <div className="mb-3 flex items-start gap-3">
        <img
          src={exp.logo}
          alt={exp.company}
          className="h-9 w-9 shrink-0 rounded-md bg-white p-1 object-contain shadow"
        />
        <div className="min-w-0">
          <h3 className="text-xl font-semibold leading-snug text-white">
            {exp.role}
          </h3>
          <p className="text-sm text-slate-400">
            {exp.company} | {exp.duration}
          </p>
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-300">{exp.description}</p>
      <Pills items={exp.technologies} active={active} />
    </article>
  );
}

export default function Experience() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 30%"],
  });

  const desktopLineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const mobileLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.14) {
      setActiveIndex(-1);
    } else if (latest < 0.4) {
      setActiveIndex(0);
    } else if (latest < 0.72) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#020617] text-white"
    >
      {isMobile ? (
        <div className="relative mx-auto w-full max-w-md px-4 pb-16 pt-8">
          <motion.h2
            className="text-center text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 sm:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Experience
          </motion.h2>

          <div className="relative mt-10">
            <div className="absolute left-4 top-0 bottom-0 w-[3px] rounded bg-white/20">
              <motion.div
                className="absolute left-0 top-0 w-full rounded bg-gradient-to-b from-emerald-400 via-teal-400 to-blue-500"
                style={{ height: mobileLineHeight }}
              />
            </div>

            <div className="relative ml-10 flex flex-col gap-10">
              {experiences.map((exp, index) => (
                <MobileExpCard
                  key={exp.role}
                  exp={exp}
                  active={activeIndex >= index}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-[140vh] min-h-[110vh]">
          <div className="sticky top-0 flex h-screen flex-col">
            <motion.h2
              className="mt-6 text-center text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 sm:text-5xl"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Experience
            </motion.h2>

            <div className="relative flex flex-1 items-center justify-center px-8 pb-6">
              <div className="relative h-[78vh] w-full max-w-[1450px]">
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/20">
                  <motion.div
                    className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500"
                    style={{ width: desktopLineWidth }}
                  />
                </div>

                <div
                  className={`absolute left-[18%] top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    activeIndex >= 0
                      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_22px_rgba(45,212,191,0.35)]"
                      : "bg-white/25"
                  }`}
                />
                <div
                  className={`absolute left-[50%] top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    activeIndex >= 1
                      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_22px_rgba(45,212,191,0.35)]"
                      : "bg-white/25"
                  }`}
                />
                <div
                  className={`absolute left-[82%] top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    activeIndex >= 2
                      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_22px_rgba(45,212,191,0.35)]"
                      : "bg-white/25"
                  }`}
                />

                <div className="absolute left-[18%] top-1/2 h-12 w-[3px] -translate-x-1/2 bg-white/30" />
                <div className="absolute left-[50%] top-1/2 h-12 w-[3px] -translate-x-1/2 bg-white/30" />
                <div className="absolute left-[82%] top-1/2 h-12 w-[3px] -translate-x-1/2 bg-white/30" />

                <DesktopExpCard
                  exp={experiences[0]}
                  active={activeIndex >= 0}
                  position="left"
                />
                <DesktopExpCard
                  exp={experiences[1]}
                  active={activeIndex >= 1}
                  position="center"
                />
                <DesktopExpCard
                  exp={experiences[2]}
                  active={activeIndex >= 2}
                  position="right"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}