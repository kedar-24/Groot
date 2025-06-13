import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import CreateAccountClient from "./CreateAccountClient";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function CreateAccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("email_verified_token")?.value;

  if (!token) {
    redirect("/auth/signup");
  }

  let email = "";

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string; verified: boolean };
    if (!payload.verified || !payload.email) {
      throw new Error();
    }
    email = payload.email;
  } catch {
    redirect("/auth/signup");
  }

  return <CreateAccountClient email={email} />;
}
