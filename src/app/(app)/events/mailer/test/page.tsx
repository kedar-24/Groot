'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import MyEmailEditor, { MyEmailEditorHandle } from '@/components/EmailEditor';
import Button from '@/components/button'; // Assuming you have a reusable Button component
import { motion, AnimatePresence } from 'framer-motion'; // For subtle transitions

export default function EmailPage() {
  const searchParams = useSearchParams();
  const eventIdFromUrl = searchParams.get('eventId'); // Get eventId from URL

  const emailEditorRef = useRef<MyEmailEditorHandle>(null);
  const [eventId, setEventId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null); // To control color

  useEffect(() => {
    if (eventIdFromUrl) {
      setEventId(eventIdFromUrl);
    }
  }, [eventIdFromUrl]);

  const handleSendEmails = () => {
    const editor = emailEditorRef.current;
    if (!editor || !editor.editor) { // Ensure editor instance and its internal editor are ready
      setStatusType('error');
      setStatus('❌ Editor is not fully loaded. Please wait a moment.');
      return;
    }

    setLoading(true);
    setStatus(null); // Clear previous status
    setStatusType(null);

    editor.editor.exportHtml(async (data: { html: string; design?: unknown }) => {
      try {
        const res = await fetch('/api/send-custom-emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId,
            message: data.html,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          // If the API responded with an error (e.g., 404, 500)
          setStatusType('error');
          throw new Error(result.error || 'Failed to send emails via API.');
        }

        // If res.ok is true, it means our backend successfully queued it.
        setStatusType('success');
        setStatus(`✅ Successfully sent emails to ${result.count} participants!`);
        // Optionally, clear the status after a few seconds
        // setTimeout(() => { setStatus(null); setStatusType(null); }, 5000);

      } catch (error: any) {
        setStatusType('error');
        setStatus(`❌ Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    });
  };

  // Render a cleaner message if eventId is missing
  if (!eventIdFromUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center border border-red-200">
          <p className="text-red-600 text-lg font-semibold mb-4">
            <span className="text-2xl mr-2">⚠️</span>Missing `eventId` in URL.
          </p>
          <p className="text-gray-700">
            Please navigate from the event details page to compose an email.
          </p>
          {/*
            Use motion(Button) to animate the Button component instead of using as={motion.button}
          */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="secondary"
              className="mt-6 text-emerald-700 border-emerald-500 hover:bg-emerald-50"
              onClick={() => window.history.back()} // Go back to previous page
            >
              Go Back
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top bar */}
      <div className="p-4 border-b bg-white shadow-sm flex-shrink-0 space-y-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleSendEmails}
          disabled={loading || !eventId}
          variant="primary"
          className={`
            bg-green-700 hover:bg-green-800 text-white
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}
            flex items-center justify-center
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Emails...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Send Email to Participants
            </>
          )}
        </Button>
        <AnimatePresence>
          {status && (
            <motion.p
              key="status-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`text-sm font-medium ${
                statusType === 'success' ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {status}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Email Editor Area */}
      <div className="flex-1 overflow-hidden p-4">
        {/*
          This wrapper ensures the editor component fills the available space.
          The border is for visual debugging.
        */}
        <div className="w-full h-full border border-gray-300 rounded-lg overflow-hidden">
          <MyEmailEditor ref={emailEditorRef} />
        </div>
      </div>
    </div>
  );
}