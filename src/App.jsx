import React, { useState } from "react";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation";
import Education from "./pages/Education";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  return (
    <>
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          {/* <ParticlesBackground /> */}
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Education />
          <Experience />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
