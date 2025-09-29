import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/connect";
import { ObjectId } from "mongodb";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await params
    const db = await getDb();
    const collection = db.collection("polls");

    const poll = await collection.findOne({ _id: new ObjectId(id) });

    if (!poll) {
      return NextResponse.json(
        { success: false, message: "Poll not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ poll }, { status: 200 });
  } catch (error) {
    console.error("Error fetching poll by id:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch poll" },
      { status: 500 }
    );
  }
}
