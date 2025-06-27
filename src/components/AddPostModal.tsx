import { useState } from "react";
import Button from "@/components/button";

export default function AddPostModal({
  open,
  onClose,
  onPost,
}: {
  open: boolean;
  onClose: () => void;
  onPost: () => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to post");
      } else {
        setContent("");
        onPost();
        onClose();
      }
    } catch {
      setError("Failed to post");
    }
    setLoading(false);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <form
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-lg mb-4">Create Post</h2>
        <textarea
          className="w-full border rounded-lg p-3 mb-3 resize-none"
          rows={4}
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            Post
          </Button>
        </div>
      </form>
    </div>
  );
}
