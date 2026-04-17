export default function FahndungPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Fahndung
          </p>
          <h1 className="mt-2 text-4xl font-bold">Fahndungssystem</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Aktive Personen- und Fahrzeugfahndungen mit Prioritäten und Status.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5">
            <p className="text-sm uppercase tracking-wide text-red-300">
              Hohe Priorität
            </p>
            <h2 className="mt-2 text-lg font-semibold">Personenfahndung</h2>
            <p className="mt-2 text-zinc-200">
              Gesucht wegen bewaffnetem Raubüberfall und Flucht vor Beamten.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
            <p className="text-sm uppercase tracking-wide text-yellow-300">
              Mittlere Priorität
            </p>
            <h2 className="mt-2 text-lg font-semibold">Fahrzeugfahndung</h2>
            <p className="mt-2 text-zinc-200">
              Schwarzer Sultan mit manipuliertem Kennzeichen, zuletzt im
              Industriegebiet gesichtet.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}