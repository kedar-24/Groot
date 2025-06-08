import React, { useState } from "react";
import clsx from "clsx";

const reactionsList = [
  { iconClass: "fi-rr-heart", label: "Love", color: "text-rose-500" },
  { iconClass: "fi-rr-laugh", label: "Haha", color: "text-yellow-500" },
  { iconClass: "fi-rr-surprise", label: "Wow", color: "text-purple-500" },
  { iconClass: "fi-rr-sad", label: "Sad", color: "text-blue-500" },
  { iconClass: "fi-rr-angry", label: "Angry", color: "text-red-600" },
];

export default function ReactionBar() {
  const [reactions, setReactions] = useState<{ [label: string]: number }>({});
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [animateLabel, setAnimateLabel] = useState<string | null>(null);

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

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Main Reaction Button (Changes to user's selected reaction) */}
      <button
        className={clsx(
          "inline-flex items-center gap-1 text-sm cursor-pointer px-3 py-1 rounded-full transition duration-200 border",
          userReactionDetails
            ? `${userReactionDetails.color} bg-gray-50 border-transparent`
            : "text-gray-700 hover:bg-gray-50 border-gray-300"
        )}
        title={userReactionDetails?.label || "Like"}
        onClick={() => handleReact("Love")}
      >
        <i
          className={clsx(
            "fi text-xl",
            userReactionDetails?.iconClass || "fi-rr-heart"
          )}
        />
        <span
          className={clsx(
            "ml-1 min-w-[40px] text-left transition-transform duration-300",
            animateLabel === userReaction && "scale-125 font-semibold"
          )}
        >
          {userReaction || "Like"}
        </span>
      </button>

      {/* Reaction Bar */}
      {hovering && (
        <div className="absolute top-10 left-0 flex gap-4 bg-white border px-4 py-2 rounded-2xl shadow-md z-10 transition-opacity duration-300">
          {reactionsList.map(({ iconClass, label, color }) => (
            <button
              key={label}
              onClick={() => handleReact(label)}
              className="flex flex-col items-center w-10 hover:scale-125 transition-transform duration-200"
              title={label}
            >
              <i
                className={clsx(
                  `fi ${iconClass} text-xl`,
                  userReaction === label ? color : "text-gray-400"
                )}
              />
              <span
                className={clsx(
                  "text-xs text-gray-600 mt-1 transition-transform duration-300",
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
            .map(({ iconClass, label }) => (
              <div key={label} className="flex items-center gap-1 min-w-[48px]">
                <i className={`fi ${iconClass} text-sm`} />
                <span>{reactions[label]}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
