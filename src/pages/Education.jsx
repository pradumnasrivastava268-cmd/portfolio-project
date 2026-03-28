import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimelineScroller from "../components/TimelineScroller";

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

export default function Education() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile
    ? 170 * education.length
    : 130 * education.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  // ✅ FIXED SPELLING
  const threshold = useMemo(
    () => education.map((_, i) => (i + 1) / education.length),
    [],
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="education" className="relative bg-black text-white">
      <div
        ref={sceneRef}
        style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen flex flex-col">

          {/* TITLE */}
          <motion.h2
            className="text-4xl sm:text-5xl font-semibold mt-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63]"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>

          {/* CONTENT */}
          <div className="flex flex-1 items-center justify-center px-6 pb-10">

            {/* DESKTOP */}
            {!isMobile && (
              <div className="relative w-full max-w-[1200px]">

                {/* TIMELINE BAR */}
                <div className="relative h-2 bg-white/30 rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-2 bg-white rounded-full origin-left"
                    style={{ width: lineSize }}
                  />
                </div>

                {/* ITEMS */}
                <div className="relative flex justify-between gap-6 mt-10">
                  {education.map((edu, index) => (
                    <TimelineScroller
                      key={index}
                      exp={edu}
                      index={index}
                      start={index === 0 ? 0 : threshold[index - 1]}
                      end={threshold[index]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                      type="edu"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* MOBILE */}
            {isMobile && (
              <div className="relative w-full max-w-md px-4">

                {/* VERTICAL LINE */}
                <div className="absolute left-4 top-0 bottom-0 w-[3px] bg-white/20 rounded">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-white rounded origin-top"
                    style={{ height: lineSize }}
                  />
                </div>

                {/* ITEMS */}
                <div className="relative flex flex-col gap-12 ml-10 mt-6 pb-28">
                  {education.map((edu, index) => (
                    <TimelineScroller
                      key={index}
                      exp={edu}
                      index={index}
                      start={index === 0 ? 0 : threshold[index - 1]}
                      end={threshold[index]}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                      type="edu"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}