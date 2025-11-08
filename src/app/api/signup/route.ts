import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  console.log("🕊️ New Spirit Signup:", body);

  // For now, just return success (later we'll connect database)
  return NextResponse.json({ success: true });
}
