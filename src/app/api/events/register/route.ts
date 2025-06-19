import { User, IUser } from '@/models/User';
import { Event } from '@/models/Event';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { eventId, userEmail } = await req.json();

    if (!eventId || !userEmail) {
      return NextResponse.json({ error: 'Missing eventId or userEmail' }, { status: 400 });
    }

    const user: IUser | null = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Prevent duplicate registration
    if (event.participants.some((id) => id.equals(user._id))) {
      return NextResponse.json({ message: 'Already registered' }, { status: 409 });
    }

    event.participants.push(user._id); // ✅ Type-safe ObjectId
    await event.save();

    return NextResponse.json({ message: 'Registered successfully' }, { status: 200 });
  } catch (error) {
    console.error('❌ Error registering for event:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
