"use client";
import { useState } from "react";

export default function Mercury() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/mercury", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-500">☿ Mercury</h1>

      <form onSubmit={sendMessage} className="mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Mercury something..."
          className="border p-2 w-64 rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>

      {reply && (
        <p className="text-gray-700 mt-4 max-w-xl mx-auto">{reply}</p>
      )}
    </main>
  );
}
