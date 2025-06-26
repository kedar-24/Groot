"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Button from "@/components/button";
import FeatureSection from "@/components/FeatureSection";
import HeroCardSection from "@/components/HeroCardSection";
import SectionContainer from "@/components/SectionContainer";
import HighlightSection from "@/components/HighlightSection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

// --- UI CONFIGURATION ---
const UI = {
  colors: {
    background: "var(--color-background)",
    primary: "var(--color-primary)",
    primaryLight: "var(--color-primary-light)",
    secondaryLight: "var(--color-secondary-light)",
    black: "var(--color-black)",
  },
  fonts: {
    heading: "font-extrabold font-serif",
    body: "font-montserrat",
  },
  layout: {
    sectionPadding: "py-32 px-4 sm:px-8 lg:px-16",
  },
};

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
const patternVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: {
    opacity: 0.4,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};
const CompanyLogo = ({ src, alt }: { src: string; alt: string }) => (
  <motion.div
    variants={itemVariants}
    className="w-32 h-16 flex items-center justify-center"
  >
    <Image
      src={src}
      alt={alt}
      width={120}
      height={40}
      className="object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
    />
  </motion.div>
);

// --- MAIN PAGE ---
export default function HomePage() {
  const heroCardRef = useRef(null);
  const heroCardInView = useInView(heroCardRef, { once: true, amount: 0.2 });

  const trustedByRef = useRef(null);
  const trustedByInView = useInView(trustedByRef, { once: true, amount: 0.1 });

  const featureRef = useRef(null);
  const featureInView = useInView(featureRef, { once: true, amount: 0.0 });

  const highlightRef = useRef(null);
  const highlightInView = useInView(highlightRef, { once: true, amount: 0.1 });

  return (
    <>
      {/* <Navbar variant="glass" /> */}
      <main
        className={`flex flex-col min-h-screen bg-[${UI.colors.background}] text-black relative`}
      >
        {/* HERO */}
        <section
          className={`relative w-full flex items-center ${UI.layout.sectionPadding} pt-40 pb-20 md:pt-64 md:pb-64`}
        >
          {/* Animated Background Panels */}
          <motion.div
            className="absolute top-0 left-0 h-full w-2/3 bg-[var(--color-primary-light)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.6, 0.01, -0.05, 0.95] }}
            style={{ transformOrigin: "left" }}
          />
          <motion.div
            className="absolute top-0 right-0 h-full w-1/3 bg-[var(--color-secondary-light)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.6, 0.01, -0.05, 0.95] }}
            style={{ transformOrigin: "right" }}
          />
          {/* Pattern Overlay */}
          <motion.div
            className="absolute inset-0 z-0"
            initial="hidden"
            animate="visible"
            variants={patternVariants}
            style={{
              backgroundImage: "url('/images/BG.jpg')",
              backgroundSize: "400px",
              backgroundPosition: "center top",
              backgroundRepeat: "repeat",
              backgroundBlendMode: "multiply",
            }}
          />
        </section>

        {/* FLOATING CARDS GRID */}
        <motion.div
          ref={heroCardRef}
          initial="hidden"
          animate={heroCardInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="relative z-10 w-full"
        >
          <HeroCardSection />
        </motion.div>

        {/* TRUSTED BY */}
        <motion.section
          ref={trustedByRef}
          initial="hidden"
          animate={trustedByInView ? "visible" : "hidden"}
          variants={sectionVariants}
          className={`w-full pt-20 bg-white ${UI.layout.sectionPadding} text-center relative z-0`}
        >
          <SectionContainer>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-extrabold text-gray-900 md:text-5xl"
            >
              Trusted by{" "}
              <span className={`text-[${UI.colors.primary}] opacity-80`}>
                10,000+ alumni
              </span>{" "}
              working at
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-5 text-lg font-normal text-gray-500 lg:text-xl mb-12"
            >
              Our alumni are making an impact at the world’s leading
              organizations.
            </motion.p>
            <motion.div
              variants={sectionVariants}
              className="flex flex-wrap justify-center items-center gap-10 sm:gap-16"
            >
              {[
                [
                  "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
                  "Google",
                ],
                [
                  "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
                  "Microsoft",
                ],
                [
                  "https://logos-world.net/wp-content/uploads/2020/04/Amazon-Logo.png",
                  "Amazon",
                ],
                ["https://logo.clearbit.com/tcs.com", "TCS"],
              ].map((item) => {
                const [src, alt] = item;
                return <CompanyLogo key={alt} src={src} alt={alt} />;
              })}
            </motion.div>
          </SectionContainer>
        </motion.section>

        {/* FEATURE SECTION */}
        <motion.div
          ref={featureRef}
          initial="hidden"
          animate={featureInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <FeatureSection />
        </motion.div>

        {/* HIGHLIGHTS */}
        <motion.div
          ref={highlightRef}
          initial="hidden"
          animate={highlightInView ? "visible" : "hidden"}
          variants={sectionVariants}
        >
          <HighlightSection />
        </motion.div>
      </main>
    </>
  );
}
