"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Eye, UserPlus } from "lucide-react";
import PageTopSpacer from "@/components/PageTopSpacer";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  workingState?: string;
  graduationYear?: string;
  isActive?: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch {
        setUsers([]);
      }
      setLoading(false);
    })();
  }, []);

  // Placeholder for delete handler
  // const handleDelete = async (id: string) => { ... }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageTopSpacer />
      <div className="max-w-6xl mx-auto py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <Link href="/admin/users/new">
            <button className="flex items-center gap-2 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700 transition font-semibold shadow">
              <UserPlus className="w-5 h-5" /> Add User
            </button>
          </Link>
        </div>

        {loading ? (
          <div className="text-gray-400 text-center py-12">
            Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="text-gray-400 text-center py-12">No users found.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow border border-gray-100 bg-white">
            <table className="min-w-full divide-y divide-gray-100">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    State
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                    Graduation
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
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 border">
                          {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {user.role || "User"}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {user.workingState || "-"}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700">
                      {user.graduationYear || "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {user.isActive !== false ? (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-700 font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 text-xs rounded bg-gray-100 text-gray-500 font-semibold">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <Link href={`/admin/users/view/${user._id}`}>
                        <button
                          className="p-2 rounded hover:bg-emerald-50 text-emerald-600"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </Link>
                      <Link href={`/admin/users/edit/${user._id}`}>
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
                        // onClick={() => handleDelete(user._id)}
                        disabled
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
