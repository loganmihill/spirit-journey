import { NextResponse } from "next/server";

// LOGOS — The Central Orchestrator
// Coordinates the planetary agents: Mercury, Venus, and Earth

export async function POST(req: Request) {
  const { message } = await req.json();

  // Helper function to query each planet
  async function askPlanet(planet: string, msg: string) {
    try {
      // Use local URL for development, production URL for Vercel
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        ? `${process.env.NEXT_PUBLIC_BASE_URL}`
        : "http://127.0.0.1:3000";

      const res = await fetch(`${baseUrl}/api/${planet}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`${planet} returned ${res.status}`);

      const data = await res.json();
      return `${planet.toUpperCase()}:\n${data.reply}\n`;
    } catch (err) {
      console.error(`${planet} error:`, err);
      return `${planet.toUpperCase()}: (unreachable)\n`;
    }
  }

  // Query all three planets simultaneously
  const [mercury, venus, earth] = await Promise.all([
    askPlanet("mercury", message),
    askPlanet("venus", message),
    askPlanet("earth", message),
  ]);

  // Combine results into one unified message
  const combined = `☀ Logos Summary ☀

${mercury}
${venus}
${earth}

Unified Response:
${await summarizeAll(mercury, venus, earth)}
`;

  return NextResponse.json({ reply: combined });
}

// Secondary function — Logos synthesis via OpenAI
async function summarizeAll(m: string, v: string, e: string) {
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
          {
            role: "system",
            content:
              "You are Logos — the central intelligence of the Spirit Creator System. Combine the planetary outputs into one coherent synthesis.",
          },
          { role: "user", content: `${m}\n${v}\n${e}` },
        ],
      }),
    });

    const data = await res.json();
    return data?.choices?.[0]?.message?.content || "(no synthesis)";
  } catch (err) {
    console.error("Logos summary error:", err);
    return "(summary unavailable)";
  }
}
