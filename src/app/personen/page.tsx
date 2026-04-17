export default function PersonDetailPage({ params }: PersonPageProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-zinc-800 bg-zinc-900/70">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            CopLink / Personen
          </p>
          <h1 className="mt-2 text-4xl font-bold">Personenregister</h1>
          <p className="mt-3 max-w-3xl text-zinc-400">
            Bürgerdaten, Vermerke, bekannte Einträge und systemrelevante Hinweise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold">Personensuche</h2>
            <input
              type="text"
              placeholder="Name oder ID suchen..."
              className="w-full max-w-sm rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm text-white outline-none"
            />
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800">
            <table className="w-full text-left">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Geburtsdatum</th>
                  <th className="px-4 py-3">Telefon</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Hinweis</th>
                </tr>
              </thead>
              <tbody>
  <tr className="border-t border-zinc-800 hover:bg-zinc-800/40 transition">
    <td className="px-4 py-3">
      <a href="/personen/leon-hartmann" className="text-blue-400 hover:text-blue-300">
        Leon Hartmann
      </a>
    </td>
    <td className="px-4 py-3">12.05.1996</td>
    <td className="px-4 py-3">555-0142</td>
    <td className="px-4 py-3 text-green-400">Unauffällig</td>
    <td className="px-4 py-3 text-zinc-400">Keine Einträge</td>
  </tr>

  <tr className="border-t border-zinc-800 hover:bg-zinc-800/40 transition">
    <td className="px-4 py-3">
      <a href="/personen/mara-voss" className="text-blue-400 hover:text-blue-300">
        Mara Voss
      </a>
    </td>
    <td className="px-4 py-3">03.11.1992</td>
    <td className="px-4 py-3">555-0198</td>
    <td className="px-4 py-3 text-yellow-400">Beobachtung</td>
    <td className="px-4 py-3 text-zinc-400">Bekannte Kontakte im Hafen</td>
  </tr>
</tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}