import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET() {
  await connectDB();

  // Get total users
  const totalUsers = await User.countDocuments();

  // Get user count by state (assuming User has a 'workingState' field)
  const usersByStateAgg = await User.aggregate([
    {
      $group: {
        _id: "$workingState",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  // Format as { state: count }
  const usersByState: Record<string, number> = {};
  usersByStateAgg.forEach((item) => {
    if (item._id) usersByState[item._id] = item.count;
  });

  return NextResponse.json({
    totalUsers,
    usersByState,
  });
}
