// hooks/useCurrentUser.ts
import { useSession } from "next-auth/react";

export default function useCurrentUser() {
  const { data: session, status } = useSession();
  return {
    data: session?.user ?? null,
    status,
  };
}
