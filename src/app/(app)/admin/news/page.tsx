"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import PageTopSpacer from "@/components/PageTopSpacer";

interface News {
  _id: string;
  title: string;
  summary?: string;
  published: boolean;
  publishedAt?: string;
  views: number;
}

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();
        setNewsList(data.news || []);
      } catch {
        setNewsList([]);
      }
      setLoading(false);
    })();
  }, []);

  // Placeholder for delete handler
  // const handleDelete = async (id: string) => { ... }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTopSpacer />
      <div className="max-w-4xl mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Manage News</h1>
          <Link href="/admin/news/new">
            <button className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition font-semibold shadow">
              <PlusCircle className="w-5 h-5" /> Add News
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-400 text-center py-12">Loading news...</div>
        ) : newsList.length === 0 ? (
          <div className="text-gray-400 text-center py-12">
            No news articles found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-gray-100 bg-white">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Summary
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Views
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {newsList.map((news) => (
                  <tr key={news._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {news.title}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {news.summary || (
                        <span className="italic text-gray-400">No summary</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {news.views}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {news.published ? (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 font-semibold">
                          Published
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-500 font-semibold">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <Link href={`/news/${news._id}`}>
                        <button
                          className="p-2 rounded hover:bg-emerald-50 text-emerald-600"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={`/admin/news/edit/${news._id}`}>
                        <button
                          className="p-2 rounded hover:bg-blue-50 text-blue-600"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                      </Link>
                      <button
                        className="p-2 rounded hover:bg-red-50 text-red-600"
                        title="Delete"
                        // onClick={() => handleDelete(news._id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
