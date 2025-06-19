import { signOut } from "next-auth/react";
import React from "react";

type AccountMenuOption = {
  href: string;
  label: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export function getAccountMenuOptions(
  user: { name?: string } | null,
  onClose?: () => void
): AccountMenuOption[] {
  return [
    {
      href: "/profile",
      label: (
        <span className="flex flex-col items-start">
          <span className="font-semibold text-green-900">
            {user?.name || "Profile"}
          </span>
          <span className="text-xs text-gray-500">Profile</span>
        </span>
      ),
      onClick: onClose,
    },
    {
      href: "#",
      label: <span className="text-red-700 font-semibold">Sign Out</span>,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClose) onClose();
        signOut({ callbackUrl: window.location.origin });
      },
    },
  ];
}
