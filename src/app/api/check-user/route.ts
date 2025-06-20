import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
  const { email } = await req.json();
  await connectDB();
  const user = await User.findOne({ email: email.toLowerCase().trim() });
  return NextResponse.json({ exists: !!user });
}