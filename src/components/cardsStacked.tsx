"use client";

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

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const features = [
  {
    icon: <CalendarCheck size={28} />,
    title: "Event Participation & Management",
    description:
      "Easily organize, register, and attend reunions, seminars, and workshops.",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Mentorship & Guidance",
    description:
      "Connect juniors with experienced alumni mentors for career guidance.",
  },
  {
    icon: <Briefcase size={28} />,
    title: "Job Board & Opportunities",
    description:
      "Post and browse job or internship openings from alumni across industries.",
  },
  {
    icon: <Users size={28} />,
    title: "Alumni Referral System",
    description:
      "Help juniors and peers by referring them to your company or industry roles.",
    isWide: true,
  },
  {
    icon: <Mail size={28} />,
    title: "News & Achievements",
    description:
      "Celebrate alumni milestones, media features, and community highlights.",
  },
  {
    icon: <Lock size={28} />,
    title: "Private & Secure Access",
    description:
      "Verified, secure access restricted to the school alumni community.",
  },
  {
    icon: <ImgIcon size={28} />,
    title: "Batch-Wise Photo Gallery",
    description:
      "Explore curated images of past batches and events. Relive school memories.",
    image: "/images/Photo.jpg",
    isLarge: true,
    href: "/gallery",
  },
];

const FeatureImageCard = ({
  icon,
  title,
  description,
  image,
  isLarge = false,
  isWide = false,
  href,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  image?: string;
  isLarge?: boolean;
  isWide?: boolean;
  href?: string;
  index: number;
}) => {
  const router = useRouter();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`relative rounded overflow-hidden flex flex-col justify-end
        ${isLarge ? "min-h-[400px] md:col-span-2" : "min-h-[260px]"}
        ${isWide ? "md:col-span-2" : ""}
        group transition-transform duration-500 ease-out hover:scale-[1.03] shadow-lg hover:shadow-xl hover:shadow-[var(--color-secondary)]/40 ${
          href ? "cursor-pointer" : ""
        }`}
      onClick={() => {
        if (href) router.push(href);
      }}
      tabIndex={href ? 0 : undefined}
      role={href ? "button" : undefined}
      onKeyDown={(e) => {
        if (href && (e.key === "Enter" || e.key === " ")) {
          router.push(href);
        }
      }}
    >
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover opacity-70 group-hover:opacity-90 transition-all duration-300"
          style={{ zIndex: 1 }}
          priority
        />
      )}
      <div className="absolute inset-0 bg-[var(--color-secondary)] z-10" />
      <div className="relative z-20 p-6 flex flex-col gap-3">
        <div className="flex items-center justify-center w-12 h-12 mb-2 rounded-full bg-white/90 shadow-lg mx-auto">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-1 text-white text-center drop-shadow">
          {title}
        </h3>
        <p className="text-white/90 font-montserrat text-center">
          {description}
        </p>
      </div>
      {href && (
        <div className="absolute right-4 top-4 z-30 text-sm px-3 py-1 rounded-full bg-white/90 text-[var(--color-secondary)] font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          View Gallery
        </div>
      )}
      <div className="absolute left-0 bottom-0 w-full h-2 bg-[var(--color-secondary-light)] z-30" />
    </motion.div>
  );
};

export default function FeatureSection() {
  return (
    <section className="w-full bg-[var(--color-secondary-light)] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col gap-20">
        <div className="text-left sm:text-center mb-10">
          <div className="uppercase text-sm font-semibold tracking-wider text-[var(--color-black)]/70 font-montserrat">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-black)] leading-tight mb-4">
            Powerful,{" "}
            <span className={`text-[var(--color-secondary)]`}>Modern</span>{" "}
            Alumni Platform
          </h2>
          <p className="text-lg text-[var(--color-black)]/80 font-montserrat max-w-2xl mx-auto">
            Everything you need to connect, grow, and celebrate with your alumni
            community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureImageCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              image={feature.image}
              isLarge={feature.isLarge}
              isWide={feature.isWide}
              href={feature.href}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
