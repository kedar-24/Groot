"use client";

import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  Image as ImageIcon,
  Video,
  Calendar,
  ThumbsUp,
  MessageCircle,
  Share2,
  Bookmark,
} from "lucide-react";
import useSWR from "swr";

// --- FETCHER ---
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// --- TYPES ---
type User = {
  name: string;
  title: string;
  avatar: string;
  profileViews: number;
  postImpressions: number;
};

type Post = {
  id: string | number;
  author: string;
  authorTitle: string;
  authorImage: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
};

type Event = {
  id: string | number;
  title: string;
  date: string;
};

// --- REUSABLE COMPONENTS ---
const Card = ({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) => (
  <div
    className={`bg-white rounded-xl shadow-sm border border-[var(--color-primary)]/10 overflow-hidden ${className}`}
  >
    {children}
  </div>
);

const ActionButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <button className="flex items-center justify-center gap-2 w-full py-2 rounded-md hover:bg-[var(--color-primary-light)]/40 transition-colors duration-200 text-black/70 font-medium text-sm">
    {icon}
    <span>{label}</span>
  </button>
);

const ProfileCard = ({ user }: { user: User }) => (
  <Card>
    <div className="relative h-16 bg-[var(--color-primary-light)]">
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <Image
          src={user.avatar}
          alt="Your Avatar"
          width={64}
          height={64}
          className="rounded-full border-2 border-white shadow-md"
        />
      </div>
    </div>
    <div className="pt-10 pb-4 text-center border-b border-[var(--color-primary)]/10">
      <h2 className="font-bold text-lg hover:underline cursor-pointer text-black/90">
        {user.name}
      </h2>
      <p className="text-sm text-black/60">{user.title}</p>
    </div>
    <div className="p-4 space-y-2 text-sm text-black/70">
      <div className="flex justify-between items-center hover:bg-[var(--color-primary-light)]/40 p-1 rounded-md cursor-pointer">
        <span>Profile Views</span>
        <span className="font-bold text-[var(--color-primary)]">
          {user.profileViews}
        </span>
      </div>
      <div className="flex justify-between items-center hover:bg-[var(--color-primary-light)]/40 p-1 rounded-md cursor-pointer">
        <span>Post Impressions</span>
        <span className="font-bold text-[var(--color-primary)]">
          {user.postImpressions}
        </span>
      </div>
    </div>
    <div className="border-t border-[var(--color-primary)]/10 p-4">
      <div className="flex items-center gap-2 text-sm text-black/80 font-medium">
        <Bookmark size={16} />
        <span>My Items</span>
      </div>
    </div>
  </Card>
);

const EventsCard = ({ events }: { events: Event[] }) => (
  <Card>
    <div className="p-4">
      <h3 className="font-bold text-black/90">Upcoming Events</h3>
      <p className="text-sm text-black/60">
        Stay connected with your community.
      </p>
    </div>
    <ul className="px-4 pb-2">
      {events.map((event) => (
        <li key={event.id} className="mb-3">
          <a
            href="#"
            className="font-semibold text-sm text-black/80 hover:text-[var(--color-primary)] hover:underline"
          >
            {event.title}
          </a>
          <p className="text-xs text-black/50">{event.date}</p>
        </li>
      ))}
    </ul>
    <div className="border-t border-[var(--color-primary)]/10">
      <a
        href="#"
        className="block w-full text-center py-3 font-bold text-sm text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/40"
      >
        View all
      </a>
    </div>
  </Card>
);

export default function HomePage() {
  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR<User>("/api/user", fetcher);
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useSWR<Post[]>("/api/posts", fetcher);
  const {
    data: events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useSWR<Event[]>("/api/events", fetcher);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, var(--color-primary-light) 25%, var(--color-secondary-light) 75%)`,
      }}
    >
      <Navbar variant="glass" />
      <main className="max-w-7xl mx-auto pt-32 px-4">
        <div className="bg-white/80 backdrop-blur-sm mb-12 rounded-xl w-full shadow-2xl border border-white/50 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            {userLoading ? (
              <Card>Loading...</Card>
            ) : userError ? (
              <Card>Error loading profile</Card>
            ) : user ? (
              <ProfileCard user={user} />
            ) : null}
          </aside>
          {/* Main Feed */}
          <section className="col-span-1 lg:col-span-2">
            <Card className="p-4 mb-6">
              <div className="flex items-center gap-3">
                {user && (
                  <Image
                    src={user.avatar}
                    alt="Your Avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <button className="w-full text-left border border-[var(--color-primary)]/20 rounded-full px-4 py-2.5 text-black/60 font-medium hover:bg-[var(--color-primary-light)]/40 transition">
                  Start a post
                </button>
              </div>
              <div className="flex justify-around mt-3">
                <ActionButton
                  icon={
                    <ImageIcon
                      size={20}
                      className="text-[var(--color-primary)]"
                    />
                  }
                  label="Photo"
                />
                <ActionButton
                  icon={
                    <Video size={20} className="text-[var(--color-primary)]" />
                  }
                  label="Video"
                />
                <ActionButton
                  icon={
                    <Calendar
                      size={20}
                      className="text-[var(--color-primary)]"
                    />
                  }
                  label="Event"
                />
              </div>
            </Card>
            <div className="space-y-6">
              {postsLoading ? (
                <Card>Loading posts...</Card>
              ) : postsError ? (
                <Card>Error loading posts</Card>
              ) : posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Card key={post.id}>
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Image
                          src={post.authorImage}
                          alt={post.author}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                        <div>
                          <a
                            href="#"
                            className="font-bold text-black/90 hover:underline"
                          >
                            {post.author}
                          </a>
                          <p className="text-xs text-black/60">
                            {post.authorTitle}
                          </p>
                          <p className="text-xs text-black/50">{post.time}</p>
                        </div>
                      </div>
                      <p className="text-black/90 text-sm mb-4">
                        {post.content}
                      </p>
                      <div className="flex justify-between items-center text-xs text-black/60">
                        <span>{post.likes} Likes</span>
                        <span>{post.comments} Comments</span>
                      </div>
                    </div>
                    <div className="border-t border-[var(--color-primary)]/10 flex justify-around">
                      <ActionButton
                        icon={<ThumbsUp size={20} className="text-black/60" />}
                        label="Like"
                      />
                      <ActionButton
                        icon={
                          <MessageCircle size={20} className="text-black/60" />
                        }
                        label="Comment"
                      />
                      <ActionButton
                        icon={<Share2 size={20} className="text-black/60" />}
                        label="Share"
                      />
                    </div>
                  </Card>
                ))
              ) : (
                <Card>No posts found.</Card>
              )}
            </div>
          </section>
          {/* Events Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            {eventsLoading ? (
              <Card>Loading events...</Card>
            ) : eventsError ? (
              <Card>Error loading events</Card>
            ) : events ? (
              <EventsCard events={events} />
            ) : null}
          </aside>
        </div>
      </main>
    </div>
  );
}
