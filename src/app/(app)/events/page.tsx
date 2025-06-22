'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/button'; // Assuming this is your custom Button component
import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';

// Define the Event interface, ensure 'attachments' can be an array of objects if needed
// (adjust based on what your backend actually returns for attachments)
interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  image?: string; // Cloudinary public ID
  tags?: string[];
  isPublic?: boolean;
  // If attachments are just public IDs, string[] is fine.
  // If they are objects { publicId: string, url: string, fileName: string }, update this.
  attachments?: string[];
  participants?: string[];
}

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          userEmail: session.user?.email,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        alert("⚠️ You are already registered for this event.");
      } else if (!res.ok) {
        throw new Error(data?.message || "Registration failed");
      } else {
        alert(`✅ ${data.message || `Successfully registered for "${title}"`}`);
        // Optionally refetch events to update participant count or state
        fetchEvents();
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("❌ There was a problem registering for the event. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-700 mb-4">
          Explore Engaging Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a variety of events designed to connect, educate, and inspire our community. Find your next experience!
        </p>
      </section>

      {/* Loading & Error States */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-600 text-xl animate-pulse">Loading amazing events...</p>
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-64">
          <p className="text-red-600 text-xl font-medium">{error}</p>
        </div>
      )}

      {/* Events Grid */}
      {!loading && events.length > 0 && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Event Image */}
              {event.image ? (
                <CldImage
                  src={event.image}
                  width={600} // Optimized for card size, but maintains aspect ratio
                  height={350} // Aspect ratio for a visually pleasing banner
                  crop="fill"
                  alt={`Banner for ${event.title}`}
                  className="w-full h-48 sm:h-56 object-cover"
                />
              ) : (
                // Placeholder if no image is available
                <div className="w-full h-48 sm:h-56 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Image Available
                </div>
              )}

              <div className="p-6">
                {/* Event Title */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                  {event.title}
                </h2>

                {/* Date & Time */}
                <p className="text-sm text-gray-500 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {new Intl.DateTimeFormat('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(event.date))}
                  {event.time && ` at ${event.time}`}
                </p>

                {/* Location */}
                <p className="text-sm text-gray-600 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {event.location}
                </p>

                {/* Description - truncated for brevity on cards */}
                <p className="text-base text-gray-700 mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Tags */}
                {Array.isArray(event.tags) && event.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {event.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Attachments */}
                {event.attachments && event.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Attachments:</h4>
                    <ul className="space-y-1">
                      {event.attachments.map((url, i) => (
                        <li key={i}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.485L20.5 13.5"></path></svg>
                            Attachment {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Register Button */}
                <Button
                  variant="primary" // Assuming your Button component has a 'primary' variant
                  className="w-full mt-4 py-2.5 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
                  onClick={() => handleRegister(event.title, event._id)}
                >
                  Register Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Events Found State */}
      {!loading && events.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-xl italic">No upcoming events found. Stay tuned!</p>
        </div>
      )}
    </div>
  );
}