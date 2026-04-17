export default function FahrzeugePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Fahrzeuge
          </p>
          <h1 className="mt-2 text-4xl font-bold">Fahrzeugregister</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Kennzeichenabfragen, Halterdaten und vermerkte Fahrzeuge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Fahrzeugsuche</h2>
            <input
              type="text"
              placeholder="Kennzeichen suchen..."
              className="w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-white outline-none"
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Kennzeichen</th>
                  <th className="px-4 py-3">Fahrzeug</th>
                  <th className="px-4 py-3">Besitzer</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Hinweis</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-3">BH-LP-204</td>
                  <td className="px-4 py-3">Buffalo STX</td>
                  <td className="px-4 py-3">Leon Hartmann</td>
                  <td className="px-4 py-3 text-green-400">Unauffällig</td>
                  <td className="px-4 py-3 text-zinc-400">Keine Vermerke</td>
                </tr>
                <tr className="border-t border-zinc-800">
                  <td className="px-4 py-3">BH-XR-771</td>
                  <td className="px-4 py-3">Sultan RS</td>
                  <td className="px-4 py-3">Unbekannt</td>
                  <td className="px-4 py-3 text-red-400">Gesucht</td>
                  <td className="px-4 py-3 text-zinc-400">Manipuliertes Kennzeichen</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}