import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";
import { User } from "@/models/User";

// POST /api/events — Create a new event
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    // Lookup MongoDB user from session email
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Required fields check
    const requiredFields = ["title", "description", "date", "location"];
    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Create the event
    const newEvent = await Event.create({
      ...body,
      createdBy: user._id, // use proper ObjectId
    });

    return NextResponse.json({ success: true, event: newEvent }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating event:", err.message || err);
    return NextResponse.json({ success: false, error: "Failed to create event" }, { status: 500 });
  }
}

// GET /api/events — Fetch all events
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const includeParticipants = url.searchParams.get("includeParticipants") === "true";
    let query = Event.find().sort({ date: -1 }); // Optional: include creator info

    if (includeParticipants) {
      query = query.populate({
        path: "participants",
        select: "username email image jobRole",
      });
    } // Latest first

    const events = await query;

    return NextResponse.json({ success: true, events }, { status: 200 });
  } catch (err: any) {
    console.error("Error fetching events:", err.message || err);
    return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 });
  }
}

