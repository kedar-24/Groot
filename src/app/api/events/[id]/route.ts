import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Event } from "@/models/Event"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const includeParticipants = url.searchParams.get("includeParticipants") === "true";

    // --- THE MORE EXPLICIT FIX ---
    const resolvedParams = await params; // Explicitly await params
    const { id } = resolvedParams;      // Destructure 'id' from the awaited object
    // -----------------------------

    const eventQuery = Event.findById(id);
    if (includeParticipants) {
      eventQuery.populate('participants');
    }

    const event = await eventQuery;

    if (!event) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ event });
  } catch (err) {
    console.error('Error fetching event by ID:', err);
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();

    // --- THE MORE EXPLICIT FIX ---
    const resolvedParams = await params; // Explicitly await params
    const { id } = resolvedParams;      // Destructure 'id' from the awaited object
    // -----------------------------

    const event = await Event.findById(id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    if (event.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedEvent);
  } catch (err) {
    console.error('Error updating event:', err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const event = await Event.findById(params.id);
    if (!event) return NextResponse.json({ error: "Event not found" }, { status: 404 });

    // Optional: Only creator can delete
    if (event.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
