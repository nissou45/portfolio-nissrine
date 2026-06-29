"use client";

import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import Projects from "@/app/components/Projects";
import Parcours from "@/app/components/Parcours";
import Skills from "@/app/components/Skills";
import About from "@/app/components/About";
import Assistant from "@/app/components/Assistant";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import { useReveal } from "@/hooks/useReveal";
import { useTilt } from "@/hooks/useTilt";

export default function HomePage() {
  useReveal();
  useTilt();

  return (
    <>
      <div className="aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
        <div className="blob b5" />
      </div>
      <div className="grain" />
      <Nav />
      <Hero />
      <Projects />
      <Parcours />
      <Skills />
      <About />
      <Assistant />
      <Contact />
      <Footer />
    </>
  );
}
