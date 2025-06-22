'use client';

import React from 'react';

interface EmailPreviewModalProps {
  customMessage: string;
  onClose: () => void;
  onSend: () => void;
}

export default function EmailPreviewModal({
  customMessage,
  onClose,
  onSend,
}: EmailPreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-green-700">📧 Email Preview</h2>
        <div
          className="border border-gray-200 rounded p-4 mb-4 text-sm text-gray-700 bg-gray-50 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: customMessage }}
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border text-sm border-gray-300 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={onSend}
            className="px-4 py-2 bg-green-700 text-white rounded text-sm"
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
