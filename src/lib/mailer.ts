import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  console.log("Sending email with:");
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  console.log("To:", to);
  console.log("Subject:", subject);
  await transporter.sendMail({
    from: `"Greenwood School" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
