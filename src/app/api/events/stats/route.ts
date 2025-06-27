import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event";

export async function GET() {
  await connectDB();

  const totalEvents = await Event.countDocuments();
  // Count total registrations (sum of all participants arrays)
  const registrationsAgg = await Event.aggregate([
    { $project: { count: { $size: { $ifNull: ["$participants", []] } } } },
    { $group: { _id: null, total: { $sum: "$count" } } },
  ]);
  const totalRegistrations = registrationsAgg[0]?.total || 0;

  // Count upcoming events (date >= today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingEvents = await Event.countDocuments({ date: { $gte: today } });

  return NextResponse.json({
    totalEvents,
    totalRegistrations,
    upcomingEvents,
  });
}
