"use client";
import { useState } from "react";

export default function Venus() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/venus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <main className="p-10 text-center">
      <h1 className="text-4xl font-bold mb-4 text-pink-500">♀ Venus</h1>
      <p className="text-gray-700 mb-6 max-w-xl mx-auto">
        Ask Venus to describe visuals, color palettes, or designs for Spirit.
      </p>

      <form onSubmit={sendMessage} className="mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Venus something..."
          className="border p-2 w-64 rounded"
        />
        <button
          type="submit"
          className="ml-2 bg-pink-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>

      {reply && (
        <p className="text-gray-700 mt-4 max-w-xl mx-auto whitespace-pre-wrap">
          {reply}
        </p>
      )}
    </main>
  );
}
