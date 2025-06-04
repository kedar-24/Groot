import Image from "next/image";
import React from "react";
import GalleryNavButton from "./GalleryNavButton";

interface GalleryModalProps {
  images: { src: string; alt: string }[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  setSelectedIndex: (idx: number) => void;
}

const GalleryModal = ({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
  setSelectedIndex,
}: GalleryModalProps) => (
  <div
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center transition-all animate-fade-in"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div
      className="relative max-w-4xl w-full px-2 sm:px-4 flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Main Image with navigation and close */}
      <div className="relative w-full flex items-center justify-center">
        {/* Prev Button */}
        {selectedIndex > 0 && (
          <GalleryNavButton
            onClick={onPrev}
            className="gallery-modal-btn--nav absolute left-2 top-1/2 -translate-y-1/2"
            aria-label="Previous image"
            tabIndex={0}
          >
            &#8249;
          </GalleryNavButton>
        )}

        {/* Main Image */}
        <Image
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          width={1200}
          height={800}
          className="w-full max-h-[75vh] rounded-xl object-contain shadow-2xl transition-transform duration-300 bg-white"
        />

        {/* Next Button */}
        {selectedIndex < images.length - 1 && (
          <GalleryNavButton
            onClick={onNext}
            className="gallery-modal-btn--nav absolute right-2 top-1/2 -translate-y-1/2"
            aria-label="Next image"
            tabIndex={0}
          >
            &#8250;
          </GalleryNavButton>
        )}

        {/* Close Button */}
        <GalleryNavButton
          onClick={onClose}
          className="gallery-modal-btn--close"
          aria-label="Close image"
          tabIndex={0}
        >
          &times;
        </GalleryNavButton>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 mt-6 justify-center flex-wrap">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`focus:outline-none rounded-md transition-all duration-200 border-2 ${
              idx === selectedIndex
                ? "border-green-500 ring-2 ring-green-400"
                : "border-transparent hover:border-green-300"
            }`}
            aria-label={`Show image ${idx + 1}`}
            tabIndex={0}
            type="button"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={96}
              height={64}
              className="h-16 w-24 object-cover rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default GalleryModal;
