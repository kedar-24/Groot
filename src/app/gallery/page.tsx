export default function GalleryPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <img src="/images/event1.jpeg" className="rounded-lg" alt="Event 1" />
        <img src="/images/event2.jpeg" className="rounded-lg" alt="Event 2" />
        <img src="/images/event3.jpeg" className="rounded-lg" alt="Event 3" />
        <img src="/images/event4.jpeg" className="rounded-lg" alt="Event 4" />
        <img src="/images/event4.jpeg" className="rounded-lg" alt="Event 4" />
        <img src="/images/event1.jpeg" className="rounded-lg" alt="Event 1" />
        <img src="/images/event3.jpeg" className="rounded-lg" alt="Event 3" />
        <img src="/images/event2.jpeg" className="rounded-lg" alt="Event 2" />
        <img src="/images/event1.jpeg" className="rounded-lg" alt="Event 1" />
        <img src="/images/event3.jpeg" className="rounded-lg" alt="Event 3" />
        <img src="/images/event2.jpeg" className="rounded-lg" alt="Event 2" />
        <img src="/images/event4.jpeg" className="rounded-lg" alt="Event 4" />
      </div>
    </div>
  );
}
