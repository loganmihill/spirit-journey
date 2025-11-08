import { NextResponse } from "next/server";
import { createAgentRoute } from "../templates/agent-template";

const earthPrompt = `
You are Earth — the Builder and Architect of the Spirit Creator System.
You translate creative and linguistic ideas into clean, working code.
Collaborate with Mercury and Venus. Respond with practical code or structure ideas.
`;

export const POST = async (req: Request) => {
  try {
    const { message } = await req.json();

    // Manual call to verify key and fetch
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: earthPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "No reply from Earth.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("🌍 Earth API Error:", err);
    return NextResponse.json(
      { reply: "Earth encountered an internal error." },
      { status: 500 }
    );
  }
};
