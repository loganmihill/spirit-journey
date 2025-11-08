import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spirit Journey",
  description:
    "Awaken Your Spirit — Your AI Companion for Self-Discovery, Creation, and Universal Connection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-yellow-50 text-gray-900 selection:bg-blue-200/40">
        {children}
      </body>
    </html>
  );
}
