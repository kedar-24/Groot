import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json({ error: "Email, username, and password are required." }, { status: 400 });
  }

  // Step 1: Verify OTP token from cookie
  const token = req.cookies.get("email_verified_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Email not verified." }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { email: string; verified: boolean };
    if (!payload.verified || payload.email !== email) {
      return NextResponse.json({ error: "Invalid verification token." }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Invalid or expired verification token." }, { status: 401 });
  }

  // Step 2: Save user in DB
  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
  email: email.toLowerCase().trim(),
  username,
  password: passwordHash,
  userId: nanoid(10),
});

    // Step 3: Simulate login using credentials provider
    const loginRes = await fetch(new URL("/api/auth/callback/credentials", req.url), {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        emailOrUsername: email,
        password,
      }),
    });

    if (!loginRes.ok) {
      return NextResponse.json({ error: "Login failed after account creation." }, { status: 500 });
    }

    // Step 4: Prepare response and copy login cookies
    const response = NextResponse.json({ success: true, userId: newUser._id });

    const authCookies = loginRes.headers.getSetCookie();
    authCookies?.forEach((cookie) => {
      response.headers.append("Set-Cookie", cookie);
    });

    // Clear the OTP token
    response.cookies.set("email_verified_token", "", {
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[CREATE_ACCOUNT_ERROR]", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
