import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimelineScroller from "../components/TimelineScroller";

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

export default function Experience() {
  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = 140 * experiences.length;

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const threshold = useMemo(
    () => experiences.map((_, i) => (i + 1) / experiences.length),
    [],
  );

  const lineSize = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="experience" className="relative bg-[#020617] text-white">
      <motion.h2
        className="text-4xl sm:text-5xl font-semibold pt-8 md:pt-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      {isMobile ? (
        <div className="relative w-full max-w-md mx-auto px-4 pt-10 pb-16">
          <div className="absolute left-7 top-10 bottom-16 w-[3px] bg-white/20" />

          <div className="flex flex-col gap-10">
            {experiences.map((exp, index) => (
              <TimelineScroller
                key={index}
                exp={exp}
                index={index}
                start={index === 0 ? 0 : threshold[index - 1]}
                end={threshold[index]}
                scrollYProgress={scrollYProgress}
                layout="mobile"
                type="exp"
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          ref={sceneRef}
          style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }}
          className="relative"
        >
          <div className="sticky top-0 h-screen flex flex-col">
            <div className="flex flex-1 items-center justify-center px-6 pb-10">
              <div className="relative w-full max-w-[1400px]">
                <div className="relative h-2 bg-white/20 rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500"
                    style={{ width: lineSize }}
                  />
                </div>

                <div className="flex justify-between mt-10">
                  {experiences.map((exp, index) => (
                    <TimelineScroller
                      key={index}
                      exp={exp}
                      index={index}
                      start={index === 0 ? 0 : threshold[index - 1]}
                      end={threshold[index]}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                      type="exp"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}