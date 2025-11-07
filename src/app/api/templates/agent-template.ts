// src/app/api/templates/agent-template.ts

import { NextResponse } from "next/server";

export async function createAgentRoute(
  agentName: string,
  systemPrompt: string
) {
  return async function POST(request: Request) {
    const { message } = await request.json();

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        }),
      });

      const data = await res.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        `No reply from ${agentName}.`;

      return NextResponse.json({ reply });
    } catch (error) {
      console.error(`${agentName} error:`, error);
      return NextResponse.json(
        { reply: `${agentName} encountered an error.` },
        { status: 500 }
      );
    }
  };
}
