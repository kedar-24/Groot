import { Otp } from '@/models/otp';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function saveOTP(email: string, otp: string) {
  await connectDB();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  const hashedOtp = await bcrypt.hash(otp, 10); // 🔐 hash OTP

  await Otp.deleteMany({ email }); // remove old OTPs

  await Otp.create({
    email,
    otp: hashedOtp, // store hashed
    expiresAt,
  });
}

export async function verifyOTP(email: string, userOtp: string): Promise<boolean> {
  await connectDB();

  const record = await Otp.findOne({ email });

  if (!record || record.expiresAt < new Date()) {
    return false;
  }

  const isMatch = await bcrypt.compare(userOtp, record.otp);
  if (!isMatch) return false;

  await Otp.deleteMany({ email }); // cleanup on success
  return true;
}
