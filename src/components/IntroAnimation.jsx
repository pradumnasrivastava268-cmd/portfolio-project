import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useEffect } from "react";

export default function IntroAnimation({ onFinish }) {
  const intro = useMemo(
    () => ["Hi", "Welcome", "To", "My", "Portfolio"],
    [],
  );

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < intro.length - 1) {
      const id = setTimeout(() => {
        setIndex((i) => i + 1);
      }, 220);
      return () => clearTimeout(id);
    }

    const t = setTimeout(() => {
      setVisible(false);
    }, 500);

    return () => clearTimeout(t);
  }, [index, intro.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020617] text-white"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="absolute inset-0">
            <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-blue-600/15 blur-3xl animate-glow-pulse" />
            <div
              className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gradient-to-r from-emerald-400/15 via-cyan-500/20 to-blue-600/25 blur-3xl animate-glow-pulse"
              style={{ animationDelay: "1.2s" }}
            />
          </div>

          <motion.h1
            key={intro[index]}
            className="relative z-10 text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.18 }}
          >
            {intro[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}