"use client";

import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useSession } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Paperclip, AlertTriangle, Info } from "lucide-react";

// --- TYPES ---
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

// --- SKELETON LOADER COMPONENT ---
const EventCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-5">
      <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-6"></div>
      <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse mt-2"></div>
    </div>
  </div>
);

// --- EVENT CARD COMPONENT ---
const EventCard: React.FC<{
  event: Event;
  index: number;
  handleRegister: (title: string, eventId: string) => void;
}> = ({ event, index, handleRegister }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="bg-white rounded-xl shadow-lg transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden group hover:shadow-2xl hover:-translate-y-2"
    >
      <div className="w-full h-48 relative overflow-hidden">
        {event.image ? (
          <CldImage
            src={event.image}
            width={600}
            height={300}
            crop="fill"
            gravity="center"
            alt={`Banner for ${event.title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
            No Image Available
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2 leading-tight">
          {event.title}
        </h2>

        <div className="space-y-1.5 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2">
            <Calendar size={14} className="text-[var(--color-primary)]" />
            {new Intl.DateTimeFormat("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(event.date))}
            {event.time && ` at ${event.time}`}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={14} className="text-[var(--color-primary)]" />
            {event.location}
          </p>
        </div>

        {Array.isArray(event.tags) && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-[var(--color-primary-light)]/50 text-[var(--color-primary-dark)] text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => handleRegister(event.title, event._id)}
          >
            Register Now
          </Button>
          <Link href={`/events/view/${event._id}`} className="block w-full">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function EventsPage() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data.events);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Failed to load events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (title: string, eventId: string) => {
    if (!session) {
      alert("Please sign in to register for events.");
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
        fetchEvents();
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(
        "❌ There was a problem registering for the event. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="text-center py-20 sm:py-24 px-4 bg-[var(--color-primary)] text-white shadow-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--color-primary-light)] mb-4">
          Explore Community Events
        </h1>
        <p className="text-lg text-[var(--color-primary-light)]/90 max-w-3xl mx-auto">
          Join us for a variety of engaging events designed to foster
          connection, learning, and growth within our community.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 text-red-800 p-8 rounded-xl shadow-md max-w-lg mx-auto flex flex-col items-center">
              <AlertTriangle size={48} className="text-red-500 mb-4" />
              <h2 className="text-2xl font-bold">An Error Occurred</h2>
              <p className="mt-2">{error}</p>
            </div>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <EventCard
                key={event._id}
                event={event}
                index={index}
                handleRegister={handleRegister}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 max-w-lg mx-auto flex flex-col items-center">
              <Info
                size={48}
                className="text-[var(--color-secondary)] mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800">
                No Events Found
              </h2>
              <p className="text-gray-500 mt-2">
                There are currently no upcoming events. Please check back soon!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
