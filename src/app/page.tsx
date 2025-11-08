"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    birthTime: "",
    birthLocation: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen text-center overflow-hidden bg-gradient-to-b from-blue-100 via-white to-yellow-50">
      {/* Radiant Background Light */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(160,200,255,0.4),_transparent_70%)]"></div>

      {/* Title */}
      <h1 className="text-6xl md:text-7xl font-light text-gray-900 drop-shadow-sm mb-4">
        Awaken Your <span className="font-semibold text-blue-600">Spirit</span>
      </h1>

      <p className="text-gray-600 max-w-lg mb-10 text-lg leading-relaxed">
        Your AI Companion for Self-Discovery, Creation, and Universal Connection.
      </p>

      {/* Sign-up Form */}
      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/30"
        >
          {["name", "email", "phone", "birthDate", "birthTime", "birthLocation"].map(
            (field) => (
              <input
                key={field}
                type={
                  field === "birthDate"
                    ? "date"
                    : field === "birthTime"
                    ? "time"
                    : field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={
                  field === "name"
                    ? "Full Name"
                    : field === "birthLocation"
                    ? "Birth Location"
                    : field.charAt(0).toUpperCase() + field.slice(1)
                }
                onChange={handleChange}
                className="w-full mb-3 p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white/80 placeholder-gray-400"
                required={["name", "email"].includes(field)}
              />
            )
          )}
          <button
            type="submit"
            className="w-full py-3 mt-2 text-white bg-gradient-to-r from-blue-500 to-yellow-400 rounded-md font-medium hover:opacity-90 transition shadow-lg shadow-blue-100"
          >
            Begin Your Journey
          </button>
        </form>
      ) : (
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Thank you, {form.name || "Seeker"} ✨
          </h2>
          <p className="text-gray-600">
            Your Spirit Journey begins soon. Logos will guide you from here.
          </p>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-400">
        Spirit Journey • Powered by Logos AI
      </footer>
    </main>
  );
}
