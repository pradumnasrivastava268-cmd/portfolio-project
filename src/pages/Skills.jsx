import React, { useEffect, useRef, useState } from "react";
import {
  FaJs,
  FaCss3,
  FaHtml5,
  FaAngular,
  FaChartLine,
  

 
} from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import {
  SiTailwindcss,
  SiSap,
} from "react-icons/si";
import { DiJqueryLogo } from "react-icons/di";
import { MdFlight } from "react-icons/md";
import { motion, useMotionValue } from "framer-motion";
import { GiCargoCrate } from "react-icons/gi";
import { MdSettingsApplications } from "react-icons/md";

export default function Skills() {
  const skills = [
    { icon: <RiFileExcel2Fill />, name: "Excel" },
    { icon: <FaChartLine />, name: "Power BI" },
    { icon: <SiSap />, name: "SAP" },
    { icon: <MdFlight />, name: "Logistics Management" },
    { icon: <GiCargoCrate />, name: "Supply chain management" },
    { icon: <MdSettingsApplications />, name: "WMS Implementation Specialist" },
   
  ];

  const repeated = [...skills, ...skills];
  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const X = useMotionValue(0);

  // Intersection Observer to detect when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll and touch handlers to set direction
  useEffect(() => {
    if (!active) return;
    const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
    const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (touchY.current == null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;
    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      let next = X.get() + dir * dt * SPEED;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }
      X.set(next);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, X]);

  return (
    <section
      id="skills"
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-300px h-300px rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] opacity-20 blur-120px animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-300px h-300px rounded-full bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] opacity-20 blur-120px animate-pulse delay-500" />
      </div>
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1580de] via-[#22217f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>
      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Applications | Technologies
      </motion.p>
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 text-6xl text-[#692097]"
          ref={trackRef}
          style={{ x: X, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-120px"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {s.icon}
              </span>
              <p className="text-sm">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
