import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaShip, FaPlane, FaTruck, FaBoxOpen } from "react-icons/fa";

const LINE_HEIGHT = 320; // total journey height

const TransportScroller = () => {
  const { scrollYProgress } = useScroll();
  const [stage, setStage] = useState("ship");

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v < 0.25) setStage("ship");
      else if (v < 0.5) setStage("plane");
      else if (v < 0.75) setStage("truck");
      else setStage("delivery");
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  // 👇 ICON travels EXACTLY within line
  const y = useTransform(scrollYProgress, [0, 1], [0, LINE_HEIGHT - 48]);

  // 👇 PROGRESS fills full line
  const progressHeight = useTransform(scrollYProgress, [0, 1], [0, LINE_HEIGHT]);

  const getIcon = () => {
    switch (stage) {
      case "ship":
        return <FaShip size={24} />;
      case "plane":
        return <FaPlane size={24} />;
      case "truck":
        return <FaTruck size={24} />;
      case "delivery":
        return <FaBoxOpen size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex">
      <div
        className="relative flex items-start justify-center"
        style={{ height: LINE_HEIGHT, width: "80px" }}
      >
        {/* Background Line */}
        <div className="absolute top-0 w-[2px] h-full rounded-full bg-white/20" />

        {/* Progress Line */}
        <motion.div
          className="absolute top-0 w-[2px] rounded-full bg-white"
          style={{ height: progressHeight }}
        />

        {/* Moving Icon */}
        <motion.div style={{ y }} className="absolute top-0">
          <motion.div
            key={stage}
            initial={{ scale: 0.8, rotate: -90, opacity: 0 }}
            animate={{
              scale: 1,
              rotate: 0,
              opacity: 1,
              boxShadow: [
                "0 0 10px rgba(255,255,255,0.15)",
                "0 0 20px rgba(255,255,255,0.35)",
                "0 0 10px rgba(255,255,255,0.15)",
              ],
            }}
            transition={{
              duration: 0.45,
              boxShadow: {
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              },
            }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full shadow-lg transition"
          >
            {getIcon()}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransportScroller;