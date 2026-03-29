import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const education = [
  {
    degree: "MSc Information Systems & Operations Management",
    institution: "University of Nottingham, UK",
    duration: "2025 – 2026",
    modules: [
      "Operations & Supply Chain Strategy",
      "Project Management",
      "Information System Design & Development",
      "Business Intelligence & Analytics",
      "Data Management & Manipulation",
      "E-Business",
    ],
  },
  {
    degree: "B.TECH in Mechanical Engineering",
    institution: "Visvesvaraya Technological University, India",
    duration: "2018 – 2022",
    modules: ["First Class with honors", "CGPA: 9.4/10"],
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

function MobileEduCard({ edu, active }) {
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
        <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
        <p className="mb-1 text-xs text-slate-400">
          {edu.institution} | {edu.duration}
        </p>
        <Pills items={edu.modules} active={active} />
      </article>
    </div>
  );
}

function DesktopEduCard({ edu, active, position }) {
  return (
    <article
      className={`absolute w-[360px] rounded-2xl border p-6 shadow-lg backdrop-blur transition-all duration-300 ${
        position === "top"
          ? "left-[12%] top-[14%]"
          : "right-[12%] bottom-[16%]"
      } ${
        active
          ? "border-teal-300/35 bg-slate-900/92 opacity-100 scale-[1.02] shadow-[0_0_26px_rgba(45,212,191,0.08)]"
          : "border-white/10 bg-slate-900/72 opacity-75 scale-100"
      }`}
    >
      <h3 className="text-2xl font-semibold leading-snug text-white">
        {edu.degree}
      </h3>
      <p className="mb-2 text-sm text-slate-400">
        {edu.institution} | {edu.duration}
      </p>
      <Pills items={edu.modules} active={active} />
    </article>
  );
}

export default function Education() {
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
    if (latest < 0.18) {
      setActiveIndex(-1);
    } else if (latest < 0.62) {
      setActiveIndex(0);
    } else {
      setActiveIndex(1);
    }
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative bg-[#020617] text-white"
    >
      {isMobile ? (
        <div className="relative mx-auto w-full max-w-md px-4 pb-16 pt-8">
          <motion.h2
            className="text-center text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 sm:text-5xl"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>

          <div className="relative mt-10">
            <div className="absolute left-4 top-0 bottom-0 w-[3px] rounded bg-white/20">
              <motion.div
                className="absolute left-0 top-0 w-full rounded bg-gradient-to-b from-emerald-400 via-teal-400 to-blue-500"
                style={{ height: mobileLineHeight }}
              />
            </div>

            <div className="relative ml-10 flex flex-col gap-10">
              {education.map((edu, index) => (
                <MobileEduCard
                  key={edu.degree}
                  edu={edu}
                  active={activeIndex >= index}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative h-[125vh] min-h-[105vh]">
          <div className="sticky top-0 flex h-screen flex-col">
            <motion.h2
              className="mt-6 text-center text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 sm:text-5xl"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Education
            </motion.h2>

            <div className="relative flex flex-1 items-center justify-center px-8 pb-6">
              <div className="relative h-[72vh] w-full max-w-[1350px]">
                <div className="absolute left-0 right-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/20">
                  <motion.div
                    className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500"
                    style={{ width: desktopLineWidth }}
                  />
                </div>

                <div
                  className={`absolute left-[24%] top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    activeIndex >= 0
                      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_22px_rgba(45,212,191,0.35)]"
                      : "bg-white/25"
                  }`}
                />
                <div
                  className={`absolute left-[76%] top-1/2 z-10 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    activeIndex >= 1
                      ? "bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_22px_rgba(45,212,191,0.35)]"
                      : "bg-white/25"
                  }`}
                />

                <div className="absolute left-[24%] top-1/2 h-12 w-[3px] -translate-x-1/2 bg-white/30" />
                <div className="absolute left-[76%] top-1/2 h-12 w-[3px] -translate-x-1/2 bg-white/30" />

                <DesktopEduCard
                  edu={education[0]}
                  active={activeIndex >= 0}
                  position="top"
                />
                <DesktopEduCard
                  edu={education[1]}
                  active={activeIndex >= 1}
                  position="bottom"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}