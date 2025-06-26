"use client";

import React, { useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader, AlertTriangle, ArrowLeft } from "lucide-react";

import MyEmailEditor, { MyEmailEditorHandle } from "@/components/EmailEditor";
import Button from "@/components/button";

// --- TYPES ---
type Event = {
  _id: string;
  title: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// --- UI COMPONENTS ---

const MailerSkeleton = () => (
  <div className="flex flex-col h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 animate-pulse">
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
      {/* Header Skeleton */}
      <div className="p-4 border-b flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-8 w-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-12 w-48 bg-gray-200 rounded-lg"></div>
      </div>
      {/* Editor Area Skeleton */}
      <div className="flex-1 bg-gray-100 p-4">
        <div className="w-full h-full bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const ErrorState = ({ title, message }: { title: string; message: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div className="bg-white rounded-lg shadow-md p-8 text-center border border-red-200 max-w-md">
      <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-500" />
      <h2 className="text-xl font-bold text-red-700 mb-2">{title}</h2>
      <p className="text-gray-700">{message}</p>
      <Link href="/events" passHref>
        <Button variant="secondary" className="mt-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Events
        </Button>
      </Link>
    </div>
  </div>
);

// --- MAIN MAILER COMPONENT ---
function EmailEditorComponent() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const { data, error: eventError } = useSWR(
    eventId ? `/api/events/${eventId}` : null,
    fetcher
  );
  const event: Event | null = data?.event;

  const emailEditorRef = useRef<MyEmailEditorHandle>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSendEmails = () => {
    const editor = emailEditorRef.current;
    if (!editor?.editor) {
      setStatus({ type: "error", message: "Editor is not fully loaded." });
      return;
    }

    setIsSending(true);
    setStatus(null);

    editor.editor.exportHtml(async (data: { html: string }) => {
      try {
        const res = await fetch("/api/send-custom-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventId, message: data.html }),
        });

        const result = await res.json();
        if (!res.ok) throw new Error(result.error || "Failed to send emails.");

        setStatus({
          type: "success",
          message: `Successfully sent to ${result.count} participants!`,
        });
      } catch (err: any) {
        setStatus({ type: "error", message: err.message });
      } finally {
        setIsSending(false);
      }
    });
  };

  if (!eventId) {
    return (
      <ErrorState
        title="Missing Event ID"
        message="Please navigate from an event details page to compose an email."
      />
    );
  }
  if (eventError) {
    return (
      <ErrorState
        title="Failed to Load Event"
        message={eventError.message || "Could not find the specified event."}
      />
    );
  }
  if (!event) {
    return <MailerSkeleton />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex-shrink-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Link
              href={`/events/view/${eventId}`}
              className="text-sm text-gray-500 hover:text-[var(--color-primary)] flex items-center gap-1 mb-1"
            >
              <ArrowLeft size={14} /> Back to Event
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">
              Compose Email for "{event.title}"
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {status && (
                <motion.p
                  key="status-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`text-sm font-medium ${
                    status.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>
            <Button
              onClick={handleSendEmails}
              disabled={isSending}
              className="min-w-[120px]"
            >
              {isSending ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <>
                  <Send size={16} className="mr-2" /> Send
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          <MyEmailEditor ref={emailEditorRef} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE WRAPPER (for Suspense) ---
export default function EmailPage() {
  return (
    <Suspense fallback={<MailerSkeleton />}>
      <EmailEditorComponent />
    </Suspense>
  );
}
