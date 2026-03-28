import React, { useState, useRef, useEffect } from "react";
import OverlayMenu from "./OverlayMenu";
import { FiMenu } from "react-icons/fi";

const SECTIONS = [
  "home",
  "about",
  "skills",
  "education",
  "experience",
  "projects",
  "contact",
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const lastScrollY = useRef(0);
  const timerID = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      { threshold: 0.1 },
    );
    if (homeSection) observer.observe(homeSection);
    return () => {
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (forceVisible) {
        setVisible(true);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
        if (timerID.current) clearTimeout(timerID.current);
        timerID.current = setTimeout(() => setVisible(false), 1500);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerID.current) clearTimeout(timerID.current);
    };
  }, [forceVisible]);
  useEffect(() => {
    const observers = [];

    SECTIONS.forEach((id) => {
      const el = document.querySelector(`#${id}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-6 py-5 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="text-2xl font-bold text-white hidden sm:block" />
        <div className="block ml-auto lg:ml-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl focus:outline-none"
            aria-label="Open Menu"
          >
            <FiMenu />
          </button>
        </div>
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-gradient-to-r from-[#302b63] via-[#37053c] to-[#692097] text-white px-5 py-2 rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>
      <OverlayMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
