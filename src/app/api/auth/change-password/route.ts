import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { oldPassword, newPassword } = await req.json();

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // If user already has a password, require old password check
  if (user.password && user.password.trim() !== "") {
    if (!oldPassword) {
      return NextResponse.json({ error: "Old password is required." }, { status: 400 });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
    }
  }

  // Hash new password and update
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  // Optionally, add "credentials" to providers if not present
  if (!user.providers?.includes("credentials")) {
    user.providers = [...(user.providers || []), "credentials"];
  }
  await user.save();

  return NextResponse.json({ success: true });
}