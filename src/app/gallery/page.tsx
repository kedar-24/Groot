"use client";

import { useState } from "react";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: "/images/event1.jpeg", alt: "Event 1" },
    { src: "/images/event2.jpeg", alt: "Event 2" },
    { src: "/images/event3.jpeg", alt: "Event 3" },
    { src: "/images/event4.jpeg", alt: "Event 4" },
    // Add more images here as needed
  ];

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-gray-50 p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <img
              src={image.src}
              alt={image.alt}
              className="rounded-lg w-full h-full object-cover transition-transform transform group-hover:scale-105 cursor-pointer"
              loading="lazy" // Lazy loading for better performance
              onClick={() => handleImageClick(image.src)}
            />
          </div>
        ))}
      </div>

      {/* Modal for Viewing Large Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Large View"
              className="rounded-lg max-w-full max-h-[80vh]"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
