import { signOut } from "next-auth/react";

export type AccountMenuOption = {
  href: string;
  label: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export function getAccountMenuOptions(
  user: { name?: string } | null,
  onClose?: () => void
): AccountMenuOption[] {
  const handleSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose?.();
    signOut({ callbackUrl: typeof window !== "undefined" ? window.location.origin : "/" });
  };

  return [
    {
      href: "/profile",
      label: (
        <span className="flex flex-col items-start">
          <span className="font-semibold text-green-900">{user?.name || "Profile"}</span>
          <span className="text-xs text-gray-500">Profile</span>
        </span>
      ),
      onClick: onClose,
    },
    {
      href: "#",
      label: (
        <button
          onClick={handleSignOut}
          className="text-red-700 font-semibold w-full text-left"
        >
          Sign Out
        </button>
      ),
    },
  ];
}
