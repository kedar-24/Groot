import Activity from "@/models/Activity";

export async function logActivity({
  userId,
  userName,
  type,
  description,
  meta = {},
}: {
  userId?: string;
  userName?: string;
  type: string;
  description: string;
  meta?: Record<string, any>;
}) {
  await Activity.create({ userId, userName, type, description, meta });
}
