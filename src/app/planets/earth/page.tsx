"use client";
import { useState } from "react";

export default function Earth() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/earth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-600">🌍 Earth</h1>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Ask Earth to generate or improve code for Spirit’s structure.
      </p>

      <form onSubmit={sendMessage} className="mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Earth something..."
          className="border p-2 w-64 rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
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
