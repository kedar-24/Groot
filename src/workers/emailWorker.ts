import { Worker } from "bullmq";
import { sendEmail } from "../lib/mailer";
import { connection } from "../lib/emailQueue";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
console.log("Loaded EMAIL_USER:", process.env.EMAIL_USER);
console.log("Loaded EMAIL_PASS:", process.env.EMAIL_PASS);

new Worker(
  "emailQueue",
  async (job) => {
    const { to, subject, html } = job.data;
    try {
      await sendEmail(to, subject, html);
      console.log(`✅ Sent to ${to}`);
    } catch (err) {
      console.error(`❌ Failed for ${to}`, err);
    }
  },
  {
    connection,
    concurrency: 1, // one at a time to avoid Gmail throttling
  }
);
