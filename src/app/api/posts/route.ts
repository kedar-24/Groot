import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { User } from "@/models/User";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { content } = await req.json();
  if (!content || content.trim().length === 0) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const post = await Post.create({
    author: user._id,
    authorName: user.username,
    authorTitle: user.title || user.jobRole || "",
    authorImage: user.avatar || user.image || "",
    content,
  });

  return NextResponse.json({ post }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("author", "username avatar image title jobRole")
    .lean();

  return NextResponse.json({
    posts: posts.map((p) => ({
      id: p._id.toString(),
      author: p.authorName,
      authorTitle: p.authorTitle,
      authorImage: p.authorImage,
      content: p.content,
      time: new Date(p.createdAt).toLocaleString(),
      likes: p.likes,
      comments: p.comments,
    })),
  });
}
