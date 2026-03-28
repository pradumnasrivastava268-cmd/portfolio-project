import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useMemo, useEffect } from "react";
export default function IntroAnimation({ onFinish }) {
  const intro = useMemo(
    () => ["Hi", "Welcome", "To", "My", "Portfolio", "Project"],
    [],
  );
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < intro.length - 1) {
      const id = setInterval(() => {
        setIndex((i) => i + 1);
      }, 180);
      return () => clearInterval(id);
    } else {
      const t = setTimeout(() => {
        setVisible(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [index, intro.length]);
  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.h1
            key={intro[index]}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.12 }}
          >
            {intro[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
