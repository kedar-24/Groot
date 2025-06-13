import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const email = session.user.email.toLowerCase().trim();

  const { jobRole, businessDetails, workingCity, workingState, fieldsOfExpertise } = await req.json();

  try {
    await connectDB();

    const user = await User.findOneAndUpdate(
      { email },
      {
        jobRole,
        businessDetails,
        workingCity,
        workingState,
        fieldsOfExpertise,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: `User not found for email: ${email}` }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("FURTHER_DETAILS_ERROR", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
