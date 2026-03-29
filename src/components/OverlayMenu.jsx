import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import React from "react";

export default function OverlayMenu({ isOpen, onClose, activeSection }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "95% 8%" : "50% 8%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background:
              "radial-gradient(circle at top, rgba(16,185,129,0.16), transparent 25%), radial-gradient(circle at bottom right, rgba(59,130,246,0.18), transparent 30%), rgba(2, 6, 23, 0.97)",
            backdropFilter: "blur(12px)",
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-2xl hover:text-teal-300 transition-colors"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Education",
              "Experience",
              "Projects",
              "Contact",
            ].map((item, index) => {
              const isActive = activeSection === item.toLowerCase();

              return (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.08 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={onClose}
                    className={`text-4xl font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400"
                        : "text-white hover:text-teal-300"
                    }`}
                  >
                    {item}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}