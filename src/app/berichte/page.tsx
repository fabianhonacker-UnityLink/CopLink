export default function BerichtePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Berichte
          </p>
          <h1 className="mt-2 text-4xl font-bold">Berichtssystem</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Einsatzberichte, Ermittlungsdokumentation und interne Vorgangserfassung.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-semibold">Bericht #BR-2026-031</h2>
            <p className="mt-2 text-zinc-400">
              Verkehrskontrolle mit Verdacht auf illegale Waffenmitführung.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-lg font-semibold">Bericht #BR-2026-032</h2>
            <p className="mt-2 text-zinc-400">
              Unterstützung bei Zugriff im Industriegebiet, mehrere Einheiten beteiligt.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}