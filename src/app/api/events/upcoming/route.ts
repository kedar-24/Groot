import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";

export async function GET() {
  await connectDB();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Fetch upcoming events (date >= today), sorted by soonest first
  const events = await Event.find({ date: { $gte: today } })
    .sort({ date: 1 })
    .limit(10)
    .select("_id title date")
    .lean();

  // Format _id to string for frontend compatibility
  const formatted = events.map((e: any) => ({
    ...e,
    _id: e._id.toString(),
  }));

  return NextResponse.json({ events: formatted });
}
