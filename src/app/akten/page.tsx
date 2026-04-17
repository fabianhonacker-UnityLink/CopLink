export default function AktenPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Akten
          </p>
          <h1 className="mt-2 text-4xl font-bold">Aktenverwaltung</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Ermittlungsakten, Fallakten und interne Verknüpfungen zwischen Personen,
            Fahrzeugen und Berichten.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-blue-400">Akte #AK-2026-002</p>
            <h2 className="mt-2 text-lg font-semibold">Organisierte Hehlerei</h2>
            <p className="mt-2 text-zinc-400">
              Verknüpfung zu 2 Personen, 1 Fahrzeug und 3 Berichten.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-blue-400">Akte #AK-2026-004</p>
            <h2 className="mt-2 text-lg font-semibold">Raubserie Innenstadt</h2>
            <p className="mt-2 text-zinc-400">
              Mehrere Tatorte, laufende Ermittlungen, hohe Priorität.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}