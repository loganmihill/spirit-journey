"use client";
import { useState } from "react";

export default function Logos() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/logos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4 text-yellow-500">☀ Logos</h1>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Ask Logos to coordinate the planets and synthesize their guidance.
      </p>

      <form onSubmit={sendMessage} className="mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Logos something..."
          className="border p-2 w-64 rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>

      {reply && (
        <pre className="text-left bg-gray-100 p-4 rounded max-w-2xl mx-auto whitespace-pre-wrap">
          {reply}
        </pre>
      )}
    </main>
  );
}
