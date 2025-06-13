// app/api/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/otpStore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!; // Set this in your .env

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Email and OTP required." }, { status: 400 });
  }

  const isValid =await verifyOTP(email, otp);
 
  if (!isValid) {
    return NextResponse.json({ error: "Invalid or expired OTP." }, { status: 401 });
  }

  // Generate JWT
  const token = jwt.sign({ email, verified: true }, JWT_SECRET, { expiresIn: "10m" });

  // Set JWT as HttpOnly, Secure cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set("email_verified_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60, // 10 minutes
  });

  return response;
}
