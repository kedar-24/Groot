'use client';

import { useEffect, useState, useRef } from 'react';
import Button from '@/components/button';
import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Define the Event interface
interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  image?: string;
  tags?: string[];
  isPublic?: boolean;
  attachments?: string[];
  participants?: string[];
}

// --- SVG Icons for better organization ---
const CalendarIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 mr-2 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
);

const LocationIcon = ({ className = '' }) => (
  <svg className={`w-4 h-4 mr-2 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
);

const AttachmentIcon = ({ className = '' }) => (
    <svg className={`w-4 h-4 mr-1.5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.485L20.5 13.5"></path></svg>
);


// Separate EventCard component for better encapsulation and state management
const EventCard: React.FC<{ event: Event; index: number; handleRegister: (title: string, eventId: string) => void }> = ({ event, index, handleRegister }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  const descriptionTextRef = useRef<HTMLParagraphElement>(null); // Refers to the <p> tag inside the description container

  useEffect(() => {
    // This effect runs after render, ensuring ref.current is available.
    // We check if the text *would* overflow the initial collapsed state (max-h-16).
    if (descriptionTextRef.current) {
        // Tailwind's max-h-16 is typically 4rem = 64px.
        // We'll compare the full content height (scrollHeight) to this expected visible height.
        const initialVisibleHeight = 64; 

        if (descriptionTextRef.current.scrollHeight > initialVisibleHeight) {
            setShowReadMoreButton(true);
        } else {
            setShowReadMoreButton(false);
        }
    }
  }, [event.description]); // Re-run if description content changes

  // Reset expanded state if description content changes (e.g., if a new event is loaded into the card)
  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [event.description]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }} 
      // Main card container with white background and all rounded corners
      className="bg-white rounded-xl shadow-lg transition-all duration-300 flex flex-col border-4 border-white hover:border-white overflow-hidden"
    >
      {/* Outer container for image with fixed height and overflow hidden */}
      {/* Retains h-48 for a squarer look */}
      <div className="w-full h-48 relative overflow-hidden">
        {event.image ? (
          <motion.div
            className="absolute inset-0 w-full h-full"
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            <CldImage
              src={event.image}
              width={600} 
              height={192} // Corresponding to h-48 (192px)
              crop="fill"
              alt={`Banner for ${event.title}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            // Changed background to bg-white
            className="absolute inset-0 w-full h-full bg-white flex items-center justify-center text-[var(--color-primary-dark)] text-sm font-semibold"
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            No Image Available
          </motion.div>
        )}
      </div>

      {/* Card Content: Adjusted height to maintain squarer overall appearance */}
      {/* Keeping content height at h-[240px] to balance with the h-48 image */}
      <div className="flex flex-col p-4 h-[240px]">
        {/* This div will take up available space and handle its own overflow if content is too much */}
        <div className="flex-grow overflow-y-auto">
          <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2 leading-tight">
            {event.title}
          </h2>

          {/* Date & Location */}
          <div className="space-y-1 text-sm text-gray-900 mb-3">
            <p className="flex items-center">
              <CalendarIcon className="text-gray-700" />
              {new Intl.DateTimeFormat('en-IN', {
                  year: 'numeric', month: 'long', day: 'numeric',
              }).format(new Date(event.date))}
              {event.time && ` at ${event.time}`}
            </p>
            <p className="flex items-center">
              <LocationIcon className="text-gray-700" />
              {event.location}
            </p>
          </div>

          <div className="border-t border-gray-100 pt-3 mt-3">
            {/* Description Container with controlled height and scroll */}
            <div
                className={`description-scroll-container text-gray-700 text-sm mb-1.5 transition-all duration-300 ease-in-out ${
                    isDescriptionExpanded ? 'max-h-full overflow-y-scroll' : 'max-h-16 overflow-y-hidden'
                }`}
            >
                <p ref={descriptionTextRef}>
                    {event.description}
                </p>
            </div>

            {/* "Read More" button: Use primary brand colors for consistency */}
            {showReadMoreButton && !isDescriptionExpanded && (
                <button
                    onClick={() => setIsDescriptionExpanded(true)}
                    className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] hover:underline mt-1 transition-colors duration-200"
                >
                    Read More
                </button>
            )}
            {/* "Show Less" button: Use primary brand colors for consistency */}
            {isDescriptionExpanded && (
                <button
                    onClick={() => setIsDescriptionExpanded(false)}
                    className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] hover:underline mt-1 transition-colors duration-200"
                >
                    Show Less
                </button>
            )}

            {/* Tags: Conditionally render the entire tags section */}
            {Array.isArray(event.tags) && event.tags.length > 0 && (
              <div className="border-t border-gray-100 pt-2 mt-2 flex flex-wrap gap-1.5">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-50 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-md border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Attachments: Conditionally render the entire attachments section */}
            {Array.isArray(event.attachments) && event.attachments.length > 0 && (
              <div className={`${(Array.isArray(event.tags) && event.tags.length > 0) ? 'border-t pt-2 mt-2 border-gray-100' : 'mt-3'}`}>
                <h4 className="text-gray-800 uppercase tracking-wider mb-1.5 text-xs font-semibold">Attachments</h4>
                <ul className="space-y-1">
                  {event.attachments.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] text-xs flex items-center transition-colors duration-200 group"
                      >
                        <AttachmentIcon className="text-[var(--color-primary-dark)]" />
                        <span className="group-hover:underline">Attachment {i + 1}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Card Actions: Use mt-auto to push to the bottom of the fixed-height parent */}
        {/* We will center only the "View Details" button if it's smaller, otherwise w-full makes centering redundant */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex flex-col gap-3">
           <Button
              variant="primary"
              className="w-full font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl text-sm"
              onClick={() => handleRegister(event.title, event._id)}
            >
              Register Now
            </Button>

          {/* Link is w-full, but the Button inside it will have reduced text size */}
          <Link href={`/events/view/${event._id}`} className="block w-full">
            <Button
              variant="secondary"
              // Reduced text size to 'text-xs' for "View Details"
              className="w-full font-medium py-2 px-4 rounded-lg shadow-sm hover:shadow-md border border-gray-300 text-sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};


export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/events');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data.events);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);


  const handleRegister = async (title: string, eventId: string) => {
    if (!session) {
      alert('Please sign in to register for events.');
      return;
    }

    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, userEmail: session.user?.email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        alert("⚠️ You are already registered for this event.");
      } else if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      } else {
        alert(`✅ ${data.message || `Successfully registered for "${title}"`}`);
        fetchEvents(); // Re-fetch events to update participant count or status if needed
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ There was a problem registering for the event. Please try again.");
    }
  };

  return (
    // Changed main container background from 'bg-[var(--color-secondary-light)]' to 'bg-white'
    <div className="bg-white min-h-screen font-sans">
      <section className="text-center py-20 sm:py-24 px-4 bg-[var(--color-primary)] text-white shadow-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-primary-light)] mb-4 leading-tight">
          Explore Community Events
        </h1>
        <p className="text-lg text-[var(--color-primary-light)] max-w-3xl mx-auto leading-relaxed">
          Join us for a variety of engaging events designed to foster connection, learning, and growth within our community. Find your next inspiring experience below!
        </p>
      </section>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <p className="text-[var(--color-primary-dark)] text-xl animate-pulse font-semibold">Loading amazing events...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-700 bg-red-50 border border-red-300 p-6 rounded-lg shadow-md text-lg font-semibold max-w-md mx-auto flex items-center">
            <svg className="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
          </p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          {/* Changed grid layout to make cards wider */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} handleRegister={handleRegister} />
            ))}
          </div>
        </main>
      )}

      {!loading && events.length === 0 && (
        <div className="text-center py-20 px-4">
          {/* Changed background for this message from 'bg-[var(--color-secondary-light)]' to 'bg-white' */}
          <p className="text-[var(--color-secondary-dark)] text-lg italic bg-white p-6 rounded-lg shadow-md border border-[var(--color-secondary)] max-w-md mx-auto">No upcoming events at the moment. Please check back soon!</p>
        </div>
      )}
    </div>
  );
}