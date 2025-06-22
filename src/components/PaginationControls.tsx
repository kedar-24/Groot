// components/PaginationControls.tsx
export default function PaginationControls({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mb-4">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded-full border text-sm ${
            currentPage === i + 1
              ? 'bg-green-700 text-white'
              : 'bg-white text-green-700 border-green-300 hover:bg-green-100'
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
