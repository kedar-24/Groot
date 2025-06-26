// app/events/view/[id]/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { CldImage } from "next-cloudinary";
import {
  Calendar,
  MapPin,
  Mail,
  Loader,
  AlertTriangle,
  Info,
  Award,
  User,
  Search,
} from "lucide-react";

import PaginationControls from "@/components/PaginationControls";
import Button from "@/components/button";

// --- TYPES ---
type User = {
  _id: string;
  username: string;
  email: string;
  image?: string;
  degree?: string;
  jobRole?: string;
};

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: User[];
  time?: string;
};

const PARTICIPANTS_PER_PAGE = 8;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// --- UI COMPONENTS ---

const ParticipantCardSkeleton = () => (
  <div className="flex items-center bg-white p-4 rounded-xl border border-gray-200">
    <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gray-200 animate-pulse"></div>
    <div className="flex-shrink-0 mx-4">
      <div className="w-[52px] h-[52px] rounded-full bg-gray-200 animate-pulse"></div>
    </div>
    <div className="flex-grow space-y-2">
      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <div className="hidden md:block text-right ml-4 space-y-2">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

const LoadingState = () => (
  <motion.div
    key="loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {/* Header Skeleton */}
    <div className="mb-8 pb-6 border-b border-gray-200 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <div className="h-10 w-3/5 bg-gray-200 rounded-lg mb-3 sm:mb-0"></div>
        <div className="h-10 w-full sm:w-40 bg-gray-200 rounded-lg"></div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 mt-4">
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-full bg-gray-200 rounded mt-4"></div>
      <div className="h-4 w-5/6 bg-gray-200 rounded mt-2"></div>
    </div>

    {/* Sub-header Skeleton */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded-md mb-4 md:mb-0"></div>
      <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
    </div>

    {/* Participant List Skeleton */}
    <div className="space-y-4">
      {[...Array(PARTICIPANTS_PER_PAGE)].map((_, i) => (
        <ParticipantCardSkeleton key={i} />
      ))}
    </div>
  </motion.div>
);

const ErrorState = ({ message }: { message: string }) => (
  <motion.div
    key="error"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col items-center justify-center py-20 text-center text-red-700 bg-red-50 rounded-lg"
  >
    <AlertTriangle className="w-12 h-12 mb-4" />
    <p className="text-xl font-bold mb-2">Error Loading Event</p>
    <p className="text-md text-red-600">{message}</p>
    <Link href="/events" passHref>
      <Button variant="secondary" className="mt-6">
        ← Back to Events
      </Button>
    </Link>
  </motion.div>
);

const RankBadge = ({ rank }: { rank: number }) => {
  const rankStyles = {
    1: "bg-yellow-400 text-yellow-900 border-yellow-500",
    2: "bg-gray-300 text-gray-800 border-gray-400",
    3: "bg-orange-400 text-orange-900 border-orange-500",
  };
  const defaultStyle = "bg-gray-200 text-gray-600 border-transparent";
  const style = rankStyles[rank as keyof typeof rankStyles] || defaultStyle;

  return (
    <div
      className={`w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-bold shadow-sm border-2 ${style}`}
    >
      {rank <= 3 ? <Award size={18} /> : rank}
    </div>
  );
};

const ParticipantCard = ({ user, rank }: { user: User; rank: number }) => {
  const isTopThree = rank <= 3;
  const rankStyles = {
    1: "bg-yellow-50 border-yellow-400 hover:border-yellow-500",
    2: "bg-gray-100 border-gray-300 hover:border-gray-400",
    3: "bg-orange-50 border-orange-400 hover:border-orange-500",
  };
  const cardStyle = isTopThree
    ? rankStyles[rank as keyof typeof rankStyles]
    : "bg-white border-gray-200 hover:border-[var(--color-primary)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: (rank % PARTICIPANTS_PER_PAGE) * 0.05,
      }}
      className={`flex items-center p-4 rounded-xl border-2 hover:shadow-lg transition-all duration-300 ${cardStyle}`}
    >
      <RankBadge rank={rank} />
      <div className="flex-shrink-0 mx-4">
        <CldImage
          src={
            user.image ||
            `https://ui-avatars.com/api/?name=${user.username}&background=random`
          }
          width={52}
          height={52}
          alt={user.username}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-gray-800 text-md">{user.username}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <div className="hidden md:block text-right ml-4">
        {user.jobRole && (
          <p className="text-sm font-medium text-gray-700">{user.jobRole}</p>
        )}
        {user.degree && (
          <p className="text-xs text-gray-500 mt-0.5">{user.degree}</p>
        )}
      </div>
    </motion.div>
  );
};

const EventHeader = ({ event }: { event: Event }) => (
  <div className="mb-8 pb-6 border-b border-gray-200">
    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary-dark)] leading-tight mb-3 sm:mb-0">
        {event.title}
      </h1>
      <Link href="/events" passHref>
        <Button variant="outline" className="flex-shrink-0 w-full sm:w-auto">
          ← Back to Events
        </Button>
      </Link>
    </div>
    <div className="flex flex-col sm:flex-row sm:items-center text-gray-600 text-sm space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
      <p className="flex items-center gap-2">
        <Calendar size={16} className="text-[var(--color-primary)]" />{" "}
        {new Date(event.date).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {event.time && ` at ${event.time}`}
      </p>
      <p className="flex items-center gap-2">
        <MapPin size={16} className="text-[var(--color-primary)]" />{" "}
        {event.location}
      </p>
    </div>
    <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function ViewEventPage() {
  const { id } = useParams();
  const eventId = Array.isArray(id) ? id[0] : id;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, error } = useSWR(
    eventId ? `/api/events/${eventId}?includeParticipants=true` : null,
    fetcher
  );
  const event: Event | null = data?.event;
  const isLoading = !data && !error;

  const filteredParticipants = useMemo(() => {
    const participants = event?.participants || [];
    if (!searchQuery) return participants;
    return participants.filter(
      (p) =>
        p.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [event?.participants, searchQuery]);

  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * PARTICIPANTS_PER_PAGE,
    currentPage * PARTICIPANTS_PER_PAGE
  );
  const totalPages = Math.ceil(
    filteredParticipants.length / PARTICIPANTS_PER_PAGE
  );

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingState />
          ) : error || !event ? (
            <ErrorState
              message={
                error?.message ||
                "The event you are looking for does not exist."
              }
            />
          ) : (
            <motion.div
              key="event-details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <EventHeader event={event} />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div className="relative w-full md:max-w-xs">
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search participants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
                  />
                </div>
                <Link
                  href={`/events/mailer/test?eventId=${event._id}`}
                  passHref
                >
                  <Button
                    variant="primary"
                    leftIcon={<Mail size={16} />}
                    className="w-full md:w-auto flex-shrink-0"
                  >
                    Compose Email
                  </Button>
                </Link>
              </div>

              {filteredParticipants.length === 0 ? (
                <div className="text-center text-gray-500 py-16 bg-gray-50 rounded-lg border border-dashed">
                  <Info size={32} className="mx-auto mb-4 text-gray-400" />
                  {searchQuery
                    ? `No participants found for "${searchQuery}"`
                    : "No participants have registered for this event yet."}
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {paginatedParticipants.map((participant, index) => {
                      const originalIndex = (
                        event.participants || []
                      ).findIndex((p) => p._id === participant._id);
                      const rank = originalIndex + 1;
                      return (
                        <ParticipantCard
                          key={participant._id}
                          user={participant}
                          rank={rank}
                        />
                      );
                    })}
                  </div>
                  {totalPages > 1 && (
                    <div className="mt-8">
                      <PaginationControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
