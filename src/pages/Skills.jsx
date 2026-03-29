import React from "react";
import { FaChartLine } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { SiSap } from "react-icons/si";
import { MdFlight, MdSettingsApplications } from "react-icons/md";
import { motion } from "framer-motion";
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

  return (
    <section
      id="skills"
      className="relative w-full overflow-hidden bg-[#020617] px-6 py-20 text-white md:px-10 lg:px-12"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 opacity-20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-[300px] w-[300px] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 opacity-20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-blue-400 sm:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        <motion.p
          className="mt-2 mb-10 text-center text-base text-slate-300 sm:text-lg"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Applications | Technologies
        </motion.p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex min-h-[150px] flex-col items-center justify-center rounded-2xl border border-teal-300/15 bg-slate-900/70 px-4 py-6 text-center shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/35"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="mb-4 text-5xl text-teal-300 transition-colors duration-300 hover:text-blue-300">
                {skill.icon}
              </div>

              <p className="text-sm leading-5 text-slate-200 sm:text-[15px]">
                {skill.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}