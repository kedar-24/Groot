// File: src/app/api/auth/forgot-password/route.ts

import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import { sendResetPasswordEmail } from "@/utils/mailer";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

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
