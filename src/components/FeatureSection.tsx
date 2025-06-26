"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CalendarCheck,
  Users,
  Briefcase,
  Image as ImgIcon,
  GraduationCap,
  Mail,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const imageVariants = (index: number) => {
  const isVerticalAnimation = Math.floor(index / 2) % 2 === 0;
  const isImageLeft = index % 2 === 0;

  if (isVerticalAnimation) {
    return {
      hidden: { opacity: 0, y: isImageLeft ? -100 : 100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    };
  } else {
    return {
      hidden: { opacity: 0, x: isImageLeft ? -100 : 100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      },
    };
  }
};

const textVariants = (index: number) => {
  const isVerticalAnimation = Math.floor(index / 2) % 2 === 0;
  const isImageLeft = index % 2 === 0;

  if (isVerticalAnimation) {
    return {
      hidden: { opacity: 0, y: isImageLeft ? 100 : -100 },
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
  } else {
    return {
      hidden: { opacity: 0, x: isImageLeft ? 100 : -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.8,
          ease: "easeOut",
          staggerChildren: 0.2,
        },
      },
    };
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// --- DATA & TYPES ---
interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  href?: string;
  color: "primary" | "secondary";
}

const features: FeatureItem[] = [
  {
    icon: <CalendarCheck size={28} />,
    title: "Event Participation & Management",
    description:
      "Plan, promote, and manage reunions, webinars, and alumni gatherings effortlessly. From registrations to attendance tracking, streamline every aspect of your alumni events under one smart dashboard.",
    image: "/images/events.png",
    href: "/events",
    color: "primary",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Mentorship & Guidance",
    description:
      "Bridge the gap between generations. Empower students and young professionals by connecting them with seasoned alumni mentors for career coaching, industry insights, and personal growth.",
    image: "/images/mentorship.png",
    href: "/mentorship",
    color: "secondary",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Job Board & Opportunities",
    description:
      "Tap into a powerful alumni-driven talent ecosystem. Share and explore exclusive jobs, internships, and career opportunities curated by trusted alumni from diverse industries worldwide.",
    image: "/images/jobs.png",
    href: "/jobs",
    color: "primary",
  },
  {
    icon: <Users size={28} />,
    title: "Alumni Referral System",
    description:
      "Boost placement success and career mobility through internal referrals. Enable alumni to open doors by referring juniors and peers to roles in top organizations where they already work.",
    image: "/images/referrals.png",
    href: "/referrals",
    color: "secondary",
  },
  {
    icon: <Mail size={28} />,
    title: "News & Achievements",
    description:
      "Highlight alumni impact and institutional pride. Share major career milestones, media features, awards, and contributions to society—all in a central storytelling hub.",
    image: "/images/news.png",
    href: "/news",
    color: "primary",
  },
  {
    icon: <Lock size={28} />,
    title: "Private & Secure Access",
    description:
      "Protect alumni data with enterprise-grade encryption and gated access. Ensure that only verified members of your institution can log in, engage, and share within the platform.",
    image: "/images/secure.png",
    href: "/secure",
    color: "secondary",
  },
  {
    icon: <ImgIcon size={28} />,
    title: "Batch-Wise Photo Gallery",
    description:
      "Digitally archive decades of legacy. Organize and showcase high-quality photos sorted by year, batch, and event—offering alumni an emotional walk down memory lane.",
    image: "/images/Photo.jpg",
    href: "/gallery",
    color: "primary",
  },
];

// --- SUB-COMPONENTS ---
const FeatureSectionLayout = ({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) => {
  const router = useRouter();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const isImageLeft = index % 2 === 0;

  const bgColor =
    index % 3 === 0
      ? "bg-white"
      : index % 3 === 1
      ? "bg-[var(--color-primary-light)]"
      : "bg-[var(--color-secondary-light)]";

  const iconColorClass =
    feature.color === "primary"
      ? "text-[var(--color-primary)]"
      : "text-[var(--color-secondary)]";
  const buttonBgClass =
    feature.color === "primary"
      ? "bg-[var(--color-primary)]"
      : "bg-[var(--color-secondary)]";
  const buttonHoverBgClass =
    feature.color === "primary"
      ? "hover:bg-[var(--color-primary-dark)]"
      : "hover:bg-[var(--color-secondary-dark)]";

  const iconWithColor = React.cloneElement(feature.icon as React.ReactElement, {
    className: iconColorClass,
  });

  return (
    <section className={`w-full py-10 md:py-16 overflow-hidden ${bgColor}`}>
      <motion.div
        ref={ref}
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20"
      >
        {/* Image Column */}
        <motion.div
          variants={imageVariants(index)}
          className={`relative group ${
            isImageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          <div className="relative aspect-[4/3] rounded-2xl shadow-2xl bg-white p-3">
            <Image
              src={feature.image || "/images/placeholder.jpg"}
              alt={feature.title}
              fill
              className="object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
            />
          </div>
        </motion.div>

        {/* Text Column */}
        <motion.div
          variants={textVariants(index)}
          className={`flex flex-col gap-4 ${
            isImageLeft
              ? "md:order-2 text-left items-start"
              : "md:order-1 text-right items-end"
          }`}
        >
          <motion.div
            variants={textItemVariants}
            className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow-lg"
          >
            {iconWithColor}
          </motion.div>
          <motion.h3
            variants={textItemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-black text-[var(--color-black)] leading-tight tracking-tight"
          >
            {feature.title}
          </motion.h3>
          <motion.p
            variants={textItemVariants}
            className="text-base md:text-lg text-[var(--color-black)]/80 font-montserrat leading-relaxed"
          >
            {feature.description}
          </motion.p>
          {feature.href && (
            <motion.div variants={textItemVariants}>
              <button
                onClick={() => router.push(feature.href!)}
                className={`mt-4 self-start text-white font-medium px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 ${buttonBgClass} ${buttonHoverBgClass}`}
              >
                Learn More
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- MAIN COMPONENT ---
export default function FeatureSection() {
  return (
    <>
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="w-full bg-white py-10"
      >
        <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col gap-6 text-center">
          <motion.h2
            variants={textItemVariants}
            className="text-sm md:text-base font-medium tracking-wider text-[var(--color-primary)] uppercase"
          >
            Our Features
          </motion.h2>
          <motion.h1
            variants={textItemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-black)] tracking-tight leading-tight"
          >
            A Powerful, Modern Alumni Platform
          </motion.h1>
          <motion.p
            variants={textItemVariants}
            className="text-base md:text-lg text-[var(--color-black)]/80 font-montserrat max-w-3xl mx-auto leading-relaxed"
          >
            Everything you need to connect, grow, and celebrate with your alumni
            community, all in one intuitive and beautifully designed space.
          </motion.p>
        </div>
      </motion.section>

      {features.map((feature, i) => (
        <FeatureSectionLayout key={feature.title} feature={feature} index={i} />
      ))}
    </>
  );
}
