'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

import ParticipantList from '@/components/ParticipantList';
import PaginationControls from '@/components/PaginationControls';
import Button from '@/components/button';

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
  time?: string;
};

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        const res = await fetch('/api/events?includeParticipants=true');
        const data = await res.json();
        if (data.success) {
          setEvents(data.events);
        } else {
          console.error('API response not successful:', data);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const toggleEvent = (eventId: string) => {
    setExpandedEventId(prev => (prev === eventId ? null : eventId));
    setCurrentPage(1);
  };

  const currentEvent = expandedEventId ? events.find(event => event._id === expandedEventId) : null;

  const paginatedParticipants = currentEvent?.participants.slice(
    (currentPage - 1) * PARTICIPANTS_PER_PAGE,
    currentPage * PARTICIPANTS_PER_PAGE
  ) || [];

  const totalPages = currentEvent ? Math.ceil(currentEvent.participants.length / PARTICIPANTS_PER_PAGE) : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <svg className="animate-spin h-10 w-10 text-emerald-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-xl font-medium">Loading event dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-700 mb-4">
          📊 Event Management Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Oversee registrations and communicate with participants for your events.
        </p>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        {/* All Events View */}
        {!expandedEventId && events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Your Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <div
                  key={event._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-emerald-300"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      📅 {new Date(event.date).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}{event.time && ` at ${event.time}`}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">📍 {event.location}</p>
                    <p className="text-md text-gray-700 mb-4">
                      <span className="font-bold text-emerald-700">{event.participants.length}</span> Registered Participant{event.participants.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <Button
                    onClick={() => toggleEvent(event._id)}
                    variant="secondary"
                    className="w-full mt-4 py-2 text-emerald-700 border-emerald-500 hover:bg-emerald-50"
                  >
                    View Details →
                  </Button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* No Events */}
        {!expandedEventId && events.length === 0 && (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500 italic">
              No events found. Start by creating one from the "Create Event" page!
            </p>
          </div>
        )}

        {/* Expanded Event View */}
        {expandedEventId && currentEvent && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  <span className="text-emerald-600">Event:</span> "{currentEvent.title}"
                </h2>
                <Button
                  onClick={() => toggleEvent(currentEvent._id)}
                  variant="secondary"
                  className="text-red-600 hover:bg-red-50"
                >
                  ← Back to All Events
                </Button>
              </div>

              <div className="flex justify-end mb-4">
                <Link href={`/events/mailer/test?eventId=${currentEvent._id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    ✉️ Compose Email to Participants
                  </Button>
                </Link>
              </div>

              <div>
                {currentEvent.participants.length === 0 ? (
                  <p className="text-gray-500 italic py-8 text-center text-lg">
                    No participants registered for this event yet.
                  </p>
                ) : (
                  <>
                    <ParticipantList
                      participants={paginatedParticipants}
                      currentPage={currentPage}
                      participantsPerPage={PARTICIPANTS_PER_PAGE}
                    />
                    {totalPages > 1 && (
                      <PaginationControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
