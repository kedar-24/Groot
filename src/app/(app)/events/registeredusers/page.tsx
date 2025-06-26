"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTICIPANTS_PER_PAGE = 6;

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
  date: string;
  location: string;
  participants: User[];
};

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/events?includeParticipants=true");
        const data = await res.json();
        if (data.success) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const toggleEvent = (eventId: string) => {
    setExpandedEventId((prev) => (prev === eventId ? null : eventId));
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 text-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8">
        🎉 Event Registrations
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        {events.map((event) => {
          const totalPages = Math.ceil(
            event.participants.length / PARTICIPANTS_PER_PAGE
          );
          const paginatedParticipants = event.participants.slice(
            (currentPage - 1) * PARTICIPANTS_PER_PAGE,
            currentPage * PARTICIPANTS_PER_PAGE
          );

          return (
            <div
              key={event._id}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-md flex flex-col"
            >
              {expandedEventId === event._id ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-green-700">
                        👥 Participants for "{event.title}"
                      </h2>
                      <button
                        onClick={() => toggleEvent(event._id)}
                        className="text-sm text-red-600 font-medium hover:underline"
                      >
                        ✖ Close
                      </button>
                    </div>

                    {event.participants.length === 0 ? (
                      <p className="text-gray-400 italic">
                        No one registered yet.
                      </p>
                    ) : (
                      <>
                        <ul className="grid grid-cols-1 gap-4 mb-4">
                          {paginatedParticipants.map((user) => (
                            <li
                              key={user._id}
                              className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100"
                            >
                              <img
                                src={
                                  user.image?.startsWith("http")
                                    ? user.image
                                    : `/uploads/${user.image}`
                                }
                                alt={user.username}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover border border-green-300"
                              />
                              <div>
                                <div className="font-semibold text-gray-800">
                                  {user.username}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {user.email}
                                </div>
                                {user.jobRole && (
                                  <div className="text-sm text-gray-400">
                                    • {user.jobRole}
                                  </div>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                        {totalPages > 1 && (
                          <div className="flex justify-center gap-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                              <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-full border text-sm ${
                                  currentPage === i + 1
                                    ? "bg-green-700 text-white"
                                    : "bg-white text-green-700 border-green-300 hover:bg-green-100"
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                      {event.title}
                    </h2>
                    <span className="text-sm text-gray-500 italic">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {event.location}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    🧑‍🤝‍🧑{" "}
                    <span className="font-semibold text-green-700">
                      {event.participants.length}
                    </span>{" "}
                    participant{event.participants.length !== 1 ? "s" : ""}
                  </p>
                  <button
                    onClick={() => toggleEvent(event._id)}
                    className="text-sm text-green-700 font-semibold hover:underline"
                  >
                    View Participants →
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
