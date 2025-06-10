import React from "react";
import Image from "next/image";
import Button from "./button";

type BaseCardProps = {
  children?: React.ReactNode;
  className?: string;
  bgImage?: string;
  overlayClass?: string;
};

type AuthSideCardProps = {
  variant: "auth";
  title: string;
  description: string;
  bgImage: string;
  overlayClass?: string;
  className?: string;
};

type ValueCardProps = {
  variant: "value";
  title: string;
  children: React.ReactNode;
  className?: string;
};

type GroupCardProps = {
  variant: "group";
  title: string;
  description: string;
  onJoin?: () => void;
  joined?: boolean;
  className?: string;
};

type NewsCardProps = {
  variant: "news";
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string;
  url: string;
  className?: string;
};

type CardProps =
  | (BaseCardProps & { variant?: undefined })
  | AuthSideCardProps
  | ValueCardProps
  | GroupCardProps
  | NewsCardProps;

export default function Card(props: CardProps) {
  // AUTH SIDE CARD
  if (props.variant === "auth") {
    const {
      title,
      description,
      bgImage,
      overlayClass = "bg-black/40",
      className = "",
    } = props;
    return (
      <div
        className={`relative rounded-2xl overflow-hidden shadow-md bg-white/80 flex flex-col justify-end ${className}`}
        style={{ minHeight: "200px" }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt={title}
            fill
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <div className={`absolute inset-0 z-10 ${overlayClass}`} />
        </div>
        <div className="relative z-20 p-6 flex flex-col items-start">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white text-base drop-shadow">{description}</p>
        </div>
      </div>
    );
  }

  // VALUE CARD
  if (props.variant === "value") {
    const { title, children, className = "" } = props;
    return (
      <div
        className={`p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${className}`}
      >
        <h3 className="text-2xl font-semibold text-green-700 mb-2">{title}</h3>
        <div className="text-gray-600">{children}</div>
      </div>
    );
  }

  // GROUP CARD
  if (props.variant === "group") {
    const { title, description, onJoin, joined, className = "" } = props;
    return (
      <div
        className={`border border-gray-200 rounded-2xl bg-white shadow-sm p-6 mb-5 transition hover:shadow-md ${className}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h3
            className="text-xl font-bold text-green-900 font-sans truncate"
            title={title}
          >
            {title}
          </h3>
          <Button
            variant={joined ? "secondary" : "primary"}
            className={`px-5 py-1.5 text-sm rounded-lg min-w-[90px] ${
              joined
                ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                : "bg-green-800 text-white hover:bg-green-900"
            }`}
            onClick={onJoin}
            disabled={joined}
          >
            {joined ? "Joined" : "Join"}
          </Button>
        </div>
        <p className="text-gray-700 text-base font-sans leading-relaxed">
          {description}
        </p>
      </div>
    );
  }

  // NEWS CARD
  if (props.variant === "news") {
    const {
      title,
      date,
      category,
      imageUrl,
      content,
      url,
      className = "",
    } = props;
    return (
      <div
        className={`bg-white shadow rounded-2xl overflow-hidden hover:shadow-gray-400 hover:scale-105 transition-all flex flex-col h-full ${className}`}
      >
        <Image
          src={imageUrl?.startsWith("http") ? imageUrl : "/placeholder.jpg"}
          alt={title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          placeholder="empty"
        />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500">
              {category} | {new Date(date).toLocaleDateString()}
            </p>
            <h3 className="text-lg font-semibold mt-1 mb-2">{title}</h3>
            <p className="text-sm text-gray-700 line-clamp-3">{content}</p>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 mt-4 font-medium hover:underline inline-block"
          >
            Read More →
          </a>
        </div>
      </div>
    );
  }

  // BASE CARD (for generic use)
  const {
    children,
    className = "",
    bgImage,
    overlayClass = "bg-black/40",
  } = props as BaseCardProps;
  return (
    <div
      className={`w-full relative rounded-2xl overflow-hidden shadow-md bg-white/80 ${className}`}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt=""
            fill
            className="object-cover w-full h-full"
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <div className={`absolute inset-0 z-10 ${overlayClass}`} />
        </div>
      )}
      <div className="relative z-20 p-6 flex flex-col items-start">
        {children}
      </div>
    </div>
  );
}
