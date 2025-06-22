'use client';

import Image from 'next/image';
import React from 'react';

type User = {
  _id: string;
  username: string;
  email: string;
  image?: string;
  degree?: string;
  jobRole?: string;
};

interface ParticipantListProps {
  participants: User[];
  currentPage: number;
  participantsPerPage: number;
}

export default function ParticipantList({
  participants,
  currentPage,
  participantsPerPage,
}: ParticipantListProps) {
  const paginatedParticipants = participants.slice(
    (currentPage - 1) * participantsPerPage,
    currentPage * participantsPerPage
  );

  if (participants.length === 0) {
    return <p className="text-gray-400 italic">No one registered yet.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      {paginatedParticipants.map(user => (
        <li
          key={user._id}
          className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100 hover:bg-gray-100"
        >
          <Image
            src={
              user.image?.startsWith('http')
                ? user.image
                : `/uploads/${user.image || 'default.png'}`
            }
            alt={user.username}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover border border-green-300"
          />
          <div>
            <div className="font-semibold text-gray-800">{user.username}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
            {user.jobRole && (
              <div className="text-sm text-gray-400">• {user.jobRole}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
