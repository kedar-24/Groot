"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import PageTopSpacer from "@/components/PageTopSpacer";

interface Event {
  _id: string;
  title: string;
  date: string;
  location: string;
  participants?: string[];
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from your API
    (async () => {
      try {
        const res = await fetch("/api/events");
        const data = await res.json();
        setEvents(data.events || []);
      } catch {
        setEvents([]);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTopSpacer />
      <div className="max-w-4xl mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Manage Events</h1>
          <Link href="/admin/events/new">
            <button className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition font-semibold shadow">
              <PlusCircle className="w-5 h-5" /> Add Event
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-400 text-center py-12">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            No events found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-gray-100 bg-white">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Location
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {event.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {new Date(event.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {event.participants?.length ?? 0}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <Link href={`/events/view/${event._id}`}>
                        <button
                          className="p-2 rounded hover:bg-emerald-50 text-emerald-600"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={`/admin/events/edit/${event._id}`}>
                        <button
                          className="p-2 rounded hover:bg-blue-50 text-blue-600"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </Link>
                      <button
                        className="p-2 rounded hover:bg-red-50 text-red-600"
                        title="Delete"
                        // onClick={() => handleDelete(event._id)}
                        disabled
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
