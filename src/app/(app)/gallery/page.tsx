"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GalleryModal from "@/components/GalleryModal";

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
    setSelectedIndex((i) => (i !== null ? Math.max(0, i - 1) : 0));
  const showNext = () =>
    setSelectedIndex((i) =>
      i !== null ? Math.min(images.length - 1, i + 1) : 0
    );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (
        e.key === "ArrowRight" &&
        selectedIndex !== null &&
        selectedIndex < images.length - 1
      )
        showNext();
      if (e.key === "ArrowLeft" && selectedIndex !== null && selectedIndex > 0)
        showPrev();
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
        <GalleryModal
          images={images}
          selectedIndex={selectedIndex}
          onClose={closeModal}
          onPrev={showPrev}
          onNext={showNext}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </div>
  );
}
