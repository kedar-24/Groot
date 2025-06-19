import { useSession } from "next-auth/react";

export default function useCurrentUser() {
  const { data, status } = useSession();
  return { data: data?.user, status };
}
