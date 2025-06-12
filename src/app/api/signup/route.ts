import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb"; // Your MongoDB connection utility
import { User }from "@/models/User";     // Your Mongoose User model
import { hashPassword } from "@/utils/hash"; // Your hash utility

export async function POST(req: Request) {
  try {
    const { emailOrMobile, username, password, confirmPassword } = await req.json();

    // 1. Basic validation
    if (!emailOrMobile || !username || !password || !confirmPassword) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
    }

    await connectDB();

    // 2. Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: emailOrMobile }, { mobile: emailOrMobile }, { username },],
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // 3. Hash password
    const hashedPassword = await hashPassword(password);

    // 4. Save user
    const newUser = new User({
      email: emailOrMobile.includes("@") ? emailOrMobile : undefined,
      mobile: /^\d{10}$/.test(emailOrMobile) ? emailOrMobile : undefined,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
