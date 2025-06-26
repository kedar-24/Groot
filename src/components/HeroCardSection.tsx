"use client";

import Button from "@/components/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1], // Custom ease for a smooth accelerate-decelerate curve
    },
  },
};

// --- REUSABLE COMPONENTS ---
const AccentCard = ({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`relative bg-[var(--color-secondary-light)] text-gray-900 p-5 rounded shadow-lg flex flex-col items-center justify-center min-h-[140px] h-full ${className}`}
  >
    {children}
    <div className="absolute left-0 bottom-0 w-full h-[6px] rounded-b bg-[var(--color-primary)]" />
  </div>
);

const SectionContainer = ({
  children,
  className = "",
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-0 ${className}`}>
    {children}
  </div>
);

const HeroCardSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  const smallCards = [
    { icon: "🎉", title: "Events", desc: "Join exclusive reunions" },
    { icon: "🏆", title: "Achievers", desc: "Celebrate success" },
    { icon: "📸", title: "Gallery", desc: "Relive memories" },
    { icon: "👥", title: "Groups", desc: "Find your batch" },
  ];

  return (
    // This section is pulled up to overlap with the hero section above it
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative z-20 w-full -mt-90"
    >
      <SectionContainer className="relative w-full flex flex-col lg:flex-row gap-5">
        {/* LEFT: Big Card */}
        <motion.div
          variants={cardVariants}
          whileHover={{
            y: -8,
            scale: 1.02,
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          className="relative lg:flex-1"
        >
          <div className="relative bg-[var(--color-primary)] text-white p-8 sm:p-10 rounded shadow-lg border border-white/20 min-h-[450px] flex flex-col justify-between overflow-hidden">
            <h2 className="text-2xl sm:text-[38px] lg:text-[44px] font-extrabold font-serif mb-6 leading-tight">
              Welcome to the{" "}
              <span className="text-[var(--color-primary-light)]">
                GreenWood's Alumni{" "}
              </span>
              Network.
            </h2>
            <p className="text-base sm:text-md text-[var(--color-secondary-light)]/90 mb-8 font-montserrat leading-relaxed">
              Where memories reconnect, friendships thrive, and new
              opportunities begin. Join thousands of alumni across our family of
              schools.
            </p>
            <Button
              variant="secondary"
              className="rounded-full px-8 py-4 bg-[var(--color-secondary-light)] !text-black font-montserrat font-semibold shadow-xl transition-transform duration-300 hover:scale-105 text-base"
            >
              Join the Alumni Community
            </Button>
          </div>
        </motion.div>

        {/* RIGHT: 2x2 Grid of Small Cards */}
        <div className="relative lg:flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {smallCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.08,
                transition: { type: "spring", stiffness: 300, damping: 15 },
              }}
            >
              <AccentCard>
                <span className="text-3xl mb-2">{card.icon}</span>
                <div className="font-bold text-lg">{card.title}</div>
                <div className="text-sm text-gray-600 text-center">
                  {card.desc}
                </div>
              </AccentCard>
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </motion.section>
  );
};

export default HeroCardSection;
