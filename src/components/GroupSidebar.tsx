import React from "react";
import Button from "./button";

export default function GroupSidebar({
  suggestedGroups,
  onJoin,
}: {
  suggestedGroups: { title: string; members: number }[];
  onJoin?: (title: string) => void;
}) {
  return (
    <aside className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow">
      <h4 className="font-bold text-green-900 mb-4 font-sans">
        Suggested Groups
      </h4>
      <ul className="space-y-4">
        {suggestedGroups.map((group) => (
          <li key={group.title} className="flex justify-between items-center">
            <div>
              <div className="font-semibold text-base">{group.title}</div>
              <div className="text-xs text-gray-500">
                {group.members} member{group.members !== 1 ? "s" : ""}
              </div>
            </div>
            <Button
              variant="primary"
              className="px-4 py-1 text-xs rounded-lg"
              onClick={() => onJoin && onJoin(group.title)}
            >
              Join
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
