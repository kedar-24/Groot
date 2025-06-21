//profile/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    username,
    image,
    jobRole,
    businessDetails,
    workingCity,
    workingState,
    fieldsOfExpertise,
    graduationYear,
    degree,
    linkedin,
  } = await req.json();

  await connectDB();

  // Only update the user with session.user.email
  const updated = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      username,
      image,
      jobRole,
      businessDetails,
      workingCity,
      workingState,
      fieldsOfExpertise,
      graduationYear,
      degree,
      linkedin,
    },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, user: updated });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const user = await User.findOne({ email: session.user.email }).lean();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }


  return NextResponse.json(user);
}