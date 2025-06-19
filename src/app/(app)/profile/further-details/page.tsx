import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import FurtherDetailsPage from "./FurtherDetailsPage"; 

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }

  return <FurtherDetailsPage />;
}
