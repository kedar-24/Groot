"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, MapPin, X, Loader, Info } from "lucide-react";
import Button from "@/components/button";

// --- TYPES ---
interface Participant {
  _id: string;
  username: string;
  email: string;
  image?: string;
  jobRole?: string;
}

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  participants: Participant[];
}

const PARTICIPANTS_PER_PAGE = 5;

// --- MAIN COMPONENT ---
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
    setCurrentPage(1); // Reset page on toggle
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-[var(--color-primary)]">
        <Loader className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-semibold">Loading Event Data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-[var(--color-primary)] text-white text-center py-16 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary-light)]">
          Event Dashboard
        </h1>
        <p className="text-lg mt-2 text-[var(--color-primary-light)]/80 max-w-2xl mx-auto">
          Manage and view participant registrations for all your events.
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6 sm:p-8">
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {events.map((event) => {
              const totalPages = Math.ceil(
                event.participants.length / PARTICIPANTS_PER_PAGE
              );
              const paginatedParticipants = event.participants.slice(
                (currentPage - 1) * PARTICIPANTS_PER_PAGE,
                currentPage * PARTICIPANTS_PER_PAGE
              );
              const isExpanded = expandedEventId === event._id;

              return (
                <div
                  key={event._id}
                  className="bg-white rounded-xl shadow-md flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <AnimatePresence initial={false}>
                    {isExpanded ? (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 flex flex-col flex-grow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h2 className="text-xl font-bold text-[var(--color-primary-dark)] pr-4">
                            Participants for "{event.title}"
                          </h2>
                          <button
                            onClick={() => toggleEvent(event._id)}
                            className="p-1 rounded-full text-gray-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        {event.participants.length === 0 ? (
                          <div className="flex-grow flex items-center justify-center text-center bg-gray-50 rounded-lg p-8">
                            <p className="text-gray-500 italic">
                              No one has registered for this event yet.
                            </p>
                          </div>
                        ) : (
                          <>
                            <ul className="space-y-3 mb-4">
                              {paginatedParticipants.map((user) => (
                                <li
                                  key={user._id}
                                  className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200"
                                >
                                  <img
                                    src={
                                      user.image ||
                                      `https://ui-avatars.com/api/?name=${user.username}&background=random`
                                    }
                                    alt={user.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                  />
                                  <div>
                                    <p className="font-semibold text-gray-800">
                                      {user.username}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {user.email}
                                    </p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            {totalPages > 1 && (
                              <div className="flex justify-center items-center gap-2 mt-auto pt-4">
                                {Array.from({ length: totalPages }, (_, i) => (
                                  <Button
                                    key={i + 1}
                                    variant={
                                      currentPage === i + 1
                                        ? "solid"
                                        : "outline"
                                    }
                                    onClick={() => setCurrentPage(i + 1)}
                                    className="!px-3 !py-1 !text-sm"
                                  >
                                    {i + 1}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="summary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 flex flex-col flex-grow"
                      >
                        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">
                          {event.title}
                        </h2>
                        <div className="space-y-2 text-gray-600 mb-4">
                          <p className="flex items-center gap-2 text-sm">
                            <Calendar
                              size={16}
                              className="text-[var(--color-primary)]"
                            />
                            {new Date(event.date).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <MapPin
                              size={16}
                              className="text-[var(--color-primary)]"
                            />
                            {event.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 bg-gray-100 rounded-full px-3 py-1 w-fit mb-6">
                          <Users size={16} className="text-gray-500" />
                          <span className="font-semibold">
                            {event.participants.length}
                          </span>
                          <span>Registered</span>
                        </div>
                        <div className="mt-auto">
                          <Button
                            variant="outline"
                            onClick={() => toggleEvent(event._id)}
                            className="w-full"
                          >
                            View Participants
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto">
              <Info
                size={48}
                className="text-[var(--color-secondary)] mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                No Events Found
              </h2>
              <p className="text-gray-500 mt-2">
                There are currently no events with participant data to display.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
