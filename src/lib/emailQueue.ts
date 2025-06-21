import { Queue } from "bullmq";
import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

export const connection = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null, 
});

export const emailQueue = new Queue("emailQueue", { connection });
