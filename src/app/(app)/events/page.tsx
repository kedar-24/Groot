'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/button';
import { useSession } from 'next-auth/react';

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
      setError('Failed to load events.');
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
      alert(`✅ ${data.message || `Successfully registered for ${title}`}`);
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("❌ There was a problem registering for the event.");
  }
  
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-green-800 mb-2">
          🌟 Upcoming Events
        </h1>
        <p className="text-lg text-gray-600">
          Join events that inspire change, innovation, and community!
        </p>
      </section>

      {/* State */}
      {loading && (
        <p className="text-center text-gray-600 text-lg animate-pulse">Loading events...</p>
      )}
      {error && (
        <p className="text-center text-red-600 text-lg">{error}</p>
      )}

      {/* Events Grid */}
      {!loading && events.length > 0 && (
        <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt="Event"
                  className="h-48 w-full object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-green-900 mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-1">
                  📅 {new Intl.DateTimeFormat('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  }).format(new Date(event.date))}
                  {event.time && ` at ${event.time}`}
                </p>
                <p className="text-sm text-gray-700 mb-2">{event.description}</p>
                <p className="text-sm text-gray-600 mb-1">📍 {event.location}</p>
                {Array.isArray(event.tags) && event.tags.length > 0 && (
                  <p className="text-xs text-gray-500 mb-1">
                    🏷️ Tags: {event.tags.join(', ')}
                  </p>
                )}
                {event.attachments && event.attachments.length > 0 && (
                  <ul className="text-xs text-blue-600 space-y-1 mb-2">
                    {event.attachments.map((url, i) => (
                      <li key={i}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-blue-800"
                        >
                          📎 Attachment {i + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <Button
                  variant="primary"
                  className="w-full mt-3"
                  onClick={() => handleRegister(event.title, event._id)}
                >
                  Register Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && events.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No upcoming events found.</p>
      )}
    </div>
  );
}
