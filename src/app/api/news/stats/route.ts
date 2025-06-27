import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  await connectDB();
  const newsCount = await News.countDocuments();
  return NextResponse.json({ newsCount });
}
