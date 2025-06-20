import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ error: "Token and password are required." }),
        { status: 400 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    await connectDB();

    // Hash new password
    const hash = await bcrypt.hash(password, 10);

    // Update password in DB
    await User.findByIdAndUpdate(decoded.userId, { password: hash });

    return new Response(
      JSON.stringify({ message: "Password reset successful." }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[RESET_PASSWORD_ERROR]", err);
    return new Response(
      JSON.stringify({ error: "Invalid or expired token." }),
      { status: 400 }
    );
  }
}
