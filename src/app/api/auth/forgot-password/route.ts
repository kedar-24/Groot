// File: src/app/api/auth/forgot-password/route.ts

import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/utils/mailer";

const JWT_SECRET = process.env.JWT_SECRET!;

// Track reset requests per email
const resetRequestTracker = new Map<string, number[]>();

// Periodic cleanup: remove old/unused entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, timestamps] of resetRequestTracker.entries()) {
    const recent = timestamps.filter((t) => now - t < 60 * 60 * 1000); // 1 hour
    if (recent.length > 0) {
      resetRequestTracker.set(email, recent);
    } else {
      resetRequestTracker.delete(email);
    }
  }
}, 10 * 60 * 1000); // cleanup every 10 min

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Rate limit: max 5 reset requests per email per hour
    if (email) {
      const now = Date.now();
      const timestamps = resetRequestTracker.get(email) || [];
      const recent = timestamps.filter((t) => now - t < 30 * 60 * 1000); // 1 hour
      if (recent.length >= 5) {
        return new Response(
          JSON.stringify({ error: "Too many reset requests. Please try again later." }),
          { status: 429 }
        );
      }
      recent.push(now);
      resetRequestTracker.set(email, recent);
    }

    await connectDB();
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { userId: user._id },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password?token=${token}`;
      await sendResetPasswordEmail(email, token);
    }

    return new Response(
      JSON.stringify({ message: "If the email exists, a reset link has been sent." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("[FORGOT_PASSWORD_ERROR]", error);
    return new Response(
      JSON.stringify({ error: "Something went wrong." }),
      { status: 500 }
    );
  }
}
