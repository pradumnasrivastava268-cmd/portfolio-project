import { motion, useTransform } from "framer-motion";
import React from "react";

function Pills({ items }) {
  if (!items?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {items.map((item) => (
        <span
          key={item}
          className="px-2 py-0.5 rounded-full text-[11px] font-medium text-gray-300
          bg-gradient-to-r from-[#302b63]/60 to-[#37053c]/60 border border-white/10"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function TimelineScroller({
  exp,
  index,
  start,
  end,
  scrollYProgress,
  layout,
  type,
}) {
  const scale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [index % 2 === 0 ? 30 : -30, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // =========================
  // ✅ EXPERIENCE - DESKTOP
  // =========================
  if (type === "exp" && layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${
            index % 2 === 0 ? "-top-8" : "-bottom-8"
          } bg-white/40`}
          style={{ width: 3, height: 40, opacity }}
        />

        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg`}
          style={{ opacity, y, width: 320, maxWidth: "42vw" }}
        >
          {/* ✅ LOGO + HEADER */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-8 h-8 object-contain rounded-md bg-white p-1 shadow"
            />
            <div>
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-xs text-gray-400">
                {exp.company} | {exp.duration}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300">{exp.description}</p>
          <Pills items={exp.technologies} />
        </motion.article>
      </div>
    );
  }

  // =========================
  // ✅ EXPERIENCE - MOBILE
  // =========================
  if (type === "exp" && layout === "mobile") {
    return (
      <div className="relative flex items-start gap-4 pl-2">
        <motion.div
          className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white"
          style={{ opacity }}
        />

        <motion.article
          className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg w-full"
          style={{ opacity, x }}
        >
          <div className="flex items-center gap-3 mb-2">
            <img
              src={exp.logo}
              alt={exp.company}
              className="w-8 h-8 object-contain rounded-md bg-white p-1 shadow"
            />
            <div>
              <h3 className="text-lg font-semibold">{exp.role}</h3>
              <p className="text-xs text-gray-400">
                {exp.company} | {exp.duration}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300">{exp.description}</p>
          <Pills items={exp.technologies} />
        </motion.article>
      </div>
    );
  }

  // =========================
  // 🎓 EDUCATION - DESKTOP
  // =========================
  if (type === "edu" && layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-white"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${
            index % 2 === 0 ? "-top-8" : "-bottom-8"
          } bg-white/40`}
          style={{ width: 3, height: 40, opacity }}
        />

        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg`}
          style={{ opacity, y, width: 320, maxWidth: "42vw" }}
        >
          <h3 className="text-lg font-semibold">{exp.degree}</h3>
          <p className="text-xs text-gray-400 mb-1">
            {exp.institution} | {exp.duration}
          </p>

          <Pills items={exp.modules} />
        </motion.article>
      </div>
    );
  }

  // =========================
  // 🎓 EDUCATION - MOBILE
  // =========================
  if (type === "edu" && layout === "mobile") {
    return (
      <div className="relative flex items-start gap-4 pl-2">
        <motion.div
          className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-white"
          style={{ opacity }}
        />

        <motion.article
          className="bg-gray-900/80 backdrop-blur border border-gray-700/70 rounded-xl p-5 shadow-lg w-full"
          style={{ opacity, x }}
        >
          <h3 className="text-lg font-semibold">{exp.degree}</h3>
          <p className="text-xs text-gray-400 mb-1">
            {exp.institution} | {exp.duration}
          </p>

          <Pills items={exp.modules} />
        </motion.article>
      </div>
    );
  }

  return null; // fallback
}