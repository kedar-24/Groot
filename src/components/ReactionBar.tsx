import React, { useState, useRef } from "react";
import clsx from "clsx";
import {
  FaRegHeart,
  FaRegFaceLaughSquint,
  FaRegFaceSurprise,
  FaRegFaceAngry,
} from "react-icons/fa6";
import { FaRegSadCry } from "react-icons/fa";

const reactionsList = [
  { icon: FaRegHeart, label: "Love", color: "text-rose-500" },
  { icon: FaRegFaceLaughSquint, label: "Haha", color: "text-yellow-500" },
  { icon: FaRegFaceSurprise, label: "Wow", color: "text-purple-500" },
  { icon: FaRegSadCry, label: "Sad", color: "text-blue-500" },
  { icon: FaRegFaceAngry, label: "Angry", color: "text-red-600" },
];

export default function ReactionBar() {
  const [reactions, setReactions] = useState<{ [label: string]: number }>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [animateLabel, setAnimateLabel] = useState<string | null>(null);
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const handleReact = (label: string) => {
    setReactions((prev) => {
      const updated = { ...prev };
      if (userReaction) {
        updated[userReaction] = Math.max((updated[userReaction] || 1) - 1, 0);
      }
      updated[label] = (updated[label] || 0) + 1;
      return updated;
    });
    setUserReaction(label);
    setAnimateLabel(label);
    setTimeout(() => setAnimateLabel(null), 400);
  };

  const userReactionDetails = reactionsList.find(
    (r) => r.label === userReaction
  );

  // --- Hover logic with delay ---
  const handleMouseEnter = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setHovering(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setHovering(false), 250);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Reaction Button */}
      <button
        className={clsx(
          "inline-flex items-center gap-3 text-base cursor-pointer px-6 py-3 rounded-full transition duration-200 border shadow-sm",
          userReactionDetails
            ? `${userReactionDetails.color} bg-gray-50 border-transparent`
            : "text-gray-700 hover:bg-gray-50 border-gray-300"
        )}
        style={{ minWidth: 120 }}
        title={userReactionDetails?.label || "Like"}
        onClick={() => handleReact("Love")}
      >
        {userReactionDetails ? (
          <userReactionDetails.icon className="text-2xl" />
        ) : (
          <FaRegHeart className="text-2xl" />
        )}
        <span
          className={clsx(
            "ml-2 min-w-[48px] text-left transition-transform duration-300",
            animateLabel === userReaction && "scale-125 font-semibold"
          )}
        >
          {userReaction || "Like"}
        </span>
      </button>

      {/* Reaction Bar */}
      {hovering && (
        <div
          className="absolute top-14 left-1/2 -translate-x-1/2 flex gap-6 bg-white border px-8 py-4 rounded-3xl shadow-2xl z-10 transition-opacity duration-300"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {reactionsList.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              onClick={() => handleReact(label)}
              className="flex flex-col items-center w-14 h-14 justify-center hover:scale-125 transition-transform duration-200"
              title={label}
              style={{ fontSize: "1.25rem" }}
            >
              <Icon
                className={clsx(
                  "text-3xl",
                  userReaction === label ? color : "text-gray-400"
                )}
              />
              <span
                className={clsx(
                  "text-xs text-gray-600 mt-2 transition-transform duration-300",
                  animateLabel === label && "scale-125 font-semibold"
                )}
              >
                {reactions[label] || 0}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Display Total Reactions (Compact Bar) */}
      {Object.keys(reactions).length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2 ml-1 text-xs text-gray-600">
          {reactionsList
            .filter(({ label }) => reactions[label])
            .map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1 min-w-[48px]">
                <Icon className="text-base" />
                <span>{reactions[label]}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
