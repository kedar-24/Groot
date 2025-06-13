// app/api/send-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "@/utils/mailer";
import { saveOTP } from "@/lib/otpStore";

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("OTP sending timed out")), ms)
    ),
  ]);
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  saveOTP(email, otp);

  try {
    await withTimeout(sendOTP(email, otp), 10000); // 10 seconds timeout
    return NextResponse.json({ message: "OTP sent to email." }, { status: 200 });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}
