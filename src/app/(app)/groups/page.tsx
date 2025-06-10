"use client";
import Card from "@/components/Card";
import GroupPost from "@/components/GroupPost";
import GroupSidebar from "@/components/GroupSidebar";
import { useState } from "react";

const DUMMY_GROUPS = [
  {
    title: "Class of 2018",
    description:
      "Connect with your former classmates, get updates, and share stories.",
    members: 8,
  },
  {
    title: "Alumni Network",
    description: "Stay in touch with alumni and join meaningful conversations.",
    members: 15,
  },
];

const DUMMY_POSTS = [
  {
    author: "Akash Naidu Green",
    date: "September 8, 2024",
    content:
      "Welcome to the Class of 2018 group on G-Root Connect! Connect with your former classmates, get updates, and share stories in a professional and engaging environment.",
    isSuggested: true,
  },
  {
    author: "Akash Naidu Green",
    date: "September 8, 2024",
    content:
      "Our School values community and networking, providing a platform for meaningful discussions and lasting connections. Join us to stay informed and relive cherished memories with your peers.",
    isSuggested: false,
  },
];

export default function GroupsPage() {
  const [joinedGroups, setJoinedGroups] = useState<string[]>([]);

  const handleJoinGroup = (title: string) => {
    setJoinedGroups((prev) => [...prev, title]);
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full font-sans">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-10 px-4 mb-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <span className="bg-[#5a3e76ee] rounded-full w-14 h-14 flex items-center justify-center mb-4">
            <span className="flex items-center justify-center w-10 h-10">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" fill="#f5efe0" />
                <path
                  d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                  stroke="#f5efe0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Class Groups</h1>
          <p className="text-lg md:text-xl text-green-100 mb-2">
            Join groups, connect, and share with your community.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 px-2 sm:px-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-2 font-sans">
              Your Groups
            </h2>
            <p className="text-gray-700 mb-4">View groups and posts below.</p>
            <div className="space-y-4">
              {DUMMY_GROUPS.map((group) => (
                <Card
                  key={group.title}
                  variant="group"
                  title={group.title}
                  description={group.description}
                  joined={joinedGroups.includes(group.title)}
                  onJoin={() => handleJoinGroup(group.title)}
                />
              ))}
            </div>
          </div>
          {/* Posts */}
          <div>
            <h2 className="text-xl font-semibold text-green-900 mb-3 font-sans">
              Recent Posts
            </h2>
            <div className="space-y-4">
              {DUMMY_POSTS.map((post, idx) => (
                <GroupPost key={idx} {...post} />
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search groups"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700 bg-white"
            />
          </div>
          <GroupSidebar
            suggestedGroups={DUMMY_GROUPS}
            onJoin={handleJoinGroup}
          />
        </aside>
      </div>
    </div>
  );
}
