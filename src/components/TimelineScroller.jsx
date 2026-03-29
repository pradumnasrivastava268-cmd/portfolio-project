import { motion, useTransform } from "framer-motion";
import React from "react";

function Pills({ items }) {
  if (!items?.length) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-3">
      {items.map((item) => (
        <span
          key={item}
          className="px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-200
          bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-blue-500/15
          border border-teal-300/15"
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
  const scale = useTransform(scrollYProgress, [start, end], [0.5, 1]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
  const y = useTransform(
    scrollYProgress,
    [start, end],
    [index % 2 === 0 ? 30 : -30, 0],
  );
  const x = useTransform(scrollYProgress, [start, end], [-24, 0]);

  if (type === "exp" && layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_20px_rgba(45,212,191,0.35)]"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${
            index % 2 === 0 ? "-top-8" : "-bottom-8"
          } bg-white/30`}
          style={{ width: 3, height: 40, opacity }}
        />

        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-slate-900/80 backdrop-blur border border-teal-300/15 rounded-xl p-5 shadow-lg`}
          style={{ opacity, y, width: 320, maxWidth: "42vw" }}
        >
          <div className="flex items-center gap-3 mb-2">
            {exp.logo && (
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-8 h-8 object-contain rounded-md bg-white p-1 shadow"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
              <p className="text-xs text-slate-400">
                {exp.company} | {exp.duration}
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-300">{exp.description}</p>
          <Pills items={exp.technologies} />
        </motion.article>
      </div>
    );
  }

  if (type === "exp" && layout === "mobile") {
    return (
      <div className="relative pl-10">
        <motion.div
          className="absolute left-0 top-4 z-10 w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_18px_rgba(45,212,191,0.35)]"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        />

        <motion.article
          className="w-full rounded-xl border border-teal-300/15 bg-slate-900/80 backdrop-blur p-4 sm:p-5 shadow-lg"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-start gap-3 mb-3">
            {exp.logo && (
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-8 h-8 object-contain rounded-md bg-white p-1 shadow shrink-0"
              />
            )}
            <div className="min-w-0">
              <h3 className="text-lg leading-snug font-semibold break-words text-white">
                {exp.role}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {exp.company} | {exp.duration}
              </p>
            </div>
          </div>

          <p className="text-sm leading-7 text-slate-300">{exp.description}</p>
          <Pills items={exp.technologies} />
        </motion.article>
      </div>
    );
  }

  if (type === "edu" && layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_20px_rgba(45,212,191,0.35)]"
          style={{ scale, opacity }}
        />

        <motion.div
          className={`absolute ${
            index % 2 === 0 ? "-top-8" : "-bottom-8"
          } bg-white/30`}
          style={{ width: 3, height: 40, opacity }}
        />

        <motion.article
          className={`absolute ${
            index % 2 === 0 ? "bottom-12" : "top-12"
          } bg-slate-900/80 backdrop-blur border border-teal-300/15 rounded-xl p-5 shadow-lg`}
          style={{ opacity, y, width: 320, maxWidth: "42vw" }}
        >
          <h3 className="text-lg font-semibold text-white">{exp.degree}</h3>
          <p className="text-xs text-slate-400 mb-1">
            {exp.institution} | {exp.duration}
          </p>

          <Pills items={exp.modules} />
        </motion.article>
      </div>
    );
  }

  if (type === "edu" && layout === "mobile") {
    return (
      <div className="relative flex items-start gap-4 pl-2">
        <motion.div
          className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 shadow-[0_0_20px_rgba(45,212,191,0.35)]"
          style={{ opacity }}
        />

        <motion.article
          className="bg-slate-900/80 backdrop-blur border border-teal-300/15 rounded-xl p-5 shadow-lg w-full"
          style={{ opacity, x }}
        >
          <h3 className="text-lg font-semibold text-white">{exp.degree}</h3>
          <p className="text-xs text-slate-400 mb-1">
            {exp.institution} | {exp.duration}
          </p>

          <Pills items={exp.modules} />
        </motion.article>
      </div>
    );
  }

  return null;
}