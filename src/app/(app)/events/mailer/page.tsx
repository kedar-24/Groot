'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CldUploadWidget } from 'next-cloudinary';

import ParticipantList from '@/components/ParticipantList';
import PaginationControls from '@/components/PaginationControls';

const EmailEditor = dynamic(() => import('react-email-editor'), { ssr: false });

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
};

export default function EventDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [composing, setComposing] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const emailEditorRef = useRef<any>(null);

  const onLoad = () => {
    console.log('Email editor loaded successfully!');
    setEditorLoaded(true);
  };

  const onReady = () => {
    console.log('Email editor is ready for commands!');
  };

  const exportHtml = () => {
    if (emailEditorRef.current?.editor && editorLoaded) {
      emailEditorRef.current.editor.exportHtml((data: any) => {
        const { html } = data;
        setCustomMessage(html);
        alert('✅ Email content exported and set!');
        console.log('Exported HTML:', html);
      });
    } else {
      alert('Email editor is not ready yet.');
    }
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events?includeParticipants=true');
        const data = await res.json();
        if (data.success) {
          setEvents(data.events);
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
    setCustomMessage('');
    setComposing(false);
    setEditorLoaded(false);
  };

  const handleSendEmails = async (eventId: string) => {
    if (!customMessage.trim()) {
      alert('Please compose and export your email message first.');
      return;
    }

    setSending(true);
    try {
      const res = await fetch('/api/send-custom-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, message: customMessage }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message || 'Emails sent successfully!');
      } else {
        alert(`Failed to send emails: ${result.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error sending emails:', err);
      alert('Failed to send emails due to a network error.');
    } finally {
      setSending(false);
    }
  };

  const handleUploadSuccess = (result: any) => {
    const publicId = result.info.public_id;
    const secureUrl = result.info.secure_url;
    console.log('✅ File uploaded successfully:', publicId, 'URL:', secureUrl);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-600 text-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-8">🎉 Event Registrations</h1>

      {events
        .filter(event => !expandedEventId || event._id === expandedEventId)
        .map(event => {
          const totalPages = Math.ceil(event.participants.length / PARTICIPANTS_PER_PAGE);
          const paginatedParticipants = event.participants.slice(
            (currentPage - 1) * PARTICIPANTS_PER_PAGE,
            currentPage * PARTICIPANTS_PER_PAGE
          );

          return (
            <div key={event._id} className="mb-8 border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
              {expandedEventId === event._id ? (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-green-700">
                        👥 Participants for "{event.title}"
                      </h2>
                      <button
                        onClick={() => toggleEvent(event._id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        ✖ Close
                      </button>
                    </div>

                    {event.participants.length === 0 ? (
                      <p className="text-gray-400 italic">No one registered yet.</p>
                    ) : (
                      <>
                        {!composing && (
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

                        {!composing ? (
                          <button
                            onClick={() => setComposing(true)}
                            className="mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded border border-blue-300 hover:bg-blue-200 text-sm"
                          >
                            ✏️ Compose Email
                          </button>
                        ) : (
                          <div className="mt-4">
                            <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden relative min-w-0">
                              {typeof window !== 'undefined' && (
                                <EmailEditor
                                  ref={emailEditorRef}
                                  style={{ width: '100%', height: '100%' }}
                                  onLoad={onLoad}
                                  onReady={onReady}
                                />
                              )}
                              {!editorLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80 z-10">
                                  <p className="text-gray-600 text-lg animate-pulse">Loading email editor...</p>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-4 mt-3">
                              <button
                                onClick={exportHtml}
                                disabled={!editorLoaded}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                              >
                                Export & Set Message
                              </button>
                              <button
                                onClick={() => {
                                  setComposing(false);
                                  setCustomMessage('');
                                  setEditorLoaded(false);
                                }}
                                className="text-sm text-gray-500 underline hover:text-gray-700"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}

                        {composing && (
                          <div className="flex flex-col sm:flex-row gap-3 sm:items-center mt-4">
                            <button
                              onClick={() => setShowPreview(true)}
                              disabled={!customMessage.trim()}
                              className="bg-gray-100 text-green-700 px-4 py-2 rounded border border-green-300 hover:bg-green-200 text-sm disabled:opacity-50"
                            >
                              📄 Preview Email
                            </button>
                            <button
                              onClick={() => handleSendEmails(event._id)}
                              disabled={sending || !customMessage.trim()}
                              className="bg-green-700 text-white px-6 py-2 rounded disabled:opacity-50 text-sm"
                            >
                              {sending ? 'Sending...' : 'Send Email to Participants'}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-semibold text-gray-800">{event.title}</h2>
                    <span className="text-sm text-gray-500 italic">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">📍 {event.location}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    🧑‍🤝‍🧑 <span className="font-semibold text-green-700">{event.participants.length}</span> participant{event.participants.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => toggleEvent(event._id)}
                    className="text-sm text-green-700 font-semibold hover:underline"
                  >
                    Mail Participants →
                  </button>
                </div>
              )}
            </div>
          );
        })}

      <div className="mt-8">
        <CldUploadWidget
          uploadPreset="uday-suram"
          onUpload={(result, widget) => {
            console.log('onUpload fired', result);
            if (result?.event === 'success') {
              handleUploadSuccess(result);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              📤 Upload Image (Cloudinary)
            </button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
