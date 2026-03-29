import React, { useEffect, useRef, useState } from "react";
import { FaChartLine } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { SiSap } from "react-icons/si";
import { MdFlight, MdSettingsApplications } from "react-icons/md";
import { motion, useMotionValue } from "framer-motion";
import { GiCargoCrate } from "react-icons/gi";

export default function Skills() {
  const skills = [
    { icon: <RiFileExcel2Fill />, name: "Excel" },
    { icon: <FaChartLine />, name: "Power BI" },
    { icon: <SiSap />, name: "SAP" },
    { icon: <MdFlight />, name: "Logistics Management" },
    { icon: <GiCargoCrate />, name: "Supply Chain Management" },
    {
      icon: <MdSettingsApplications />,
      name: "WMS Implementation Specialist",
    },
  ];

  const repeated = [...skills, ...skills];
  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);
  const X = useMotionValue(0);

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
      className="w-full py-16 flex flex-col items-center justify-center relative bg-[#020617] text-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 opacity-20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>

      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        My Skills
      </motion.h2>

      <motion.p
        className="mt-2 mb-8 text-slate-300 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Applications | Technologies
      </motion.p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 text-6xl text-teal-300"
          ref={trackRef}
          style={{ x: X, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeated.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={s.name}
              title={s.name}
            >
              <span className="hover:scale-125 hover:text-blue-300 transition-all duration-300">
                {s.icon}
              </span>
              <p className="text-sm text-slate-300">{s.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}