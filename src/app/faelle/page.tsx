export default function FaellePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Fälle
          </p>
          <h1 className="mt-2 text-4xl font-bold">Fallakten</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Laufende Ermittlungen, offene Akten und interne Falldokumentation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-semibold">Fall #2026-014</h2>
            <p className="mt-2 text-zinc-400">
              Verdacht auf schweren Fahrzeugdiebstahl im Hafenbereich.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-semibold">Fall #2026-021</h2>
            <p className="mt-2 text-zinc-400">
              Ermittlungsakte zu organisierter Hehlerei und Verbindungen zu zwei
              bekannten Personen.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}