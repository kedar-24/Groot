// app/events/view/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import PaginationControls from '@/components/PaginationControls';
import Button from '@/components/button';

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

const PARTICIPANTS_PER_PAGE = 6;

// --- Helper component for rank styling ---
const RankBadge = ({ rank }: { rank: number }) => {
  // Using primary-light for background, primary-dark for text
  const bgColor = 'bg-[var(--color-primary-light)]';
  const textColor = 'text-[var(--color-primary-dark)]';

  return (
    <div
      className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-sm font-bold ${bgColor} ${textColor} shadow-sm`}
    >
      {rank}
    </div>
  );
};

export default function ViewEventPage() {
  const { id } = useParams();
  const eventId = Array.isArray(id) ? id[0] : id;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      setLoading(true);
      setError(null);
      try {
        if (!eventId) {
          setLoading(false);
          return;
        }
        const res = await fetch(`/api/events/${eventId}?includeParticipants=true`);
        const data = await res.json();

        if (res.ok && data.event) {
          const fetchedEvent = {
            ...data.event,
            participants: data.event.participants || []
          };
          setEvent(fetchedEvent);
        } else {
          console.error('Event fetch failed:', data);
          setError(data.error || 'Failed to fetch event details.');
          setEvent(null);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Network error. Could not connect to the server.');
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) fetchEvent();
  }, [eventId]);

  const paginatedParticipants = (event?.participants || []).slice(
    (currentPage - 1) * PARTICIPANTS_PER_PAGE,
    currentPage * PARTICIPANTS_PER_PAGE
  );

  const totalPages = event ? Math.ceil((event.participants?.length || 0) / PARTICIPANTS_PER_PAGE) : 0;

  return (
    <div className="min-h-screen bg-[var(--color-secondary-light)] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-[var(--color-primary-light)] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 text-gray-700">
              <svg className="animate-spin h-10 w-10 text-[var(--color-primary)] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xl font-medium">Loading event details...</p>
            </motion.div>
          ) : error ? (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="w-12 h-12 mb-4 text-[var(--color-secondary-dark)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="text-xl font-medium text-[var(--color-secondary-dark)] mb-2">Error Loading Event</p>
              <p className="text-md text-gray-600">{error}</p>
              <Link href="/events/dashboard" passHref>
                <Button variant="secondary" className="mt-6 text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors duration-200 shadow-md hover:shadow-lg">← Back to Dashboard</Button>
              </Link>
            </motion.div>
          ) : !event ? (
            <motion.div key="not-found" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12 text-center">
              <svg className="w-12 h-12 mb-4 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p className="text-xl font-medium text-gray-800 mb-2">Event Not Found</p>
              <p className="text-md text-gray-600">The event you are looking for does not exist or has been removed.</p>
              <Link href="/events/dashboard" passHref>
                <Button variant="secondary" className="mt-6 text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-colors duration-200 shadow-md hover:shadow-lg">← Back to Dashboard</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div key="event-details" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-8 pb-4 border-b border-gray-100">
                <div className='mb-4 sm:mb-0'>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--color-primary-dark)] mb-2 leading-tight">{event.title}</h1>
                  <div className='flex flex-col sm:flex-row sm:items-center text-[var(--color-secondary-dark)] text-sm space-y-1 sm:space-y-0 sm:space-x-4 mt-2'>
                    <p className="flex items-center">📅 <span className="ml-1">{new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}{event.time && ` at ${event.time}`}</span></p>
                    <p className='hidden sm:block'>|</p>
                    <p className="flex items-center">📍 <span className="ml-1">{event.location}</span></p>
                  </div>
                </div>
                <Link href="/events/dashboard" passHref>
                  <Button variant="secondary" className="text-sm text-[var(--color-secondary-dark)] bg-[var(--color-secondary-light)] hover:bg-[var(--color-secondary)] flex-shrink-0 transition-colors duration-200 py-2 px-4 rounded-md shadow-sm hover:shadow-md">
                    ← Back to Events
                  </Button>
                </Link>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <p className="text-xl font-semibold text-gray-800 mb-3 sm:mb-0">
                    <span className="text-[var(--color-primary)]">{event.participants.length}</span> Registered Participant{event.participants.length !== 1 ? 's' : ''}
                  </p>
                  <Link href={`/events/mailer/test?eventId=${event._id}`} passHref>
                    <Button variant="primary" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] flex items-center justify-center w-full sm:w-auto transition-colors duration-200 py-2.5 px-6 rounded-md shadow-md hover:shadow-lg">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      Compose Email
                    </Button>
                  </Link>
                </div>

                {paginatedParticipants.length === 0 ? (
                  <div className="text-center text-gray-500 italic py-10 bg-[var(--color-secondary-light)] rounded-lg border border-[var(--color-secondary)] shadow-inner">
                    No participants have registered for this event yet.
                  </div>
                ) : (
                  <>
                    <div className="space-y-4"> {/* Increased space-y for more separation */}
                      {paginatedParticipants.map((participant, index) => {
                        const rank = (currentPage - 1) * PARTICIPANTS_PER_PAGE + index + 1;
                        const imageUrl = participant.image || `https://placehold.co/48x48/aabbcc/ffffff?text=${participant.username.charAt(0).toUpperCase()}`;

                        return (
                          <motion.div
                            key={participant._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            // Default background: white, Default border: secondary-light
                            // Hover background: white, Hover border: primary-light
                            className="flex items-center bg-white p-4 rounded-lg border border-[var(--color-secondary-light)] hover:border-[var(--color-primary-light)] hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer"
                          >
                            <RankBadge rank={rank} />

                            <div className="flex-shrink-0 mx-4">
                                <img
                                    src={imageUrl}
                                    width="52" // Slightly larger image
                                    height="52"
                                    alt={participant.username}
                                    className="rounded-full object-cover border-2 border-gray-200" // Added a subtle border
                                    onError={(e) => {
                                        e.currentTarget.src = `https://placehold.co/52x52/cccccc/555555?text=NA`;
                                    }}
                                />
                            </div>

                            <div className="flex-grow">
                              <p className="font-semibold text-[var(--color-primary-dark)] hover:text-black text-lg">{participant.username}</p> {/* Slightly larger and bolder name */}
                              <p className="text-sm text-[var(--color-secondary-dark)] hover:text-black mt-0.5">{participant.email}</p>
                            </div>

                            <div className="hidden md:block text-right ml-4">
                                {participant.jobRole && <p className="text-sm font-medium text-[var(--color-primary-dark)] hover:text-black">{participant.jobRole}</p>}
                                {participant.degree && <p className="text-xs text-[var(--color-secondary-dark)] hover:text-black mt-0.5">{participant.degree}</p>}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {totalPages > 1 && (
                      <div className="mt-8"> {/* Increased margin-top */}
                        <PaginationControls
                          totalPages={totalPages}
                          currentPage={currentPage}
                          onPageChange={setCurrentPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}