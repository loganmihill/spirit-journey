export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-gray-50 text-center">
      <h1 className="text-5xl font-bold text-blue-600 mb-4">
        Spirit Journey 🌞
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Welcome to your cosmic creation space.  
        Begin your exploration with the Planets of Spirit — each one a realm of learning and transformation.
      </p>

      {/* Navigation to your first Planet */}
      <a
        href="/planets/mercury"
        className="text-blue-500 underline text-lg hover:text-blue-700 transition"
      >
        Visit Mercury →
      </a>
    </main>
  );
}
