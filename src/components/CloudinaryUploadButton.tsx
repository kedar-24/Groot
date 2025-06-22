'use client';

import { useEffect, useRef, useState } from 'react';

// Extend the Window interface to include Cloudinary
declare global {
  interface Window {
    cloudinary: any;
  }
}

type Props = {
  onUploadSuccess: (publicId: string, url: string, info?: any) => void;
  buttonText?: string;
  folder?: string;
  resourceType?: 'image' | 'raw' | 'video' | 'auto'; // Added more resource types
  className?: string; // For custom styling
  disabled?: boolean; // To allow disabling from parent
};

export default function CloudinaryUploadButton({
  onUploadSuccess,
  buttonText = 'Upload File',
  folder = 'nextjs-uploads', // Default folder name
  resourceType = 'image',
  className = '',
  disabled = false,
}: Props) {
  const widgetRef = useRef<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Function to load the Cloudinary script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.cloudinary && !scriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        console.log('Cloudinary script loaded.');
      };
      script.onerror = () => {
        console.error('Failed to load Cloudinary script.');
      };
      document.body.appendChild(script);

      return () => {
        // Clean up the script if the component unmounts
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    } else if (window.cloudinary && !scriptLoaded) {
      // If script is already available (e.g., from another component), just set loaded
      setScriptLoaded(true);
    }
  }, [scriptLoaded]);

  // Initialize Cloudinary Widget once the script is loaded
  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined' && window.cloudinary && !widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          folder: folder,
          resourceType: resourceType,
          multiple: false, // Only allow single file upload
          maxFiles: 1,
          clientAllowedFormats: resourceType === 'image' ? ['png', 'gif', 'jpeg', 'webp'] : undefined,
          sources: ['local', 'url', 'camera'], // Allow local file, URL, and camera
          // For more options, see: https://cloudinary.com/documentation/upload_widget_reference
        },
        (error: any, result: any) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            setUploading(false);
            return;
          }

          console.log('📤 Cloudinary result:', result);

          if (result.event === 'success') {
            const publicId = result.info?.public_id;
            const secureUrl = result.info?.secure_url;

            console.log('✅ Public ID:', publicId);
            console.log('🔗 Secure URL:', secureUrl);

            onUploadSuccess(publicId, secureUrl, result.info); // Pass info as third argument

            if (resourceType === 'image' && secureUrl) {
              setPreviewUrl(secureUrl);
            }

            setUploading(false);
          } else if (result.event === 'close' || result.event === 'abort') {
            // Widget was closed or upload aborted without success
            console.log('Cloudinary widget closed or upload aborted.');
            setUploading(false);
          }
        }
      );
      console.log('Cloudinary widget initialized.');
    }
  }, [scriptLoaded, folder, resourceType, onUploadSuccess]);

  const handleOpen = () => {
    if (!widgetRef.current || uploading || disabled) {
      console.warn('Cloudinary widget not ready or upload in progress/disabled.');
      return;
    }
    setUploading(true);
    widgetRef.current.open();
  };

  const isButtonDisabled = uploading || disabled || !scriptLoaded;

  return (
    <div className={`space-y-3 ${className}`}>
      <button
        type="button"
        onClick={handleOpen}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out shadow-md
          ${isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}
        `}
        disabled={isButtonDisabled}
        aria-busy={uploading}
      >
        {uploading ? 'Uploading...' : buttonText}
      </button>

      {resourceType === 'image' && previewUrl && (
        <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50 max-w-sm">
          <p className="text-sm text-gray-700 mb-2 font-medium">Image Preview:</p>
          <img
            src={previewUrl}
            alt="Uploaded Preview"
            className="w-full h-auto object-contain rounded-md shadow-sm border border-gray-100"
            style={{ maxHeight: '200px' }} // Limit max height for preview
          />
        </div>
      )}
      {resourceType !== 'image' && previewUrl && (
        <div className="mt-4 p-3 border border-gray-200 rounded-lg bg-gray-50 max-w-sm">
          <p className="text-sm text-gray-700 mb-2 font-medium">File Uploaded:</p>
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {previewUrl.substring(previewUrl.lastIndexOf('/') + 1)}
          </a>
        </div>
      )}
      {!scriptLoaded && (
        <p className="text-sm text-gray-500">Loading Cloudinary script...</p>
      )}
    </div>
  );
}