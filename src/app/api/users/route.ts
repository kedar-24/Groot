import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  await connectDB();
  // Select only the fields you want to expose to the admin UI
  const users = await User.find(
    {},
    {
      name: 1,
      email: 1,
      image: 1,
      role: 1,
      workingState: 1,
      graduationYear: 1,
      isActive: 1,
    }
  ).lean();

  // Convert _id to string for frontend compatibility
  const formatted = users.map((u: any) => ({
    ...u,
    _id: u._id.toString(),
  }));

  return NextResponse.json({ users: formatted });
}
