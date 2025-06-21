import { emailQueue } from "@/lib/emailQueue";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Event } from "@/models/Event"; // Import your Event model

export async function POST(req: Request) {
  const { eventId, message } = await req.json();

  if (!eventId || !message) {
    return Response.json({ error: "Missing eventId or message" }, { status: 400 });
  }

  await connectDB();

  // 1. Find the event and get participant user IDs
  const event = await Event.findById(eventId);
  if (!event) {
    console.error(`Event with ID ${eventId} not found`);
    return Response.json({ error: "Event not found" }, { status: 404 });
  }
  if (!event || !event.participants || event.participants.length === 0) {
    return Response.json({ error: "No participants found for this event" }, { status: 404 });
  }

  // 2. Find users whose _id is in the participants array
  const users = await User.find({ _id: { $in: event.participants } })
    .sort({ createdAt: -1 })
    .limit(500);

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    try {
      await emailQueue.add(
        "sendEmail",
        {
          to: user.email,
          subject: `Invitation for Event ${eventId}`,
          html: `<p>Hello ${user.username},</p><p>${message}</p>`,
        },
        {
          delay: i * 3000,
        }
      );
      const count = await emailQueue.count();
      console.log("Jobs in queue:", count);
    } catch (err) {
      console.error(`❌ Failed to queue email for ${user.email}:`, err);
    }
  }

  const count = await emailQueue.count();
  console.log("Jobs in queue:", count);

  return Response.json({ status: "Queued", count: users.length });
}
