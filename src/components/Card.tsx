import React from "react";
import Image from "next/image";
import clsx from "clsx";

type AlumniCardProps = {
  variant: "alumni";
  name: string;
  batch: string;
  imageUrl: string;
  description: string;
  profileUrl?: string;
  className?: string;
  children?: React.ReactNode;
};

type EventCardProps = {
  variant: "event";
  title: string;
  date: string;
  imageUrl: string;
  description: string;
  registerUrl?: string;
  className?: string;
  children?: React.ReactNode;
};

type NewsCardProps = {
  variant: "news";
  title: string;
  date: string;
  imageUrl: string;
  content: string;
  url: string;
  className?: string;
  children?: React.ReactNode;
};

type AuthCardProps = {
  variant: "auth";
  title: string;
  description: string;
  imageUrl?: string;
  overlayClass?: string;
  className?: string;
  children?: React.ReactNode;
};

type CardProps =
  | AlumniCardProps
  | EventCardProps
  | NewsCardProps
  | AuthCardProps;

export default function Card(props: CardProps) {
  const baseCardClass = "bg-white/90 shadow-lg rounded-2xl overflow-hidden";

  // === AUTH CARD ===
  if (props.variant === "auth") {
    const {
      title,
      description,
      imageUrl,
      overlayClass = "",
      className,
      children,
    } = props;

    return (
      <div
        className={clsx(
          "relative flex flex-col items-center justify-center p-6",
          baseCardClass,
          className
        )}
      >
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover w-full h-full opacity-40"
              style={{ zIndex: 0 }}
            />
            {overlayClass && (
              <div className={clsx("absolute inset-0 z-10", overlayClass)} />
            )}
          </div>
        )}
        <div className="relative z-20 flex flex-col items-center w-full">
          <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)] text-center">
            {title}
          </h3>
          <p className="text-base text-black/80 mb-4 text-center">
            {description}
          </p>
          {children}
        </div>
      </div>
    );
  }

  // === ALUMNI CARD ===
  if (props.variant === "alumni") {
    const {
      name,
      batch,
      imageUrl,
      description,
      profileUrl,
      className,
      children,
    } = props;

    return (
      <div
        className={clsx(
          "flex flex-col items-center p-6",
          baseCardClass,
          className
        )}
      >
        <Image
          src={imageUrl || "/images/alumni-placeholder.jpg"}
          alt={name}
          width={120}
          height={120}
          className="rounded-full object-cover border-4 border-[var(--color-primary-light)] mb-4"
        />
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <div className="text-sm text-black/60 mb-2">Batch of {batch}</div>
        <p className="text-base text-black/80 mb-4 text-center">
          {description}
        </p>
        {profileUrl && (
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            View Profile →
          </a>
        )}
        {children}
      </div>
    );
  }

  // === EVENT CARD ===
  if (props.variant === "event") {
    const {
      title,
      date,
      imageUrl,
      description,
      registerUrl,
      className,
      children,
    } = props;

    return (
      <div className={clsx("flex flex-col h-full", baseCardClass, className)}>
        <Image
          src={imageUrl || "/images/event-placeholder.jpg"}
          alt={title}
          width={600}
          height={300}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-black/50 mb-1">
              {new Date(date).toLocaleDateString()}
            </p>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-black/80 mb-3">{description}</p>
          </div>
          {registerUrl && (
            <a
              href={registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              Register →
            </a>
          )}
          {children}
        </div>
      </div>
    );
  }

  // === NEWS CARD ===
  if (props.variant === "news") {
    const { title, date, imageUrl, content, url, className, children } = props;

    return (
      <div className={clsx("flex flex-col h-full", baseCardClass, className)}>
        <Image
          src={imageUrl || "/images/news-placeholder.jpg"}
          alt={title}
          width={600}
          height={300}
          className="w-full h-40 object-cover"
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-black/50 mb-1">
              {new Date(date).toLocaleDateString()}
            </p>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-black/80 line-clamp-3">{content}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-primary)] font-semibold hover:underline mt-2"
          >
            Read More →
          </a>
          {children}
        </div>
      </div>
    );
  }

  // === FALLBACK ===
  return null;
}
