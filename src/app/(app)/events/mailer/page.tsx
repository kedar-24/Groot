"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import Link from "next/link";
import { Send, Users, Loader, AlertTriangle } from "lucide-react";

import Button from "@/components/button";

// --- TYPES ---
type User = {
  _id: string;
  username: string;
  email: string;
  image?: string;
};

type Event = {
  _id: string;
  title: string;
  participants: User[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// --- UI COMPONENTS ---

const MailerSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
    {/* Editor Skeleton */}
    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-6">
      <div className="h-8 w-3/4 bg-gray-200 rounded-lg"></div>
      <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
      <div className="h-64 w-full bg-gray-200 rounded-lg"></div>
      <div className="h-12 w-32 bg-gray-200 rounded-lg ml-auto"></div>
    </div>
    {/* Participant List Skeleton */}
    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="h-6 w-1/2 bg-gray-200 rounded-lg mb-4"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-grow space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center py-20 text-red-700 bg-red-50 rounded-lg border border-red-200">
    <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
    <p className="text-xl font-bold mb-2">An Error Occurred</p>
    <p className="text-md text-red-600">{message}</p>
    <Link href="/events" passHref>
      <Button variant="secondary" className="mt-6">
        ← Back to Events
      </Button>
    </Link>
  </div>
);

// --- MAIN MAILER COMPONENT ---
function EventMailer() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const { data, error } = useSWR(
    eventId ? `/api/events/${eventId}?includeParticipants=true` : null,
    fetcher
  );
  const event: Event | null = data?.event;
  const isLoading = !data && !error;

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    if (event?.participants) {
      setSelectedRecipients(event.participants.map((p) => p.email));
    }
  }, [event?.participants]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRecipients(event?.participants.map((p) => p.email) || []);
    } else {
      setSelectedRecipients([]);
    }
  };

  const handleSelectParticipant = (email: string, checked: boolean) => {
    if (checked) {
      setSelectedRecipients((prev) => [...prev, email]);
    } else {
      setSelectedRecipients((prev) => prev.filter((e) => e !== email));
    }
  };

  const handleSendEmail = async () => {
    if (!subject || !body || selectedRecipients.length === 0) {
      alert(
        "Please provide a subject, body, and select at least one recipient."
      );
      return;
    }
    setIsSending(true);
    setSendStatus(null);
    try {
      const res = await fetch("/api/events/mailer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          subject,
          body, // In a real app, this would be sanitized HTML from a rich text editor
          recipients: selectedRecipients,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to send email");
      setSendStatus({
        success: true,
        message: result.message || "Email sent successfully!",
      });
    } catch (err: any) {
      setSendStatus({
        success: false,
        message: err.message || "An unknown error occurred.",
      });
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) return <MailerSkeleton />;
  if (error || !event)
    return (
      <ErrorState
        message={error?.message || "Could not find the specified event."}
      />
    );

  const allSelected = selectedRecipients.length === event.participants.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Email Editor */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Compose Email for "{event.title}"
        </h2>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
              placeholder="Your email subject"
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={12}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition"
              placeholder="Write your message here... (Supports basic HTML)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Use a rich text editor library like react-quill for a
              full-featured experience.
            </p>
          </div>
          <div className="flex justify-end items-center gap-4">
            {sendStatus && (
              <p
                className={`text-sm font-semibold ${
                  sendStatus.success ? "text-green-600" : "text-red-600"
                }`}
              >
                {sendStatus.message}
              </p>
            )}
            <Button
              onClick={handleSendEmail}
              disabled={isSending}
              className="min-w-[120px]"
            >
              {isSending ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={16} className="mr-2" /> Send Email
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Participant List */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-28"
      >
        <div className="flex justify-between items-center pb-3 border-b mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Users size={20} /> Recipients
          </h3>
          <span className="text-sm font-bold text-[var(--color-primary)] bg-[var(--color-primary-light)]/50 px-2.5 py-1 rounded-full">
            {selectedRecipients.length} / {event.participants.length}
          </span>
        </div>
        <div className="max-h-[400px] overflow-y-auto pr-2">
          <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition mb-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
            />
            <span className="font-semibold text-gray-700">Select All</span>
          </label>
          <div className="space-y-1">
            {event.participants.map((p) => (
              <label
                key={p._id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={selectedRecipients.includes(p.email)}
                  onChange={(e) =>
                    handleSelectParticipant(p.email, e.target.checked)
                  }
                  className="h-5 w-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <img
                  src={
                    p.image ||
                    `https://ui-avatars.com/api/?name=${p.username}&background=random`
                  }
                  alt={p.username}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="flex-grow overflow-hidden">
                  <p className="font-medium text-sm text-gray-800 truncate">
                    {p.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{p.email}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- MAIN PAGE WRAPPER (for Suspense) ---
export default function EventMailerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Suspense fallback={<MailerSkeleton />}>
          <EventMailer />
        </Suspense>
      </div>
    </div>
  );
}
