// components/DragDropEmailEditor.tsx
'use client';

import dynamic from 'next/dynamic';
import { useRef, useState, useEffect } from 'react'; // Import useState and useEffect

// Dynamically import because it's not SSR compatible
const EmailEditor = dynamic(() => import('react-email-editor'), {
  ssr: false,
});

// Extend the Window interface to include Cloudinary if you were inserting images from there
// declare global {
//   interface Window {
//     cloudinary: any;
//   }
// }

type DragDropEmailEditorProps = {
  onExport: (html: string) => void;
  // You can add more props here if needed, e.g., to load an initial design
  // initialDesign?: object;
};

export default function DragDropEmailEditor({ onExport }: DragDropEmailEditorProps) {
  const emailEditorRef = useRef<any>(null);
  const [editorLoaded, setEditorLoaded] = useState(false); // State to track if editor is loaded

  // Callback when the editor's iframe and internal scripts are loaded
  const onLoad = () => {
    console.log('Email editor loaded successfully!');
    setEditorLoaded(true);
    // You can load an initial design here if you passed it as a prop
    // if (emailEditorRef.current?.editor && initialDesign) {
    //   emailEditorRef.current.editor.loadDesign(initialDesign);
    // }
  };

  // Callback when the editor is ready for API calls
  const onReady = () => {
    console.log('Email editor is ready for commands!');
  };

  const exportHtml = () => {
    // Only try to export if the editor is loaded and the editor instance is available
    if (emailEditorRef.current && emailEditorRef.current.editor && editorLoaded) {
      emailEditorRef.current.editor.exportHtml((data: any) => {
        const { html } = data;
        onExport(html); // Send to parent component
        console.log('Exported HTML for email:', html);
      });
    } else {
      console.warn('Email editor not yet loaded or ready to export HTML.');
      alert('Email editor is not ready. Please wait a moment.');
    }
  };

  return (
    <div className="w-full flex flex-col items-start"> {/* Use flex-col for vertical stacking */}
      <div className="flex justify-end w-full mb-4"> {/* Ensure button container takes full width */}
        <button
          onClick={exportHtml}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={!editorLoaded} // Disable button until editor is loaded
        >
          Export & Send
        </button>
      </div>

      {/* Container for the EmailEditor with explicit dimensions */}
      <div className="w-full h-[600px] border border-gray-300 rounded-lg overflow-hidden relative min-w-0">
        {typeof window !== 'undefined' && (
          <EmailEditor
            ref={emailEditorRef}
            // Apply styles directly to the EmailEditor component
            style={{ width: '100%', height: '100%' }}
            onLoad={onLoad} // Attach the onLoad handler
            onReady={onReady} // Attach the onReady handler
          />
        )}
        {!editorLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-80 z-10">
            <p className="text-gray-600 text-lg animate-pulse">Loading email editor...</p>
          </div>
        )}
      </div>
    </div>
  );
}