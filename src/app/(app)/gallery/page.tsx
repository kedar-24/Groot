"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GalleryPage() {
  const images = [
    { src: "/images/event1.jpeg", alt: "Event 1" },
    { src: "/images/event2.jpeg", alt: "Event 2" },
    { src: "/images/event3.jpeg", alt: "Event 3" },
    { src: "/images/event4.jpeg", alt: "Event 4" },
    { src: "/images/event3.jpeg", alt: "Event 3 Again" },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);
  const showPrev = () =>
    selectedIndex !== null && setSelectedIndex((i) => Math.max(0, i! - 1));
  const showNext = () =>
    selectedIndex !== null &&
    setSelectedIndex((i) => Math.min(images.length - 1, i! + 1));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    if (selectedIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="bg-gray-50 px-4 py-8 max-w-screen-xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Gallery
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-xl shadow hover:shadow-lg transition hover:scale-105"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={192}
              className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              loading="lazy"
              onClick={() => handleImageClick(index)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex justify-center items-center transition-all animate-fade-in"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-6xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedIndex].src}
              alt="Selected"
              width={1200}
              height={800}
              className="w-full max-h-[85vh] rounded-lg object-contain shadow-2xl transition-transform duration-300"
            />

            {/* Close Button - Outside image */}
            <button
              onClick={closeModal}
              className="absolute -top-6 -right-6 bg-white text-black text-xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-200 transition leading-none"
              aria-label="Close image"
            >
              <span className="block translate-y-[-2px]">&times;</span>
            </button>

            {/* Prev Button - Outside image */}
            {selectedIndex > 0 && (
              <button
                onClick={showPrev}
                className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all"
                aria-label="Previous image"
              >
                &#8249;
              </button>
            )}

            {/* Next Button - Outside image */}
            {selectedIndex < images.length - 1 && (
              <button
                onClick={showNext}
                className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 text-white text-4xl w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all"
                aria-label="Next image"
              >
                &#8250;
              </button>
            )}
            {/* Thumbnails */}
            <div className="flex gap-2 mt-6 justify-center">
              {images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img.src}
                  alt={img.alt}
                  width={96}
                  height={64}
                  onClick={() => setSelectedIndex(idx)}
                  className={`h-16 w-24 object-cover cursor-pointer rounded-md border-2 transition-all duration-200 ${
                    idx === selectedIndex
                      ? "border-green-500"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
