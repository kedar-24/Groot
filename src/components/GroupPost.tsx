import React, { useState } from "react";
import { MessageCircle, Share2 } from "lucide-react";
import ReactionBar from "./ReactionBar";

export default function GroupPost({
  author,
  date,
  content,
  isSuggested,
}: {
  author: string;
  date: string;
  content: string;
  isSuggested?: boolean;
}) {
  const [shares, setShares] = useState(0);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [showComments, setShowComments] = useState(false);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim()) {
      setComments((prev) => [...prev, commentInput.trim()]);
      setCommentInput("");
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm p-6 mb-6 transition hover:shadow-md font-sans">
      {/* Header */}
      <div className="flex items-center mb-2">
        {isSuggested && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-semibold mr-3">
            Suggested
          </span>
        )}
        <span className="font-semibold text-green-900">{author}</span>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>

      {/* Content */}
      <div className="text-gray-800 text-base mb-4 leading-relaxed">
        {content}
      </div>

      {/* Reactions, Comments, Share */}
      <div className="flex items-center justify-start gap-6 text-sm text-gray-500 font-medium mb-2">
        <ReactionBar />

        <button
          className="hover:text-green-800 transition flex items-center gap-1"
          onClick={() => setShowComments((v) => !v)}
          aria-label="Comment"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comments.length}</span>
        </button>

        <button
          className="hover:text-green-800 transition flex items-center gap-1"
          onClick={() => setShares((s) => s + 1)}
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
          <span>{shares}</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4">
          <form onSubmit={handleAddComment} className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-800 text-white px-4 py-1 rounded hover:bg-green-900 text-sm"
            >
              Post
            </button>
          </form>

          <div className="space-y-2">
            {comments.length === 0 ? (
              <div className="text-xs text-gray-400">No comments yet.</div>
            ) : (
              comments.map((c, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded px-3 py-1 text-sm text-gray-800"
                >
                  {c}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
