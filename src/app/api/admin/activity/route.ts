import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Activity from "@/models/Activity";

export async function GET() {
  await connectDB();
  // Fetch last 10 activities, most recent first
  const activities = await Activity.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .lean();

  // Format for frontend (adjust fields as per your Activity schema)
  const formatted = activities.map((a: any) => ({
    type: a.type || "GENERIC",
    description: a.description || a.action || "Activity",
    user: a.userName || "Unknown",
    time: a.createdAt ? new Date(a.createdAt).toLocaleString() : "",
  }));

  return NextResponse.json({ activities: formatted });
}
